<template>
  <div class="landing">
    <page-intro />
    <main>
      <room-filter />
      <div class="room-list">
        <room-list-item />
        <button
          v-ripple
          class="see-more-btn custom-btn custom-btn--text custom-btn__densed"
        >
          Xem thêm<br>
          <v-icon>fas fa-chevron-down</v-icon>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import PageIntro from '@/components/landing/PageIntro'
import RoomFilter from '@/components/landing/RoomFilter'
import RoomListItem from '@/components/landing/RoomListItem'

export default {
    components: { PageIntro, RoomFilter, RoomListItem }
}
</script>