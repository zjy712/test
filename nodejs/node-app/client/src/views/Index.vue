<template>
  <div>
    <h1>index</h1>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {};
  },
  methods: {
    token() {
      var token = localStorage.getItem("Token");
      const decoded = jwt_decode(token);
      console.log(decoded);
    }
  },
  created() {
      this.token();
  },

};
</script>
