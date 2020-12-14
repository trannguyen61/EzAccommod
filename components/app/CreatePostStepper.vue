<template>
  <v-stepper
    v-model="step"
    class="create-post-stepper"
  >
    <v-stepper-header>
      <v-stepper-step
        :complete="step > 1"
        step="1"
      >
        Thông tin cơ bản
      </v-stepper-step>

      <v-divider />

      <v-stepper-step
        :complete="step > 2"
        step="2"
      >
        Thông tin chi tiết
      </v-stepper-step>

      <v-divider />
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form v-model="formValue1">
          <div class="d-flex">
            <v-text-field
              v-model="form.price"
              :rules="requiredField()"
              label="Giá (VNĐ)"
              class="mt-6 mx-8"
              style="width: 100%;"
              @input="formatPrice"
            />
          </div>
          <div class="d-flex">
            <v-text-field
              v-model="form.number"
              :rules="requiredField()"
              label="Số lượng phòng"
              type="number"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
            <v-text-field
              v-model="form.square"
              :rules="requiredField()"
              label="Diện tích (m2)"
              type="number"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
          </div>
        </v-form>

        <button
          v-ripple
          type="button"
          :disabled="!formValue1"
          class="custom-btn custom-btn--text custom-btn__densed ml-8 my-4"
          @click="step = 2"
        >
          Tiếp tục
        </button>

        <button
          v-ripple
          type="button"
          class="custom-btn custom-btn--text"
          @click="step -= 1"
        >
          Lùi về
        </button>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-form v-model="formValue2">
          <v-simple-table
            fixed-header
            class="mx-8"
            style="overflow-y: hidden"
          >
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    Dịch vụ
                  </th>
                  <th class="text-left">
                    Phòng trọ
                  </th>
                </tr>
              </thead>
              <v-form />
              <tbody>
                <tr>
                  <td>Chung chủ</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.withOwner"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Có chung chủ'"
                        value="11"
                      />
                      <v-radio
                        :label="'Không chung chủ'"
                        value="12"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Phòng tắm</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.bathroom"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Phòng tắm khép kín'"
                        value="1"
                      />
                      <v-radio
                        :label="'Phòng tắm chung'"
                        value="13"
                      />
                    </v-radio-group>
                    <v-radio-group
                      v-model="form.services.heater"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Có bình nóng lạnh'"
                        value="2"
                      />
                      <v-radio
                        :label="'Không có bình nóng lạnh'"
                        value="0"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Phòng bếp</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.kitchen"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Khu bếp riêng'"
                        value="3"
                      />
                      <v-radio
                        :label="'Khu bếp chung'"
                        value="4"
                      />
                      <v-radio
                        :label="'Không nấu ăn'"
                        value="0"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Điều hòa</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.aircond"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Có điều hòa'"
                        value="5"
                      />
                      <v-radio
                        :label="'Không điều hòa'"
                        value="0"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Ban công</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.velanda"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Có ban công'"
                        value="6"
                      />
                      <v-radio
                        :label="'Không ban công'"
                        value="0"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Điện nước</td>
                  <td>
                    <v-radio-group
                      v-model="form.services.elecPrice"
                      :rules="requiredField()"
                    >
                      <v-radio
                        :label="'Điện nước giá dân'"
                        value="7"
                      />
                      <v-radio
                        :label="'Điện nước giá thuê'"
                        value="14"
                      />
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>Tiện ích khác</td>
                  <td>
                    <v-checkbox
                      v-model="form.services.other"
                      :label="'Tủ lạnh'"
                      value="8"
                      hide-details
                    />
                    <v-checkbox
                      v-model="form.services.other"
                      :label="'Máy giặt'"
                      value="9"
                      hide-details
                    />
                    <v-checkbox
                      v-model="form.services.other"
                      :label="'Giường tủ'"
                      value="10"
                    />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-form>

        <button
          v-ripple
          type="button"
          :disabled="!formValue2"
          class="custom-btn custom-btn--text custom-btn__densed ml-8 my-4"
          @click="onSubmitPost"
        >
          Hoàn tất
        </button>

        <button
          v-ripple
          type="button"
          class="custom-btn custom-btn--text"
          @click="step -= 1"
        >
          Lùi về
        </button>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import validationRules from '@/helpers/validationRules'

export default {
    props: {
        post: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        return {
            step: 1,
            formValue1: false,
            formValue2: false,
            form: {
                number: null,
                price: null,
                square: null,
                services: {
                    withOwner: null,
                    bathroom: null,
                    heater: null,
                    kitchen: null,
                    aircond: null,
                    velanda: null,
                    elecPrice: null,
                    other: []
                }
            }
        }
    },

    mounted () {
        this.getChosenPost()
    },

    methods: {
        getChosenPost () {
            Object.keys(this.post).forEach(e => {
                this.form[e] = this.post[e]
            })
            
            if (this.form.time) this.onGetPostFee()
        },

        onSubmitPost () {
            this.convertServices()
            this.$emit('on-submit-post', this.form)
        },

        convertServices () {
          const services = Object.keys(this.form.services).map(serviceName => {
            if (serviceName !== 'other' && !!this.form.services[serviceName]) return this.form.services[serviceName]
          }).filter(service => !!service && service != 0).concat(this.form.services.other)
          this.form.services = services
        },

        formatPrice () {
            this.form.price = new Intl.NumberFormat('vi-VN').format(this.form.price.replace(/\D/g, ''))
        },

        requiredField () {
            return [validationRules.requiredField]
        }
    }
}
</script>