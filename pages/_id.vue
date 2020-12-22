<template>
  <div class="room-detail">
    <div class="show-detail">
      <v-row justify="space-around">
        <v-col
          cols="12"
          md="5"
        >
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
            class="carousel"
          >
            <v-carousel-item
              v-for="(img, i) in room.imgs"
              :key="i"
            >
              <div class="carousel-mask">
                <v-icon
                  large
                  color="primary"
                  class="carousel-look"
                  @click="openImgViewer(img)"
                >
                  fas fa-search
                </v-icon>
              </div>
              <img
                :src="require('@/assets/images/room01.jpg')"
                alt=""
                class="carousel-img"
              >
            </v-carousel-item>
          </v-carousel>

          <div class="tool">
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  class="favorite mx-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="onFavoriteRoom"
                >
                  <v-icon
                    color="primary"
                  >
                    fas fa-heart
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ room.favorite }} yêu thích</span>
            </v-tooltip>
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  class="report mx-2"
                  v-on="on"
                  @click="onReportRoom"
                >
                  <v-icon
                    color="dark"
                  >
                    fas fa-flag
                  </v-icon>
                </v-btn>
              </template>
              <span>Báo cáo</span>
            </v-tooltip>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="5"
        >
          <v-row>
            <v-col
              cols="12"
            >
              <div class="detail-list-item">
                <div class="item--title">
                  Thông tin chung
                </div>
                <div class="item--content">
                  <div>
                    <div class="item--subtitle">
                      Họ tên chủ trọ:
                    </div>
                    <div class="item--text">
                      {{ `${room.author.lastName} ${room.author.firstName}` }}
                    </div>
                  </div>
                  <div>
                    <div class="item--subtitle">
                      Số điện thoại liên lạc:
                    </div>
                    <div class="item--text">
                      {{ room.author.phoneNumber }}
                    </div>
                  </div>
                  <div>
                    <div class="item--subtitle">
                      Kiểu phòng cho thuê:
                    </div>
                    <div class="item--text">
                      {{ defaultRoom.roomTypes.find(e => e.id == room.type).name || '' }}
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
            >
              <div class="detail-list-item mt-4">
                <div class="item--title">
                  Chi tiết loại phòng
                </div>
              </div>
              <v-simple-table fixed-header>
                <template #default>
                  <tbody>
                    <tr>
                      <td>Diện tích</td>
                      <td>{{ room.rooms[0].area }} m<sup>2</sup></td>
                    </tr>

                    <tr>
                      <td>Số phòng cho thuê</td>
                      <td>{{ room.rooms[0].roomNum }} phòng</td>
                    </tr>

                    <tr>
                      <td>Địa chỉ</td>
                      <td>
                        {{ roomFullAddress }}
                      </td>
                    </tr>

                    <tr>
                      <td>Landmark</td>
                      <td>
                        {{ room.detailedAddress }}
                      </td>
                    </tr>

                    <tr>
                      <td>Cơ sở vật chất</td>
                      <td>
                        <ul class="facilities ml-auto mr-auto">
                          <li
                            v-for="fac in room.rooms[0].services"
                            :key="fac"
                          >
                            {{ defaultRoom.roomFacilities.find(e => e.value == fac).name }}
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <div class="detail-list-item mt-4">
                <div class="item--title">
                  Giá thuê <br>
                </div>
                <div class="price">
                  {{ room.rooms[0].price }} đồng/tháng
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <img-viewer
        ref="img-viewer"
      />
    </div>

    <v-row justify="center">
      <v-col
        cols="12"
        lg="6"
        md="8"
      >
        <room-review />
      </v-col>
    </v-row>

    <report-dialog
      :id="id"
      ref="report-dialog"
    />
  </div>
</template>

<script>
import RoomReview from '@/components/landing/RoomReview'
import ImgViewer from '@/components/landing/ImgViewer'
import ReportDialog from '@/components/landing/ReportDialog'

import { ROOM_TYPES, ROOM_FACILITIES, CITIES, HANOI_DISTRICTS, HANOI_WARDS } from '@/consts/consts'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    components: { RoomReview, ImgViewer, ReportDialog },

    data () {
        return {
            id: null,
            room: {},
            defaultRoom: {
                roomTypes: ROOM_TYPES,
                roomFacilities: ROOM_FACILITIES,
                cities: CITIES,
                hanoiDistricts: HANOI_DISTRICTS,
                hanoiWards: HANOI_WARDS
            }
        }
    },

    computed: {
      roomFullAddress () {
        const findCity = this.defaultRoom.cities.find(e => e.id == this.room.address.city)
        const findDistrict = this.defaultRoom.hanoiDistricts.find(e => e.id == this.room.address.district)
        const findWard = this.defaultRoom.hanoiWards.find(e => e.id == this.room.address.ward)

        const city = findCity ? findCity.name : ''
        const district = findDistrict ? findDistrict.name : ''
        const ward = findWard ? findWard.name : ''
        const road = this.room.address.road

        return `${road}, ${ward}, ${district}, ${city}`
      }
    },

    mounted () {
        this.id = this.$route.params.id
        this.onGetRoomDetail()
    },

    methods: {
        ...mapActions({
            favoriteRoom: 'room/favoriteRoom',
            getRoomDetail: 'room/getRoomDetail'
        }),

        openImgViewer (img) {
            this.$refs['img-viewer'].open(img)
        },

        async onFavoriteRoom () {
            const data = { id: this.id }
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => this.room = res)
            await this.favoriteRoom(handler)
        },

        async onReportRoom () {
            this.$refs['report-dialog'].open()
        },

        async onGetRoomDetail () {
            const data = { post_id: this.id }
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => {
                              this.room = res.post
                            })
            await this.getRoomDetail(handler)
        }
    }
}
</script>