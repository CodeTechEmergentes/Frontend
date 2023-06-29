<template>
  <div class="mt-5" >

    <div v-if="appointments.length<=0">
      <b-row class="d-flex  align-content-center justify-content-center mb-3 ">
        <b-img
            :src="image"

            alt="Coming Soon"
            class="img-fluid"
        />
      </b-row>
      <b-row class="d-flex flex-column  align-content-center justify-content-center mb-3">

        <h3 class="text-center">Todavía no tienes citas.</h3>

        <h3 class="text-center">
          ¿Te gustaría agendar una?</h3>
      </b-row>
      <b-row class="d-flex  align-content-center justify-content-center">
        <b-button variant="primary-safetech" @click="newAppointment">Agendar una cita</b-button>
      </b-row>
    </div>
    <div v-else>
      <b-row class="d-flex flex-column  align-content-center justify-content-center mb-3">

        <h2 class="text-center">Proximas citas</h2>

        <h3 class="text-center">
          No te olvides de tus citas agendadas! :D</h3>
      </b-row>
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
                <b-button href="#" variant="danger" @click="cancelAppointment(item.id)">Cancelar</b-button>
              </div>
            </b-card>
          </div>
        </div>
      </template>
    </div>


  </div>
</template>

<script>
import MyAppointmentsCards from "@/safetech/views/pending-past-appointments/component/MyAppointmentsCards";
import MyAppointmentsService from "@/safetech/views/pending-past-appointments/my-appointments.service";
import moment from "moment/moment";
export default {
  components: {MyAppointmentsCards},
  data() {
    return {
      image: require('@/assets/images/safetech/img.png'),
      userData: '',
      appointments: [],
    }
  },
  async created() {
    this.userData = JSON.parse(localStorage.getItem('userData'))
    await this.getAppointmentsByIdAndStatus()
  },
  methods: {
    newAppointment() {
      this.$router.push({ name: 'choose-appliance' })
    },
    async getAppointmentsByIdAndStatus() {
      const status = 'SCHEDULED'
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
    }
  },


}
</script>

<style scoped>

</style>
