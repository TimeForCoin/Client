import * as userService from './modules/user'
import * as questionaireService from './modules/questionaire'

const service = {
  install: function (Vue, options) {
    Vue.prototype.$service = {
      user: userService,
      questionaire: questionaireService
    }
  }
}

export default service
