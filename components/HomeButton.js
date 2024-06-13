import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-ionicons';

const HomeButton = (props) => {
    const iconName = props.icon;
    const customIcon = props.custom_icon;
    const title = props.title;
    const active = props.active;
    const subTitle = props.subTitle;
    const block = props.block;

    return (
        <TouchableOpacity onPress={props.onPress} style={block ? {flex: 1, flexDirection: 'row', marginBottom: 10} : {}}>
          <View style={[styles.blockButton, active ? styles.bgdawn : styles.bgtint]}>
            <View style={[styles.buttonContent, active ? {backgroundColor: COLORS.primary} : {backgroundColor: COLORS.grey}]}>
              {/* <Text style={styles.title}>*</Text> */}
              {!customIcon &&
                <Icon name={iconName} color={active ? COLORS.primary : COLORS.white} />
              }
              {customIcon}
              {/* {white && 
                <Text style={styles.buttonTitle}>{title}</Text>
              } */}
            </View>
          </View>
          {!title && <View style={{width: 80}}></View>}
          {!block &&
            <View style={{alignItems: 'center'}}>
              {subTitle && 
                <Text style={{color: COLORS.white, fontSize: 12, maxWidth: 85, textAlign: 'center'}}>{subTitle}</Text>
              }
              {title &&
                <Text style={styles.buttonTitle}>{title}</Text>
              }
            </View>
          }
          {block &&
            <View style={{alignItems: 'center'}}>
              {title &&
                <Text style={styles.buttonTitleBlock}>{title}</Text>
              }
            </View>
          }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.white,
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
export default HomeButton
