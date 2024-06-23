import { Text, TouchableOpacity, StyleSheet, View, Pressable, Image, Dimensions, PermissionsAndroid, Platform, Alert, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon from 'react-native-ionicons'
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import GmIcon from './GmIcon';
import Geocoder from 'react-native-geocoding';
import { Linking } from 'react-native';

const {width, height} = Dimensions.get('screen');

const Map = (props) => {
    // const filledBgColor = props.color || COLORS.primary;
    // const outlinedColor = COLORS.white;
    // const bgColor = props.filled ? filledBgColor : outlinedColor;
    let counter = props.counter || false;
    const refresh = props.refresh || false;
    const pinTitle = props.pinTitle || false;
    const pins = props.pins || false;
    const alarm = props.alarm || false;
    const playback = props.playback || false;
    const switchMapType = props.switchMapType;
    const switcTraffic = props.switcTraffic;
    const speeds = [1, 2, 4, 8]
    const [currentPlaybackSpeed, setCurrentPlaybackSpeed] = useState(0);
    const [pausePlayback, setPausePlayback] = useState(false);
    const [playbackPos, setPlaybackPos] = useState(-1);
    const [playbackKm, setPlaybackKm] = useState(0);
    const [playbackCarSpeed, setPlaybackCarSpeed] = useState(0);
    const [mapViewCurrentRegion, setMapViewCurrentRegion] = useState(0);
    const [playbackCourse, setPlaybackCourse] = useState(0);
    const [playbackGpsTime, setPlaybackGpsTime] = useState(null);
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
    const markerRef = useRef()

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
                // console.log('lat', lat)
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
    const getLocation = () => {
        let newPos = playbackPos
        if (pausePlayback) {
            return
        }
        if (!playback.route[newPos]) {
            return
        }
        if (newPos >= playback.route.length) {
            setPlaybackPos(0)
            return
        }
        // const newPin = {
        //     device: route.params.device,
        //     latitude: playback[newPos].latitude,
        //     longitude: playback[newPos].longitude,
        //     coordinate: new AnimatedRegion({
        //         latitude: playback[newPos].latitude,
        //         longitude: playback[newPos].longitude,
        //         latitudeDelta: 0.0922,
        //         longitudeDelta: 0.0421
        //     }),
        //     speed: playback[newPos].speed,
        //     course: playback[newPos].course,
        //     pos: newPos
        // }
        let lat_min = mapViewCurrentRegion.latitude - (mapViewCurrentRegion.latitudeDelta / 2);
        let lat_max = mapViewCurrentRegion.latitude + (mapViewCurrentRegion.latitudeDelta / 2);

        let lng_min = mapViewCurrentRegion.longitude - (mapViewCurrentRegion.longitudeDelta / 2);
        let lng_max = mapViewCurrentRegion.longitude + (mapViewCurrentRegion.longitudeDelta / 2);

        if(playbackPos === 0 || (playback.route[newPos].latitude<lat_min || playback.route[newPos].latitude>lat_max) || (playback.route[newPos].longitude<lng_min || playback.route[newPos].longitude>lng_max)){
            setRegion({
                latitude: playback.route[newPos].latitude,
                longitude: playback.route[newPos].longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021
            });
        }
        setPlaybackCarSpeed(playback.route[newPos].speed)
        setPlaybackGpsTime(new Date(playback.route[newPos].gpstime * 1000).toLocaleString())
        if (playback.route[newPos - 1]) {
            setPlaybackKm(playbackKm + distance(playback.route[newPos - 1].latitude, playback.route[newPos - 1].longitude, playback.route[newPos].latitude, playback.route[newPos].longitude))
            // todo: the rotation must be between the points
            const ax = playback.route[newPos - 1].latitude
            const ay = playback.route[newPos - 1].longitude
            const bx = playback.route[newPos].latitude
            const by = playback.route[newPos].longitude
            const course = Math.atan2(by-ay, bx-ax) * 180 / Math.PI
            console.log('new course', {ax, ay, bx, by})
            setPlaybackCourse(course)
        } else {
            setPlaybackCourse(playback.route[newPos].course)
        }
        animate(playback.route[newPos].latitude, playback.route[newPos].longitude, playback.route[newPos].course);
    }

    const animate = (latitude, longitude, course) => {
        // console.log('mooving to', JSON.stringify({latitude, longitude, pos: pin.pos}))
        const newCoordinate = {latitude, longitude};
        if(Platform.OS == 'android'){
            if(markerRef.current){
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 1000 / speeds[currentPlaybackSpeed]);
            }
        } else {
            pin.coordinate.timing(newCoordinate).start();
        }
        setTimeout(() => {
            console.log('timeout loop')
            setPlaybackPos(playbackPos + 1)
            // setPlaybackCourse(course)
        }, 1000 / speeds[currentPlaybackSpeed]);
        // setAnimateCoord({latitude, longitude})
    }
    const getAnchorPoint = (item) => {
        if (info.status && info.pin.device.id === item.device.id && showText) {
            return { x: 0.5, y: 0.9}
        }
        if (info.status && info.pin.device.id === item.device.id) {
            return { x: 0.5, y: 0.88}
        }
        if (showText) {
            return { x: 0.5, y: 0.735}
        }
        return { x: 0.5, y: 0.5 } 
    }
    const distance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // km
      const dLat = deg2rad(lat2-lat1);
      const dLon = deg2rad(lon2-lon1);
      let l1 = deg2rad(lat1);
      let l2 = deg2rad(lat2);

      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(l1) * Math.cos(l2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const d = R * c;
      return d;
    }
    const deg2rad = (deg) => {
        return deg * (Math.PI/180)
    }
    const showFilter = () => {
        props.playbackFilterCb()
        setPausePlayback(true)
    }
    const onRegionChange = (theRegion) => {
        setMapViewCurrentRegion(theRegion)
    }
    const getCurrentPlaybackSliderPosition = () => {
        const porc = (playbackPos * 100) / playback.route.length
        return porc + '%'
    }
    useEffect(() => {
        // console.log('useEffect being called', pins)
        // setPins(props.pins)
        if (!alarm) {
            return
        }
        setRegion({
            latitude: parseFloat(alarm.lat),
            longitude: parseFloat(alarm.long),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
        if (props.region) {
            setRegion(props.region)
        }
    }, [alarm]);
    useEffect(() => {
        // console.log('useEffect being called', pins)
        // setPins(props.pins)
        if (pins) {
            if (!focusPin && pins.length > 1) {
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
                setRegion({
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: (maxLat - minLat) * 1.5,
                    longitudeDelta: (maxLong - minLong) * 1.5
                })
            }
            if (!focusPin && pins.length === 1) {
                setRegion({
                    latitude: pins[0].latitude,
                    longitude: pins[0].longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                });
            }
        }
        if (props.region) {
            setRegion(props.region)
        }
    }, [pins]);
    useEffect(() => {
        if (playback) {
            console.log('new poss loop', playbackPos)
            getLocation()
        }
    }, [playbackPos, pausePlayback])
    useEffect(() => {
        if (playback) {
            console.log('playback loop', playback.route.length)
            setPausePlayback(false)
            setPlaybackPos(0)
        }
    }, [playback])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {counter &&
                <View style={{padding: 5, top: 10, left: 5, position: 'absolute', zIndex: 2, backgroundColor: '#eeeeee', borderRadius: 10}}>
                    <Text style={{color: '#333333'}}>Atualizando em {counter}...</Text>
                </View>
            }
            {playback &&
                <View style={{padding: 5, top: 10, left: 10, width: '82%', height: 40, position: 'absolute', zIndex: 2, backgroundColor: '#33333395', borderRadius: 10}}>
                    <View style={{flex: 1, flexDirection: 'row', position: 'relative'}}>
                        <Pressable style={{padding: 5, paddingLeft: 10}} onPress={() => setPausePlayback(!pausePlayback)}>
                            {!pausePlayback &&
                                <Icon name="pause" style={{color: COLORS.white}} size={20} />
                            }
                            {pausePlayback &&
                                <Icon name="play" style={{color: COLORS.white}} size={20} />
                            }
                        </Pressable>
                        <View style={{width: '80%', position: 'relative', marginTop: 2, marginLeft: 20}}>
                            <View style={{width: getCurrentPlaybackSliderPosition(), position: 'relative', height: 5, marginTop: 10, backgroundColor: COLORS.primary}}></View>
                            <Icon name="car" style={{position: 'absolute', left: getCurrentPlaybackSliderPosition(), color: COLORS.white}} size={24} />
                        </View>
                    </View>
                </View>
            }
            {playback &&
                <View style={{padding: 5, top: 55, right: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.transparentButton, { backgroundColor: 'rgba(0, 0, 0, .8)' }]}
                        onPress={() => {
                            setCurrentPlaybackSpeed((currentPlaybackSpeed + 1) < speeds.length ? currentPlaybackSpeed + 1 : 0)
                        }}>
                        {/* <GmIcon name="map" size={20} color={mapType === 'hybrid' ? "orange" : "white"} /> */}
                        <Text style={{color: '#ffffff', paddingHorizontal: 2}}>{speeds[currentPlaybackSpeed]}x</Text>
                    </Pressable>
                </View>
            }
            {playback &&
                <View style={{padding: 5, top: 95, right: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.transparentButton, { backgroundColor: 'rgba(0, 0, 0, .8)' }]}
                        onPress={() => showFilter()}>
                        {/* <GmIcon name="map" size={20} color={mapType === 'hybrid' ? "orange" : "white"} /> */}
                        <Icon name="funnel" style={{color: '#ffffff', paddingHorizontal: 1}} size={20} />
                    </Pressable>
                </View>
            }
            {pinTitle &&
                <View style={{padding: 5, top: 45, left: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.whiteButton]}
                        onPress={() => {setShowText(!showText)}}>
                        <GmIcon name="text" size={20} color={showText ? "orange" : "black"} />
                    </Pressable>
                </View>
            }
            <View style={{padding: 5, top: 85, left: 5, position: 'absolute', zIndex: 2}}>
                <Pressable
                    style={[styles.whiteButton]}
                    onPress={() => setShowPoi(!showPoi)}>
                    <GmIcon name="poi" size={20} color={showPoi ? "orange" : "black"} />
                </Pressable>
            </View>
            {refresh &&
                <View style={{padding: 5, top: 55, right: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.transparentButton, {backgroundColor: 'rgba(0, 0, 0, .8)'}]}
                        onPress={() => props.refreshCb()}>
                        <GmIcon name="rotate" size={20} color="white" />
                        {/* <Icon name="navigate" style={hasTraffic ? {color: COLORS.black} : {color: COLORS.gray}} size={25} /> */}
                    </Pressable>
                </View>
            }
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

            {pins && pins.length > 1 &&
                <View style={{padding: 5, top: '50%', left: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.whiteButton]}
                        onPress={() => updateFocusPin('prev')}>
                        <GmIcon name="arrow-left" size={20} color="black" />
                    </Pressable>
                </View>
            }
            {pins && pins.length > 1 &&
                <View style={{padding: 5, top: '50%', right: 5, position: 'absolute', zIndex: 2}}>
                    <Pressable
                        style={[styles.whiteButton]}
                        onPress={() => updateFocusPin('next')}>
                        <GmIcon name="arrow-right" size={20} color="black" />
                    </Pressable>
                </View>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={playback && getCurrentPlaybackSliderPosition() === '100%'}
                onRequestClose={() => {
                    setPlaybackPos(0)
                }}
            >
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <Text style={[modalStyles.modalText, {fontSize: 20}]}>Informações!</Text>
                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'black', fontWeight: 'bold'}}>Hora inicial: {props.startAt}</Text>
                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'black', fontWeight: 'bold'}}>Hora final: {props.finishAt}</Text>
                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'black', fontWeight: 'bold'}}>Quilometragem: {playbackKm.toFixed(2)} KM</Text>

                        <View style={{alignSelf: 'center', paddingTop: 20, flexDirection: 'row'}}>
                            <Pressable
                                style={[modalStyles.button, modalStyles.buttonActive, {marginRight: 10}]}
                                onPress={() => { setPlaybackPos(0) }}
                                >
                                <Text style={modalStyles.textStyle}>Repetir</Text>
                            </Pressable>
                            <Pressable
                                style={[modalStyles.button, modalStyles.buttonActive]}
                                onPress={() => showFilter()}
                                >
                                <Text style={modalStyles.textStyle}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <MapView
                onMapReady={()=>{
                    Platform.OS === 'android' ?
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(()=>{
                        console.log('Usuario aceitou')
                    })
                    : ''
                }}
                onRegionChange={(region)=>onRegionChange(region)}
                showsUserLocation={true}
                mapType={mapType}
                mode="TRANSIT"
                style={playback || alarm ? {width, height: height - 100} : {width: width, height: height - 150}}
                region={region}
                showsTraffic={hasTraffic}
                zoomControlEnabled={true}
                rotateEnabled={false}
                minZoomLevel={9}
                loadingEnabled={true}
            >
                {playback && 
                    <Polyline
                        coordinates={playback.route}
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
                {playback && playback.stops.map((item, index)=>{
                    return <Marker key={'stop_' + index} coordinate={
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
                {alarm &&
                    <Marker
                        key={'alarm_' + alarm.device.id}
                        coordinate={{
                            latitude: parseFloat(alarm.lat),
                            longitude: parseFloat(alarm.long),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    >
                        <View style={{position: 'relative', overflow: 'visible'}}>
                            <View style={{backgroundColor: '#33333390', borderColor: '#333333', borderWidth: 1, borderRadius: 5, height: 110}}>
                                <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>{alarm.device.devicename}</Text>
                                <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>Tipo de alarme: {alarm.type}</Text>
                                <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>Hora GPS: {alarm.gps_time}</Text>
                                <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>Hora do alarme: {alarm.system_time}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                <Image
                                    source={require("../assets/pinparado.png")}
                                    style={{width: 35, height: 35}}
                                />
                            </View>
                        </View>
                    </Marker>
                }
                {pins && pins[0] && playback &&
                    <Marker.Animated key={pins[0].device.id} anchor={{ x: 0.5, y: 0.88}} coordinate={pins[0].coordinate} ref={markerRef}>
                        <View style={{position: 'relative', overflow: 'visible'}}>
                            <View style={{backgroundColor: '#33333390', borderColor: '#333333', borderWidth: 1, borderRadius: 5, height: 110}}>
                                <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>Hora GPS: {playbackGpsTime}</Text>
                                <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>Velocidade: {playbackCarSpeed}Km/h</Text>
                                <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>trageto: {playbackCourse}°</Text>
                                <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>quilometragem: {playbackKm.toFixed(2)} KM</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                {/* {(+playbackCourse <= 22 || +playbackCourse > 338) && 
                                    <Image
                                        source={require("../assets/carro360/04.png")}
                                        style={{width: 35, height: 35}}
                                    />
                                }
                                {(+playbackCourse <= 67 && +playbackCourse > 22) && 
                                    <Image
                                        source={require("../assets/carro360/05.png")}
                                        style={{width: 35, height: 35}}
                                    />
                                }
                                {(+playbackCourse <= 112 && +playbackCourse > 67) && 
                                    <Image
                                        source={require("../assets/carro360/06.png")}
                                        style={{width: 35, height: 35}}
                                    />
                                }
                                {(+playbackCourse <= 157 && +playbackCourse > 112) && 
                                    <Image
                                        source={require("../assets/carro360/07.png")}
                                        style={{width: 35, height: 35}}
                                    />
                                }
                                {(+playbackCourse <= 202 && +playbackCourse > 157) && 
                                    <Image
                                        source={require("../assets/carro360/00.png")}
                                        style={{width: 35, height: 35}}
                                    />
                                }
                                {(+playbackCourse <= 247 && +playbackCourse > 202) && 
                                    <Image
                                        source={require("../assets/carro360/01.png")}
                                        style={{width: 35, height: 35}}
                                    />
                                }
                                {(+playbackCourse <= 290 && +playbackCourse > 247) && 
                                    <Image
                                        source={require("../assets/carro360/02.png")}
                                        style={{width: 35, height: 35}}
                                    />
                                }
                                {(+playbackCourse <= 338 && +playbackCourse > 290) && 
                                    <Image
                                        source={require("../assets/carro360/03.png")}
                                        style={{width: 35, height: 35}}
                                    />
                                } */}
                                <Image
                                    source={playbackCarSpeed <= 0 ? require("../assets/carroparado.png") : require("../assets/carroandando.png")}
                                    style={{width: 35, height: 35, transform: [{ rotate: playbackCourse + 'deg'}]}}
                                />
                            </View>
                        </View>
                    </Marker.Animated>
                }
                {pins && !playback && pins.map((item, index)=>{
                    if (!item || !item.coordinate) {
                        return <></>
                    }
                    return <Marker.Animated
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
                            anchor={getAnchorPoint(item)}
                            style={{overflow: 'visible'}}
                            coordinate={
                                item.coordinate
                            }
                        >
                            <View style={{position: 'relative', overflow: 'visible'}}>
                                {info.status && info.pin.device.id === item.device.id &&
                                    <View style={{backgroundColor: '#33333390', borderColor: '#333333', borderWidth: 1, borderRadius: 5, height: 110}}>
                                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>{item.device.devicename}({item.device.devicetype})</Text>
                                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>tempo: {item.gpstime}</Text>
                                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>course: {item.course} deg</Text>
                                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>estado: {+item.speed <= 0 ? 'Parado' : 'Em movimento'}</Text>
                                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, color: 'white', fontWeight: 'bold'}}>motor: {+item.speed <= 0 ? 'Ligado' : 'Desligado'}</Text>
                                    </View>
                                }
                                {showText &&
                                    <View style={{backgroundColor: '#fafafa', borderColor: '#333333', borderWidth: 1, borderRadius: 5, height: 30}}>
                                        <Text style={{margin: 0, paddingHorizontal: 5, paddingTop: 5, fontWeight: 'bold'}}>{item.device.devicename}</Text>
                                    </View>
                                }
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                    {/* {(+item.course <= 22 || +item.course > 338) && 
                                        <Image
                                            source={require("../assets/carro360/04.png")}
                                            style={{width: 35, height: 35}}
                                        />
                                    }
                                    {(+item.course <= 67 && +item.course > 22) && 
                                        <Image
                                            source={require("../assets/carro360/03.png")}
                                            style={{width: 35, height: 35}}
                                        />
                                    }
                                    {(+item.course <= 112 && +item.course > 67) && 
                                        <Image
                                            source={require("../assets/carro360/02.png")}
                                            style={{width: 35, height: 35}}
                                        />
                                    }
                                    {(+item.course <= 157 && +item.course > 112) && 
                                        <Image
                                            source={require("../assets/carro360/01.png")}
                                            style={{width: 35, height: 35}}
                                        />
                                    }
                                    {(+item.course <= 202 && +item.course > 157) && 
                                        <Image
                                            source={require("../assets/carro360/00.png")}
                                            style={{width: 35, height: 35}}
                                        />
                                    }
                                    {(+item.course <= 247 && +item.course > 202) && 
                                        <Image
                                            source={require("../assets/carro360/07.png")}
                                            style={{width: 35, height: 35}}
                                        />
                                    }
                                    {(+item.course <= 290 && +item.course > 247) && 
                                        <Image
                                            source={require("../assets/carro360/06.png")}
                                            style={{width: 35, height: 35}}
                                        />
                                    }
                                    {(+item.course <= 338 && +item.course > 290) && 
                                        <Image
                                            source={require("../assets/carro360/05.png")}
                                            style={{width: 35, height: 35}}
                                        />
                                    } */}
                                    <Image
                                        source={+item.speed <= 0 ? require("../assets/carroparado.png") : require("../assets/carroandando.png")}
                                        style={{width: 35, height: 35, transform: [{ rotate: item.course + 'deg'}]}}
                                    />
                                </View>
                            </View>
                        </Marker.Animated>
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


export default Map
