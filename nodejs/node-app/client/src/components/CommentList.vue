<template>
  <div id="CommentList">
    <li>
      <div class="comment_li">
        <div class="avatar">
          <img src="http://localhost:5000/avatar/QQ图片20181213230228.jpg" alt>
        </div>
        <div class="main">
          <div class="top">
            <span class="name">一代卤蛋</span>
            <span class="date">2015/12/12</span>
          </div>
          <div
            class="comment"
          >送钱送包送房，最怕送的是心动；打黑打恶打鬼，最怕打的是人心。可以剃了别人的发，断了别人的腿，拆了别人的房，顶了别人的罪。为恶党作伥，助权势为虐，因三千块用电棍打人，花五千块举着枪呲水。这世上有人为学区房摇不到号，有人随便送套房维护关系。有人住拆迁房尊严尽失，有人为了尊严命悬一线。</div>
          <div class="active">
            <span>
              <a-icon type="like-o" style="margin-right: 8px"/>点赞
            </span>
            <span @click="edit">
              <a-ico type="message" style="margin-right: 8px"/>查看评论
            </span>
          </div>
        </div>
      </div>
      <div class="replylist">
          
      </div>
      <div v-if="isedit" class="edit">
        <a-comment>
          <a-avatar
            slot="avatar"
            src="http://localhost:5000/avatar/QQ图片20181213230228.jpg"
            alt="Han Solo"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="4"></a-textarea>
            </a-form-item>
            <a-form-item>
              <a-button htmlType="submit" type="primary" @click>提交</a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isedit: false
    };
  },
  methods: {
    edit() {
      this.isedit = !this.isedit;
    }
  }
};
</script>

<style scoped>
#CommentList {
  font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
}
.ant-list-split .ant-list-header {
}
.avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.comment_li {
  height: 135px;
  display: flex;
  border-bottom: 1px solid #e8e8e8;
}
.main {
  margin-left: 10px;
}
.top {
  height: 28px;
}
.name {
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 22px;
  font-weight: bold;
  cursor: pointer;
}
.name:hover {
  color: #1890ff;
}
.date {
  font-size: 12px;
  line-height: 18px;
  padding-left: 8px;
}
.comment {
  color: #303133;
  margin-bottom: 12px;
}
.active {
  display: flex;
  justify-content: space-between;
  padding-right: 27px;
  cursor: pointer;
}
.active span:hover {
  color: #1890ff;
}
</style>
