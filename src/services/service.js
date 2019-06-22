import * as userService from './modules/user'
import * as questionaireService from './modules/questionaire'
import * as fileService from './modules/file'
import * as taskService from './modules/task'

const service = {
  install: function (Vue, options) {
    Vue.prototype.$service = {
      user: userService,
      questionaire: questionaireService,
      file: fileService,
      task: taskService
    }
  }
}

export default service
