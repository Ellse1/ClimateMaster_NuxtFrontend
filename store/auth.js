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