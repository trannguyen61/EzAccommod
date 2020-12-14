<template>
  <v-simple-table class="room-preview-table mx-8">
    <template #default>
      <thead>
        <tr>
          <th class="text-left">
            STT
          </th>
          <th class="text-left">
            Số phòng
          </th>
          <th class="text-left">
            Diện tích
          </th>
          <th class="text-left">
            Giá thuê
          </th>
          <th class="text-left">
            Cơ sở vật chất
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(room, i) in rooms"
          :key="i"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ room.roomNum }}</td>
          <td>{{ room.square }} m<sup>2</sup></td>
          <td>{{ room.price }} VNĐ</td>
          <td>
            <ul class="facilities ml-auto mr-auto">
              <li
                v-for="(fac, i) in room.services"
                :key="i"
              >
                {{ defaultRoom.roomFacilities.find(e => e.value == fac) ? 
                  defaultRoom.roomFacilities.find(e => e.value == fac).name : 
                  '' }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { ROOM_FACILITIES } from '@/consts/consts'

export default {
    props: {
        rooms: {
            type: Array,
            required: true
        }
    },

    data () {
        return {
            defaultRoom: {
                roomFacilities: ROOM_FACILITIES
            }
        }
    }
}
</script>

<style>

</style>