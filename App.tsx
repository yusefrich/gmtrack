import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import {GEOCODING_KEY} from '@env'
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-ionicons'
import {
  Alert,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
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
import Fatura from './pages/Fatura';
import FaturaPix from './pages/FaturaPix';
import Suporte from './pages/Suporte';
import Notas from './pages/Notas';
import NotaFiscal from './pages/NotaFiscal';
import PagamentoAuto from './pages/PagamentoAuto';
import CentralDeAjuda from './pages/CentralDeAjuda';
import DeviceInfo from './pages/DeviceInfo';
import UserInfo from './pages/UserInfo';
import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RedesSociais from './pages/RedesSociais';
import Vagas from './pages/Vagas';
// import Geolocation from '@react-native-community/geolocation';

// Geolocation.setRNConfiguration(config);

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
  const [currentModal, setCurrentModal] = useState('');
  const [currentPopupModal, setCurrentPopupModal] = useState('');
  const [popupModalVisible, setPopupModalVisible] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('Monitor');
  const [tokenFcm, setTokenFcm] = useState('');
  const [carrouselData, setCarrouselData] = useState([]);
  const [token, setToken] = useState('');
  const [isLogin, setIsLogin] = useMMKVStorage('isLogin', storage, false);
  // const [userData, setUserData] = useState({});
  const monitorRef = useRef();
  const modalRef = useRef<SwipeModalPublicMethods>(null);

  // const navigation = useNavigation()
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
  const setModal = (val: String) => {
    // console.log('modal working: ' + val);
    setCurrentModal(val);
    modalRef.current?.show();
  }
  const setPopupModal = (val: String) => {
    // console.log('modal working: ' + val);
    setCurrentPopupModal(val);
    setPopupModalVisible(true);
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

  const submitLogin = (payload: any, props: any) => {
    console.log('submit login ', payload)
    setUserData(payload.userData)
    setCarrouselData(payload.carrousel)
    setUsername(payload.userData.client.Nome)
    setToken(payload.token)
    props.navigation.push('Main')
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
  function GmNavHeader(props: any, goBack: boolean, title: string) {
    return <View style={{height: 78, backgroundColor: '#202125', justifyContent: 'space-between'}}>
      <ImageBackground source={require("./assets/main-bg.png")} style={{backgroundColor: COLORS.primary, borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
        {goBack &&
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={{backgroundColor: COLORS.primary, margin: 16, zIndex: 10, marginLeft: 21, borderRadius: 16, width: 45, padding: 10}}>
            <GmIcon name="arrow-left" size={24} color={'black'} />
          </TouchableOpacity>
        }
        <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', position: 'absolute', width: '100%', textAlign: 'center', height: '100%', textAlignVertical: 'center'}}>{title.substring(0, 20)} {title.length > 20 && '...'}</Text>
      </ImageBackground>
    </View>;
  }
  function NavHeader(props: any, goBack: boolean, title: string, refresh: boolean) {
    return <View style={{height: 78, backgroundColor: '#202125', justifyContent: 'space-between', flexDirection: 'row'}}>
      {goBack &&
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{backgroundColor: '#595A5E', margin: 16, zIndex: 10, marginLeft: 21, borderRadius: 16, width: 45, padding: 10}}>
          <GmIcon name="arrow-left" size={24} color={'#FFFFFF'} />
        </TouchableOpacity>
      }
      <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', position: 'absolute', width: '100%', textAlign: 'center', height: '100%', textAlignVertical: 'center'}}>{title.substring(0, 20)} {title.length > 20 && '...'}</Text>
      {refresh &&
        <TouchableOpacity onPress={() => monitorRef?.current?.refreshMap()} style={{backgroundColor: '#595A5E', margin: 16, zIndex: 10, marginLeft: 21, borderRadius: 16, width: 45, padding: 10}}>
          <GmIcon name="refresh" size={24} color={'#FFFFFF'} />
        </TouchableOpacity>
      }
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
              children={()=><Home carrousel={carrouselData} loading={false} onPopupModal={(type: String)=>setPopupModal(type)}/>}
            />
            <Tab.Screen
              name="Financeiro"
              options={{
                tabBarLabel: '',
                header: (props) => NavHeader(props, true, 'Financeiro', false),
                tabBarIcon: ({ color, size, focused }) => (
                    // <Icon name="notifications" style={{color: color}} size={size} />
                    <View style={{padding: 10, marginTop: 15, backgroundColor: focused ? COLORS.dawn : COLORS.grey, borderRadius: 15 }}>
                      <GmIcon name="dolar" size={size} color={color} />
                    </View>
                  ),
                }}
              children={()=><Financeiro userData={userData} />} />
            <Tab.Screen
              name="Suporte"
              options={{
                tabBarLabel: '',
                header: (props) => GmNavHeader(props, true, 'Suporte'),
                tabBarIcon: ({ color, size, focused }) => (
                    // <Icon name="notifications" style={{color: color}} size={size} />
                    <View style={{padding: 10, marginTop: 15, backgroundColor: focused ? COLORS.dawn : COLORS.grey, borderRadius: 15 }}>
                      <GmIcon name="suporte" size={size} color={color} />
                    </View>
                  ),
                }}
              children={()=><Suporte userData={userData} onPopupModal={(type: String)=>setPopupModal(type)}/>} />
            <Tab.Screen
              name="Perfil"
              options={{
                tabBarLabel: '',
                header: (props) => GmNavHeader(props, true, 'Perfil'),
                tabBarIcon: ({ color, size, focused }) => (
                    // <Icon name="notifications" style={{color: color}} size={size} />
                    <View style={{padding: 10, marginTop: 15, backgroundColor: focused ? COLORS.dawn : COLORS.grey, borderRadius: 15 }}>
                      <GmIcon name="eu" size={size} color={color} />
                    </View>
                  ),
                }}
              children={()=><User userData={userData} onExit={()=>logout()} onModal={(type: String)=>setModal(type)} />} />

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
        {/* } */}
      </>
  );
  const MonitorNav = () => (
      <>
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
              children={()=><Home carrousel={carrouselData} loading={false} onPopupModal={(type: String)=>setPopupModal(type)}/>}
            />
            <Tab.Screen
              name="Monitor"
              options={{
                tabBarLabel: '',
                // headerTitleAlign: 'center',
                header: (props) => NavHeader(props, true, username, true),
                tabBarIcon: ({ color, size, focused }) => (
                    // <Icon name="globe" style={{color: color}} size={size} />
                    <View style={{padding: 10, marginTop: 15, backgroundColor: focused ? COLORS.dawn : COLORS.grey, borderRadius: 15 }}>
                      <GmIcon name="monitor" size={size} color={color} />
                    </View>
                  ),
                }}
              children={()=><Monitor innerRef={monitorRef} userData={userData} />}
            />
            <Tab.Screen
              name="Selecionar"
              options={{
                tabBarLabel: '',
                header: (props) => NavHeader(props, true, 'Selecionar', false),
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
                header: (props) => NavHeader(props, true, 'Notificação de alarmes', false),
                tabBarIcon: ({ color, size, focused }) => (
                    // <Icon name="notifications" style={{color: color}} size={size} />
                    <View style={{padding: 10, marginTop: 15, backgroundColor: focused ? COLORS.dawn : COLORS.grey, borderRadius: 15 }}>
                      <GmIcon name="alertas" size={size} color={color} />
                    </View>
                  ),
                }}
              children={()=><Alarms userData={userData} />} />
          </Tab.Navigator>
        {/* } */}
      </>
  );



  return (
    <GestureHandlerRootView>
        <SwipeModal ref={modalRef} style={{zIndex: 100, borderTopEndRadius: 10, borderTopStartRadius: 10}} maxHeight={500} bg={COLORS.grey}>
              <ScrollView>
                {currentModal === 'contract' &&
                  <View style={{margin: 10}}>
                      <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 20, color: 'white', marginBottom: 20}}>Seu Contrato</Text>
                      <Text style={{color: 'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cumque vitae error eligendi voluptatem necessitatibus mollitia. Similique commodi quis aspernatur rerum doloremque, accusantium molestiae voluptates et. Animi eligendi officia cum.</Text>
                  </View>
                }
                {currentModal === 'terms' &&
                  <View style={{margin: 10}}>
                      <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 20, color: 'white', marginBottom: 20}}>Política de Privacidade da GMTRACK</Text>
                      <Text style={{color: 'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cumque vitae error eligendi voluptatem necessitatibus mollitia. Similique commodi quis aspernatur rerum doloremque, accusantium molestiae voluptates et. Animi eligendi officia cum.</Text>
                  </View>
                }
                {currentModal === 'about' &&
                  <View style={{margin: 10}}>
                      <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 20, color: 'white', marginBottom: 20}}>Sobre o aplicativo</Text>
                      <Text style={{color: 'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cumque vitae error eligendi voluptatem necessitatibus mollitia. Similique commodi quis aspernatur rerum doloremque, accusantium molestiae voluptates et. Animi eligendi officia cum.</Text>
                  </View>
                }

              </ScrollView>
        </SwipeModal>
        <Modal
            animationType="slide"
            transparent={true}
            visible={popupModalVisible}
            onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                setPopupModalVisible(!popupModalVisible);
            }}
        >
            <View style={modalStyles.centeredView}>
                  <View style={modalStyles.modalView}>
                    {currentPopupModal == 'wp' &&
                      <> 
                        <View style={{alignItems: 'center', marginBottom: 10}}>
                          <GmIcon name="wp" size={50} color="white" />
                        </View>
                        <Text style={modalStyles.modalText}>Toque no botão abaixo</Text>
                        <Text style={modalStyles.modalText}>para falar com a nossa</Text>
                        <Text style={modalStyles.modalText}>central de atendimento!</Text>
                        <Text style={[modalStyles.modalText, {fontSize: 30, textAlign: 'center'}]}>0800 083 8080</Text>
                      </>
                    }
                    {currentPopupModal == 'email' &&
                      <> 
                        <View style={{alignItems: 'center', marginBottom: 10}}>
                          <GmIcon name="wp" size={50} color="white" />
                        </View>
                        <Text style={modalStyles.modalText}>Toque no botão abaixo</Text>
                        <Text style={modalStyles.modalText}>para enviar um email para nossa</Text>
                        <Text style={modalStyles.modalText}>central de atendimento!</Text>
                        <Text style={[modalStyles.modalText, {fontSize: 30, textAlign: 'center'}]}>contato@gmtrack.com</Text>
                      </>
                    }
                    <View style={{alignSelf: 'center', paddingTop: 20, width: 150, flexDirection: 'column'}}>

                        {currentPopupModal == 'wp' &&
                          <Pressable
                              style={[modalStyles.button, modalStyles.buttonActive, {marginBottom: 10}]}
                              onPress={() => { Linking.openURL(`tel:08000838080`)}}
                              >
                              <Text style={modalStyles.textStyle}>Ligar</Text>
                          </Pressable>
                        }
                        {currentPopupModal == 'email' &&
                          <Pressable
                              style={[modalStyles.button, modalStyles.buttonActive, {marginBottom: 10}]}
                              onPress={() => { Linking.openURL(`mailto:contato@gmtrack.com`)}}
                              >
                              <Text style={modalStyles.textStyle}>Enviar</Text>
                          </Pressable>
                        }
                        <Pressable
                            style={[modalStyles.button, modalStyles.buttonClose]}
                            onPress={() => { setPopupModalVisible(false) }}
                            >
                            <Text style={modalStyles.textStyle}>Cancelar</Text>
                        </Pressable>
                    </View>
                  </View>
            </View>
        </Modal>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" options={{headerShown: false}} children={()=><Welcome />} />
          <Stack.Screen name="Login" options={{headerShown: false}} children={(props)=><Login submit={(value: any)=>submitLogin(value, props)} tokenFcm={tokenFcm} />} />
          <Stack.Screen name="Main" options={{headerShown: false}} component={TabNav} />
          <Stack.Screen name="Second" options={{headerShown: false}} component={MonitorNav} />
          <Stack.Screen name="Detalhes" options={{header: (props) => NavHeader(props, true, 'Detalhes', false)}} children={()=><DeviceDetails userData={userData} />} />
          <Stack.Screen name="Info" options={{header: (props) => NavHeader(props, true, 'Dados do veículo', false)}} children={()=><DeviceInfo userData={userData} />} />
          <Stack.Screen name="UserInfo" options={{header: (props) => NavHeader(props, true, 'Meus Dados', false)}} children={()=><UserInfo userData={userData} />} />
          <Stack.Screen name="Comandos" children={()=><DeviceTerminal userData={userData} />} />
          <Stack.Screen name="Centralizar" children={()=><DeviceMap userData={userData} />} />
          <Stack.Screen name="Historico" children={()=><DeviceHistory userData={userData} />} options={{header: (props) => NavHeader(props, true, 'Historico', false)}}/>
          <Stack.Screen name="Alarmes" children={()=><DeviceAlarms userData={userData} />} />
          <Stack.Screen name="Alarme" children={()=><AlarmDetail userData={userData} />} />
          <Stack.Screen name="Chat" children={()=><Chat />} options={{header: (props) => NavHeader(props, true, 'Chat', false)}} />
          <Stack.Screen name="RedesSociais" children={()=><RedesSociais userData={userData} />} options={{header: (props) => NavHeader(props, true, 'Redes Sociais', false)}} />
          <Stack.Screen name="Vagas" children={()=><Vagas userData={userData} />} options={{header: (props) => NavHeader(props, true, 'Vagas de emprego', false)}} />
          {/* <Stack.Screen name="Financeiro" children={()=><Financeiro userData={userData} />} options={{header: (props) => NavHeader(props, true, 'Financeiro')}}
          /> */}
          <Stack.Screen name="CentralDeAjuda" children={()=><CentralDeAjuda userData={userData} />} options={{header: (props) => GmNavHeader(props, true, 'Central de ajuda')}}
          />
          <Stack.Screen name="Faturas" children={()=><MinhasFaturas userData={userData} />} options={{header: (props) => GmNavHeader(props, true, 'Minhas Faturas')}}
          />
          <Stack.Screen name="Notas" children={()=><Notas userData={userData} />} options={{header: (props) => GmNavHeader(props, true, 'Notas Fiscais')}}
          />
          <Stack.Screen name="PagamentoAuto" children={()=><PagamentoAuto userData={userData} />} options={{header: (props) => GmNavHeader(props, true, 'Pagamento Automático')}}
          />
          <Stack.Screen name="NotaFiscal" children={()=><NotaFiscal userData={userData} />} options={{headerShown: false}}
          />
          <Stack.Screen name="Fatura" children={()=><Fatura userData={userData} />} options={{headerShown: false}}
          />
          <Stack.Screen name="FaturaPix" children={()=><FaturaPix userData={userData} />} options={{headerShown: false}}
          />

        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </GestureHandlerRootView>
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
const modalStyles = StyleSheet.create({
  //checkbox
  dateButton: {
    padding: 10,
    backgroundColor: '#7C7A80',
    borderRadius: 20,
    elevation: 2
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    color: COLORS.white,
    margin: 8,
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.tempest,
    borderRadius: 20,
    padding: 15,
    // alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: 30,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 13,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#fafafa',
  },
  buttonClose: {
    backgroundColor: '#B3B0B8',
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    color: COLORS.black,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default App;
