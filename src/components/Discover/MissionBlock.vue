<template>
    <div class="missionblock">
        <a-divider class="divider">闲得一币</a-divider>
        <div class="function-bar">
            <a-select class="mission-select" :defaultValue="sortTimeOrHit" @change="sortByTimeOrHit" >
                <a-select-option value="new">时间</a-select-option>
                <a-select-option value="hot">热度</a-select-option>
            </a-select>
            <a-select class="mission-select" :defaultValue="sortMissionType" @change="sortByMissionType" >
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="questionnaire">问卷</a-select-option>
                <a-select-option value="run">跑腿</a-select-option>
                <a-select-option value="info">信息</a-select-option>
            </a-select>
            <a-select class="mission-select" :defaultValue="sortRewardType"  @change="sortByRewardType" >
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="money">闲币报酬</a-select-option>
                <a-select-option value="rmb">现金报酬</a-select-option>
                <a-select-option value="object">实物报酬</a-select-option>
            </a-select>
            <a-button class="mission-sort" type="primary" ghost @click="onSortClick">开始排序</a-button>
        </div>
        <div class="mission-list">
          <MissionCardLong v-for="mission in missions" :mission="mission"  :key="mission.id"/>
        </div>
        <a-pagination :total="total" :current="currentIndex" :pageSize="size" showQuickJumper hideOnSinglePage @change="onPageChange" />
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
      size: 10,
      currentIndex: 1,
      total: 0,
      sortTimeOrHit: 'new',
      sortMissionType: 'all',
      sortRewardType: 'all',
      pageCount: 0,
      missions: [
      ]
    }
  },
  methods: {
    getMissions: async function(params) {
      let res = await this.$service.task.GetTasksList.call(this, params)
      this.missions.splice(0, this.missions.length)
      this.missions.push.apply(this.missions, res.tasks)
      this.total = res.pagination.total
      this.pageCount = this.total / this.size
    },
    onPageChange: async function(index) {
      await this.getMissions({
        page: index,
        size: this.size
      })
      this.currentIndex = index
    },
    sortByTimeOrHit: function(type) {
      this.sortTimeOrHit = type
    },
    sortByMissionType: function(type) {
      this.sortMissionType = type
    },
    sortByRewardType: function(type) {
      this.sortRewardType = type
    },
    onSortClick: async function() {
      console.log({
        page: 1,
        size: this.size,
        sort: this.sortTimeOrHit,
        type: this.sortMissionType,
        reward: this.sortRewardType
      })
      this.getMissions({
        page: 1,
        size: this.size,
        sort: this.sortTimeOrHit,
        type: this.sortMissionType,
        reward: this.sortRewardType
      })
    }
  },
  created: async function() {
    this.getMissions({
      page: 1,
      size: this.size
    })
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
        margin: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        justify-items: center;
        flex-wrap: wrap;
    }
}
</style>
