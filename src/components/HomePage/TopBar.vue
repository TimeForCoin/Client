<template>
  <div class="topbar" :class="{hide: !isShow}">
    <a-row>
      <a-col :span="6" :push="2">
        <a id="logo">
          <img src="../../assets/logo.png">
          <img class="logo-font" src="../../assets/logo-font.png">
        </a>
      </a-col>
      <a-col :span="5" :push="10">
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
      oldTop: 0,
      isShow: true
    }
  },
  methods: {
    signup: function (event) {

    },
    login: function (event) {
      this.$router.push('/user')
    },
    onScroll: function () {
      let top = document.scrollingElement.scrollTop
      if (this.oldTop >= top) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      this.oldTop = top
    }
  },
  mounted: function () {
    // 屏幕滚动事件监听
    window.addEventListener('scroll', this.onScroll)
    this.oldTop = document.scrollingElement.scrollTop
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="less" scoped>

.topbar {
  opacity: 1;
  position: fixed;
  width: 100%;
  min-width: 655px;
  padding: 0 24px;
  margin: 0 auto;
  transition: 0.5s;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  z-index: 10;

  #logo {
    display: block;
    cursor: pointer;
    white-space: nowrap;
    height: 64px;
    width: 270px;
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
    text-align: right;

    .nav-button {
      margin: 20px 0px 0px 15px;
      height: 25px;
      font-size: 13px;
    }
  }
}

.hide {
  opacity: 0;
}
</style>
