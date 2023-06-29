<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-input-group>
          <b-form-input
            v-model="searchInput"
            placeholder="Buscar aparato tecnológico"
            @keyup.enter="getAppliancesByName"
          />
          <template #append>
            <b-button
              variant="primary"
              @click="getAppliancesByName"
            ><feather-icon
              icon="SearchIcon"
            /></b-button>
          </template>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col
        cols="12"
        class="d-flex"
      >
        <div
          v-for="(appliance, index) in appliances"
          :key="index"
          class="d-flex"
        >
          <b-card
            :title="appliance.name"
            :img-src="appliance.imgUrl"
            img-alt="Image"
            img-top
            img-height="120px"
            img-width="120px"
            tag="article"
            style="width: 16rem;"
            class="mb-2 mr-1 cursor-pointer"
            @click="selectAppliance(appliance)"
          />
        </div>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import HeaderSlot from '@/safetech/commons/HeaderSlot.vue'
import NewAppointmentService from '@/safetech/views/new-appointment/new-appointment.service'
import { mapActions } from 'vuex'

export default {
  components: {
    HeaderSlot,
  },
  data() {
    return {
      appliances: [],
      searchInput: '',
      applianceSelected: null,
    }
  },
  async created() {
    await this.getAppliances()
  },
  methods: {
    ...mapActions({
      A_SET_APPLIANCE_SELECTED: 'NewAppointmentStore/A_SET_APPLIANCE_SELECTED',
    }),
    selectAppliance(item) {
      this.A_SET_APPLIANCE_SELECTED(item)
      this.$router.push({ name: 'choose-technical' })
    },
    async getAppliances() {
      const data = await NewAppointmentService.getAppliances()
      if (data.status === 200) {
        this.appliances = data.data
      }
    },
    async getAppliancesByName() {
      if (this.searchInput == null || this.searchInput === '') {
        await this.getAppliances()
      } else {
        const data = await NewAppointmentService.getAppliancesByName(this.searchInput)
        if (data.status === 200) {
          this.appliances = data.data
        }
      }
    },
    async createAppointment() {
      const data = await NewAppointmentService.createAppointment()
    }
  },
}
</script>

<style scoped>

</style>
