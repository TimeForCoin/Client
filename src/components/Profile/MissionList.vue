<template>
    <div class="mission-list">
      <div class="mission" v-for="item in tasks" :key="item.id">
        <img class="image" :src="item.task.images.lenght>0?images[0].url:require('../../assets/logo.png')">
        <p class="title">{{item.task.title}}</p>
      </div>
    </div>
</template>

<script>

export default {
  props: ['id'],
  data() {
    return {
      tasks: []
    }
  },
  mounted: async function() {
    let res = await this.$service.user.GetReceiveTasks.call(this, this.id, {
      page: 1,
      size: 10,
      user_id: this.id
    })
    this.tasks = res.data
    console.log(res)
  }
}
</script>

<style lang="less" scoped>
.mission-list {

  .mission {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px;
    padding-bottom: 20px;

    .image {
      width: 60px;
      height: 60px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 3px;
    }

    .title {
      margin: 0px 0px 0px 5px;
    }
  }
}
</style>
