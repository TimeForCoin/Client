<template>
    <div class="card-long">
        <div class="card-top">
            <div class="publisher-info-block">
                <img class="avatar" src="../../assets/logo.png">
                <div class="mission-publisher-info">
                    <div>{{test.publisher.name}}</div>
                    <div class="time">发布于{{publishDateString}}</div>
                </div>
            </div>
            <p class="title">任务名称: {{test.title}}</p>
        </div>
        <div class="card-cotent">
            <div class="mission-info-block">
                <div class="block-left">
                    <div class="key-info-block">
                        <p class="key-info">
                            <a-icon type="clock-circle"/>
                            {{dateString}}
                        </p>
                        <p class="key-info">
                            <a-icon type="environment"/>
                            {{test.location.join("/")}}
                        </p>
                    </div>
                    <p class="info">{{test.type}}</p>
                    <p class="info">{{test.status}}</p>
                </div>
                <div class="block-right">
                    <div class="mission-tag-list">
                        <p class="tag-title">标签:</p>
                        <div v-for="tag in test.tags" :key="tag.id" class="mission-tag">{{tag}}</div>
                    </div>
                    <a-popover class="content" title="任务内容">
                        <template slot="content">
                            <p>{{test.content}}</p>
                        </template>
                        <a-button type="primary">任务内容</a-button>
                    </a-popover>
                </div>
            </div>
            <img class="image" src="../../assets/logo.png">
        </div>
        <div class="card-bottom">
            <p class="reward">
                <a-icon type="money-collect"/>
                {{test.reward_value + test.reward}}
            </p>
            <div class="icon-block">
                <p class="icon">
                    <a-icon type="message"/>
                    {{test.comment}}
                </p>
                <p class="icon">
                    <a-icon type="eye"/>
                    {{test.view}}
                </p>
                <p class="icon">
                    <a-icon type="star"/>
                    {{test.collect}}
                </p>
                <p class="icon">
                    <a-icon type="like"/>
                    {{test.like}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
const moment = require('moment')

export default {
  data() {
    return {
      test: {
        title: '秀秀打荣真',
        type: '跑腿',
        content: '拳打脚踢',
        location: ['中山大学', '北京大学'],
        reward: 'RMB',
        reward_value: '100',
        status: '正在进行中',
        start_date: 1559732561,
        end_date: 1559732561,
        tags: ['打游戏', '打代码'],
        comment: 66,
        view: 77,
        collect: 88,
        like: 99,
        publisher: {
          name: 'CookiesChen',
          time: 1559732561
        }
      }
    }
  },
  computed: {
    dateString: function() {
      let start = moment(new Date(this.test.start_date * 1000)).format('YYYY-MM-DD')
      let end = moment(new Date(this.test.end_date * 1000)).format('YYYY-MM-DD')
      return start + '~' + end
    },
    publishDateString: function() {
      return moment(new Date(this.test.publisher.time * 1000)).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="less" scoped>
.card-long {
    width: 45%;
    padding: 20px 20px;
    min-width: 570px;
    background-color: white;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);

    .card-top {
        display: flex;
        justify-content: space-between;

        .publisher-info-block {
            display: flex;
            font-size: 13px;
            font-weight: bold;

            .avatar {
                height: 35px;
                width: 35px;
            }

            .mission-publisher-info {
                text-align: left;

                .time {
                    font-weight: normal;
                    color: rgba(0, 0, 0, 0.5);
                }
            }
        }

        .title {
            font-weight: bold;
            font-size: 15px;
        }
    }

    .card-cotent {
        display: flex;
        margin-top: 20px;
        justify-content: space-between;

        .image {
            width: 100px;
            height: 100px;
        }

        .mission-content {
            font-size: 15px;
        }

        .mission-info-block {
            display: flex;

            .block-left {
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                .mission-info {
                    text-align: left;
                    white-space: nowrap;
                    font-size: 15px;
                    margin: 0px;
                    margin-right: 20px;
                }

                .key-info-block {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;

                    .key-info {
                        font-size: 13px;
                        margin: 0px;
                    }
                }

                .info {
                    margin: 0px;
                    color: seagreen;
                    font-size: 13px;
                }
            }

            .block-right {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-left: 40px;

                .mission-tag-list {
                    display: flex;

                    .tag-title {
                        margin: 0px;
                        margin-right: 10px;
                    }
                    .mission-tag {
                        padding: 2px 10px;
                        font-size: 12px;
                        border-radius: 5px;
                        margin-right: 5px;
                        background-color: darkcyan;
                        color: white;
                        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
                    }

                    .mission-tag:hover {
                        cursor: default;
                    }
                }
                .content {
                    margin-top: 20px;
                }
            }
        }
    }

    .card-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        .reward {
            font-size: 20px;
            color: red;
            margin: 0px;
        }

        .icon-block {
            display: flex;

            .icon {
                margin: 0px;
                margin-left: 10px;
            }
        }
    }
}
</style>
