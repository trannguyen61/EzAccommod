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
        class="filter--items"
      >
        <v-divider class="my-3" />
        <div class="filter--item">
          <div class="item-title">
            Vị trí
          </div>
          <div class="item--input">
            <v-select
              v-model="filter.city"
              :items="[1, 2, 3]"
              label="Thành phố"
              outlined
              hide-details
              dense
              class="mb-2"
            />
            <v-select
              v-model="filter.district"
              :items="[1, 2, 3]"
              :disabled="!filter.city"
              label="Quận/huyện"
              outlined
              hide-details
              dense
              class="mb-2"
            />
            <v-select
              v-model="filter.ward"
              :items="[1, 2, 3]"
              :disabled="!filter.district"
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
              item-value="id"
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
              v-model="filter.area"
              color="dark"
              step="10"
              :min="defaultRoom.roomAreaRange[0]"
              :max="defaultRoom.roomAreaRange[1]"
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
              v-model="filter.services"
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

        <button
          v-ripple
          class="custom-btn custom-btn--text custom-btn__densed mt-4"
          @click="onFilterRoom"
        >
          Tìm kiếm
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { ROOM_PRICE_RANGE, ROOM_TYPES, ROOM_SQUARE_RANGE, ROOM_FACILITIES } from '@/consts/consts'
import { mapMutations } from 'vuex'

export default {
    data () {
        return {
            showFilter: this.$vuetify.breakpoint.mdAndUp, 
            filter: {
                price: [500, 7000],
                roomTypes: [],
                area: [10, 100],
                services: [],
                city: null,
                district: null,
                ward: null
            },
            defaultRoom: {
                roomPriceRanges: ROOM_PRICE_RANGE,
                roomTypes: ROOM_TYPES,
                roomAreaRange: ROOM_SQUARE_RANGE,
                roomFacilities: ROOM_FACILITIES
            }
        }
    },

    methods: {
      ...mapMutations({
        setFilter: 'room/setFilter'
      }),

      onFilterRoom () {
        this.$emit('filtered')
        this.setFilter(this.filter)
      }
    }
}
</script>