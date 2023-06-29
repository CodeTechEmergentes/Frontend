<template>
  <div>
    <b-card :title="report.appointment.appliance.name"
            :img-src="report.appointment.appliance.imgUrl" img-alt="Card image" img-right class="mb-3" img-height="230"
            img-width="300">

      <b-card-sub-title>Modelo</b-card-sub-title>
      <b-card-text>
        {{ report.applianceInfo.brand + ' - ' + report.applianceInfo.model }}
      </b-card-text>

      <b-card-sub-title>Reporte realizado por </b-card-sub-title>
      <b-card-text>
        {{report.appointment.technical.fullName.firstName + ' ' + report.appointment.technical.fullName.lastName}}
      </b-card-text>

      <b-card-sub-title>Diagnóstico</b-card-sub-title>
      <b-card-text>
        {{ report.applianceDiagnostic }}
      </b-card-text>

      <b-card-sub-title>Recomendaciones</b-card-sub-title>
      <b-card-text>
        {{ report.reparationDetails }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import MyAppointmentsService from '@/safetech/views/pending-past-appointments/my-appointments.service'

export default {
  name: 'ReportByAppointment',
  data() {
    return {
      report: [],
    }
  },
  async created() {
    await this.getReportByAppointmentId()
  },
  methods: {
    async getReportByAppointmentId() {
      const data = await MyAppointmentsService.getReportByAppointmentId(this.$route.params.appointmentId)
      if (data.status === 200) {
        this.report = data.data
      }
    }
  },
}
</script>

<style scoped>

</style>
