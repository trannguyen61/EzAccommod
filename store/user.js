import ResponseHelper from '@/helpers/ResponseHelper'
import CustomError from '@/helpers/CustomError'
import Vue from 'vue'

export const state = () => ({
  access_token: null,
  user: null,
  notif: []
})

export const getters = {
  access_token(state) {
    return state.access_token
  },

  loggedIn(state) {
    return !!state.access_token
  },

  user(state) {
    return state.user
  },

  isOwner(state) {
    return state.user && state.user.role == 'owner'
  },

  isRenter(state) {
    return state.user && state.user.role == 'renter'
  },

  userName(state) {
    return state.user ? `${state.user.lastName} ${state.user.firstName}` : null
  },

  userFavoriteRooms (state) {
    return state.user ? state.user.favoriteRoom : []
  }
}

export const mutations = {
  setAccessToken (state, access_token) {
    if (!access_token) {
      localStorage.removeItem('access_token')
      state.access_token = null
    } else {
      localStorage.setItem('access_token', access_token)
      state.access_token = access_token  
    }
  },

  setUser (state, user) {
    if (!user) {
      localStorage.removeItem('user')
      state.user = null
    } else {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user  
    }
  },

  spliceFavRoom (state, index) {
    state.user.favoriteRoom.splice(index, 1)
    localStorage.setItem('user', JSON.stringify(state.user))
  },

  addFavRoom (state, room) {
    state.user.favoriteRoom = state.user.favoriteRoom.concat(room)
    localStorage.setItem('user', JSON.stringify(state.user))
  }
}

export const actions = {
    async signup({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.signup(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
          const { token, user } = response.getData()
          if (!user.authenticated) {
            Vue.notify({
              type: 'success',
              title: 'Đăng ký thành công. Vui lòng liên hệ công ty để xác thực tài khoản.',
            })
            return
          }
          commit('setAccessToken', token)
          commit('setUser', user)
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Đăng ký thất bại", errorMessage)
        }
      }

      await handler.setOnRequest(onRequest).execute()
    },

    async login({ commit, state }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.login(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
          const { token, user } = response.getData()

          if (user.role != 'renter' && user.role != 'owner') {
            throw new CustomError("Đăng nhập thất bại", 'Vui lòng đăng nhập bằng tài khoản người dùng/người cho thuê.')
          }
          if (user.role == 'owner' && !user.authenticated) {
            throw new CustomError("Đăng nhập thất bại", 'Vui lòng liên hệ công ty để xác thực tài khoản.')            
          }

          commit('setAccessToken', token)
          commit('setUser', user)
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Đăng nhập thất bại", errorMessage)
        }
      }
      await handler.setOnRequest(onRequest).execute()
    },

    async loginWithFacebook({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.loginWithFacebook(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
          const { token, user } = response.getData()

          if (user.role != 'renter' && user.role != 'owner') {
            throw new CustomError("Đăng nhập thất bại", 'Vui lòng đăng nhập bằng tài khoản người dùng/người cho thuê.')
          }

          commit('setAccessToken', token)
          commit('setUser', user)
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Đăng nhập thất bại", errorMessage)
        }
      }
      await handler.setOnRequest(onRequest).execute()
    },

    async fetchUser({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.getUserProfile()
        const response = new ResponseHelper(rawData)
        
        if (response.isSuccess()) {
          commit('setUser', response.getData())
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Lấy thông tin người dùng thất bại", errorMessage)
        }  
      }
      await handler.setOnRequest(onRequest).execute()
    },

    async getNotif({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$userServices.getNotif()
        const response = new ResponseHelper(rawData)
        
        if (response.isSuccess()) {
          commit('setNotif', response.getData())
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Lấy thông báo người dùng thất bại", errorMessage)
        }  
      }
      await handler.setOnRequest(onRequest).execute()
    },

    async logout ({commit}) {
      commit('setAccessToken', null)
      commit('setUser', null)
      Vue.notify({
        type: 'success',
        title: 'Đăng xuất thành công',
      })
    }
}

