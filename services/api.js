import {BASE_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

const api = {
    async login (payload) {
        const [data, err] = await fetch(BASE_URL + "/auth/login", {
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
                            .then(function(response) {// first then()
                                console.log('response', response)
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(login failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                // console.log('response', response)
                                if (result.error) {
                                    return [null, result]
                                }
                                try {
                                    AsyncStorage.setItem('isLogged', 'yes');
                                } catch (e) {
                                    console.error('(login success) async storage cant be accessed erro: ', e)
                                    // saving error
                                }
                                return [result, null]
                            })
                            console.log('return')
        return [data, err];
    },
    async update (payload) {
        let [data, err] = await fetch(BASE_URL + "/auth/update", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    Authorization: 'Bearer ' + payload.token,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    fcm_token: payload.tokenFcm
                                }),
                            })
                            .then(function(response) {// first then()
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(update failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                if (result.error) {
                                    return [null, result]
                                }

                                return [result, null]
                            })
        return [data, err];
    },
    async informativesMain (payload) {
        let [data, err] = await fetch(BASE_URL + "/informatives/main", {
                                headers: {
                                    Authorization: 'Bearer ' + payload.token,
                                }
                            })
                            .then(function(response) {// first then()
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(informatives failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                if (result.error) {
                                    return [null, result]
                                }

                                return [result, null]
                            })
        return [data, err];
    },
    async informativesAction (payload) {
        let [data, err] = await fetch(BASE_URL + "/informatives/action", {
                                headers: {
                                    Authorization: 'Bearer ' + payload.token,
                                }
                            })
                            .then(function(response) {// first then()
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(informatives failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                if (result.error) {
                                    return [null, result]
                                }

                                return [result, null]
                            })
        return [data, err];
    },
    async informativesOffers (payload) {
        let [data, err] = await fetch(BASE_URL + "/informatives/offers", {
                                headers: {
                                    Authorization: 'Bearer ' + payload.token,
                                }
                            })
                            .then(function(response) {// first then()
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(informatives failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                if (result.error) {
                                    return [null, result]
                                }

                                return [result, null]
                            })
        return [data, err];
    },
    async bills (payload) {
        let [data, err] = await fetch(BASE_URL + "/user/bills", {
                                headers: {
                                    Authorization: 'Bearer ' + payload.token,
                                }
                            })
                            .then(function(response) {// first then()
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(bills failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                if (result.error) {
                                    return [null, result]
                                }

                                return [result, null]
                            })
        return [data, err];
    },
    async bill (payload) {
        let [data, err] = await fetch(BASE_URL + "/user/bill", {
                                headers: {
                                    Authorization: 'Bearer ' + payload.token,
                                }
                            })
                            .then(function(response) {// first then()
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(user failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                if (result.error) {
                                    return [null, result]
                                }

                                return [result, null]
                            })
        return [data, err];
    }, 
    async alarmsRange (payload) {
        let [data, err] = await fetch(BASE_URL + "/alarms/api", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    Authorization: 'Bearer ' + payload.token,
                                },
                                body: JSON.stringify({
                                    imei: payload.imei,
                                    start_date: payload.start_date,
                                    end_date: payload.end_date
                                }),
                            })
                            .then(function(response) {// first then()
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(alarmsRange failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                if (result.error) {
                                    return [null, result]
                                }

                                return [result, null]
                            })
        return [data, err];
    },
    async userDevices (payload) {
        if (!payload || !payload.token) {
            return [null, { message: 'Token nulo' }]
        }
        let [data, err] = await fetch(BASE_URL + "/user/devices", {
                                headers: {
                                    Authorization: 'Bearer ' + payload.token,
                                }
                            })
                            .then(function(response) {// first then()
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(userDevices failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                if (result.error) {
                                    return [null, result]
                                }

                                if (!Array.isArray(result.data)) {
                                    return [null, { message: 'Response data is not an array', result }]
                                }
                                return [result.data, null]
                            })
        return [data, err];
    },
    async userTrack (payload) {
        if (!payload || !payload.token) {
            return [null, { message: 'Token nulo' }]
        }
        let [data, err] = await fetch(BASE_URL + "/user/track", {
                                headers: {
                                    Authorization: 'Bearer ' + payload.token,
                                }
                            })
                            .then(function(response) {// first then()
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    console.log('setting logged to no')
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(userTrack failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                if (result.error) {
                                    return [null, result]
                                }
                                if (!Array.isArray(result.data)) {
                                    return [null, { message: 'Response data is not an array', result }]
                                }
                                return [result.data, null]
                            })
        return [data, err];
    },
    async alarms (payload) {
        let [data, err] = await fetch(BASE_URL + "/user/alarms", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    Authorization: 'Bearer ' + payload.token,
                                },
                                body: JSON.stringify({}),
                            })
                            .then(function(response) {// first then()
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(alarms failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                if (result.error) {
                                    return [null, result]
                                }

                                return [result, null]
                            })
        return [data, err];
    },
    async playback (payload) {
        let [data, err] = await fetch(BASE_URL + "/user/playback", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    Authorization: 'Bearer ' + payload.token,
                                },
                                body: JSON.stringify({
                                    imei: payload.imei,
                                    start_date: payload.start_date,
                                    end_date: payload.end_date
                                }),
                            })
                            .then(function(response) {// first then()
                                if(response.ok)
                                {
                                    return response.json();
                                }
                                if (response.status === 401) {
                                    // navigate the user to the login screen
                                    try {
                                        AsyncStorage.setItem('isLogged', 'no');
                                    } catch (e) {
                                        console.error('(playback failed) async storage cant be accessed erro: ', e)
                                        // saving error
                                    }
                                }
                                return { error: true, message: 'ERROR: ' + response.status, response };
                            })
                            .then(async (result) => {
                                if (result.error) {
                                    return [null, result]
                                }

                                return [result, null]
                            })
        return [data, err];
    },

}
export default api;
