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
  Linking,
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

const Vagas = ({ userData }) => {
  const navigation = useNavigation();
  const [callModal, setCallModal] = useState(false);
  return (
    <ImageBackground source={require("../assets/main-bg.png")} style={styles.splash}>
      <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={{backgroundColor: COLORS.tint, padding: 20, marginRight: 20, marginBottom: 30, borderRadius: 20, borderLeftColor: COLORS.primary, borderLeftWidth: 20}}>
              <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                <GmIcon name="warning" size={20} color={COLORS.primary} />
                <Text style={{color: 'white', fontWeight: '700', marginLeft: 5, fontSize: 15}}>Você sabia?</Text>
              </View>
              <Text style={{color: 'white'}}>Aqui é onde você pode se candidatar às vagas de emprego disponíveis na GMTRACK.</Text>
            </View>
            <View style={styles.row}>
              <HomeButton subTitle="Portal da Gupy" gm_icon="gupy" onPress={()=>{ Linking.openURL(`https://www.gupy.com`) }}/>
              <HomeButton subTitle="Linkedin" gm_icon="linkedin" onPress={()=>{ Linking.openURL(`https://www.linkedin.com`) }} />
            </View>
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

export default Vagas;