<template>
    <div class="profile">
        <div v-if="loading">加载中</div>
        <Sider v-if="!loading" :user="user" />
        <Content v-if="!loading" :user="user" />
    </div>
</template>

<script>
import Sider from '../components/Profile/Sider.vue'
import Content from '../components/Profile/Content.vue'

export default {
  components: { Sider, Content },
  data() {
    return {
      user: {},
      loading: true
    }
  },
  mounted: async function() {
    let id = '5d10ff9aa42378d58963eff2'
    // let id = this.$store.state.user.id
    let res = await this.$service.user.GetUserInfo.call(this, id)
    this.user = JSON.parse(JSON.stringify(res))
    this.loading = false
    console.log(res)
  }
}
</script>

<style lang="less" scoped>

.profile {
    margin-top: 70px;
    display: flex;
    background-color: white;
}

</style>
