import ResponseHelper from '@/helpers/responseHelper'
import CustomError from '@/helpers/CustomError'
import Vue from 'vue'

export const state = () => ({
  filter: null
})

export const getters = {
  filter (state) {
    return state.filter
  }
}

export const mutations = {
  setFilter (state, filter) {
    state.filter = filter
  }
}

export const actions = {
    async getRoomList ({ commit }, handler) {
        const onRequest = async () => {
            const rawData = await this.$roomServices.getRoomList(handler.data)
            const response = new ResponseHelper(rawData)
            
            if (response.isSuccess()) {
              return response.getData()
            } else {
              const errorMessage = response.getErrorMessage()
              throw new CustomError("Có lỗi khi tải danh sách phòng", errorMessage)
            }  
        }
        await handler.setOnRequest(onRequest).execute()
    },

    async filterRooms ({ commit, getters }, handler) {
        const onRequest = async () => {
            const filter = getters.filter
            const rawData = await this.$roomServices.filterRooms(filter)
            const response = new ResponseHelper(rawData)
            
            if (response.isSuccess()) {
              return response.getData()
            } else {
              const errorMessage = response.getErrorMessage()
              throw new CustomError("Có lỗi khi tải danh sách phòng", errorMessage)
            }  
        }
        await handler.setOnRequest(onRequest).execute()
    },

    async favoriteRoom ({ commit }, handler) {
        const onRequest = async () => {
            const rawData = await this.$roomServices.favoriteRoom(handler.data)
            const response = new ResponseHelper(rawData)
            
            if (response.isSuccess()) {
              const post = handler.data.post_id
              commit('user/addFavRoom', post, { root: true })

              Vue.notify({
                type: 'success',
                title: 'Đã yêu thích ╰(*°▽°*)╯',
                text: 'Danh sách các bài đăng đã thích có thể được xem trong trang cá nhân.'
              })
            } else {
              const errorMessage = response.getErrorMessage()
              throw new CustomError("Có lỗi khi yêu thích phòng", errorMessage)
            }  
        }
        await handler.setOnRequest(onRequest).execute()
    },

    async removeFavoriteRoom ({ commit, rootGetters }, handler) {
      const onRequest = async () => {
          const rawData = await this.$roomServices.removeFavoriteRoom(handler.data)
          const response = new ResponseHelper(rawData)
          
          if (response.isSuccess()) {
            const index = rootGetters['user/userFavoriteRooms'].findIndex(e => e == handler.data.post_id)
            commit('user/spliceFavRoom', index, { root: true })

            Vue.notify({
              type: 'success',
              title: 'Đã bỏ yêu thích (┬┬﹏┬┬)',
              text: 'Danh sách các bài đăng đã thích có thể được xem trong trang cá nhân.'
            })
          } else {
            const errorMessage = response.getErrorMessage()
            throw new CustomError("Có lỗi khi yêu thích phòng", errorMessage)
          }  
      }
      await handler.setOnRequest(onRequest).execute()
    },

    async reportRoom ({ commit }, handler) {
        const onRequest = async () => {
            const rawData = await this.$roomServices.reportRoom(handler.data)
            const response = new ResponseHelper(rawData)
            
            if (response.isSuccess()) {
                Vue.notify({
                    type: 'success',
                    title: 'Báo cáo thành công',
                    text: 'Báo cáo của bạn sẽ được admin kiểm duyệt. Cảm ơn bạn đã phản hồi!'
                })
            } else {
              const errorMessage = response.getErrorMessage()
              throw new CustomError("Có lỗi khi báo cáo phòng", errorMessage)
            }  
        }
        await handler.setOnRequest(onRequest).execute()
    },

    async getRoomDetail ({ commit }, handler) {
        const onRequest = async () => {
            const rawData = await this.$roomServices.getRoomDetail(handler.data)
            const response = new ResponseHelper(rawData)
            
            if (response.isSuccess()) {
              return response.getData()
            } else {
              const errorMessage = response.getErrorMessage()
              throw new CustomError("Có lỗi khi tải chi tiết phòng", errorMessage)
            }  
        }
        await handler.setOnRequest(onRequest).execute()
    },

    async submitReview ({ commit }, handler) {
        const onRequest = async () => {
            const rawData = await this.$roomServices.submitReview(handler.data)
            const response = new ResponseHelper(rawData)
            
            if (response.isSuccess()) {
                Vue.notify({
                    type: 'success',
                    title: 'Đánh giá thành công',
                    text: 'Đánh giá của bạn sẽ được cho hiển thị sau khi kiểm duyệt. Cảm ơn bạn đã phản hồi!'
                })
            } else {
              const errorMessage = response.getErrorMessage()
              throw new CustomError("Có lỗi khi đăng tải đánh giá", errorMessage)
            }  
        }
        await handler.setOnRequest(onRequest).execute()
    },

    async getReviews ({ commit }, handler) {
        const onRequest = async () => {
            const rawData = await this.$roomServices.getReviews(handler.data)
            const response = new ResponseHelper(rawData)
            
            if (response.isSuccess()) {
                return response.getData()
            } else {
              const errorMessage = response.getErrorMessage()
              throw new CustomError("Có lỗi khi tải đánh giá", errorMessage)
            }  
        }
        await handler.setOnRequest(onRequest).execute()
    },

  async submitPost ({ commit }, handler) {
    const onRequest = async () => {
        const rawData = await this.$roomServices.submitPost(handler.data)
        const response = new ResponseHelper(rawData)
        
        if (response.isSuccess()) {
            Vue.notify({
              type: 'success',
              title: 'Gửi yêu cầu thành công',
              text: 'Bài đăng của bạn sẽ được cho hiển thị sau khi kiểm duyệt. Cảm ơn bạn đã đăng bài!'
          })
          return response.data
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Có lỗi khi gửi yêu cầu xét duyệt bài đăng", errorMessage)
        }  
    }
    await handler.setOnRequest(onRequest).execute()
},

async uploadImage ({ commit }, handler) {
  const onRequest = async () => {
      const rawData = await this.$roomServices.uploadImage(handler.data)
      const response = new ResponseHelper(rawData)
      
      if (response.isError()) {
        const errorMessage = response.getErrorMessage()
        throw new CustomError("Có lỗi khi đăng ảnh", errorMessage)
      }
  }
  await handler.setOnRequest(onRequest).execute()
},

async editRoom ({ commit }, handler) {
  const onRequest = async () => {
      const rawData = await this.$roomServices.editRoom(handler.data)
      const response = new ResponseHelper(rawData)
      
      if (response.isError()) {
        const errorMessage = response.getErrorMessage()
        throw new CustomError("Có lỗi khi gửi yêu cầu xét duyệt bài đăng", errorMessage)
      }
  }
  await handler.setOnRequest(onRequest).execute()
},

async editPost ({ commit }, handler) {
  const onRequest = async () => {
      const rawData = await this.$roomServices.editPost(handler.data)
      const response = new ResponseHelper(rawData)
      
      if (response.isSuccess()) {
          Vue.notify({
            type: 'success',
            title: 'Gửi yêu cầu thành công',
            text: 'Bài đăng của bạn sẽ được cho hiển thị sau khi kiểm duyệt. Cảm ơn bạn đã đăng bài!'
        })
      } else {
        const errorMessage = response.getErrorMessage()
        throw new CustomError("Có lỗi khi gửi yêu cầu xét duyệt bài đăng", errorMessage)
      }  
  }
  await handler.setOnRequest(onRequest).execute()
},

async getPosts ({ commit }, {handler, query}) {
  const onRequest = async () => {
      const rawData = await this.$roomServices.getPosts(query)
      const response = new ResponseHelper(rawData)
      
      if (response.isSuccess()) {
        return response.getData()
      } else {
        const errorMessage = response.getErrorMessage()
        throw new CustomError("Có lỗi khi tải bài", errorMessage)
      }  
  }
  await handler.setOnRequest(onRequest).execute()
},

async toggleActivePost ({ commit }, handler) {
  const onRequest = async () => {
      const rawData = await this.$roomServices.toggleActivePost(handler.data)
      const response = new ResponseHelper(rawData)
      
      if (response.isSuccess()) {
        return response.getData()
      } else {
        const errorMessage = response.getErrorMessage()
        throw new CustomError("Có lỗi khi chuyển trạng thái bài", errorMessage)
      }  
  }
  await handler.setOnRequest(onRequest).execute()
},

async prolongTimePost ({ commit }, handler) {
  const onRequest = async () => {
      const rawData = await this.$roomServices.prolongTimePost(handler.data)
      const response = new ResponseHelper(rawData)
      
      if (response.isSuccess()) {
        Vue.notify({
          type: 'success',
          title: 'Gửi yêu cầu gia hạn bài đăng thành công',
          text: 'Bài đăng của bạn sẽ được gia hạn sau khi kiểm duyệt. Cảm ơn bạn đã yêu cầu!'
        })
      } else {
        const errorMessage = response.getErrorMessage()
        throw new CustomError("Có lỗi khi chuyển trạng thái bài", errorMessage)
      }  
  }
  await handler.setOnRequest(onRequest).execute()
},

async getOwnerRooms ({ commit }, handler) {
  const onRequest = async () => {
      const rawData = await this.$roomServices.getOwnerRooms(handler.data)
      const response = new ResponseHelper(rawData)
      
      if (response.isSuccess()) {
        return response.getData()
      } else {
        const errorMessage = response.getErrorMessage()
        throw new CustomError("Có lỗi khi tải bài đăng", errorMessage)
      }  
  }
  await handler.setOnRequest(onRequest).execute()
},

}
