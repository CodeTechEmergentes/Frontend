<template>
  <b-card>
    <h5>Comentarios</h5>

    <!-- twitter feed -->
    <div
      v-for="(data,index) in twitterFeed"
      :key="data.id"
      class="profile-twitter-feed"
      :class="index != 0 ? 'mt-2' : 'mt-1'"
    >
      <div class="d-flex justify-content-start align-items-center mb-1">
        <b-avatar
          size="40"
          :src="data.user.profilePictureUrl"
          class="mr-1"
        />
        <div class="profile-user-info">
          <h6 class="mb-0">
            {{ data.user.fullName.firstName }} {{ data.user.fullName.lastName }}
          </h6>
          <b-link>
            <small class="text-muted">{{ data.score }} / 10 </small>
            <feather-icon icon="CheckCircleIcon" />
          </b-link>
        </div>
      </div>
      <b-card-text class="mb-50">
        {{ data.text }}
      </b-card-text>
      <b-link>
        <small>
          {{ data.tags }}
        </small>
      </b-link>
    </div>
    <!-- twitter feed -->
  </b-card>
</template>

<script>
import {
  BCard, BAvatar, BLink, BCardText,
} from 'bootstrap-vue'

export default {
  components: {
    BCard, BAvatar, BLink, BCardText,
  },
  props: {
    twitterFeed: {
      type: Array,
      default: () => {},
    },
  },
}
</script>
