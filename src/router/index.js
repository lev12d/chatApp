import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      name:'home',
    },
    {
      path: '/login',
      name:'login',
      component:() => import('@/pages/login/index.vue'),
      meta:{
        isAlive:false
      }
    },
    {
      path: '/register',
      name:'register',
      component:() => import('@/pages/register/index.vue'),
      meta:{
        isAlive:false
      }
    },
    {
      path: '/message-center',
      name:'message-center',
      component:() => import('@/pages/message-center/index.vue'),
      meta:{
        isAlive:false
      }
    },
    {
      path: '/group-room',
      name:'group-room',
      component:() => import('@/pages/group-room/index.vue'),
      meta:{
        isAlive:false
      }
    }
  ]
})
