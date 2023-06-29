import { safeTechApi } from '@/safetech/service/axios'

class MyAppointmentsService {
  async getAppointmentsByIdAndStatus(userId, status) {
    try {
      const data = await safeTechApi.get(`/users/${userId}/status/${status}/appointments`)
      return data
    } catch (error) {
      throw error
    }
  }

  async getAppointmentById(appointmentId){
    try {
      const data = await safeTechApi.get(`/appointments/${appointmentId}`)
      return data
    } catch (error) {
      throw error
    }
  }

  async cancelAppointment(appointmentId) {
    try {
      const data = await safeTechApi.delete(`/appointments/${appointmentId}`)
      return data
    } catch (error) {
      throw error
    }
  }

  async getReportByAppointmentId(appointmentId) {
    try {
      const data = await safeTechApi.get(`/appointments/${appointmentId}/report`)
      return data
    } catch (error) {
      throw error
    }
  }

  async createReview(userId, technicalId, appointmentId, params){
    try {
      const data = await safeTechApi.post(`reviews/user/${userId}/technical/${technicalId}/appointment/${appointmentId}`, params)
      return data
    } catch (error) {
      throw error
    }
  }
}

export default new MyAppointmentsService()
