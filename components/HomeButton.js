import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-ionicons';

const HomeButton = (props) => {
    const iconName = props.icon;
    const title = props.title;
    const subTitle = props.subTitle;

    return (
        <TouchableOpacity>
            {title &&
                <View style={[styles.blockButton]}>
                    <View style={styles.buttonContent}>
                        {/* <Text style={styles.title}>*</Text> */}
                        <Icon name={iconName} color={COLORS.white} />
                    </View>
                </View>
            }
            {!title && <View style={{width: 80}}></View>}
            <View style={{alignItems: 'center'}}>
                {subTitle && 
                    <Text style={{color: COLORS.black, fontSize: 12}}>{subTitle}</Text>
                }
                <Text style={styles.buttonTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.black,
    lineHeight: 22,
  },
  buttonContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockButton: {
    width: 80,
    height: 80,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#333',
    backgroundColor: COLORS.grey,
    justifyContent: 'center',
    alignItems: 'center'
  },

})
export default HomeButton
