<script>
  export default {
    props: ['workoutType', 'exercises', 'addExercise', 'deleteExercise'],
  }
</script>

<template>
  <div class="relative" v-if="workoutType === 'strength'">
    <div
      v-for="(item, index) in exercises"
      :key="index"
      class="grid-cols-5 mb-5 md:grid gap-x-3"
    >
      <button @click="deleteExercise(item.id)" type="button" class="absolute -left-5">
        <img
          class="w-auto h-5"
          src="../assets/images/trash-light-green.png"
          alt="Trash"
        />
      </button>
      <div class="flex flex-col col-span-2">
        <label class="mb-2 text-at-light-green" for="exercise">Exercise</label>
        <input
          v-model="item.exercise"
          required
          class="p-2 focus:outline-none"
          type="text"
        />
      </div>
      <div class="flex flex-col">
        <label class="mb-2 text-at-light-green" for="sets">Sets</label>
        <input v-model="item.sets" required class="p-2 focus:outline-none" type="text" />
      </div>
      <div class="flex flex-col">
        <label class="mb-2 text-at-light-green" for="reps">Reps</label>
        <input v-model="item.reps" required class="p-2 focus:outline-none" type="text" />
      </div>
      <div class="flex flex-col">
        <label class="mb-2 text-at-light-green" for="weight">Weight(LB's)</label>
        <input
          v-model="item.weight"
          required
          class="p-2 focus:outline-none"
          type="text"
        />
      </div>
    </div>
    <button @click="addExercise" class="self-start btn btn-primary" type="submit">
      Add Exercise
    </button>
  </div>
</template>

<style></style>
