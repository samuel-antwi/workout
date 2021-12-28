<script>
  import { computed, ref } from 'vue'
  import { uid } from 'uid'
  import { supabase } from '../supabase'
  import { useRoute, useRouter } from 'vue-router'
  import { useUser } from '../store/useUser'
  import CardioInput from '../components/CardioInput.vue'
  import StrengthInput from '../components/StrengthInput.vue'
  export default {
    name: 'WorkoutDetails',
    setup() {
      const store = useUser()
      // Create data / vars
      const isLoading = ref(null)
      const data = ref(null)
      const errorMsg = ref(null)
      const statusMsg = ref(null)
      const route = useRoute()
      const router = useRouter()

      // Get user
      const user = computed(() => store.user)
      // Get current Id of route
      const currentId = route.params.workoutId

      // Get a single workout data
      const getData = async () => {
        isLoading.value = true
        try {
          const { error, data: workouts } = await supabase
            .from('workouts')
            .select('*')
            .eq('id', currentId)
          if (error) throw error
          data.value = workouts[0]
          isLoading.value = null
        } catch (error) {
          errorMsg.value = error.message
        }
      }
      getData()

      // Delete workout
      const deleteWorkOut = async () => {
        try {
          if (confirm('Are you sure you want to delete workout ?')) {
            const { error } = await supabase.from('workouts').delete().eq('id', currentId)
            if (error) throw error
            router.push({ name: 'Home' })
          }
        } catch (error) {
          errorMsg.value = error.message
        }
      }
      // Edit mode
      const edit = ref(false)
      const editMode = () => {
        edit.value = !edit.value
      }
      // Add exercise

      const addExercise = () => {
        if (data.value.workoutType === 'strength') {
          data.value.exercises.push({
            id: uid(),
            exercise: '',
            sets: '',
            reps: '',
            weight: '',
          })
        } else {
          data.value.exercises.push({
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
        if (data.value.exercises.length > 1) {
          data.value.exercises = data.value.exercises.filter(
            (exercise) => exercise.id !== id
          )
          statusMsg.value = 'Exercise removed successfully!'
          setTimeout(() => {
            statusMsg.value = null
          }, 5000)
          return
        }
        errorMsg.value = `Error: You can't delete exercise. You must have at least one exercise`
        setTimeout(() => {
          errorMsg.value = null
        }, 5000)
      }

      // Update Workout
      const updateWorkOut = async () => {
        try {
          const { error } = await supabase
            .from('workouts')
            .update({
              workoutName: data.value.workoutName,
              exercises: data.value.exercises,
            })
            .eq('id', currentId)
          edit.value = false
          statusMsg.value = 'Workout updated successfully!'
          setTimeout(() => {
            statusMsg.value = null
          }, 5000)
          if (error) throw error
        } catch (error) {
          errorMsg.value = error.message
          setTimeout(() => {
            errorMsg.value = null
          }, 5000)
        }
      }

      return {
        edit,
        user,
        isLoading,
        data,
        errorMsg,
        statusMsg,
        store,
        editMode,
        deleteWorkOut,
        currentId,
        deleteExercise,
        addExercise,
        updateWorkOut,
      }
    },
    components: { CardioInput, StrengthInput },
  }
</script>

<template>
  <div class="flex content-center justify-center" v-if="isLoading">
    <h1 class="text-center">Loading...</h1>
  </div>
  <div v-else class="px-4 mb-12">
    <div
      v-if="statusMsg || errorMsg"
      class="max-w-2xl p-4 mx-auto mt-12 mb-10 rounded-md bg-light-grey"
    >
      <p class="text-red-500">{{ errorMsg }}</p>
      <p class="text-at-light-green">{{ statusMsg }}</p>
    </div>
    <div
      class="relative flex flex-col items-center max-w-2xl p-8 mx-auto mt-12 text-center rounded-md shadow-md  bg-light-grey"
    >
      <img
        v-if="data.workoutType === 'cardio'"
        class="w-auto h-24"
        src="../assets/images/running-light-green.png"
        alt="Runner"
      />
      <img
        v-else
        class="w-auto h-24"
        src="../assets/images/dumbbell-light-green.png"
        alt="Dumbell"
      />

      <p class="px-4 py-2 my-5 text-gray-100 rounded-md bg-at-light-green">
        {{ data.workoutType }}
      </p>
      <div class="w-full" v-if="edit">
        <input
          class="w-full p-3 rounded-md focus:outline-none"
          v-model="data.workoutName"
          type="text"
        />
      </div>

      <h1 v-else class="text-3xl text-at-light-green first-letter:capitalize">
        {{ data.workoutName }}
      </h1>

      <div v-if="user" class="absolute flex items-center left-5 top-5 gap-x-4">
        <button
          @click="editMode"
          type="button"
          class="flex items-center justify-center rounded-full w-7 h-7 bg-at-light-green"
        >
          <img
            class="w-auto h-3.5"
            src="../assets/images/pencil-light.png"
            alt="Pencil"
          />
        </button>

        <button
          @click="deleteWorkOut"
          type="button"
          class="flex items-center justify-center rounded-full w-7 h-7 bg-at-light-green"
        >
          <img class="w-auto h-3.5" src="../assets/images/trash-light.png" alt="Trash" />
        </button>
      </div>
    </div>
    <!-- Workout card -->
    <div class="relative max-w-2xl p-5 mx-auto mt-20 rounded-md shadow-md bg-light-grey">
      <div v-if="data.workoutType === 'cardio'">
        <div v-if="edit">
          <CardioInput
            :exercises="data.exercises"
            :workoutType="data.workoutType"
            :deleteExercise="deleteExercise"
            :addExercise="addExercise"
          />
        </div>
        <!-- Loop through Cardio exercises -->
        <div
          v-else
          class="grid grid-cols-4 mb-5 text-center"
          v-for="exercise in data.exercises"
          :key="exercise.id"
        >
          <div>
            <h1 class="mb-1 text-at-light-green">Type</h1>
            <p>{{ exercise.exerciseType }}</p>
          </div>
          <div>
            <h1 class="mb-1 text-at-light-green">Distance</h1>
            <p>{{ exercise.distance }}</p>
          </div>
          <div>
            <h1 class="mb-1 text-at-light-green">Duration</h1>
            <p>{{ exercise.duration }}</p>
          </div>
          <div>
            <h1 class="mb-1 text-at-light-green">Pace</h1>
            {{ exercise.pace }}
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="edit">
          <StrengthInput
            :exercises="data.exercises"
            :workoutType="data.workoutType"
            :deleteExercise="deleteExercise"
            :addExercise="addExercise"
          />
        </div>
        <!-- Loop through strength exercises -->
        <div
          class="grid grid-cols-4 mb-5 text-center"
          v-for="exercise in data.exercises"
          :key="exercise.id"
          v-else
        >
          <div>
            <h1 class="mb-1 text-at-light-green">Exercise</h1>
            <p>{{ exercise.exercise }}</p>
          </div>
          <div>
            <h1 class="mb-1 text-at-light-green">Sets</h1>
            <p>{{ exercise.sets }}</p>
          </div>
          <div>
            <h1 class="mb-1 text-at-light-green">Reps</h1>
            <p>{{ exercise.reps }}</p>
          </div>
          <div>
            <h1 class="mb-1 text-at-light-green">Weight(LB's)</h1>
            <p>{{ exercise.weight }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="edit" class="max-w-2xl pt-5 mx-auto">
      <button @click="updateWorkOut" class="self-start btn btn-primary" type="submit">
        Update Workout
      </button>
    </div>
  </div>
</template>
