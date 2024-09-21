import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image ,TouchableOpacity, TextInput, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';



export default function Cadastro({navigation}) {

  const [tema, setTema] = useState("");
  const [pergunta, setPergunta] = useState("")
  const [alternativa1, setAlternativa1] = useState("")
  const [alternativa2, setAlternativa2] = useState("")
  const [alternativa3, setAlternativa3] = useState("")
  const [alternativa4, setAlternativa4] = useState("")


  //variaveis dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const [openAcerto, setOpenAcerto] = useState(false);
  const [valueAcerto, setValueAcerto] = useState(null);
  const [itemsAcerto, setItemsAcerto] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);


  return (
    <View style={styles.container}>

          <View style={styles.containerForm}>
          <Text style={styles.titulo}>Cadastro de Perguntas</Text>
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
        <Text style={styles.label}>Pergunta:</Text>
        <TextInput
         onChangeText={(texto) => setPergunta(texto)}
          value={pergunta}
          style={styles.campo}
        />
        <Text style={styles.label}>1º alternativa:</Text>
        <TextInput
          onChangeText={(text) => setAlternativa1(text)}
          value={alternativa1}
          style={styles.campo}
        />
        <Text style={styles.label}>2º alternativa:</Text>
        <TextInput
          onChangeText={(text) => setAlternativa2(text)}
          value={alternativa2}
          style={styles.campo}
        />
        <Text style={styles.label}>3º alternativa:</Text>
        <TextInput
          onChangeText={(text) => setAlternativa3(text)}
          value={alternativa3}
          style={styles.campo}
        />
        <Text style={styles.label}>4º alternativa:</Text>
        <TextInput
          onChangeText={(text) => setAlternativa4(text)}
          value={alternativa4}
          style={styles.campo}
        />
        <Text style={styles.label}>Selecione a alternativa correta</Text>
        <DropDownPicker
          open={openAcerto}
          value={valueAcerto}
          items={itemsAcerto}
          setOpen={setOpenAcerto}
          setValue={setValueAcerto}
          setItems={setItemsAcerto}
          textStyle={{
            fontSize: 15,
            color:'#820B8A'
          }}
          containerStyle={{
            marginTop: 5
          }}
        />

        <View style={styles.areaBotao}>
        <TouchableOpacity style={styles.botao} >
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')} >
          <Text style={styles.textoBotao}> Voltar </Text>
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
    alignContent:'center'
  },
  containerForm: {
    flex:1,
    width: '100%',
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
  listausuarios: {
    width: '100%',
    marginTop: 20,
  },
    dropdown:{
    backgroundColor: "black"
  }
});