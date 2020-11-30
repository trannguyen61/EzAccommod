<template>
  <div class="room-list-item comment-item">
    <div class="content">
      <div class="title">
        {{ comment.owner }}
      </div>
      <v-rating
        empty-icon="far fa-star"
        full-icon="fas fa-star"
        color="primary"
        background-color="primary"
        length="5"
        size="24"
        readonly
        :value="comment.rating"
      />
      <div class="text">
        <div class="detail">
          {{ comment.comment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    }
}
</script>