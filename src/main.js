// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Axios from 'axios'
import vueAxios from 'vue-axios'
import 'muse-ui-loading/dist/muse-ui-loading.css'
import Loading from 'muse-ui-loading'
import VueCookies from 'vue-cookies'
import store from './store'

Vue.use(VueCookies)
Vue.use(Loading,{
  overlayColor: 'rgba(0,0,0,.5)',        // 加载时的背景色
})
Vue.use(MuseUi);
Vue.use(vueAxios,Axios);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
//全局路由守卫
router.beforeEach((to,from,next)=>{
  
     if(to.path == '/login'&& !store.getters.getLoginState ){
         next()
     }else if(to.path == '/register'){
       next()
     }    
     else{
        if(store.getters.getLoginState){
            next()
        }else{
            next({ path: '/login'})
        }
     }
})