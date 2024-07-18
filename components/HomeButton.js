import { Text, TouchableOpacity, StyleSheet, View, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-ionicons';
import GmIcon from './GmIcon';

const HomeButton = (props) => {
    const [isPress, setIsPress] = useState(false);
    const iconName = props.icon;
    const customIcon = props.custom_icon;
    const title = props.title;
    const gmIcon = props.gm_icon;
    // const active = props.active;
    const subTitle = props.subTitle;
    const block = props.block;

    return (
        <TouchableHighlight onPress={props.onPress} underlayColor="transparent" onHideUnderlay={() => setIsPress(false)} onShowUnderlay={() => setIsPress(true)}>
          <View style={block ? {flex: 1, flexDirection: 'row', marginBottom: 10} : {}}>
            <View style={[styles.blockButton, isPress ? styles.bgdawn : styles.bgtint]}>
              <View style={[styles.buttonContent, isPress ? {backgroundColor: COLORS.primary} : {backgroundColor: COLORS.grey}]}>
                {/* <Text style={styles.title}>*</Text> */}
                {!customIcon && !gmIcon &&
                  <Icon name={iconName} color={isPress ? COLORS.primary : COLORS.white} />
                }
                {!customIcon && gmIcon &&
                  <GmIcon name={gmIcon} size={24} color={isPress ? COLORS.dawn : COLORS.day} />
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
                  <Text style={{color: props.color ? props.color : 'white', fontSize: 12, maxWidth: 85, textAlign: 'center'}}>{subTitle}</Text>
                }
                {title &&
                  <Text style={[styles.buttonTitle, {color: props.color ? props.color : 'white'}]}>{title}</Text>
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
          </View>
        </TouchableHighlight>
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
export default HomeButton
