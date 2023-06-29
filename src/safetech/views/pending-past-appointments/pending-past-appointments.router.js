export default [
  {
    path: '/appointments/',
    name: 'my-appointments',
    component: () => import('@/safetech/views/pending-past-appointments/MyAppointments.vue'),
    meta: {
      pageTitle: 'Mis citas',
      breadcrumb: [{
        text: 'Mis citas',
      }],
    },
    children: [
      {
        path: 'pending',
        name: 'my-pending-appointments',
        component: () => import('@/safetech/views/pending-past-appointments/component/MyAppointmentsCards.vue'),
        meta: {
          pageTitle: 'Mis citas',
          breadcrumb: [
            {
              text: 'Proximas citas',
              active: true,
            },
          ],
          tab: 1,
        },
      },
      {
        path: 'old',
        name: 'my-old-appointments',
        component: () => import('@/safetech/views/pending-past-appointments/component/MyAppointmentsCards.vue'),
        meta: {
          pageTitle: 'Mis citas',
          breadcrumb: [
            {
              text: 'Historial de citas',
              active: true,
            },
          ],
          tab: 2,
        },
      },
    ],
  },
]
