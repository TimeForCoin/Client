import * as userService from './modules/user'
import * as fileService from './modules/file'
import * as taskService from './modules/task'

const service = {
  install: function (Vue, options) {
    Vue.prototype.$service = {
      user: userService,
      file: fileService,
      task: taskService
    }
  }
}

export default service
