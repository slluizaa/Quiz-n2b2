import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image ,TouchableOpacity} from 'react-native';

import logo from '../../assets/logo.png';


export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('jogar')}>
        <Text style={styles.textoBotao}>Jogar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoCadastroPergunta} onPress={() => navigation.navigate('cadastro')}>
        <Text style={styles.textoBotao}>Cadastrar Perguntas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoCadastroPergunta} onPress={() => navigation.navigate('temas')}>
        <Text style={styles.textoBotao}>Cadastrar tema</Text>
      </TouchableOpacity>
      <Text style={styles.textBrinks}>by:Calorina e Luzia💃🏼</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCD6F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:0,
  },
  logo:{
    width:'100%',
    height:'50%',
    marginVertical:20,
  },
  botao:{
    backgroundColor: '#F4E04D',
    width:'30%',
    height:'6%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    marginTop:10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  textoBotao:{
    color:'#820B8A',
    fontSize:20,
    fontWeight: 'bold'
  },
  botaoCadastroPergunta:{
    backgroundColor: '#F4E04D',
    width:'50%',
    height:'6%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    marginTop:10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  textBrinks:{
    marginTop:30,
    fontSize:15,
    color:'#820B8A',
  }
});
