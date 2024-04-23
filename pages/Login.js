import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
// import { Ionicons } from "@expo/vector-icons";
import Icon from 'react-native-ionicons'
import api from '../services/api'
import Button from '../components/Button';
import Toast from 'react-native-toast-message';

const Login = (props) => {
    // const Login = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);// 
    const [email, setEmail] = useState('desenvolvimentoapp');// 
    const [password, setPassword] = useState('desenvolvimento00');

    const submitLogin = async (payload) => {
        setLoading(true)
        const [data, err] = await api.login(payload)
        if (!data.token) {
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Login inválido'
            });
            return
        }
        // updating user with the fcm token to notification
        const [updateData, updateErr] = await api.update({token: data.token, tokenFcm: props.tokenFcm})
        console.log('update return -->', updateData)
        // fetching informatives, banners, etc...
        const [infoData, infoErr] = await api.informatives({token: data.token})
        console.log('informatives => ' + JSON.stringify(infoData));
        // login successfull
        props.submit({userData: data, token: data.token, carrousel: infoData.data})
        console.log('login => ' + JSON.stringify(data));
        setLoading(false)
        Toast.show({
            type: 'success',
            text1: 'Bem vindo!'
        });
        return
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22, alignItems: "center" }}>
                    <Image
                        style={{marginTop: 20, marginBottom: 40}}
                        source={require("../assets/logo.png")}
                    />
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.primary
                    }}>
                        Bem vindo !! 👋
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.white
                    }}>Olá, sentimos sua falta, entre aqui com seus dados!</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: COLORS.white,
                        marginVertical: 8
                    }}>Usuário</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.grey,
                        backgroundColor: COLORS.grey,
                        elevation: 2,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Insira seu usuário'
                            placeholderTextColor={COLORS.tertiary}
                            onChangeText={newText => setEmail(newText)}
                            defaultValue={email}
                            keyboardType='email-address'
                            style={{
                                width: "100%",
                                color: COLORS.white
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: COLORS.white,
                        marginVertical: 8
                    }}>Senha</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.grey,
                        backgroundColor: COLORS.grey,
                        borderWidth: 1,
                        elevation: 2,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Insira sua senha'
                            placeholderTextColor={COLORS.secondary}
                            onChangeText={newText => setPassword(newText)}
                            defaultValue={password}
                            secureTextEntry={!isPasswordShown}
                            style={{
                                width: "100%",
                                color: COLORS.white
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Icon name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Icon name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <CheckBox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>Remenber Me</Text>
                </View> */}
                {!loading && 
                    <Button
                        onPress={() => submitLogin({email: email, password: password})}
                        title="Login"
                        textColor={COLORS.black}
                        filled
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                        }}
                    />
                }
                {loading && 
                    <Button
                        title="Entrando..."
                        textColor={COLORS.black}
                        filled
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                            opacity: .2 
                        }}
                    />
                }
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    {/* <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable
                        // onPress={() => navigation.navigate("Signup")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable> */}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login