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
          <a-input placeholder="搜索" v-model="searchText" class="input-text">
            <a-icon slot="prefix" type="search" />
            <a-icon v-if="searchText" slot="suffix" type="close-circle" @click="emitEmpty" class="close-btn" />
          </a-input>
        </div>
        <div class="mission-cards">
          <div v-for="(item, index) in missionShow" class="cards" :key="index" >
            <MissionCard :MissionModel=missionShow[index]></MissionCard>
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
      searchText: '',
      missions: [
        {
          "title": "帮我洗澡",
          "content": "过来至二634洗澡澡",
          "type": "run",
          "reward": "rmb",
          "reward_value": 100,
          "reward_object": "一个吻",
          "view_count": 30,
          "like_count": 30,
          "collect_count": 30,
          "publish_date": 1559732518,
          "publisher": {
            "nickname": "CTP",
          },
        },
        {
          "title": "天王盖地虎",
          "content": "小鸡炖蘑菇",
          "type": "questionnaire",
          "reward": "rmb",
          "reward_value": 0,
          "reward_object": "蘑菇",
          "view_count": 50,
          "like_count": 30,
          "collect_count": 30,
          "publish_date": 1559732557,
          "publisher": {
            "nickname": "Eason",
          },
        },
        {
          "title": "暗示荣真",
          "content": "疯狂暗示荣真",
          "type": "info",
          "reward": "rmb",
          "reward_value": 500,
          "reward_object": "Zhenly",
          "view_count": 60,
          "like_count": 30,
          "collect_count": 30,
          "publish_date": 1559732561,
          "publisher": {
            "nickname": "DarkVan",
          },
        },
        {
          "title": "暗示荣真",
          "content": "疯狂暗示荣真",
          "type": "run",
          "reward": "rmb",
          "reward_value": 500,
          "reward_object": "Zhenly",
          "view_count": 10,
          "like_count": 30,
          "collect_count": 30,
          "publish_date": 1559732563,
          "publisher": {
            "nickname": "User1",
          },
        },
        {
          "title": "暗示荣真",
          "content": "疯狂暗示荣真疯狂暗示荣真疯狂暗示荣真疯狂暗示荣真疯狂暗示荣真疯狂暗示荣真疯狂暗示荣真",
          "type": "questionnaire",
          "reward": "rmb",
          "reward_value": 500,
          "reward_object": "Zhenly",
          "view_count": 80,
          "like_count": 30,
          "collect_count": 30,
          "publish_date": 1559732518,
          "publisher": {
            "nickname": "CSQ",
          },
        },
        {
          "title": "秀秀好强啊",
          "content": "疯狂暗示秀秀",
          "type": "info",
          "reward": "rmb",
          "reward_value": 500,
          "reward_object": "Zhenly",
          "view_count": 40,
          "like_count": 30,
          "collect_count": 30,
          "publish_date": 1559732518,
          "publisher": {
            "nickname": "Zhenly",
          },
        },
      ],
    }
  },
  computed: {
    missionShow: function() {
      return this.missions.filter((item) => {
        if(this.searchText != null) {
          return (item.title.indexOf(this.searchText) !== -1
                  || item.content.indexOf(this.searchText) !== -1);
        }
        return true;
      }).filter((item) => {
        if (this.missionType == 0
            ||this.missionType == 1 && item.type == "run"             //跑腿
            || this.missionType == 2 && item.type == "questionnaire"  //问卷
            || this.missionType == 3 && item.type == "info") {        //信息
          return true;
        }
        return false;
      }).sort((a, b) => {
        if (this.sortType == 0) {       //按时间排序
          var x = a.publish_date;
          var y = b.publish_date;
          return ((x<y)?-1:(x>y)?1:0);
        }
        if (this.sortType == 1) {      //按热度排序
          var x = a.view_count + a.like_count + a.collect_count;
          var y = b.view_count + b.like_count + b.collect_count;
          return ((x<y)?1:(x>y)?-1:0);
        }
        return 0;
      })
    }
  },
  methods: {
    leftMenuClick(event) {
      switch(event.key) {
        case '1':
          break;
        case '2': 
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
      console.log(this.searchText);
    },
    emitEmpty () {
      this.searchText = '';
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

        .close-btn {
          cursor: pointer;
          color: #ccc;
          transition: color 0.3s;
          font-size: 12px;
        }
        .close-btn:hover {
          color: #999;
        }
        .close-btn:active {
          color: #666;
        }
      }
    }
    .mission-cards {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start ;
      left: 50px;
      top: 30px;
      margin-right: 100px;
      width: calc(100vw - 340px);
      min-width: 1000px;
      height: 670px;

      .cards {
        height: auto;
        width: auto;
      }
    }
    .pagination {
      position: relative;
      top: 30px;
      margin-top: 30px;
    }
  }
  
}
</style>
