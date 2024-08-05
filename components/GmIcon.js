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
import Central from '../assets/icons/central.svg';
import Chat from '../assets/icons/chat.svg';
import Email from '../assets/icons/email.svg';
import Jobs from '../assets/icons/jobs.svg';
import Social from '../assets/icons/social.svg';
import Loading from '../assets/icons/loading.svg';
import Check from '../assets/icons/check.svg';
import CheckBig from '../assets/icons/checkbig.svg';
import MasterCard from '../assets/icons/mastercard.svg';
import CreditCard from '../assets/icons/creditcard.svg';
import Poi from '../assets/icons/poi.svg';
import ChevronUp from '../assets/icons/chevron-up.svg';
import ChevronDown from '../assets/icons/chevron-down.svg';
import Plus from '../assets/icons/plus.svg';
import Minus from '../assets/icons/minus.svg';
import Center from '../assets/icons/center.svg';
import TextIcon from '../assets/icons/text.svg';
import Refresh from '../assets/icons/refresh.svg';
import Traffic from '../assets/icons/traffic.svg';
import MapsIcon from '../assets/icons/maps.svg';
import Fence from '../assets/icons/fence.svg';
import Street from '../assets/icons/street.svg';
import Loc from '../assets/icons/loc.svg';
import Userdata from '../assets/icons/userdata.svg';
import Contract from '../assets/icons/contract.svg';
import Policy from '../assets/icons/policy.svg';
import Password from '../assets/icons/password.svg';
import Info from '../assets/icons/info.svg';
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';
import Tiktok from '../assets/icons/tiktok.svg';
import Youtube from '../assets/icons/youtube.svg';
import Gupy from '../assets/icons/gupy.svg';
import Linkedin from '../assets/icons/linkedin.svg';

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
            {iconName === 'facebook' &&
                <Facebook width={size} height={size} style={{color: color}} />
            }
            {iconName === 'instagram' &&
                <Instagram width={size} height={size} style={{color: color}} />
            }
            {iconName === 'tiktok' &&
                <Tiktok width={size} height={size} style={{color: color}} />
            }
            {iconName === 'youtube' &&
                <Youtube width={size} height={size} style={{color: color}} />
            }
            {iconName === 'gupy' &&
                <Gupy width={size} height={size} style={{color: color}} />
            }
            {iconName === 'linkedin' &&
                <Linkedin width={size} height={size} style={{color: color}} />
            }
            {iconName === 'policy' &&
                <Policy width={size} height={size} style={{color: color}} />
            }
            {iconName === 'info' &&
                <Info width={size} height={size} style={{color: color}} />
            }
            {iconName === 'password' &&
                <Password width={size} height={size} style={{color: color}} />
            }
            {iconName === 'userdata' &&
                <Userdata width={size} height={size} style={{color: color}} />
            }
            {iconName === 'contract' &&
                <Contract width={size} height={size} style={{color: color}} />
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
            {iconName === 'center' &&
                <Center width={size} height={size} style={{color: color}} />
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
            {iconName === 'check' &&
                <Check width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'check-big' &&
                <CheckBig width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'mastercard' &&
                <MasterCard width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'creditcard' &&
                <CreditCard width={size} height={size} style={{color: color}} />
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
            {iconName === 'central' &&
                <Central width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'chat' &&
                <Chat width={size} height={size} style={{color: color}} />
                // <Image source={require('../assets/icons/home.png')} style={[{width: size, height: size, resizeMode: 'contain'}, color ? { tintColor: color } : { tintColor: 'black' }]} />
            }
            {iconName === 'email' &&
                <Email width={size} height={size} style={{color: color}} />
            }
            {iconName === 'jobs' &&
                <Jobs width={size} height={size} style={{color: color}} />
            }
            {iconName === 'social' &&
                <Social width={size} height={size} style={{color: color}} />
            }
            {iconName === 'chevron-up' &&
                <ChevronUp width={size} height={size} style={{color: color}} />
            }
            {iconName === 'chevron-down' &&
                <ChevronDown width={size} height={size} style={{color: color}} />
            }
            {iconName === 'plus' &&
                <Plus width={size} height={size} style={{color: color}} />
            }
            {iconName === 'refresh' &&
                <Refresh width={size} height={size} style={{color: color}} />
            }
            {iconName === 'minus' &&
                <Minus width={size} height={size} style={{color: color}} />
            }
            {iconName === 'loading' &&
                <Loading width={size} height={size} style={{color: color}} />
            }
            {iconName === 'traffic' &&
                <Traffic width={size} height={size} style={{color: color}} />
            }
            {iconName === 'map' &&
                <MapsIcon width={size} height={size} style={{color: color}} />
            }
            {iconName === 'text' &&
                <TextIcon width={size} height={size} style={{color: color}} />
            }
            {iconName === 'poi' &&
                <Poi width={size} height={size} style={{color: color}} />
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
                <Loc width={size} height={size} style={{color: color}} />
            }
            {iconName === 'street' &&
                <Street width={size} height={size} style={{color: color}} />
            }
            {iconName === 'fence' &&
                <Fence width={size} height={size} style={{color: color}} />
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
