<template>
    <div class="message-center" ref="msc">
          <header>
               <ul>
                   <li> <img/> </li>
                   <li>消息</li>
                   <li>＋</li>
               </ul>
          </header>
          <div class="items">
                 <ul class="message-group">
                      <router-link tag="li" v-for="(item) in groups" :key="item.groupID" :to="{name:'group-room',params:item}">
                         <img :src="item.groupPic" alt=""> <span>{{item.gruopName}}</span>
                     </router-link>
                 </ul>
          </div>
          <footer>
               <mu-bottom-nav>
                 <mu-bottom-nav-item title="消息" ></mu-bottom-nav-item>
                 <mu-bottom-nav-item title="联系人" ></mu-bottom-nav-item>
                 <mu-bottom-nav-item title="动态" ></mu-bottom-nav-item>
               </mu-bottom-nav>
          </footer>
    </div>
</template>

<script>
    export default {
        name:'messageCenter',
        data () {
           return{
               groups:[
                   {groupID:1,gruopName:'同学群',groupMember:[ {username:'zhangsan'},{username:'liyang'} ],groupPic:'../../../static/1.jpg'},
                   {groupID:2,gruopName:'同事群',groupMember:[{username:'lisi'}], groupPic:'../../../static/0.jpg'}
               ]
           }
        },
        mounted(){
             this.$refs.msc.style.height = screen.height + 'px';
        }
    }
</script>

<style scoped>
   .message-center {width: 100%;position: relative;}
    .message-center header{width: 100%;height: 50px;background: #2196f3;}
     header ul{width: 100%;height: 50px;display: flex;justify-content: space-between;align-items: center}
    header ul li{color: white;float: left}
    header ul li:nth-of-type(2){font-size: 16px;margin-left: 15px}
    header ul li:nth-of-type(3){font-size: 30px}
    .items .message-group li{width: 100%;height: 60px;border-bottom: 1px solid #e0e0e0;text-align: left;} 
    .items .message-group li img{width: 50px;height: 50px;border-radius: 50%;margin-left: 10px;vertical-align: middle;margin-top: 5px}    
    .items .message-group li span{display: inline-block;margin-left: 4px;font-size: 18px;font-weight: bolder;}
     footer {width: 100%;height: 50px;position: absolute;left: 0;bottom: 0}
</style>