import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image ,TouchableOpacity,TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';

import logo from '../../assets/logo.png';



export default function Jogar ({navigation,route}) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Historia', value: 'Historia'},
    {label: 'Matematica', value: 'matematica'}
  ]);
  const [pergunta,setPergunta] = useState(" ")
  const [perguntasDisponiveis , setPerguntasDisponiveis] = useState(" ")
  
  return (
    <View style={styles.container}>
        <View style={styles.containerForm}>
        <Image source={logo} style={styles.logo}/>
        <Text style={styles.label}>Selecione o tema</Text>
          <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          textStyle={{
            fontSize: 15,
            color:'#820B8A'
          }}
          />
          <Text style={styles.labelDisponiveis}>Perguntas disponiveis</Text>
          <View style={styles.containerPerguntas}>
          <Text style={styles.textoPerguntas}
          value={perguntasDisponiveis}> 23</Text>
          </View>
          <Text style={styles.label}>Quantas perguntas você deseja?</Text>
          <TextInput
            onChangeText={(text) => setPergunta(text)}
            value={pergunta}
            style={styles.campo}
          />
          
        <View style={styles.areaBotao}>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Jogo',  { parametroTema:value } )}>
        <Text style={styles.textoBotao}>Jogar</Text>
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
    alignSelf:'center'
  },
  containerForm: {
    flex:1,
    width: '100%',
    justifyContent:'center',
  },
  titulo: {
    fontSize: 30,
    color:'#820B8A',
    fontWeight: 'bold',
    alignSelf:'center',
    marginBottom:10,
    marginTop:40
  },
  label:{
    marginTop:7,
    fontSize:18,
    color:'#820B8A',
    fontWeight: 'bold'
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
    marginBottom:10
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
    color: '#820B8A',
    fontSize: 20,
    fontWeight: 'bold'
  },
  dropdown:{
    backgroundColor: "black"
  },
  containerPerguntas:{
    backgroundColor:'#d1c4e9',
    width:'35%',
    alignSelf:'center',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:7,
    margin: 10
  },
  textoPerguntas:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#820B8A',
  },
  labelDisponiveis:{
    marginTop:7,
    fontSize:18,
    color:'#820B8A',
    fontWeight: 'bold',
    alignSelf:'center'
  }
});
