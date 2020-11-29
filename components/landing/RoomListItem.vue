<template>
  <div
    class="room-list-item"
  >
    <img
      :src="require('@/assets/images/room01.jpg')"
      alt=""
      class="img"
    >
    <div class="content">
      <div
        class="title-group"
        @click="$router.push(`${room.id}`)"
      >
        <div class="title">
          {{ defaultRoom.roomTypes.find(e => e.value == room.type).name || '' }}
          <v-icon
            color="dark"
            class="icon"
          >
            fas fa-chevron-right
          </v-icon>
        </div>
        <div class="subtitle-2">
          {{ room.square }} m<sup>2</sup> - {{ room.roomNum }} phòng
        </div>
        <div class="price">
          {{ room.price }} đồng/tháng
        </div>
      </div>
      <v-divider class="my-3" />
      <div class="text">
        <div class="detail">
          {{ room.address }} <br>
          {{ room.detailedAddress }}
        </div>
        <ul class="facilities ml-auto mr-auto">
          <li
            v-for="fac in room.facilities"
            :key="fac"
          >
            {{ defaultRoom.roomFacilities.find(e => e.value == fac).name }}
          </li>
        </ul>
      </div>
      <v-btn
        icon
        class="favorite"
      >
        <v-icon color="primary">
          fas fa-heart
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { ROOM_TYPES, ROOM_FACILITIES } from '@/consts/consts'
export default {
    props: {
        room: {
            type: Object,
            default: () => ({
                id: '123',
                type: 1,
                roomNum: 2,
                square: 30,
                address: 'Giữa Hồ Gươm - Hoàn Kiếm - Hà Nội',
                detailedAddress: 'Cạnh vườn hoa Lý Thái Tổ',
                price: '1.000.000',
                facilities: [1, 2, 3]
            })
        }
    },

    data () {
        return {
            defaultRoom: {
                roomTypes: ROOM_TYPES,
                roomFacilities: ROOM_FACILITIES
            }
        }
    }
}
</script>