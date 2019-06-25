<template>
  <div class="mission-type-choice">
    <div class="background"></div>
    <a-divider class="title">请选择任务类型</a-divider>
    <div class="flex-div">
      <div class="type" @click="createNormalMission">
        <div class="image">
          <img :src="logoPath[0].path">
        </div>
        <p class="text">{{logoPath[0].text}}</p>
      </div>
      <div class="type" @click="createQuestionnaireMission">
        <div class="image">
          <img :src="logoPath[1].path">
        </div>
        <p class="text">{{logoPath[1].text}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      logoPath: [
        { path: require('../../assets/HomePage/errand.png'), text: '普通任务' },
        { path: require('../../assets/HomePage/questionnaire.png'), text: '问卷任务' }]
    }
  },
  methods: {
    createNormalMission() {
      this.$router.push({
        path: '/mission_information',
        query: {
          missionType: 1,
          id: 'none'
        }
      })
    },
    createQuestionnaireMission() {
      this.$router.push({
        path: '/mission_information',
        query: {
          missionType: 2,
          id: 'none'
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>

.mission-type-choice {
  margin-top: 70px;
  height: 100%;
  width: 100%;
  background-color: white;

  .background {
    width: 100%;
    height: 30vh;
    background-image: url("../../assets/HomePage/page1-background.jpg");
    background-size: cover;
    background-position: center;
  }

  .title {
    font-size: 25px;
    font-weight: bold;
    color: gray;
  }

  .flex-div {
    width: 400px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;

    .type {
      cursor: pointer;
      transition: 0.5s;

      .image {
        height: 120px;
        width: 120px;
        line-height: 120px;
        background-color: white;
        border-radius: 100%;
        transition: 0.5s;

        img {
          height: 70px;
          width: 70px;
          line-height: 120px;
        }
      }

      .text {
        margin-top: 15px;
        font-size: 18px;
        color: gray;
      }
    }

    .type:hover {
      transition: 0.5s;
      transform: scale(1.05);

      .image {
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
}

</style>
