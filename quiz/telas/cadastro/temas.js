import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, Keyboard, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { adicionaTema, createTable, obtemTodosTemas, temaExiste, excluiTema, editaTema } from '../../services/dbservice';
import uuid from 'react-native-uuid';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons'; 

export default function Cadastro({ navigation }) {
  const [tema, setTema] = useState(""); // Para armazenar o tema que será digitado
  const [idTemaEditando, setIdTemaEditando] = useState(null); // Para armazenar o id do tema que está sendo editado
  const [temas, setTemas] = useState([]); // Para armazenar a lista de temas
  const [showTema, setShowTema] = useState(false); // Controla se a lista de temas deve ser mostrada

  useEffect(() => {
    async function setupDatabase() {
      try {
        await createTable();
      } catch (e) {
        console.log(e);
      }
    }

    setupDatabase();
    carregaDados(); // Carrega os temas ao iniciar o componente
  }, []);

  //Remove os acentos e converte todas as letras da palavra em minúsculo
  function normalizarTexto(texto) {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  async function salvaTemas() {
    if (!tema) {
      Alert.alert("Preencher o campo tema!");
      return;
    }

    const temaNormalizado = normalizarTexto(tema);

    if (idTemaEditando) {
      let obj = {
        id_tema: idTemaEditando,
        tema: temaNormalizado,
      };

      try {
        const resultado = await editaTema(obj); // Edita o tema no banco de dados
        if (resultado) {
          Alert.alert('Sucesso!', 'Tema atualizado com sucesso!');
        } else {
          Alert.alert('Erro!', 'Não foi possível atualizar o tema.');
        }
        limparCampos();
        await carregaDados(); // Recarrega a lista após a edição
      } catch (e) {
        Alert.alert('Erro ao atualizar o tema', e.message); // Exibe o erro de maneira clara
      }
    } else {
      const existe = await temaExiste(temaNormalizado);
      if (existe) {
        Alert.alert("Erro!", "Esse tema já existe.");
        return;
      }

      let obj = {
        id_tema: uuid.v4(),
        tema: temaNormalizado,
      };

      try {
        const resultado = await adicionaTema(obj); // Adiciona o tema no banco de dados
        if (resultado) {
          Alert.alert('Sucesso!', 'Tema salvo com sucesso!');
        } else {
          Alert.alert('Erro!', 'Não foi possível salvar o tema.');
        }
        limparCampos();

      } catch (e) {
        Alert.alert('Erro ao salvar o tema', e.message);
      }
    }
  }

  async function excluirTema(id_tema) {
    try {
      await excluiTema(id_tema);
      await carregaDados();
      Alert.alert("Tema excluído com sucesso!");
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function editarTema(tema) {
    setTema(tema.tema); // Preenche o campo de entrada com o tema a ser editado
    setIdTemaEditando(tema.id_tema); // Armazena o ID do tema sendo editado
  }

  function limparCampos() {
    setTema("");
    setIdTemaEditando(null); // Limpa o id para não entrar no modo de edição
  }

  async function carregaDados() {
    try {
      const temasCarregados = await obtemTodosTemas();
      setTemas(temasCarregados); // Atualiza o estado com a lista de temas
      setShowTema(true); // Exibe a lista quando o botão Carregar é clicado
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <View style={styles.containerForm}>
        <Text style={styles.titulo}>Cadastro de novos temas</Text>
        <TextInput
          onChangeText={(text) => setTema(text)}
          value={tema}
          style={styles.campo}
        />

        <View style={styles.botaoLinha}>
          <TouchableOpacity style={styles.botao} onPress={() => salvaTemas()} >
            <Text style={styles.textoBotao}>{idTemaEditando ? 'Atualizar' : 'Salvar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={() => carregaDados()} >
            <Text style={styles.textoBotao}>Carregar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.botaoCentralizado}>
          <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.textoBotao}>Voltar</Text>
          </TouchableOpacity>
        </View>

      </View>

      <StatusBar style="auto" />

      {
        showTema && (
          <ScrollView style={{ marginTop: 20, width: '100%' }}>
            {temas.length > 0 && temas.map((tema, index) => (
              <Animatable.View
                key={index}
                animation="fadeInUp"
                duration={600}
                style={styles.card}
              >
                <Text style={styles.cardText}>Tema: {tema.tema}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <TouchableOpacity onPress={() => editarTema(tema)} style={{ marginRight: 10 }}>
                    <Ionicons name='pencil' size={24} color='#820B8A' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => excluirTema(tema.id_tema)}>
                    <Ionicons name='trash' size={24} color='#820B8A' />
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            ))}
          </ScrollView>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#DCD6F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginVertical: 10,
  },
  logo: {
    width: '50%',
    height: '10%',
    marginVertical: 20,
  },
  containerForm: {
    width: '100%',
  },
  titulo: {
    fontSize: 30,
    marginBottom: 30,
    color: '#820B8A',
    fontWeight: 'bold',
    alignSelf: 'center'
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
    marginTop: 10,
  },
  botao: {
    backgroundColor: '#F4E04D',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    width: '40%'
  },
  botaoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  botaoCentralizado: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  textoBotao: {
    color: '#820B8A',
    fontSize: 20,
    fontWeight: 'bold'
  },
});
