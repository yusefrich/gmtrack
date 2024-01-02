import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
// import { Ionicons } from "@expo/vector-icons";
import Icon from 'react-native-ionicons'
import Button from '../components/Button';
import Toast from 'react-native-toast-message';

const Login = (props) => {
    // const Login = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = (payload) => {
        // todo log in on service
        fetch("https://gmtrack.azael.tech/api/auth/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                account: payload.email,
                password: payload.password
            }),
        })
        .then((response) => response.json())
        .then((responseData) => {
            if (!responseData.token) {
                Toast.show({
                    type: 'error',
                    text1: 'Login inválido'
                });
                return
            }
            console.log('login => ' + JSON.stringify(responseData));
            Toast.show({
                type: 'success',
                text1: 'Bem vindo!'
            });
            fetch("https://gmtrack.azael.tech/api/informatives", {
                headers: {
                    Authorization: 'Bearer ' + responseData.token,
                },
            })
            .then((rresponse) => rresponse.json())
            .then((rresponseData) => {
                if (!Array.isArray(rresponseData.data)) {
                    Toast.show({
                        type: 'error',
                        text1: 'Erro ao buscar informativos'
                    });
                    return
                }
                console.log('informatives => ' + JSON.stringify(rresponseData));
                // setUserData(responseData)
                props.submit({userData: responseData, token: responseData.token, carrousel: rresponseData.data})
            })
        })
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
                        color: COLORS.primary,
                        marginVertical: 8
                    }}>Usuário</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Insira seu usuário'
                            placeholderTextColor={COLORS.secondary}
                            onChangeText={newText => setEmail(newText)}
                            defaultValue={email}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: COLORS.primary,
                        marginVertical: 8
                    }}>Senha</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
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
                                width: "100%"
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

                <Button
                    onPress={() => submitLogin({email: email, password: password})}
                    title="Login"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

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