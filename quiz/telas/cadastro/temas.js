import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image ,TouchableOpacity, TextInput} from 'react-native';
import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';



export default function Cadastro({navigation}) {

  const [tema, setTema] = useState("");


  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>

        <View style={styles.containerForm}>
        <Text style={styles.titulo}>Cadastro de novos temas</Text>
        <TextInput
          onChangeText={(text) => setTema(text)}
          value={tema}
          style={styles.campo}
        />
        <View style={styles.areaBotao}>
        <TouchableOpacity style={styles.botao} >
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={()=> navigation.navigate('Home')}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
        </View>
      </View>

      

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCD6F7',
    alignItems: 'center',
    justifyContent:'center',
    padding: 20,
    marginVertical: 10,
  },
  logo:{
    width:'50%',
    height:'10%',
    marginVertical:20,
  },
  containerForm: {
    width: '100%',
  },
  titulo: {
    fontSize: 30,
    marginBottom: 30,
    color:'#820B8A',
    fontWeight:'bold',
    alignSelf:'center'
  },
  campo: {
    width: '100%',
    height: 50,
    fontSize: 20,
    backgroundColor:'#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    marginTop: 10,
  },
  botao: {
    backgroundColor: '#F4E04D',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    width:'40%'
  },
  areaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    borderRadius: 10,
    marginTop: 10,
  },
  textoBotao: {
    color: '#820B8A',
    fontSize: 20,
    fontWeight:'bold'
  },
  dropdown:{
    backgroundColor: "black"
  }
});