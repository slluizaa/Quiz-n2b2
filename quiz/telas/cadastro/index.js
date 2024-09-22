import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, FlatList, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import { obtemTodosTemas, obtemTodasPerguntas, adicionaPergunta, obtemTodosTemas, adicionaAlternativa, excluiPergunta } from '../../services/dbservice';
import uuid from 'react-native-uuid';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

export default function Cadastro({ navigation }) {
  const [tema, setTema] = useState(null);
  const [pergunta, setPergunta] = useState('');
  const [alternativa1, setAlternativa1] = useState('');
  const [alternativa2, setAlternativa2] = useState('');
  const [alternativa3, setAlternativa3] = useState('');
  const [alternativa4, setAlternativa4] = useState('');
  const [valueAcerto, setValueAcerto] = useState(null);
  const [perguntas, setPerguntas] = useState([])
  const [showPergunta, setShowPergunta] = useState(false); // Perguntas salvas para o tema selecionado

  // DropDownPicker para Temas
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]); // Para armazenar os temas

  // DropDownPicker para Alternativa Correta
  const [openAcerto, setOpenAcerto] = useState(false);
  const [itemsAcerto, setItemsAcerto] = useState([]); // Para armazenar as alternativas

  useEffect(() => {
    async function carregaTemas() {
      try {
        const temasCadastrados = await obtemTodosTemas();
        const temasDropdown = temasCadastrados.map((tema) => ({
          label: tema.tema,
          value: tema.id_tema,
        }));
        setItems(temasDropdown); // Define os temas no dropdown
      } catch (error) {
        Alert.alert('Erro ao carregar os temas', error.message);
      }
    }
    carregaTemas();
  }, []);


  async function salvarPergunta() {
    if (!tema || !pergunta || !alternativa1 || !alternativa2 || !alternativa3 || !alternativa4 || !valueAcerto) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    const idPergunta = uuid.v4();

    try {
      await adicionaPergunta({ id_pergunta: idPergunta, id_tema: tema, pergunta });

      const alternativas = [
        { texto: alternativa1, correta: alternativa1 === valueAcerto },
        { texto: alternativa2, correta: alternativa2 === valueAcerto },
        { texto: alternativa3, correta: alternativa3 === valueAcerto },
        { texto: alternativa4, correta: alternativa4 === valueAcerto },
      ];

      for (const alternativa of alternativas) {
        await adicionaAlternativa({
          id_alternativa: uuid.v4(),
          id_pergunta: idPergunta,
          alternativa: alternativa.texto,
          resposta: alternativa.correta ? 'sim' : 'não',
        });
      }

      Alert.alert('Sucesso', 'Pergunta e alternativas salvas com sucesso!');
      limparCampos();
    } catch (error) {
      Alert.alert('Erro ao salvar', error.message);
    }
  }


  function limparCampos() {
    setTema(null);
    setPergunta('');
    setAlternativa1('');
    setAlternativa2('');
    setAlternativa3('');
    setAlternativa4('');
    setValueAcerto(null);
    setPerguntas([]); // Limpa a lista de perguntas
  }

  // Preencher as alternativas no DropDownPicker de alternativas corretas
  useEffect(() => {
    const alternativasDropdown = [
      { label: alternativa1, value: alternativa1 },
      { label: alternativa2, value: alternativa2 },
      { label: alternativa3, value: alternativa3 },
      { label: alternativa4, value: alternativa4 },
    ];
    setItemsAcerto(alternativasDropdown);
  }, [alternativa1, alternativa2, alternativa3, alternativa4]);


  async function carregaPerguntas() {
    try {
      const perguntasCarregadas = await obtemTodasPerguntas();
      setPerguntas(perguntasCarregadas);
      setShowPergunta(true)
    } catch (error) {
      Alert.alert('Erro ao carregar as perguntas', error.message);
    }
  }


  async function excluirPergunta(idPergunta) {
    try {
      await excluiPergunta(idPergunta);
      carregaPerguntas();
    } catch (error) {
      Alert.alert('Erro ao excluir a pergunta', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerForm}>
          <Text style={styles.titulo}>Cadastro de Perguntas</Text>

          <Text style={styles.label}>Selecione o tema</Text>
          <DropDownPicker
            open={open}
            value={tema}
            items={items}
            setOpen={setOpen}
            setValue={setTema}
            setItems={setItems}
            textStyle={{
              fontSize: 15,
              color: '#820B8A',
            }}
          />

          <Text style={styles.label}>Pergunta:</Text>
          <TextInput
            onChangeText={setPergunta}
            value={pergunta}
            style={styles.campo}
          />

          <Text style={styles.label}>1º alternativa:</Text>
          <TextInput
            onChangeText={setAlternativa1}
            value={alternativa1}
            style={styles.campo}
          />

          <Text style={styles.label}>2º alternativa:</Text>
          <TextInput
            onChangeText={setAlternativa2}
            value={alternativa2}
            style={styles.campo}
          />

          <Text style={styles.label}>3º alternativa:</Text>
          <TextInput
            onChangeText={setAlternativa3}
            value={alternativa3}
            style={styles.campo}
          />

          <Text style={styles.label}>4º alternativa:</Text>
          <TextInput
            onChangeText={setAlternativa4}
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
              color: '#820B8A',
            }}
          />

          <View style={styles.areaBotao}>
            <TouchableOpacity style={styles.botao} onPress={salvarPergunta}>
              <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={carregaPerguntas}>
              <Text style={styles.textoBotao}>Carregar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.textoBotao}>Voltar</Text>
            </TouchableOpacity>
          </View>

        </View>

        <StatusBar style="auto" />

        {
          showPergunta && (
            <ScrollView style={{ marginTop: 20, width: '100%' }}>
              {perguntas.length > 0 && perguntas.map((pergunta, index) => (
                <Animatable.View
                  key={index}
                  animation="fadeInUp"
                  duration={600}
                  style={styles.card}
                >
                  <Text style={styles.cardText}> {pergunta.pergunta}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => editarTema(pergunta)} style={{ marginRight: 10 }}>
                      <Ionicons name='pencil' size={24} color='#820B8A' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => excluirPergunta(pergunta.id_pergunta)}>
                      <Ionicons name='trash' size={24} color='#820B8A' />
                    </TouchableOpacity>
                  </View>
                </Animatable.View>
              ))}
            </ScrollView>
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCD6F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginVertical: 10,
  },
  containerForm: {
    flex: 1,
    width: '95%',
  },
  titulo: {
    fontSize: 30,
    color: '#820B8A',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
  label: {
    marginTop: 7,
    fontSize: 18,
    color: '#820B8A',
    fontWeight: 'bold',
  },
  campo: {
    width: '100%',
    height: 50,
    fontSize: 20,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#F4E04D',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    width: '30%',
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
    color: '#820B8A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  perguntaContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  perguntaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alternativa: {
    marginTop: 5,
    fontSize: 16,
    color: '#333',
  },
  botaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
  },
});