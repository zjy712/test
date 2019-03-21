<template>
    <div id="CommentList">
            <li>
                <div class="avatar">
                    <img src="http://localhost:5000/avatar/QQ图片20181213230228.jpg" alt="">
                </div>
                <div class="main">
                    <div class="top">
                        <span class="name">一代卤蛋</span>
                        <span class="date">2015/12/12</span>
                    </div>
                    <div class="comment">
                        送钱送包送房，最怕送的是心动；打黑打恶打鬼，最怕打的是人心。可以剃了别人的发，断了别人的腿，拆了别人的房，顶了别人的罪。为恶党作伥，助权势为虐，因三千块用电棍打人，花五千块举着枪呲水。这世上有人为学区房摇不到号，有人随便送套房维护关系。有人住拆迁房尊严尽失，有人为了尊严命悬一线。
                    </div>
                    <div class="active">
                        <span>点赞</span>
                        <span>回复</span>
                    </div>
                </div>
                
            </li>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // data:[]
        }
    },
}
</script>

<style scoped>
#CommentList{
    font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
li {
    height: 120px;
    display: flex;
    border-bottom: 1px solid #e8e8e8;
}

</style>
