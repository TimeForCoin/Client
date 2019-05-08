import axios from 'axios'
import Vue from 'vue'

const config = {
  baseURL: process.env.baseURL || '/api/',
  timeout: 3000
}

const ax = axios.create(config)

ax.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

ax.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

const plugin = {
  install: function (Vue, options) {
    window.axios = ax
    Object.defineProperties(Vue.prototype, {
      $axios: {
        get() {
          return ax
        }
      }
    })
  }
}

Vue.use(plugin)

export default ax
