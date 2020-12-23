<template>
  <div class="filter-page">
    <room-filter @filtered="getFilter" />
    <v-row class="room-list">
      <v-col>
        <p
          v-if="!rooms.length"
          class="empty-warning"
        >
          Không tìm thấy kết quả phù hợp!
        </p>
      </v-col>
      <v-col
        v-for="room in rooms"
        :key="room.id"
        cols="12"
        md="4"
      >
        <filter-item :room="room" />
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
            rooms: []
        }
    },

    computed: {
        ...mapGetters({
            filter: 'room/filter'
        })
    },

    mounted () {
      this.onFilterRooms()
    },

    methods: {
        ...mapActions({
            getRoomList: 'room/getRoomList',
            filterRooms: 'room/filterRooms'
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