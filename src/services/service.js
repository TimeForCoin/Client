import * as userService from './modules/user'
import * as fileService from './modules/file'

const service = {
  install: function (Vue, options) {
    Vue.prototype.$service = {
      user: userService,
      file: fileService
    }
  }
}

export default service
