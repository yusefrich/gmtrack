import { Text, TouchableOpacity, StyleSheet, View, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-ionicons';
import GmIcon from './GmIcon';

const GmInfo = (props) => {
    const title = props.title;
    const subTitle = props.subTitle;
    const text = props.text;

    return (
      <View style={{backgroundColor: COLORS.tint, padding: 20, marginRight: 20, marginBottom: 25, borderRadius: 20, borderLeftColor: COLORS.primary, borderLeftWidth: 20}}>
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
          <GmIcon name="warning" size={20} color={COLORS.primary} />
          <Text style={{color: 'white', fontWeight: '700', marginLeft: 5, fontSize: 15}}>{title}</Text>
        </View>
        <Text style={{color: 'white'}}>{text}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 15,
    fontWeight: '400',
    // color: COLORS.white,
    lineHeight: 22,
  },
  buttonTitleBlock: {
    fontSize: 21,
    fontWeight: '700',
    color: COLORS.white,
    lineHeight: 22,
    paddingTop: 30,
    paddingLeft: 10
  },
  buttonContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    // top: '50%',
    paddingTop: 15,
    width: 50,
    height: 50,
    borderRadius: 100
  },
  blockButton: {
    width: 85,
    height: 85,
    borderRadius: 10,
    // elevation: 5,
    shadowColor: '#333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bgdawn: {
    backgroundColor: COLORS.dawn
  },
  bgtint: {
    backgroundColor: COLORS.tint
  }

})
export default GmInfo
