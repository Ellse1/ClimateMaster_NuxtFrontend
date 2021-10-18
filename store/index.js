/*export const state = () => ({
    counter: 0
  })
  
  export const mutations = {
    increment (state) {
      state.counter++
    }
  }*/
  // auth.js
export const state = () => ({
  busy: false,
  loggedIn: false,
  strategy: "local",
  user: false,
  })
export const getters = {
  loggedIn (state) {
      return state.loggedIn
  },
  user (state) {
      return state.user
  }
}