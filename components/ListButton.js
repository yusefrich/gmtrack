import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-ionicons';

const ListButton = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const ionIcon = props.ion_icon || props.icon;
    const customIcon = props.custom_icon;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;

    return (
        <TouchableOpacity style={styles.itemSuccess} activeOpacity={0.85} onPress={props.onPress}>
            <View style={styles.backgroundSuccess}></View>
            <View style={styles.itemTitle}>
                <View style={props.subtitle ? {paddingTop: 10, backgroundColor: '#39CC59', borderRadius: 75, height: 75, width: 75, padding: 10, margin: 19} : {}}>
                    <Image source={require('../assets/carroprofile.png')} style={[{width: 50, height: 50, resizeMode: 'contain'}, { tintColor: 'white' }]} />
                </View>
                <View>
                    <Text style={styles.title}>{props.title.substring(0, 15)} {props.title.length > 15 && '...'}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.subtitle}>{props.subtitle}</Text>
                        <Text style={styles.time}>{props.time}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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
        borderWidth: 2,
    },
    backgroundSuccess: {
        backgroundColor: '#39CC59',
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
        flexDirection: 'row'
    },
    titleIcon: {
        fontSize: 20,
        marginTop: 5,
        marginEnd: 9,
    },
    title: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 30,
    },
    subtitle: {
        color: '#39CC59',
        fontSize: 12,
        marginTop: 2,
    },
    time: {
        color: 'white',
        fontSize: 12,
        marginTop: 2,
    },
})
export default ListButton
