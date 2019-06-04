export default {
  state: {
    id: '',
    info: {
      avatar: '',
      bio: '',
      school: '',
      email: '',
      gender: '',
      location: '',
      nickname: '',
      phone: '',
      birthday: 0
    },
    data: {
      money: 0,
      value: 0,
      credit: 0,
      follower_count: 0,
      following_count: 0,
      type: '',
      attendance: true,
      collect_count: 0,
      collect_run_count: 0,
      public_count: 0,
      public_run_count: 0,
      receive_count: 0,
      receive_run_count: 0
    }
  },
  mutations: {
    set: function (state, data) {
      state.id = data.id
      for (let key in state.info) {
        state.info[key] = data.info[key]
      }
      for (let key in state.data) {
        state.data[key] = data.data[key]
      }
    }
  }
}