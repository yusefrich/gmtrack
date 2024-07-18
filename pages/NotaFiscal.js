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

const NotaFiscal = ({ userData }) => {
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
      <View style={{position: 'absolute', bottom: '2%', left: '2%', zIndex: 10, width: '100%'}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{width: 'auto', height: 50, backgroundColor: COLORS.primary, borderRadius: 8, marginBottom: 0, marginTop: 20, marginRight: 20, elevation: 10}}>
          <Text style={{textAlign: 'center', marginTop: 10, fontSize: 18, fontWeight: '700', color: 'black'}}>Baixar Nota</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{width: 'auto', height: 50, backgroundColor: COLORS.primary, borderRadius: 8, marginBottom: 0, marginTop: 20, marginRight: 20, elevation: 10}}>
          <Text style={{textAlign: 'center', marginTop: 10, fontSize: 18, fontWeight: '700', color: 'black'}}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.container}>
          <ScrollView>
            <Text style={{color: 'white', fontWeight: '400', marginLeft: 5, fontSize: 15, textTransform: 'uppercase', textAlign: 'center', marginBottom: 20}}>JUNHO 2024</Text>
            <View style={{backgroundColor: '#EDEDED', borderRadius: 20, color: 'black', marginRight: 20, padding: 20, paddingTop: 20, paddingBottom: 20, marginBottom: 160}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', top: -10}}>
                <GmIcon name="check-big" size={100} />
              </View>
              <Text style={{textAlign: 'center', color: 'black', fontSize: 25, fontWeight: '900'}}>OBRIGADO!</Text>
              <Text style={{textAlign: 'center', color: 'black', marginBottom: 20}}>Seu pagamento foi realizado com sucesso!</Text>
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
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10}}>
                <Text style={{color: 'black', fontWeight: '400', marginLeft: 5, fontSize: 20}}>Total</Text>
                <Text style={[{fontWeight: '700', marginLeft: 5, fontSize: 20}, {color: 'black'}]}>R$ 49,90</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 20}}>
                <GmIcon name="mastercard" size={45} />
                <View style={{marginLeft: 20}}>
                  <Text style={{color: 'black', fontWeight: '700'}}>GMTRACK</Text>
                  <Text style={{color: 'black'}}>1234 1234 **** (Master Card)</Text>
                </View>
              </View>
              <Text style={{color: 'black', fontWeight: '400', marginLeft: 5, fontSize: 15, textTransform: 'uppercase', marginBottom: 10}}>Código de barras</Text>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'black', fontWeight: '400', marginLeft: 5, fontSize: 15, maxWidth: 300, textTransform: 'uppercase', marginBottom: 20}}>12312312345-1 12312312345-1 12312312345-1 12312312345-1</Text>
                <TouchableOpacity style={{padding: 10, paddingRight: 13}}>
                  <GmIcon name="paper" size={24} color={COLORS.night} />
                </TouchableOpacity>
              </View>
              <View style={{position: 'relative'}}>
                <View style={{backgroundColor: 'black', width: 40, height: 40, borderRadius: 100, position: 'absolute', left: -40, top: -10}}></View>
                <View style={{borderBottomWidth: 3, margin: 10, borderColor: '#C7C7C7', borderStyle: 'dashed'}}></View>
                <View style={{backgroundColor: 'black', width: 40, height: 40, borderRadius: 100, position: 'absolute', right: -40, top: -10}}></View>
              </View>
              <View style={styles.row}>
                <Image source={require('../assets/bar.png')} style={[{width: 100, height: 100, marginRight: 'auto', resizeMode: 'contain'}]} />
                <View>
                  <View style={{marginRight: 10, borderWidth: 2, borderRadius: 16, padding: 20, paddingVertical: 10, marginTop: 20, borderColor: '#34A853'}}>
                    <Text style={{fontSize: 30, fontWeight: '900', color: '#34A853'}}>PAGO</Text>
                    {/* <HomeButton active subTitle="Pagar com pix" color="black" custom_icon={<GmIcon name="pix" size={24} color={COLORS.dawn} />} onPress={()=>navigation.push('FaturaPix')}/> */}
                  </View>
                </View>
                {/* <HomeButton subTitle="Pagar com cartão" color="black" custom_icon={<GmIcon name="card" size={24} color={COLORS.day} />} onPress={()=>navigation.push('FaturaPix')} /> */}
              </View>

            </View>
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

export default NotaFiscal;