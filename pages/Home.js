/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
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
import HomeButton from '../components/HomeButton';

function Home(params) {
  const width = Dimensions.get('window').width;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{borderRadius: 10, marginBottom: 10}}>
          <Carousel
              loop
              width={width - 30}
              height={(width / 1.5) - 10}
              autoPlay={true}
              data={params.carrousel}
              scrollAnimationDuration={1000}
              mode={'vertical-stack'}
              pagingEnabled={true}
              modeConfig={{
                snapDirection: 'left',
                stackInterval: 8,
              }}
              // onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={({ item }) => (
                  <View
                      style={{
                          flex: 1,
                          justifyContent: 'center',
                      }}
                  >
                    <Image
                      style={{width: width - 30, height: 300 - 25, resizeMode: 'contain', borderRadius: 30}}
                      source={{
                        uri: item.img,
                      }}
                    />
                  </View>
              )}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
        </View>
        <View style={styles.row}>
          <HomeButton icon="cash" title="Financeiro" />
          <HomeButton icon="list" subTitle="Minhas" title="Solicitações" />
          <HomeButton icon="cellular" title="Conexão" />
          <HomeButton icon="unlock" subTitle="Desbloqueio por" title="Confiança" />
        </View>
        <View style={styles.row}>
          <HomeButton icon="paper" title="Notícias" />
          <HomeButton icon="contacts" title="Contato" />
          <HomeButton icon="copy" title="Assinaturas" />
          <HomeButton />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Atalhos</Text>
        </View>
        <View style={styles.row}>
          <HomeButton icon="chatboxes" title="Chat" />
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: COLORS.white,
    flex: 1
  },
  sectionContainer: {
    paddingBottom: 10,
    paddingStart: 10
  },
  sectionTitle: {
    fontWeight: '600',
    color: COLORS.tertiary,
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
