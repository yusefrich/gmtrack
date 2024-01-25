import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import Icon from 'react-native-ionicons'
import {
  Alert,
  Platform,
  StyleSheet,
  useColorScheme,
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
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DeviceDetails from './pages/DeviceDetails';
import DeviceMap from './pages/DeviceMap';
import DeviceHistory from './pages/DeviceHistory';
import COLORS from './constants/colors';
import DeviceAlarms from './pages/DeviceAlarms';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const storage = new MMKVLoader().initialize();
// const TopTab = createMaterialTopTabNavigator();

/* FIXME: fix ios configuration for the package @react-native-firebase/app .:watch?v=T5LqJHQ59S8:. */
/* FIXME: fix ios configuration for the package @react-native-firebase/mesage .:watch?v=T5LqJHQ59S8:. */
/* FIXME: run pods for https://github.com/react-native-checkbox/react-native-checkbox */
/* FIXME: run pods for https://github.com/henninghall/react-native-date-picker */
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [userData, setUserData] = useState({});
  const [tokenFcm, setTokenFcm] = useState('');
  const [carrouselData, setCarrouselData] = useState([]);
  const [token, setToken] = useState('');
  const [isLogin, setIsLogin] = useMMKVStorage('isLogin', storage, false);
  // const [userData, setUserData] = useState({});

  // const RNfirebaseConfig = {
  //   apiKey: "........",
  //   authDomain: "note-app-rn.firebaseapp.com",
  //   projectId: "note-app-rn",
  //   storageBucket: "note-app-rn.appspot.com",
  //   messagingSenderId: ".....",
  //   appId: "......"
  // };

  // let app;
  // if (firebase.apps.length === 0) {
  //   app = firebase.initializeApp(RNfirebaseConfig )
  // } else {
  //   app = firebase.app()
  // }
  useEffect(() => {
    requestUserPermissions()
  }, []);

  const requestUserPermissions = async() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      let tokenFcm = await messaging().getToken();
      console.log('user token: ' + tokenFcm )
      messaging().onTokenRefresh(newToken => {
        console.log('user new token: ' + newToken )
      })
    } else {
      const status = await messaging().requestPermission();
      const enable = status === 1 || status === 2
      if (enable) {
        let tokenfcm = await messaging().getToken();
        console.log('user token: ' + tokenfcm )
        setTokenFcm(tokenfcm)
        messaging().onTokenRefresh(newToken => {
          console.log('user new token: ' + newToken )
        })
      }
    }
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }

  const submitLogin = (payload: any) => {
    setUserData(payload.userData)
    setToken(payload.token)
    setCarrouselData(payload.carrousel)
  }
  const logout = () => {
    setUserData({})
    setToken('')
  }
  const TabNav = () => (
      <>
        {!isLogin && Object.keys(userData).length === 0 &&
          <Welcome onLogin={()=>setIsLogin(true)} />
        }
        {isLogin && Object.keys(userData).length === 0 &&
          <Login submit={(value: any)=>submitLogin(value)} tokenFcm={tokenFcm} />
        }
        {Object.keys(userData).length >= 1 &&
          <Tab.Navigator 
              screenOptions={{
                tabBarActiveTintColor: COLORS.white,
                tabBarInactiveTintColor: COLORS.day,
                tabBarStyle: {
                  backgroundColor: COLORS.black
                }
              }}>
            <Tab.Screen
              name="Entrada"
              options={{
                headerShown: false,
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
              children={()=><Selecionar userData={userData} />} />
            <Tab.Screen
              name="Mensagem de alarme"
              options={{
                tabBarLabel: 'Alarmes',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="notifications" style={{color: color}} size={size} />
                  ),
                }}

              children={()=><Alarms userData={userData} />} />
            <Tab.Screen
              name="Eu"
              options={{
                tabBarLabel: 'Eu',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="person" style={{color: color}} size={size} />
                  ),
                }}
              children={()=><User userData={userData} onExit={()=>logout()} />}
            />
          </Tab.Navigator>
        }
      </>
  );


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" options={{headerShown: false}} component={TabNav} />
          <Stack.Screen name="Detalhes" children={()=><DeviceDetails userData={userData} />} />
          <Stack.Screen name="Centralizar" children={()=><DeviceMap userData={userData} />} />
          <Stack.Screen name="Historico" children={()=><DeviceHistory userData={userData} />} />
          <Stack.Screen name="Alarmes" children={()=><DeviceAlarms userData={userData} />} />
        </Stack.Navigator>
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
