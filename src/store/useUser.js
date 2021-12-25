import { defineStore } from 'pinia'

export const useUser = defineStore('userStore', {
  state: () => ({
    user: null,
    name: 'Samuel Antwi',
    work: 'Soldier',
  }),
  getters: {
    getUserEmail: (state) => {
      return state.user.email
    },
  },

  actions: {
    async setUser(payload) {
      try {
        this.user = (await payload) ? payload.user : null
      } catch (error) {
        console.log(error)
      }
    },
  },
})
