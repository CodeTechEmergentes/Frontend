export default [
  {
    path: '/profile/',
    name: 'user-profile',
    component: () => import('@/safetech/views/profile/Profile.vue'),
    meta: {
      pageTitle: 'Perfil',
      breadcrumb: [{
        text: 'Perfil',
      }],
    },
  },
]
