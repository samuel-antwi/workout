<script>
  // import store from '../store/useAuth'
  import { useUser } from '../store/useUser'
  import { useRouter } from 'vue-router'
  import { computed, watchEffect } from 'vue'
  export default {
    setup() {
      const store = useUser()
      const router = useRouter()
      const userEmail = computed(() => store.getUserEmail)
      const user = computed(() => store.user)

      watchEffect(() => {
        if (!user.value) {
          router.push({ name: 'Login' })
        }
      })

      return { userEmail, store, user }
    },
  }
</script>

<template>
  <div v-if="user" class="max-w-5xl mx-auto mt-20 text-center">
    <h2>
      Welcome back <span class="text-red-700">{{ userEmail }}</span>
    </h2>
  </div>
</template>

<style scoped></style>
