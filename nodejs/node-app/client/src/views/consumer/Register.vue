<template>
  <div id="register">
    <p>注册</p>
    <div class="register-box">
      <el-tooltip class="item" effect="dark" content="上传头像" placement="top">
        <el-upload
          class="avatar-uploader"
          action="123"
          :http-request="upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="register.avatar" :src="register.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tooltip>

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
        <el-form-item label="个人简介" prop="signature">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="register.signature"
          ></el-input>
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
    </div>
  </div>
</template>

<style >
#register {
  padding-top: 138px;
}
#register {
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
}

.register-box {
  display: flex;
  justify-content: center;
  background-color: #fff;
  -webkit-box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  padding: 60px 25px 25px 25px;
  text-align: left;
  border-radius: 3px;
  width: 800px;
  margin: auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


<script>
export default {
  data() {
    return {
      register: {
        name: "",
        password: "",
        email: "",
        signature:"",
        identity: "",
        avatar: ""
      }
    };
  },
  methods: {
    submitForm() {
      if (this.register.name == '') {
        this.$message({
            message: "用户名不能为空",
            type: "error"
          });
        return
      }
      if (this.register.password == '') {
        this.$message({
            message: "密码不能为空",
            type: "error"
          });
        return
      }
      if (this.register.email == '') {
        this.$message({
            message: "邮箱不能为空",
            type: "error"
          });
        return
      }
      if (this.register.identity == '') {
        this.$message({
            message: "请设置用户类型",
            type: "error"
          });
        return
      }
      if (this.register.avatar == '') {
        this.$message({
            message: "头像不能为空",
            type: "error"
          });
        return
      }
      this.$axios
        .post("api/users/register", this.register)
        .then(res => {
          // 注册成功
          console.log(res);
          this.$message({
            message: "账号注册成功",
            type: "success"
          });
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    },
    upload(file) {
      console.log(file);
      const formData = new FormData();
      formData.append("avatar", file.file);
      this.$axios
        .post("api/users/addavatar", formData, {
          headers: { "content-type": "multipart/form-data" }
        })
        .then(res => {
          console.log(res);
          var url = res.data.data.url;
          console.log(url);
          this.register.avatar = url;
          this.$message({
            message: "头像上传成功",
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleAvatarSuccess(res, file) {
      this.avatar = URL.createObjectURL(file.raw);
      // this.$axios.post("api/users/addavatar").then(res => {
      //   console.log(res);

      // })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    document.title = "注册";
  }
};
</script>