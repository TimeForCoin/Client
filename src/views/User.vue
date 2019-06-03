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
          <span class="title">昵称</span>
          <div class="user-info-item-input">
              <a-input class="info-input" :disabled="!isNicknameChange" v-model="user.info.nickname" />
          </div>
          <div v-if="!isNicknameChange" @click="changeByIndex(0)" class="change-button">
            <img src="https://b-gold-cdn.xitu.io/v3/static/img/edit-icon.6d6382b.svg"/>
            <span class="change-hint">修改</span>
          </div>
          <a-button v-if="isNicknameChange" size="small" @click="changeByIndex(0)">取消</a-button>
        </li>
        <li class="user-info-item">
          <span class="title">邮箱</span>
          <div class="user-info-item-input">
              <a-input class="info-input" :disabled="!isEmailChange" v-model="user.info.email" />
          </div>
          <div v-if="!isEmailChange" @click="changeByIndex(1)" class="change-button">
            <img src="https://b-gold-cdn.xitu.io/v3/static/img/edit-icon.6d6382b.svg"/>
            <span class="change-hint">修改</span>
          </div>
          <a-button v-if="isEmailChange" size="small" @click="changeByIndex(1)">取消</a-button>
        </li>
        <li class="user-info-item">
          <span class="title">电话</span>
          <div class="user-info-item-input">
              <a-input class="info-input" :disabled="!isPhoneChange" v-model="user.info.phone" />
          </div>
          <div v-if="!isPhoneChange" @click="changeByIndex(2)" class="change-button">
            <img src="https://b-gold-cdn.xitu.io/v3/static/img/edit-icon.6d6382b.svg"/>
            <span class="change-hint">修改</span>
          </div>
            <a-button v-if="isPhoneChange" size="small" @click="changeByIndex(2)">取消</a-button>
        </li>
      </ul>
      <a-button :disabled="!(isEmailChange||isNicknameChange||isNicknameChange)" class="save-button" type="primary" @click="save">保存</a-button>
    </a-card>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      isNicknameChange: false,
      isEmailChange: false,
      isPhoneChange: false,
      user: {}
    }
  },
  methods: {
    changeByIndex: function(index) {
      switch (index) {
        case 0:
          this.isNicknameChange = !this.isNicknameChange
          break
        case 1:
          this.isEmailChange = !this.isEmailChange
          break
        case 2:
          this.isPhoneChange = !this.isPhoneChange
          break
      }
    },
    save: async function() {
      if (!this.$utils.verify.isValidEmail(this.user.info.email)) {
        this.$message.error('邮箱格式有误')
        return
      }
      const res = await this.$service.user.ChangeInfo.call(this, this.user.info)
      this.isNicknameChange = this.isEmailChange = this.isPhoneChange = false
      this.$message.success('保存成功')
    }
  },
  created: function() {
    this.user = this.$store.state.user
  }
}

</script>

<style lang="less" scoped>
@items-num: 4;

.user {
  background-color: white;
  .container {
    margin: auto;
    margin-top: 80px;
    padding: 20px;
    width: 30vw;
    min-width: 500px;
    min-height: (@items-num+1)*100px;

    .user-info {
      list-style: none;
      width: 100%;
      margin: 0px;
      padding: 0px;

      .user-info-item {
        width: 100%;
        height: 5vh;
        min-height: 100px;
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
          justify-content: flex-end;

          .change-hint {
            color: #007fff;
          }

        }

        .change-button:hover {
          cursor: pointer;
        }
      }
    }

    .save-button {
      margin: 20px;
    }
  }
}

</style>
