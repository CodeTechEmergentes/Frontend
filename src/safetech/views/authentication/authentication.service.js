import { safeTechApi } from '@/safetech/service/axios'

class AuthenticationService {
  async registerUser(params) {
    try {
      const data = await safeTechApi.post('/users',params)
      return data
    } catch (error) {
      throw error
    }
  }

  async loginUser(email) {
    try {
      const data = await safeTechApi.get(`/users/emails/${email}`)
      return data
    } catch (error) {
      throw error
    }
  }

}

export default new AuthenticationService()
