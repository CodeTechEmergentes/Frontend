// axios
import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
export const safeTechApi = axios.create({
   // baseURL: 'http://localhost:8080/api/v1',
   baseURL: 'https://emergentes-391311.ue.r.appspot.com/api/v1',
  // params: {}
})
