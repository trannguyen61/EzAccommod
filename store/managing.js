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
    async getAccounts({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$managingServices.getAccounts(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
            return response.getData()
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Có lỗi khi tải tài khoản", errorMessage)
        }  
      }

      await handler.setOnRequest(onRequest).execute()
    },

    async enableAccount({ commit }, handler) {
        const onRequest = async () => {
          const rawData = await this.$managingServices.enableAccount(handler.data)
          const response = new ResponseHelper(rawData)
  
          if (response.isSuccess()) {
            Vue.notify({
                type: 'success',
                title: 'Duyệt tài khoản thành công',
            })
          } else {
            const errorMessage = response.getErrorMessage()
            throw new CustomError("Có lỗi khi tải tài khoản", errorMessage)
          }  
        }
  
        await handler.setOnRequest(onRequest).execute()
    },

    async filterAccounts({ commit }, handler) {
      const onRequest = async () => {
        const rawData = await this.$managingServices.filterAccounts(handler.data)
        const response = new ResponseHelper(rawData)

        if (response.isSuccess()) {
            return response.getData()
        } else {
          const errorMessage = response.getErrorMessage()
          throw new CustomError("Có lỗi khi tải tài khoản", errorMessage)
        }  
      }

      await handler.setOnRequest(onRequest).execute()
    },
}

