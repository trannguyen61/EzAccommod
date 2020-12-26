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
          @fav="onGetFavoriteRooms"
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
import { mapActions, mapGetters } from 'vuex'

export default {

    components: { RoomListItem, RoomFilter },

    layout: 'app',

    middleware ({ redirect, store }) {
      if (!store.getters['user/isRenter']) {
        redirect('/app')
      }
    },

    data () {
        return {
            rooms: []
        }
    },

    computed: {
      ...mapGetters({
        userFavoriteRooms: 'user/userFavoriteRooms'
      }),
    },

    mounted () {
      this.onGetFavoriteRooms()
    },

    methods: {
        ...mapActions({
            filterRooms: 'room/filterRooms',
            getRoomList: 'room/getRoomList'
        }),

        async onGetFavoriteRooms () {
            const data = {}
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => {
                                this.rooms = res.posts.filter(room => 
                                  this.userFavoriteRooms.some(e => e == room._id)
                                )
                            })
            await this.getRoomList(handler)
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