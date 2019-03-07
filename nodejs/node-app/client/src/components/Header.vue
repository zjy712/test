<template>
    <div id="header" >
        <div class="header_inner">
            <a href="#" id="">光影</a>
            <nav class="header_nav">
                <a class="header-navItem" href="#" id="">首页</a>
                <a class="header-navItem" href="#" id="">论坛</a>
            </nav>
            <div class="SearchBar"></div>
            <div class="header_userInfo">
                <div class="popover">
                    <i class="el-icon-bell"></i></div>
                <div class="header_profile">
                    <img :src="userinfo.avatar" width="30px" alt="">
                </div>

            </div>
        </div>
    </div >
</template>

<style scoped>
#header {
    position: relative;
    z-index: 100;
    min-width: 1032px;
    overflow: hidden;
    background: #FFFFFF;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    background-clip: content-box;
}
.header_inner {
    position: relative;
    display: flex;
    width: 1000px;
    height: 52px;
    padding: 0 16px;
    margin: 0 auto;
    align-items: center;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
}
.header_nav{
    display: flex;
    justify-content: space-between;
    height: 30px;
    margin-right: 18px;
    margin-left: 27px;
    color: #999999;
}
.SearchBar {
    width: 326px;
}
.header-navItem {
    padding: 0 15px;
    font-size: 15px;
    line-height: 30px;
    color: #8590A6;
}
.header-navItem.is-active {
    color: #444444;
}

.header_userInfo {
    flex: 1 1;
    justify-content: flex-end;
    display: flex;
    align-items: center;
}
.popover{
    margin-right: 40px;
}
</style>

<script>
export default {
    data() {
        return {
            userinfo:{
                avatar:''
            }
        }
    },
    created() {
    this.userinfo = this.$store.state.Userinfo || JSON.parse(localStorage.getItem("setUserinfo")) ;
    
  },
}
</script>