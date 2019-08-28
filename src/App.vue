<template>
  <div id="app">
   <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cacheNames">
           <router-view/>
        </keep-alive>
   </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      cacheNames:[]
    }
  },
 
  watch:{
    $route(){
      if(this.$route.meta.isAlive){
          this.cacheNames.push(this.$route.name)
      }
      // console.log(this.$route)
    }
  }
  
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
</style>
