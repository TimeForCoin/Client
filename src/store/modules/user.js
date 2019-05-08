export default {
  state: {
    userId: ''
  },
  mutations: {
    set: function (state, data) {
      state.userId = data.userId
    }
  }
}
