<script>
  import Navigation from './components/Navigation.vue'
  import { ref } from 'vue'
  import { supabase } from './supabase'
  // import store from './store/useAuth'
  import { useUser } from './store/useUser'
  export default {
    components: { Navigation },
    setup() {
      // Create data / vars
      const user = supabase.auth.user()

      const store = useUser()

      // Check to see if user is already logged in
      const appReady = ref(null)
      // If user does not exist, need to make app ready
      if (!user) {
        appReady.value = true
      }
      // Runs when there is a auth state change

      // if user is logged in, this will fire
      supabase.auth.onAuthStateChange((_, session) => {
        // store.methods.setUser(session)
        store.setUser(session)
        appReady.value = true
      })

      return {
        appReady,
        store,
      }
    },
  }
</script>

<template>
  <div v-if="appReady">
    <Navigation />
    <router-view />
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');
</style>
