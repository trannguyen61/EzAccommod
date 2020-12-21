<template>
  <div class="filter-page">
    <room-filter @filtered="getFilter" />
    <v-row class="room-list">
      <v-col
        v-for="room in rooms"
        :key="room.id"
        cols="2"
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
            rooms: [{
                id: '123',
                type: 1,
                roomNum: 2,
                area: 30,
                address: 'Giữa Hồ Gươm - Hoàn Kiếm - Hà Nội',
                detailedAddress: 'Cạnh vườn hoa Lý Thái Tổ',
                price: '1.000.000',
                services: [1, 2, 3]
            }]
        }
    },

    computed: {
        ...mapGetters({
            filter: 'room/filter'
        })
    },

    mounted () {

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