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
            <a-button class="mission-sort" type="primary" ghost @click="onSortClick">开始排序</a-button>
        </div>
        <div class="mission-list">
          <MissionCardLong v-for="mission in missions" :mission="mission"  :key="mission.id"/>
        </div>
        <a-pagination :total="50" showQuickJumper hideOnSinglePage @change="onPageChange" />
    </div>
</template>

<script>
import MissionCardLong from './MissionCardLong.vue'
import { async } from 'q'

export default {
  components: {
    MissionCardLong
  },
  data: function() {
    return {
      pageIndex: 1,
      size: 8,
      pageCount: 0,
      missions: [
      ]
    }
  },
  methods: {
    onSortClick: function() {

    },
    getMissions: async function() {
      let params = {
        page: this.pageIndex,
        size: this.size
      }
      let res = await this.$service.task.GetTasksList.call(this, params)
      this.missions.push.apply(this.missions, res.tasks)
      this.pageCount = res.pagination.total / this.size
    }
  },
  created: async function() {
    this.getMissions()
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
