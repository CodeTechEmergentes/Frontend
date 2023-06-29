<template>
  <b-card title="Informacion de tu perfil">
    <validation-observer ref="form">
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Nombre:"
          >
            <validation-provider
              v-slot="{ errors }"
              name="firstName"
              rules="required"
            >
              <b-form-input
                v-model="userToUpdate.fullName.firstName"

                :state="errors[0] ? false : null"
                :disabled="isDisabled"
              />
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Apellido:"
          >
            <validation-provider
              v-slot="{ errors }"
              name="lastName"
              rules="required"
            >
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  v-model="userToUpdate.fullName.lastName"
                  :state="errors[0] ? false : null"
                  :disabled="isDisabled"
                />
              </b-input-group>
            </validation-provider>
          </b-form-group>

        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Direccion:"
          >
            <validation-provider
              v-slot="{ errors }"
              name="address"
              rules="required"
            >
              <b-form-input
                v-model="userToUpdate.address"
                :state="errors[0] ? false : null"
                :disabled="isDisabled"
              />
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-form-group
            label="Telefono:"
          >
            <validation-provider
              v-slot="{ errors }"
              name="phone"
              rules="required"
            >
              <b-form-input
                v-model="userToUpdate.phone"
                :state="errors[0] ? false : null"
                :disabled="isDisabled"
                type="number"
              />
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            label="DNI:"
          >
            <validation-provider
              v-slot="{ errors }"
              name="dni"
              rules="required"
            >
              <b-form-input
                v-model="userToUpdate.dni"

                :state="errors[0] ? false : null"
                :disabled="isDisabled"
              />
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            label="Fecha de nacimiento:"
          >
            <validation-provider
              v-slot="{ errors }"
              name="birthday"
              rules="required"
            >
              <b-form-datepicker
                v-model="userToUpdate.birthdayDate"

                :state="errors[0] ? false : null"
                :disabled="isDisabled"
              />
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Correo electronico:"
          >
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required"
            >
              <b-form-input
                v-model="userToUpdate.email"

                :state="errors[0] ? false : null"
                :disabled="isDisabled"
              />
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Contraseña:"
          >
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required"
            >
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  id="login-password"
                  v-model="userToUpdate.password"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  :state="errors[0] ? false : null"
                  name="login-password"
                  placeholder="Password"
                  :disabled="isDisabled"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>
            </validation-provider>
          </b-form-group>

        </b-col>
      </b-row>
    </validation-observer>
    <b-row>
      <b-col class="w-100">
        <div class="d-flex justify-content-end">
          <b-button
            v-if="isDisabled"
            variant="primary"
            @click="isDisabled = false"
          >
            Actualizar
          </b-button>
          <b-button
            v-if="!isDisabled"
            class="ml-1"
            variant="outline-danger"
          >
            Cancelar
          </b-button>
          <b-button
            v-if="!isDisabled"
            variant="success"
            class="ml-1"
            @click="saveUser"
          >
            Guardar
          </b-button>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import ProfileService from '@/safetech/views/profile/profile.service'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'

export default {
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userToUpdate: {
        id: '',
        fullName: {
          firstName: '',
          lastName: '',
        },
        dni: '',
        email: '',
        password: '',
        profilePictureUrl: '',
        address: '',
        phone: '',
        birthdayDate: '',
      },
      userData: '',
      isDisabled: true,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    dateSelectedFormatted() {
      return `${this.userToUpdate.birthdayDate}T$00:00:00.000Z`
    },
  },
  async created() {
    this.userData = JSON.parse(localStorage.getItem('userData'))
    const data = await ProfileService.getUserById(this.userData.id)
    if (data.status === 200) {
      this.userToUpdate = data.data
      console.log('userToUpdate ', this.userToUpdate)
    }
  },
  methods: {
    async saveUser() {
      const validate = await this.$refs.form.validate()
      if (validate) {
        const data = await ProfileService.updateUserById(this.userData.id, this.userToUpdate)
        if (data.status === 200) {
          this.$bvToast.toast('Usuario actualizado correctamente', {
            title: 'Actualizado',
            variant: 'success',
            solid: true,
          })
          this.isDisabled = true
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
