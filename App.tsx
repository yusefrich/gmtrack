import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import {GEOCODING_KEY} from '@env'
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-ionicons'
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import Geocoder from 'react-native-geocoding';
import DeviceTerminal from './pages/DeviceTerminal';
import AlarmDetail from './pages/AlarmDetail';
import Chat from './pages/Chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GmIcon from './components/GmIcon';
import Financeiro from './pages/Financeiro';
import MinhasFaturas from './pages/MinhasFaturas';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const storage = new MMKVLoader().initialize();
Geocoder.init(process.env.GEOCODING_KEY, {language : "pt"})
// const TopTab = createMaterialTopTabNavigator();

/* FIXME: ios setup https://react-native-async-storage.github.io/async-storage/docs/install */
/* FIXME: ios setup https://github.com/react-native-clipboard/clipboard#react-native-communityclipboard */
/* FIXME: fix ios configuration for the package @react-native-firebase/app .:watch?v=T5LqJHQ59S8:. */
/* FIXME: fix ios configuration for the package @react-native-firebase/mesage .:watch?v=T5LqJHQ59S8:. */
/* FIXME: run pods for https://github.com/react-native-checkbox/react-native-checkbox */
/* FIXME: run pods for https://github.com/henninghall/react-native-date-picker */
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [userData, setUserData] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('Monitor');
  const [tokenFcm, setTokenFcm] = useState('');
  const [carrouselData, setCarrouselData] = useState([]);
  const [token, setToken] = useState('');
  const [isLogin, setIsLogin] = useMMKVStorage('isLogin', storage, false);
  // const [userData, setUserData] = useState({});

  const RNfirebaseConfig = {
    apiKey: "........",
    authDomain: "note-app-rn.firebaseapp.com",
    projectId: "note-app-rn",
    storageBucket: "note-app-rn.appspot.com",
    messagingSenderId: ".....",
    appId: "......"
  };

  let app;
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(RNfirebaseConfig )
  } else {
    app = firebase.app()
  }

  const getIsLogged = async () => {
    console.log('get is logged being called')
    try {
      const value = await AsyncStorage.getItem('isLogged');
      console.log('is logged', value)
      if (value !== null) {
        // value previously stored
        setIsLogged(value === 'yes')
      }
    } catch (e) {
      // error reading value
      console.error(e)
      setIsLogged(false)
    }
  };
  const requestUserPermissions = async() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      let tokenFcm = await messaging().getToken();
      console.log('user fcm token: ' + tokenFcm )
      messaging().onTokenRefresh(newToken => {
        console.log('user new token: ' + newToken )
      })
    } else {
      const status = await messaging().requestPermission();
      const enable = status === 1 || status === 2
      if (enable) {
        let tokenfcm = await messaging().getToken();
        console.log('user fcm token: ' + tokenfcm )
        setTokenFcm(tokenfcm)
        messaging().onTokenRefresh(newToken => {
          console.log('user new token: ' + newToken )
        })
      }
    }
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('' + remoteMessage?.notification?.title, remoteMessage?.notification?.body);
    });

    return unsubscribe;
  }

  const submitLogin = (payload: any) => {
    console.log('submit login ', payload)
    setCarrouselData(payload.carrousel)
    setUsername(payload.userData.client.Nome)
    setToken(payload.token)
    setUserData(payload.userData)
  }
  const logout = () => {
    setUserData({})
    setToken('')
    try {
        AsyncStorage.setItem('isLogged', 'no');
    } catch (e) {
        console.error('(logout) async storage cant be accessed erro: ', e)
        // saving error
    }
  }
  function NavHeader(props: any, goBack: boolean, title: string) {
    return <View style={{height: 78, backgroundColor: '#202125', justifyContent: 'space-between'}}>
      {goBack &&
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{backgroundColor: '#595A5E', margin: 16, zIndex: 10, marginLeft: 21, borderRadius: 16, width: 45, padding: 10}}>
          <GmIcon name="arrow-left" size={24} color={'#FFFFFF'} />
        </TouchableOpacity>
      }
      <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', position: 'absolute', width: '100%', textAlign: 'center', height: '100%', textAlignVertical: 'center'}}>{title.substring(0, 20)} {title.length > 20 && '...'}</Text>
    </View>;
  }
  useEffect(() => {
    try {
        AsyncStorage.setItem('isLogged', 'no');
    } catch (e) {
        console.error('(app) async storage cant be accessed erro: ', e)
        // saving error
    }
    requestUserPermissions()
  }, []);
  useEffect(() => {
    // getIsLogged()
  })
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
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.day,
                tabBarStyle: {
                  backgroundColor: COLORS.black,
                  borderColor: COLORS.black,
                  // elevation: 5,
                  height: 70
                }
              }}>
            <Tab.Screen
              name="Entrada"
              options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({ color, size, focused}) => (
                    // <Icon name="home" style={{color: color}} size={size} />
                    <View style={{padding: 10, marginTop: 15, backgroundColor: focused ? COLORS.dawn : COLORS.grey, borderRadius: 15 }}>
                      <GmIcon name="home" size={size} color={color} />
                    </View>
                  ),
                }}
              children={()=><Home carrousel={carrouselData} loading={false}/>}
            />
            <Tab.Screen
              name={username}
              options={{
                tabBarLabel: '',
                // headerTitleAlign: 'center',
                header: (props) => NavHeader(props, true, username),
                tabBarIcon: ({ color, size, focused }) => (
                    // <Icon name="globe" style={{color: color}} size={size} />
                    <View style={{padding: 10, marginTop: 15, backgroundColor: focused ? COLORS.dawn : COLORS.grey, borderRadius: 15 }}>
                      <GmIcon name="monitor" size={size} color={color} />
                    </View>
                  ),
                }}
              children={()=><Monitor userData={userData} />}
            />
            <Tab.Screen
              name="Selecionar"
              options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size, focused }) => (
                    // <Icon name="list" style={{color: color}} size={size} />
                    <View style={{padding: 10, marginTop: 15, backgroundColor: focused ? COLORS.dawn : COLORS.grey, borderRadius: 15 }}>
                      <GmIcon name="selecionar" size={size} color={color} />
                    </View>
                  ),
                }}
              children={()=><Selecionar userData={userData} />} />
            <Tab.Screen
              name="Mensagem de alarme"
              options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size, focused }) => (
                    // <Icon name="notifications" style={{color: color}} size={size} />
                    <View style={{padding: 10, marginTop: 15, backgroundColor: focused ? COLORS.dawn : COLORS.grey, borderRadius: 15 }}>
                      <GmIcon name="alertas" size={size} color={color} />
                    </View>
                  ),
                }}

              children={()=><Alarms userData={userData} />} />
            {/* <Tab.Screen
              name="Eu"
              options={{
                tabBarLabel: 'Eu',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="person" style={{color: color}} size={size} />
                  ),
                }}
              children={()=><User userData={userData} onExit={()=>logout()} />}
            /> */}
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
          <Stack.Screen name="Comandos" children={()=><DeviceTerminal userData={userData} />} />
          <Stack.Screen name="Centralizar" children={()=><DeviceMap userData={userData} />} />
          <Stack.Screen name="Historico" children={()=><DeviceHistory userData={userData} />} />
          <Stack.Screen name="Alarmes" children={()=><DeviceAlarms userData={userData} />} />
          <Stack.Screen name="Alarme" children={()=><AlarmDetail userData={userData} />} />
          <Stack.Screen name="Chat" children={()=><Chat />} options={{header: (props) => NavHeader(props, true, 'Chat')}} />
          <Stack.Screen name="Financeiro" children={()=><Financeiro userData={userData} />} options={{header: (props) => NavHeader(props, true, 'Financeiro')}}
            // options={{
            //   title: 'Financeiro',
            //   headerTintColor: COLORS.day,
            //   headerStyle: {
            //     backgroundColor: '#202125',
            //   }
            // }}
          />
          <Stack.Screen name="Faturas" children={()=><MinhasFaturas userData={userData} />} options={{header: (props) => NavHeader(props, true, 'Minhas Faturas')}}
            // options={{
            //   title: 'Minhas Faturas',
            //   headerTintColor: COLORS.day,
            //   headerStyle: {
            //     backgroundColor: '#202125',
            //   }
            // }}
          />
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
