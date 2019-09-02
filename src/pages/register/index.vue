<template>
    <div class="reg_form">
         <mu-container>
                <mu-text-field v-model="username" label="账号/用户名"  label-float></mu-text-field><br/>
                <mu-text-field v-model="nickname" label="昵称"  label-float></mu-text-field><br/>
                <mu-text-field v-model="password" label="密码" label-float   type="password"></mu-text-field><br/>
                <mu-text-field v-model="enpassword" label="确认密码" label-float   type="password" ></mu-text-field><br/>
                <mu-button color="primary" @click="handleRegister" :disabled="disabled">注 册</mu-button>
         </mu-container>

          <div class="alert_wrap">
             <mu-alert color="rgba(0,0,0,.7)"  v-if="alert" transition="mu-scale-transition">
               {{msg}}
             </mu-alert>
         </div>
    </div>
</template>

<script>
    export default {
        name:'register',
        data () {
            return{
                username:'',
                nickname:'',
                password:'',
                enpassword:'',
                alert:false,
                msg:'',
                disabled:false
            }    
        },
        methods:{
           handleRegister(){
              if(this.password===this.enpassword){
                  let num = parseInt(Math.random()*10);
                   let imgUrl ='../../../static/'+num+'.jpg'
                   let regInfo = {
                   userAccount:this.username,
                   password:this.password,
                   nickname:this.nickname,
                   avatar: imgUrl
                   }
                    this.axios.post('/apis/register',regInfo).then(({data})=>{
                         console.log(data)
                         this.msg = data.msg;
                         this.alert = true;
                         setTimeout(()=>{
                              this.alert = false
                              if(data.status===1){
                              this.disabled = true;
                              this.$router.push({name:'login'})
                            }
                         },2500)
                    }) 
                 }else{
                    this.msg = '两次输入的密码不一致'   
                    this.alert = true
                    setTimeout(()=>{
                    this.alert = false 
                    },2500)
                 }
           },

        }
        
    }
</script>

<style scoped>
    .reg_form .alert_wrap{ min-width: 200px;height: 10px;;position: absolute; left: 50%;top:70%; transform: translate(-50%,-70%);}
    .reg_form .alert_wrap  >>> .mu-alert{padding:10px 5px;min-height:40px;line-height:40px;display: block;}
   .mu-alert >>> .mu-inverse{text-align:center}
</style>