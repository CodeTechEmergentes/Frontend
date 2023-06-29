import { safeTechApi } from '@/safetech/service/axios'

class NewAppointmentService {
  async getAppliances() {
    try {
      const data = await safeTechApi.get('/appliances')
      return data
    } catch (error) {
      throw error
    }
  }

  async getAppliancesByName(name) {
    try {
      const data = await safeTechApi.get(`/appliances/name/${name}`)
      return data
    } catch (error) {
      throw error
    }
  }

  async getTechnicalsByApplianceId(applianceId) {
    try {
      const data = await safeTechApi.get(`/appliances/${applianceId}/technicals`)
      return data
    } catch (error) {
      throw error
    }
  }

  async getTechnicalsByApplianceIdAndDate(applianceId, shiftId, date) {
    try {
      const data = await safeTechApi.get(`/technicals/appliance/${applianceId}/shift/${shiftId}/date/${date}`)
      return data
    } catch (error) {
      throw error
    }
  }

  async createAppointment(applianceId, userId, technicalId, params) {
    try {
      const data = await safeTechApi.post(`/users/${userId}/technicals/${technicalId}/appliance/${applianceId}/appointments`, params)
      return data
    } catch (error) {
      throw error
    }
  }
  async getShift(shiftId) {
    try {
      const data = await safeTechApi.get(`/shifts/${shiftId}`)
      return data
    } catch (error) {
      throw error
    }
  }
}

export default new NewAppointmentService()
