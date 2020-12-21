<template>
  <div>
    <v-simple-table
      fixed-header
      class="room-preview-table mx-8"
    >
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
            style="cursor: pointer"
            @click="onEditRoom(room)"
          >
            <td>{{ i + 1 }}</td>
            <td>{{ room.roomNum }}</td>
            <td>{{ room.area }} m<sup>2</sup></td>
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

    <edit-post-dialog
      ref="edit-post-dialog"
      :post="editRoom"
    />
  </div>
</template>

<script>
import EditPostDialog from '@/components/app/EditPostDialog'

import { ROOM_FACILITIES } from '@/consts/consts'

export default {
    components: { EditPostDialog },

    props: {
        rooms: {
            type: Array,
            required: true
        }
    },

    data () {
        return {
            editRoom: null,
            defaultRoom: {
                roomFacilities: ROOM_FACILITIES
            }
        }
    },

    methods: {
      onEditRoom (row) {
        this.editRoom = row
        this.$refs['edit-post-dialog'].open()
      }
    }
}
</script>

<style>

</style>