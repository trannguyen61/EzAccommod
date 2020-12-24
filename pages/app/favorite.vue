<template>
  <div class="favorite">
    <div class="item--title item--title__secondary-ribbon">
      Phòng yêu thích
    </div>
    <div class="favorite--content">
      <room-filter @filtered="getFilter" />

      <div class="favorite--rooms">
        <p
          v-if="!rooms.length"
          class="empty-warning"
        >
          Không tìm thấy kết quả!
        </p>
        <room-list-item
          v-for="room in rooms"
          :key="room.id"
          :room="room"
          class="mt-4"
        />
        <button
          v-if="rooms.length"
          v-ripple
          class="see-more-btn custom-btn custom-btn--text custom-btn__densed"
          @click="onLoadMoreRooms"
        >
          Xem thêm<br>
          <v-icon>fas fa-chevron-down</v-icon>
        </button>
        <button
          v-else
          v-ripple
          class="see-more-btn custom-btn custom-btn--text custom-btn__densed"
          @click="onGetFavoriteRooms"
        >
          Tải lại <br>
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
            rooms: []
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