<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">

        <h2 class="brand-text text-primary ml-1">
          Fastfix
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img fluid :src="imgUrl" alt="Register V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1">
            Sign up to start 😍
          </b-card-title>

          <!-- form -->
          <validation-observer ref="registerForm" #default="{ invalid }">
            <b-form class="auth-register-form mt-2" @submit.prevent="register">
              <b-row>
                <b-col>
                  <!-- first name -->
                  <b-form-group label="First Name" label-for="register-first-name">
                    <validation-provider #default="{ errors }" name="First Name" vid="first_name" rules="required">
                      <b-form-input id="register-first-name" v-model="information.fullName.firstName"
                        name="register-username" :state="errors.length > 0 ? false : null" placeholder="Carolina" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col>
                  <!-- last name -->
                  <b-form-group label="Last Name" label-for="register-last-name">
                    <validation-provider #default="{ errors }" name="Last Name" vid="last_name" rules="required">
                      <b-form-input id="register-last-name" v-model="information.fullName.lastName"
                        name="register-last-name" :state="errors.length > 0 ? false : null" placeholder="Carolina" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <!-- dni -->
                  <b-form-group label="DNI" label-for="register-dni">
                    <validation-provider #default="{ errors }" name="DNI" vid="dni" rules="required">

                      <b-form-input id="register-dni" v-model="information.dni" name="register-dni"
                        :state="errors.length > 0 ? false : null" placeholder="12345678" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col>
                  <!-- phone -->
                  <b-form-group label="Phone" label-for="register-phone">
                    <validation-provider #default="{ errors }" name="Phone" vid="phone" rules="required">
                      <b-form-input id="register-phone" v-model="information.phone" name="register-phone"
                        :state="errors.length > 0 ? false : null" placeholder="phone" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>

                </b-col>
              </b-row>

              <!-- email -->
              <b-form-group label="Email" label-for="register-email">
                <validation-provider #default="{ errors }" name="Email" vid="email" rules="required|email">
                  <b-form-input id="register-email" v-model="information.email" name="register-email"
                    :state="errors.length > 0 ? false : null" placeholder="john@example.com" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group label-for="register-password" label="Password">
                <validation-provider #default="{ errors }" name="Password" vid="password" rules="required">
                  <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                    <b-form-input id="register-password" v-model="information.password" class="form-control-merge"
                      :type="passwordFieldType" :state="errors.length > 0 ? false : null" name="register-password"
                      placeholder="············" />
                    <b-input-group-append is-text>
                      <feather-icon :icon="passwordToggleIcon" class="cursor-pointer" @click="togglePasswordVisibility" />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- address -->
              <b-form-group label="Address" label-for="register-address">
                <validation-provider #default="{ errors }" name="Address" vid="address" rules="required">
                  <b-form-input id="register-address" v-model="information.address" name="register-address"
                    :state="errors.length > 0 ? false : null" placeholder="address" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- birthday -->
              <b-form-group label="Birthday" label-for="register-birthday">
                <validation-provider #default="{ errors }" name="Birthday" vid="birthday" rules="required">

                  <b-form-datepicker id="register-birthday" v-model="information.birthdayDate" name="register-birthday"
                    :state="errors.length > 0 ? false : null" placeholder="birthday" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox id="register-privacy-policy" v-model="status" name="checkbox-1">
                  I agree to
                  <b-link>privacy policy & terms</b-link>
                </b-form-checkbox>
              </b-form-group>

              <b-button variant="primary" block type="submit" :disabled="invalid">
                Sign up
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Already have an account?</span>
            <b-link :to="{ name: 'auth-login' }">
              <span>&nbsp;Sign in instead</span>
            </b-link>
          </p>

        </b-col>
      </b-col>
      <!-- /Register-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BButton, BForm, BFormCheckbox, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BImg, BCardTitle, BCardText,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import useJwt from '@/auth/jwt/useJwt'
import AuthenticationService from '@/safetech/views/authentication/authentication.service'

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      username: '',
      userEmail: '',
      password: '',
      sideImg: require('@/assets/images/pages/chat-bot.png'),
      // validation
      required,
      email,
      information: {
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
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/img.png')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {

    register() {
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          console.log(success)
          useJwt.register({
            username: `${this.information.fullName.firstName} ${this.information.fullName.lastName}`,
            email: this.information.email,
            password: this.information.password,
          })
            .then(async response => {
              // const temporal = {
              //   fullName: {
              //     firstName: 'Debie',
              //     lastName: 'Garcia',
              //   },
              //   dni: '18965313',
              //   email: 'de2b3i3e@gmail.com',
              //   password: 'btsforever',
              //   profilePictureUrl: 'string',
              //   address: 'string',
              //   phone: '933258723',
              //   birthdayDate: '2022-10-27T16:25:18.956Z',
              // }

              useJwt.setToken(response.data.accessToken)
              useJwt.setRefreshToken(response.data.refreshToken)
              const dataInfo = response.data.userData
              const data = await AuthenticationService.registerUser(this.information)
              if (data.status === 200) {
                dataInfo.id = data.data.id

                localStorage.setItem('userData', JSON.stringify(dataInfo))

                this.$ability.update(response.data.userData.ability)
                await this.$router.push('/')
              }
            })
            .catch(error => {
              this.$refs.registerForm.setErrors(error.response.data.error)
            })
        }
      })
    },
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
