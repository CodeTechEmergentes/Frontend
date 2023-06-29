<template>
  <div>
    <b-card title="Resumen de la cita">
      <validation-observer ref="form">
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Especialidad"
            >
              <validation-provider
                v-slot="{ errors }"
                name="specializedIn"
                rules="required"
              >
                <b-form-input
                  :value="'Especializado en ' + applianceSelected.name.toLowerCase()"
                  :state="errors[0] ? false : null"
                  disabled
                />
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Técnico"
            >
              <validation-provider
                v-slot="{ errors }"
                name="technician"
                rules="required"
              >
                <b-form-input
                  :value="technicalSelected.fullName.firstName + ' ' + technicalSelected.fullName.lastName"
                  :state="errors[0] ? false : null"
                  disabled
                />
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="Fecha"
            >
              <validation-provider
                v-slot="{ errors }"
                name="date"
                rules="required"
              >
                <b-form-datepicker
                  :value="dateSelected"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  :state="errors[0] ? false : null"
                  disabled
                />
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Horario"
            >
              <validation-provider
                v-slot="{ errors }"
                name="shift"
                rules="required"
              >
                <b-form-input
                  v-model="shiftSelected"
                  :state="errors[0] ? false : null"
                  disabled
                />
              </validation-provider>
            </b-form-group>

          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="Pais"
            >
              <validation-provider
                v-slot="{ errors }"
                name="country"
                rules="required"
              >
                <b-form-input
                  v-model="countrySelected"
                  :state="errors[0] ? false : null"
                />
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Ciudad"
            >
              <validation-provider
                v-slot="{ errors }"
                name="city"
                rules="required"
              >
                <b-form-input
                  v-model="citySelected"
                  :state="errors[0] ? false : null"
                />
              </validation-provider>
            </b-form-group>

          </b-col>
          <b-col>
            <b-form-group
              label="Calle"
            >
              <validation-provider
                v-slot="{ errors }"
                name="street"
                rules="required"
              >
                <b-form-input
                  v-model="streetSelected"
                  :state="errors[0] ? false : null"
                />
              </validation-provider>
            </b-form-group>

          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Descripción"
            >
              <validation-provider
                v-slot="{ errors }"
                name="description"
                rules="required"
              >
                <b-form-textarea
                  v-model="problemDescription"
                  :state="errors[0] ? false : null"
                />
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </validation-observer>
      <b-row>
        <b-col cols="12">
          <div class="w-100 d-flex justify-content-end">
            <b-button
              variant="primary"
              @click="createAppointment"
            >
              Guardar
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NewAppointmentService from '@/safetech/views/new-appointment/new-appointment.service'

export default {
  data() {
    return {
      technicalSpecialized: '',
      problemDescription: '',
      streetSelected: '',
      countrySelected: '',
      citySelected: '',
      userData: '',
    }
  },
  computed: {
    ...mapGetters({
      applianceSelected: 'NewAppointmentStore/applianceSelected',
      technicalSelected: 'NewAppointmentStore/technicalSelected',
      dateSelected: 'NewAppointmentStore/dateSelected',
      shiftSelected: 'NewAppointmentStore/shiftSelected',
      dateFormattedSelected: 'NewAppointmentStore/dateFormattedSelected',
      currentUser: 'NewAppointmentStore/technicalSelected',
    }),
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem('userData'))
  },
  methods: {
    async createAppointment() {
      const validate = await this.$refs.form.validate()
      if (validate) {
        const params = {
          problemDescription: this.problemDescription,
          scheduledAt: this.dateFormattedSelected,
          address: {
            street: this.streetSelected,
            city: this.citySelected,
            country: this.countrySelected,
          },
          status: 'SCHEDULED',
          reparationCost: {
            amount: 100,
            currency: 'Soles',
          },
          paymentStatus: 'SUCCEED',
        }

        const data = await NewAppointmentService.createAppointment(this.applianceSelected.id, this.userData.id, this.technicalSelected.id, params)
        if (data.status === 200) {
          this.$router.push({ name: 'dashboard' })
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
