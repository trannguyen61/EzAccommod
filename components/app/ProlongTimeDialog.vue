<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card style="overflow: hidden;">
      <v-card-title class="headline">
        Gia hạn bài đăng sau ngày {{ dueDate }}
      </v-card-title>

      <div class="card-content">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-model="time"
              :items="defaultInfo.defaultTimeFrame"
              item-text="name"
              item-value="days"
              label="Thời gian hiển thị bài đăng"
              placeholder="6 tháng"
              class="ml-8 mr-4"
              @change="onGetPostFee"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              :value="expiredAt"
              readonly
              label="Ngày hết hạn"
              class="mr-8 ml-4"
            />
          </v-col>
        </v-row>

        <v-text-field
          :value="postFee"
          readonly
          label="Phí hiển thị bài đăng (bổ sung)"
          class="mt-6 mx-8"
        />
      </div>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <button
          v-ripple
          class="custom-btn custom-btn--text mx-5"
          @click="close"
        >
          Hủy
        </button>
        <button
          v-ripple
          :disabled="!time || !postFee"
          class="custom-btn custom-btn--text custom-btn__densed"
          @click="onProlongTimePost"
        >
          Gia hạn
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { DEFAULT_TIME_FRAME } from '@/consts/consts'
import { addDays } from '@/helpers/dateHelper'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    props: {
      post: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        return {
            dialog: false,
            time: null,
            postFee: null,
            expiredAt: null,
            defaultInfo: {
              defaultTimeFrame: DEFAULT_TIME_FRAME
            }
        }
    },

    computed: {
      dueDate () {
        return this.post ? this.post.dueDate : ''
      }
    },

    watch: {
      time () {
          if (!this.post) return

          const now = new Date(this.post.expiredAt)
          const expiredAt = addDays(now, this.timeFrame).toISOString()

          this.expiredAt = expiredAt
      }
    },

    methods: {
        ...mapActions({
            getPostFee: 'room/getPostFee',
            prolongTimePost: 'room/prolongTimePost'
        }),

        async onGetPostFee () {
            const data = { time: this.time }
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => {
                                this.postFee = res
                            })
            await this.getPostFee(handler)
        },

        async onProlongTimePost () {
            const data = { time: this.time }
            const handler = new ApiHandler()
                            .setData(data)
            await this.getPostFee(handler)
        },

        open () {
            this.dialog = true
        },

        close () {
            this.dialog = false
        }
    }
}
</script>