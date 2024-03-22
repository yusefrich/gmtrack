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
  Pressable,
} from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-ionicons'
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import COLORS from '../constants/colors';
import MapViewDirections from 'react-native-maps-directions';
import Map from '../components/Map';
import api from '../services/api';

const {width, height} = Dimensions.get('screen');

const Monitor = ({ userData }) => {
    const [region, setRegion] = useState(null);
    const [pins, setPins] = useState([]);
    const [mapKey, setMapKey] = useState(1);
    const [counter, setCounter] = useState(10);
    const [currentTimeout, setCurrentTimeout] = useState(null);
    const [hasTraffic, setHasTraffic] = useState(false);

    const fetchTrack = async () => {
        const [data, err] = await api.userTrack(userData)
        if (err) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao monitorar veiculos: ' + err.message
            });
            console.error('detal error => ', err);
            return
        }
        console.log('cars => ' + JSON.stringify(data));
        const elements = []
        data.forEach(e => {
            if (elements.find((item)=>item.device.id === e.device.id)) {
                return
            }
            const pin = {
                ...e,
                coordinate: new AnimatedRegion({
                    latitude: parseFloat(e.latitude),
                    longitude: parseFloat(e.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                })
            }
            elements.push(pin)
            setRegion({
                latitude: e.latitude,
                longitude: e.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            });
        })
        setPins(elements)
        // props.submit({userData: responseData, token: responseData.token, carrousel: rresponseData.data})
    }
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            // console.log('data ', userData)
            fetchTrack()
            // Geolocation.getCurrentPosition(info => {
            //     setRegion({
            //         latitude: info.coords.latitude,
            //         longitude: info.coords.longitude,
            //         latitudeDelta: 0.0922,
            //         longitudeDelta: 0.0421
            //     });
            // })

            return () => {
                isActive = false;
            };

        }, [userData])
    );
    useEffect(() => {
        if (counter > 0) {
            const timeout = setTimeout(() => setCounter(counter - 1), 1000);
            setCurrentTimeout(timeout)
        } else {
            setCounter(10)
            setMapKey(mapKey + 1)
            fetchTrack()
        }
    }, [counter]);


  return (
    // <></>
    <Map
        switchMapType
        switcTraffic
        refresh
        pinTitle
        counter={counter}
        pins={pins}
        refreshCb={()=>{
            clearTimeout(currentTimeout);
            setCounter(0);
        }}
    />
    // region={region}
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <View style={{padding: 5, bottom: 10, position: 'absolute', zIndex: 2, backgroundColor: '#eeeeee', borderRadius: 10}}>
    //         <Text style={{color: '#333333'}}>Atualizando em {counter}...</Text>
    //     </View>
    //     <View style={{padding: 5, top: 5, left: 5, position: 'absolute', zIndex: 2}}>
    //         <Pressable
    //             style={[modalStyles.button, modalStyles.buttonOpen, mapType === 'hybrid' ? {backgroundColor: COLORS.blue} : {backgroundColor: COLORS.white}]}
    //             onPress={() => mapType === 'hybrid' ? setMapType('standard') : setMapType('hybrid')}>
    //             <Icon name="map" style={mapType === 'hybrid' ? {color: COLORS.black} : {color: COLORS.gray}} size={25} />
    //         </Pressable>
    //     </View>
    //     <View style={{padding: 5, top: 65, left: 5, position: 'absolute', zIndex: 2}}>
    //         <Pressable
    //             style={[modalStyles.button, hasTraffic ? {backgroundColor: COLORS.blue} : {backgroundColor: COLORS.white}]}
    //             onPress={() => setHasTraffic(!hasTraffic)}>
    //             <Icon name="navigate" style={hasTraffic ? {color: COLORS.black} : {color: COLORS.gray}} size={25} />
    //         </Pressable>
    //     </View>
    //     <MapView
    //         onMapReady={()=>{
    //             Platform.OS === 'android' ?
    //             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(()=>{
    //                 console.log('Usuario aceitou')
    //             })
    //             : ''
    //         }}
    //         showsUserLocation={true}
    //         mapType={mapType}
    //         mode="TRANSIT"
    //         style={{width: width, height: height - 150}}
    //         region={region}
    //         showsTraffic={hasTraffic}
    //         zoomControlEnabled={true}
    //         minZoomLevel={9}
    //         loadingEnabled={true}
    //     >
    //         {pins.map((item)=>{
    //             return <Marker key={item.device.id} coordinate={
    //                 {
    //                     latitude: item.latitude,
    //                     longitude: item.longitude,
    //                     latitudeDelta: 0.0922,
    //                     longitudeDelta: 0.0421
    //                 }
    //             }>
    //                 <Image
    //                     source={+item.speed <= 0 ? require("../assets/pinparado.png") : require("../assets/pinandando.png")}
    //                     style={{width: 35, height: 35}}
    //                 />
    //             </Marker>
    //         })}

    //     </MapView>
    // </View>
  );
}
const modalStyles = StyleSheet.create({
  //checkbox
  button: {
    borderRadius: 100,
    padding: 10,
    paddingHorizontal: 13,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#fafafa',
  }
});

export default Monitor
