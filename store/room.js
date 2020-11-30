import ResponseHelper from '@/helpers/ResponseHelper'
import CustomError from '@/helpers/CustomError'
import Vue from 'vue'

export const state = () => ({
})

export const getters = {
}

export const mutations = {
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

    async filterRooms ({ commit }, handler) {
        const onRequest = async () => {
            const rawData = await this.$roomServices.filterRooms(handler.data)
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
              return response.getData()
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
}
