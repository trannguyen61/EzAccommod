<template>
  <div class="landing">
    <page-intro />
    <main>
      <room-filter
        id="rooms"
        @filtered="getFilter"
      />
      <div
        v-if="!loading"
        class="room-list"
      >
        <p
          v-if="!rooms.length"
          class="empty-warning"
        >
          Không tìm thấy kết quả!
        </p>
        <room-list-item
          v-for="room in showedRooms"
          :key="room._id"
          :room="room"
        />
        <v-pagination
          v-if="rooms.length"
          v-model="currentPage"
          :length="totalPage"
        />
        <button
          v-else
          v-ripple
          class="see-more-btn custom-btn custom-btn--text custom-btn__densed"
          @click="onGetRoomList"
        >
          Tải lại
        </button>
      </div>
      <v-skeleton-loader
        v-else
        class="mx-8"
        width="100%"
        type="card-avatar, article, actions"
      />
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
        rooms: [],
        showedRooms: [],
        currentPage: 1,
        loading: false,
        ITEMS_PER_PAGE: 3
      }
    },

    computed: {
      totalPage () {
        return Math.ceil(this.rooms.length / this.ITEMS_PER_PAGE)
      }
    },

    watch: {
      currentPage () {
        this.getCurrentPageRooms()
      },

      rooms () {
        this.getCurrentPageRooms()
      }
    },

    mounted () {
      this.onGetRoomList()
    },

    methods: {
      ...mapActions({
        getRoomList: 'room/getRoomList',
      }),

      getCurrentPageRooms () {
        const start = this.ITEMS_PER_PAGE * ( this.currentPage - 1 )
        this.showedRooms = this.rooms.slice(start, start + this.ITEMS_PER_PAGE)
      },

      async onGetRoomList () {
        this.loading = true
        const handler = new ApiHandler()
                      .setOnResponse(res => this.rooms = res.posts)
                      .setOnFinally(() => {
                        this.loading = false
                      })
        await this.getRoomList(handler)
      },

      async onLoadMoreRooms () {
        const handler = new ApiHandler().setOnResponse(res => this.rooms = res.posts)
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