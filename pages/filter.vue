<template>
  <div class="filter-page">
    <room-filter @filtered="getFilter" />
    <v-row class="room-list">
      <v-col v-if="!rooms.length || loading">
        <v-row v-if="loading">
          <v-col>
            <v-skeleton-loader
              type="card-avatar, article, actions"
            />
          </v-col>
          <v-col>
            <v-skeleton-loader
              type="article, actions"
            />
          </v-col>
          <v-col>
            <v-skeleton-loader
              type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
            />
          </v-col>
        </v-row>
        <p
          v-if="!loading && !rooms.length"
          class="empty-warning"
        >
          Không tìm thấy kết quả phù hợp!
        </p>
      </v-col>
      <template v-if="!loading">
        <v-col
          v-for="room in showedRooms"
          :key="room.id"
          cols="12"
          md="6"
          lg="4"
        >
          <filter-item :room="room" />
        </v-col>
      </template>
      <v-col
        v-if="rooms.length && !loading"
        cols="12"
      >
        <v-pagination
          v-model="currentPage"
          :length="totalPage"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RoomFilter from '@/components/landing/RoomFilter'
import FilterItem from '@/components/landing/FilterItem'

import ApiHandler from '@/helpers/ApiHandler'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    components: { RoomFilter, FilterItem },

    data () {
        return {
            rooms: [],
            showedRooms: [],
            loading: false,
            currentPage: 1,
            ITEMS_PER_PAGE: 9
        }
    },

    computed: {
        ...mapGetters({
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
      },
    },

    mounted () {
      this.onFilterRooms()
    },

    methods: {
        ...mapActions({
            getRoomList: 'room/getRoomList',
            filterRooms: 'room/filterRooms'
        }),

        getCurrentPageRooms () {
          const start = this.ITEMS_PER_PAGE * ( this.currentPage - 1 )
          this.showedRooms = this.rooms.slice(start, start + this.ITEMS_PER_PAGE)
        },

        async onGetRoomList () {
            this.loading = true

            const handler = new ApiHandler()
                          .setOnResponse(res => this.rooms = res)
                          .setOnFinally(() => this.loading = false)
            await this.getRoomList(handler)
        },

        async onLoadMoreRooms () {
            const handler = new ApiHandler().setOnResponse(res => this.rooms = res)
            await this.getRoomList(handler)
        },

        getFilter () {
            this.onFilterRooms()
        },

        async onFilterRooms () {
            this.loading = true

            const handler = new ApiHandler()
                          .setOnResponse(res => this.rooms = res.posts)
                          .setOnFinally(() => this.loading = false)
            await this.filterRooms(handler)
        },
    }
}
</script>