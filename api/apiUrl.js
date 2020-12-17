/*
* BASE URLS
*/
export const BASE_URL = 'https://easy-accomod-api.herokuapp.com/api'

/*
*   USER SERVICES
*/
export const API_USER = '/user'
export const API_SIGNUP = API_USER + '/register'
export const API_LOGIN = API_USER + '/login'
export const API_LOGOUT = API_USER + '/logout'

/*
* ROOM SERVICES
*/
export const API_ROOM_SERVICE = '/post'
export const API_GET_ROOM_LIST = API_ROOM_SERVICE
export const API_CREATE_POST = API_ROOM_SERVICE + '/new-post'