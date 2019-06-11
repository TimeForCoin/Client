<template>
  <div class="create-mission">
    <a-divider class="top-title"><img class="top-logo" src="@/assets/logo.png">发布任务</a-divider>
    <div class="left-div">
      <p class="title"><span>任务名称：</span></p>
      <a-input class="mission-title-input" v-model="mission.title"/>
    </div>
    <a-divider />
    <div class="left-div">
      <p class="title"><span>任务内容描述:</span></p>
      <a-textarea class="mission-content-input" :rows="4" v-model="mission.content"/>
    </div>
    <a-divider />
    <div class="flex-div">
      <div class="left-div" id="time-div">
        <p class="title">
          <span>任务时间:</span>
          <a-icon class="left-icon" type="clock-circle" theme="twoTone" twoToneColor="#F0B11B"/>
        </p>
        <a-range-picker class="date-picker"
          :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
          @change="onTimeChange"
        />
      </div>
      <div class="right-div">
        <p class="title">
          <span>任务类型:</span>
          <a-icon class="left-icon" type="tag" theme="twoTone" twoToneColor="#F0B11B"/>
        </p>
        <a-select class="mission-type" defaultValue="errand" v-model="mission.type">
          <a-select-option value="errand">跑腿</a-select-option>
          <a-select-option value="information">信息</a-select-option>
        </a-select>
      </div>
    </div>
    <a-divider />
    <div class="flex-div">
      <div class="left-div">
        <p class="title">
          <span>任务地点:</span>
          <a-icon class="left-icon" type="environment" theme="twoTone" twoToneColor="#F0B11B"/>
        </p>
        <TagBlock @addTag="addMissionLocation" :text="'添加地点'"/>
      </div>
      <div class="right-div">
        <p class="title">
          <span>任务标签:</span>
          <a-icon class="left-icon" type="tags" theme="twoTone" twoToneColor="#F0B11B"/>
        </p>
        <TagBlock @addTag="addMissionTag" :text="'添加标签'"/>
      </div>
    </div>
    <a-divider />
    <div class="flex-div">
      <div class="reward-div">
        <p class="title">
          <span>任务报酬:</span>
          <a-icon class="left-icon" type="money-collect" theme="twoTone" twoToneColor="#F0B11B"/>
        </p>
        <div class="reward-type">
          <span>类型:</span>
          <a-select defaultValue="money" v-model="mission.reward" style="width: 75px">
            <a-select-option value="money">闲币</a-select-option>
            <a-select-option value="rmb">RMB</a-select-option>
            <a-select-option value="object">其他</a-select-option>
          </a-select>
        </div>
        <div v-if="mission.reward != 'object'" class="reward-account">
          <span>数量:</span>
          <a-input style="width: 75px" v-model="mission.reward_value"/>
        </div>
        <div v-else>
          <span class="reward-object-span">报酬详情:</span>
          <a-textarea class="reward-object" :rows="3" v-model="mission.reward_object"/>
        </div>
      </div>
      <div class="player-div">
        <p class="title">
          <span>参与者设置：</span>
          <a-icon class="left-icon" type="idcard" theme="twoTone" twoToneColor="#F0B11B"/>
        </p>
        <a-checkbox @change="onCheckedChange">自动同意领取任务</a-checkbox>
        <br />
        <span>人数上限:</span>
        <a-input class="player-account" v-model="mission.max_player"/>
      </div>
    </div>
    <a-divider />
    <div class="left-div">
      <p class="title">上传图片：</p>
      <ImgUploader/>
    </div>
    <a-divider />
    <div class="left-div">
      <p class="title">上传附件：</p>
      <FileUploader />
    </div>
    <a-divider />
    <a-button class="publish-btn" type="primary" @click="createMission">发布</a-button>
    <a-button class="save-btn" type="primary">保存草稿</a-button>
  </div>
</template>

<script>
import moment from 'moment';
import TagBlock from '@/components/Mission/TagBlock.vue'
import ImgUploader from '@/components/Mission/ImgUploader.vue'
import FileUploader from '@/components/Mission/FileUploader.vue'

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  components: {
    TagBlock,
    ImgUploader,
    FileUploader
  },
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
        type: 'errand',
        reward: 'money',
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
    onTimeChange(dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    },
    addMissionTag(tags) {
      this.mission.tags = tags;
    },
    addMissionLocation(tags) {
      this.mission.location = tags;
    },
    onCheckedChange(e) {
      this.mission.auto_accept = e.target.checked
    },
    handleCancel () {
      this.previewVisible = false
    },
    createMission() {
      console.log(this.mission)
    }
  }

}
</script>

<style lang="less" scoped>
@width: 60vw;
@div-width: 280px;

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
    margin-bottom: 5px;
  }

  .right-div {
    height: auto;
    position: absolute;
    left: 55%;
  }

  .flex-div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    position: relative;
  }

  .title {
    text-align: left;
    padding-left: 10px;
    border-left-style:solid;
    border-width:5px;
    border-color:#F0B11B;
    color: #7c7c7c;
    font-size: 18px;
    font-weight: bold;
    span {
      vertical-align: middle;
    }
  }

  .left-icon {
    font-size: 24px;
    float: left;
    margin-right: 10px;
    transform: translateY(3px);
  }

  .mission-type {
    width: 80px;
    float: left;
  }

  .date-picker {
    width: @div-width;
    float: left;
  }

  .reward-div {
    .left-div();
    span {
      margin-right: 10px;
    }
    .reward-type {
      text-align: left;
    }
    .reward-account {
      text-align: left;
      margin-top: 10px;
    }
    .reward-object-span {
      display: block;
      text-align: left;
      margin-top: 10px;
    }
    .reward-object {
      width: @div-width;
      display: block;
      margin-top: 10px;
    }
  }

  .player-div {
    .right-div();
    span {
      margin-right: 8px;
    }
    .player-account {
      width: 75px;
      margin-top: 10px;
    }
  }

  .btn {
    width: 100px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 50px;
  }
  .publish-btn {
    .btn();
    margin-right: 100px;
  }
  .save-btn {
    .btn();
  }
}
</style>