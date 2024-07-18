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
  ImageBackground,
} from 'react-native';
import GmIcon from '../components/GmIcon';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-ionicons'
import ListGroup from '../components/ListGroup';
import ListButton from '../components/ListButton';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import COLORS from '../constants/colors';
import HomeButton from '../components/HomeButton';
import GmInfo from '../components/GmInfo';

const PagamentoAuto = ({ userData }) => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require("../assets/main-bg.png")} style={styles.splash}>
      <SafeAreaView style={styles.container}>
          <ScrollView>
            {/* <View style={{backgroundColor: COLORS.tint, padding: 20, marginRight: 20, marginBottom: 30, borderRadius: 20, borderLeftColor: COLORS.primary, borderLeftWidth: 20}}>
              <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                <GmIcon name="warning" size={20} color={COLORS.primary} />
                <Text style={{color: 'white', fontWeight: '700', marginLeft: 5, fontSize: 15}}>Você sabia?</Text>
              </View>
              <Text style={{color: 'white'}}>Aqui você pode baixar sua fatura, baixar sua nota fiscal e ainda cadastra seu cartão de credito para  pagamento automático</Text>
            </View> */}
            <GmInfo title="Você sabia?" text="Aqui você pode cadastrar o seu cartão de crédito e ativar o pagamento automático da sua fatura." />
            <View>
              <TouchableOpacity style={{borderWidth: 2, borderRadius: 12, borderColor: 'white', borderStyle: 'dashed', flexDirection: 'row', justifyContent: 'center', paddingVertical: 30, marginRight: 20}}>
                <GmIcon name="creditcard" size={35} color="white" />
              </TouchableOpacity>
              <Text style={{color: 'white'}}>Adicionar nova forma de pagamento</Text>
            </View>
            {/* <HomeButton title="Minhas faturas" gm_icon="boleto" onPress={()=>navigation.push('Faturas')} block/>
            <HomeButton title="Pagamento automático" gm_icon="loop-payment" block/>
            <HomeButton title="Nota fiscal" gm_icon="paper" onPress={()=>navigation.push('Notas')} block/> */}
            {/* <ListGroup>
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
              </ListGroup> */}
              {/* <Item title='test 1' icon="radio-button-on" /> */}
              {/* <Item title='test 1' icon="radio-button-on" /> */}
              {/* <View style={{marginBottom: 15}}></View> */}
              {/* <Item title='test 1' icon="radio-button-on" /> */}
          </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    splash: {
      backgroundColor: COLORS.night,
      height: '100%'
    },
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

export default PagamentoAuto;