<template>
    <div class="content">
        <div class="top">
            <p>Overview</p>
            <p>关注{{user.data.following_count}}</p>
            <p>被关注{{user.data.follower_count}}</p>
            <p>发布的任务{{user.data.publish_count}}</p>
            <p>接受的任务{{user.data.receive_count}}</p>
        </div>
        <Overview :id="user.id"/>
        <UserList :id="user.id"/>
        <MissionList :id="user.id"/>
    </div>
</template>

<script>
import Overview from './Overview.vue'
import UserList from './UserList.vue'
import MissionList from './MissionList.vue'

export default {
  props: ['user'],
  components: {
    Overview, UserList, MissionList
  },
  data() {
    return {

    }
  }

}
</script>

<style lang="less" scoped>
.content {
    .top {
        display: flex;
    }
}
</style>
