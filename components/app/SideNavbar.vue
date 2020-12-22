<template>
  <v-navigation-drawer
    v-model="drawer"
    color="secondary"
    :permanent="!$vuetify.breakpoint.smAndDown"
    :temporary="$vuetify.breakpoint.smAndDown"
    :absolute="$vuetify.breakpoint.smAndDown"
  >
    <v-list
      dense
      nav
    >
      <v-list-item class="my-2">
        <v-list-item-icon>
          <v-icon>far fa-user-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-uppercase">
            {{ userName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list
      dense
      nav
    >
      <nuxt-link to="/app/favorite">
        <v-list-item class="my-2">
          <v-list-item-icon>
            <v-icon>fas fa-heart</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Phòng yêu thích</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>

      <nuxt-link
        v-if="isOwner"
        to="/app/create-post"
      >
        <v-list-item class="my-2">
          <v-list-item-icon>
            <v-icon>fas fa-edit</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Tạo bài đăng</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>

      <nuxt-link
        v-if="isOwner"
        to="/app/post-list"
      >
        <v-list-item class="my-2">
          <v-list-item-icon>
            <v-icon>fas fa-list</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Danh sách bài đăng</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            drawer: false
        }
    },

    computed: {
      ...mapGetters({
        userName: 'user/userName',
        isOwner: 'user/isOwner'
      })
    }
}
</script>