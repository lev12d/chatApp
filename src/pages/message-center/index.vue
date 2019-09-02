<template>
    <div class="message-center" ref="msc">
          <header>
               <ul>
                   <li > <img :src="avatar"/><span>{{loginNickname}}</span> </li>
                   <li>消息</li>
                   <li @click="opens" ref="lis">＋</li>
               </ul>
          </header>
          <div class="items">
                 <ul class="message-group">
                      <router-link tag="li" v-for="(item) in groups" :key="item._id" :to="{path:'/group-room',query:{groupName:encodeURI(item.groupName),groupNum:encodeURI(item.groupAccount)}}">
                         <img src="../../../static/timg.jpg" alt=""> <span>{{item.groupName}}</span>
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

 <mu-popover  :open="open" :trigger="trigger">
      <mu-list>
        <mu-list-item button>
            <mu-list-item-title>添加群组</mu-list-item-title>
         </mu-list-item>
        <mu-list-item button @click="logout">
           <mu-list-item-title >退出登录</mu-list-item-title>
        </mu-list-item>
  </mu-list>
</mu-popover>
    </div>
</template>

<script>
    export default {
        name:'message-center',
        data () {
           return{
               groups:'',
               loginNickname:'',
               open:false,
               trigger:null,
               avatar:''
           }
        },
        methods :{
          getGroups(){
              let userAccount =this.$store.getters.getUserInfoState.userAccount;
              this.axios.post('/apis/getGroups',{userAccount}).then(({data})=>{
                   if(data.status==1){
                        this.groups = data.data;
                         this.$store.dispatch('updateGroupsStates',data.data)
                        // console.log(this.$store.getters.getGroupsInfoState)
                   }
                   
              })
          },

          opens(){
              this.open=!this.open
          },

          logout(){
              this.open =false
              this.$store.dispatch('updateLoginStates',false)
              this.$store.dispatch('updateUserStates',null)
               this.$store.dispatch('updateGroupsStates',null)
              this.$router.push({name:'login'})
             // console.log(this.$store.getters.getUserInfoState)
          }
        },
        created(){
             this.loginNickname=this.$store.getters.getUserInfoState.nickname; //昵称
             this.avatar = this.$store.getters.getUserInfoState.avatar;  //头像     
        },
        mounted(){      
              this.trigger=this.$refs.lis 
             this.$refs.msc.style.height = screen.height + 'px';
             this.getGroups();
            
        },
      
    }
</script>

<style scoped>
   .message-center {width: 100%;position: relative;}
    .message-center header{width: 100%;height: 50px;background: #2196f3;position: fixed;left: 0;top: 0}
     header ul{width: 100%;height: 50px;display: flex;justify-content: space-between;align-items: center;padding:8px}
    header ul li{color: white;float: left;min-width: 65px;}
    header ul li:nth-of-type(1){display: flex;justify-content: space-between;align-items: center}
    header ul li:nth-of-type(2){font-size: 16px;}
    header ul li:nth-of-type(3){font-size: 30px;}
    header ul li:nth-of-type(1) img{width: 35px;height: 35px;border-radius: 50%;}
    header ul li:nth-of-type(1) span{padding-left: 5px;font-size: 12px}
    .items{margin-top: 50px}
    .items .message-group li{width: 100%;height: 60px;border-bottom: 1px solid #e0e0e0;text-align: left;} 
    .items .message-group li img{width: 50px;height: 50px;border-radius: 50%;margin-left: 10px;vertical-align: middle;margin-top: 5px}    
    .items .message-group li span{display: inline-block;margin-left: 4px;font-size: 18px;font-weight: bolder;}
     footer {width: 100%;height: 50px;position: fixed;left: 0;bottom: 0}
</style>