<template>
  <div
    class="room-list-item filter-item"
  >
    <div
      class="title-group"
      @click="$router.push(`/${room.id}`)"
    >
      <div class="title">
        {{ defaultRoom.roomTypes.find(e => e.id == room.type).name || '' }}
        <v-icon
          color="dark"
          class="icon"
        >
          fas fa-chevron-right
        </v-icon>
      </div>
      <img
        :src="require('@/assets/images/room01.jpg')"
        alt=""
        class="img"
      >
      <div class="price">
        {{ room.price }} đồng/tháng
      </div>
    </div>
    <v-divider class="my-3" />
    <div class="detail">
      {{ room.address }} <br>
      {{ room.detailedAddress }}
    </div>
    <v-btn
      icon
      class="favorite"
      @click="onFavoriteRoom"
    >
      <v-icon
        v-if="!room.favorite"
        color="primary"
      >
        far fa-heart
      </v-icon>
      <v-icon
        v-else
        color="primary"
      >
        fas fa-heart
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { ROOM_TYPES } from '@/consts/consts'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    props: {
        room: {
            type: Object,
            required: true
        }
    },

    data () {
        return {
            defaultRoom: {
                roomTypes: ROOM_TYPES
            }
        }
    },

    methods: {
      ...mapActions({
        favoriteRoom: 'room/favoriteRoom'
      }),

      async onFavoriteRoom () {
        const data = {}
        const handler = new ApiHandler().setData(data)
        await this.favoriteRoom(handler)
      }
    }
}
</script>