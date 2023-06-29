import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: 'https://some-domain.com/api/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

/* export const safeTechApi = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  // params: {}
}) */

Vue.prototype.$http = axiosIns

export default axiosIns
