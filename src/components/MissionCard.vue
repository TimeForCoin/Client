<template>
  <div class="mission-card">
    <div class="image"></div>  
    <div class="head-img"></div>
    <div class="text1">
      <p class="title">{{MissionModel.title}}</p>
      <span class="user">Username</span>
      <span class="time">2019-6-6</span>
    </div>
    <div class="text2">
      <p class="long-text">任务类型：{{missionType}}</p>
      <p class="long-text">任务内容：{{MissionModel.content}}</p>
      <p class="long-text" id="reward">酬劳：{{MissionModel.reward_object}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["MissionModel"],
  data() {
    return {
      
    }
  },
  computed:{
    missionType: function(){
      switch(this.MissionModel.type) {
        case "run":
          return "跑腿";
          break;
        case "questionnaire":
          return "问卷";
          break;
        case "info":
          return "信息";
          break;
      }
      return "跑腿";
    }
  }
}
</script>

<style lang="less" scoped>
.mission-card {
  background-color: white;
  width: 250px;
  height: 300px;
  margin-right: 50px;
  transition: 0.5s;
  position: relative;

  .image {
    width: 100%;
	  height: 100px;
    background-image: url("../assets/MissionPage/test.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: center;
  }
  .head-img {
    width: 40px;
    height: 40px;
    background-image: url("../assets/MissionPage/head.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: center;
    border-radius: 50%;
    position: relative;
    top: 10px;
    left: 10px;
  }

  .text1 {
    position: relative;
    width: 180px;
    height: 40px;
    top: -30px;
    left: 60px;
    text-align: left;

    .title {
      margin: 0px;
      font-weight: bold; 
      font-size: 16px;
    }
    .user {
      color: lightgray;
      font-size: 14px;
    }
    .time {
      color: lightgray;
      margin-left: 10px;
      font-size: 14px;
    }
  }

  .text2 {
    width: 200px;
    height: 120px;
    position: relative;
    top: -15px;
    left: 25px;
    text-align: left;

    .long-text {
      font-size: 14px;
      margin-top: 0px;
      margin-bottom: 8px;
      color: gray;
      font-family: "Microsoft YaHei";
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }

    #reward {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
}
.mission-card:hover {
  box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}
</style>
