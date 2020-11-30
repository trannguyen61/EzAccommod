<template>
  <div class="filter">
    <div class="filter--title">
      Filter
      <v-btn
        v-if="$vuetify.breakpoint.smAndDown"
        icon
        @click="showFilter = !showFilter"
      >
        <transition
          name="spin"
          mode="out-in"
        >
          <v-icon
            v-if="!showFilter"
            key="1"
            color="dark"
          >
            fas fa-chevron-down
          </v-icon>
          <v-icon
            v-else
            key="2"
            color="dark"
          >
            fas fa-chevron-up
          </v-icon>
        </transition>
      </v-btn>
    </div>

    <transition
      name="slide-down"
      mode="out-in"
    >
      <div
        v-if="showFilter"
        class="filter-items"
      >
        <v-divider class="my-3" />
        <div class="filter--item">
          <div class="item-title">
            Vị trí
          </div>
          <div class="item--input">
            <v-select
              :items="[1, 2, 3]"
              label="Thành phố"
              outlined
              hide-details
              dense
              class="mb-2"
            />
            <v-select
              :items="[1, 2, 3]"
              label="Quận/huyện"
              outlined
              hide-details
              dense
              class="mb-2"
            />
            <v-select
              :items="[1, 2, 3]"
              label="Phường"
              outlined
              hide-details
              dense
              class="mb-2"
            />
          </div>
        </div>

        <v-divider class="my-3" />
        <div class="filter--item">
          <div class="item-title">
            Giá thuê/tháng (nghìn đồng)
          </div>
          <div class="item--input">
            <v-range-slider
              v-model="filter.price"
              color="dark"
              step="100"
              :min="defaultRoom.roomPriceRanges[0]"
              :max="defaultRoom.roomPriceRanges[1]"
              :thumb-label="true"
              :thumb-color="'primary'"
            />
          </div>
        </div>

        <v-divider class="my-3" />
        <div class="filter--item">
          <div class="item-title">
            Loại phòng
          </div>
          <div class="item--input">
            <v-select
              v-model="filter.roomTypes"
              :items="defaultRoom.roomTypes"
              item-value="value"
              item-text="name"
              multiple
              chips
              hide-details
              outlined
              dense
              placeholder="Chọn"
            />
          </div>
        </div>

        <v-divider class="my-3" />
        <div class="filter--item">
          <div class="item-title">
            Diện tích (m2)
          </div>
          <div class="item--input">
            <v-range-slider
              v-model="filter.square"
              color="dark"
              step="10"
              :min="defaultRoom.roomSquareRanges[0]"
              :max="defaultRoom.roomSquareRanges[1]"
              :thumb-label="true"
              :thumb-color="'primary'"
            />
          </div>
        </div>

        <v-divider class="my-3" />
        <div class="filter--item">
          <div class="item-title">
            Cơ sở vật chất
          </div>
          <div class="item--input">
            <v-select
              v-model="filter.facilities"
              :items="defaultRoom.roomFacilities"
              item-value="value"
              item-text="name"
              multiple
              chips
              hide-details
              outlined
              dense
              placeholder="Chọn"
            />
          </div>
        </div>
      </div>
    </transition>

    <button
      v-ripple
      class="custom-btn custom-btn--text custom-btn__densed mt-4"
      @click="onFilterRoom"
    >
      Tìm kiếm
    </button>
  </div>
</template>

<script>
import { ROOM_PRICE_RANGE, ROOM_TYPES, ROOM_SQUARE_RANGE, ROOM_FACILITIES } from '@/consts/consts'

export default {
    data () {
        return {
            showFilter: this.$vuetify.breakpoint.mdAndUp, 
            filter: {
                price: [500, 7000],
                roomTypes: [],
                square: [10, 100],
                facilities: []
            },
            defaultRoom: {
                roomPriceRanges: ROOM_PRICE_RANGE,
                roomTypes: ROOM_TYPES,
                roomSquareRanges: ROOM_SQUARE_RANGE,
                roomFacilities: ROOM_FACILITIES
            }
        }
    },

    methods: {
      onFilterRoom () {
        this.$emit('filter', this.filter)
      }
    }
}
</script>