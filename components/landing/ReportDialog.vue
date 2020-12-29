<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card class="report-dialog">
      <v-card-title class="headline">
        Báo cáo vi phạm
      </v-card-title>

      <div class="card-content">
        <v-checkbox
          v-for="violation in violations"
          :key="violation.id"
          v-model="report"
          :label="violation.text"
          :value="violation.id"
          hide-details
        />
        <v-textarea
          v-model="detail"
          label="Chi tiết"
        />
      </div>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <button
          v-ripple
          class="custom-btn custom-btn--text mr-3"
          @click="close"
        >
          Hủy
        </button>
        <button
          v-ripple
          class="custom-btn custom-btn--text custom-btn__densed"
          :disabled="!report.length"
          @click="onReportRoom"
        >
          {{ !loading ? 'Gửi báo cáo' : '' }}
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
          />
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ROOM_VIOLATIONS } from '@/consts/consts'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    props: {
        id: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            dialog: false,
            loading: false,
            report: [],
            detail: '',
            violations: ROOM_VIOLATIONS
        }
    },

    methods: {
        ...mapActions({
            reportRoom: 'room/reportRoom'
        }),

        async onReportRoom () {
            this.loading = true

            const data = { 
              post_id: this.id,
              data: {
                report: this.report,
                detail: this.detail
              }
            }
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnFinally(() => {
                              this.loading = false
                              this.close()
                            })
            await this.reportRoom(handler)
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