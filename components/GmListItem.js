import { Text, TouchableOpacity, StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-ionicons';
import GmButton from './GmButton';
import GmIcon from './GmIcon';

const GmListItem = (props) => {
    const [isPress, setIsPress] = useState(false);

    const iconName = props.iconName;
    const title = props.title;
    const subtitle = props.subtitle;

    return (
        <TouchableHighlight underlayColor="transparent" onHideUnderlay={() => setIsPress(false)} onShowUnderlay={() => setIsPress(true)} onPress={props.onPress}>
            <View style={{flexDirection: 'row', backgroundColor: isPress ? COLORS.dawn : '#222326', borderRadius: 20, padding: 15}}>
                <View style={{backgroundColor: isPress ? COLORS.primary : COLORS.grey, width: 45, height: 45, borderRadius: 50, padding: 10, marginTop: 3, marginRight: 10}}>
                    <GmIcon name={iconName} size={25} color={isPress ? COLORS.dawn : COLORS.day} />
                </View>
                <View style={{marginRight: 'auto'}}>
                    <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>{title}</Text>
                    <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>{subtitle}</Text>
                </View>
                <View style={{backgroundColor: isPress ? COLORS.primary : COLORS.grey, width: 40, height: 40, borderRadius: 10, padding: 8, marginTop: 5}}>
                    <GmIcon name="arrow-right" size={25} color={isPress ? COLORS.dawn : COLORS.day} />
                </View>
            </View>
        </TouchableHighlight>

    )
}

const styles = StyleSheet.create({
    itemSuccess: {
        height: 115,
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 0,
        borderColor: '#39CC59',
        borderRadius: 16,
        marginBottom: 22,
        borderWidth: 2
    },
    backgroundSuccess: {
        backgroundColor: '#39CC59',
        opacity: .2,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    backgroundOff: {
        backgroundColor: '#3E3F4A',
        opacity: .2,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    backgroundDanger: {
        backgroundColor: '#E03F3F',
        opacity: .2,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },

    itemNoti: {
        backgroundColor: '#ffffff',
        height: 60,
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 0,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1.5,
    },
    itemTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleIcon: {
        fontSize: 20,
        marginTop: 5,
        marginEnd: 9,
    },
    title: {
        color: COLORS.white,
        fontWeight: 'bold',
        // maxWidth: '100%',
        fontSize: 17,
        marginTop: 20,
    },
    subtitle: {
        color: '#39CC59',
        textAlign: 'right',
        fontSize: 12,
        marginTop: 2,
    },
    time: {
        color: 'white',
        textAlign: 'right',
        fontSize: 12,
        marginTop: 2,
    },
})
export default GmListItem
