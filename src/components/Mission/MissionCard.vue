<template>
  <div class="mission-card">
    <div class="image">
      <div class="back-image" :style="imgURL"></div>
      <div class="triangle"></div>
    </div>
    <div class="content">
      <img class="head-img" :src="MissionModel.publisher.avatar" />
      <div class="text1">
        <p class="title">{{MissionModel.title}}</p>
        <span class="user">{{MissionModel.publisher.nickname}}</span>
        <span class="time">{{time}}</span>
      </div>
      <div class="text2">
        <p class="long-text">任务类型：{{missionType}}</p>
        <p class="long-text">任务内容：{{MissionModel.content}}</p>
        <p class="long-text" id="reward">酬劳：{{missionReward}}</p>
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
const defualtImage = require('../../assets/logo.png')
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
        case 'questionnaire':
          return '问卷'
        case 'info':
          return '信息'
      }
      return '跑腿'
    },
    time: function() {
      var newTime = new Date(this.MissionModel.publish_date * 1000)
      // return moment(newTime).format("YYYY-MM-DD")
      return moment(newTime).startOf('hour').fromNow()
    },
    missionReward: function() {
      if (this.MissionModel.reward_object === '') {
        if (this.MissionModel.reward === 'money') {
          return this.MissionModel.reward_value.toString() + ' 闲币'
        } else {
          return this.MissionModel.reward_value.toString() + ' RMB'
        }
      }
      return this.MissionModel.reward_object
    },
    imgURL: function() {
      if (this.MissionModel.images.length > 0) {
        return 'background-image: url(' + this.MissionModel.images[0].url + ')'
      }
      return 'background-image: url(' + defualtImage + ')'
    }
  }
}
</script>

<style lang="less" scoped>
.mission-card {
  background-color: white;
  width: 250px;
  height: 320px;
  transition: 0.5s;
  position: relative;

  .image {
    width: 100%;
    height: 135px;

    .back-image {
      width: 100%;
      height: 130px;
      overflow: hidden;
      //background-image: url("../../assets/MissionPage/test.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: center;
    }

    .triangle {
      width: 0px;
      height: 0px;
      border-bottom: 40px solid white;
      border-right: 253px solid transparent;
      transform: translate(0px, -39px;)
    }
  }

  .content {
    height: 220px;
    position: relative;
    top: -35px;

    .head-img {
      width: 40px;
      height: 40px;
      display: block;
      border-radius: 100%;
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
