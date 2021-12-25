<template>
  <div class="max-w-screen-sm px-4 py-10 mx-auto overflow-hidden">
    <!-- Error handling -->
    <div v-if="errorMsg" class="p-4 mb-10 rounded-md shadow-lg bg-light-grey">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <!-- Register -->

    <form
      @submit.prevent="handleRegister"
      class="flex flex-col p-8 rounded-md shadow-lg bg-light-grey"
    >
      <h1 class="mb-4 text-3xl text-at-light-green">Register</h1>
      <div class="flex flex-col mb-2">
        <label class="mb-1 text-sm text-at-light-green" for="email">Email</label>
        <input
          v-model="email"
          class="p-2 text-gray-500 focus:outline-none"
          type="text"
          required
          id="email"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label class="mb-1 text-sm text-at-light-green" for="password">Password</label>
        <input
          v-model="password"
          class="p-2 text-gray-500 focus:outline-none"
          type="password"
          required
          id="password"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label class="mb-1 text-sm text-at-light-green" for="confirm password"
          >Confirm password</label
        >
        <input
          v-model="confirmPassword"
          class="p-2 text-gray-500 focus:outline-none"
          type="password"
          required
          id="confirm password"
        />
      </div>
      <button
        @click="register"
        class="
          self-start
          px-5
          py-3
          mt-5
          text-gray-200
          rounded
          bg-at-light-green
          hover:bg-indigo-700
        "
        type="submit"
      >
        Register
      </button>
      <router-link :to="{ name: 'Login' }" class="mt-6 text-sm text-center">
        Already have an account? <span class="text-at-light-green">Login</span>
      </router-link>
    </form>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { supabase } from '../supabase/index'
  import { useRouter } from 'vue-router'

  export default {
    name: 'register',
    setup() {
      // Create data / vars

      const email = ref(null)
      const password = ref(null)
      const confirmPassword = ref(null)
      const errorMsg = ref(null)
      const router = useRouter()

      // Register function

      const handleRegister = async () => {
        if (password.value === confirmPassword.value) {
          try {
            const { error } = await supabase.auth.signUp({
              email: email.value,
              password: password.value,
            })
            console.log(email.value, password.value)
            if (error) throw error
            router.push({ name: 'Login' })
          } catch (error) {
            errorMsg.value = error.message
          }
          return
        } else {
          errorMsg.value = 'Error: Password do not match'
        }
      }

      return { email, password, confirmPassword, errorMsg, handleRegister }
    },
  }
</script>
