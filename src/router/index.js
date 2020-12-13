import Vue from 'vue'
import VueRouter from 'vue-router'
import Resumir from '@/views/Resumen.vue'
import Preguntas from '@/views/Preguntas.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'resumir',
    component: Resumir,
  },
  {
    path: '/preguntas',
    name: 'preguntas',
    component: Preguntas,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
