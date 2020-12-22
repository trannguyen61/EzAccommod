<template>
  <div class="favorite">
    <div class="item--title item--title__secondary-ribbon">
      Phòng yêu thích
    </div>
    <div class="favorite--content">
      <room-filter @filtered="getFilter" />

      <div class="favorite--rooms">
        <room-list-item
          v-for="room in rooms"
          :key="room.id"
          :room="room"
          class="mt-4"
        />
        <button
          v-ripple
          class="see-more-btn custom-btn custom-btn--text custom-btn__densed"
          @click="onLoadMoreRooms"
        >
          Xem thêm<br>
          <v-icon>fas fa-chevron-down</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import RoomListItem from '@/components/landing/RoomListItem'
import RoomFilter from '@/components/landing/RoomFilter'

import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {

    components: { RoomListItem, RoomFilter },

    layout: 'app',

    data () {
        return {
            rooms: [{
                id: '123',
                type: "1",
                address: {
                  city: "1",
                  district: "1",
                  ward: "1",
                  road: "1",
                  addressDetail: "abc",
                },
                rooms: [
                  { 
                    price: '1.000.000',
                    services: ["1", "2", "3"],
                    roomNum: 2,
                    area: 30,
                  }
                ],
                favorite: 10,
                views: 100,
                checked: true,
                active: false,
                expiredAt: '2021-01-06',
                fee: '1.500.000'
            }]
        }
    },

    methods: {
        ...mapActions({
            getFavoriteRooms: 'room/getFavoriteRooms',
            filterRooms: 'room/filterRooms'
        }),

        async onGetFavoriteRooms () {
            const data = {}
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => {
                                this.room = res
                            })
            await this.getFavoriteRooms(handler)
        },

        onLoadMoreRooms () {

        },

        getFilter (filter) {
            this.filter = filter
            this.onFilterRooms()
        },

        async onFilterRooms () {
            const data = this.filter
            const handler = new ApiHandler()
                        .setData(data)
                        .setOnResponse(res => this.rooms = res)
            await this.filterRooms(handler)
        },
    }
}
</script>