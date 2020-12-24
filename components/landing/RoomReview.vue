<template>
  <div class="room-review">
    <div class="item--title item--title__secondary-ribbon">
      Đánh giá
    </div>
    <div class="create-review">
      <div class="create-review--rating">
        <v-rating
          v-model="star"
          empty-icon="far fa-star"
          full-icon="fas fa-star"
          color="warning"
          background-color="warning"
          length="5"
          size="24"
        />
      </div>
      <div class="create-view--comment">
        <v-text-field
          v-model="title"
          outlined
          label="Tiêu đề đánh giá"
          hide-details
          class="mb-3"
        />
        <v-textarea
          v-model="content"
          counter
          outlined
          :rules="commentRules"
          name="comment"
          label="Nội dung đánh giá"
        />
        
        <button
          v-ripple
          class="custom-btn custom-btn--text custom-btn__densed d-block ml-auto"
          :disabled="submitLoading"
          @click="onSubmitReview"
        >
          {{ !submitLoading ? 'Gửi đánh giá' : '' }}
          <v-progress-circular
            v-if="submitLoading"
            indeterminate
            color="primary"
          />
        </button>
      </div>
    </div>
    <v-divider class="my-4" />
    <div class="show-review" />
    <template v-if="!loading">
      <review-item
        v-for="(cmt, i) in commentList"
        :key="i"
        :comment="cmt"
      />
      <v-pagination
        v-model="currentPage"
        :length="totalPage"
      />
    </template>
    <template v-else>
      <v-skeleton-loader
        max-height="300"
        type="image, article"
      />
    </template>
  </div>
</template>

<script>
import ReviewItem from '@/components/landing/ReviewItem'

import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    components: { ReviewItem },

    props: {
      post: {
        type: Object,
        default: () => ({})
      }
    },

    data () {
        return {
            loading: false,
            submitLoading: false,
            star: 3,
            title: '',
            content: '',
            commentList: [{
                id: '123',
                title: 'Nhu cut',
                owner: 'Kaji Akihiko',
                star: 4,
                content: 'Giao hàng qua TIKI NOW nên rất nhanh, đặt lúc 9h thì 10h30 đã có hàng. Hàng được đóng gói tốt, không có một vết bẩn :). Mình size 41 nhưng nghe mấy review trước đặt lớn hơn 1 size nên mang rất vừa chân, không bị bó.'
            }],
            currentPage: 1,
            totalPage: 1
        }
    },

    computed: {
        commentRules () {
            return [v => v.length <= 450 || 'Tối đa 450 ký tự.']
        },

        postId () {
          return this.post ? this.post._id : ''
        }
    },

    methods: {
        ...mapActions({
            submitReview: 'room/submitReview',
            getReviews: 'room/getReviews'
        }),

        async onSubmitReview () {
            this.submitLoading = true

            const data = {
                data: {
                  star: this.star,
                  title: this.title,
                  content: this.content
                },
                post_id: this.postId
            }
            const handler = new ApiHandler()
                          .setData(data)
                          .setOnResponse(() => {
                            this.emptyForm()
                          })
                          .setOnFinally(() => {
                            this.submitLoading = false
                          })
            await this.submitReview(handler)
        },

        async onGetReviews () {
            this.loading = true

            const handler = new ApiHandler()
                            .setOnResponse(res => this.commentList = res)
                            .setOnFinally(() => {
                              this.loading = false
                            })
            await this.submitReview(handler)
        },

        emptyForm () {
          this.star = 3
          this.title = ''
          this.content = ''
        }
    }
}
</script>