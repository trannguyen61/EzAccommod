<template>
  <nav class="custom-navbar">
    <nuxt-link
      to="/"
      class="logo"
    >
      EzAccomod
    </nuxt-link>

    <button
      v-if="$vuetify.breakpoint.mdAndUp"
      v-ripple
      class="custom-btn custom-btn--text mx-5"
      @click="$router.push('/register')"
    >
      <nuxt-link
        to="/register"
        class="link-text"
      >
        Đăng ký
      </nuxt-link>
    </button>
    <button
      v-if="$vuetify.breakpoint.mdAndUp"
      v-ripple
      class="custom-btn custom-btn--text custom-btn__densed"
    >
      Đăng nhập
    </button>

    <v-menu 
      v-if="$vuetify.breakpoint.smAndDown" 
      offset-y
      transition="slide-y-transition"
      min-width="120px"
    >
      <template #activator="{ on, attrs }">
        <v-btn 
          v-bind="attrs"
          icon 
          v-on="on" 
          @click="menu = !menu"
        >
          <v-icon color="primary">
            fas fa-bars
          </v-icon>
        </v-btn>
      </template>
      <v-list class="d-flex flex-column">
        <button
          v-ripple
          class="custom-btn custom-btn--text"
        >
          Đăng ký
        </button>
        <button
          v-ripple
          class="custom-btn custom-btn--text custom-btn__secondary"
        >
          Đăng nhập
        </button>
      </v-list>
    </v-menu>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      menu: false
    }
  }
}
</script>