<template>
  <el-form
    status-icon
    ref="user"
    label-width="100px"
    class="demo-ruleForm"
  >
  <el-form-item label="邮箱" prop="email">
      <el-input v-model="user.email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import jwt_decode from 'jwt-decode'
export default {
  data() {
    return {
        user: {
            email:'',
            password: ''
        }
    };
  },
  methods: {
    submitForm() {
        this.$axios.post("api/users/login", this.user).then(res => {
        // 登陆成功
        console.log(res);
        const {token} = res.data;
        // 解析token
        const decoded = jwt_decode(token);
        localStorage.setItem('Token',token);
        this.$message({
          message: "登陆成功",
          type: "success"
        });
        this.$router.push('/index')
      })
    },
  }
};
</script>