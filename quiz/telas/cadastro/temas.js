import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { adicionaTema, createTable, obtemTodosTemas, temaExiste, excluiTema, editaTema } from '../../services/dbservice';
import uuid from 'react-native-uuid';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'NativeDatabase.closeAsync',
  'Error: Call to function NativeDatabase.closeAsync',
  'Erro ao obter temas:  Call to function'
]);

export default function Cadastro({ navigation }) {
  const [tema, setTema] = useState("");
  const [idTemaEditando, setIdTemaEditando] = useState(null);
  const [temas, setTemas] = useState([]);
  const [showTema, setShowTema] = useState(false);

  useEffect(() => {
    async function setupDatabase() {
      try {
        await createTable();
      } catch (e) {
        console.log("Erro ao criar tabelas: ", e.message);
      }
    }
    setupDatabase();
    carregaDados();
  }, []);

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
        const resultado = await editaTema(obj);
        if (resultado) {
          Alert.alert('Sucesso!', 'Tema atualizado com sucesso!');
        } else {
          Alert.alert('Erro!', 'Não foi possível atualizar o tema.');
        }
        limparCampos();
        await carregaDados();
      } catch (e) {
        console.log("Erro ao atualizar: ", e.message);
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
        const resultado = await adicionaTema(obj);
        if (resultado) {
          Alert.alert('Sucesso!', 'Tema salvo com sucesso!');
        } else {
          Alert.alert('Erro!', 'Não foi possível salvar o tema.');
        }
        limparCampos();

      } catch (e) {
        console.log("Erro ao salvar: ", e.message);
      }
    }
  }

  async function excluirTema(id_tema) {
    try {
      await excluiTema(id_tema);
      await carregaDados();
      Alert.alert("Tema excluído com sucesso!");
    } catch (e) {
      console.log("Erro ao excluir: ", e.message);
    }
  }

  async function editarTema(tema) {
    setTema(tema.tema);
    setIdTemaEditando(tema.id_tema);
  }

  function limparCampos() {
    setTema("");
    setIdTemaEditando(null);
  }

  async function carregaDados() {
    try {
      const temasCarregados = await obtemTodosTemas();
      setTemas(temasCarregados);
      setShowTema(true);
    } catch (e) {
      console.log("Erro ao carregar dados: ", e.message);
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
                <View style={styles.iconsContainer}>
                  <TouchableOpacity onPress={() => editarTema(tema)} style={{ marginBottom: 5 }}>
                    <Ionicons name='pencil' size={20} color='#820B8A' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => excluirTema(tema.id_tema)}>
                    <Ionicons name='trash' size={20} color='#820B8A' />
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
  iconsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    height: 'auto',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    paddingRight: 50,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    position: 'relative',
    minHeight: 60,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    paddingRight: 50,
  },
});
