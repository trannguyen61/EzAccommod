export default function ({ store, redirect, route }) {
    const loggedIn = store.getters['user/loggedIn']
    if (!loggedIn) {
        if (!route.path.match(/^\/auth/)) redirect('/auth/login')
    } else {
        if (route.path.match(/^\/auth/)) redirect('/')
    }
}