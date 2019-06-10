<template>
  <div class="create-mission">
    <a-divider class="top-title"><img class="top-logo" src="@/assets/logo.png">发布任务</a-divider>
    <div class="flex-div">
      <div class="left-div">
        <p class="title-left">任务名称：</p>
        <a-input class="mission-title-input"/>
      </div>
      <div class="right-div">
        <p class="title-left">任务类型：</p>
        <a-select class="mission-type" defaultValue="errand" >
          <a-select-option value="errand">跑腿</a-select-option>
          <a-select-option value="information">信息</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="left-div">
      <p class="title-left">任务时间：</p>
      <a-icon class="left-icon" type="clock-circle" theme="twoTone" twoToneColor="#F0B11B"/>
      <a-range-picker class="date-picker"
        :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
        @change="onChange"
      />
    </div>
    <div class="left-div">
      <p class="title-left">任务地点：</p>
      <a-icon class="left-icon" type="environment" theme="twoTone" twoToneColor="#F0B11B"/>
      <a-input class="mission-location"/>
    </div>
    <div class="left-div">
      <p class="title-left">任务标签：</p>
      <a-icon class="left-icon" type="tags" theme="twoTone" twoToneColor="#F0B11B"/>
      <a-input-search class="tag-input" placeholder="添加标签" @search="addTag" enterButton=" ╋ "/>
      <div class="mission-tags">
        <div class="tag" v-for="(tag, index) in mission.tags" :key="index" >
          {{tag}}
          <a-icon class="tag-btn" type="close-circle" />
        </div>
      </div>
    </div>
    <div class="left-div">
      <p class="title-left">任务内容描述：</p>
      <a-textarea class="mission-content-input" :rows="4"/>
    </div>
    <div class="flex-div">
      <div class="reward-div">
        <p class="title-left">任务报酬：</p>
        <a-icon class="left-icon" type="money-collect" theme="twoTone" twoToneColor="#F0B11B"/>
        <span>类型:</span>
        <a-select class="reward-type" defaultValue="coin" >
          <a-select-option value="money">闲币</a-select-option>
          <a-select-option value="rmb">RMB</a-select-option>
          <a-select-option value="object">其他</a-select-option>
        </a-select>
        <span>数量:</span>
        <a-input class="reward-account"/>
      </div>
      <div class="right-div">
        <p class="title-left">参与者设置：</p>
      </div>
    </div>
    <div class="left-div">
      <p class="title-left">上传图片：</p>
      <div class="upload-images">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :beforeUpload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </div>
    </div>
    <p class="title-left">上传附件：</p>
    <div class="upload-attachment">

    </div>
    <a-button class="publish-btn" type="primary">发布</a-button>
  </div>
</template>

<script>
import moment from 'moment';

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      loading: false,
      imageUrl: '',
      mission: {
        title: '',
        content: '',
        images: [],
        attachment: [],
        type: '',
        reward: '',
        reward_value: 0,
        reward_object: '',
        location: [],
        tags: [],
        start_date: 0,
        end_date: 0,
        max_player: 0,
        auto_accept: true,
        publish: false,
      },
    }
  },
  methods: {
    moment,
    onChange(dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    },
    addTag(value) {
      if(value != '') {
        this.mission.tags.push(value)
      }
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      console.log(isPNG);
      if (!isJPG && !isPNG) {
        this.$message.error('Invalid file type!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    }
  }

}
</script>

<style lang="less" scoped>
@width: 60vw;

.create-mission {
  margin-top: 54px;
  height: auto;
  width: @width;
  min-width: 700px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
  

  .top-title {
    font-size: 25px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #7c7c7c;

    .top-logo {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }

  .left-div {
    height: auto;
  }

  .right-div {
    height: auto;
  }

  .flex-div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .title {
    text-align: left;
    vertical-align: middle;
    padding-left: 10px;
    border-left-style:solid;
    border-width:5px;
    border-color:#F0B11B;
    color: #7c7c7c;
    font-size: 18px;
    font-weight: bold;
  }

  .title-left {
    .title();
    margin-top: 15px;
    clear: both;
  }

  .title-right {
    .title();
    position: absolute;
    left: 50%;
  }

  .left-icon {
    font-size: 24px;
    float: left;
    margin-right: 10px;
    transform: translateY(3px);
  }

  .mission-title-input {
    width: 250px;
    //transform: translateX(calc(125px - @width/2));
    float: left;
    margin-bottom: 15px;
  }

  .mission-type {
    width: 80px;
    float: left;
    margin-bottom: 15px;
  }

  .date-picker {
    width: 250px;
    float: left;
    margin-bottom: 15px;
  }

  .tag-input {
    width: 200px;
    float: left;
    margin-bottom: 15px;
  }

  .mission-location {
    width: 250px;
    float: left;
    margin-bottom: 15px;
  }

  .mission-tags {
    height: 45px;
    width: 100%;
    background-color: white;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    border: 1px lightgray solid;
    clear: both;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    .tag {
      padding: 2px 10px;
      font-size: 13px;
      font-weight: bold;
      border-radius: 5px;
      margin-right: 15px;
      background-color: darkcyan;
      color: white;

      .tag-btn {
        margin-left: 5px;
      }
    }
  }

  .reward-div {
    width: 300px;
    height: auto;

    span {
      margin-right: 10px;
    }

    .reward-type {
      width: 80px;
      margin-right: 20px;
    }

    .reward-account {
      width: 80px;
      display: inline;
    }
  }

  .upload-images {

    .avatar-uploader  > .ant-upload {
      width: 200px;
      height: 150px;
    }

    .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
  }

  .publish-btn {
    width: 100px;
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 50px;
  }
}

</style>