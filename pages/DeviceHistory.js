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
        data.data.split(';').forEach(e => {
            // if (rawPlayback[rawPlayback.length - 1].latitude !== parseFloat(e.split(',')[1]) && rawPlayback[rawPlayback.length - 1].longitude !== parseFloat(e.split(',')[0]))
            rawPlayback.push({
                latitude: parseFloat(e.split(',')[1]),
                longitude: parseFloat(e.split(',')[0]),
                gpstime: parseFloat(e.split(',')[2]),
                speed: +e.split(',')[3],
                course: e.split(',')[4]
            })
            if (e.split(',')[3] <= 0) {
                rawStops.push({
                    latitude: parseFloat(e.split(',')[1]),
                    longitude: parseFloat(e.split(',')[0]),
                    speed: +e.split(',')[3]
                })
            }
        })
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
        // console.log('raw play ', rawPlayback)
        // setAlarms(data.data)
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
        // console.log('mooving to', JSON.stringify({latitude, longitude, pos: pin.pos}))
        // const newCoordinate = {latitude, longitude};
        // if(Platform.OS == 'android'){
        //     if(markerRef.current){
        //         markerRef.current.animateMarkerToCoordinate(newCoordinate, 1000 / speeds[currentSpeed]);
        //     }
        // } else {
        //     pin.coordinate.timing(newCoordinate).start();
        // }
        setAnimateCoord({latitude, longitude})
    }


    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            // console.log('data ', userData)
            // const initialRoute = useRoute()
            // setRegion({
            //     latitude: initialRoute.params.device.latitude,
            //     longitude: initialRoute.params.device.longitude,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421
            // });

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
        {/* <View style={{padding: 5, bottom: 120, right: 5, position: 'absolute', zIndex: 2}}>
            <Pressable
                style={[modalStyles.button, modalStyles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Icon name="funnel" style={{color: '#333333'}} size={35} />
            </Pressable>
        </View> */}
        {/* <View style={{padding: 5, bottom: 180, right: 10, position: 'absolute', zIndex: 2}}>
            <Pressable
                style={[modalStyles.button, modalStyles.buttonOpen, {paddingHorizontal: 15}]}
                onPress={() => setPlayerStatus(!playerStatus)}>
                <Icon name={playerStatus ? 'pause' : 'play'} style={{color: '#333333'}} size={25} />
            </Pressable>
        </View> */}
        {/* <View style={{padding: 5, bottom: 290, right: 10, position: 'absolute', zIndex: 2}}>
            <Pressable
                style={[modalStyles.button, modalStyles.buttonOpen, {paddingHorizontal: 15}]}
                onPress={() => {
                    setCurrentSpeed((currentSpeed + 1) < speeds.length ? currentSpeed + 1 : 0)
                }}>
                <Text>{speeds[currentSpeed]}x</Text>
            </Pressable>
        </View> */}
        {/* <View style={{padding: 5, bottom: 230, right: 10, position: 'absolute', zIndex: 2}}>
            <Pressable
                style={[modalStyles.button, modalStyles.buttonOpen, {paddingHorizontal: 15}]}
                onPress={() => setPin({
                    device: pin.device,
                    latitude: pin.latitude,
                    longitude: pin.longitude,
                    coordinate: pin.coordinate,
                    speed: 0,
                    pos: 0
                })}>
                <Icon name="refresh" style={{color: '#333333'}} size={25} />
            </Pressable>
        </View> */}
        {/* <View style={{padding: 5, top: 5, left: 5, position: 'absolute', zIndex: 2}}>
            <Pressable
                style={[modalStyles.button, modalStyles.buttonOpen, mapType === 'hybrid' ? {backgroundColor: COLORS.blue} : {backgroundColor: COLORS.white}]}
                onPress={() => mapType === 'hybrid' ? setMapType('standard') : setMapType('hybrid')}>
                <Icon name="map" style={mapType === 'hybrid' ? {color: COLORS.black} : {color: COLORS.gray}} size={25} />
            </Pressable>
        </View> */}
        {/* <View style={{padding: 5, top: 65, left: 5, position: 'absolute', zIndex: 2}}>
            <Pressable
                style={[modalStyles.button, hasTraffic ? {backgroundColor: COLORS.blue} : {backgroundColor: COLORS.white}]}
                onPress={() => setHasTraffic(!hasTraffic)}>
                <Icon name="navigate" style={hasTraffic ? {color: COLORS.black} : {color: COLORS.gray}} size={25} />
            </Pressable>
        </View> */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <Text style={modalStyles.modalText}>Selecione o periodo!</Text>
                    <View style={modalStyles.checkboxContainer}>
                        <CheckBox
                            value={checkboxKey === 'ontem'}
                            onValueChange={(newValue) => newValue ? setDateTime('ontem') : setDateTime('')}
                            style={modalStyles.checkbox}
                        />
                        <Text style={modalStyles.label}>Ontem</Text>
                    </View>
                    <View style={modalStyles.checkboxContainer}>
                        <CheckBox
                            value={checkboxKey === 'hoje'}
                            onValueChange={(newValue) => newValue ? setDateTime('hoje') : setDateTime('')}
                            style={modalStyles.checkbox}
                        />
                        <Text style={modalStyles.label}>Hoje</Text>
                    </View>
                    <View style={modalStyles.checkboxContainer}>
                        <CheckBox
                            value={checkboxKey === 'hora'}
                            onValueChange={(newValue) => newValue ? setDateTime('hora') : setDateTime('')}
                            style={modalStyles.checkbox}
                        />
                        <Text style={modalStyles.label}>Ultima hora</Text>
                    </View>
                    <View style={modalStyles.checkboxContainer}>
                        <CheckBox
                            value={checkboxKey === 'custom'}
                            onValueChange={(newValue) => newValue ? setDateTime('custom') : setDateTime('')}
                            style={modalStyles.checkbox}
                        />
                        <Text style={modalStyles.label}>Selecionar período</Text>
                    </View>
                    <View style={checkboxKey !== 'custom' ? { height: 0, overflow: 'hidden'} : {}}>
                        <View style={modalStyles.checkboxContainer}>
                            <Text style={modalStyles.label}>Hora inicial</Text>
                            <Pressable style={modalStyles.dateButton} title="Open" onPress={() => setStartDayOpen(true)}>
                                <Text style={{color: COLORS.black}}>
                                    {startDate.toLocaleString('af-ZA')}
                                </Text>
                            </Pressable>
                        </View>
                        <View style={modalStyles.checkboxContainer}>
                            <Text style={[modalStyles.label, {paddingEnd: 10}]}>Hora final</Text>
                            <Pressable style={modalStyles.dateButton} title="Open" onPress={() => setEndDate(true)}>
                                <Text style={{color: COLORS.black}}>
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
                    <View style={{alignSelf: 'center', paddingTop: 20, flexDirection: 'row'}}>
                        <Pressable
                            style={[modalStyles.button, modalStyles.buttonClose, {marginRight: 10}]}
                            onPress={() => { setModalVisible(!modalVisible);fetchPlayback() }}
                            >
                            <Text style={modalStyles.textStyle}>Cancelar</Text>
                        </Pressable>
                        <Pressable
                            style={[modalStyles.button, modalStyles.buttonActive]}
                            onPress={() => { fetchPlayback() }}
                            >
                            <Text style={modalStyles.textStyle}>Reproduzir</Text>
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

        {/* <MapView
            onMapReady={()=>{
                Platform.OS === 'android' ?
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(()=>{
                    console.log('Usuario aceitou')
                })
                : ''
            }}
            showsUserLocation={true}
            style={{width: width, height: height - 100}}
            region={region}
            zoomControlEnabled={true}
            mapType={mapType}
            mode="TRANSIT"
            showsTraffic={hasTraffic}
            minZoomLevel={9}
            loadingEnabled={true}
        >
            {playback && 
                <Polyline
                    coordinates={playback}
                    strokeColor='#6495ED' // fallback for when `strokeColors` is not supported by the map-provider
                    mode="DRIVING"
                    strokeColors={[
                        '#7F0000',
                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={6}
                />
            }
            {pin &&
                <Marker.Animated key={pin.device.id} coordinate={pin.coordinate} ref={markerRef}>
                    <Image
                        source={+pin.speed <= 0 ? require("../assets/carroparado.png") : require("../assets/carroandando.png")}
                        style={{width: 35, height: 35, transform: [{ rotate: deg + 'deg'}]}}
                    />
                </Marker.Animated>
            }
            {stops.map((item)=>{
                return <Marker key={item.id} coordinate={
                    {
                        latitude: item.latitude,
                        longitude: item.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }
                }>
                    <Image
                        source={require("../assets/pinponto.png")}
                        style={{width: 35, height: 35}}
                    />
                </Marker>
            })}
        </MapView> */}
    </View>
  );
}
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
    backgroundColor: 'white',
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

export default DeviceHistory
