/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Modal,
  Pressable,
  Button,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-ionicons'
import MapView, { AnimatedRegion, Marker, Polyline } from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useRoute } from '@react-navigation/native';
import api from '../services/api'
import COLORS from '../constants/colors'
import DatePicker from 'react-native-date-picker';
import Map from '../components/Map';

const {width, height} = Dimensions.get('screen');

const DeviceHistory = ({ userData }) => {
    const speeds = [1, 2, 4, 8]
    const [region, setRegion] = useState(null);
    const [pin, setPin] = useState(null);
    const [stops, setStops] = useState([]);
    const [modalVisible, setModalVisible] = useState(true);
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [startDayOpen, setStartDayOpen] = useState(false)
    const [endDayOpen, setEndDayOpen] = useState(false)
    const [checkboxKey, setCheckboxKey] = useState('')
    const [playback, setPlayback] = useState(null);
    const [playerStatus, setPlayerStatus] = useState(true);
    const [mapType, setMapType] = useState('standard');
    const [hasTraffic, setHasTraffic] = useState(false);
    const [deg, setDeg] = useState(0);
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const [animateCoord, setAnimateCoord] = useState(null);
    const [devicePlayback, setDevicePlayback] = useState(null);
    // route
    const route = useRoute();
    // refs
    const markerRef = useRef()


    const setDateTime = (key) => {
        setCheckboxKey(key)
        const currentDate = new Date()
        let yesterday = new Date()
        switch (key) {
            case 'ontem':
                yesterday.setHours(currentDate.getHours() - 48)
                setStartDate(yesterday)
                setEndDate(currentDate)
                break;
            case 'hoje':
                yesterday.setHours(currentDate.getHours() - 24)
                setStartDate(yesterday)
                setEndDate(currentDate)
                break;
            case 'hora':
                yesterday.setHours(currentDate.getHours() - 2)
                setStartDate(yesterday)
                setEndDate(currentDate)
                break;
            case 'custom':
                setStartDate(yesterday)
                setEndDate(currentDate)
                break;

            default:
                setStartDate(new Date())
                setEndDate(new Date())
                break;
        }
    }
    const fetchPlayback = async () => {
        if (!userData || !userData.token) {
            Toast.show({
                type: 'error',
                text1: 'Houve um erro, realize o login novamente!'
            });
            return
        }
        console.log('fetchPlayback being called')
        const [data, err] = await api.playback({
            token: userData.token,
            imei: route.params.device.imei,
            start_date: startDate.toLocaleString('af-ZA'),
            end_date: endDate.toLocaleString('af-ZA')
        })
        if (err) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao buscar historico: ' + err.message
            });
            console.error('detal error => ', err);
            return
        }
        if (!data.data || data.data === "") {
            Toast.show({
                type: 'info',
                text1: 'Nenhum historico encontrado entre as datas selecionadas'
            });
            // console.error('detal error => ', err);
            return
        }
        // console.log('paybacks => ' + JSON.stringify(data));
        setModalVisible(false)
        const rawPlayback = []
        const rawStops = []
        const dataSplit = data.data.split(';');
        for (let i = 0; i < dataSplit.length; i++) {
            const e = dataSplit[i];
            rawPlayback.push({
                latitude: parseFloat(e.split(',')[1]),
                longitude: parseFloat(e.split(',')[0]),
                gpstime: parseFloat(e.split(',')[2]),
                speed: +e.split(',')[3],
                course: e.split(',')[4]
            })
            if (dataSplit[i - 1] && dataSplit[i - 1].split(',')[3] <= 0 && e.split(',')[3] <= 0 && dataSplit[i + 1] && dataSplit[i + 1].split(',')[3] <= 0) {
                rawStops.push({
                    latitude: parseFloat(e.split(',')[1]),
                    longitude: parseFloat(e.split(',')[0]),
                    speed: +e.split(',')[3]
                })
            }
        }
        setStops(rawStops)
        console.log('raw', {
            token: userData.token,
            imei: route.params.device.imei,
            start_date: startDate.toLocaleString('af-ZA'),
            end_date: endDate.toLocaleString('af-ZA')
        })
        setPin({
            coordinate: new AnimatedRegion({
                latitude: rawPlayback[0].latitude,
                longitude: rawPlayback[0].longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }),
            latitude: rawPlayback[0].latitude,
            course: rawPlayback[0].course,
            longitude: rawPlayback[0].longitude,
            device: route.params.device,
            speed: rawPlayback[0].speed,
            pos: 0
        })
        setRegion({
            latitude: rawPlayback[0].latitude,
            longitude: rawPlayback[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
        setPlayback(rawPlayback)
        setDevicePlayback({route: rawPlayback, stops: rawStops})
   }
    const getLocation = () => {
        if (!playerStatus) {
            return
        }
        let newPos = pin.pos + 1
        if (!playback[newPos]) {
            return
        }
        if (newPos >= playback.length) {
            newPos = 0
        }
        const newPin = {
            device: route.params.device,
            latitude: playback[newPos].latitude,
            longitude: playback[newPos].longitude,
            coordinate: new AnimatedRegion({
                latitude: playback[newPos].latitude,
                longitude: playback[newPos].longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }),
            speed: playback[newPos].speed,
            course: playback[newPos].course,
            pos: newPos
        }
        setPin(newPin)
        setRegion({
            latitude: playback[newPos].latitude,
            longitude: playback[newPos].longitude,
            latitudeDelta: 0.01922,
            longitudeDelta: 0.01421
        });
        setDeg(playback[newPos].course)
        animate(playback[newPos].latitude, playback[newPos].longitude);
    }
    const animate = (latitude, longitude) => {
        setAnimateCoord({latitude, longitude})
    }


    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            return () => {
                isActive = false;
            };

        }, [userData])
    );
    useEffect(() => {
        const interval = setInterval(() => {
            if (playback) {
                // getLocation()
            }
        }, 1000 / speeds[currentSpeed]);
        return () => clearInterval(interval)
    },)


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{padding: 5, bottom: 40, position: 'absolute', zIndex: 2, backgroundColor: '#333333', borderRadius: 10}}>
            <Text style={{color: '#eeeeee'}}>{route.params.device.devicename}</Text>
        </View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <Text style={modalStyles.modalText}>Definir tempo de reprodução</Text>
                    <View style={modalStyles.checkboxContainer}>
                        <CheckBox
                            value={checkboxKey === 'hoje'}
                            onValueChange={(newValue) => newValue ? setDateTime('hoje') : setDateTime('')}
                            tintColors={{ true: COLORS.success, false: '#7C7A80' }}
                            style={modalStyles.checkbox}
                        />
                        <Text style={modalStyles.label}>Hoje</Text>
                    </View>
                    <View style={modalStyles.checkboxContainer}>
                        <CheckBox
                            value={checkboxKey === 'ontem'}
                            onValueChange={(newValue) => newValue ? setDateTime('ontem') : setDateTime('')}
                            tintColors={{ true: COLORS.success, false: '#7C7A80' }}
                            style={modalStyles.checkbox}
                        />
                        <Text style={modalStyles.label}>Ontem</Text>
                    </View>
                    <View style={modalStyles.checkboxContainer}>
                        <CheckBox
                            value={checkboxKey === 'hora'}
                            onValueChange={(newValue) => newValue ? setDateTime('hora') : setDateTime('')}
                            tintColors={{ true: COLORS.success, false: '#7C7A80' }}
                            style={modalStyles.checkbox}
                        />
                        <Text style={modalStyles.label}>Ultima hora</Text>
                    </View>
                    <View style={modalStyles.checkboxContainer}>
                        <CheckBox
                            value={checkboxKey === 'custom'}
                            onValueChange={(newValue) => newValue ? setDateTime('custom') : setDateTime('')}
                            tintColors={{ true: COLORS.success, false: '#7C7A80' }}
                            style={modalStyles.checkbox}
                        />
                        <Text style={modalStyles.label}>Selecionar período</Text>
                    </View>
                    <View style={checkboxKey !== 'custom' ? { height: 0, overflow: 'hidden'} : {}}>
                        <View style={modalStyles.checkboxContainer}>
                            <Text style={modalStyles.label}>início</Text>
                            <Pressable style={modalStyles.dateButton} title="Open" onPress={() => setStartDayOpen(true)}>
                                <Text style={{color: COLORS.white}}>
                                    {startDate.toLocaleString('af-ZA')}
                                </Text>
                            </Pressable>
                        </View>
                        <View style={modalStyles.checkboxContainer}>
                            <Text style={[modalStyles.label, {paddingEnd: 10}]}>Fim</Text>
                            <Pressable style={modalStyles.dateButton} title="Open" onPress={() => setEndDate(true)}>
                                <Text style={{color: COLORS.white}}>
                                    {endDate.toLocaleString('af-ZA')}
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <DatePicker
                        modal
                        open={startDayOpen}
                        date={startDate}
                        onConfirm={(date) => {
                            setStartDayOpen(false)
                            setStartDate(date)
                        }}
                        onCancel={() => {
                            setStartDayOpen(false)
                        }}
                    />
                    <DatePicker
                        modal
                        open={endDayOpen}
                        date={endDate}
                        onConfirm={(date) => {
                            setEndDayOpen(false)
                            setEndDate(date)
                        }}
                        onCancel={() => {
                            setEndDayOpen(false)
                        }}
                    />
                    <View style={{alignSelf: 'center', paddingTop: 20, width: 150, flexDirection: 'column'}}>
                        <Pressable
                            style={[modalStyles.button, modalStyles.buttonActive, {marginBottom: 10}]}
                            onPress={() => { fetchPlayback() }}
                            >
                            <Text style={modalStyles.textStyle}>Reproduzir</Text>
                        </Pressable>
                        <Pressable
                            style={[modalStyles.button, modalStyles.buttonClose]}
                            onPress={() => { setModalVisible(!modalVisible);fetchPlayback() }}
                            >
                            <Text style={modalStyles.textStyle}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
        <Map
            switchMapType
            pins={pin ? [pin] : null}
            playbackFilterCb={()=>{
                setModalVisible(true);
            }}
            startAt={startDate.toLocaleString()}
            finishAt={endDate.toLocaleString()}
            animate={animateCoord}
            playback={devicePlayback}
        />

    </View>
  );
}
const modalStyles = StyleSheet.create({
  //checkbox
  dateButton: {
    padding: 10,
    backgroundColor: '#7C7A80',
    borderRadius: 20,
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
    color: COLORS.white,
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
    backgroundColor: COLORS.tempest,
    borderRadius: 20,
    padding: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: 30,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 13,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#fafafa',
  },
  buttonClose: {
    backgroundColor: '#B3B0B8',
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    color: COLORS.black,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default DeviceHistory
