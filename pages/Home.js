/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Alert, ImageBackground, Linking, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { Text } from 'react-native';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-ionicons';
import Carousel from 'react-native-reanimated-carousel';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import HomeButton from '../components/HomeButton';
import GmIcon from '../components/GmIcon';
import GmButton from '../components/GmButton';

function Home(params) {
  const [main, setMain] = useState(params.carrousel?.main);
  const [action, setAction] = useState(params.carrousel?.action);
  const [offers, setOffers] = useState(params.carrousel?.offers);
  // setMain(params.carrousel?.main);
  // setAction(params.carrousel?.action);
  // setOffers(params.carrousel?.offers);

  const navigation = useNavigation();
  const width = Dimensions.get('window').width;

  const openUrl = async (url) => {
    // console.log('url ', url)
    await Linking.openURL(url);
  }

  return (
    <ImageBackground source={require("../assets/main-bg.png")} style={styles.splash}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View style={[styles.sectionContainer, {flex: 1, flexDirection: 'row'}]}>
            <Image
              style={{margin: 5}}
              source={require('../assets/icons/gmtrack.png')}
            />
            <View>
              <Text style={styles.headerTitle}>Olá</Text>
              <Text style={styles.headerTitle}>Gmtrack</Text>
            </View>
          </View>
          <GmButton custom_icon={<GmIcon name="alertas" size={24} color={COLORS.day} />}  />
        </View>
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          </View>
          <View style={styles.row}>
            <HomeButton active subTitle="Rastrear" custom_icon={<GmIcon name="marker" size={24} color={COLORS.dawn} />} onPress={()=>navigation.push('Second', { screen: 'Monitor' })}/>
            <HomeButton subTitle="Minhas faturas" custom_icon={<GmIcon name="boleto" size={24} color={COLORS.day} />} onPress={()=>navigation.push('Main' , { screen: 'Financeiro'})} />
            <HomeButton subTitle="Indique um amigo" custom_icon={<GmIcon name="hands" size={24} color={COLORS.day} />} />
            <HomeButton subTitle="Falar pelo 0800" custom_icon={<GmIcon name="wp" size={24} color={COLORS.day} />} />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Destaques</Text>
          </View>
          <View style={{borderRadius: 10, marginBottom: 10}}>
            <Carousel
                loop
                width={width * 0.85}
                height={(width / 2) - 10}
                autoPlay={true}
                style={{ width: "100%" }}
                data={main}
                scrollAnimationDuration={1000}
                // mode={'vertical-stack'}
                pagingEnabled={true}
                modeConfig={{
                  snapDirection: 'left',
                  stackInterval: 8,
                }}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            marginLeft: "2.5%",
                        }}
                        onPress={()=>openUrl(item.url)}
                    >
                      <Image
                        style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10}}
                        source={{
                          uri: item.img,
                        }}
                      />
                    </TouchableOpacity>
                )}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>GMTRACK em ação</Text>
          </View>
          <View style={{borderRadius: 10, marginBottom: 10}}>
            <Carousel
                loop
                width={width * 0.65}
                height={(width / 3) - 10}
                autoPlay={true}
                style={{ width: "100%" }}
                data={action}
                scrollAnimationDuration={1000}
                // mode={'vertical-stack'}
                pagingEnabled={true}
                modeConfig={{
                  snapDirection: 'left',
                  stackInterval: 8,
                }}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            marginLeft: "2.5%",
                            position: 'relative'
                        }}
                        onPress={()=>openUrl(item.url)}
                    >
                      <Image
                        style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10}}
                        source={{
                          uri: item.img,
                        }}
                      />
                      <Image
                        style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, resizeMode: 'cover', borderRadius: 10}}
                        source={require('../assets/overlay.png')}
                      />
                      {/* <View style={{position: 'absolute', top: '70%', left: 0, width: '100%', height: '30%'}}>
                        <Text style={{color: '#FFFFFF', paddingLeft: 10}}>Titulo</Text>
                      </View> */}
                    </TouchableOpacity>
                )}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Ofertas</Text>
          </View>
          <View style={{borderRadius: 10, marginBottom: 10}}>
            <Carousel
                loop
                width={width * 0.65}
                height={(width / 3) - 10}
                autoPlay={true}
                style={{ width: "100%" }}
                data={offers}
                scrollAnimationDuration={1000}
                // mode={'vertical-stack'}
                pagingEnabled={true}
                modeConfig={{
                  snapDirection: 'left',
                  stackInterval: 8,
                }}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            marginLeft: "2.5%",
                        }}
                        onPress={()=>openUrl(item.url)}
                    >
                      <Image
                        style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10}}
                        source={{
                          uri: item.img,
                        }}
                      />
                      <Image
                        style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, resizeMode: 'cover', borderRadius: 10}}
                        source={require('../assets/overlay.png')}
                      />
                    </TouchableOpacity>
                )}
            />
          </View>

          {/* <View style={styles.row}>
            <HomeButton icon="paper" title="Notícias" />
            <HomeButton icon="contacts" title="Contato" />
            <HomeButton icon="copy" title="Assinaturas" />
            <HomeButton />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Atalhos</Text>
          </View>
          <View style={styles.row}>
            <HomeButton icon="chatboxes" title="Chat" onPress={()=>navigation.push('Chat')}/>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Atalhos</Text>
          </View>
          <View style={styles.row}>
            <HomeButton icon="chatboxes" title="Chat" onPress={()=>navigation.push('Chat')}/>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Atalhos</Text>
          </View>
          <View style={styles.row}>
            <HomeButton icon="chatboxes" title="Chat" onPress={()=>navigation.push('Chat')}/>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Atalhos</Text>
          </View>
          <View style={styles.row}>
            <HomeButton icon="chatboxes" title="Chat" onPress={()=>navigation.push('Chat')}/>
          </View> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  splash: {
    backgroundColor: COLORS.night,
  },
  scrollContainer: {
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 17,
    lineHeight: 20,
    fontWeight: 'bold'
  },
  headerContainer: {
    padding: 24,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: COLORS.fog,
    padding: 15,
    paddingTop: 40,
    // minHeight: '100%',
    verticalAlign: 'baseline',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1
  },
  sectionContainer: {
    paddingBottom: 10,
    paddingStart: 10
  },
  sectionTitle: {
    fontWeight: '600',
    color: COLORS.white,
    fontSize: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  buttonTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.white,
    lineHeight: 22,
  },
  buttonContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockButton: {
    width: 80,
    height: 80,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#333',
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default Home;
