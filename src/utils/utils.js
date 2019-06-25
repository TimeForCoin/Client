import verifyUtils from './modules/verify'
import handlerUtils from './modules/handler'

const utils = {
  install: function(Vue, option) {
    Vue.prototype.$utils = {
      verify: verifyUtils,
      handler: handlerUtils
    }
  }
}

export default utils
