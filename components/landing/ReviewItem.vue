<template>
  <div class="room-list-item comment-item">
    <div class="content">
      <div class="title">
        {{ comment.title }}
      </div>
      <div class="subtitle">
        {{ comment.owner }}
      </div>
      <v-rating
        empty-icon="far fa-star"
        full-icon="fas fa-star"
        color="warning"
        background-color="warning"
        length="5"
        size="24"
        readonly
        :value="comment.star"
      />
      <div class="text">
        <div class="detail">
          {{ comment.content }}
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