import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-ionicons'
import ListGroup from '../components/ListGroup';
import ListButton from '../components/ListButton';

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

export default UserProfileView = ({userData, onExit}) => {

  return (
    <ScrollView>
        <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerContent}>
            <Image
                style={styles.avatar}
                source={{ uri: 'https://ui-avatars.com/api/?name=' + userData.client.username }}
            />

            <Text style={styles.name}>{userData.client.username}</Text>
            <Text style={styles.userInfo}>{userData.client.account}</Text>
            {/* <Text style={styles.userInfo}>Paraíba </Text> */}
            </View>
        </View>

        <View style={styles.body}>
            {/* <View style={{marginBottom: 15}}></View> */}
            <ListGroup>
                <ListButton title='Mensagem' icon="mail"></ListButton>
            </ListGroup>
            {/* <View style={{marginBottom: 15}}></View> */}
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
        </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
        backgroundColor: '#DCDCDC',
    },
    headerContent: {
        padding: 10,
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: '#000000',
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: '#778899',
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
