<template>
  <div class="mission">
    <a-layout class="layout-container">
      <a-layout-sider width="240px" class="layout-sider">
        <div class="left-bar">
          <a-menu class="left-menu"  mode="inline" @click="leftMenuClick">
            <a-menu-item key="1" class="left-menu-item">
              <a-icon type="notification" />
              <span class="nav-text">发布的任务</span>
            </a-menu-item>
            <a-menu-item key="2" class="left-menu-item">
              <a-icon type="bulb" />
              <span class="nav-text">接收的任务</span>
            </a-menu-item>
            <a-menu-item key="3" class="left-menu-item">
              <a-icon type="star" />
              <span class="nav-text">我的收藏</span>
            </a-menu-item>
          </a-menu>
          <a-button type="primary" class="mission-btn" @click="createMission">发布任务</a-button>
        </div>
      </a-layout-sider>
      <a-layout-content>
        <div class="top-bar">
          <a-menu class="top-menu" mode="horizontal" style="lineHeight: 62px" @click="topMenuClick">
            <a-sub-menu class="top-menu-item">
              <span slot="title" class="submenu-title-wrapper">类型-{{subTypeTitle[missionType]}}</span>
                <a-menu-item key="type0">{{subTypeTitle[0]}}</a-menu-item>
                <a-menu-item key="type1">{{subTypeTitle[1]}}</a-menu-item>
                <a-menu-item key="type2">{{subTypeTitle[2]}}</a-menu-item>
                <a-menu-item key="type3">{{subTypeTitle[3]}}</a-menu-item>
            </a-sub-menu>
            <a-sub-menu class="top-menu-item">
              <span slot="title" class="submenu-title-wrapper">排序方式-{{subSortTitle[sortType]}}</span>
              <a-menu-item key="new">{{subSortTitle[0]}}</a-menu-item>
              <a-menu-item key="hot">{{subSortTitle[1]}}</a-menu-item>
            </a-sub-menu>
          </a-menu>
          <a-input-search placeholder="搜索" @search="onSearch" class="input-text"/>
        </div>
        <div class="mission-cards">
          <div v-for="(item, index) in missions" class="cards" :key="index" >
            <MissionCard :MissionModel=missions[index]></MissionCard>
          </div>
        </div>
        <a-pagination simple :defaultCurrent="1" :total=totalPage class="pagination"/>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import MissionCard from '@/components/MissionCard.vue'

export default {
  components: {
    MissionCard
  },
  data() {
    return {
      missionType: 0,
      sortType: 0,
      subTypeTitle: ['全部', '跑腿任务', '问卷任务', '信息任务'],
      subSortTitle: ['最新', '最热'],
      totalPage: 10,
      missions: [
        {
          "title": "帮我洗澡",
          "content": "过来至二634洗澡澡",
          "type": "run",
          "reward": "rmb",
          "reward_value": 100,
          "reward_object": "一个吻",
        },
        {
          "title": "天王盖地虎",
          "content": "小鸡炖蘑菇",
          "type": "questionnaire",
          "reward": "rmb",
          "reward_value": 0,
          "reward_object": "蘑菇",
        },
        {
          "title": "暗示荣真",
          "content": "疯狂暗示荣真",
          "type": "info",
          "reward": "rmb",
          "reward_value": 500,
          "reward_object": "Zhenly",
        },
        {
          "title": "暗示荣真",
          "content": "疯狂暗示荣真",
          "type": "run",
          "reward": "rmb",
          "reward_value": 500,
          "reward_object": "Zhenly",
        },
        {
          "title": "暗示荣真",
          "content": "疯狂暗示荣真疯狂暗示荣真疯狂暗示荣真疯狂暗示荣真疯狂暗示荣真疯狂暗示荣真疯狂暗示荣真",
          "type": "questionnaire",
          "reward": "rmb",
          "reward_value": 500,
          "reward_object": "Zhenly",
        },
        {
          "title": "秀秀好强啊",
          "content": "疯狂暗示秀秀",
          "type": "info",
          "reward": "rmb",
          "reward_value": 500,
          "reward_object": "Zhenly",
        },
      ],
    }
  },
  methods: {
    leftMenuClick(event) {
      switch(event.key) {
        case '1':
          break;
        case '2':
          break;
        case '3':
          break;
      }
      console.log(event.key);
    },
    topMenuClick(event) {
      switch(event.key) {
        case 'type0':
          this.missionType = 0;
          break;
        case 'type1':
          this.missionType = 1;
          break;
        case 'type2':
          this.missionType = 2;
          break;
        case 'type3':
          this.missionType = 3;
          break;
        case 'new':
          this.sortType = 0;
          break;
        case 'hot':
          this.sortType = 1;
          break;
      }
      console.log(event.key);
    },
    onSearch(value) {
      
    },
    createMission() {
      this.$router.push('/create_mission');
    }
  }
}
</script>

<style lang="less" scoped>
.mission {
  margin-top: 70px;
  background-color: white;
  .layout-container {
    height: calc(100vh - 70px);
    .left-bar {
      position: relative;
      height: 100%;
      width: 100%;

      .left-menu {
        position: absolute;
        width: 100%;
        height: 100%;
        padding-top: 50px;
        text-align: left;

        .left-menu-item {
          margin-bottom: 15px;
        }
      }
      .mission-btn {
        position: relative;
        top: 250px;
      }
    }
    .ant-layout-content {
      position: relative;
    }
    .top-bar {
      height: 64px;
      min-width: 1000px;
      background-color: white;
      .top-menu {
        position: relative;
        height: 100%;
        width: 100%;
        text-align: left;

        .top-menu-item {
          margin-left: 50px;
        }
      }

      .input-text {
        position: relative;
        right: 50px;
        top: -50px;
        width: 200px;
      }
    }
    .mission-cards {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start ;
      left: 50px;
      top: 50px;
      margin-right: 100px;
      width: calc(100vw - 340px);
      min-width: 1000px;
      height: 650px;

      .cards {
        height: auto;
        width: auto;
      }
    }
    .pagination {
      position: relative;
      top: 50px;
      margin-top: 30px;
    }
  }
  
}
</style>
