<template>
  <b-card
    class="profile-header mb-2"
    img-top
    alt="cover photo"
    body-class="p-0"
  >
    <!-- profile picture -->
    <div
      class="position-relative"
      style="margin-top: 7rem"
    >
      <div class="profile-img-container d-flex align-items-center">
        <div class="profile-img">
          <b-img
            :src="headerData.profilePictureUrl"
            rounded
            fluid
          />
        </div>
        <!-- profile title -->
        <div class="profile-title ml-2">
          <h2>
            {{ headerData.fullName.firstName }}
          </h2>
          <p>
            {{ headerData.fullName.lastName }}
          </p>
        </div>
        <b-button class="ml-2" variant="primary">
          {{ headerData.score }} / 10
        </b-button>
        <!--/ profile title -->
      </div>
    </div>
    <!--/ profile picture -->

    <!-- profile navbar -->
<!--    <div class="profile-header-nav">-->
<!--      <b-navbar-->
<!--        toggleable="md"-->
<!--        type="light"-->
<!--      >-->
<!--        &lt;!&ndash; toggle button &ndash;&gt;-->
<!--        <b-navbar-toggle-->
<!--          class="ml-auto"-->
<!--          target="nav-text-collapse"-->
<!--        >-->
<!--          <feather-icon-->
<!--            icon="AlignJustifyIcon"-->
<!--            size="21"-->
<!--          />-->
<!--        </b-navbar-toggle>-->
<!--        &lt;!&ndash;/ toggle button &ndash;&gt;-->

<!--        &lt;!&ndash; collapse &ndash;&gt;-->
<!--        <b-collapse-->
<!--          id="nav-text-collapse"-->
<!--          is-nav-->
<!--        >-->
<!--          <b-tabs-->
<!--            pills-->
<!--            class="profile-tabs mt-md-0"-->
<!--            nav-class="mb-0"-->
<!--          >-->
<!--            <template #tabs-start>-->
<!--              <b-nav-item-->
<!--                role="presentation"-->
<!--                active-->
<!--                class="font-weight-bold"-->
<!--              >-->
<!--                <span class="d-none d-md-block">{{ headerData.score }} / 10</span>-->
<!--                <feather-icon-->
<!--                  icon="RssIcon"-->
<!--                  class="d-block d-md-none"-->
<!--                />-->
<!--              </b-nav-item>-->
<!--            </template>-->
<!--          </b-tabs>-->

<!--        </b-collapse>-->
<!--        &lt;!&ndash;/ collapse &ndash;&gt;-->
<!--      </b-navbar>-->
<!--    </div>-->
    <!--/ profile navbar -->
  </b-card>
</template>

<script>
import {
  BCard, BImg, BNavbar, BNavbarToggle, BCollapse, BTabs, BNavItem, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BTabs,
    BButton,
    BNavItem,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
  },
  directives: {
    Ripple,
  },
  props: {
    headerData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
