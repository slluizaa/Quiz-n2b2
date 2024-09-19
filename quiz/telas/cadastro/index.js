import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image ,TouchableOpacity, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';



export default function Cadastro({navigation}) {

  const [tema, setTema] = useState("");
  const [pergunta, setPergunta] = useState("")
  const [alternativa, setAlternativa] = useState("")

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
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.titulo}>Cadastro de Perguntas</Text>

          <View style={styles.containerForm}>
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
        <TextInput
          keyboardType="decimal-pad"
          placeholder="Código"
          style={styles.campo}
        />
        <TextInput
          onChangeText={(text) => setNome(text)}
          placeholder="Nome"
          style={styles.campo}
        />
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={styles.campo}
        />
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={styles.campo}
        />

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
            marginTop: 15,
          }}
        />

        <View style={styles.areaBotao}>
        <TouchableOpacity style={styles.botao} >
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} >
          <Text style={styles.textoBotao}>Apagar Tudo</Text>
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
  },
  listausuarios: {
    width: '100%',
    marginTop: 20,
  },
  usuario: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  listaNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listaTelefone: {
    fontSize: 16,
  },
  dadosBotoesAcao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dropdown:{
    backgroundColor: "black"
  }
});