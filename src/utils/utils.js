import verifyUtils from './modules/verify'

const utils = {
  install: function(Vue, option) {
    Vue.prototype.$utils = {
      verify: verifyUtils
    }
  }
}

export default utils
