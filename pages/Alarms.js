import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-ionicons'
import ListGroup from '../components/ListGroup';
import ListButton from '../components/ListButton';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api'
import Toast from 'react-native-toast-message';
import COLORS from '../constants/colors';
import GmIcon from '../components/GmIcon';


const Item = ({title, icon}) => (
  <TouchableOpacity style={styles.item}>
    <View style={styles.itemTitle}>
        {/* <Text style={styles.title}>*</Text> */}
        <Icon style={styles.titleIcon} name={icon} />
        <Text style={styles.title}>{title}</Text>
    </View>
    <Icon style={{ fontSize: 20 }} name="arrow-dropright" />
  </TouchableOpacity>
);

const Alarms = ({ userData }) => {
  const [alarms, setAlarms] = useState([]);
  const navigation = useNavigation();
  const fetchAlarms = async () => {
    if (!userData || !userData.token) {
      console.log('token nulo')
      return
    }
    const [data, err] = await api.alarms({token: userData.token})
    console.log('Alarms => ' + JSON.stringify(data.data));
    setAlarms(data.data)
  }
  useFocusEffect(
      React.useCallback(() => {
          let isActive = true;
          fetchAlarms()
          return () => {
              isActive = false;
          };

      }, [])
  );

  return (

    <ImageBackground source={require("../assets/main-bg.png")} style={styles.splash}>
      <SafeAreaView style={styles.container}>
          <ScrollView>
            {/* <View style={{height: 80, margin: 14}}>
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.dawn, borderRadius: 20, padding: 15}}>
                    <View style={{backgroundColor: COLORS.primary, width: 45, height: 45, borderRadius: 50, padding: 8, marginTop: 3, marginRight: 10}}>
                        <GmIcon name="key" size={30} color="#00FF00" />
                    </View>
                    <View style={{marginRight: 'auto'}}>
                        <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Ignição Ligado</Text>
                        <Text style={{fontSize: 15, fontWeight: '600', color: COLORS.primary}}>Toyota Hilux</Text>
                    </View>
                    <View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{marginTop: 8, marginRight: 3}}>
                          <Text style={{fontSize: 13, fontWeight: '700', color: 'white'}}>28/05/2024</Text>
                          <Text style={{fontSize: 10, fontWeight: '600', color: COLORS.primary}}>18h 29m 50s</Text>
                        </View>
                        <View style={{backgroundColor: COLORS.primary, width: 40, height: 40, borderRadius: 10, padding: 8, marginTop: 5}}>
                            <GmIcon name="arrow-right" size={25} color={COLORS.dawn} />
                        </View>
                      </View>
                    </View>
                </TouchableOpacity>
            </View> */}
                {alarms.map((item)=>{
                    return <View style={{height: 80, margin: 14}}>
                      <TouchableOpacity style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.black, borderRadius: 20, padding: 15}}>
                          <View style={{backgroundColor: COLORS.grey, width: 45, height: 45, borderRadius: 50, padding: 8, marginTop: 3, marginRight: 10}}>
                            {item?.type == 'Motor desligado' &&
                              <GmIcon name="key" size={30} color="#E03F3F" />
                            }
                            {item?.type == 'Motor ligado' &&
                              <GmIcon name="key" size={30} color="#00FF00" />
                            }
                          </View>
                          <View style={{marginRight: 'auto'}}>
                              <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>{item?.type}</Text>
                              <Text style={{fontSize: 15, fontWeight: '600', color: '#7C7A80'}}>{item?.device.devicename.substring(0, 17)} {item?.device.devicename.length > 17 && '...'}</Text>
                          </View>
                          <View>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                              <View style={{marginTop: 8, marginRight: 3}}>
                                <Text style={{fontSize: 13, fontWeight: '700', color: '#7C7A80'}}>{item?.gps_time.split(' ')[0]}</Text>
                                <Text style={{fontSize: 13, fontWeight: '700', color: '#7C7A80'}}>{item?.gps_time.split(' ')[1]}</Text>
                                {/* <Text style={{fontSize: 10, fontWeight: '600', color: '#7C7A80'}}>18h 29m 50s</Text> */}
                              </View>
                              <View style={{backgroundColor: COLORS.grey, width: 40, height: 40, borderRadius: 10, padding: 8, marginTop: 5}}>
                                  <GmIcon name="arrow-right" size={25} color={COLORS.day} />
                              </View>
                            </View>
                          </View>
                      </TouchableOpacity>
                  </View>
                })}

            

              {/* <ListGroup>
                {alarms.map((item)=>{
                    return <ListButton key={item.id} title={item.device.devicename} subtitle={item.type} time={item.created_at} icon="radio-button-on" iconColor="orange" onPress={()=>navigation.push('Alarme', { alarm: item })}></ListButton>
                })}
              </ListGroup> */}
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
        marginTop: 3,
        fontSize: 20,
        color: 'orange'
    },
    title: {
        fontSize: 17,
        marginTop: 2,
    },
});

export default Alarms;