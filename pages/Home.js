/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function Home(params) {
  const width = Dimensions.get('window').width;
  return (
    <View style={{ flex: 1}}>
      <Carousel
          loop
          width={width}
          height={width / 1.5}
          autoPlay={true}
          data={params.carrousel}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ item }) => (
              <View
                  style={{
                      flex: 1,
                      borderWidth: 1,
                      justifyContent: 'center',
                  }}
              >
                <Image
                  style={{width: width, height: 300, resizeMode: 'cover'}}
                  source={{
                    uri: item.img,
                  }}
                />
                {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>
                    {data.item.url}
                </Text> */}
              </View>
          )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
