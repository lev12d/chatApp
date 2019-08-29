<template>
    <div class="room">
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

        <footer>
              <ol class="send-msg-area">
                  <li><input type="text" id="input-txt"></li>                
                  <li><span>发送</span></li>
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
               groupNum:'',
               socket:null,
               nickname:'',
               userAccount:'',
               chatLog:[]
           }
        },
    methods:{
            initSocket(){
                //昵称存在表示用户已经登录了
               if(this.$cookies.get('nickname')){
                   this.socket = io.connect('http://localhost:9000');
                   this.nickname = this.$cookies.get('nickname');
                   this.userAccount = 'lisi123';
                   let chat ={
                       userAccount :this.userAccount,
                       nickname :this.nickname,
                       msgTime : Date.parse(new Date()),
                       groupAccount : 110,
                       msg:'hello'
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
             let groupNum = Number(this.groupNum);
             this.axios.post('/apis/getChatLog',{groupAccount:groupNum}).then(({data})=>{
                     console.log(data)
             })
         },   

         talk(){
                let that = this;
                this.socket.removeAllListeners();

                this.socket.on('joinToRoom',function(data){
                     let chat = data
                     chat.msgTime = this.timeFormat(chat.msgTime)
                     that.chatLog.push(chat)
                })

                 this.socket.on('broadChat',function(data){
                     let chat = data
                     chat.msgTime = this.timeFormat(chat.msgTime)
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
      }
        },
        created(){
            this.groupNum = decodeURI(this.$route.query.groupNum);
            this.roomName = decodeURI(this.$route.query.groupName);
            this.getChatLog()
            this.initSocket()
        },
        mounted(){
             
            this.$refs.msg.style.minHeight = screen.height - 50 + 'px'        
        }
    }
</script>

<style scoped>
   .room{position: relative;}
    header{width: 100%;height: 50px;background: #2196f3;position: fixed;left: 0;top: 0}
     header span{font-size: 16px;text-align: center;color: white;height: 50px;line-height: 50px;float: left;}
      header span:nth-of-type(1){margin-left: 5px;}
     header span:nth-of-type(2){position: absolute;left: 50%;top:50%;transform: translate(-50%, -50%);}
     .message{width:100%;background: #dedede;overflow: auto}

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