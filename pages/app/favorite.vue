<template>
  <div class="favorite">
    <div class="item--title item--title__secondary-ribbon">
      Phòng yêu thích
    </div>
    <div class="favorite--content">
      <room-filter @filtered="getFilter" />

      <div class="favorite--rooms">
        <v-skeleton-loader
          v-if="loading"
          width="100%"
          type="card-avatar, article, actions"
        />
        <p
          v-if="!rooms.length && !loading"
          class="empty-warning"
        >
          Không tìm thấy kết quả!
        </p>
        <room-list-item
          v-for="room in showedRooms"
          :key="room.id"
          :room="room"
          class="mt-4"
          @fav="onGetFavoriteRooms"
        />
        <v-pagination
          v-if="rooms.length && !loading"
          v-model="currentPage"
          :length="totalPage"
        />
        <button
          v-if="!rooms.length && !loading"
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
            rooms: [],
            showedRooms: [],
            currentPage: 1,
            loading: false,
            ITEMS_PER_PAGE: 3
        }
    },

    computed: {
      ...mapGetters({
        userFavoriteRooms: 'user/userFavoriteRooms',
        filter: 'room/filter'
      }),

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
      this.setFilter(null)
      this.onGetFavoriteRooms()
    },

    methods: {
        ...mapActions({
            filterRooms: 'room/filterRooms',
            getRoomList: 'room/getRoomList'
        }),

        ...mapMutations({
          setFilter: 'room/setFilter'
        }),

        getCurrentPageRooms () {
          const start = this.ITEMS_PER_PAGE * ( this.currentPage - 1 )
          this.showedRooms = this.rooms.slice(start, start + this.ITEMS_PER_PAGE)
        },

        async onGetFavoriteRooms () {
            this.loading = true

            const data = {}
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => {
                                this.rooms = res.posts.filter(room => 
                                  this.userFavoriteRooms.some(e => e == room._id)
                                )
                            })
                            .setOnFinally(() => {
                              this.loading = false
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
            const handler = new ApiHandler()
                          .setOnResponse(res => this.rooms = res.posts)
            await this.filterRooms(handler)
        },
    }
}
</script>