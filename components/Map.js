import { Text, TouchableOpacity, StyleSheet, View, Pressable, Image, Dimensions, PermissionsAndroid, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-ionicons'
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import GmIcon from './GmIcon';
import Geocoder from 'react-native-geocoding';
import { Linking } from 'react-native';

const {width, height} = Dimensions.get('screen');

const Map = (props) => {
    // const filledBgColor = props.color || COLORS.primary;
    // const outlinedColor = COLORS.white;
    // const bgColor = props.filled ? filledBgColor : outlinedColor;
    let counter = props.counter;
    const pins = props.pins;
    const switchMapType = props.switchMapType;
    const switcTraffic = props.switcTraffic;
    // const navigation = useNavigation();
    const [region, setRegion] = useState(null);
    // const [pins, setPins] = useState(props.pins);
    const [mapType, setMapType] = useState('standard');
    const [showText, setShowText] = useState(false);
    const [info, setInfo] = useState({pin: null, status: false, location: null});
    const [hasTraffic, setHasTraffic] = useState(false);
    const [focusPin, setFocusPin] = useState(null);
    const [showPoi, setShowPoi] = useState(false);
    // const [counter, setCounter] = useState(10);
    const navigation = useNavigation();

    const showInfo = (pin) => {
        if (!pin || !pin.device) {
            setInfo({pin: null, status: !info.status, location: null})
            return
        }
        setInfo({pin, status: !info.status, location: null})
        if (!info.status) {
            Geocoder.from(pin.latitude, pin.longitude)
                .then(json => {
                    setInfo({pin, status: !info.status, location: json.results[0].formatted_address})
                })
                .catch(error => console.warn(error));
        }
    }

    const openTerminal = () => {
        console.log('opening terminal')
    }

    const addFence = () => {
        Alert.alert('Confirmar', 'Você tem certeza que quer criar uma cerca virtual (raio: 300m) Para ' + info.pin.device.devicename, [
            {
                text: 'Confirmar',
                onPress: () => console.log('Adding fence'),
            },
            {
                text: 'Cancelar',
                onPress: () => console.log('Fence canceled'),
                style: 'cancel'
            }
        ]);
    }

    const openStreetView = (latitude, longitude) => {
        // const url = `https://www.google.com/maps/@${latitude},${longitude},6z`;
        const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}`;
        // const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        console.log(url)
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    const openGoogleMaps = (latitude, longitude) => {
        // const url = `https://www.google.com/maps/@${latitude},${longitude},6z`;
        const url = `https://www.google.com/maps?saddr=My+Location&daddr=${latitude},${longitude}`;
        // const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        console.log(url)
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    const updateFocusPin = (direction) => {
        console.log('pins:', pins.length)
        console.log('focusPin:', focusPin)
        if (!pins || pins.length === 0) {
            return
        }
        if (!focusPin) {
            setFocusPin({ pin: pins[0], index: 0 })
            setInfo({pin: pins[0], status: true, location: null})
            Geocoder.from(pins[0].latitude, pins[0].longitude)
                .then(json => {
                    setInfo({pin: pins[0], status: true, location: json.results[0].formatted_address})
                })
                .catch(error => console.warn(error));

            setRegion({
                latitude: pins[0].latitude,
                longitude: pins[0].longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            });

            return
        }
        if (direction === 'next') {
            if (pins[focusPin.index + 1]) {
                setFocusPin({ pin: pins[focusPin.index + 1], index: focusPin.index + 1 })
                setInfo({pin: pins[focusPin.index + 1], status: true})
                Geocoder.from(pins[focusPin.index + 1].latitude, pins[focusPin.index + 1].longitude)
                    .then(json => {
                        setInfo({pin: pins[focusPin.index + 1], status: true, location: json.results[0].formatted_address})
                    })
                    .catch(error => console.warn(error));
                setRegion({
                    latitude: pins[focusPin.index + 1].latitude,
                    longitude: pins[focusPin.index + 1].longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                });
            } else {
                setFocusPin({ pin: pins[0], index: 0 })
                setInfo({pin: pins[0], status: true})
                Geocoder.from(pins[0].latitude, pins[0].longitude)
                    .then(json => {
                        setInfo({pin: pins[0], status: true, location: json.results[0].formatted_address})
                    })
                    .catch(error => console.warn(error));
                setRegion({
                    latitude: pins[0].latitude,
                    longitude: pins[0].longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                });
            }
        }
        if (direction === 'prev') {
            if (pins[focusPin.index - 1]) {
                setFocusPin({ pin: pins[focusPin.index - 1], index: focusPin.index - 1 })
                setInfo({pin: pins[focusPin.index - 1], status: true})
                Geocoder.from(pins[focusPin.index - 1].latitude, pins[focusPin.index - 1].longitude)
                    .then(json => {
                        setInfo({pin: pins[focusPin.index - 1], status: true, location: json.results[0].formatted_address})
                    })
                    .catch(error => console.warn(error));
                setRegion({
                    latitude: pins[focusPin.index - 1].latitude,
                    longitude: pins[focusPin.index - 1].longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                });
            } else {
                setFocusPin({ pin: pins[pins.length - 1], index: pins.length - 1 })
                setInfo({pin: pins[pins.length - 1], status: true})
                Geocoder.from(pins[pins.length - 1].latitude, pins[pins.length - 1].longitude)
                    .then(json => {
                        setInfo({pin: pins[pins.length - 1], status: true, location: json.results[0].formatted_address})
                    })
                    .catch(error => console.warn(error));
                setRegion({
                    latitude: pins[pins.length - 1].latitude,
                    longitude: pins[pins.length - 1].longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                });
            }
        }
    }
    useEffect(() => {
        // console.log('useEffect being called', pins)
        // setPins(props.pins)
        if (pins) {
            let maxLat = null
            let maxLong = null
            let minLat = null
            let minLong = null
            pins.forEach(el => {
                if (parseFloat(el.latitude) > maxLat || !maxLat) {
                    maxLat = parseFloat(el.latitude)
                }
                if (parseFloat(el.latitude) < minLat || !minLat) {
                    minLat = parseFloat(el.latitude)
                }
                if (parseFloat(el.longitude) > maxLong || !maxLong) {
                    maxLong = parseFloat(el.longitude)
                }
                if (parseFloat(el.longitude) < minLong || !minLong) {
                    minLong = parseFloat(el.longitude)
                }
            })
            const lat = minLat + ((maxLat - minLat) / 2)
            const long = minLong + ((maxLong - minLong) / 2)
            if (!focusPin) {
                setRegion({
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: (maxLat - minLat) * 1.5,
                    longitudeDelta: (maxLong - minLong) * 1.5
                })
            }
        }
        if (props.region) {
            setRegion(props.region)
        }
    }, [pins]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{padding: 5, top: 10, left: 5, position: 'absolute', zIndex: 2, backgroundColor: '#eeeeee', borderRadius: 10}}>
                <Text style={{color: '#333333'}}>Atualizando em {counter}...</Text>
            </View>
            <View style={{padding: 5, top: 45, left: 5, position: 'absolute', zIndex: 2}}>
                <Pressable
                    style={[styles.whiteButton]}
                    onPress={() => {setShowText(!showText)}}>
                    <GmIcon name="text" size={20} color={showText ? "orange" : "black"} />
                </Pressable>
            </View>
            <View style={{padding: 5, top: 85, left: 5, position: 'absolute', zIndex: 2}}>
                <Pressable
                    style={[styles.whiteButton]}
                    onPress={() => setShowPoi(!showPoi)}>
                    <GmIcon name="poi" size={20} color={showPoi ? "orange" : "black"} />
                </Pressable>
            </View>

            <View style={{padding: 5, top: 55, right: 5, position: 'absolute', zIndex: 2}}>
                <Pressable
                    style={[styles.transparentButton, {backgroundColor: 'rgba(0, 0, 0, .8)'}]}
                    onPress={() => props.refreshCb()}>
                    <GmIcon name="rotate" size={20} color="white" />
                    {/* <Icon name="navigate" style={hasTraffic ? {color: COLORS.black} : {color: COLORS.gray}} size={25} /> */}
                </Pressable>
            </View>
            {switcTraffic && 
                <View style={{padding: 5, top: 95, right: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.transparentButton, {backgroundColor: 'rgba(0, 0, 0, .8)' }]}
                        onPress={() => setHasTraffic(!hasTraffic)}>
                        <GmIcon name="traffic" size={20} color={hasTraffic ? "orange" : "white"} />
                        {/* <Icon name="navigate" style={hasTraffic ? {color: COLORS.black} : {color: COLORS.gray}} size={25} /> */}
                    </Pressable>
                </View>
            }
            {switchMapType && 
                <View style={{padding: 5, top: 135, right: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.transparentButton, { backgroundColor: 'rgba(0, 0, 0, .8)' }]}
                        onPress={() => mapType === 'hybrid' ? setMapType('standard') : setMapType('hybrid')}>
                        <GmIcon name="map" size={20} color={mapType === 'hybrid' ? "orange" : "white"} />
                    </Pressable>
                </View>
            }
            {info.status && 
                <View style={{padding: 5, top: 175, right: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.transparentButton, { backgroundColor: 'rgba(0, 0, 0, .8)' }]}
                        onPress={() => addFence()}>
                        <GmIcon name="fence" size={20} color="white" />
                    </Pressable>
                </View>
            }
            {info.status &&
                <View style={{padding: 5, top: 215, right: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.transparentButton, { backgroundColor: 'rgba(0, 0, 0, .8)' }]}
                        onPress={() => openStreetView(info.pin.latitude, info.pin.longitude)}>
                        <GmIcon name="street" size={20} color="white" />
                    </Pressable>
                </View>
            }
            {info.status && 
                <View style={{padding: 5, bottom: 105, right: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.transparentButton, {backgroundColor: 'rgba(0, 0, 0, .8)'}]}
                        onPress={() => openGoogleMaps(info.pin.latitude, info.pin.longitude)}>
                        <GmIcon name="loc" size={20} color="white" />
                        {/* <Icon name="navigate" style={hasTraffic ? {color: COLORS.black} : {color: COLORS.gray}} size={25} /> */}
                    </Pressable>
                </View>
            }
            {info.status && 
                <View style={{padding: 5, bottom: 155, right: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.transparentButton, {backgroundColor: 'rgba(0, 0, 0, .8)'}]}
                        onPress={()=>navigation.push('Comandos', { device: info.pin.device })}>
                        <GmIcon name="terminal" size={20} color="white" />
                        {/* <Icon name="navigate" style={hasTraffic ? {color: COLORS.black} : {color: COLORS.gray}} size={25} /> */}
                    </Pressable>
                </View>
            }

            {info.location && 
                <View style={{padding: 5, bottom: 10, left: '15%', width: '70%', position: 'absolute', zIndex: 2, backgroundColor: '#33333390', borderRadius: 5}}>
                    <Text style={{color: 'white'}}>{info.location}</Text>
                </View>
            }
            <View style={{padding: 5, top: '50%', left: 5, position: 'absolute', zIndex: 2}}>
                <Pressable
                    style={[styles.whiteButton]}
                    onPress={() => updateFocusPin('prev')}>
                    <GmIcon name="arrow-left" size={20} color="black" />
                </Pressable>
            </View>
            <View style={{padding: 5, top: '50%', right: 5, position: 'absolute', zIndex: 2}}>
                <Pressable
                    style={[styles.whiteButton]}
                    onPress={() => updateFocusPin('next')}>
                    <GmIcon name="arrow-right" size={20} color="black" />
                </Pressable>
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
                mapType={mapType}
                mode="TRANSIT"
                style={{width: width, height: height - 150}}
                region={region}
                showsTraffic={hasTraffic}
                zoomControlEnabled={true}
                minZoomLevel={9}
                loadingEnabled={true}
            >
                {pins.map((item, index)=>{
                    return <Marker
                            key={item.device.id}
                            onPress={() => {
                                showInfo(item)
                                // setShowText(false)
                                setFocusPin()
                                setFocusPin({ pin: item, index: +index })
                                setRegion({
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                })
                            }}
                            anchor={{ x: 0, y: 1}}
                            style={{overflow: 'visible'}}
                            coordinate={
                                {
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }
                            }
                        >
                            <View style={{position: 'relative', overflow: 'visible'}}>
                                {info.status && info.pin.device.id === item.device.id &&
                                    <View style={{backgroundColor: '#33333390', borderColor: '#333333', borderWidth: 1, borderRadius: 5}}>
                                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>{item.device.devicename}({item.device.devicetype})</Text>
                                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>tempo: {item.gpstime}</Text>
                                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>estado: {+item.speed <= 0 ? 'Parado' : 'Em movimento'}</Text>
                                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>motor: {+item.speed <= 0 ? 'Ligado' : 'Desligado'}</Text>
                                    </View>
                                }
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Image
                                        source={+item.speed <= 0 ? require("../assets/carroparado.png") : require("../assets/carroandando.png")}
                                        style={{width: 35, height: 35, transform: [{ rotate: item.course + 'deg'}]}}
                                    />
                                    {showText && 
                                        <View style={{backgroundColor: '#fafafa', borderColor: '#333333', borderWidth: 1, borderRadius: 5}}>
                                            <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, fontWeight: 'bold'}}>{item.device.devicename}</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </Marker>
                })}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    transparentButton: {
        backgroundColor: '#333333',
        borderRadius: 5,
        padding: 7,
        elevation: 2
    },
    whiteButton: {
        backgroundColor: '#fafafa',
        borderRadius: 5,
        padding: 7,
        elevation: 2
    },
})
export default Map
