<template>
    <div class="room" >
       <header>
             
                    <router-link tag="span" to="message-center"> 返回</router-link>             
                    <span>{{roomName}} ({{groupMemberNum}})</span>                
               
        </header>

        <div class="message" ref="msg">              
            <ul>
                  
                <li v-for="(item) in chatLog" :key="item._id" :class="item.nickname==nickname?'right':'left'">

                        <div v-if="item.type=='systemMsg'" class="system-msg">                           
                                <i>{{item.systemMsg}}</i>                           
                         </div>

                       <div  class="txt" v-else>
                           <img :src="item.nickname==nickname?avatar:item.avatar">
                            <div class="msg-txt">
                                <p>{{item.nickname}}</p>
                                <span >{{item.msg}}</span>
                            </div>                                                      
                       </div>                     
                </li>
                    
            </ul>
              
        </div>

        <footer>
              <ol class="send-msg-area">
                  <li><input type="text" id="input-txt" ref="input"></li>                
                  <li><span @click="sendMsg">发送</span></li>
              </ol>
        </footer>
    </div>
</template>

<script>
import io from 'socket.io-client'
    export default {
        name:'group-room',
        data () {
           return {
               roomName :'',
               groupId:'',
               groupMemberNum:0,
               socket:null,
               nickname:'',
               userAccount:'',
               avatar:'',
               chatLog:[],
           }
        },
    methods:{
            initSocket(){
                //昵称存在表示用户已经登录了
               if(this.$store.getters.getUserInfoState.nickname){
                   this.socket = io.connect('http://localhost:9001');
                   this.nickname = this.$store.getters.getUserInfoState.nickname;
                   this.userAccount = this.$store.getters.getUserInfoState.userAccount;
                   let groups = this.$store.getters.getGroupsInfoState;
                   groups.forEach((ele)=>{
                      if(this.groupId==ele.groupAccount){
                            this.groupMemberNum = ele.groupMember.length;
                      }
                   })
                   let chat ={
                       userAccount :this.userAccount,
                       nickname :this.nickname,
                       msgTime : Date.parse(new Date()),
                       groupAccount : 110,
                       systemMsg:this.nickname+'加入了房间!',
                       type:'systemMsg'
                   }
                    
                    this.socket.removeAllListeners()
                   setTimeout(()=>{                      
                       this.socket.emit('joinToRoom',chat)
                   },200)

                   this.talk()
               }else{
                   this.$route.push('/login')
               }
            },

         getChatLog(){
             let groupId = Number(this.groupId);
             this.axios.post('/apis/getChatLog',{groupAccount:groupId}).then(({data})=>{
                    if(data.status === 1){
                         this.chatLog=data.data
                    }else{
                        console.log(data.msg)
                    }
                    console.log(this.chatLog)
             })
         },   

         talk(){
                let that = this;
                this.socket.removeAllListeners();

                this.socket.on('joinToRoom',function(data){
                     let chat = data
                     chat.msgTime = that.timeFormat(chat.msgTime)
                     that.chatLog.push(chat)
                })
               
               this.socket.on('leaveToRoom', function (data) {
                     let chat = data
                     chat.msgTime = that.timeFormat(chat.msgTime)
                     that.chatLog.push(chat)
                })

                 this.socket.on('broadMsg',function(data){
                     let chat = data
                     //console.log(chat)
                     chat.msgTime = that.timeFormat(chat.msgTime)
                     that.chatLog.push(chat)
                })
            },

       timeFormat (timestamp) {
            let time = new Date(timestamp)
            let y = time.getFullYear()
            let m = time.getMonth() + 1
            let d = time.getDate()
            let h = time.getHours()
            let mm = time.getMinutes()
            let s = time.getSeconds()
            return y + '/' + this.add0(m) + '/' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
           },
          
          add0 (m) {
                   return m < 10 ? '0' + m : m
          },

       sendMsg(){
           let inputText = this.$refs.input.value;
           let chatMsg = {
                userAccount:this.userAccount,
                nickname:this.nickname,
                groupAccount:this.groupId,
                msgTime:Date.parse(new Date()),
                groupName:this.roomName,
                msg:inputText,
                avatar:this.avatar
             }
             //console.log(chatMsg)
             this.socket.emit('g1',chatMsg);
             this.$refs.input.value = '';
          },

          disconnectSocket(){
              let chat ={
                       userAccount :this.userAccount,
                       nickname :this.nickname,
                       msgTime : Date.parse(new Date()),
                       groupAccount : 110,
                       systemMsg:this.nickname+'离开了房间!',
                       type:'systemMsg'
                   }
            this.socket.removeAllListeners()
            setTimeout(()=>{
                this.socket.emit('leaveToRoom', chat);
            },200)
          }
        
     },
        created(){
            this.groupId = decodeURI(this.$route.query.groupNum);
            this.roomName = decodeURI(this.$route.query.groupName);
            this.avatar = this.$store.getters.getUserInfoState.avatar
            this.getChatLog()
            this.initSocket()
        },
        mounted(){
            this.$refs.msg.style.height = screen.height - 50 + 'px'  
        },
        updated(){
            this.$refs.msg.scrollTo(0,999999)
        },
        beforeDestroy(){
            this.disconnectSocket();
        }
    }
</script>

<style scoped>
   .room{position: relative;}
    header{width: 100%;height: 50px;background: #2196f3;position: fixed;left: 0;top: 0;z-index: 10;}
     header span{font-size: 16px;text-align: center;color: white;height: 50px;line-height: 50px;float: left;}
      header span:nth-of-type(1){margin-left: 5px;}
     header span:nth-of-type(2){position: absolute;left: 50%;top:50%;transform: translate(-50%, -50%);}
     .message{width:100%;background: #dedede;overflow-y: scroll;padding-top: 50px;padding-bottom: 50px;}
     .message li .system-msg { font-size: 12px;transform: scale(0.9);text-align: center;padding: 0;}
     .message li .system-msg i{font-style: normal;font-weight: normal;background: #ccc;color: #2196f3;padding: 4px;border-radius: 4px}
     .message li{padding: 8px 5px;position: relative;overflow: hidden;}
     .message li p{color: #888;padding-bottom:4px;font-size: 12px}
     .message li .txt{ width: 100%;}
     .message li.left .txt .msg-txt{width: 200px;float: left;}
     .message li.right .txt .msg-txt{width: 200px;float: right;}
     .message li.right{text-align: right}  
     .message li.right img{float: right}  
     .message li.left{text-align: left}
     .message li.left img{float:left}
     .message li img{width: 40px;height: 40px;border-radius: 50%;display: block;}
     .message li span{display: inline-block;max-width: 200px;border-radius: 8px;background: #6abe83;color: black;
     padding: 10px 15px;position: relative;}
     .message li span::after{content: '';position: absolute;border-top: 6px solid transparent;border-bottom:6px solid transparent;
      top: 9px}
      .message li.left .msg-txt{margin-left: 10px}
      .message li.right .msg-txt{margin-right: 10px}
      .message li.left span::after{ border-right:6px solid #6abe83;left:-6px;}
      .message li.right span::after{border-left:6px solid #6abe83;right:-6px;}

     footer{width: 100%;min-height: 50px;position: fixed;left: 0;bottom: 0;border: 1px solid #c1c1c1;border-left: none;border-right: none;
     background: #dedede}
    footer .send-msg-area{width: 88%;min-height: 40px;margin-top: 5px;margin-left: 8%;}
    footer .send-msg-area li:nth-of-type(1){width: 80%;}
    footer .send-msg-area li:nth-of-type(1) #input-txt{width: 100%;border: none;border-radius: 6px;outline: none;
    font-size: 18px;text-indent: 8px}
    footer .send-msg-area li:nth-of-type(2){width: 18%;}
    footer .send-msg-area li:nth-of-type(2) span{width: 100%;height: 30px;line-height: 30px;display: inline-block;background: #2196f3;color: white;
    border-radius: 4px;margin:5px 10px}
    footer .send-msg-area li{min-height: 40px;float: left;}
    footer #input-txt{width: 60%;min-height: 40px}
</style>