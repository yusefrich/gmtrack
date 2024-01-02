import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-ionicons';

const ListGroup = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;

    return (
        <View style={styles.itemGroup}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    itemGroup: {
        width: '96%',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#333',
        marginVertical: 10
    }
})
export default ListGroup
