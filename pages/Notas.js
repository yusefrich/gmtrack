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
import GmButton from '../components/GmButton';
import Button from '../components/Button';
import GmInfo from '../components/GmInfo';

const Notas = ({ userData }) => {
  const [bills, setBills] = useState([]);
  const [onFocus, setOnFocus] = useState(false);
  const [counter, setCounter] = useState(10);
  const [currentTimeout, setCurrentTimeout] = useState(null);
  const navigation = useNavigation();

  const fetchBills = async () => {
    console.log('fetching user track')
      const [data, err] = await api.bills(userData)
      console.log('bills', data.data.length)
      console.log('err', err)
      if (err) {
          Toast.show({
              type: 'error',
              text1: 'Erro ao monitorar veiculos: ' + err.message
          });
          console.error('detal error => ', err);
          return
      }
      // console.log('cars => ', data);
      // console.log('devices => ' + JSON.stringify(data));
      setBills(data.data)
  }
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
    const year = new Date(data).getFullYear()
    return `${date}/${month + 1}/${year}`
  }
  const vencido = (data) => {
    return new Date(data) < new Date()
  }
  useFocusEffect(
      React.useCallback(() => {
          console.log('on focus')
          setOnFocus(true)
          fetchBills();
          return () => {
            setOnFocus(false)
          };

      }, [])
  );
  return (
    <ImageBackground source={require("../assets/main-bg.png")} style={styles.splash}>
      <View style={{position: 'absolute', bottom: '2%', left: '2%', zIndex: 10, width: '95%', elevation: 10}}>
        <Button
            title="Baixar todas as notas fiscais"
            textColor={COLORS.black}
            background={COLORS.primary}
            filled
            style={{
                elevation: 10,
                marginTop: 18,
                marginBottom: 4,
            }}
        />
      </View>
      <SafeAreaView style={styles.container}>
          <ScrollView>
              <GmInfo title="Você sabia?" text="Aqui você pode baixar as notas fiscais dos pagamentos realizados em formato pdf." />
              <View style={{marginBottom: 20, marginLeft: 10}}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>Notas Fiscais disponíveis:</Text>
                <Text style={{color: 'white'}}>Toque para fazer o download.</Text>
              </View>
              {bills.map((item)=>{
                if (item.Pago === '1') {
                  return(
                    <TouchableOpacity style={[{padding: 20, marginRight: 20, marginBottom: 15, borderRadius: 20, borderLeftWidth: 20}, item.Pago === '1' ? styles.cardSuccess : vencido(item.Vencimento) ? styles.cardDanger :  styles.cardInfo]} onPress={()=>navigation.push('NotaFiscal', { bill: item })}>
                      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{marginTop: 5, marginLeft: 5}}>
                              <GmIcon name="check" size={15} color="#39CC59" />
                            </View>
                            <Text style={[{fontWeight: '700', marginLeft: 5, fontSize: 17}, {color: '#39CC59'}]}>PAGO</Text>
                          </View>
                          <Text style={{color: 'white', fontWeight: '700', marginLeft: 5, fontSize: 14, textTransform: 'uppercase'}}>{getPeriod(item.Vencimento)}</Text>
                          <Text style={[{fontWeight: '700', marginLeft: 5, fontSize: 17}, {color: '#9FC2A2'}]}>{formattedDate(item.Vencimento)}</Text>
  
                        </View>
                        <View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View>
                              <Text style={[{fontWeight: '700', marginLeft: 5, fontSize: 25, marginTop: 15}, {color: '#9FC2A2'}]}>R$ {+item.ValorDuplicata}</Text>
                            </View>
                            <View style={{marginLeft: 10, marginTop: 5}}>
                              <GmButton  solid custom_icon={<GmIcon name="chevron-rigth" size={24} color={COLORS.day} />}  />
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }
                return (<></>)
              })}
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
    cardInfo: {backgroundColor: '#282A2F', borderLeftColor: '#0973D7'},
    cardDanger: {backgroundColor: '#282A2F', borderLeftColor: '#E03F3F'},
    cardSuccess: {backgroundColor: '#282A2F', borderLeftColor: '#39CC59'},
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

export default Notas;