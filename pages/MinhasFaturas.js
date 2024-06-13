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

const MinhasFaturas = ({ userData }) => {
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
    return `${date}/${month + 1}`
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
      <SafeAreaView style={styles.container}>
          <ScrollView>
              {bills.map((item)=>{
                return(
                  <View style={[{padding: 20, marginRight: 20, marginBottom: 15, borderRadius: 20, borderLeftWidth: 20}, item.Pago === '1' ? styles.cardSuccess : vencido(item.Vencimento) ? styles.cardDanger :  styles.cardInfo]}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View>
                        <Text style={{color: 'white', fontWeight: '400', marginLeft: 5, fontSize: 15, textTransform: 'uppercase'}}>{getPeriod(item.Vencimento)}</Text>
                        <Text style={[{fontWeight: '700', marginLeft: 5, fontSize: 25}, item.Pago === '1' ? {color: '#39CC59'} : vencido(item.Vencimento) ? {color: '#E68D8D'} :  {color: '#9FA9C2'}]}>R$ {+item.ValorDuplicata}</Text>
                      </View>
                      <View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View>
                            <Text style={{color: COLORS.day, fontWeight: '400', marginLeft: 5, fontSize: 15}}>Vencimento</Text>
                            <Text style={[{fontWeight: '700', marginLeft: 5, fontSize: 20}, item.Pago === '1' ? {color: '#39CC59'} : vencido(item.Vencimento) ? {color: '#E68D8D'} :  {color: '#9FA9C2'}]}>{formattedDate(item.Vencimento)}</Text>
                          </View>
                          <View style={{marginLeft: 10}}>
                            <GmButton  solid custom_icon={<GmIcon name="chevron-rigth" size={24} color={COLORS.day} />}  />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              })}
            {/* <View style={{backgroundColor: '#62464680', padding: 20, marginRight: 20, marginBottom: 15, borderRadius: 20, borderLeftColor: '#E03F3F', borderLeftWidth: 20}}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{color: 'white', fontWeight: '400', marginLeft: 5, fontSize: 15}}>MAIO 2024</Text>
                  <Text style={{color: '#E68D8D', fontWeight: '700', marginLeft: 5, fontSize: 25}}>R$ 49,90</Text>
                </View>
                <View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View>
                      <Text style={{color: '#E68D8D', fontWeight: '400', marginLeft: 5, fontSize: 15}}>Vencido</Text>
                      <Text style={{color: '#E68D8D', fontWeight: '700', marginLeft: 5, fontSize: 20}}>20/05</Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <GmButton  solid custom_icon={<GmIcon name="chevron-rigth" size={24} color={COLORS.day} />}  />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{backgroundColor: '#46624780', padding: 20, marginRight: 20, marginBottom: 15, borderRadius: 20, borderLeftColor: '#39CC59', borderLeftWidth: 20}}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{color: 'white', fontWeight: '400', marginLeft: 5, fontSize: 15}}>MAIO 2024</Text>
                  <Text style={{color: '#9FC2A2', fontWeight: '700', marginLeft: 5, fontSize: 25}}>R$ 49,90</Text>
                </View>
                <View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View>
                      <Text style={{color: '#39CC59', fontWeight: '400', marginLeft: 5, fontSize: 15}}>Pago em</Text>
                      <Text style={{color: '#39CC59', fontWeight: '700', marginLeft: 5, fontSize: 20}}>20/05</Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <GmButton  solid custom_icon={<GmIcon name="chevron-rigth" size={24} color={COLORS.day} />}  />
                    </View>
                  </View>
                </View>
              </View>
            </View> */}

            {/* <HomeButton active title="Minhas faturas" custom_icon={<GmIcon name="boleto" size={24} color={COLORS.dawn} />} block/>
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

export default MinhasFaturas;