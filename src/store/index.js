import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
     state:{
         loginState : false,
         userInfo:{},
         groupsInfo:[]
     },
     mutations:{
         updateLoginStates(state,newState){
              state.loginState = newState;
         },
         updateUserStates(state,newState){
             state.userInfo = newState
         },
         updateGroupsStates(state,newState){
             state.groupsInfo = newState
         }
     },
     actions:{
         updateLoginStates({commit},newState){
                commit('updateLoginStates',newState)
         },
         updateUserStates({commit},newState){
                commit('updateUserStates',newState)
         },
         updateGroupsStates({commit},newState){
                commit('updateGroupsStates',newState)
         }
     },
     getters:{
         getLoginState(state){
              return state.loginState 
         },
         getUserInfoState(state){
             return state.userInfo
         },
         getGroupsInfoState(state){
             return state.groupsInfo
         }
     },
     plugins:[persistedstate()]
})