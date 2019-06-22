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
          <a-button type="primary" class="questionnaire-btn" @click="createQuestionnaire">创建问卷</a-button>
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
          <div v-for="(item) in missionShow" class="cards" :key="item.id" >
            <MissionCard :MissionModel="item" @click.native="showDetail(item.id)"></MissionCard>
          </div>
        </div>
        <a-button type="primary" class="add-more" icon="plus" @click="addMore">加载更多</a-button>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import MissionCard from '@/components/Mission/MissionCard.vue'
import { async } from 'q';

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
      missions: [],
      total: 0,
      page: 1,
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
    },
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
      console.log(this.searchText);
    },
    async addMore() {
      var parmas = {
        page: this.page,
        size: 4
      }
      var res = await this.$service.task.GetTasksList.call(this, parmas)
      console.log(res)
      this.missions = this.missions.concat(res.tasks)
      //this.missions = this.missions.concat(res.tasks)
      console.log(this.missions)
      this.page = res.pagination.page + 1
    },
    emitEmpty () {
      this.searchText = '';
    },
    createMission() {
      this.$router.push('/create_mission');
    },
    createQuestionnaire() {
      this.$router.push('/create_questionnaire');
    },
    showDetail(id) {
      console.log(id)
      this.$router.push({ name: 'mission_detail', params: { id }});
    }
  },
  created: async function() {
    var parmas = {
      page: 1,
      size: 4
    }
    var res = await this.$service.task.GetTasksList.call(this, parmas)
    console.log(res)
    this.missions = res.tasks
    this.page = res.pagination.page + 1
    this.total = res.pagination.total
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
        position: absolute;
        
        top: 250px;
        left: 70px;
      }
      .questionnaire-btn {
        position: absolute;
        top: 300px;
        left: 70px;
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
      left: 30px;
      top: 30px;
      
      width: auto;
      min-width: 800px;
      height: auto;

      .cards {
        height: auto;
        width: auto;
        margin-bottom: 30px;
        margin-right: 30px;
      }
    }
    .pagination {
      position: relative;
      top: 0px;
      margin-top: 30px;
      margin-bottom: 50px;
    }
    .add-more {
      margin-top: 30px;
      margin-bottom: 50px;
    }
  }
  
}
</style>
