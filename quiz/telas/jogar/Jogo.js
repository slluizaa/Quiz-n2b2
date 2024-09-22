import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { obtemPerguntasPorTema } from '../../services/dbservice';
import logo from '../../assets/logo.png';

export default function Jogo({ navigation, route }) {
  const [quizData, setQuizData] = useState([]); // Armazena as perguntas e respostas do tema
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [score, setScore] = useState(0);
  const [respondida, setRespondida] = useState(false);
  const [resumoRespostas, setResumoRespostas] = useState([]);
  const [loading, setLoading] = useState(true); // Flag para indicar se está carregando as perguntas

  useEffect(() => {
    async function carregarPerguntas() {
      try {
        const perguntas = await obtemPerguntasPorTema(route.params?.parametroTema);
        console.log(perguntas); // Depuração para ver as perguntas e alternativas retornadas
        if (perguntas.length > 0) {
          const perguntasFormatadas = perguntas.map(pergunta => ({
            question: pergunta.pergunta,
            answers: pergunta.alternativas, // As alternativas agora vêm diretamente da função
            correctAnswer: pergunta.correta,
          }));
          setQuizData(perguntasFormatadas);
          setLoading(false); // Finaliza o carregamento
        } else {
          Alert.alert('Erro', 'Nenhuma pergunta disponível para o tema selecionado.');
          navigation.goBack(); // Retorna à tela anterior se não houver perguntas
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar as perguntas: ' + error.message);
      }
    }

    carregarPerguntas();
  }, [route.params?.parametroTema]);


  const handleAnswerSelect = (answer) => {
    setRespostaSelecionada(answer);
    setRespondida(true);

    const isCorrect = answer === quizData[perguntaAtual].correctAnswer;
    const novoResumo = [
      ...resumoRespostas,
      {
        question: quizData[perguntaAtual].question,
        userAnswer: answer,
        correctAnswer: quizData[perguntaAtual].correctAnswer,
        isCorrect: isCorrect,
      },
    ];
    setResumoRespostas(novoResumo);

    const newScore = isCorrect ? score + 1 : score;

    setTimeout(() => {
      if (perguntaAtual < quizData.length - 1) {
        // Avança para a próxima pergunta
        setPerguntaAtual(perguntaAtual + 1);
        setScore(newScore); // Atualiza a pontuação
      } else {
        // Vai para a tela de pontuação
        navigation.navigate('Score', {
          parametroPontos: newScore,
          totalQuestions: quizData.length,
          resumoRespostas: novoResumo,
        });
      }
      setRespondida(false);
      setRespostaSelecionada(null);
    }, 1500);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando perguntas...</Text>
      </View>
    );
  }

  const currentQuestion = quizData[perguntaAtual];

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.containerTema}>
        <Text style={styles.textoTema}> Tema: {route.params?.parametroTema} </Text>
      </View>
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {/* Exibe as alternativas */}
      {currentQuestion.answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerButton,
            respostaSelecionada === answer ? styles.selectedButton : null,
          ]}
          onPress={() => handleAnswerSelect(answer)}
          disabled={respondida}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCD6F7',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 10,
  },
  logo: {
    width: '50%',
    height: '10%',
    marginVertical: 20,
    alignSelf: 'center',
  },
  question: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#820B8A',
    marginBottom: 15,
    marginTop: 20,
  },
  answerButton: {
    backgroundColor: '#F4E04D',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: '#d1c4e9', // Cor diferenciada para o botão selecionado
  },
  answerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#820B8A',
    fontWeight: 'bold',
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerTema: {
    backgroundColor: '#d1c4e9',
    width: '65%',
    alignSelf: 'center',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    paddingTop: 20,
  },
  textoTema: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#820B8A',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#820B8A',
  },
});
