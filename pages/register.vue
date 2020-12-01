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
            v-model="formValue"
            class="auth-form--form"
          >
            <v-text-field
              v-model="form.email"
              :rules="isEmail()"
              label="Email"
              class="mt-6"
            />

            <v-text-field
              v-model="form.password"
              :rules="validPassword()"
              label="Mật khẩu"
              class="mt-6"
            />

            <button
              v-ripple
              type="button"
              :disabled="!formValue"
              class="custom-btn custom-btn--text custom-btn__densed custom-btn__block mt-6"
              @click="onSignup"
            >
              Hoàn tất đăng ký
            </button>

            <v-divider class="my-6" />
          </v-form>
        </v-tab-item>
        <v-tab-item class="auth-form--tab">
          <v-form
            v-model="formValue"
            class="auth-form--form"
          >
            <v-text-field
              v-model="form.name"
              :rules="requiredField()"
              label="Họ tên"
              class="mt-3"
            />

            <v-text-field
              v-model="form.identityNum"
              :rules="requiredField()"
              label="Căn cước công dân/CMND"
              class="mt-3"
            />

            <v-text-field
              v-model="form.address"
              :rules="requiredField()"
              label="Địa chỉ thường trú"
              class="mt-3"
            />

            <v-text-field
              v-model="form.phone"
              :rules="isPhoneNumber()"
              label="Số điện thoại"
              class="mt-3"
            />

            <v-text-field
              v-model="form.email"
              :rules="isEmail()"
              label="Email"
              class="mt-3"
            />

            <v-text-field
              v-model="form.password"
              :rules="validPassword()"
              label="Mật khẩu"
              class="mt-3"
            />

            <button
              v-ripple
              type="button"
              :disabled="!formValue"
              class="custom-btn custom-btn--text custom-btn__densed custom-btn__block mt-3 mb-9"
              @click="onSignup"
            >
              Hoàn tất đăng ký
            </button>
          </v-form>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import validationRules from '@/helpers/validationRules'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            tab: null,
            formValue: false,
            form: {
                email: '',
                password: '',
                name: '',
                identityNum: '',
                address: '',
                phone: ''
            }
        }
    },

    methods: {
        ...mapActions({
            signup: 'user/signup'
        }),

        async onSignup () {

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