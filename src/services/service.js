import * as userService from './modules/user'

const service = {
  install: function (Vue, options) {
    Vue.prototype.$service = {
      user: userService
    }
  }
}

export default service
