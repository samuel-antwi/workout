<script>
  import { ref, computed, watchEffect, onMounted } from 'vue'
  import { supabase } from '../supabase/index'
  import { useRouter } from 'vue-router'
  // import store from '../store/useAuth'
  import { useUser } from '../store/useUser'
  import EyeIcon from 'vue-material-design-icons/Eye.vue'
  import EyeoffIcon from 'vue-material-design-icons/Eyeoff.vue'

  export default {
    components: { EyeIcon, EyeoffIcon },
    name: 'login',
    setup() {
      // Create data / vars
      let showPassword = ref(false)
      let passwordType = ref('password')
      const email = ref(null)
      const password = ref(null)
      const errorMsg = ref(null)

      const store = useUser()

      const router = useRouter()

      const user = computed(() => store.user)

      // A funtion to toggle password type in order to show or hide password
      const getPasswordType = () => {
        showPassword.value = !showPassword.value
        if (passwordType.value === 'password') {
          return (passwordType.value = 'text')
        }
        if (passwordType.value === 'text') {
          return (passwordType.value = 'password')
        }

        return
      }

      // If  user redirect to prifile page
      watchEffect(() => {
        if (user.value) {
          router.push({ name: 'Profile' })
        }
      })

      // Login function
      const handleLogin = async () => {
        try {
          const { user, error } = await supabase.auth.signIn({
            email: email.value,
            password: password.value,
          })
          if (error) throw error
          if (user) router.push({ name: 'Profile' })
        } catch (error) {
          console.log(error.message)
          errorMsg.value = `Error: ${error.message}`
        }
      }

      return {
        email,
        password,
        errorMsg,
        handleLogin,
        user,
        showPassword,
        passwordType,
        getPasswordType,
      }
    },
  }
</script>

<template>
  <div class="max-w-screen-sm px-4 py-10 mx-auto overflow-hidden">
    <!-- Error handling -->
    <div v-if="errorMsg" class="relative p-4 mb-10 rounded-md shadow-lg bg-light-grey">
      <p class="text-red-500">{{ errorMsg }}</p>
      <button @click="errorMsg = null" class="absolute top-0 text-lg right-2">
        &times;
      </button>
    </div>
    <!-- Login -->

    <form
      @submit.prevent="handleLogin"
      class="flex flex-col p-8 rounded-md shadow-lg bg-light-grey"
    >
      <h1 class="mb-4 text-3xl text-at-light-green">Login</h1>
      <div class="flex flex-col mb-2">
        <label class="mb-1 text-sm text-at-light-green" for="email">Email</label>
        <input
          v-model="email"
          class="p-2 text-gray-500 focus:outline-none"
          type="email"
          required
          id="email"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label class="mb-1 text-sm text-at-light-green" for="password">Password</label>
        <div class="relative">
          <input
            v-model="password"
            class="p-2 text-gray-500 focus:outline-none w-full"
            :type="passwordType"
            required
            id="password"
          />
          <button type="button" @click="getPasswordType" class="absolute right-4 top-2">
            <EyeIcon v-if="showPassword" />
            <EyeoffIcon v-if="!showPassword" />
          </button>
        </div>
      </div>
      <button
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
        Login
      </button>
      <router-link :to="{ name: 'Register' }" class="mt-6 text-sm text-center">
        Don't have an account? <span class="text-at-light-green">Register</span>
      </router-link>
    </form>
  </div>
</template>
