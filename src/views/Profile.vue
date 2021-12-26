<script>
  import { useUser } from '../store/useUser'
  import { computed } from 'vue'
  export default {
    setup() {
      const store = useUser()
      const userEmail = computed(() => store.getUserEmail)

      return { userEmail, store }
    },
  }
</script>

<template>
  <div class="max-w-5xl mx-auto mt-20 text-center">
    <h2>
      Welcome back <span class="text-red-700">{{ userEmail }}</span>
    </h2>
  </div>
</template>

<style scoped></style>
