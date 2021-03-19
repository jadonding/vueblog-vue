<template>
  <div>

    <el-container>
      <el-header height="200px">
        <img class="mlogo" src="http://www.jdblg.cn/wp-content/uploads/2019/12/Jadons.png" alt="">
      </el-header>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-main>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: '111111'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择密码', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/login', this.ruleForm).then(res => {

            const jwt = res.headers['authorization'];
            const userInfo = res.data.data;
            // console.log(userInfo);
            // 把数据共享出去
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo)

            // 获取
            console.log(_this.$store.getters.getUser)

            _this.$router.push("/blogs")
          })

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
}
</script>

<style scoped>
.el-header{
  background-color: #a7d9db;
  text-align: center;
  line-height: 60px;
}

.el-main {
  /*background-color:skyblue;*/
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;

}

.mlogo {
  height: 100%;
  /*margin-top: 0px;*/
}

.demo-ruleForm {
  max-width: 500px;
  margin: 0 auto;
}

</style>
