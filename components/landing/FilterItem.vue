<template>
  <div
    class="room-list-item filter-item"
  >
    <div
      class="title-group"
      @click="$router.push(`/${room.id}`)"
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
        {{ room.rooms[0].price }} đồng/tháng
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
        v-if="!room.like"
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
import { mapActions } from 'vuex'

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
        favoriteRoom: 'room/favoriteRoom'
      }),

      async onFavoriteRoom () {
        const data = { post_id: this.postId }
        const handler = new ApiHandler().setData(data)
        await this.favoriteRoom(handler)
      }
    }
}
</script>