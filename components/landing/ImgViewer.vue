<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    content-class="img-viewer-dialog"
  >
    <v-card>
      <img :src="img">
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    data () {
        return {
            dialog: false,
            img: ''
        }
    },

    methods: {
        open (img) {
            this.dialog = true
            this.img = img
        },

        close () {
            this.dialog = false
        }
    }
}
</script>