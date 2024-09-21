import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image ,TouchableOpacity,TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';

import logo from '../../assets/logo.png';



export default function Score ({navigation,route}) {

  
  return (
    <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <View style={styles.containerResultado}>
        <Text style={styles.titulo}>Bom jogo!</Text>
        <Text style={styles.texto}>Você acertou:</Text>
        <Text style={styles.textoResultado}>{route.params?.parametroPontos} de {route.params?.totalQuestions}</Text>
        </View>
        <View style={styles.areaBotao}>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('jogar' )}>
        <Text style={styles.textoBotao}>Jogar</Text>
        </TouchableOpacity>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#DCD6F7',
    justifyContent:'center',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    justifyContent:'center',
  },
  logo:{
    width:'50%',
    height:'10%',
    marginVertical:20,
    alignSelf:'center'
  },
  titulo: {
    fontSize: 30,
    color:'#820B8A',
    fontWeight: 'bold',
    alignSelf:'center',
    marginBottom:10,
    marginTop:20
  },
  texto: {
    fontSize: 30,
    color:'#820B8A',
    fontWeight: 'bold',
    alignSelf:'center',
    marginBottom:10,
  },
  textoResultado: {
    fontSize: 30,
    color:'#820B8A',
    fontWeight: 'bold',
    alignSelf:'center',
    marginBottom:10,
    marginTop:20
    
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
    marginBottom:20
  },
  textoBotao: {
    textAlign: 'center',
    fontSize: 16,
    color:'#820B8A',
    fontWeight: 'bold',
  },
  containerResultado:{
    backgroundColor:'#d1c4e9',
    width:'85%',
    alignSelf:'center',
    height:'35%',
    borderRadius:7,
    paddingTop:20
  },
});
