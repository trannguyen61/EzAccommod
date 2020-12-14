<template>
  <v-stepper
    v-model="step"
  >
    <v-stepper-header>
      <v-stepper-step
        :complete="step > 1"
        step="1"
      >
        Thông tin cơ bản
      </v-stepper-step>

      <v-divider />

      <v-stepper-step
        :complete="step > 2"
        step="2"
      >
        Thông tin chi tiết
      </v-stepper-step>

      <v-divider />

      <v-stepper-step
        step="3"
      >
        Thêm phòng
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form v-model="formValue1">
          <div class="d-flex">
            <v-text-field
              :value="'Nakayama Haruki'"
              readonly
              label="Họ tên chủ trọ"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
            <v-text-field
              :value="'113'"
              readonly
              label="Số điện thoại liên lạc"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
          </div>

          <div class="d-flex">
            <v-select
              v-model="form.time"
              :rules="requiredField()"
              :items="['1 tuần', '1 tháng', 'Từ giờ cho đến mãi sau này']"
              label="Thời gian hiển thị bài đăng"
              placeholder="6 tháng"
              class="mt-6 mx-8"
              style="width: 100%;"
              @change="onGetPostFee"
            />

            <v-text-field
              :value="postFee"
              readonly
              label="Phí hiển thị bài đăng"
              class="mt-6 mx-8"
              style="width: 100%;"
            />
          </div>
        </v-form>

        <button
          v-ripple
          type="button"
          :disabled="!formValue1"
          class="custom-btn custom-btn--text custom-btn__densed ml-8 my-4"
          @click="step = 2"
        >
          Tiếp tục
        </button>

        <button
          v-ripple
          type="button"
          class="custom-btn custom-btn--text"
          @click="step -= 1"
        >
          Lùi về
        </button>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-form v-model="formValue2">
          <v-row>
            <v-col>
              <div class="d-flex">
                <v-select
                  v-model="form.city"
                  :items="[1, 2, 3]"
                  :rules="requiredField()"
                  label="Tỉnh/Thành phố"
                  class="mt-6 mx-8"
                  style="width: 100%;"
                />
                <v-select
                  v-model="form.district"
                  :items="[1, 2, 3]"
                  :rules="requiredField()"
                  label="Quận/Huyện/Thị xã"
                  class="mt-6 mx-8"
                  style="width: 100%;"
                />
              </div>
              <div class="d-flex">
                <v-select
                  v-model="form.ward"
                  :items="[1, 2, 3]"
                  :rules="requiredField()"
                  label="Phường"
                  class="mt-6 mx-8"
                  style="width: 100%;"
                />
                <v-text-field
                  v-model="form.detailAddress"
                  :rules="requiredField()"
                  label="Địa chỉ cụ thể"
                  placeholder="Số 1 Phạm Văn Đồng"
                  class="mt-6 mx-8"
                  style="width: 100%;"
                />
              </div>
              <v-text-field
                v-model="form.addressDescription"
                label="Miêu tả địa chỉ"
                placeholder="Gần trường Đại học Công nghệ"
                class="mt-6 mx-8"
              />
              <v-select
                v-model="form.type"
                :items="[1, 2, 3]"
                :rules="requiredField()"
                label="Loại phòng"
                class="mt-6 mx-8"
              />
            </v-col>

            <v-col class="d-flex flex-column align-center">
              <upload-file
                :default-preview-imgs="previewImgs"
                @upload-imgs="uploadImgs"
                @delete-imgs="deleteImgs"
              />
              <small>Ảnh khái quát về nhà cho thuê</small>
            </v-col>
          </v-row>
        </v-form>

        <button
          v-ripple
          type="button"
          :disabled="!formValue2"
          class="custom-btn custom-btn--text custom-btn__densed ml-8 my-4"
          @click="step = 3"
        >
          Tiếp tục
        </button>

        <button
          v-ripple
          type="button"
          class="custom-btn custom-btn--text"
          @click="step -= 1"
        >
          Lùi về
        </button>
      </v-stepper-content>

      <v-stepper-content step="3">
        <div class="post-room-list">
          <button
            v-ripple
            type="button"
            class="d-block custom-btn custom-btn--text custom-btn__densed ml-auto"
            @click="onOpenAddRoomDialog"
          >
            Thêm phòng
          </button>

          <room-preview-table :rooms="form.rooms" />
        </div>
        <button
          v-ripple
          type="button"
          :disabled="!formValue1"
          class="custom-btn custom-btn--text custom-btn__densed ml-8 my-4"
          @click="onSubmitPost"
        >
          Hoàn tất
        </button>

        <button
          v-ripple
          type="button"
          class="custom-btn custom-btn--text"
          @click="step -= 1"
        >
          Lùi về
        </button>
      </v-stepper-content>
    </v-stepper-items>

    <create-post-dialog
      ref="create-post-dialog"
      @add-room="onAddRoom"
    />
  </v-stepper>
</template>

<script>
import UploadFile from '@/components/app/UploadFile'
import CreatePostDialog from '@/components/app/CreatePostDialog'
import RoomPreviewTable from '@/components/app/RoomPreviewTable'

import ApiHandler from '@/helpers/ApiHandler'
import validationRules from '@/helpers/validationRules'
import { mapActions } from 'vuex'

export default {
    components: { UploadFile, CreatePostDialog, RoomPreviewTable },

    props: {
        post: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        return {
            step: 1,
            formValue1: false,
            formValue2: false,
            formValue3: false,
            form: {
                city: null,
                district: null,
                ward: null,
                detailAddress: null,
                addressDescription: null,
                time: null,
                type: null,
                rooms: [{
                    id: '123',
                    type: 1,
                    roomNum: 2,
                    square: 30,
                    address: 'Giữa Hồ Gươm - Hoàn Kiếm - Hà Nội',
                    detailedAddress: 'Cạnh vườn hoa Lý Thái Tổ',
                    price: '1.000.000',
                    services: [1, 2, 3],
                    favorite: 2,
                    imgs: [ 'https://i.imgur.com/v39ykUw.jpeg' ],
                    owner: {
                        name: 'Nakayama Haruki',
                        phone: '113'
                    }
                }]
            },
            postImgs: [],
            previewImgs: [],
            imgsToDelete: [],
            postFee: null
        }
    },

    mounted () {
        this.getChosenPost()
    },

    methods: {
        ...mapActions({
            getPostFee: 'room/getPostFee'
        }),

        getChosenPost () {
            Object.keys(this.post).forEach(e => {
                this.form[e] = this.post[e]
            })
            
            if (this.form.time) this.onGetPostFee()
        },

        async onGetPostFee (time) {
            const data = { time }
            const handler = new ApiHandler()
                            .setData(data)
                            .setOnResponse(res => {
                                this.postFee = res
                            })
            await this.getPostFee(handler)
        },

        onOpenAddRoomDialog () {
          this.$refs['create-post-dialog'].open()
        },

        onAddRoom (room) {
          this.form.rooms.push(room)
        },

        uploadImgs (imgs) {
            this.postImgs = imgs
        },

        deleteImgs (img) {
            this.imgsToDelete.push(img)
        },

        onSubmitPost () {

        },

        requiredField () {
            return [validationRules.requiredField]
        }
    }
}
</script>