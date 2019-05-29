<template>
  <div class="user">
    <a-card title="个人资料" class="container">
      <ul class="user-info">
        <li class="user-info-item">
          <span class="title">头像</span>
          <div class="user-info-item-input">
            <input id="avatar-upload"/>
            <img class="avatar" src="../assets/logo.png"/>
            <div class="action-box">
              <div class="hint">
                支持 jpg、png 格式大小 5M 以内的图片
              </div>
              <a-button type="primary" class="upload-button">上传头像</a-button>
            </div>
          </div>
        </li>
        <li class="user-info-item">
          <span class="title">用户名</span>
          <div class="user-info-item-input">
              <a-input class="info-input" :disabled="!isUsernameChange" placeholder="CookiesChen"/>
          </div>
          <div v-if="!isUsernameChange" @click="changeByIndex(0)" class="change-button">
            <img src="https://b-gold-cdn.xitu.io/v3/static/img/edit-icon.6d6382b.svg"/>
            <span class="change-hint">修改</span>
          </div>
          <div v-if="isUsernameChange" class="save-cancel">
            <a-button type="primary" size="small" class="save-button">保存</a-button>
            <a-button size="small" @click="changeByIndex(0)" class="cancel-button">取消</a-button>
          </div>
        </li>
        <li class="user-info-item">
          <span class="title">邮箱</span>
          <div class="user-info-item-input">
              <a-input class="info-input" :disabled="!isEmailChange" placeholder="CookiesChen"/>
          </div>
          <div v-if="!isEmailChange" @click="changeByIndex(1)" class="change-button">
            <img src="https://b-gold-cdn.xitu.io/v3/static/img/edit-icon.6d6382b.svg"/>
            <span class="change-hint">修改</span>
          </div>
          <div v-if="isEmailChange" class="save-cancel">
            <a-button type="primary" size="small" class="save-button">保存</a-button>
            <a-button size="small" @click="changeByIndex(1)" class="cancel-button">取消</a-button>
          </div>
        </li>
        <li class="user-info-item">
          <span class="title">电话</span>
          <div class="user-info-item-input">
              <a-input class="info-input" :disabled="!isPhoneChange" placeholder="CookiesChen"/>
          </div>
          <div v-if="!isPhoneChange" @click="changeByIndex(2)" class="change-button">
            <img src="https://b-gold-cdn.xitu.io/v3/static/img/edit-icon.6d6382b.svg"/>
            <span class="change-hint">修改</span>
          </div>
          <div v-if="isPhoneChange" class="save-cancel">
            <a-button type="primary" size="small" class="save-button">保存</a-button>
            <a-button size="small" @click="changeByIndex(2)" class="cancel-button">取消</a-button>
          </div>
        </li>
      </ul>
    </a-card>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      isUsernameChange: false,
      isEmailChange: false,
      isPhoneChange: false
    }
  },
  methods: {
    changeByIndex(index, val) {
      switch (index) {
        case 0:
          this.isUsernameChange = !this.isUsernameChange
          break
        case 1:
          this.isEmailChange = !this.isEmailChange
          break
        case 2:
          this.isPhoneChange = !this.isPhoneChange
          break
      }
    }
  }
}

</script>

<style lang="less" scoped>

.user {
  background-color: white;
  .container {
    margin: auto;
    margin-top: 80px;
    padding: 20px;
    width: 30vw;
    height: 70vh;
    min-width: 500px;
    min-height: 500px;

    .user-info {
      list-style: none;
      height: 100%;
      width: 100%;
      margin: 0px;
      padding: 0px;

      .user-info-item {
        width: 100%;
        height: 10vh;
        min-height: 125px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(241, 241, 241);

        .title {
          width: 20%;
          font-size: 15px;
          text-align: left;
        }

        .user-info-item-input {
          display: flex;

          #avatar-upload {
            display: none;
          }

          .avatar {
            width: 70px;
            height: 70px;
            margin-right: 10px;
          }

          .action-box {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .hint {
              font-size: 3px;
              margin-bottom: auto;
            }

            .upload-button {

            }
          }
        }

        .change-button {
          display: flex;

          .change-hint {
            color: #007fff;
          }

        }

        .change-button:hover{
          cursor: pointer;
        }

        .save-cancel{
          display: flex;
          justify-content: space-around;

          .cancel-button {
            margin-left: 5px;
          }
        }
      }
    }
  }
}

</style>
