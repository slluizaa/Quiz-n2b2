import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import logo from '../../assets/logo.png';

export default function Score({ navigation, route }) {
  const totalQuestions = route.params?.totalQuestions || 0;
  const parametroPontos = route.params?.parametroPontos || 0;

  // Calcular a porcentagem de acertos
  const porcentagemAcertos = ((parametroPontos / totalQuestions) * 100).toFixed(2);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.containerResultado}>
        <Text style={styles.titulo}>Bom jogo!</Text>
        <Text style={styles.texto}>Você acertou:</Text>
        <Text style={styles.textoResultado}>
          {parametroPontos} de {totalQuestions} ({porcentagemAcertos}%)
        </Text>
      </View>
      <Text style={styles.titulo}>Gabarito</Text>
      <FlatList
        data={route.params?.resumoRespostas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <Text style={item.isCorrect ? styles.correctAnswer : styles.wrongAnswer}>
              Sua Resposta: {item.userAnswer} {item.isCorrect ? '(Correto)' : '(Errado)'}
            </Text>
            {!item.isCorrect && (
              <Text style={styles.correctAnswer}>Resposta Correta: {item.correctAnswer}</Text>
            )}
          </View>
        )}
      />
      <View style={styles.areaBotao}>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('jogar')}>
          <Text style={styles.textoBotao}>Jogar Novamente</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
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
    width: '100%',
    justifyContent: 'center',
  },
  logo: {
    width: '50%',
    height: '10%',
    marginVertical: 20,
    alignSelf: 'center',
    marginTop: 50,
  },
  titulo: {
    fontSize: 30,
    color: '#820B8A',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  texto: {
    fontSize: 30,
    color: '#820B8A',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 5,
  },
  textoResultado: {
    fontSize: 30,
    color: '#820B8A',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,  
    marginBottom: 20  
  },
  
  botao: {
    backgroundColor: '#F4E04D',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    width: '40%',
  },
  areaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  textoBotao: {
    textAlign: 'center',
    fontSize: 16,
    color: '#820B8A',
    fontWeight: 'bold',
  },
  containerResultado: {
    backgroundColor: '#d1c4e9',
    width: '85%',
    alignSelf: 'center',
    height: '25%',
    borderRadius: 7,
    paddingTop: 20,
  },
  questionContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#d1c4e9',
    borderRadius: 10,
    width: '85%',
    alignSelf: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#820B8A',
  },
  correctAnswer: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  wrongAnswer: {
    fontSize: 16,
    color: 'red',
    marginTop: 5,
  },
});
