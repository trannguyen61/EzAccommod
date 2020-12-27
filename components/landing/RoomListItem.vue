<template>
  <div
    class="room-list-item"
  >
    <img
      :src="require('@/assets/images/room01.jpg')"
      alt=""
      class="img"
    >
    <div class="content">
      <div
        class="title-group"
        @click="$router.push(`/${room._id}`)"
      >
        <div class="content-title">
          {{ defaultRoom.roomTypes.find(e => e.id == room.type).name || '' }}
          <v-icon
            color="dark"
            class="icon"
          >
            fas fa-chevron-right
          </v-icon>
        </div>
        <div class="subtitle-2">
          {{ room.detailedAddress }} <br>
          {{ roomFullAddress }}
        </div>
        <div class="price">
          {{ new Intl.NumberFormat('vi-VN').format(room.rooms[0].price.replace(/\D/g, '')) }} đồng/tháng
        </div>
      </div>
      <v-divider class="my-3" />
      <v-row>
        <v-col
          cols="12"
          md="4"
          class="px-0 py-0"
        >
          <ul class="facilities ml-auto mr-auto">
            <li
              v-for="fac in room.rooms[0].services.slice(0, 2)"
              :key="fac"
            >
              {{ defaultRoom.roomFacilities.find(e => e.value == fac).name }}
            </li>
          </ul>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="px-0 py-0"
        >
          <ul class="facilities ml-auto mr-auto">
            <li
              v-for="fac in room.rooms[0].services.slice(2, 4)"
              :key="fac"
            >
              {{ defaultRoom.roomFacilities.find(e => e.value == fac).name }}
            </li>
          </ul>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="px-0 py-0"
        >
          <ul class="facilities ml-auto mr-auto">
            <li
              v-for="fac in room.rooms[0].services.slice(4)"
              :key="fac"
            >
              {{ defaultRoom.roomFacilities.find(e => e.value == fac).name }}
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-btn
        icon
        class="favorite"
        @click="onFavoriteRoom"
      >
        <v-icon
          v-if="!isFavRoom(room)"
          color="primary"
        >
          far fa-heart
        </v-icon>
        <v-icon
          v-else
          color="primary"
        >
          fas fa-heart
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { ROOM_TYPES, ROOM_FACILITIES, CITIES, HANOI_DISTRICTS, HANOI_WARDS } from '@/consts/consts'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'

export default {
    props: {
        room: {
            type: Object,
            required: true
        }
    },

    data () {
        return {
            defaultRoom: {
                roomTypes: ROOM_TYPES,
                roomFacilities: ROOM_FACILITIES,
                cities: CITIES,
                hanoiDistricts: HANOI_DISTRICTS,
                hanoiWards: HANOI_WARDS
            }
        }
    },

    computed: {
      ...mapGetters({
        userFavoriteRooms: 'user/userFavoriteRooms',
        isOwner: 'user/isOwner',
        loggedIn: 'user/loggedIn'
      }),

      roomFullAddress () {
        const findCity = this.defaultRoom.cities.find(e => e.id == this.room.address.city)
        const findDistrict = this.defaultRoom.hanoiDistricts.find(e => e.id == this.room.address.district)
        const findWard = this.defaultRoom.hanoiWards.find(e => e.id == this.room.address.ward)

        const city = findCity ? findCity.name : ''
        const district = findDistrict ? findDistrict.name : ''
        const ward = findWard ? findWard.name : ''
        const road = this.room.address.road

        return `${road}, ${ward}, ${district}, ${city}`
      },

      postId () {
        return this.room ? this.room._id : ''
      }
    },

    methods: {
      ...mapActions({
        favoriteRoom: 'room/favoriteRoom',
        removeFavoriteRoom: 'room/removeFavoriteRoom'
      }),

      isFavRoom (room) {
        return Boolean(this.userFavoriteRooms.find(e => e == room._id))
      },

      async onFavoriteRoom () {
        if (this.isOwner || !this.loggedIn) {
          Vue.notify({
            type: 'warning',
            title: 'Vui lòng đăng nhập',
            text: 'Bạn cần có tài khoản người thuê nhà để sử dụng chức năng Yêu thích phòng.'
          })

          return
        }

        const data = { post_id: this.postId }
        const handler = new ApiHandler().setData(data).setOnResponse(() => this.$emit('fav'))

        const alreadyFavRoom = this.userFavoriteRooms.find(e => e == this.postId)

        if (alreadyFavRoom) {
          await this.removeFavoriteRoom(handler)
        } else {
          await this.favoriteRoom(handler)
        }
      }
    }
}
</script>