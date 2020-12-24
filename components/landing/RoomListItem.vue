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
          {{ room.rooms[0].price }} đồng/tháng
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
  </div>
</template>

<script>
import { ROOM_TYPES, ROOM_FACILITIES, CITIES, HANOI_DISTRICTS, HANOI_WARDS } from '@/consts/consts'
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
                roomFacilities: ROOM_FACILITIES,
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