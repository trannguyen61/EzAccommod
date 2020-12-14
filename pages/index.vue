<template>
  <div class="landing">
    <page-intro />
    <main>
      <room-filter @filtered="getFilter" />
      <div
        id="rooms"
        class="room-list"
      >
        <room-list-item
          v-for="room in rooms"
          :key="room.id"
          :room="room"
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
    </main>
  </div>
</template>

<script>
import PageIntro from '@/components/landing/PageIntro'
import RoomFilter from '@/components/landing/RoomFilter'
import RoomListItem from '@/components/landing/RoomListItem'

import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    components: { PageIntro, RoomFilter, RoomListItem },

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
                services: [1, 2, 3]
        }],
        roomPagination: 1
      }
    },

    mounted () {
      // this.onGetRoomList()
    },

    methods: {
      ...mapActions({
        getRoomList: 'room/getRoomList',
      }),

      async onGetRoomList () {
        const handler = new ApiHandler().setOnResponse(res => this.rooms = res)
        await this.getRoomList(handler)
      },

      async onLoadMoreRooms () {
        const handler = new ApiHandler().setOnResponse(res => this.rooms = res)
        await this.getRoomList(handler)
      },

      getFilter () {
        this.$router.push({
          path: '/filter'
        })
      },
    }
}
</script>