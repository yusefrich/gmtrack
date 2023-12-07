import React from 'react';
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

const Selecionar = () => {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <Item title='Seu carro' icon="car" />
            {/* <Item title='test 1' icon="radio-button-on" /> */}
            {/* <Item title='test 1' icon="radio-button-on" /> */}
            {/* <View style={{marginBottom: 15}}></View> */}
            {/* <Item title='test 1' icon="radio-button-on" /> */}
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    title: {
        fontSize: 17,
        marginTop: 2,
    },
});

export default Selecionar;