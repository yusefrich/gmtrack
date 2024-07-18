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
  Image,
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
import GmButton from '../components/GmButton';

const FaturaPix = ({ userData }) => {
  const [bills, setBills] = useState([]);
  const [onFocus, setOnFocus] = useState(false);
  const [counter, setCounter] = useState(10);
  const [currentTimeout, setCurrentTimeout] = useState(null);
  const navigation = useNavigation();
  // const route = useRoute();

  const getPeriod = (data) => {
    const date = new Date(data)
    // console.log(data)
    const locale = "pt-br"
    const month = date.toLocaleString(locale, { month: "long" });
    const year = date.toLocaleString(locale, { year: "numeric" });
    return `${month} ${year}`
  }
  const formattedDate = (data) => {
    const date = new Date(data).getDate()
    const month = new Date(data).getMonth()
    return `${date}/${month + 1}`
  }
  const vencido = (data) => {
    return new Date(data) < new Date()
  }
  useFocusEffect(
      React.useCallback(() => {
          console.log('on focus')
          setOnFocus(true)
          // fetchBills();
          return () => {
            setOnFocus(false)
          };

      }, [])
  );
  return (
    <View style={styles.splash}>
      <SafeAreaView style={styles.container}>
          <ScrollView>
            <Text style={{color: 'white', fontWeight: '400', marginLeft: 5, fontSize: 15, textTransform: 'uppercase', textAlign: 'center', marginBottom: 20}}>JUNHO 2024</Text>
            <View style={{backgroundColor: '#EDEDED', borderRadius: 20, color: 'black', marginRight: 20, padding: 20, paddingTop: 20, paddingBottom: 20}}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10}}>
                <Text style={{color: 'black', fontWeight: '400', marginLeft: 5, fontSize: 18}}>Data</Text>
                <Text style={[{fontWeight: '700', marginLeft: 5, fontSize: 18}, {color: 'black'}]}>10/06</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10}}>
                <Text style={{color: 'black', fontWeight: '400', marginLeft: 5, fontSize: 18}}>Hora</Text>
                <Text style={[{fontWeight: '700', marginLeft: 5, fontSize: 18}, {color: 'black'}]}>10:50 am</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10}}>
                <Text style={{color: 'black', fontWeight: '400', marginLeft: 5, fontSize: 18}}>Serviço</Text>
                <Text style={[{fontWeight: '700', marginLeft: 5, fontSize: 18}, {color: 'black'}]}>R$ 49,90</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10}}>
                <Text style={{color: 'black', fontWeight: '400', marginLeft: 5, fontSize: 18}}>Multa</Text>
                <Text style={[{fontWeight: '700', marginLeft: 5, fontSize: 18}, {color: 'black'}]}>R$ 0,00</Text>
              </View>
              <View style={{borderBottomWidth: 3, margin: 10, borderColor: '#C7C7C7'}}></View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 30}}>
                <Text style={{color: 'black', fontWeight: '400', marginLeft: 5, fontSize: 20}}>Total</Text>
                <Text style={[{fontWeight: '700', marginLeft: 5, fontSize: 20}, {color: 'black'}]}>R$ 49,90</Text>
              </View>
              <Image source={require('../assets/qr.png')} style={[{width: "100%", height: 300, resizeMode: 'contain'}]} />
              <Text style={{color: 'black', fontWeight: '400', marginLeft: 5, fontSize: 15, textTransform: 'uppercase', marginBottom: 10}}>Pix Copia e cola</Text>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'black', fontWeight: '400', marginLeft: 5, fontSize: 15, maxWidth: 300, textTransform: 'uppercase', marginBottom: 20}}>12312312345-1 12312312345-1 12312312345-1 12312312345-1</Text>
                <TouchableOpacity style={{padding: 10, paddingRight: 13}}>
                  <GmIcon name="paper" size={24} color={COLORS.night} />
                </TouchableOpacity>
              </View>

            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{width: 'auto', height: 50, backgroundColor: COLORS.primary, borderRadius: 8, marginBottom: 50, marginTop: 20, marginRight: 20}}>
              <Text style={{textAlign: 'center', marginTop: 10, fontSize: 18, fontWeight: '700', color: 'black'}}>Voltar</Text>
            </TouchableOpacity>
          </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
    splash: {
      backgroundColor: COLORS.night,
      height: '100%'
    },
    cardInfo: {backgroundColor: '#47527380', borderLeftColor: '#0973D7'},
    cardDanger: {backgroundColor: '#62464680', borderLeftColor: '#E03F3F'},
    cardSuccess: {backgroundColor: '#46624780', borderLeftColor: '#39CC59'},
    container: {
        flex: 1,
        marginStart: '4%',
        marginTop: StatusBar.currentHeight,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      // justifyContent: 'space-between',
      marginBottom: 10
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

export default FaturaPix;