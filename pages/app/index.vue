<script>
export default {
    middleware ({ redirect, store }) {
      if (!store.getters['user/loggedIn']) {
        redirect('/auth/login')
      } else {
        const user = store.getters['user/user']
        redirect('/app/favorite')
      }
    }
}
</script>