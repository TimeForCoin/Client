<template>
    <div class="overview">
        <div v-for="task in this.tasks" :key="task.id">
            <p>{{dateToString(task.publish_date)}}</p>
            <p>{{task.title}}</p>
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
    }
  }
}
</script>

<style lang="less" scoped>

</style>
