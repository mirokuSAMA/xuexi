<template>
  <div>
    <h3 class="v_wzgl">物资管理</h3>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <h4 class="v_dl">登录系统</h4>
      <el-form-item label="" prop="pass">
        <!-- 头部插入 prefix-icon="iconfont el-icon-user"  suffix 尾部插入  内部小图标 -->
        <el-input
          prefix-icon="iconfont el-icon-user"
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="checkPass">
        <el-input
          prefix-icon="iconfont el-icon-suitcase-1"
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-checkbox>记住密码</el-checkbox>
      <el-form-item class="v_btndiv">
        <el-button class="v_btn el-icon-mobile-phone" type="primary" @click="submitForm('ruleForm')" 
          >登录</el-button
        >
        <el-button class="v_btn el-icon-refresh" @click="resetForm('ruleForm')"  
>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Loginindex",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
      // icon: "el-icon-user"
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.replace("../home/user");
        } else {
          this.$router.replace("../home/user");
          console.log("222");

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.v_wzgl {
  margin-top: 8em;
  /* font-weight: bold; */
  font-size: 28px;
  text-align: center;
}
.v_dl {
  text-align: left;
}

.el-form-item {
  padding: 0px;
  width: 100%;
  margin-left: 0px;

  /* margin: 0px 22px 22px 0px; */
}
.el-form {
  width: 18%;
  padding: 2em;
  margin: 0 auto;
  margin-top: 3em;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.v_btndiv {
  margin-top: 1em;
}
.v_btn {
  float: right;
  margin: 0px 5px 0px 5px;
}
</style>
