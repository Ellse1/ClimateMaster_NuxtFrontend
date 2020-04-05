export const state = () => ({
    list: []
})

export const mutations = {
    set(state, publicUserProfilesForList) {
        state.list = publicUserProfilesForList
    },
    add (state, publicUserProfileForList) {
      state.list.push({
        publicUserProfileForList
      })
    },
    remove (state, { publicUserProfileForList }) {
      state.list.splice(state.list.indexOf(publicUserProfileForList), 1)
    }
  }