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
} from 'react-native';
import Icon from 'react-native-ionicons'
import ListGroup from '../components/ListGroup';
import ListButton from '../components/ListButton';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api'
import Toast from 'react-native-toast-message';


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
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <ListGroup>
              {alarms.map((item)=>{
                  return <ListButton key={item.id} title={item.device.devicename} subtitle={item.type} time={item.created_at} icon="radio-button-on" iconColor="orange" onPress={()=>navigation.push('Alarme', { alarm: item })}></ListButton>
              })}
              {/* <ListButton title='Mensagem teste' icon="radio-button-on" iconColor="orange"></ListButton> */}
            </ListGroup>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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