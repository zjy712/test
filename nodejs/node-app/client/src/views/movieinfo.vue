<template>
  <div id="moveinfo">
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
    </div>
    <div class="slate_wrapper">
        <div class="poster">
            <img :src="info.images[0].large" alt="" srcset="">
        </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {}
    };
  },
  methods: {
    getinfo() {
      this.$axios.get("/api/movieinfo/" + this.id).then(res => {
        console.log(res.data);
        this.info = res.data.data;
      });
    }
  },
  created() {
    this.getinfo();
  }
};
</script>

<style scoped>
.titleBar {
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
  color: silver;
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
