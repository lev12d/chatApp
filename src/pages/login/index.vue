<template>
    <div id="login" ref="login">
        <div class="login_form">
             <mu-container>
                <mu-text-field v-model="username" label="账号/用户名"  label-float></mu-text-field><br/>
                <mu-text-field v-model="password" label="密码" label-float   type="password"></mu-text-field><br/>
                <mu-button color="primary" @click="handleLogin" >登 录</mu-button>
             </mu-container>
             <div class="reg">  <router-link tag="span" to="register">新用户注册</router-link> </div>
        </div>
       
         <div class="alert_wrap">
             <mu-alert color="rgba(0,0,0,.7)"  v-if="alert" transition="mu-scale-transition">
               {{loginMsg}}
             </mu-alert>
         </div>
    </div>
</template>

<script>
export default {
    name:'login',
    data () {
        return{
              username:'lisi123',
              password:'123456',
              alert:false,
              loginMsg:''
           }
        },
    methods:{
         handleLogin(){              
            let   userInfo = {
                 username:this.username,
                 password:this.password
             }
            const loading= this.$loading()
            this.axios.post('/apis/login',userInfo).then(({data})=>{
              setTimeout(()=>{
                  loading.close();                   
                 this.loginMsg = data.msg;
                 this.alert = true
                     setTimeout(()=>{
                             this.alert =false;
                             if(data.status == 1){   
                                 this.$store.dispatch('updateLoginStates',true)
                                 this.$store.dispatch('updateUserStates',data.data)                                  
                                 this.$router.push({name:'message-center'})                                
                                }
                          },2500)
                 },3000)
                
             },(err)=>{
                if(err){
                     loading.close();
                     this.loginMsg = '无法连接到服务器!';
                     this.alert = true;
                     setTimeout(()=>{
                          this.alert = false;
                     },2500)
                }
             })  
           },

          
        },
        created(){
            let loginState = this.$store.getters.getLoginState;
            if(loginState){
               this.$router.push({name:'message-center'})
            }
        },
        mounted(){
            this.$refs.login.style.height = screen.height + 'px';
        }
    }
</script>

<style>
   /* .mu-input__error .mu-input-help{color: white}
   .mu-input.has-label .mu-input-label.float{color: white}
   .mu-input-help{color: white} */
   /* .mu-input-line,.mu-input-focus-line, .mu-input__error .mu-input-line{background-color: white} */
</style>

<style scoped>
    #login{width: 100%; background:url('../../../static/bg.jpg');background-size: 100%;position: relative;}
    #login .login_form{width: 100%;height: 200px;position: absolute;left: 0;top: 60px}
    .login_form >>> .mu-primary-color{width: 256px;}
    #login .alert_wrap{ min-width: 200px;height: 10px;;position: absolute; left: 50%;top:50%; transform: translate(-50%,-50%);}
    #login .alert_wrap  >>> .mu-alert{padding:10px 5px;min-height:40px;line-height:40px;display: block;}
   .mu-alert >>> .mu-inverse{text-align:center}
    #login .reg{margin-top:15px;color:#0F7ACF;}
    #login .reg span{padding:5px}
</style>