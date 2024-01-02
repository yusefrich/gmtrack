import { View, Text, Pressable, Image, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
// import type {PropsWithChildren} from 'react';
// import { LinearGradient } from "expo-linear-gradient";
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = (props) => {

    return (
            <LinearGradient
                style={{
                    flex: 1
                }}
                colors={[COLORS.primary, COLORS.secondary]}
            >
                <View style={{ flex: 1 }}>
                    <View>
                        {/* <Image
                            source={require("../assets/hero1.jpg")}
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 20,
                                position: "absolute",
                                top: 10,
                                transform: [
                                    { translateX: 20 },
                                    { translateY: 50 },
                                    { rotate: "-15deg" }
                                ]
                            }}
                        /> */}

                        {/* <Image
                            source={require("../assets/hero3.jpg")}
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 20,
                                position: "absolute",
                                top: -30,
                                left: 100,
                                transform: [
                                    { translateX: 50 },
                                    { translateY: 50 },
                                    { rotate: "-5deg" }
                                ]
                            }}
                        /> */}

                        {/* <Image
                            source={require("../assets/hero3.jpg")}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 20,
                                position: "absolute",
                                top: 130,
                                left: -50,
                                transform: [
                                    { translateX: 50 },
                                    { translateY: 50 },
                                    { rotate: "15deg" }
                                ]
                            }}
                        /> */}

                        {/* <Image
                            source={require("../assets/hero2.jpg")}
                            style={{
                                height: 200,
                                width: 200,
                                borderRadius: 20,
                                position: "absolute",
                                top: 110,
                                left: 100,
                                transform: [
                                    { translateX: 50 },
                                    { translateY: 50 },
                                    { rotate: "-15deg" }
                                ]
                            }}
                        /> */}
                    </View>

                    {/* content  */}

                    <View style={{
                        paddingHorizontal: 22,
                        position: "absolute",
                        top: 200,
                        width: "100%"
                    }}>
                        <Text style={{
                            fontSize: 50,
                            fontWeight: 'bold',
                            color: COLORS.white
                        }}>Vamos começar</Text>
                        {/* <Text style={{
                            fontSize: 46,
                            fontWeight: 'bold',
                            color: COLORS.white
                        }}>Started</Text> */}

                        <View style={{ marginVertical: 22 }}>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.white,
                                marginVertical: 4
                            }}>Usando a gmtrack você fica cada vez mais</Text>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.white,
                            }}>Seguro, e confortavel</Text>
                        </View>

                        <Button
                            title="Iniciar"
                            onPress={props.onLogin}
                            style={{
                                marginTop: 22,
                                width: "100%"
                            }}
                        />

                        {/* <View style={{
                            flexDirection: "row",
                            marginTop: 12,
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.white
                            }}>Não tem uma conta ?</Text>
                            <Pressable
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: COLORS.white,
                                    fontWeight: "bold",
                                    marginLeft: 4
                                }}>Cadastre-se</Text>
                            </Pressable>

                        </View> */}
                    </View>
                </View>
            </LinearGradient>
    )
}

export default Welcome
