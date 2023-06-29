<template>
  <b-modal
    v-model="onControl"
    title="Perfil del técnico"
    title-tag="h3"
    hide-footer
    size="xl"
    scrollable
    header-bg-variant="primary"
    @hidden="close"
  >
    <profile :technical-id="technicalId" />
  </b-modal>
</template>

<script>
import Profile from '@/views/pages/profile/Profile.vue'

export default {
  props: {
    technicalId: {
      type: Number,
      default: null,
    },
  },
  components: {
    Profile,
  },
  data() {
    return {
      onControl: false,
    }
  },
  created() {
    this.onControl = true
  },
  methods: {
    close() {
      this.onControl = false
      this.$emit('close')
    },
  },
}
</script>

<style scoped>

</style>
