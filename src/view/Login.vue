<template>
  <div>
   <el-form :model="loginForm" :rules="rules" ref="login_Form" label-width="100px" class="ruleLoginForm">
     <el-form-item label="账 号:" prop="username">
      <el-input v-model="loginForm.username" type="text"></el-input>
    </el-form-item>
    <el-form-item label="密 码:" prop="password">
      <el-input v-model="loginForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="验证码:" prop="code">
      <el-input v-model="loginForm.code" type="text"></el-input>
      <img :src="imgSrc" @click="changeCode"/>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="submitForm('login_Form')">登 录</el-button>
    <el-button type="danger" @click="resetForm('login_Form')">重 置</el-button>
  </el-form-item>
   </el-form> 
  </div>
</template>

<script>
export default {
  name: "Login",
  created() {},
  data() {
    return {
      loginForm:{
        username: '',
        password: '',
        code: ''
      },
       rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        ],
        code:[
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      imgSrc: 'http://localhost:7001/verifycode'
    };
  },
  props: {},
  methods: {
    changeCode(e){
      console.log(e);
      this.imgSrc = `http://localhost:7001/verifycode?${Math.random()}`;
    },
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.doPOST('/hello/login',this.loginForm).then(res=>{
              console.log(res)
            }).catch(err => console.log(err));
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     },
      
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }

  }
};
</script>

<style lang="scss" scoped></style>