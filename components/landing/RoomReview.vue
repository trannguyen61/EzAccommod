<template>
  <div class="room-review">
    <div class="item--title item--title__secondary-ribbon">
      Đánh giá
    </div>
    <div class="create-review">
      <div class="create-review--rating">
        <v-rating
          v-model="rating"
          empty-icon="far fa-star"
          full-icon="fas fa-star"
          color="primary"
          background-color="primary"
          length="5"
          size="24"
        />
      </div>
      <div class="create-view--comment">
        <v-textarea
          v-model="comment"
          counter
          outlined
          :rules="commentRules"
          name="comment"
        />
        <button
          v-ripple
          class="custom-btn custom-btn--text custom-btn__densed d-block ml-auto"
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
    <v-divider class="my-4" />
    <div class="show-review" />
    <review-item
      v-for="(cmt, i) in commentList"
      :key="i"
      :comment="cmt"
    />
  </div>
</template>

<script>
import ReviewItem from '@/components/landing/ReviewItem'

export default {
    components: { ReviewItem },

    data () {
        return {
            rating: 3,
            comment: '',
            commentList: [{
                id: '123',
                owner: 'Kaji Akihiko',
                rating: 4,
                comment: 'Giao hàng qua TIKI NOW nên rất nhanh, đặt lúc 9h thì 10h30 đã có hàng. Hàng được đóng gói tốt, không có một vết bẩn :). Mình size 41 nhưng nghe mấy review trước đặt lớn hơn 1 size nên mang rất vừa chân, không bị bó.'
            }]
        }
    },

    computed: {
        commentRules () {
            return [v => v.length <= 300 || 'Tối đa 300 ký tự.']
        }
    }
}
</script>