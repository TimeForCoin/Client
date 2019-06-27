<template>
    <div class="user-list">
      <div class="user" v-for="user in users" :key="user.id">
        <img class="avatar" :src="user.avatar">
        <p class="nickname">{{user.nickname}}</p>
      </div>
    </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      users: []
    }
  },
  mounted: async function() {
    let res = await this.$service.user.GetFollowers.call(this, this.id, {
      page: 1,
      size: 10,
      user_id: this.id
    })
    this.users = res.data
    // let res = await this.$service.user.GetFollowing.call(this, this.id, {
    //   page: 1,
    //   size: 10,
    //   user_id: this.id
    // })
  }

}
</script>

<style lang="less" scoped>
.user-list {

  .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px;
    padding-bottom: 20px;

    .avatar {
      width: 60px;
      height: 60px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 3px;
    }

    .nickname {
      margin: 0px 0px 0px 5px;
    }
  }
}
</style>
