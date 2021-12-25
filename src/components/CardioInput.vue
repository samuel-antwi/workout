<script>
  export default {
    props: ['workoutType', 'exercises', 'addExercise', 'deleteExercise'],
  }
</script>

<template>
  <div v-if="workoutType === 'cardio'">
    <div
      v-for="(item, index) in exercises"
      :key="index"
      class="grid-cols-5 md:grid gap-x-3 mb-5 relative"
    >
      <button @click="deleteExercise(item.id)" type="button" class="absolute -left-5">
        <img
          class="h-5 w-auto"
          src="../assets/images/trash-light-green.png"
          alt="Trash"
        />
      </button>
      <div class="flex flex-col col-span-2">
        <label class="mb-2 text-at-light-green" for="type">Type</label>
        <select v-model="item.exerciseType" class="p-2.5 focus:outline-none" id="type">
          <option selected value="#">Select Type</option>
          <option value="runs">Run</option>
          <option value="walk">Walk</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label class="mb-2 text-at-light-green" for="distance">Distance</label>
        <input
          v-model="item.distance"
          required
          class="p-2 focus:outline-none"
          type="text"
        />
      </div>
      <div class="flex flex-col">
        <label class="mb-2 text-at-light-green" for="duration">Duration</label>
        <input
          v-model="item.duration"
          required
          class="p-2 focus:outline-none"
          type="text"
        />
      </div>
      <div class="flex flex-col">
        <label class="mb-2 text-at-light-green" for="pace">Pace</label>
        <input v-model="item.pace" required class="p-2 focus:outline-none" type="text" />
      </div>
    </div>
    <button
      @click="addExercise"
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
      Add Exercise
    </button>
  </div>
</template>

<style></style>
