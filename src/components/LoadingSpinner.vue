<script>
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'
  import { ref } from 'vue'
  export default {
    props: ['isLoading'],
    components: { Loading },

    setup() {
      const fullPage = ref(true)

      return { fullPage, Loading }
    },
  }
</script>

<template>
  <div>
    <Loading v-model:active="isLoading" :is-full-page="fullPage" />
  </div>
</template>
