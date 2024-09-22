import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import { obtemTodosTemas, contaPerguntas } from '../../services/dbservice'; // Importar a função para contar perguntas
import logo from '../../assets/logo.png';

export default function Jogar({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null); // Para armazenar o ID do tema selecionado
  const [items, setItems] = useState([]); // Para armazenar os temas no DropDownPicker
  const [pergunta, setPergunta] = useState(""); // Número de perguntas escolhidas pelo usuário
  const [perguntasDisponiveis, setPerguntasDisponiveis] = useState(0); // Perguntas disponíveis para o tema selecionado

  // Carregar os temas quando o componente montar
  useEffect(() => {
    async function carregaTemas() {
      try {
        const temasCadastrados = await obtemTodosTemas(); // Buscar os temas do banco de dados
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

  // Função chamada quando o usuário seleciona um tema
  useEffect(() => {
    if (value) {
      // Se um tema for selecionado, contar as perguntas disponíveis para o tema
      async function buscaPerguntasDisponiveis() {
        try {
          const totalPerguntas = await contaPerguntas(value);
          setPerguntasDisponiveis(totalPerguntas);
        } catch (error) {
          Alert.alert('Erro ao contar perguntas', error.message);
        }
      }
      buscaPerguntasDisponiveis();
    }
  }, [value]);

  // Função para iniciar o jogo
  const iniciarJogo = () => {
    const numeroPerguntas = parseInt(pergunta);

    if (isNaN(numeroPerguntas) || numeroPerguntas <= 0) {
      Alert.alert('Erro', 'Por favor, insira um número válido de perguntas.');
      return;
    }

    if (numeroPerguntas > perguntasDisponiveis) {
      Alert.alert(
        'Erro',
        `Você escolheu mais perguntas do que estão disponíveis. O máximo para esse tema é ${perguntasDisponiveis}.`
      );
    } else {
      // Passar para a próxima tela com o tema e o número de perguntas
      navigation.navigate('Jogo', { parametroTema: value, numeroPerguntas });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Image source={logo} style={styles.logo} />
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
            color: '#820B8A'
          }}
        />
        <Text style={styles.labelDisponiveis}>Perguntas disponíveis: {perguntasDisponiveis}</Text>

        <Text style={styles.label}>Quantas perguntas você deseja?</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={setPergunta}
          value={pergunta}
          style={styles.campo}
          placeholder="Digite o número de perguntas"
        />

        <View style={styles.areaBotao}>
          <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.textoBotao}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={iniciarJogo}>
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
    justifyContent: 'center',
    padding: 20,
    marginVertical: 10,
  },
  logo: {
    width: '50%',
    height: '10%',
    marginVertical: 20,
    alignSelf: 'center'
  },
  containerForm: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  label: {
    marginTop: 7,
    fontSize: 18,
    color: '#820B8A',
    fontWeight: 'bold'
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
    marginBottom: 10
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
  areaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20
  },
  textoBotao: {
    color: '#820B8A',
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerPerguntas: {
    backgroundColor: '#d1c4e9',
    width: '35%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    margin: 10
  },
  textoPerguntas: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#820B8A',
  },
  labelDisponiveis: {
    marginTop: 7,
    fontSize: 18,
    color: '#820B8A',
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});
