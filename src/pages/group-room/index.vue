<template>
    <div>
       <header>
             
                    <router-link tag="span" to="message-center"> 返回</router-link>             
                    <span>{{roomName}}</span>                
               
        </header>

        <div class="message" ref="msg">
               <ul>
                   <li>
                       <img src="" alt=""><span class="txt"></span>
                   </li>
               </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'group-room',
        data () {
           return {
               roomName :''
           }
        },
        mounted(){
            this.$refs.msg.style.minHeight = screen.height - 50 + 'px'
             this.roomName = this.$route.params.gruopName 
           
        }
    }
</script>

<style scoped>
    header{width: 100%;height: 50px;background: #2196f3;position: relative;}
     header span{font-size: 16px;text-align: center;color: white;height: 50px;line-height: 50px;float: left;}
      header span:nth-of-type(1){margin-left: 5px;}
     header span:nth-of-type(2){position: absolute;left: 50%;top:50%;transform: translate(-50%, -50%);}
     .message{width:100%;background: #dedede;overflow: auto}
</style>