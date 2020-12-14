<template>
  <div class="auth register">
    <div class="auth-form">
      <div class="auth-form--title">
        Đăng ký
      </div>

      <v-tabs
        v-model="tab"
        centered
        background-color="transparent"
      >
        <v-tab>
          Người thuê trọ
        </v-tab>
        <v-tab>
          Chủ nhà trọ
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item class="auth-form--tab">
          <v-form
            v-model="formValueRenter"
            class="auth-form--form"
            @submit.prevent="onSignup('renter')"
          >
            <div class="d-flex">
              <v-text-field
                v-model="form.lastName"
                :rules="requiredField()"
                persistent-hint
                hint="Trường bắt buộc"
                label="Họ"
                class="mt-3 mr-6"
              />
              <v-text-field
                v-model="form.firstName"
                :rules="requiredField()"
                persistent-hint
                hint="Trường bắt buộc"
                label="Tên"
                class="mt-3 ml-6"
              />
            </div>
            <v-text-field
              v-model="form.email"
              :rules="isEmail()"
              persistent-hint
              hint="Trường bắt buộc"
              label="Email"
              class="mt-6"
            />

            <v-text-field
              v-model="form.password"
              :rules="validPassword()"
              :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
              :type="showPassword ? 'text' : 'password'"
              persistent-hint
              hint="Trường bắt buộc"
              counter
              label="Mật khẩu"
              class="mt-6"
              @click:append="showPassword = !showPassword"
            />

            <button
              v-ripple
              type="submit"
              :disabled="!formValueRenter || tab"
              class="custom-btn custom-btn--text custom-btn__densed custom-btn__block mt-6"
            >
              Hoàn tất đăng ký
            </button>

            <v-divider class="my-6" />

            <button
              v-ripple
              type="button"
              class="custom-btn custom-btn--text custom-btn__densed custom-btn__block"
              @click="$router.push('/auth/login')"
            >
              Đã có tài khoản?
            </button>

            <facebook-login-button class="mb-8" />
          </v-form>
        </v-tab-item>
        <v-tab-item class="auth-form--tab">
          <v-form
            v-model="formValueOwner"
            class="auth-form--form"
            @submit.prevent="onSignup('owner')"
          >
            <div class="d-flex">
              <v-text-field
                v-model="form.lastName"
                :rules="requiredField()"
                persistent-hint
                hint="Trường bắt buộc"
                label="Họ"
                class="mt-3 mr-6"
              />
              <v-text-field
                v-model="form.firstName"
                :rules="requiredField()"
                persistent-hint
                hint="Trường bắt buộc"
                label="Tên"
                class="mt-3 ml-6"
              />
            </div>

            <v-text-field
              v-model="form.socialID"
              :rules="requiredField()"
              persistent-hint
              hint="Trường bắt buộc"
              label="Căn cước công dân/CMND"
              class="mt-3"
            />

            <v-text-field
              v-model="form.address"
              :rules="requiredField()"
              persistent-hint
              hint="Trường bắt buộc"
              label="Địa chỉ thường trú"
              class="mt-3"
            />

            <v-text-field
              v-model="form.phoneNumber"
              :rules="isPhoneNumber()"
              label="Số điện thoại"
              class="mt-3"
            />

            <v-text-field
              v-model="form.email"
              :rules="isEmail()"
              persistent-hint
              hint="Trường bắt buộc"
              label="Email"
              class="mt-3"
            />

            <v-text-field
              v-model="form.password"
              :rules="validPassword()"
              persistent-hint
              :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
              :type="showPassword ? 'text' : 'password'"
              hint="Trường bắt buộc"
              label="Mật khẩu"
              counter
              class="mt-3"
              @click:append="showPassword = !showPassword"
            />

            <button
              v-ripple
              type="submit"
              :disabled="!formValueOwner || !tab"
              class="custom-btn custom-btn--text custom-btn__densed custom-btn__block mt-3"
            >
              Hoàn tất đăng ký
            </button>

            <button
              v-ripple
              type="button"
              class="custom-btn custom-btn--text custom-btn__densed custom-btn__block mt-3 mb-9"
              @click="$router.push('/auth/login')"
            >
              Đã có tài khoản?
            </button>
          </v-form>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import FacebookLoginButton from '@/components/landing/FacebookLoginButton'

import validationRules from '@/helpers/validationRules'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
   components: { FacebookLoginButton },

    data () {
        return {
            tab: null,
            formValueRenter: false,
            formValueOwner: false,
            showPassword: false,
            form: {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                socialID: '',
                address: '',
                phoneNumber: ''
            }
        }
    },

    methods: {
        ...mapActions({
            signup: 'user/signup'
        }),

        async onSignup (role) {
          if ((role == 'renter' && this.tab) || (role == 'owner' && !this.tab)) return
          
          const data = Object.assign({}, this.form, { role })
          const handler = new ApiHandler()
                        .setData(data)
                        .setOnResponse(res => {
                          this.$router.push('/')
                        })
          await this.signup(handler)
        },

        isEmail () {
            return [validationRules.requiredField, validationRules.isEmail]
        },

        requiredField () {
            return [validationRules.requiredField]
        },

        isPhoneNumber () {
            return [validationRules.isPhoneNumber]
        },

        validPassword () {
            return [validationRules.requiredField, validationRules.minField(6)]
        }
    }
}
</script>