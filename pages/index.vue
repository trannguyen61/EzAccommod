<template>
<div class="landing">
    <page-intro></page-intro>
    <room-filter></room-filter>
</div>
</template>

<script>
import PageIntro from '@/components/landing/PageIntro'
import RoomFilter from '@/components/landing/RoomFilter'

export default {
    components: { PageIntro, RoomFilter }
}
</script>