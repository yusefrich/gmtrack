import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-ionicons'

const Item = ({title, icon}) => (
  <TouchableOpacity style={styles.item}>
    <View style={styles.itemTitle}>
        {/* <Text style={styles.title}>*</Text> */}
        <Icon style={styles.titleIcon} name={icon} />
        <Text style={styles.title}>{title}</Text>
    </View>
    <Icon style={{ fontSize: 20 }} name="arrow-dropright" />
  </TouchableOpacity>
);

export default UserProfileView = (props) => {
  return (
    <ScrollView>
        <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerContent}>
            <Image
                style={styles.avatar}
                source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
            />

            <Text style={styles.name}>John Doe </Text>
            <Text style={styles.userInfo}>jhonnydoe@mail.com </Text>
            <Text style={styles.userInfo}>Paraíba </Text>
            </View>
        </View>

        <View style={styles.body}>
            <View style={{marginBottom: 15}}></View>
            <Item title='Mensagem' icon="mail" />
            <View style={{marginBottom: 15}}></View>
            <Item title='Relatorios gerados' icon="stats" />
            <Item title='Programar para relatório' icon="list-box" />
            <Item title='Cerca' icon="analytics" />
            <Item title='POI' icon="locate" />
            <View style={{marginBottom: 15}}></View>
            <Item title='Geral' icon="cog" />
            <View style={{marginBottom: 15}}></View>
            <TouchableOpacity style={styles.item} onPress={props.onExit}>
                <View style={styles.itemTitle}>
                    {/* <Text style={styles.title}>*</Text> */}
                    <Icon style={styles.titleIcon} name="exit" />
                    <Text style={styles.title}>Sair</Text>
                </View>
                <Icon style={{ fontSize: 20 }} name="arrow-dropright" />
            </TouchableOpacity>
        </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eeeeee',
        height: 40,
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 1,
        marginHorizontal: 5,
        padding: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: .2,
        },
    itemTitle: {
        flex: 1,
        flexDirection: 'row'
    },
    titleIcon: {
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
        backgroundColor: 'white',
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
