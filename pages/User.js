import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import Icon from 'react-native-ionicons'
import ListGroup from '../components/ListGroup';
import ListButton from '../components/ListButton';
import COLORS from '../constants/colors';
import GmIcon from '../components/GmIcon';
import { useNavigation } from '@react-navigation/native';

const Item = ({title, icon}) => (
  <TouchableOpacity style={styles.item} activeOpacity={0.85}>
    <View style={styles.itemTitle}>
        {/* <Text style={styles.title}>*</Text> */}
        <Icon style={styles.titleIcon} name={icon} />
        <Text style={styles.title}>{title}</Text>
    </View>
    <Icon style={{ fontSize: 20, marginTop: 5 }} name="arrow-dropright" />
  </TouchableOpacity>
);
const colorBg = COLORS.primary.replace('#', '')
export default UserProfileView = ({userData, onExit}) => {

const navigation = useNavigation();
return (
    <ImageBackground source={require("../assets/main-bg.png")} style={styles.splash}>
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.header}>
                <View style={{flex: 1, flexDirection: 'row', padding: 10, paddingTop: 20, paddingBottom: 20}}>
                {/* <Image
                    style={styles.avatar}
                    source={{ uri: 'https://ui-avatars.com/api/?color=FFFFFF&background=' + colorBg + '&name=' + userData.client.Nome }}
                /> */}
                    <View style={{backgroundColor: COLORS.grey, width: 60, height: 60,borderRadius: 60, padding: 15, marginRight: 10}}>
                        <GmIcon name="eu" size={30} color={COLORS.day} />
                    </View>
                    <View style={{paddingTop: 5}}>
                        <Text style={styles.name}>{userData.client.Nome.substring(0, 20)} {userData.client.Nome.length > 20 && '...'}</Text>
                        <Text style={styles.cpf}>{userData.client.CGCCPF}</Text>
                    </View>

                {/* <Text style={styles.userInfo}>{userData.client.Fantasia}</Text> */}
                {/* <Text style={styles.userInfo}>Paraíba </Text> */}
                </View>
            </View>

            <View style={{height: 80, margin: 14}}>
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.dawn, borderRadius: 20, padding: 15}}>
                    <View style={{backgroundColor: COLORS.primary, width: 45, height: 45, borderRadius: 50, padding: 8, marginTop: 3, marginRight: 10}}>
                        <GmIcon name="eu" size={30} color={COLORS.dawn} />
                    </View>
                    <View style={{marginRight: 'auto'}}>
                        <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Meus dados</Text>
                        <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>Visualize</Text>
                    </View>
                    <View style={{backgroundColor: COLORS.primary, width: 40, height: 40, borderRadius: 10, padding: 8, marginTop: 5}}>
                        <GmIcon name="arrow-right" size={25} color={COLORS.dawn} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{height: 80, margin: 14}}>
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.black, borderRadius: 20, padding: 15}}>
                    <View style={{backgroundColor: COLORS.grey, width: 45, height: 45, borderRadius: 50, padding: 8, marginTop: 3, marginRight: 10}}>
                        <GmIcon name="eu" size={30} color={COLORS.day} />
                    </View>
                    <View style={{marginRight: 'auto'}}>
                        <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Minhas Notificações</Text>
                        <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>Visualize</Text>
                    </View>
                    <View style={{backgroundColor: COLORS.grey, width: 40, height: 40, borderRadius: 10, padding: 8, marginTop: 5}}>
                        <GmIcon name="arrow-right" size={25} color={COLORS.day} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{height: 80, margin: 14}}>
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.black, borderRadius: 20, padding: 15}}>
                    <View style={{backgroundColor: COLORS.grey, width: 45, height: 45, borderRadius: 50, padding: 8, marginTop: 3, marginRight: 10}}>
                        <GmIcon name="eu" size={30} color={COLORS.day} />
                    </View>
                    <View style={{marginRight: 'auto'}}>
                        <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Meu Contrato</Text>
                        <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>Visualize</Text>
                    </View>
                    <View style={{backgroundColor: COLORS.grey, width: 40, height: 40, borderRadius: 10, padding: 8, marginTop: 5}}>
                        <GmIcon name="arrow-right" size={25} color={COLORS.day} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{height: 80, margin: 14}}>
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.black, borderRadius: 20, padding: 15}} onPress={()=>navigation.push('Login')}>
                    <View style={{backgroundColor: COLORS.grey, width: 45, height: 45, borderRadius: 50, padding: 8, marginTop: 3, marginRight: 10}}>
                        <GmIcon name="eu" size={30} color={COLORS.day} />
                    </View>
                    <View style={{marginRight: 'auto'}}>
                        <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Sair</Text>
                        <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>Entrar com um novo usuario.</Text>
                    </View>
                    <View style={{backgroundColor: COLORS.grey, width: 40, height: 40, borderRadius: 10, padding: 8, marginTop: 5}}>
                        <GmIcon name="arrow-right" size={25} color={COLORS.day} />
                    </View>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.body}>
                <ListGroup>
                    <ListButton title='Mensagem' icon="mail"></ListButton>
                </ListGroup>
                <ListGroup>
                    <ListButton title='Relatorios gerados' icon="stats"></ListButton>
                    <ListButton title='Programar para relatório' icon="list-box"></ListButton>
                    <ListButton title='Cerca' icon="analytics"></ListButton>
                    <ListButton title='POI' icon="locate"></ListButton>
                </ListGroup>
                <ListGroup>
                    <ListButton title='Geral' icon="cog"></ListButton>
                </ListGroup>
                <ListGroup>
                    <ListButton title='Sair' icon="exit" onPress={onExit}></ListButton>
                </ListGroup>
            </View> */}
            </View>
        </ScrollView>
    </ImageBackground>
)}

const styles = StyleSheet.create({
    splash: {
        backgroundColor: COLORS.night,
        height: '100%'
    },
    itemGroup: {
        width: '96%',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#333',
        marginVertical: 10,
    },
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
    header: {
        backgroundColor: COLORS.black,
    },
    headerContent: {
        padding: 10,
        alignItems: 'center',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: COLORS.grey,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        color: COLORS.white,
        fontWeight: '400',
    },
    cpf: {
        fontSize: 18,
        color: COLORS.day,
        fontWeight: '300',
    },
    userInfo: {
        fontSize: 16,
        color: COLORS.blue,
        fontWeight: '600',
    },
    body: {
        backgroundColor: '#eeeeee',
        alignItems: 'center',
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5,
    },
    iconContent: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: '#FFFFFF',
    },
})
