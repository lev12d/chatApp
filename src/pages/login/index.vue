<template>
    <div id="login" ref="login">
        <div class="login_form">
             <mu-container>
                <mu-text-field v-model="username" label="账号/用户名/昵称" label-float help-text="用户名为6-12长度的字符"  ></mu-text-field><br/>
                <mu-text-field v-model="password" label="密码" label-float error-text="请输入密码"  ></mu-text-field><br/>
                <mu-button color="primary" >登 录</mu-button>
             </mu-container>
        </div>

    </div>
</template>

<script>
    export default {
        name:'login',
        data () {
           return{
              username:'',
              password:''
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
</style>