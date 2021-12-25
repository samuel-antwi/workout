<script>
  import { computed, ref } from 'vue'
  import { supabase } from '../supabase'
  import { useUser } from '../store/useUser'
  export default {
    name: 'Home',

    setup() {
      // Create data / vars

      const isLoading = ref(true)
      const data = ref([])

      const store = useUser()

      // Get data

      const getData = async () => {
        try {
          const { data: workouts, error } = await supabase.from('workouts').select('*')
          if (error) throw error
          data.value = workouts
          isLoading.value = false
          console.log(data.value)
        } catch (error) {
          console.log(error)
        }
      }

      // Run data function

      getData()

      return { getData, isLoading, data }
    },
  }
</script>

<template>
  <div v-if="!isLoading" class="max-w-5xl pt-20 mx-auto">
    <div class="no-workout" v-if="data.length === 0">
      <div>
        <h1>You currently do not have any workout.</h1>
        <router-link :to="{ name: 'Create' }">
          <div class="w-3/4 mx-auto">
            <button
              class="
                px-5
                py-3
                mt-5
                text-gray-200
                rounded
                bg-at-light-green
                hover:bg-indigo-700
              "
            >
              Create a workout
            </button>
          </div>
        </router-link>
      </div>
    </div>

    <!-- When there data -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <router-link
        v-for="workout in data"
        :key="workout.id"
        class="bg-light-grey flex flex-col items-center shadow-md rounded-md py-5 px-4"
        :to="{ name: 'WorkoutDetails', params: { workoutId: workout.id } }"
      >
        <img
          class="h-24 w-auto"
          v-if="workout.workoutType === 'cardio'"
          src="../assets/images/running-light-green.png"
          alt="Running"
        />
        <img
          class="h-24 w-auto"
          v-else
          src="../assets/images/dumbbell-light-green.png"
          alt="Running"
        />
        <p class="bg-at-light-green rounded-md text-gray-200 p-2 my-5">
          {{ workout.workoutType }}
        </p>
        <p class="text-at-light-green">
          {{ workout.workoutName }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .no-workout {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-content: center;
  }
</style>
