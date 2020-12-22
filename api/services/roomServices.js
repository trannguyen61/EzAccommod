import {
    API_GET_ROOM_LIST,
    API_CREATE_POST
} from '@/api/apiUrl'

export default $axios => ({
    getRoomList () {
        return $axios.get(API_GET_ROOM_LIST)
    },

    filterRooms (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    favoriteRoom (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    reportRoom (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    getRoomDetail ({ post_id }) {
        return $axios.get(`${API_GET_ROOM_LIST}/${post_id}`)
    },

    submitReview (payload) {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    getReviews () {
        // return $axios.get(API_GET_ROOM_LIST)
    },
    
    getFavoriteRooms () {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    submitPost (payload) {
        return $axios.post(API_CREATE_POST, payload)
    },

    editPost () {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    getPostFee () {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    getPosts (query) {
        // return $axios.get(API_GET_ROOM_LIST, {
        //     params: query
        // })
    },

    toggleActivePost () {
        // return $axios.get(API_GET_ROOM_LIST)
    },

    prolongTimePost () {
        // return $axios.get(API_GET_ROOM_LIST)
    }
})
