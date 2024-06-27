import React, { useEffect, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
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
import HomeButton from '../components/HomeButton';
import GmIcon from '../components/GmIcon';
import COLORS from '../constants/colors';

const DeviceDetails = ({ userData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  useFocusEffect(
      React.useCallback(() => {
          let isActive = true;
          // navigation.setOptions({ title: route.params.device.device.devicename })
          // fetchDevices()
          return () => {
              isActive = false;
          };

      }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
          <ListGroup>
            <ListButton title={"IMEI - " + route.params.device.device.imei} icon="barcode" endicon="copy" iconColor="orange" onPress={()=>Clipboard.setString(route.params.device.device.imei)}></ListButton>
          </ListGroup>
          <View style={styles.row}>
            <HomeButton icon="navigate" white title="Rastrear" />
            <HomeButton icon="play" white title="Histórico" onPress={()=>navigation.push('Historico', { device: route.params.device.device })}/>
            <HomeButton icon="paper" white title="Detalhe" />
            <HomeButton custom_icon={<GmIcon name="terminal" size={30} color={COLORS.primary} />} white title="Comando" />
          </View>
          <ListGroup>
            <ListButton title="Detalhe" icon="document" iconColor="orange"></ListButton>
            <ListButton title="Comando" icon="wifi" iconColor="orange"></ListButton>
            <ListButton title="Histórico de comando" icon="folder-open" iconColor="orange"></ListButton>
            <ListButton title="Alarmes" icon="alarm" iconColor="orange" onPress={()=>navigation.push('Alarmes', { device: route.params.device.device })}></ListButton>
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
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '95%',
      marginBottom: 10
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