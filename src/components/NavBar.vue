<template>
  <div class="navbar" :class="{hide: !isShow}">
    <div class="left-menu" @click="logoClick">
      <img src="@/assets/logo.png">Time For Coin
    </div>
    <div class="right-menu">
      <a-button class="menu-button" type="default" @click="signup">注册</a-button>
      <a-button class="menu-button" type="primary" @click="login">登录</a-button>
    </div>
    <a-menu class="mid-menu" mode="horizontal" @click="menuClick" :style="{ lineHeight: '64px' }">
      <a-menu-item class="menu-item" key="discover">发现</a-menu-item>
      <a-menu-item class="menu-item" key="mission">任务中心</a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldTop: 0,
      isShow: true,
      current: ['mail']
    }
  },
  methods: {
    logoClick(event) {
      this.$router.push('/')
    },
    menuClick(event) {
      switch (event.key) {
        case 'discover':
          this.$router.push('/discover')
          break
        case 'mission':
          this.$router.push('/mission')
          break
      }
    },
    signup(event) {},
    login(event) {
      this.$router.push('/user')
    },
    onScroll() {
      let top = document.scrollingElement.scrollTop
      if (this.oldTop >= top) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      this.oldTop = top
    }
  },
  mounted() {
    // 屏幕滚动事件监听
    window.addEventListener('scroll', this.onScroll)
    this.oldTop = document.scrollingElement.scrollTop
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="less" scoped>
.navbar {
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

  .left-menu {
    cursor: pointer;
    white-space: nowrap;
    height: 64px;
    width: 270px;
    float: left;
    font-size: 24px;
    line-height: 64px;

    overflow: hidden;

    img {
      height: 40px;
      margin-right: 20px;
    }
  }

  .mid-menu {
    font-size: 16px;

    .menu-item {
      margin: 0 30px;
    }
  }

  .right-menu {
    white-space: nowrap;
    float: right;
    overflow: hidden;

    .menu-button {
      margin: 16px 7px;
      font-size: 16px;
      height: 32px;
    }
  }
}

.hide {
  opacity: 0;
}
</style>
