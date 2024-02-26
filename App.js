/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
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
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome" component={Welcome} options = {{headerShown: false}}/>
        <Stack.Screen name="InputGraph" component={InputGraph} options={{ title: 'Chọn loại đồ thị' }}/>
        <Stack.Screen name="DrawGraph" component={DrawGraph} options={{ title: 'Đồ thị' }}/>
        <Stack.Screen name="GraphSearch" component={GraphSearch} options={{ title: 'Duyệt đồ thị' }}/>
        <Stack.Screen name="InputGraphSearch" component={InputGraphSearch} options={{ title: 'Nhập duyệt đồ thị' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
