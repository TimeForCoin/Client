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
        <div class="info">
          <div class="info-item"><a-icon class="icon" v-if="user.info.location" type="environment" />{{user.info.location}}</div>
          <div class="info-item"><a-icon class="icon" v-if="user.info.email" type="mail" />{{user.info.email}}</div>
          <div class="info-item"><a-icon class="icon" v-if="user.info.school" type="team" />{{user.info.school}}</div>
        </div>
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
    width: 200px;
    margin-right: 50px;

    .avatar {
      width: 200px;
      height: 200px;
      border: 1px solid #e1e4e8;
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 30px;

      .info-item{
        margin-bottom: 5px;

        .icon {
          margin-right: 10px;
        }
      }
    }
}

</style>
