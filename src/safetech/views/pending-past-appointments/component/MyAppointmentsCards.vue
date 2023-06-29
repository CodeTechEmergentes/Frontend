<template>
  <div class="mt-2">
    <div
      v-for="(item, index) in appointments"
      :key="index"
    >
      <b-card :header="item.scheduledAt" header-tag="header" :title="'Cita con ' + item.technical.fullName.firstName + ' ' + item.technical.fullName.lastName">
        <template #header>
          {{ formattedDate(item.scheduledAt) }}
        </template>
        <b-card-text>
          Reparacion de {{ item.appliance.name }}
        </b-card-text>
        <div class="d-flex justify-content-end">
          <b-button v-if="$route.meta.tab === 1" href="#" variant="info" @click="goToAppointmentInfo(item.id)">Detalles</b-button>
          <b-button v-if="$route.meta.tab === 1" href="#" variant="danger" class="ml-2" @click="cancelAppointment(item.id)">Cancelar</b-button>
          <b-button v-if="$route.meta.tab === 2" href="#" variant="success" @click="goToReview(item.id)">Dejar Comentarios</b-button>
          <b-button v-if="$route.meta.tab === 2" href="#" variant="info" class="ml-2" @click="goToReport(item.id)">Ver Reporte</b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import MyAppointmentsService from '@/safetech/views/pending-past-appointments/my-appointments.service'
import moment from "moment";

export default {
  name: 'MyAppointmentsCards',
  data() {
    return {
      userData: '',
      appointmentId: '',
      appointments: [],
      modalProfileAppointmentOn: false,
    }
  },
  async created() {
    this.userData = JSON.parse(localStorage.getItem('userData'))
    await this.getAppointmentsByIdAndStatus()
  },
  methods: {
    async getAppointmentsByIdAndStatus() {
      const status = this.$route.meta.tab === 1 ? 'SCHEDULED' : 'FINISHED'
      const data = await MyAppointmentsService.getAppointmentsByIdAndStatus(this.userData.id, status)
      if (data.status === 200) {
        this.appointments = data.data
      }
    },
    formattedDate(date) {
      return moment(date).format('MM/DD/YYYY h:mm A')
    },
    async cancelAppointment(appointmentId) {
      const data = await MyAppointmentsService.cancelAppointment(appointmentId)
      if (data.status === 200) {
        this.$bvToast.toast('Cita cancelada', {
          title: 'Cita cancelada',
          variant: 'success',
          solid: true
        })
        await this.getAppointmentsByIdAndStatus()
      }
    },
    goToReport(appointmentId) {
      this.$router.push({ name: 'report-by-appointment', params: { appointmentId } })
    },
    goToReview(appointmentId) {
      this.$router.push({ name: 'review-by-appointment', params: { appointmentId } })
    },
    goToAppointmentInfo(appointmentId) {
      this.$router.push({ name: 'appointment-info', params: { appointmentId } })
    },
  },
}
</script>

<style scoped>

</style>
