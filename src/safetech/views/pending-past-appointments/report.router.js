export default [
  {
    path: '/report-by-appointment/',
    name: 'report-by-appointment',
    component: () => import('@/safetech/views/pending-past-appointments/component/ReportByAppointment.vue'),
    meta: {
      pageTitle: 'Reporte de cita',
      breadcrumb: [{
        text: 'Reporte de cita',
      }],
    },
  },
]
