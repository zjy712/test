<template>
  <div id="moveinfo">
    <el-card class="el_card">
      <a-skeleton :loading="loading" active :row="4">
        <div class="slate_wrapper">
          <div class="poster">
            <img :src="'https://images.weserv.nl/?url='+(info.images.large.slice(7))" alt srcset>
          </div>
          <div class="titleBar">
            <div class="rating">
              <div class="average">
                <div class="ratingValue">
                  <strong title="7.6 based on 53,695 user ratings">
                    <span itemprop="ratingValue">{{info.rating.average}}</span>
                  </strong>
                  <span class="grey">/</span>
                  <span class="grey" itemprop="bestRating">10</span>
                </div>
                <span class="small" itemprop="ratingCount">53,695</span>
              </div>
            </div>
            <div>
              <h1>
                {{info.title}}
                <span class="year">({{info.year}})</span>
              </h1>
            </div>
            <div>
              <span
                class="aka"
              >{{ (info.countries.indexOf('中国大陆')>-1 || info.countries.indexOf('香港')>-1 || info.countries.indexOf('台湾')>-1) ? info.aka.split(',')[info.aka.split(',').length-1] :info.original_title}}</span>
              <!-- <div style="margin-left:45px;display: inline-block;">
            <span v-for="(item, index) in info.genres" :key="index">{{item +' '}}</span>
          </div>
          <div style="margin-left:45px;display: inline-block;">
            <span v-for="(item, index) in info.countries" :key="index">{{item +' '}}</span>
              </div>-->
            </div>

            <div class="center">
              <div class="centre_left">
                <div class="info">
                  <div style="    display: flex;">
                    <span>导演：</span>
                    <div class style="margin-left: 10px;">
                      <img
                        :src="'https://images.weserv.nl/?url='+(info.directors[0].avatars.small.slice(7))"
                        style="height: 133px;border-radius: 10px;"
                        alt
                        srcset
                      >
                      <span style="display: block;text-align: center;">{{info.directors[0].name}}</span>
                    </div>
                  </div>
                </div>
                <div class="info">
                  <div style="    display: flex;">
                    <span>类型：</span>
                    <div class style="margin-left: 10px;">
                      <span v-for="(item, index) in info.genres" :key="index">{{item +' '}}</span>
                    </div>
                  </div>
                </div>
                <div class="info">
                  <div style="    display: flex;">
                    <span>制作国家：</span>
                    <div class style="margin-left: 10px;">
                      <span v-for="(item, index) in info.countries" :key="index">{{item +' '}}</span>
                    </div>
                  </div>
                </div>
                <div class="info">
                  <div style="    display: flex;">
                    <span>又名：</span>
                    <div class style="margin-left: 10px;">
                      <span>{{info.aka}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="center_right">
                <div class="info">
                  <div style="display: flex;">
                    <span>主演：</span>
                    <div class="casts">
                      <div
                        v-for="(item, index) in info.casts"
                        :key="index"
                        class="cast"
                        style="margin-left: 10px;"
                      >
                        <img
                          :src="'https://images.weserv.nl/?url='+(item.avatars.small.slice(7))"
                          style="height: 75px;border-radius: 10px; margin-bottom: 10px "
                          alt
                          srcset
                        >
                        <span
                          style="display: block;text-align: center;    margin: auto 25px;; "
                        >{{item.name}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-skeleton>
    </el-card>

    <a-skeleton :loading="loading" active>
      <el-card class="summary el_card">
        <div class="summary_title clearfix" slot="header">{{info.title}}的故事梗概</div>
        <p class="summary_com">{{info.summary}}</p>
      </el-card>
    </a-skeleton>

    <a-skeleton :loading="loading" active>
      <el-card class="el_card">
        <div class="summary_title clearfix" slot="header">
          <span>留言</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="paragraph">写留言</el-button>
        </div>
        <div class="paragraph_main">
          <div class="paragraph_add" v-if="isparagraph_add">
            <a-comment>
              <a-avatar
                slot="avatar"
                :src="userinfo.avatar"
                alt="Han Solo"
              />
              <div slot="content">
                <a-form-item>
                  <a-textarea v-model="new_paragraph.content" :rows="4"></a-textarea>
                </a-form-item>
                <a-form-item>
                  <a-button htmlType="submit" type="primary" @click="postNewParagraph">提交</a-button>
                </a-form-item>
              </div>
            </a-comment>
          </div>
          <div class="paragraph_list">
            <a-list
              class="comment-list"
              :header="`${data.length} replies`"
              itemLayout="horizontal"
              :dataSource="data"
            >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-comment :author="item.author" :avatar="item.avatar">
                  <template slot="actions">
                    <!-- <span v-for="action in item.actions">{{action}}</span> -->
                    <div class="paragraph_add" v-if="isparagraph_add">
                    <a-comment>
                      <a-avatar
                        slot="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                      />
                      <div slot="content">
                        <a-form-item>
                          <a-textarea :rows="4"></a-textarea>
                        </a-form-item>
                        <a-form-item>
                          <a-button htmlType="submit" type="primary">Add Comment</a-button>
                        </a-form-item>
                      </div>
                    </a-comment>
          </div>
                  </template>
                  <p slot="content">{{item.content}}</p>
                  <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
                    <span>{{item.datetime.fromNow()}}</span>
                  </a-tooltip>
                </a-comment>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </el-card>
    </a-skeleton>
  </div>
</template>



<script>
import moment from 'moment'
import qs from 'qs'

export default {
  data() {
    return {
      userinfo:{
        avatar:''
      },
      movie_id: this.$route.params.id,
      info: {
        images: {
          large: ""
        },
        rating: {
          average: []
        },
        countries: [],
        cats:[],
        directors:[{avatars:{small:''},name:''}]
      },
      loading: true,
      isparagraph_add: false,

      new_paragraph:{
        content:''
      },
      data: [
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(1, 'days'),
        },
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(2, 'days'),
        },
      ],
      moment,
    };
  },
  methods: {
    getinfo() {
      this.$axios.get("/api/movieinfo/" + this.movie_id).then(res => {
        console.log(res.data);
        this.info = res.data.data;

        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
    },
    paragraph() {
      this.isparagraph_add = !this.isparagraph_add;
    },
    postNewParagraph(){
      this.new_paragraph.movie_id = this.movie_id;
this.new_paragraph.user_avatar = this.userinfo.avatar;
      this.new_paragraph.user_email = this.userinfo.email;
      

      this.$axios.post("/api/paragraph/add" , qs.stringify(this.new_paragraph)).then(res =>{
          console.log(res);
          
      })
    }
  },
  created() {
    this.getinfo();
    this.userinfo = this.$store.state.Userinfo || JSON.parse(localStorage.getItem("setUserinfo")) ;
    
  },
};
</script>

<style scoped>
.el_card {
  margin-top: 20px;
}
.slate_wrapper {
  display: flex;
  margin-top: 15px;
}
.poster img {
  border: 1px solid #d5d5d5;
  border-radius: 10px;
  box-shadow: 0 0 10px #999;
}
.centre_left {
  width: 400px;
}
.center {
  display: flex;
}
.aka {
  margin-top: 8px;
  margin-left: 0;
  font-style: italic;
}
.cast {
  display: flex;
}
.info {
  margin-top: 10px;
}
.titleBar {
  width: 100%;
  padding: 0 20px;
}
.titleBar h1 {
  font: 36px Arial, sans-serif;
  font-weight: normal;
  line-height: 110%;
  margin: 0px;
  color: #303133;
  padding-bottom: 3px;
}
.year {
  font-family: Arial;
  font-size: 25px;
  line-height: 100%;
}
.rating {
  float: right;
  position: relative;
  margin-left: 5px;
  width: 185px;
  z-index: 2;
}
.average {
  background: url("~@/assets/title_overview_sprite-1705639977._V_.png")
    no-repeat;
  background-position: -15px -118px;
  float: left;
  font-size: 11px;
  height: 40px;
  line-height: 13px;
  padding: 2px 0 0 34px;
  width: 58px;
}
.ratingValue {
  margin-bottom: -2px;
  white-space: nowrap;
}
.grey {
  color: #6b6b6b;
  font-size: 10px;
}
.ratings_wrapper .imdbRating .small {
  font-size: 10px;
}
.ratingValue strong {
  font-size: 24px;
  font-weight: normal;
  font-family: Arial;
  line-height: 24px;
}
.small {
  font-size: 10px;
}
</style>
