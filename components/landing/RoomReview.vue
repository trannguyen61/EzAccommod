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
        v-for="(cmt, i) in showedReviews"
        :key="i"
        :comment="cmt"
      />
      <v-pagination
        v-if="!!reviews"
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
      reviews: {
        type: Array,
        default: () => ([])
      }
    },

    data () {
        return {
            loading: false,
            submitLoading: false,
            showedReviews: [],
            star: 3,
            title: '',
            content: '',
            currentPage: 1,
            ITEMS_PER_PAGE: 3
        }
    },

    computed: {
        commentRules () {
            return [v => v.length <= 450 || 'Tối đa 450 ký tự.']
        },

        totalPage () {
          if (!this.reviews) return 0
          return Math.ceil(this.reviews.length / this.ITEMS_PER_PAGE)
        },
    },

    watch: {
      currentPage () {
          this.getCurrentPageRooms()
        },

        reviews: {
          handler () {
            this.getCurrentPageRooms()
          },
          deep: true
        },
    },

    methods: {
        ...mapActions({
            submitReview: 'room/submitReview'
        }),

        getCurrentPageRooms () {
          const start = this.ITEMS_PER_PAGE * ( this.currentPage - 1 )
          this.showedReviews = this.reviews.slice(start, start + this.ITEMS_PER_PAGE)
        },

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

        emptyForm () {
          this.star = 3
          this.title = ''
          this.content = ''
        }
    }
}
</script>