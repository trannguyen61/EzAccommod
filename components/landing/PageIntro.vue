<template>
  <div class="page-intro">
    <img
      :src="require('@/assets/images/room02.jpg')"
      alt="Phòng mẫu"
      class="landing-img"
    >
    <div class="intro">
      <div class="intro--title">
        EzAccommod
      </div>
      <div class="intro--text">
        Hệ thống tìm nhà trọ hiện đại được thành lập và vận hành bởi <strong>AccommodCorp</strong>. <br>
        Nhà trọ lý tưởng <i>chưa bao giờ</i> gần bạn đến thế 👉👈 <br>
        <button
          v-ripple
          class="intro--btn custom-btn custom-btn--text custom-btn__densed"
          @click="$router.push('#rooms')"
        >
          Khám phá ngay <v-icon class="icon">
            fas fa-chevron-right
          </v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>