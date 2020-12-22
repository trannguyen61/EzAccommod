<template>
  <div class="auth login">
    <div class="auth-form">
      <div class="auth-form--title">
        Đăng nhập
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
            @submit.prevent="onLogin"
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
              :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
              :type="showPassword ? 'text' : 'password'"
              label="Mật khẩu"
              class="mt-6"
              @click:append="showPassword = !showPassword"
            />

            <button
              v-ripple
              type="submit"
              :disabled="!formValue || loading"
              class="custom-btn custom-btn--text custom-btn__densed custom-btn__block mt-6"
            >
              Đăng nhập
            </button>
            <v-progress-linear
              v-if="loading"
              indeterminate
              color="primary"
            />

            <v-divider class="my-6" />

            <facebook-login-button />
          </v-form>
        </v-tab-item>
        <v-tab-item class="auth-form--tab">
          <v-form
            v-model="formValue"
            class="auth-form--form"
            @submit.prevent="onLogin"
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
              :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
              :type="showPassword ? 'text' : 'password'"
              label="Mật khẩu"
              class="mt-6"
              @click:append="showPassword = !showPassword"
            />

            <button
              v-ripple
              type="submit"
              :disabled="!formValue || loading"
              class="custom-btn custom-btn--text custom-btn__densed custom-btn__block mt-6"
            >
              Đăng nhập
            </button>
            <v-progress-linear
              v-if="loading"
              indeterminate
              color="primary"
            />
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
            loading: false,
            showPassword: false,
            formValue: false,
            form: {
                email: '',
                password: '',
            }
        }
    },

    methods: {
        ...mapActions({
            login: 'user/login'
        }),

        async onLogin () {
          this.loading = true
          const data = this.form
          const handler = new ApiHandler()
                        .setData(data)
                        .setOnResponse(() => {
                          this.$router.push('/')
                        })
                        .setOnFinally(() => {
                          this.loading = false
                        })
          await this.login(handler)
        },

        isEmail () {
            return [validationRules.requiredField, validationRules.isEmail]
        },

        validPassword () {
            return [validationRules.requiredField, validationRules.minField(6)]
        }
    }
}
</script>