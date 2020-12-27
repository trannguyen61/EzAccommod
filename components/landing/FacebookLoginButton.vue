<template>
  <v-btn 
    id="fbSigninBtn" 
    data-onsuccess="onSignIn"
    block
    depressed
    color="#1778F2"
    style="border-radius: 10px;"
    class="my-4 py-6"
    @click="onClickLoginBtn"
  >
    <v-img
      :src="require('@/assets/images/logo/facebook_icon.png')"
      max-width="20px"
      class="mr-2"
    />
    <div style="color: white;">
      {{ $vuetify.breakpoint.mdAndUp ? 'Đăng nhập với Facebook' : 'Đăng nhập' }}
    </div>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'
import ApiHandler from '@/helpers/ApiHandler'

export default {
    methods: {
        ...mapActions({
            loginWithFacebook: 'user/loginWithFacebook',
            fetchUser: "user/fetchUser"
        }),

        async onClickLoginBtn() {
            if (!document.getElementById('facebook-jssdk')) {
                await this.loadFacebookSDK(document, "script", "facebook-jssdk")
                await this.initFacebook()
            } else {
                this.onFbLogin()
            }
        },

        async initFacebook() {
            const vm = this
            window.fbAsyncInit = async function() {
                window.FB.init({
                    appId: "1057098134724642",
                    cookie: true,
                    xfbml: true,
                    version: "v8.0"
                })
                await vm.onFbLogin()
            }
        },

        async onFbLogin () {
            const vm = this
            window.FB.login(async function(response) {
                if (response.authResponse) {
                    console.log(response)
                    const access_token = response.authResponse.accessToken
                    const user_id = response.authResponse.userID
                    await vm.handleLogin(vm, access_token)
                    // await vm.handleFetchUser(vm)
                }
            }, {scope: 'email,public_profile'})
        },

        async loadFacebookSDK(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0]
            if (d.getElementById(id)) {
                return
            }
            js = d.createElement(s)
            js.id = id
            js.src = "https://connect.facebook.net/en_US/sdk.js"
            fjs.parentNode.insertBefore(js, fjs)
        },

        async handleLogin(vm, access_token) {
            const data = new FormData()
            data.append('access_token', access_token)
                    
            const loginHandler = new ApiHandler().setData(data)
            await vm.loginWithFacebook(loginHandler)
        },

        async handleFetchUser(vm) {
            const handler = new ApiHandler().setOnResponse(() => {
                vm.$router.push('/app')
            })
            await vm.fetchUser(handler)
        }
    }
}
</script>

<style>

</style>