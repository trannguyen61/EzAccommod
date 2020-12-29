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
              v-model="filter.address.city"
              :items="defaultInfo.cities"
              item-text="name"
              item-value="id"
              label="Thành phố"
              outlined
              hide-details
              dense
              class="mb-2"
            />
            <v-select
              v-model="filter.address.district"
              :items="defaultInfo.hanoiDistricts"
              item-text="name"
              item-value="id"
              :disabled="!filter.address.city"
              label="Quận/huyện"
              outlined
              hide-details
              dense
              class="mb-2"
            />
            <v-select
              v-model="filter.address.ward"
              :items="defaultInfo.hanoiWards"
              item-text="name"
              item-value="id"
              :disabled="!filter.address.district"
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
              :min="defaultInfo.roomPriceRanges[0]"
              :max="defaultInfo.roomPriceRanges[1]"
              :thumb-label="true"
              :thumb-color="'primary'"
              hide-details
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
              v-model="filter.type"
              :items="defaultInfo.roomTypes"
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
              :min="defaultInfo.roomAreaRange[0]"
              :max="defaultInfo.roomAreaRange[1]"
              :thumb-label="true"
              :thumb-color="'primary'"
              hide-details
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
              :items="defaultInfo.roomFacilities"
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
import { ROOM_PRICE_RANGE, ROOM_TYPES, ROOM_SQUARE_RANGE, ROOM_FACILITIES, CITIES, HANOI_DISTRICTS, HANOI_WARDS } from '@/consts/consts'
import { mapMutations } from 'vuex'

export default {
    data () {
        return {
            showFilter: this.$vuetify.breakpoint.mdAndUp, 
            filter: {
                price: [500, 7000],
                type: [],
                area: [0, 200],
                services: [],
                address: {
                  city: null,
                  district: null,
                  ward: null
                }
            },
            defaultInfo: {
                roomPriceRanges: ROOM_PRICE_RANGE,
                roomTypes: ROOM_TYPES,
                roomAreaRange: ROOM_SQUARE_RANGE,
                roomFacilities: ROOM_FACILITIES,
                cities: CITIES, 
                hanoiDistricts: HANOI_DISTRICTS,
                hanoiWards: HANOI_WARDS
            }
        }
    },

    watch: {
      'filter.address.district': {
        handler() {
          this.defaultInfo.hanoiWards = HANOI_WARDS.filter(e =>  e.district == this.filter.address.district )
        },
        deep: true
      },
    },

    methods: {
      ...mapMutations({
        setFilter: 'room/setFilter'
      }),

      onFilterRoom () {
        const filter = this.onTransformData()
        this.setFilter(filter)

        this.$emit('filtered')
      },

      onTransformData () {
        const address = {}
        Object.keys(this.filter.address).forEach(e => {
          if (this.filter.address[e]) {
            address[e] = this.filter.address[e]
          }
        })

        const minPrice = ( this.filter.price[0] * 1000 ) + ""
        const maxPrice = ( this.filter.price[1] * 1000 ) + ""

        const filter = {
          address,
          minArea: this.filter.area[0],
          maxArea: this.filter.area[1],
          minPrice,
          maxPrice
        }

        if (this.filter.services.length) filter.services = this.filter.services
        if (this.filter.type.length) filter.type = this.filter.type

        return filter
      }
    }
}
</script>