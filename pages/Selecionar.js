import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import GmIcon from '../components/GmIcon';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-ionicons'
import ListGroup from '../components/ListGroup';
import ListButton from '../components/ListButton';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

const Selecionar = ({ userData }) => {
  const [devices, setDevices] = useState([]);
  const [onFocus, setOnFocus] = useState(false);
  const [counter, setCounter] = useState(10);
  const [currentTimeout, setCurrentTimeout] = useState(null);
  const navigation = useNavigation();

  const fetchUserTrack = async () => {
    console.log('fetching user track')
      const [data, err] = await api.userTrack(userData)
      console.log('data', data)
      console.log('err', err)
      if (err) {
          Toast.show({
              type: 'error',
              text1: 'Erro ao monitorar veiculos: ' + err.message
          });
          console.error('detal error => ', err);
          return
      }
      console.log('cars => ' + JSON.stringify(data));
      // console.log('devices => ' + JSON.stringify(data));
      setDevices(data)
  }
  const carStatus = (acc, speed) => {
    switch (acc) {
      case 0:
        return 'Parado'
      case 1:
        if (speed > 0) {
          return 'Em movimento'
        }
        return 'Motor Ligado'
      default:
        return 'Sem sinal'
    }
  }
  useFocusEffect(
      React.useCallback(() => {
          console.log('on focus')
          setOnFocus(true)
          fetchUserTrack();
          setCounter(10);
          return () => {
            setOnFocus(false)
              clearTimeout(currentTimeout)
              isActive = false;
          };

      }, [])
  );
  useEffect(() => {
      if (!onFocus) {
        return
      }
      if (counter > 0) {
          const timeout = setTimeout(() => setCounter(counter - 1), 1000);
          setCurrentTimeout(timeout)
      } else {
          setCounter(10)
          fetchUserTrack()
      }
  }, [counter, onFocus]);

  return (
    <SafeAreaView style={styles.container}>
        <View style={{padding: 5, bottom: 10, left: '30%', position: 'absolute', zIndex: 2, backgroundColor: '#eeeeee', borderRadius: 10}}>
            <Text style={{color: '#333333'}}>Atualizando em {counter}...</Text>
        </View>
        <ScrollView>
          <ListGroup>
            {devices.map((item)=>{
                return <ListButton
                          key={item.imei}
                          title={item.device.devicename}
                          subtitle={carStatus(item.accstatus, item.speed) + ` (${new Date(item.acctime * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]})`}
                          custom_icon={
                            <GmIcon name="carro" size={30} acc={item.accstatus} speed={item.speed} />
                          }
                          iconColor="orange"
                          onPress={()=>navigation.push('Detalhes', { device: item })}>
                        </ListButton>
            })}
            </ListGroup>
            {/* <Item title='test 1' icon="radio-button-on" /> */}
            {/* <Item title='test 1' icon="radio-button-on" /> */}
            {/* <View style={{marginBottom: 15}}></View> */}
            {/* <Item title='test 1' icon="radio-button-on" /> */}
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart: '4%',
        marginTop: StatusBar.currentHeight,
    },
    item: {
        backgroundColor: '#eeeeee',
        height: 40,
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 1,
        marginHorizontal: 5,
        padding: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: .2,
        },
    itemTitle: {
        flex: 1,
        flexDirection: 'row'
    },
    titleIcon: {
        marginEnd: 9,
    },
    title: {
        fontSize: 17,
        marginTop: 2,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      width: '95%',
      height: '90%',
      flex: 0,
      
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      // alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
});

export default Selecionar;