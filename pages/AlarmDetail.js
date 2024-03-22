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

const AlarmDetail = ({ userData }) => {
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


    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            setPin(route.params.alarm)
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Map
            switchMapType
            alarm={pin}
        />

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

export default AlarmDetail
