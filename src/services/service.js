import * as userService from './modules/user'
import * as questionnaireService from './modules/questionnaire'
import * as fileService from './modules/file'
import * as taskService from './modules/task'

const service = {
  install: function (Vue, options) {
    Vue.prototype.$service = {
      user: userService,
      questionnaire: questionnaireService,
      file: fileService,
      task: taskService
    }
  }
}

export default service
