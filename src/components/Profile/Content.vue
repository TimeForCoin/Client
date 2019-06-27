<template>
    <div class="content">
        <div class="top">
            <p>Overview</p>
            <p>关注{{user.data.following_count}}</p>
            <p>被关注{{user.data.follower_count}}</p>
            <p>发布的任务{{user.data.publish_count}}</p>
            <p>接受的任务{{user.data.receive_count}}</p>
        </div>

    </div>
</template>

<script>
export default {
  props: ['user'],
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
