<template>
  <div>
    <validation-observer ref="form">
      <b-row>
        <b-col>
          <validation-provider
            v-slot="{ errors }"
            name="date"
            rules="required"
          >
            <b-form-datepicker
              v-model="dateSelected"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              :state="errors[0] ? false : null"
              locale="en"
            />
          </validation-provider>
        </b-col>
        <b-col>
          <validation-provider
            v-slot="{ errors }"
            name="shift"
            rules="required"
          >
            <b-form-select
              v-model="shiftSelected"
              :options="shiftOptions"
              :state="errors[0] ? false : null"
              @input="getShift"
            />
          </validation-provider>
        </b-col>
        <b-col v-if="shiftSelected !== null">
          <validation-provider
            v-slot="{ errors }"
            name="schedule"
            rules="required"
          >
            <b-form-select
              v-model="scheduleSelected"
              :options="scheduleOptions"
              :state="errors[0] ? false : null"
            />
          </validation-provider>
        </b-col>
        <b-col>
          <b-button
            variant="primary"
            @click="getTechnicalsByApplianceIdAndDate"
          >
            Buscar
          </b-button>
        </b-col>
        <b-col />
        <b-col>
          <div class="w-100 d-flex justify-content-end">
            <!--            <b-button-->
            <!--              variant="warning"-->
            <!--              @click="getTechnicalsByApplianceId"-->
            <!--            >-->
            <!--              Reset-->
            <!--            </b-button>-->
          </div>
        </b-col>
      </b-row>
    </validation-observer>

    <b-row class="mt-2">
      <b-col
        cols="12"
        class="d-flex"
      >
        <div
          v-if="technicals.length === 0"
          class="mt-2 w-100 d-flex justify-content-center"
        >
          <span class="font-medium-2">Especifica un horario para mostrar los tecnicos disponibles</span>
        </div>
        <template v-else>
          <div
            v-for="(technical, index) in technicals"
            :key="index"
            class="d-flex"
          >
            <b-card
              :title="technical.fullName.firstName + ' ' + technical.fullName.lastName"
              :img-src="technical.profilePictureUrl"
              img-alt="Image"
              img-top
              img-height="120px"
              img-width="120px"
              tag="article"
              style="width: 16rem;"
              class="mb-2 mr-1 cursor-pointer"
            >
              <b-button
                variant="primary"
                size="sm"
                @click="goToProfile(technical.id)"
              >
                Ver perfil
              </b-button>
              <b-button
                variant="success"
                size="sm"
                class="ml-1"
                @click="selectTechnical(technical)"
              >
                Elegir
              </b-button>
            </b-card>
          </div>
        </template>

      </b-col>
    </b-row>
    <modal-profile-technical
      v-if="modalProfileTechnicalOn"
      :technical-id="technicalIdToSend"
      @close="modalProfileTechnicalOn = false"
    />
  </div>
</template>

<script>
import HeaderSlot from '@/safetech/commons/HeaderSlot.vue'
import NewAppointmentService from '@/safetech/views/new-appointment/new-appointment.service'
import ModalProfileTechnical from "@/safetech/views/profile-technical/ModalProfileTechnical";
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    HeaderSlot,
    ModalProfileTechnical,
  },
  data() {
    return {
      technicals: [],
      dateSelected: '',
      shiftSelected: null,
      technicalIdToSend: null,
      shiftOptions: [
        { value: null, text: 'Selecciona un turno' },
        { value: 1, text: 'Mañana' },
        { value: 2, text: 'Tarde' },
      ],
      scheduleOptions: [
        { value: null, text: 'Selecciona un horario' },
      ],
      scheduleSelected: null,
      searchMade: false,
      modalProfileTechnicalOn: false,
    }
  },
  computed: {
    ...mapGetters({
      applianceSelected: 'NewAppointmentStore/applianceSelected',
    }),
    dateSelectedFormatted() {
      return `${this.dateSelected}T${this.scheduleSelected}:00.000Z`
    },
  },
  async created() {
    // await this.getTechnicalsByApplianceId()
  },
  methods: {
    ...mapActions({
      A_SET_TECHNICAL_SELECTED: 'NewAppointmentStore/A_SET_TECHNICAL_SELECTED',
      A_SET_DATE_SELECTED: 'NewAppointmentStore/A_SET_DATE_SELECTED',
      A_SET_SHIFT_SELECTED: 'NewAppointmentStore/A_SET_SHIFT_SELECTED',
      A_SET_DATE_FORMATTED_SELECTED: 'NewAppointmentStore/A_SET_DATE_FORMATTED_SELECTED',
    }),
    async getTechnicalsByApplianceId() {
      const data = await NewAppointmentService.getTechnicalsByApplianceId(this.applianceSelected.id)
      if (data.status === 200) {
        this.technicals = data.data
      }
    },
    async getTechnicalsByApplianceIdAndDate() {
      const validate = await this.$refs.form.validate()
      if (validate) {
        const data = await NewAppointmentService.getTechnicalsByApplianceIdAndDate(this.applianceSelected.id, this.shiftSelected, this.dateSelectedFormatted)
        if (data.status === 200) {
          this.technicals = data.data
          this.searchMade = true
        }
      }
    },
    async getShift() {
      const data = await NewAppointmentService.getShift(this.shiftSelected)
      if (data.status === 200) {
        const shift = data.data
        let { repairDuration } = shift
        repairDuration /= 60
        let from = shift.startTime.substring(0, 2)
        let to = shift.endTime.substring(0, 2)
        from = Number(from)
        to = Number(to)
        const range = (to - from) / repairDuration
        this.scheduleOptions = [
          { value: null, text: 'Selecciona un horario' },
        ]
        for (let i = 1; i <= range; i++) {
          this.scheduleOptions.push({ text: from < 10 ? `0${from}:00` : `${from}:00`, value: from < 10 ? `0${from}:00` : `${from}:00` })
          from += repairDuration
        }
      }
    },
    selectTechnical(item) {
      this.A_SET_TECHNICAL_SELECTED(item)
      this.A_SET_DATE_SELECTED(this.dateSelected)
      this.A_SET_SHIFT_SELECTED(this.scheduleSelected)
      this.A_SET_DATE_FORMATTED_SELECTED(this.dateSelectedFormatted)
      this.$router.push({ name: 'appointment-summary' })
    },
    goToProfile(id) {
      // this.$router.push({ name: 'technical-profile', params: { id } })
      this.technicalIdToSend = id
      this.modalProfileTechnicalOn = true
    },
  },
}
</script>

<style scoped>

</style>
