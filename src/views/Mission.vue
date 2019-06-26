<template>
  <div class="mission">
    <a-layout class="layout-container">
      <a-layout-sider width="240px" class="layout-sider">
        <div class="left-bar">
          <a-menu class="left-menu"  mode="inline" @click="leftMenuClick" :defaultSelectedKeys="['1']">
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
            <a-menu-item key="4" class="left-menu-item">
              <a-icon type="edit" />
              <span class="nav-text">草稿箱</span>
            </a-menu-item>
            <a-menu-item key="5" class="left-menu-item">
              <a-icon type="delete" />
              <span class="nav-text">历史任务</span>
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
                <a-menu-item key="all">{{subTypeTitle['all']}}</a-menu-item>
                <a-menu-item key="run">{{subTypeTitle['run']}}</a-menu-item>
                <a-menu-item key="questionnaire">{{subTypeTitle['questionnaire']}}</a-menu-item>
                <a-menu-item key="info">{{subTypeTitle['info']}}</a-menu-item>
            </a-sub-menu>
            <a-sub-menu class="top-menu-item">
              <span slot="title" class="submenu-title-wrapper">排序方式-{{subSortTitle[sortType]}}</span>
              <a-menu-item key="new">{{subSortTitle['new']}}</a-menu-item>
              <a-menu-item key="hot">{{subSortTitle['hot']}}</a-menu-item>
            </a-sub-menu>
          </a-menu>
          <a-input placeholder="搜索" v-model="searchText" class="input-text">
            <a-icon slot="prefix" type="search" />
            <a-icon v-if="searchText" slot="suffix" type="close-circle" @click="emitEmpty" class="close-btn" />
          </a-input>
        </div>
        <div class="mission-cards">
          <div v-for="(item) in missionShow" class="cards" :key="item.id" >
            <MissionCard :MissionModel="item" @click.native="showDetail(item.id, item.status, item.type)"></MissionCard>
          </div>
        </div>
        <a-button v-if="(page-1) * 6 < total" type="primary" class="add-more" icon="plus" @click="addMore">加载更多</a-button>
        <a-button v-else type="primary" class="add-more" icon="plus" disabled>已无更多</a-button>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import MissionCard from '@/components/Mission/MissionCard.vue'
import { async } from 'q'

export default {
  components: {
    MissionCard
  },
  data() {
    return {
      missionType: 'all',
      sortType: 'new',
      show: 1,
      subTypeTitle: {
        'all': '全部',
        'run': '跑腿任务',
        'questionnaire': '问卷任务',
        'info': '信息任务'
      },
      subSortTitle: {
        'new': '最新',
        'hot': '最热'
      },
      totalPage: 10,
      searchText: '',
      missions: [],
      total: 0,
      page: 1
    }
  },
  computed: {
    missionShow: function() {
      return this.missions.filter((item) => {
        if (this.searchText != null) {
          return (item.title.indexOf(this.searchText) !== -1 ||
                  item.content.indexOf(this.searchText) !== -1)
        }
        return true
      })
      // .filter((item) => {
      //   if (this.missionType == 0
      //       ||this.missionType == 1 && item.type == "run"             //跑腿
      //       || this.missionType == 2 && item.type == "questionnaire"  //问卷
      //       || this.missionType == 3 && item.type == "info") {        //信息
      //     return true;
      //   }
      //   return false;
      // })
      // .sort((a, b) => {
      //   if (this.sortType == 0) {       //按时间排序
      //     var x = a.publish_date;
      //     var y = b.publish_date;
      //     return ((x<y)?-1:(x>y)?1:0);
      //   }
      //   if (this.sortType == 1) {      //按热度排序
      //     var x = a.view_count + a.like_count + a.collect_count;
      //     var y = b.view_count + b.like_count + b.collect_count;
      //     return ((x<y)?1:(x>y)?-1:0);
      //   }
      //  return 0;
      // })
    }
  },
  methods: {
    leftMenuClick(event) {
      switch (event.key) {
        case '1':
          this.getPublishedMission(1)
          this.show = 1
          break
        case '2':
          this.getPlayingMission(1)
          this.show = 2
          break
        case '3':
          this.getCollectedMission(1)
          this.show = 3
          break
        case '4':
          this.getDraftMission(1)
          this.show = 4
          break
      }
      // console.log(event.key)
    },
    topMenuClick(event) {
      switch (event.key) {
        case 'all':
          this.missionType = 'all'
          break
        case 'run':
          this.missionType = 'run'
          break
        case 'questionnaire':
          this.missionType = 'questionnaire'
          break
        case 'info':
          this.missionType = 'info'
          break
        case 'new':
          this.sortType = 'new'
          break
        case 'hot':
          this.sortType = 'hot'
          break
      }
      // console.log(event.key)
      switch (this.show) {
        case 1:
          this.getPublishedMission(1)
          break
        case 2:
          this.getPlayingMission(1)
          break
        case 3:
          this.getCollectedMission(1)
          break
        case 4:
          this.getDraftMission(1)
          break
      }
    },
    onSearch(value) {
      console.log(this.searchText)
    },
    async addMore() {
      switch (this.show) {
        case 1:
          this.getPublishedMission(this.page)
          break
        case 2:
          this.getPlayingMission(this.page)
          break
        case 3:
          this.getCollectedMission(this.page)
          break
        case 4:
          this.getDraftMission(this.page)
          break
      }
    },
    emitEmpty () {
      this.searchText = ''
    },
    createMission() {
      this.$router.push('/create_mission')
    },
    createQuestionnaire() {
      this.$router.push('/create_questionnaire')
    },
    showDetail(id, status, type) {
      //console.log(id, status, type)
      if(status == 'draft') {
        if(type == 'questionnaire') {
          this.$router.push({
            path: '/mission_information',
            query: {
              missionType: 2,
              id: id
            }
          })
        }
        else {
          this.$router.push({
            path: '/mission_information',
            query: {
              missionType: 1,
              id: id
            }
          })
        }
      }
      else {
        this.$router.push({
          path: '/mission_detail',
          query: {
            id: id
          }
        });
      }
    },
    async getCollectedMission(p) {
      try {
        var parmas = {
          page: p,
          size: 6,
          sort: this.sortType,
          type: this.missionType
        }
        var res = await this.$service.task.GetColllectedTaskList.call(this, 'me', parmas)
        //console.log(res)
        if(p > 1) {
          this.missions = this.missions.concat(res.tasks)
        }
        else {
          this.missions = res.tasks
        }
        // console.log(this.missions)
        this.page = res.pagination.page + 1
        this.total = res.pagination.total
      } catch (err) {
				this.$utils.handler.check.call(this, err)
			}
    },
    async getPlayingMission(p) {
      try {
        var parmas = {
          page: p,
          size: 6
        }
        var res = await this.$service.task.GetPlayingTaskList.call(this, 'me', parmas)
        //console.log(res)
        var tasks = []
        for (var i = 0; i < res.data.length; i++) {
          tasks.push(res.data[i].task)
        }
        if(p > 1) {
          this.missions = this.missions.concat(tasks)
        }
        else {
          this.missions = tasks
        }
        //console.log(this.missions)
        this.page = res.pagination.page + 1
        this.total = res.pagination.total
      } catch (err) {
				this.$utils.handler.check.call(this, err)
			}
    },
    async getPublishedMission(p) {
      try {
        var parmas = {
          page: p,
          size: 6,
          user: 'me',
          sort: this.sortType,
          type: this.missionType
        }
        var res = await this.$service.task.GetTasksList.call(this, parmas)
        //console.log(res)
        if(p > 1) {
          this.missions = this.missions.concat(res.tasks)
        }
        else {
          this.missions = res.tasks
        }
        this.page = res.pagination.page + 1
        this.total = res.pagination.total
      } catch (err) {
				this.$utils.handler.check.call(this, err)
			}
    },
    async getDraftMission(p){
      try {
        let parmas = {
          page: p,
          size: 6,
          user: 'me',
          status: 'draft'
        }
        var res = await this.$service.task.GetTasksList.call(this, parmas)
        //console.log(res)
        if(p > 1) {
          this.missions = this.missions.concat(res.tasks)
        }
        else {
          this.missions = res.tasks
        }
        this.page = res.pagination.page + 1
        this.total = res.pagination.total
      } catch (err) {
				this.$utils.handler.check.call(this, err)
			}
    }
  },
  created: async function() {
    var parmas = {
      page: 1,
      size: 6
    }
    this.getPublishedMission(1)
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

        top: 350px;
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
        cursor: pointer;
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
