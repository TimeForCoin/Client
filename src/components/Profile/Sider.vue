<template>
    <div class="sider">
        <img class="avatar" :src="user.info.avatar">
        <p class="nickname">{{user.info.nickname}}</p>
        <p class="bio" v-if="user.info.bio.length > 0">{{user.info.nickname}}</p>
        <a-button v-if="!isMe" class="follow-button" @click="follow">
            {{user.data.following ? '取消关注':'关注'}}
        </a-button>
        <a-button v-else-if="isMe" class="follow-button">
            编辑
        </a-button>
        <p>{{user.info.email}}</p>
        <p>{{user.info.location}}</p>
        <p>{{user.info.school}}</p>
    </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      isMe: false
    }
  },
  methods: {
    follow: async function() {
      if (this.user.data.following) {
        await this.$service.user.CancelFollowing.call(this, this.user.id)
      } else {
        await this.$service.user.Following.call(this, this.user.id)
      }
      this.user.data.following = !this.user.data.following
    }
  },
  mounted: function() {
    // 查看自己
    if (this.$store.state.user.id === this.user.id) this.isMe = true
  }
}
</script>

<style lang="less" scoped>
.sider {
    display: flex;
    flex-direction: column;

    .avatar {

    }
}

</style>
