<template>
  <div class="mission-card">
    <div class="image">
      <div class="back-image"></div>
      <div class="triangle"></div>
    </div>
    <div class="content">
      <div class="head-img"></div>
        <div class="text1">
          <p class="title">{{MissionModel.title}}</p>
          <span class="user">{{MissionModel.publisher.nickname}}</span>
          <span class="time">{{time}}</span>
        </div>
        <div class="text2">
          <p class="long-text">任务类型：{{missionType}}</p>
          <p class="long-text">任务内容：{{MissionModel.content}}</p>
          <p class="long-text" id="reward">酬劳：{{MissionModel.reward_object}}</p>
        </div>
        <div class="text3">
          <p class="icon-number"><a-icon type="eye"/>{{MissionModel.view_count}}</p>
          <p class="icon-number"><a-icon type="like"/>{{MissionModel.like_count}}</p>
          <p class="icon-number"><a-icon type="star"/>{{MissionModel.collect_count}}</p>
        </div>
      </div>
    </div>
</template>

<script>
const moment = require('moment')
export default {
  props: ['MissionModel'],
  data() {
    return {

    }
  },
  computed: {
    missionType: function() {
      switch (this.MissionModel.type) {
        case 'run':
          return '跑腿'
          break
        case 'questionnaire':
          return '问卷'
          break
        case 'info':
          return '信息'
          break
      }
      return '跑腿'
    },
    time: function() {
      var newTime = new Date(this.MissionModel.publish_date * 1000)
      // return moment(newTime).format("YYYY-MM-DD")
      return moment(newTime).startOf('hour').fromNow()
    }
  }
}
</script>

<style lang="less" scoped>
.mission-card {
  background-color: white;
  width: 250px;
  height: 320px;
  margin-right: 50px;
  transition: 0.5s;
  position: relative;

  .image {
    width: 100%;
    height: 135px;

    .back-image {
      width: 100%;
      height: 130px;
      overflow: hidden;
      background-image: url("../assets/MissionPage/test.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: center;
    }

    .triangle {
      width: 0px;
      height: 0px;
      border-bottom: 40px solid white;
      border-right: 253px solid transparent;
      transform: translate(0, -39px;)
    }
  }

  .content {
    height: 220px;
    position: relative;
    top: -35px;

    .head-img {
      width: 40px;
      height: 40px;
      background-image: url("../assets/MissionPage/head.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: center;
      border-radius: 50%;
      transform: translate(10px, 15px);
    }

    .text1 {
      width: 180px;
      height: 40px;
      transform: translate(60px, -25px);
      text-align: left;

      .title {
        margin: 0px;
        font-weight: bold;
        font-size: 15px;
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
      height: auto;
      transform: translate(20px, -10px);
      text-align: left;
      padding-left: 10px;
      border-left-style:solid;
      border-width:3px;
      border-color:#F0B11B;

      .long-text {
        font-size: 13px;
        margin-top: 0px;
        margin-bottom: 6px;
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

    .text3 {
      width: 150px;
      height: 25px;
      display: flex;
      flex-direction: row;
      color: gray;
      font-size: 13px;
      position: absolute;
      top: 190px;
      left: 20px;

      .icon-number {
        margin-right: 12px;

        .anticon {
          margin-right: 5px;
        }
      }
    }
  }
}

.mission-card:hover {
  box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.2);
  transition: 0.5s;
  transform: scale(1.03);
}
</style>
