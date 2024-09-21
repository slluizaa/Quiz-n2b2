import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import { obtemTodasPerguntas, adicionaPergunta,obtemTodosTemas, adicionaAlternativa, excluiPergunta } from '../../services/dbservice';
import uuid from 'react-native-uuid';

export default function Cadastro({ navigation }) {
  const [tema, setTema] = useState(null); // ID do tema selecionado
  const [pergunta, setPergunta] = useState('');
  const [alternativa1, setAlternativa1] = useState('');
  const [alternativa2, setAlternativa2] = useState('');
  const [alternativa3, setAlternativa3] = useState('');
  const [alternativa4, setAlternativa4] = useState('');
  const [valueAcerto, setValueAcerto] = useState(null); // Alternativa correta
  const [perguntas, setPerguntas] = useState([]); // Perguntas salvas para o tema selecionado

  // DropDownPicker para Temas
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]); // Para armazenar os temas

  // DropDownPicker para Alternativa Correta
  const [openAcerto, setOpenAcerto] = useState(false);
  const [itemsAcerto, setItemsAcerto] = useState([]); // Para armazenar as alternativas

  // Carrega os temas cadastrados
  useEffect(() => {
    async function carregaTemas() {
      try {
        const temasCadastrados = await obtemTodosTemas(); // Função que busca os temas do banco
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

  // Função para salvar a pergunta e as alternativas
  async function salvarPergunta() {
    if (!tema || !pergunta || !alternativa1 || !alternativa2 || !alternativa3 || !alternativa4 || !valueAcerto) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    const idPergunta = uuid.v4();

    // Salvar a pergunta no banco de dados
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

  // Limpar os campos após salvar
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

  // Função para carregar todas as perguntas
  async function carregaPerguntas() {
    try {
      const perguntasCarregadas = await obtemTodasPerguntas(); // Altere para uma função que retorna todas as perguntas
      setPerguntas(perguntasCarregadas);
    } catch (error) {
      Alert.alert('Erro ao carregar as perguntas', error.message);
    }
  }

  // Função para excluir pergunta
  async function excluirPergunta(idPergunta) {
    try {
      await excluiPergunta(idPergunta);
      carregaPerguntas(); // Recarrega as perguntas após excluir
    } catch (error) {
      Alert.alert('Erro ao excluir a pergunta', error.message);
    }
  }

  return (
    <View style={styles.container}>
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

        <FlatList
          data={perguntas}
          keyExtractor={(item) => item.id_pergunta}
          renderItem={({ item }) => (
            <View style={styles.perguntaContainer}>
              <Text style={styles.perguntaTitulo}>{item.pergunta}</Text>
              {item.alternativas.map((alternativa, altIndex) => (
                <Text key={altIndex} style={styles.alternativa}>
                  {alternativa.alternativa} - {alternativa.resposta === 'sim' ? 'Correta' : 'Incorreta'}
                </Text>
              ))}
              <View style={styles.botaoContainer}>
                <TouchableOpacity style={styles.botaoEditar} onPress={() => { /* Implementar função para editar */ }}>
                  <Text style={styles.textoBotao}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluirPergunta(item.id_pergunta)}>
                  <Text style={styles.textoBotao}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
    justifyContent: 'center',
    padding: 20,
    marginVertical: 10,
  },
  containerForm: {
    flex: 1,
    width: '100%',
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
  botaoEditar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  botaoExcluir: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
});
