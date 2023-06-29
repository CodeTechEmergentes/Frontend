<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
          id="input-group-1"
          label="Cuéntanos como fue tu experiencia con el técnico"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="form.text"
            type="text"
            placeholder="Escribe tu comentario"
            required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" @click="createReview(appointment.user.id, appointment.technical.id, appointment.id, form)">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import MyAppointmentsService from '@/safetech/views/pending-past-appointments/my-appointments.service'

export default {
  name: 'Review',
  data() {
    return {
      appointment: [],
      form: {
        text: '',
      },
      show: true,
    }
  },
  async created() {
    await this.getAppointmentById()
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.$router.push({ name: 'dashboard' })
    },

    async getAppointmentById(){
      const data = await MyAppointmentsService.getAppointmentById(this.$route.params.appointmentId)
      if (data.status === 200) {
        this.appointment = data.data
      }
    },

    async createReview(userId, technicalId, appointmentId, review) {
      const data = await MyAppointmentsService.createReview(userId, technicalId, appointmentId, review)
      if (data.status === 200) {
        this.$bvToast.toast('Comentario enviado', {
          title: 'Comentario enviado',
          variant: 'success',
          solid: true
        })
      }
    }
  }
}
</script>
