<template>
  <div
    class="room-list-item filter-item"
  >
    <div
      class="title-group"
      @click="$router.push(`/${room._id}`)"
    >
      <div class="title">
        {{ defaultRoom.roomTypes.find(e => e.id == room.type).name || '' }}
        <v-icon
          color="dark"
          class="icon ml-3"
        >
          fas fa-chevron-right
        </v-icon>
      </div>
      <img
        :src="require('@/assets/images/room01.jpg')"
        alt=""
        class="img"
      >
      <div class="price">
        {{ new Intl.NumberFormat('vi-VN').format(room.rooms[0].price.replace(/\D/g, '')) }} đồng/tháng
      </div>
    </div>
    <v-divider class="my-3" />
    <div class="detail">
      {{ room.detailedAddress }} <br>
      {{ roomFullAddress }}
    </div>
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
</template>

<script>
import { ROOM_TYPES, CITIES, HANOI_DISTRICTS, HANOI_WARDS } from '@/consts/consts'
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
                cities: CITIES,
                hanoiDistricts: HANOI_DISTRICTS,
                hanoiWards: HANOI_WARDS
            }
        }
    },

    computed: {
      ...mapGetters({
        userFavoriteRooms: 'user/userFavoriteRooms',
        isRenter: 'user/isRenter',
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
      },
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
        const handler = new ApiHandler().setData(data)

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