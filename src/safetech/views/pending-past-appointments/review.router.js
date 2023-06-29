export default [
  {
    path: '/review-by-appointment/',
    name: 'review-by-appointment',
    component: () => import('@/safetech/views/pending-past-appointments/component/Review.vue'),
    meta: {
      pageTitle: 'Reseña de cita',
      breadcrumb: [{
        text: 'Reseña de cita',
      }],
    },
  },
]
