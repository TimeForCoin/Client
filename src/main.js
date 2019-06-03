import Vue from 'vue'
import App from './App'
import router from './router'
import service from './services/service'
import utils from './utils/utils'
import store from './store/store'
import './plugins/ant-design-vue'
import './plugins/axios'

Vue.config.productionTip = false

Vue.use(service)
Vue.use(utils)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
