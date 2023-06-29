<template>
  <b-card>
    <!-- about -->
    <div
      class="mt-2"
    >
      <h5 class="mb-75">
        Acerca de:
      </h5>
      <b-card-text>
        {{ aboutData.aboutMe }}
      </b-card-text>
    </div>
    <div
      class="mt-2"
    >
      <h5 class="text-capitalize mb-75">
        Direccion:
      </h5>
      <b-card-text>
        {{ aboutData.address }}
      </b-card-text>
    </div>
    <div
      class="mt-2"
    >
      <h5 class="text-capitalize mb-75">
        Telefono:
      </h5>
      <b-card-text>
        {{ aboutData.phone }}
      </b-card-text>
    </div>
    <div
      class="mt-2"
    >
      <h5 class="text-capitalize mb-75">
        Fecha de cumpleaños:
      </h5>
      <b-card-text>
        {{ aboutData.birthdayDate | myGlobal }}
      </b-card-text>
    </div>
  </b-card>
</template>

<script>
import { BCard, BCardText } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
  },
  props: {
    aboutData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
