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
              onSnapToItem={(index) => console.log('current index:', index)}
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
          <TouchableOpacity style={styles.blockButton}>
              <View style={styles.buttonContent}>
                  {/* <Text style={styles.title}>*</Text> */}
                  <Icon name="cash" color="#ecb800" />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.buttonTitle}>Financeiro</Text>
                  </View>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockButton}>
              <View style={styles.buttonContent}>
                  {/* <Text style={styles.title}>*</Text> */}
                  <Icon name="list" color="#ecb800"/>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{color:"#ecb800"}}>Minhas</Text>
                    <Text style={styles.buttonTitle}>Solicitações</Text>
                  </View>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockButton}>
              <View style={styles.buttonContent}>
                  {/* <Text style={styles.title}>*</Text> */}
                  <Icon name="cellular" color="#ecb800" />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.buttonTitle}>Conexão</Text>
                  </View>
              </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.blockButton}>
              <View style={styles.buttonContent}>
                  {/* <Text style={styles.title}>*</Text> */}
                  <Icon name="unlock" color="#ecb800" />
                  <View style={{alignItems: 'center'}}>
                    <Text style={{color:"#ecb800"}}>Desbloqueio por</Text>
                    <Text style={styles.buttonTitle}>Confiança</Text>
                  </View>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockButton}>
              <View style={styles.buttonContent}>
                  {/* <Text style={styles.title}>*</Text> */}
                  <Icon name="paper" color="#ecb800" />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.buttonTitle}>Notícias</Text>
                  </View>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockButton}>
              <View style={styles.buttonContent}>
                  {/* <Text style={styles.title}>*</Text> */}
                  <Icon name="contacts" color="#ecb800" />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.buttonTitle}>Contato</Text>
                  </View>
              </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.blockButton}>
              <View style={styles.buttonContent}>
                  {/* <Text style={styles.title}>*</Text> */}
                  <Icon name="copy" color="#ecb800" />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.buttonTitle}>Assinaturas</Text>
                  </View>
              </View>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Atalhos</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.blockButton}>
              <View style={styles.buttonContent}>
                  {/* <Text style={styles.title}>*</Text> */}
                  <Icon name="chatboxes" color="#ecb800" />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.buttonTitle}>Chat</Text>
                  </View>
              </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#585858',
    flex: 1
  },
  sectionContainer: {
    paddingBottom: 10,
    paddingStart: 10
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#ecb800',
    fontSize: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ecb800',
    lineHeight: 18,
  },
  buttonContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  blockButton: {
    width: 120,
    height: 100,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#333',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default Home;
