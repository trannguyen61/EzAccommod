<template>
<div>
  <notifications position="top right"/>
  <v-app>
    <custom-navbar/>
    <v-container fluid>
      <Nuxt />
    </v-container>  
  </v-app>
</div>
</template>

<script>
import CustomNavbar from '@/components/CustomNavbar'

export default {
    components: { CustomNavbar }
}
</script>
