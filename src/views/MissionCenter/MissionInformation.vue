<template>
  <div class="mission-information">
    <a-divider class="top-title"><img class="top-logo" src="@/assets/logo.png">发布任务</a-divider>
    <div class="left-div">
      <p class="title">
        <span>任务名称:</span>
        <a-icon class="exclamation-icon" type="exclamation-circle" v-show="showError && mission.title == ''" theme="twoTone" twoToneColor="red"/>
      </p>
      <a-input class="mission-title-input" v-model="mission.title"/>
    </div>
    <a-divider />
    <div class="left-div">
      <p class="title">
        <span>任务内容描述:</span>
        <a-icon class="exclamation-icon" type="exclamation-circle" v-show="showError && mission.content == ''" theme="twoTone" twoToneColor="red"/>
      </p>
      <a-textarea class="mission-content-input" :autosize="{minRows: 4}" v-model="mission.content"/>
    </div>
    <a-divider />
    <div class="flex-div">
      <div class="left-div" id="time-div">
        <p class="title">
          <a-icon class="left-icon" type="clock-circle" theme="twoTone" twoToneColor="#F0B11B"/>
          <span>任务时间:</span>
          <a-icon class="exclamation-icon" type="exclamation-circle" v-show="showError && (mission.start_date == 0 || mission.end_date == 0)" theme="twoTone" twoToneColor="red"/>
        </p>
        <a-range-picker class="date-picker"
          :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
          @change="onTimeChange"
        />
      </div>
      <div class="right-div">
        <p class="title">
          <a-icon class="left-icon" type="tag" theme="twoTone" twoToneColor="#F0B11B"/>
          <span>任务类型:</span>
        </p>
        <a-select v-if="missionType == 1" class="mission-type" defaultValue="errand" v-model="mission.type">
          <a-select-option value="run">跑腿</a-select-option>
          <a-select-option value="info">信息</a-select-option>
        </a-select>
        <p v-else class="mission-type2">问卷</p>
      </div>
    </div>
    <a-divider />
    <div class="flex-div">
      <div class="left-div">
        <p class="title">
          <a-icon class="left-icon" type="environment" theme="twoTone" twoToneColor="#F0B11B"/>
          <span>任务地点:</span>
        </p>
        <TagBlock @addTag="addMissionLocation" :text="'添加地点'"/>
      </div>
      <div class="right-div">
        <p class="title">
          <a-icon class="left-icon" type="tags" theme="twoTone" twoToneColor="#F0B11B"/>
          <span>任务标签:</span>
        </p>
        <TagBlock @addTag="addMissionTag" :text="'添加标签'"/>
      </div>
    </div>
    <a-divider />
    <div class="flex-div">
      <div class="reward-div">
        <p class="title">
          <a-icon class="left-icon" type="money-collect" theme="twoTone" twoToneColor="#F0B11B"/>
          <span>任务报酬:</span>
          <a-icon class="exclamation-icon" type="exclamation-circle" v-show="showError && mission.reward_value == 0 && mission.reward_object == ''" theme="twoTone" twoToneColor="red"/>
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
          <a-textarea class="reward-object" :autosize="{minRows: 3}" v-model="mission.reward_object"/>
        </div>
      </div>
      <div class="player-div">
        <p class="title">
          <a-icon class="left-icon" type="idcard" theme="twoTone" twoToneColor="#F0B11B"/>
          <span>参与者设置:</span>
          <a-icon class="exclamation-icon" type="exclamation-circle" v-show="showError && mission.max_player <= 0" theme="twoTone" twoToneColor="red"/>
        </p>
        <a-checkbox @change="onCheckedChange">自动同意领取任务</a-checkbox>
        <br />
        <span>人数上限:</span>
        <a-input class="player-account" v-model="mission.max_player"/>
      </div>
    </div>
    <a-divider />
    <div class="left-div">
      <p class="title">上传图片:</p>
      <ImgUploader @fileChange="addImages" :parentFileList="imageList"/>
    </div>
    <a-divider />
    <div class="left-div">
      <p class="title">上传附件:</p>
      <FileUploader @fileChange="addAttachment"/>
    </div>
    <a-divider />
    <div v-if="missionType == 1" class="buttons">
      <a-button class="publish-btn" type="primary" @click="createMission">发布</a-button>
      <a-button class="save-btn" type="primary" @click="saveMission">保存草稿</a-button>
    </div>
    <a-button v-else class="question-btn" type="primary" @click="editQuestion">保存草稿并进入问卷编辑</a-button>
  </div>
</template>

<script>
import moment from 'moment'
import TagBlock from '@/components/Mission/CreateMission/TagBlock.vue'
import ImgUploader from '@/components/Mission/CreateMission/ImgUploader.vue'
import FileUploader from '@/components/Mission/CreateMission/FileUploader.vue'

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
      taskID: '',
      isDraft: false,
      completeInfo: false,
      showError: false,
      mission: {
        title: '',
        content: '',
        images: [],
        attachment: [],
        type: 'run',
        reward: 'money',
        reward_value: 0,
        reward_object: '',
        location: [],
        tags: [],
        start_date: 0,
        end_date: 0,
        max_player: 0,
        auto_accept: false,
        publish: false
      },
      imageList: [],
      fileList: []
    }
  },
  computed: {
    missionType: function() {
      return this.$route.query.missionType
    }
  },
  methods: {
    moment,
    onTimeChange(dates, dateStrings) {
      if (dates[0] && dates[1]) {
        this.mission.start_date = dates[0].unix()
        this.mission.end_date = dates[1].unix()
      } else {
        this.mission.start_date = 0
        this.mission.end_date = 0
      }
    },
    addMissionTag(tags) {
      this.mission.tags = tags
    },
    addMissionLocation(tags) {
      this.mission.location = tags
    },
    onCheckedChange(e) {
      this.mission.auto_accept = e.target.checked
    },
    addAttachment(ids) {
      this.mission.attachment = ids
    },
    addImages(ids) {
      this.mission.images = ids
      console.log('fuck', this.mission.images)
    },
    checkInformation() {
      // console.log(this.mission)
      if (this.mission.title == '' || this.mission.content == '' || this.mission.start_date == 0 ||
         this.mission.end_date == 0 || this.mission.max_player <= 0 ||
         (this.mission.reward_value == 0 && this.mission.reward_object == '')) {
        this.showError = true
        this.$message.error('请填写必要信息')
        return false
      }
      if (this.mission.start_date < moment().startOf('day').unix()) {
        this.$message.error('请选择正确的时间')
        return false
      }
      this.mission.max_player = parseInt(this.mission.max_player)
      this.mission.reward_value = parseInt(this.mission.reward_value)
      return true
    },
    async createMission() {
      if (this.checkInformation() == false) {
        return
      }
      this.mission.publish = true
      // console.log(this.mission)
      var res
      var id
      if (this.isDraft == true) {
        this.mission.status = 'wait'
        await this.$service.task.ChangeTask.call(this, this.taskID, this.mission)
        id = taskID
      } else {
        res = await this.$service.task.CreateTask.call(this, this.mission)
        id = res.id
      }
      // console.log(res.id)
      this.$router.push({
        path: '/mission_detail',
        query: {
          id: id
        }
      })
    },
    async saveMission() {
      if (this.checkInformation() == false) {
        return
      }
      var res
      var id
      if (this.isDraft == true) {
        // this.mission.status = 'draft'
        await this.$service.task.ChangeTask.call(this, this.taskID, this.mission)
        id = taskID
      } else {
        this.mission.publish = false
        res = await this.$service.task.CreateTask.call(this, this.mission)
        id = res.id
      }
      this.$router.push({
        path: '/mission_detail',
        query: {
          id: res.id
        }
      })
    },
    async editQuestion() {
      if (this.checkInformation() == false) {
        return
      }
      this.mission.publish = false
      this.mission.type = 'questionnaire'
      this.$router.push({
        path: '/create_questionnaire',
        query: {
          id: this.taskID
        }
      })
    }
  },
  created: async function() {
    var id = this.$route.query.id
    if (id != 'none') {
      var res = await this.$service.task.GetTask.call(this, id)
      this.mission = res
      // 将任务images加载到子控件中，并修改任务中images数据结构
      this.imageList = this.mission.images
      // console.log(this.imageList)
      this.mission.images = []

      this.isDraft = true
      this.taskID = id
    }
  }
}
</script>

<style lang="less" scoped>
@width: 60vw;
@div-width: 280px;

.mission-information {
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
      margin-right: 10px;
    }
  }

  .left-icon {
    font-size: 24px;
    margin-right: 10px;
    transform: translateY(3px);
  }

  .exclamation-icon {
    font-size: 18px;
    vertical-align: middle;
  }

  .mission-type {
    width: 80px;
    float: left;
  }

  .mission-type2 {
    font-size: 17px;
    color: gray;
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
  .question-btn {
    .btn();
    width: auto;
  }
}
</style>
