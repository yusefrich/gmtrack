import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-ionicons';
import GmButton from './GmButton';
import GmIcon from './GmIcon';

const CarListButton = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const ionIcon = props.ion_icon || props.icon;
    const item = props.item;
    const customIcon = props.custom_icon;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;
    const getTime = () => {

    }

    return (
        <TouchableOpacity style={[styles.itemSuccess, item.accstatus <= 0 ? {borderColor: '#3E3F4A'} : +item?.speed > 80 ? {borderColor: '#E03F3F'} : {}]} activeOpacity={0.85} onPress={props.onPress}>
            <View style={item?.accstatus <= 0 ? styles.backgroundOff : +item?.speed > 80 ? styles.backgroundDanger : styles.backgroundSuccess}></View>
                <View style={styles.itemTitle}>
                    <View style={item?.accstatus <= 0 ? {paddingTop: 10, backgroundColor: '#3E3F4A', borderRadius: 75, height: 75, width: 75, padding: 10, margin: 15} : {paddingTop: 10, backgroundColor: '#39CC59', borderRadius: 75, height: 75, width: 75, padding: 10, margin: 19}}>
                        <Image source={require('../assets/carroprofile.png')} style={[{width: 50, height: 50, resizeMode: 'contain'}, { tintColor: 'white' }]} />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '46%'}}>
                        <View>
                            <Text style={styles.title}>{props.title}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.subtitle, item.accstatus <= 0 ? {color: '#7C7A80'} : +item?.speed > 80 ? {color: '#E0663F'} : {color: '#9DCC39'}]}>{props.subtitle}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingRight: 10}}>
                        <View style={{marginLeft: 30, marginTop: 20}}>
                            <GmButton onPress={props.onPress} solid custom_icon={<GmIcon name="chevron-rigth" size={24} color={COLORS.day} />}  />
                        </View>
                        <View style={{flexDirection: 'column', alignContent: 'flex-end'}}>
                            {item.accstatus <= 0 &&
                                <Text style={[styles.subtitle, {color: '#F3F4F6'}]}>
                                    Parado
                                </Text>
                            }
                            {item.accstatus == 1 && +item?.speed >= 80 &&
                                <Text style={[styles.subtitle, {color: '#E03F3F'}]}>
                                    Alta Velocidade
                                </Text>
                            }
                            {item.accstatus == 1 && +item?.speed < 80 &&
                                <Text style={[styles.subtitle, {color: '#39CC59'}]}>
                                    Em Movimento
                                </Text>
                            }
                            <Text style={styles.time}>{`${new Date(item.acctime * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]}`}</Text>
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
export default CarListButton
