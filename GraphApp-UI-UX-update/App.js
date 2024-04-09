/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Platform,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//SCREENS
import Welcome from './screens/Welcome';
import InputGraph from './screens/InputGraph';
import DrawGraph from './screens/DrawGraph';
import GraphSearch from './screens/GraphSearch';
import InputGraphSearch from './screens/InputGraphSearch';
import GraphSearchPrim from './screens/GraphSearchPrim';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faDice, faXmark, faPaintBrush, faArrowLeft, faCheck} from '@fortawesome/free-solid-svg-icons';
import BootSplash from "react-native-bootsplash";
import TestAnimationScreen from './screens/TestAnimationScreen';

library.add(fab, faSquareCheck, faXmark, faDice, faPaintBrush, faArrowLeft, faCheck)

const Stack = createNativeStackNavigator();

import Animated from 'react-native-reanimated';






function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome" component={Welcome} options = {{headerShown: false}}/>
        <Stack.Screen name="InputGraph" component={InputGraph} options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right'
          }}/>
        <Stack.Screen name="DrawGraph" component={DrawGraph} options={{ 
          headerShown: false,
          animationTypeForReplace: 'pop',
          animation: 'fade_from_bottom'
          }}/>
        <Stack.Screen name="GraphSearch" component={GraphSearch} options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          animation: 'fade'
          }}/>
        <Stack.Screen name="InputGraphSearch" component={InputGraphSearch} options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          animation: 'fade_from_bottom'
          }}/>
        <Stack.Screen name="TestAnimationScreen" component={TestAnimationScreen} options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          animation: 'fade'
          
          }}/>
          <Stack.Screen name="GraphSearchPrim" component={GraphSearchPrim} options={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          animation: 'fade'
          
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
