/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';

const {width, height} = Dimensions.get('screen');

const DeviceMap = ({ userData }) => {
    const [region, setRegion] = useState(null);
    const [pins, setPins] = useState([]);
    const [alarms, setAlarms] = useState([]);
    const [counter, setCounter] = useState(10);
    const route = useRoute();

    const fetchTrack = async () => {
        if (!userData || !userData.token) {
            Toast.show({
                type: 'error',
                text1: 'Houve um erro, realize o login novamente!'
            });
            return
        }

        
        const [data, err] = await api.track({
            token: userData.token
        })
        console.log('carsa => ' + JSON.stringify(data));
        if (!err && !Array.isArray(data.data)) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao monitorar veículos'
            });
            return
        }
        let elements = []
        data.data.forEach(e => {
            if (e.device.id === route.params.device.id) {
                setRegion({
                    latitude: e.latitude,
                    longitude: e.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                });
            }

            if (elements.find((item)=>item.device.id === e.device.id)) {
                return
            }
            elements.push(e)
        })
        setPins(elements)
    }
    const fetchAlarms = async () => {
        if (!userData || !userData.token) {
            Toast.show({
                type: 'error',
                text1: 'Houve um erro, realize o login novamente!'
            });
            return
        }
        console.log('fetchAlarms being called')
        const currentDate = new Date()
        let yesterday = new Date()
        yesterday.setHours(currentDate.getHours() - 24)
        const [data, err] = await api.playback({
            token: userData.token,
            imei: route.params.device.imei,
            start_date: currentDate.toLocaleString('af-ZA'),
            end_date: yesterday.toLocaleString('af-ZA')
        })
        if (!Array.isArray(data.data)) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao monitorar veículos'
            });
            return
        }
        console.log('alarms => ' + JSON.stringify(data.data));
        setAlarms(data.data)
    }

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            console.log('data ', userData)
            fetchTrack()
            fetchAlarms()
            return () => {
                isActive = false;
            };

        }, [userData])
    );
    useEffect(() => {
        if (counter > 0) {
            setTimeout(() => setCounter(counter - 1), 1000);
        } else {
            setCounter(10)
            fetchTrack()
        }
    }, [counter]);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{padding: 5, bottom: 40, position: 'absolute', zIndex: 2, backgroundColor: '#333333', borderRadius: 10}}>
            <Text style={{color: '#eeeeee'}}>{route.params.device.devicename}</Text>
        </View>
        <View style={{padding: 5, bottom: 10, position: 'absolute', zIndex: 2, backgroundColor: '#eeeeee', borderRadius: 10}}>
            <Text style={{color: '#333333'}}>Atualizando em {counter}...</Text>
        </View>
        <MapView
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
            minZoomLevel={9}
            loadingEnabled={true}
        >
            {pins.map((item)=>{
                return <Marker key={item.device.id} coordinate={
                    {
                        latitude: item.latitude,
                        longitude: item.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }
                }>
                    <Image
                        source={require("../assets/car.png")}
                        style={{width: 35, height: 35}}
                    />
                </Marker>
            })}

        </MapView>
    </View>
  );
}
export default DeviceMap
