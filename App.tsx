import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import Icon from 'react-native-ionicons'
// import Icon from 'react-native-easy-icon';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  PermissionsAndroid,
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
// import { WebView } from 'react-native-webview';
import User from './pages/User';
import Selecionar from './pages/Selecionar';
import Alarms from './pages/Alarms';
import Monitor from './pages/Monitor';
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();
// const TopTab = createMaterialTopTabNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [carrouselData, setCarrouselData] = useState([]);
  const [token, setToken] = useState('');
  // const [userData, setUserData] = useState({});

  const submitLogin = (payload: any) => {
    setUserData(payload.userData)
    setToken(payload.token)
    setCarrouselData(payload.carrousel)
  }
  const logout = () => {
    setUserData({})
    setToken('')
  }

  return (
    <>
      <NavigationContainer>
        {!isLogin && Object.keys(userData).length === 0 &&
          <Welcome onLogin={()=>setIsLogin(true)} />
        }
        {isLogin && Object.keys(userData).length === 0 &&
          <Login submit={(value: any)=>submitLogin(value)} />
        }
        {Object.keys(userData).length >= 1 &&
          <Tab.Navigator>
            <Tab.Screen
              name="Entrada"
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home" style={{color: color}} size={size} />
                  ),
                }}
              children={()=><Home carrousel={carrouselData} loading={false}/>}
            />
            <Tab.Screen
              name="Monitor"
              options={{
                tabBarLabel: 'Monitor',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="globe" style={{color: color}} size={size} />
                  ),
                }}
              children={()=><Monitor userData={userData} />}
            />
            <Tab.Screen
              name="Selecionar"
              options={{
                tabBarLabel: 'Selecionar',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="list" style={{color: color}} size={size} />
                  ),
                }}
              component={Selecionar} />
            <Tab.Screen
              name="Mensagem de alarme"
              options={{
                tabBarLabel: 'Alarmes',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="notifications" style={{color: color}} size={size} />
                  ),
                }}
              component={Alarms} />
            <Tab.Screen
              name="Eu"
              options={{
                tabBarLabel: 'Eu',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="person" style={{color: color}} size={size} />
                  ),
                }}
              children={()=><User carrousel={carrouselData} onExit={()=>logout()} />}
            />
          </Tab.Navigator>
        }
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
