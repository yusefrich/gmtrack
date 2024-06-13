import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-ionicons';

const GmButton = (props) => {
    const iconName = props.icon;
    const customIcon = props.custom_icon;
    const title = props.title;
    const color = props.color;
    const solid = props.solid;
    // const white = props.white;
    const subTitle = props.subTitle;

    return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={[styles.blockButton, solid ? styles.bgSolid : styles.bgFog]}>
            <View style={styles.buttonContent}>
              {/* <Text style={styles.title}>*</Text> */}
              {!customIcon &&
                <Icon name={iconName} color={color} />
              }
              {customIcon}
              {title && 
                <Text style={styles.buttonTitle}>{title}</Text>
              }
            </View>
          </View>
          {/* {!title && <View style={{width: 80}}></View>} */}
          <View style={{alignItems: 'center'}}>
            {subTitle && 
              <Text style={{color: COLORS.black, fontSize: 12}}>{subTitle}</Text>
            }
            {title &&
              <Text style={styles.buttonTitle}>{title}</Text>
            }
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
  bgFog: {
    backgroundColor: '#3e3f4a33'
  },
  bgSolid: {
    backgroundColor: '#3E3F4A'
  },
  buttonContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockButton: {
    width: 50,
    height: 50,
    borderRadius: 10,
    // elevation: 5,
    // shadowColor: '#333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bgwhite: {
    backgroundColor: COLORS.pure
  },
  bgdark: {
    backgroundColor: COLORS.grey
  }

})
export default GmButton
