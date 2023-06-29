<template>
  <div>
    <b-card :title="'Cita con '+ appointment.technical.fullName.firstName + ' ' + appointment.technical.fullName.lastName"
            :img-src="appointment.technical.profilePictureUrl" img-alt="Card image" img-right img-height="240">
      <b-card-sub-title>
        Electrodoméstico a reparar
      </b-card-sub-title>
      <b-card-text>
        {{ appointment.appliance.name }}
      </b-card-text>
      <b-card-sub-title>
        Fecha y hora de la cita
      </b-card-sub-title>
      <b-card-text>
        {{ formattedDate(appointment.scheduledAt) }}
      </b-card-text>
      <b-card-sub-title>
        Descripción del problema
      </b-card-sub-title>
      <b-card-text>
        {{ appointment.problemDescription }}
      </b-card-text>
      <b-card-sub-title>
        Dirección a la que el técnico va a asistir
      </b-card-sub-title>
      <b-card-text>
        {{ appointment.address.street + ', ' + appointment.address.city + ', ' + appointment.address.country }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import MyAppointmentsService from '@/safetech/views/pending-past-appointments/my-appointments.service'
import moment from 'moment'

export default {
  name: 'AppointmentInfo',

  data() {
    return {
      appointment: [],
    }
  },
  async created() {
    await this.getAppointmentById()
  },
  methods: {
    async getAppointmentById() {
      const data = await MyAppointmentsService.getAppointmentById(this.$route.params.appointmentId)
      if (data.status === 200) {
        this.appointment = data.data
      }
    },
    formattedDate(date) {
      return moment(date).format('MM/DD/YYYY h:mm A')
    },
  }

}
</script>

<style scoped>
.card-img-top {
  width: 100%;
  height: 30vh;
  object-fit: contain;
}
</style>
