// path: prj01\src\views\HomeView.vue
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/notify'
  },
  {
    path: '/notify',
    name: 'notify',
    component: () => import('@/views/NotifyView.vue')
  },
  
]

const router = new VueRouter({
  // mode: 'Hash',
  base: process.env.BASE_URL,
  routes
})

export default router
