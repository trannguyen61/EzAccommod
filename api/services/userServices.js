import {
    API_SIGNUP,
    API_LOGIN,
    API_LOGOUT
} from '@/api/apiUrl'

export default $axios => ({
    signup (payload) {
        return $axios.post(API_SIGNUP, payload)
    },

    login (payload) {
        return $axios.post(API_LOGIN, payload)
    },

    logout () {
        return $axios.get(API_LOGOUT)
    },

    getUserProfile (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    loginWithFacebook (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },
})


