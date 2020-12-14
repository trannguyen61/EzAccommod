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
                type: 1,
                roomNum: 2,
                square: 30,
                address: 'Giữa Hồ Gươm - Hoàn Kiếm - Hà Nội',
                detailedAddress: 'Cạnh vườn hoa Lý Thái Tổ',
                price: '1.000.000',
                services: [1, 2, 3],
                favorite: true
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