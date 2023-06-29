import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import homepage from '@/safetech/views/homepage/router'
import profile from '@/safetech/views/profile/profile.router'
import profileTechnicalRouter from '@/safetech/views/profile-technical/profile-technical.router'
import myAppointmentsRouter from '@/safetech/views/pending-past-appointments/pending-past-appointments.router'
import others from '@/router/routes/others'
import pages from "@/router/routes/pages"
import reportRouter from '@/safetech/views/pending-past-appointments/report.router'
import reviewRouter from '@/safetech/views/pending-past-appointments/review.router'
import appointmentInfoRouter from '@/safetech/views/pending-past-appointments/appointmentInfo.router'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'dashboard' } },
    ...homepage,
      ...pages,
    ...others,
    ...profile,
    ...myAppointmentsRouter,
    ...profileTechnicalRouter,
    ...reportRouter,
    ...reviewRouter,
    ...appointmentInfoRouter,

    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
