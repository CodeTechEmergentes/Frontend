export default [
    {
        path: 'appointment-info',
        name: 'appointment-info',
        component: () => import('@/safetech/views/pending-past-appointments/component/AppointmentInfo.vue'),
        meta: {
            pageTitle: 'Información de la cita',
            breadcrumb: [
                {
                    text: 'Información de la cita',
                }],
        },
    },
]
