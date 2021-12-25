<script>
  import { supabase } from '../supabase'
  import { useRouter } from 'vue-router'
  // import store from '../store/useAuth'
  import { useUser } from '../store/useUser'
  import { computed } from 'vue'
  export default {
    setup() {
      // Get router
      const router = useRouter()

      const store = useUser()

      // Get user from store

      const user = computed(() => store.user)

      // Setup ref to router

      // Logout function

      const handleLogOut = async () => {
        await supabase.auth.signOut()
        router.push({ name: 'Home' })
      }

      return { handleLogOut, user, store }
    },
  }
</script>

<template>
  <header class="text-white bg-at-light-green">
    <nav class="container flex flex-col items-center gap-4 px-4 py-5 sm:flex-row">
      <router-link :to="{ name: 'Home' }">
        <div class="flex items-center gap-x-5">
          <img class="w-10" src="../assets/images/dumbbell-light.png" alt="Dumbell" />
          <h1>Active Tracker</h1>
        </div>
      </router-link>
      <div class="flex justify-end flex-1 gap-x-10">
        <router-link v-if="user" :to="{ name: 'Profile' }">Profile</router-link>
        <router-link v-if="user" :to="{ name: 'Create' }">Create</router-link>
        <router-link v-if="!user" :to="{ name: 'Login' }">Login</router-link>
        <button v-if="user" @click="handleLogOut" class="cursor-pointer">Logout</button>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
