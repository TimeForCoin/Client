<template>
    <div class="overview">
        <div class="line"></div>
        <div class="activity">
          <div class="activity-item" v-for="task in this.tasks" :key="task.id">
            <div class="circle"></div>
            <a-tag color="green">{{dateToString(task.publish_date)}}</a-tag>
            <div>发布了<a @click="goToDetail">{{task.title}}</a></div>
          </div>
        </div>
    </div>
</template>

<script>
const moment = require('moment')
export default {
  props: ['id'],
  data() {
    return {
      tasks: []
    }
  },
  mounted: async function() {
    let res = await this.$service.task.GetTasksList.call(this, {
      page: 1,
      size: 10,
      user: this.id
    })
    this.tasks = this.tasks.concat(this.tasks, res.tasks)
  },
  methods: {
    dateToString: function(date) {
      return moment(new Date(date * 1000)).format('YYYY-MM-DD')
    },
    goToDetail: function() {

    }
  }
}
</script>

<style lang="less" scoped>
.overview {
  display: flex;
  align-items: stretch;

  .line {
    width: 1px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .activity {

    .activity-item {
      display: flex;
      align-items: center;

      .circle {
        width: 10px;
        height: 10px;
        text-align: center;
        margin: 0px 5px 0px 20px;
        background-color:#fff;
        border-radius: 50%;
        border: 2px solid red;
      }
    }
  }
}

</style>
