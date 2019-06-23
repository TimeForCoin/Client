<template>
    <div class="card-long">
        <div class="card-top">
            <div class="image" :style="imageUrl"></div>
            <div class="triangle-outter"></div>
            <div class="triangle-inner"></div>
            <p class="reward">
                <a-icon class="icon" type="money-collect"/>
                <span class="reward-count">{{this.reward}}</span>
            </p>
        </div>
        <div class="card-cotent">
            <p class="title">任务名称: {{mission.title}}</p>
            <p class="time">
                <a-icon type="clock-circle"/>
                {{dateString}}
            </p>
            <p class="location">
                <a-icon type="environment"/>
                {{mission.location.join("/")}}
            </p>
            <a-tag class="info" :color="typeColor">{{this.type}}</a-tag>
            <a-tag class="info" :color="statusColor">{{this.status}}</a-tag>
            <p class="info">{{mission.tags ? '标签:':'暂无标签'}}</p>
            <div class="mission-tag-list">
                <a-tag  v-for="tag in mission.tags" :key="tag.id" color="pink">{{tag}}</a-tag>
            </div>
            <a-popover class="content" title="任务内容">
                <template slot="content">
                    <p>{{mission.content}}</p>
                </template>
                <a-button type="primary">任务内容</a-button>
            </a-popover>
        </div>
        <div class="card-bottom">
            <div class="publisher-info-block">
                <img class="avatar" src="../../assets/logo.png">
                <div class="mission-publisher-info">
                    <div>{{mission.publisher.nickname}}</div>
                    <div class="time">发布于{{publishDateString}}</div>
                </div>
            </div>
            <div class="icon-block">
                <p class="icon">
                    <a-icon type="message"/>
                    {{mission.comment_count}}
                </p>
                <p class="icon">
                    <a-icon type="eye"/>
                    {{mission.view_count}}
                </p>
                <p class="icon">
                    <a-icon type="star"/>
                    {{mission.collect_count}}
                </p>
                <p class="icon">
                    <a-icon type="like"/>
                    {{mission.like_count}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
const moment = require('moment')

export default {
  props: ['mission'],
  data() {
    return {

    }
  },
  computed: {
    imageUrl: function() {
      if (this.mission.images.length > 0) { return 'background-image: url(' + this.mission.images[0].url + ');' } else {
        return 'background-image: url(' + require('../../assets/logo.png') + ');'
      }
    },
    dateString: function() {
      let start = moment(new Date(this.mission.start_date * 1000)).format('YYYY-MM-DD')
      let end = moment(new Date(this.mission.end_date * 1000)).format('YYYY-MM-DD')
      return start + '~' + end
    },
    publishDateString: function() {
      return moment(new Date(this.mission.publish_date * 1000)).format('YYYY-MM-DD')
    },
    type: function() {
      switch (this.mission.type) {
        case 'run':
          return '跑腿'
        case 'info':
          return '信息征集'
        case 'questionnaire':
          return '问卷'
        default:
          return ''
      }
    },
    typeColor: function() {
      switch (this.mission.type) {
        case 'run':
          return 'green'
        case 'info':
          return 'purple'
        case 'questionnaire':
          return 'blue'
        default:
          return ''
      }
    },
    status: function() {
      switch (this.mission.status) {
        case 'draft':
          return '草稿'
        case 'wait':
          return '执行中/等待接受'
        case 'close':
          return '已关闭'
        case 'finish':
          return '已完成'
        default:
          return ''
      }
    },
    statusColor: function() {
      switch (this.mission.status) {
        case 'draft':
          return 'green'
        case 'wait':
          return 'green'
        case 'close':
          return 'red'
        case 'finish':
          return 'blue'
        default:
          return ''
      }
    },
    reward: function() {
      switch (this.mission.reward) {
        case 'rmb':
          return this.mission.reward_value + ' RMB'
        case 'money':
          return this.mission.reward_value + ' 闲币'
        case 'object':
          return '实物'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
@triangle-width: 300px;
@triangle-heigth: 75px;

.card-long {
    background-color: white;
    width: 300px;
    margin: 20px 20px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);

    .card-top {
        position: relative;

        .image {
            width: 300px;
            height: 300px;
            overflow: hidden;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
        }

        .triangle-outter {
            width: 0px;
            height: 0px;
            border-bottom: @triangle-heigth #F0B11B solid;
            border-right: @triangle-width transparent solid;
            top: 300 - @triangle-heigth;
            position: absolute;
        }

        .triangle-inner {
            width: 0px;
            height: 0px;
            border-bottom: @triangle-heigth - 3   white solid;
            border-right: @triangle-width - 8  transparent solid;
            top: 300 - @triangle-heigth + 3;
            position: absolute;
        }

        .reward {
            position: absolute;
            top: 270px;
            left: 5px;

            .icon {
                color: rgba(255, 0, 0, 0.5);
            }

            .reward-count {
                font-size: 18px;
                margin-left: 5px;
                color: red;
            }
        }
    }

    .card-cotent {
        display: flex;
        padding: 20px 5px;
        flex-direction: column;
        align-items: flex-start;

        .title {
            font-weight: bold;
            font-size: 15px;
        }

        .time, .location, .info {
            font-size: 15px;
            margin: 0px;
        }

        .info {
            margin-top: 5px;
        }

        .mission-tag-list {
            display: flex;
            margin: 5px 0px;
        }

        .content {
            margin-top: 10px;
        }
    }

    .card-bottom {

        .publisher-info-block {
            display: flex;
            font-size: 13px;
            color: white;
            background-color: #F0B11B;
            padding: 10px;

            .avatar {
                background-color: white;
                height: 45px;
                width: 45px;
            }

            .mission-publisher-info {
                text-align: left;
                margin-left: 10px;

                .time {
                    font-weight: normal;
                    color: rgba(255, 255, 255, 0.7);
                }
            }
        }

        .icon-block {
            display: flex;
            margin: 10px 0px;

            .icon {
                margin: 0px;
                margin-left: 10px;
            }
        }
    }
}
</style>
