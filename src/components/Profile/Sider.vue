<template>
    <div class="sider">
        <img class="avatar" :src="user.avatar">
        <p class="nickname">{{user.nickname}}</p>
        <p class="bio" v-if="user.bio.length > 0">{{user.nickname}}</p>
        <a-button class="follow-button" @click="follow">
            {{user.following ? '取消关注':'关注'}}
        </a-button>
        <p>{{user.email}}</p>
        <p>{{user.location}}</p>
        <p>{{user.school}}</p>
    </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
    }
  },
  methods: {
    follow: function() {

    }
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
