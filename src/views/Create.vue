<script>
  import { watchEffect, computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  // import store from '../store/useAuth'
  import { uid } from 'uid'
  import { useUser } from '../store/useUser'
  import StrengthInput from '../components/StrengthInput.vue'
  import CardioInput from '../components/CardioInput.vue'
  import { supabase } from '../supabase'
  export default {
    name: 'create',
    components: {
      StrengthInput,
      CardioInput,
    },
    setup() {
      const store = useUser()
      const router = useRouter()
      // Get User from store
      const user = computed(() => store.user)

      // Redirect to Login page if user is not logged in

      watchEffect(() => {
        if (!user.value) {
          router.push({ name: 'Login' })
        }
      })

      // Create data

      const workoutName = ref(null)
      const workoutType = ref('Select workout')
      const exercises = ref([])
      const statusMsg = ref(null)
      const errorMsg = ref(null)

      // Add exercise

      const addExercise = () => {
        if (workoutType === 'strength') {
          exercises.value.push({
            id: uid(),
            exercise: '',
            sets: '',
            reps: '',
            weight: '',
          })
        } else {
          exercises.value.push({
            id: uid(),
            exerciseType: '',
            distance: '',
            duration: '',
            pace: '',
          })
        }
      }

      // Delete exercise

      const deleteExercise = (id) => {
        if (exercises.value.length > 1) {
          exercises.value = exercises.value.filter((exercise) => exercise.id !== id)
          statusMsg.value = 'Exercise removed successfully!'
          setTimeout(() => {
            statusMsg.value = null
          }, 3000)
          return
        }
        errorMsg.value =
          "Error: Can't delete exercise, you should have at leat one exercise"

        setTimeout(() => {
          errorMsg.value = null
        }, 3000)
      }

      // Listens for chaging of workout type input
      const workoutChange = () => {
        exercises.value = []
        addExercise()
      }

      // Create workout
      const createWorkOut = async () => {
        try {
          const { error } = await supabase.from('workouts').insert([
            {
              workoutName: workoutName.value,
              workoutType: workoutType.value,
              exercises: exercises.value,
            },
          ])
          if (error) throw error
          statusMsg.value = 'Workout created successfully!'
          setTimeout(() => {
            statusMsg.vaue = null
          }, 5000)
          workoutName.value = null
          workoutType.value = 'select-workout'
          exercises.value = []
        } catch (error) {
          errorMsg.value = error.message
          setTimeout(() => {
            errorMsg.vaue = null
          }, 5000)
        }
      }

      return {
        user,
        workoutName,
        workoutType,
        exercises,
        statusMsg,
        errorMsg,
        store,
        addExercise,
        workoutChange,
        deleteExercise,
        createWorkOut,
      }
    },
  }
</script>

<template>
  <div v-if="user" class="max-w-screen-md px-5 py-10 mx-auto">
    <div v-if="statusMsg || errorMsg" class="p-4 mb-10 rounded-md bg-light-grey">
      <p class="text-red-500">{{ errorMsg }}</p>
      <p class="text-at-light-green">{{ statusMsg }}</p>
    </div>
    <div class="flex items-start p-8 rounded-md shadow-lg bg-light-grey">
      <form @submit.prevent="createWorkOut" class="flex flex-col w-full gap-y-5">
        <h1 class="mb-4 text-3xl text-at-light-green">Record workout</h1>
        <div class="flex flex-col mb-2">
          <label class="mb-1 text-sm text-at-light-green" for="workout-name"
            >Workout Name</label
          >
          <input
            class="p-2 text-gray-500 focus:outline-none"
            type="text"
            required
            id="workout-name"
            v-model="workoutName"
          />
        </div>
        <div class="flex flex-col mb-2">
          <label class="mb-1 text-sm text-at-light-green" for="workout-type"
            >Workout Type</label
          >
          <select
            @change="workoutChange"
            v-model="workoutType"
            class="p-2.5 focus:outline-none text-gray-600"
            id="workout-type"
            required
          >
            <option selected value="select-workout">Select Workout</option>
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>
        <!-- Workout input -->
        <StrengthInput
          :exercises="exercises"
          :workoutType="workoutType"
          :addExercise="addExercise"
          :deleteExercise="deleteExercise"
        />

        <!-- Strength -->

        <!-- End -->

        <CardioInput
          :exercises="exercises"
          :workoutType="workoutType"
          :addExercise="addExercise"
          :deleteExercise="deleteExercise"
        />
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
          Record Workout
        </button>
      </form>
    </div>
  </div>
</template>
