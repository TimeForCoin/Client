<template>
    <div class="content">
        <div class="top">
            <a-menu
              v-model="current"
              mode="horizontal"
            >
              <a-menu-item key="overview">
                Overview
              </a-menu-item>
              <a-menu-item key="following">
                Following{{user.data.following_count}}
              </a-menu-item>
              <a-menu-item key="followers">
                Followers{{user.data.follower_count}}
              </a-menu-item>
              <a-menu-item key="receive">
                Received Tasks{{user.data.receive_count}}
              </a-menu-item>
              <a-menu-item key="publish">
                Published Tasks{{user.data.publish_count}}
              </a-menu-item>
            </a-menu>
        </div>
        <Overview v-if="current[0]=='overview'" :id="user.id"/>
        <UserList v-if="current[0]=='following'" :id="user.id"/>
        <UserList v-if="current[0]=='followers'" :id="user.id"/>
        <MissionList v-if="current[0]=='receive'" :id="user.id"/>
        <MissionList v-if="current[0]=='publish'" :id="user.id"/>
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
      current: ['overview']
    }
  }

}
</script>

<style lang="less" scoped>
@width: 100%-300px;

.content {
  width: @width;
  min-width: 400px;

  .top {
      display: flex;
      margin-bottom: 50px;
  }
}
</style>
