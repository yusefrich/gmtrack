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
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-ionicons'
import ListGroup from '../components/ListGroup';
import ListButton from '../components/ListButton';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const DeviceDetails = ({ userData }) => {
  const [devices, setDevices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  const fetchDevices = () => {
    if (!userData || !userData.token) {
      console.log('token nulo')
      return
    }
    fetch("https://gmtrack.azael.tech/api/user/devices", {
      headers: {
          Authorization: 'Bearer ' + userData.token,
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (!Array.isArray(responseData.data)) {
          Toast.show({
              type: 'error',
              text1: 'Erro ao buscar seus veiculos'
          });
          return
      }
      console.log('devices detailssssss => ' + JSON.stringify(responseData.data));
      setDevices(responseData.data)
      // props.submit({userData: responseData, token: responseData.token, carrousel: rresponseData.data})
    })
  }
  useFocusEffect(
      React.useCallback(() => {
          let isActive = true;
          fetchDevices()
          return () => {
              isActive = false;
          };

      }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
          <ListGroup>
            <ListButton title={"IMEI - " + route.params.device.imei} icon="barcode" endicon="copy" iconColor="orange"></ListButton>
          </ListGroup>
          <ListGroup>
            <ListButton title="Centralizar" icon="pin" iconColor="orange" onPress={()=>navigation.push('Centralizar', { device: route.params.device })}></ListButton>
            <ListButton title="Rota" icon="navigate" iconColor="orange" onPress={()=>navigation.push('Centralizar', { device: route.params.device })}></ListButton>
            <ListButton title="Historico" icon="alarm" iconColor="orange" onPress={()=>navigation.push('Historico', { device: route.params.device })}></ListButton>
          </ListGroup>
          <ListGroup>
            <ListButton title="Detalhe" icon="document" iconColor="orange"></ListButton>
            <ListButton title="Comando" icon="wifi" iconColor="orange"></ListButton>
            <ListButton title="Histórico de comando" icon="folder-open" iconColor="orange"></ListButton>
            <ListButton title="Alarmes" icon="alarm" iconColor="orange" onPress={()=>navigation.push('Alarmes', { device: route.params.device })}></ListButton>
            <ListButton title="Alerta de cerca" icon="grid" iconColor="orange"></ListButton>
            <ListButton title="Compartilhar localização" icon="share" iconColor="orange"></ListButton>
          </ListGroup>
          <ListGroup>
            <ListButton title="Configurações" icon="cog" iconColor="orange"></ListButton>
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

export default DeviceDetails;