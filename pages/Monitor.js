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

const {width, height} = Dimensions.get('screen');

const Monitor = ({ userData }) => {
    const [user, setUser] = useState(null);
    const [region, setRegion] = useState(null);
    const [userRegion, setUserRegion] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [counter, setCounter] = useState(10);

    const fetchTrack = () => {
        if (!userData || !userData.token) {
            Toast.show({
                type: 'error',
                text1: 'Houve um erro, realize o login novamente!'
            });
            return
        }
        fetch("https://gmtrack.azael.tech/api/user/track", {
            headers: {
                Authorization: 'Bearer ' + userData.token,
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            if (!Array.isArray(responseData.data)) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao buscar seus veiculos'
                });
                return
            }
            console.log('cars => ' + JSON.stringify(responseData));
            let elements = []
            responseData.data.forEach(e => {
                if (elements.find((item)=>item.key === e.device.id)) {
                    return
                }
                elements.push({ label: '🚙  ' + e.device.devicename, value: e, key: e.device.id })
            })
            setItems(elements)
            // props.submit({userData: responseData, token: responseData.token, carrousel: rresponseData.data})
        })
    }
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            console.log('data ', userData)
            setUser(userData)
            fetchTrack()
            return () => {
                isActive = false;
            };

        }, [userData])
    );
    useEffect(() => {
        // run something every time name changes
        if (value) {
            setRegion({
                latitude: value.latitude,
                longitude: value.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            });
            console.log(value);
            // setCounter(0)
        } else {
            Geolocation.getCurrentPosition(info => {
                setRegion({
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                });
            })
            // setRegion
        }
    }, [value]);
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
      {/* <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} /> */}
        <View style={{padding: 5, top: 65, zIndex: 2, width: width - 100}}>
            <DropDownPicker
                style={{borderColor: '#A5ABAA'}}
                placeholder="Selecione seu veículo"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                itemKey='key'
                setValue={setValue}
                setItems={setItems}
            />
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
            style={{width: width, height: height - 80}}
            region={region}
            zoomControlEnabled={true}
            minZoomLevel={17}
            loadingEnabled={true}
        >
            {value && region &&
                <Marker key={value.device.id} coordinate={region}>
                    <Image
                        source={require("../assets/car.png")}
                        style={{width: 35, height: 35}}
                    />
                    {/* style={styles.markerImage} */}
                </Marker>
            }
        </MapView>
      {/* <Text>Monitor!</Text> */}
    </View>
  );
}
export default Monitor
