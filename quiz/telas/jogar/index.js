import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image ,TouchableOpacity} from 'react-native';

import logo from '../../assets/logo.png';


export default function Jogar ({navigation}) {
  return (
    <View style={styles.container}>

        <Text>Bora jogar!!</Text>
        <TouchableOpacity style={styles.botaoCadastroPergunta} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>


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
  }
});
