<template>
  <div class="navbar" :class="{hide: !isShow}">
    <div class="left-menu" @click="logoClick">
      <img src="@/assets/logo.png">Time For Coin
    </div>
    <div v-if="user === null" class="right-menu">
      <a-button class="menu-button" type="primary" @click="login">登录</a-button>
      <a-modal
        class="login-modal"
        title="请在新窗口中完成登陆"
        centered
        :maskClosable="false"
        :footer="null"
        :closable="false"
        v-model="loginModalVisible"
        @ok="() => loginModalVisible = false"
      >
        <p>{{loginModalText}}</p>
        <a-button v-if="failedLogin" class="modal-button" type="primary" @click="login">重试</a-button>
        <a-button
          v-if="failedLogin"
          class="modal-button"
          type="primary"
          @click="()=>{loginModalVisible = false}"
        >取消</a-button>
      </a-modal>
    </div>
    <div v-if="user !== null" class="right-menu">
      <a-avatar class="user-avatar" :src="user.info.avatar"/>
      <span class="user-name" @click="logout">{{user.info.nickname}}</span>
    </div>
    <a-menu class="mid-menu" mode="horizontal" @click="menuClick" :style="{ lineHeight: '64px' }">
      <a-menu-item class="menu-item" key="discover">发现</a-menu-item>
      <a-menu-item class="menu-item" key="mission">任务中心</a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { setInterval, clearInterval, setTimeout } from 'timers';
export default {
  data () {
    return {
      user: null,
      failedLogin: false,
      loginModalText: '',
      loginModalVisible: false,
      oldTop: 0,
      isShow: true,
      current: ['mail']
    }
  },
  methods: {
    logoClick (event) {
      this.$router.push('/')
    },
    menuClick (event) {
      switch (event.key) {
        case 'discover':
          this.$router.push('/discover')
          break
        case 'mission':
          this.$router.push('/mission')
          break
      }
    },
    async getUserInfo () {
      try {
        const res = await this.$service.user.GetInfo.call(this)
        this.user = res
      } catch (error) {

      }
    },
    logout () {
      this.user = null
      this.$service.user.Logout.call(this)
      this.$message.info('退出登陆')
    },
    async login (event) {
      // this.$router.push('/user')
      this.loginModalVisible = true
      this.failedLogin = false
      this.loginModalText = '等待授权中...'
      try {
        const res = await this.$service.user.GetVioletUrl.call(this)
        const oauthWindow = window.open(
          res.url,
          'newWindow',
          'menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1,width=600,height=600,top=50,left=100')
        const timer = () => {
          setTimeout(async () => {
            const res = await this.$service.user.GetLoginStatus.call(this)
            const status = res.status
            if (status === 'violet') {
              oauthWindow.close()
              this.loginModalVisible = false
              this.$message.info('登陆成功')
              this.getUserInfo()
            } else if (status === 'none') {
              this.loginModalText = '登陆已取消'
              this.failedLogin = true
            } else if (status === 'running') {
              timer()
              this.loginModalText = '等待授权中...'
            } else {
              this.loginModalText = '登陆失败'
              this.failedLogin = true
            }
          }, 1000)
        }
        timer()
      } catch (error) {
        this.$message.error('请求失败:' + error);
        this.loginModalVisible = false
      }
    },
    onScroll () {
      let top = document.scrollingElement.scrollTop
      if (this.oldTop >= top) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      this.oldTop = top
    }
  },
  mounted () {
    // 屏幕滚动事件监听
    window.addEventListener('scroll', this.onScroll)
    this.oldTop = document.scrollingElement.scrollTop

    this.getUserInfo()
  },
  destroyed () {
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

    .user-avatar {
      margin-top: 20px;
      vertical-align: bottom;
    }

    .user-name {
      margin-left: 10px;
      vertical-align: super;
      cursor: pointer;
    }
  }
}

.hide {
  opacity: 0;
}
.login-modal {
  text-align: center;
  .modal-button {
    margin-left: 20px;
  }
}
</style>
