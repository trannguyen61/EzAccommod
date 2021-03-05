<template>
  <nav class="custom-navbar">
    <nuxt-link
      to="/"
      class="logo"
    >
      EzAccomod
    </nuxt-link>

    <!-- Button for all screens + Logged in -->
    <template v-if="loggedIn">
      <v-menu
        open-on-hover
        bottom
        offset-y
      >
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            icon
            class="mr-6"
            v-on="on"
          >
            <v-badge
              :content="unreadNotif"
              :value="unreadNotif"
              color="primary"
              overlap
            >
              <v-icon>
                fas fa-bell
              </v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list class="notification-bar">
          <v-btn
            small
            text
            class="d-block ml-auto mr-1 mb-3"
            @click="onReadAllNotif"
          >
            Đánh dấu đọc tất cả
            <v-icon
              small
              class="ml-3"
            >
              fas fa-check-double
            </v-icon>
          </v-btn>
          <div
            v-if="!notif.length"
            class="text-center mb-3"
          >
            Không có thông báo
          </div>
          <v-list-item
            v-for="noti in notif"
            :key="noti.id"
            :class="getNotiClass(noti)"
          >
            <small class="mr-3">{{
              formatDate(noti.created.split("T")[0])
            }}</small>
            {{ getNotiText(noti) }}
            <v-btn
              v-if="!noti.read"
              class="ml-6"
              icon
              @click="onReadNotif(noti)"
            >
              <v-icon>fas fa-check</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- Button for medium and up screens + Logged in -->
    <template v-if="$vuetify.breakpoint.mdAndUp && loggedIn">
      <v-menu
        open-on-hover
        bottom
        offset-y
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>fas fa-user</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <button
                v-ripple
                class="custom-btn custom-btn--text custom-btn__block"
                text
              >
                <nuxt-link to="/app">
                  Thông tin cá nhân
                </nuxt-link>
              </button>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <button
                v-ripple
                class="custom-btn custom-btn--text custom-btn__block"
                text
                @click="onLogout"
              >
                Đăng xuất
              </button>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- Button group for medium and up screens + Not logged in yet -->
    <template v-if="$vuetify.breakpoint.mdAndUp && !loggedIn">
      <button
        v-ripple
        class="custom-btn custom-btn--text mx-5"
        @click="$router.push('/auth/register')"
      >
        Đăng ký
      </button>
      <button
        v-ripple
        class="custom-btn custom-btn--text custom-btn__densed"
        @click="$router.push('/auth/login')"
      >
        Đăng nhập
      </button>
    </template>

    <!-- Hamburger toggle navigation bar for small and down screen - Excluding sidebar -->
    <template v-if="$vuetify.breakpoint.smAndDown && sidebar">
      <v-icon
        color="primary"
        @click="$emit('toggle-navbar')"
      >
        fas fa-bars
      </v-icon>
    </template>

    <!-- Hamburger toggle navigation bar for small and down screen - Including sidebar -->
    <template v-if="$vuetify.breakpoint.smAndDown && !sidebar">
      <v-menu
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

        <template v-if="!loggedIn">
          <v-list class="d-flex flex-column">
            <button
              v-ripple
              class="custom-btn custom-btn--text"
              @click="$router.push('/auth/register')"
            >
              Đăng ký
            </button>
            <button
              v-ripple
              class="custom-btn custom-btn--text custom-btn__secondary"
              @click="$router.push('auth/login')"
            >
              Đăng nhập
            </button>
          </v-list>
        </template>

        <template v-else>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <button
                  v-ripple
                  class="custom-btn custom-btn--text custom-btn__block"
                  text
                >
                  <nuxt-link to="/app">
                    Thông tin cá nhân
                  </nuxt-link>
                </button>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>
                <button
                  v-ripple
                  class="custom-btn custom-btn--text custom-btn__block"
                  text
                  @click="onLogout"
                >
                  Đăng xuất
                </button>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </template>
      </v-menu>
    </template>
  </nav>
</template>

<script>
import ApiHandler from "@/helpers/ApiHandler"
import { mapGetters, mapActions } from "vuex"
import { formatISOdate } from "@/helpers/dateHelper"

export default {
  props: {
    sidebar: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      menu: false,
      formatDate: formatISOdate
    }
  },

  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn",
      notif: "user/notif",
      unreadNotif: "user/unreadNotif"
    })
  },

  watch: {
    loggedIn(value) {
      if (value) {
        this.onGetPusher()
        this.onGetNotif()
      }
    }
  },

  mounted() {
    if (this.loggedIn) {
      this.onGetPusher()
      this.onGetNotif()
    }
  },

  methods: {
    ...mapActions({
      logout: "user/logout",
      getNotif: "user/getNotif",
      readNotif: "user/readNotif",
      removePusher: "user/removePusher",
      readAllNotif: "user/readAllNotif",
      getPusher: 'user/getPusher'
    }),

    onGetPusher () {
      this.getPusher(this)
    },

    onRemovePusher() {
      this.removePusher(this)
    },

    async onGetNotif() {
      const handler = new ApiHandler()
      await this.getNotif(handler)
    },

    async onReadNotif(noti) {
      const data = {
        id: noti.ID
      }
      const handler = new ApiHandler().setData(data).setOnResponse(() => {
        this.onGetNotif()
      })
      await this.readNotif(handler)
    },

    async onReadAllNotif() {
      const handler = new ApiHandler().setOnResponse(() => {
        this.onGetNotif()
      })
      await this.readAllNotif(handler)
    },

    async onLogout() {
      this.onRemovePusher(this)
      this.logout()
      this.$router.push("/")
    },

    getNotiClass(noti) {
      if (noti.seen) return "noti noti--seen"
      else if (noti.type == "post") return "noti noti--post"
      else if (noti.type == "review") return "noti noti--review"
    },

    getNotiText(noti) {
      if (noti.type == "post")
        return "Bài đăng của bạn đã được quản trị viên xét duyệt!"
      if (noti.type == "review")
        return "Bình luận của bạn đã được quản trị viên xét duyệt!"
    }
  }
}
</script>
