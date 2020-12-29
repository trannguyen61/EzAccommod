<script>
export default {
    middleware ({ redirect, store }) {
      if (!store.getters['user/loggedIn']) {
        redirect('/auth/login')
      } else if (store.getters['user/isRenter']) {
        redirect('/app/favorite')
      } else if (store.getters['user/isOwner']) {
        redirect('/app/post-list')
      } else {
        store.dispatch('user/logout')
        redirect('/')
      }
    }
}
</script>