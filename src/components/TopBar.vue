<template>
  <div class="topbar">
    <a-row>
      <a-col :span="12">
        <a id="logo">
          <img src="../assets/logo.png">
          <img class="logo-font" src="../assets/logo-font.png">
        </a>
      </a-col>
      <a-col :span="6" push="6">
        <div id="navigate">
          <a-button class="nav-button" type="default" @click="signup">注册</a-button>
          <a-button class="nav-button" type="primary" @click="login">登录</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'topbar',
  data: function () {
    return {

    }
  },
  methods: {
    signup: function (event) {
      console.log('注册')
    },
    login: function (event) {
      this.$router.push('/user')
    }
  }
}
</script>

<style lang="less" scoped>

.topbar {
  position: relative;
  max-width: 1200px;
  min-width: 580px;
  margin: 0px auto;
  padding: 0 24px;

  #logo {
    display: block;
    cursor: pointer;
    white-space: nowrap;
    height: 64px;
    text-align: left;
    line-height: 64px;
    overflow: hidden;

    img {
      height: 40px;
      margin-right: 20px;
    }

    .logo-font {
      height: 16px;
    }

  }

  #navigate {
    white-space: nowrap;

    .nav-button {
      margin: 20px 0px 0px 15px;
      height: 25px;
      font-size: 13px;
    }
  }
}

</style>
