export default [

  {
    path: '/dashboard/',
    name: 'dashboard',
    component: () => import('@/safetech/views/homepage/Homepage.vue'),
  },
  {
    path: '/step-1/choose-appliance',
    name: 'choose-appliance',
    component: () => import('@/safetech/views/new-appointment/NewAppointment.vue'),
    meta: {
      pageTitle: 'Escoger servicio',
      breadcrumb: [{
        text: 'Escoger servicio',
      }],
    },
  },
  {
    path: '/step-2/choose-technical',
    name: 'choose-technical',
    component: () => import('@/safetech/views/new-appointment/ListOfTechnicals.vue'),
    meta: {
      pageTitle: 'Escoger técnico',
      breadcrumb: [{
        text: 'Escoger técnico',
      }],
    },
  },
  {
    path: '/step-3/summary',
    name: 'appointment-summary',
    component: () => import('@/safetech/views/new-appointment/AppointmentSummary.vue'),
    meta: {
      pageTitle: 'Resumen de la cita',
      breadcrumb: [{
        text: 'Resumen de la cita',
      }],
    },
  },
]
