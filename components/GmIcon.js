import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'

const GmIcon = (props) => {
    const iconName = props.name;
    const size = props.size;
    const color = props.color;
    const acc = props.acc;
    const speed = props.speed;

    return (
        <>
            {iconName === 'traffic' &&
                <Image source={require('../assets/icons/traffic-light-solid.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'map' &&
                <Image source={require('../assets/icons/clone-regular.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'text' &&
                <Image source={require('../assets/icons/text.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'poi' &&
                <Image source={require('../assets/icons/poi.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'arrow-left' &&
                <Image source={require('../assets/icons/chevron-left-solid.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'arrow-right' &&
                <Image source={require('../assets/icons/chevron-right-solid.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'rotate' &&
                <Image source={require('../assets/icons/rotate-solid.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'loc' &&
                <Image source={require('../assets/icons/location-arrow-solid.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'street' &&
                <Image source={require('../assets/icons/street-view-solid.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'fence' &&
                <Image source={require('../assets/icons/xmarks-lines-solid.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'terminal' &&
                <Image source={require('../assets/icons/terminal-solid.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'carro' && acc === 0 &&
                <Image source={require('../assets/carroparado.png')} style={[{width: size, height: size, resizeMode: 'contain'}]} />
            }
            {iconName === 'carro' && acc === 1 && speed <= 0 &&
                <Image source={require('../assets/carroosioso.png')} style={[{width: size, height: size, resizeMode: 'contain'}]} />
            }
            {iconName === 'carro' && acc === 1 && speed > 0 &&
                <Image source={require('../assets/carroandando.png')} style={[{width: size, height: size, resizeMode: 'contain'}]} />
            }
            {iconName === 'carro' && (acc === -1 || acc === null || speed === null) &&
                <Image source={require('../assets/carrooff.png')} style={[{width: size, height: size, resizeMode: 'contain'}]} />
            }
        </>
    )
}

export default GmIcon
