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
  ImageBackground,
  Image,
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

const UserInfo = ({ userData }) => {
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
    <ImageBackground source={require("../assets/main-bg.png")} style={styles.splash}>
      <SafeAreaView style={styles.container}>
          <ScrollView>
            {userData &&
            <>
              <Text style={{color: 'white', fontWeight: '800', marginLeft: 5, marginBottom: 10}}>Nome</Text>
              <View style={{marginRight: 20, marginBottom: 10}}>
                <View style={styles.bgDetailList}></View>
                <View style={{flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'space-between'}}>
                  <Text style={{color: 'white', fontWeight: '500'}}>{userData.client.Nome}</Text>
                </View>
              </View>
              <Text style={{color: 'white', fontWeight: '800', marginLeft: 5, marginBottom: 10}}>Documento</Text>
              <View style={{marginRight: 20, marginBottom: 10}}>
                <View style={styles.bgDetailList}></View>
                <View style={{flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'space-between'}}>
                  <Text style={{color: 'white', fontWeight: '500'}}>{userData.client.CGCCPF}</Text>
                </View>
              </View>
              <Text style={{color: 'white', fontWeight: '800', marginLeft: 5, marginBottom: 10}}>Telefone 1</Text>
              <View style={{marginRight: 20, marginBottom: 10}}>
                <View style={styles.bgDetailList}></View>
                <View style={{flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'space-between'}}>
                  <Text style={{color: 'white', fontWeight: '500'}}>{userData.client.Fone1}</Text>
                </View>
              </View>
              <Text style={{color: 'white', fontWeight: '800', marginLeft: 5, marginBottom: 10}}>Telefone 2</Text>
              <View style={{marginRight: 20, marginBottom: 10}}>
                <View style={styles.bgDetailList}></View>
                <View style={{flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'space-between'}}>
                  <Text style={{color: 'white', fontWeight: '500'}}>{userData.client.Fone2}</Text>
                </View>
              </View>
              <Text style={{color: 'white', fontWeight: '800', marginLeft: 5, marginBottom: 10}}>Email</Text>
              <View style={{marginRight: 20, marginBottom: 10}}>
                <View style={styles.bgDetailList}></View>
                <View style={{flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'space-between'}}>
                  <Text style={{color: 'white', fontWeight: '500'}}>{userData.client.Email}</Text>
                </View>
              </View>
            </>
            }
            {/* <View style={styles.row}>
              <HomeButton active subTitle="Rastrear" custom_icon={<GmIcon name="marker" size={24} color={COLORS.day} />} onPress={()=>navigation.push('Second', { screen: 'Monitor' })}/>
              <HomeButton subTitle="Histórico" custom_icon={<GmIcon name="historico" size={24} color={COLORS.day} />} onPress={()=>navigation.push('Historico', { device: route.params.device.device })} />
              <HomeButton subTitle="Dados do veículo" custom_icon={<GmIcon name="pasta" size={24} color={COLORS.day} />} />
            </View> */}
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
    bgDetail: {
        backgroundColor: COLORS.primary,
        opacity: .2,
        borderRadius: 16,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    bgDetailList: {
        backgroundColor: COLORS.grey,
        opacity: 1,
        borderRadius: 10,
        position: 'absolute',
        width: '100%',
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
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
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

export default UserInfo;