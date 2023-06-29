<template>
  <div>
    <b-row>
      <b-col cols="6">
        <b-button
          class="w-100"
          :variant="activeTab === 1? 'primary' : 'outline-primary'"
          :to="{'name': 'my-pending-appointments' }"
          @click="activeTab = 1"
        >
          Proximas citas
        </b-button>
      </b-col>
      <b-col cols="6">
        <b-button
          class="w-100"
          :variant="activeTab === 2? 'primary' : 'outline-primary'"
          :to="{'name': 'my-old-appointments' }"
          @click="activeTab = 2"
        >
          Historial de citas
        </b-button>
      </b-col>
    </b-row>
    <router-view :key="$route.name"/>
  </div>
</template>

<script>
export default {
  name: 'MyAppointments',
  data() {
    return {
      activeTab: 1,
    }
  },
}
</script>

<style scoped>

</style>
