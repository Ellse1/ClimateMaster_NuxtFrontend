export const state = () => ({
    list: []
})

export const mutations = {
    set(state, climadvices) {
        state.list = climadvices
    },
    add (state, climadvice) {
      state.list.push({
        climadvice
      })
    },
    remove (state, { climadvice }) {
      state.list.splice(state.list.indexOf(climadvice), 1)
    }
  }