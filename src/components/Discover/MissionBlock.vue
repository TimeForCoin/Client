<template>
    <div class="missionblock">
        <a-divider class="divider">闲得一币</a-divider>
        <div class="function-bar">
            <a-select class="mission-select" defaultValue="time" >
                <a-select-option value="time">时间</a-select-option>
                <a-select-option value="hit">热度</a-select-option>
            </a-select>
            <a-select class="mission-select" defaultValue="questionnaire" >
                <a-select-option value="questionnaire">问卷</a-select-option>
                <a-select-option value="errand">跑腿</a-select-option>
                <a-select-option value="information">信息</a-select-option>
            </a-select>
            <a-select class="mission-select" defaultValue="icon" >
                <a-select-option value="icon">闲币报酬</a-select-option>
                <a-select-option value="money">现金报酬</a-select-option>
                <a-select-option value="physical">实物报酬</a-select-option>
            </a-select>
            <a-button class="mission-sort" type="primary" ghost>开始排序</a-button>
        </div>
        <div class="mission-list">
          <MissionCardLong />
          <MissionCardLong />
        </div>
        <a-pagination :total="50" showQuickJumper />
    </div>
</template>

<script>
import MissionCardLong from './MissionCardLong.vue'

export default {
  components: {
    MissionCardLong
  },
  data: function() {
    return {
      test: {
        'title': '吃饭睡觉打游戏',
        'content': '疯狂暗示荣真',
        'type': 'info',
        'reward': 'rmb',
        'reward_value': 500,
        'reward_object': 'Zhenly',
        'view_count': 60,
        'like_count': 30,
        'collect_count': 30,
        'publish_date': 1559732561,
        'publisher': {
          'nickname': 'DarkVan'
        }
      }
    }
  },
  methods: {
    OnSortClick: function() {

    }
  }
}
</script>>

<style lang="less" scoped>
.missionblock {
    width: 90vw;
    margin: auto;
    margin-bottom: 100px;
    display: flex;
    min-width: 570px;
    flex-direction: column;

    .divider {
        font-size: 30px;
    }

    .function-bar {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .mission-select {
            margin-left: 10px;
        }

        .mission-sort {
            margin-left: 10px;
        }
    }

    .mission-list {
        margin-top: 20px;
        padding:0px 20px 20px 20px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        flex-wrap: wrap;
    }
}
</style>
