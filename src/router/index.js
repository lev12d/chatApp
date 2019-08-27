import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
    },
    {
      path: '/login',
      name:'login',
      component:() => import('@/pages/login/index.vue')
    },
    {
      path: '/message-center',
      name:'message-center',
      component:() => import('@/pages/message-center/index.vue')
    },
    {
      path: '/group-room',
      name:'group-room',
      component:() => import('@/pages/group-room/index.vue')
    }
  ]
})
