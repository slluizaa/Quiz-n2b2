import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image ,TouchableOpacity,TextInput, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';

import logo from '../../assets/logo.png';



export default function Jogo ({navigation, route}) {
    const quizData = [
        {
          question: 'Qual é a capital da França?',
          answers: ['Paris', 'Londres', 'Berlim', 'Madri'],
          correctAnswer: 'Paris'
        },
        {
          question: 'Qual é o maior oceano do mundo?',
          answers: ['Atlântico', 'Pacífico', 'Índico', 'Ártico'],
          correctAnswer: 'Pacífico'
        },
        {
          question: 'Quem pintou a Mona Lisa?',
          answers: ['Vincent Van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
          correctAnswer: 'Leonardo da Vinci'
        }
      ];
    
      const [perguntaAtual, setPerguntaAtual] = useState(0);
      const [respostaSelecionada, setRespostaSelecionada] = useState(null);
      const [score, setScore] = useState(0);
      const [respondida, setRespondida] = useState(false);
    
      const handleAnswerSelect = (answer) => {
        setRespostaSelecionada(answer);
        setRespondida(true);
    
        if (answer === quizData[perguntaAtual].correctAnswer) {
          setScore(score + 1);
        }
    
        setTimeout(() => {
          if (perguntaAtual < quizData.length - 1) {
            setPerguntaAtual(perguntaAtual + 1);
          } else {
            navigation.navigate('Score', { parametroPontos:score, totalQuestions: quizData.length });
          }
          setRespondida(false);
          setRespostaSelecionada(null);
        }, 1500);
      };
    
      const currentQuestion = quizData[perguntaAtual];
    
      return (
        <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
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
                respostaSelecionada === answer ? styles.selectedButton : null
              ]}
              onPress={() => handleAnswerSelect(answer)}
              disabled={respondida}
            >
              <Text style={styles.answerText}>{answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#DCD6F7',
        justifyContent:'center',
        padding: 10,
        marginVertical: 10,
      },
      logo:{
        width:'50%',
        height:'10%',
        marginVertical:20,
        alignSelf:'center'
      },
      question: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color:'#820B8A',
        marginBottom:15,
        marginTop:20
      },
      answerButton: {
        backgroundColor: '#F4E04D',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
      },
      selectedButton: {
        backgroundColor: '#d1c4e9',  // Cor diferenciada para o botão selecionado
      },
      answerText: {
        textAlign: 'center',
        fontSize: 16,
        color:'#820B8A',
        fontWeight: 'bold',
      },
      feedback: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      containerTema:{
        backgroundColor:'#d1c4e9',
        width:'65%',
        alignSelf:'center',
        height:90,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7,
        paddingTop:20
      },
      textoTema:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color:'#820B8A',
      },
    });
