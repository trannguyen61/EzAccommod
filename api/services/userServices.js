import {
    API_SIGNUP,
    API_LOGIN,
    API_LOGIN_FACEBOOK
} from '@/api/apiUrl'

export default $axios => ({
    signup (payload) {
        return $axios.post(API_SIGNUP, payload)
    },

    login (payload) {
        return $axios.post(API_LOGIN, payload)
    },

    getUserProfile (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    loginWithFacebook (payload) {
        return $axios.post(API_LOGIN_FACEBOOK, payload)
    },
})


