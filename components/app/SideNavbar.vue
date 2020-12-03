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
            Nakayama Haruki
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list
      dense
      nav
    >
      <nuxt-link to="/user/favorite">
        <v-list-item class="my-2">
          <v-list-item-icon>
            <v-icon>fas fa-heart</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Phòng yêu thích</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
    data () {
        return {
            drawer: false
        }
    }
}
</script>