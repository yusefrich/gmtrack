import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
// import { SvgUri } from 'react-native-svg';
import Bell from '../assets/icons/bell.svg';
import Marker from '../assets/icons/marker.svg';
import Hands from '../assets/icons/hands.svg';
import Wp from '../assets/icons/wp.svg';
import Boleto from '../assets/icons/boleto.svg';
import Monitor from '../assets/icons/monitor.svg';
import Selecionar from '../assets/icons/selecionar.svg';
import Home from '../assets/icons/home.svg';
import Cerca from '../assets/icons/cerca.svg';
import Compartilhar from '../assets/icons/compartilhar.svg';
import Historico from '../assets/icons/historico.svg';
import Pasta from '../assets/icons/pasta.svg';
import Sino from '../assets/icons/sino.svg';
import Warning from '../assets/icons/warning.svg';
import Paper from '../assets/icons/paper.svg';
import Dolar from '../assets/icons/dolar.svg';
import Suporte from '../assets/icons/suporte.svg';
import Eu from '../assets/icons/eu.svg';
import Card from '../assets/icons/card.svg';
import Pix from '../assets/icons/pix.svg';
import Key from '../assets/icons/key.svg';
import ChevronRight from '../assets/icons/chevron-right.svg';
import LoopPayment from '../assets/icons/loop-payment.svg';

const GmIcon = (props) => {
    const iconName = props.name;
    const size = props.size;
    const color = props.color;
    const acc = props.acc;
    const speed = props.speed;

    return (
        <>
            {iconName === 'chevron-rigth' &&
                <ChevronRight width={size} height={size} style={{color: color}} />
            }
            {iconName === 'warning' &&
                <Warning width={size} height={size} style={{color: color}} />
            }
            {iconName === 'loop-payment' &&
                <LoopPayment width={size} height={size} style={{color: color}} />
            }
            {iconName === 'paper' &&
                <Paper width={size} height={size} style={{color: color}} />
            }
            {iconName === 'alertas' &&
                <Bell width={size} height={size} style={{color: color}} />
            }
            {iconName === 'marker' &&
                <Marker width={size} height={size} style={{color: color}} />
            }
            {iconName === 'boleto' &&
                <Boleto width={size} height={size} style={{color: color}} />
            }
            {iconName === 'hands' &&
                <Hands width={size} height={size} style={{color: color}} />
            }
            {iconName === 'wp' &&
                <Wp width={size} height={size} style={{color: color}} />
            }
            {iconName === 'selecionar' &&
                <Selecionar width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/selecionar.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'monitor' &&
                <Monitor width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/monitor.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'home' &&
                <Home width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'cerca' &&
                <Cerca width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'compartilhar' &&
                <Compartilhar width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'historico' &&
                <Historico width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'pasta' &&
                <Pasta width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'sino' &&
                <Sino width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'dolar' &&
                <Dolar width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'eu' &&
                <Eu width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'suporte' &&
                <Suporte width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'card' &&
                <Card width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'pix' &&
                <Pix width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'key' &&
                <Key width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }

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
