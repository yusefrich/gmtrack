import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-ionicons';

const ListButton = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;

    return (
        <TouchableOpacity style={props.subtitle ? styles.itemNoti : styles.item} activeOpacity={0.85} onPress={props.onPress}>
            <View style={styles.itemTitle}>
                {/* <Text style={styles.title}>*</Text> */}
                <Icon style={[styles.titleIcon, {color: props.iconColor}]} name={props.icon} />
                <View>
                    <Text style={styles.title}>{props.title}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.subtitle}>{props.subtitle}</Text>
                        <Text style={styles.subtitle}>{props.time}</Text>
                    </View>
                </View>
            </View>
            {props.endicon &&
                <Icon style={{ fontSize: 20, marginTop: 5 }} name={props.endicon} />
            }
            {!props.endicon &&
                <Icon style={{ fontSize: 20, marginTop: 5 }} name="arrow-dropright" />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#ffffff',
        height: 40,
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 0,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1.5,
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
        fontSize: 17,
        marginTop: 2,
    },
    subtitle: {
        fontSize: 12,
        marginTop: 2,
    },
})
export default ListButton
