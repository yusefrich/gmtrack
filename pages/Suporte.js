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

const Suporte = ({ userData }) => {
  const navigation = useNavigation();
  const [callModal, setCallModal] = useState(false);
  return (
    <ImageBackground source={require("../assets/main-bg.png")} style={styles.splash}>
      <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={callModal}
                onRequestClose={() => {
                    setCallModal(false)
                }}
            >
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <Text style={[modalStyles.modalText, {fontSize: 20}]}>Informações!</Text>
                        <Text style={[modalStyles.modalText, {fontSize: 20}]}>Informações!</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{height: 50, backgroundColor: COLORS.primary, borderRadius: 8, marginBottom: 0, marginTop: 20, elevation: 10, width: '100%'}}>
                          <Text style={{textAlign: 'center', marginTop: 10, fontSize: 18, fontWeight: '700', color: 'black'}}>Voltarr</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{height: 50, backgroundColor: COLORS.primary, borderRadius: 8, marginBottom: 0, marginTop: 20, marginRight: 20, elevation: 10}}>
                          <Text style={{textAlign: 'center', marginTop: 10, fontSize: 18, fontWeight: '700', color: 'black'}}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

          <ScrollView>
            <View style={{backgroundColor: COLORS.tint, padding: 20, marginRight: 20, marginBottom: 30, borderRadius: 20, borderLeftColor: COLORS.primary, borderLeftWidth: 20}}>
              <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                <GmIcon name="warning" size={20} color={COLORS.primary} />
                <Text style={{color: 'white', fontWeight: '700', marginLeft: 5, fontSize: 15}}>Você sabia?</Text>
              </View>
              <Text style={{color: 'white'}}>Você pode falar ou solicitar que alguém da nossa equipe fale com você sempre que precisar!</Text>
            </View>
            <View style={styles.row}>
              <HomeButton subTitle="Central de ajuda" gm_icon="central" onPress={()=>navigation.push('CentralDeAjuda', { screen: 'Monitor' })}/>
              <HomeButton subTitle="Falar pelo 0800" gm_icon="wp" onPress={()=>setCallModal(false)} />
              <HomeButton subTitle="Chat" gm_icon="chat" onPress={()=>navigation.push('Main' , { screen: 'Financeiro'})} />
            </View>
            <View style={styles.row}>
              <HomeButton subTitle="E-mail" gm_icon="email" onPress={()=>navigation.push('Second', { screen: 'Monitor' })}/>
              <HomeButton subTitle="Redes sociais" gm_icon="social" />
              <HomeButton subTitle="Vagas de emprego" gm_icon="jobs" onPress={()=>navigation.push('Main' , { screen: 'Financeiro'})} />
            </View>
            {/* <HomeButton active title="Minhas faturas" custom_icon={<GmIcon name="boleto" size={24} color={COLORS.dawn} />} onPress={()=>navigation.push('Faturas')} block/>
            <HomeButton title="Pagamento automático" custom_icon={<GmIcon name="loop-payment" size={24} color={COLORS.day} />} block/>
            <HomeButton title="Nota fiscal" custom_icon={<GmIcon name="paper" size={24} color={COLORS.day} />} block/> */}
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
const modalStyles = StyleSheet.create({
  //checkbox
  dateButton: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
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
    backgroundColor: '#454652',
    borderRadius: 20,
    padding: 15,
    alignItems: 'flex-start',
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
    borderRadius: 100,
    padding: 10,
    paddingHorizontal: 13,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#fafafa',
  },
  buttonClose: {
    backgroundColor: COLORS.white,
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    color: COLORS.black,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
    splash: {
      backgroundColor: COLORS.night,
      height: '100%'
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 10
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

export default Suporte;