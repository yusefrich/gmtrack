import {BASE_URL} from '@env'

const api = {
    async login (payload) {
        let [data, err] = await fetch("https://gmtrack.azael.tech/api/auth/login", {
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
                            .then(
                                async (result) => {
                                    return [result, null]
                                },
                                (error) => {
                                    return [null, error]
                                })
        return [data, err];
    },
    async update (payload) {
        let [data, err] = await fetch("https://gmtrack.azael.tech/api/auth/update", {
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
                            .then((response) => response.json())
                            .then(
                                async (result) => {
                                    return [result, null]
                                },
                                (error) => {
                                    return [null, error]
                                })
        return [data, err];
    },
    async informatives (payload) {
        let [data, err] = await fetch("https://gmtrack.azael.tech/api/informatives", {
                                headers: {
                                    Authorization: 'Bearer ' + payload.token,
                                }
                            })
                            .then((response) => response.json())
                            .then(
                                async (result) => {
                                    return [result, null]
                                },
                                (error) => {
                                    return [null, error]
                                })
        return [data, err];
    },
    async track (payload) {
        let [data, err] = await fetch("https://gmtrack.azael.tech/api/user/track", {
                                headers: {
                                    Authorization: 'Bearer ' + payload.token,
                                }
                            })
                            .then((response) => response.json())
                            .then(
                                async (result) => {
                                    return [result, null]
                                },
                                (error) => {
                                    return [null, error]
                                })
        return [data, err];
    },
    async alarms (payload) {
        let [data, err] = await fetch("https://gmtrack.azael.tech/api/user/alarms", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    Authorization: 'Bearer ' + payload.token,
                                },
                                body: JSON.stringify({}),
                            })
                            .then((response) => response.json())
                            .then(
                                async (result) => {
                                    return [result, null]
                                },
                                (error) => {
                                    return [null, error]
                                })
        return [data, err];
    },
    async alarmsRange (payload) {
        let [data, err] = await fetch("https://gmtrack.azael.tech/api/user/alarms/api", {
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
                            .then((response) => response.json())
                            .then(
                                async (result) => {
                                    return [result, null]
                                },
                                (error) => {
                                    return [null, error]
                                })
        return [data, err];
    },
    async playback (payload) {
        let [data, err] = await fetch("https://gmtrack.azael.tech/api/user/playback", {
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
                            .then((response) => response.json())
                            .then(
                                async (result) => {
                                    return [result, null]
                                },
                                (error) => {
                                    return [null, error]
                                })
        return [data, err];
    },

}
export default api;
