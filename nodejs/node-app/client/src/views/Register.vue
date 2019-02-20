<template>
  <el-form :model="register" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="register.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="register.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="email" prop="email">
      <el-input v-model="register.email"></el-input>
    </el-form-item>
    <el-form-item label="用户类型">
      <el-select v-model="register.identity" placeholder="用户类型">
        <el-option label="用户" value="0"></el-option>
        <el-option label="管理员" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  data() {
    return {
      register: {
        name: "",
        password: "",
        email: "",
        identity: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.$axios.post("api/users/register", this.register).then(res => {
        // 注册成功
         console.log(res);
        this.$message({
          message: "账号注册成功",
          type: "success"
        });
        this.$router.push('/login')
      })
      .catch(err => {
        console.log(err);
        
      })
    }
  }
};
</script>