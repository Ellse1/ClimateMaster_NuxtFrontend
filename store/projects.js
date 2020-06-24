// For reading the Projects we do with climatemaster
export const state = () => ({
    list: []
})

export const mutations = {
    set(state, projects) {
        state.list = projects
    },
    add (state, project) {
      state.list.push({
        project
      })
    },
    remove (state, { project }) {
      state.list.splice(state.list.indexOf(project), 1)
    }
  }