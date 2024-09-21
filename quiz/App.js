import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './telas/Home';
import Cadastro from './telas/cadastro';
import Jogar from './telas/jogar';
import Temas from './telas/cadastro/temas';
import Jogo from './telas/jogar/Jogo';
import Score from './telas/jogar/score';


/* Help:
https://reactnavigation.org/docs/hello-react-navigation
https://reactnavigation.org/docs/native-stack-navigator/#headerbackvisible


// pacotes para instalar: 
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native-stack
*/


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown:false} }/>
        <Stack.Screen name="cadastro" component={Cadastro} options={{ headerShown:false, animation:'slide_from_right' }} />
        <Stack.Screen name="jogar" component={Jogar} options={{ headerShown:false, animation:'slide_from_right'}} />
        <Stack.Screen name="temas" component={Temas} options={{ headerShown:false, animation:'slide_from_right'}} /> 
        <Stack.Screen name="Jogo" component={Jogo} options={{ headerShown:false, animation:'slide_from_right'}} /> 
        <Stack.Screen name="Score" component={Score} options={{ headerShown:false, animation:'slide_from_right'}} /> 
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}


