<template>
  <div class="mission">
    <a-layout class="layout-container">
      <a-layout-sider width="240px">
        <a-menu class="left-menu"  mode="inline" @click="leftMenuClick">
          <a-menu-item key="1">
            <a-icon type="notification" />
            <span class="nav-text">发布的任务</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="bulb" />
            <span class="nav-text">接收的任务</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="star" />
            <span class="nav-text">我的收藏</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content>
        <div class="top-bar">
          <a-menu class="top-menu" mode="horizontal" style="lineHeight: 62px" @click="topMenuClick">
            <a-sub-menu class="top-menu-item">
              <span slot="title" class="submenu-title-wrapper">类型-{{taskType}}</span>
                <a-menu-item key="type0">{{subTitle[0]}}</a-menu-item>
                <a-menu-item key="type1">{{subTitle[1]}}</a-menu-item>
                <a-menu-item key="type2">{{subTitle[2]}}</a-menu-item>
                <a-menu-item key="type3">{{subTitle[3]}}</a-menu-item>
            </a-sub-menu>
            <a-menu-item class="top-menu-item" key="new">最新</a-menu-item>
            <a-menu-item class="top-menu-item" key="hot">最热</a-menu-item>
        </a-menu>
        </div>
        <div class="task-cards">

        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskType: '全部',
      subTitle: ['全部', '跑腿', '开黑', '哲学摔跤'],
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
          this.taskType = this.subTitle[0];
          break;
        case 'type1':
          this.taskType = this.subTitle[1];
          break;
        case 'type2':
          this.taskType = this.subTitle[2];
          break;
        case 'type3':
          this.taskType = this.subTitle[3];
          break;
        case 'new':
          break;
        case 'hot':
          break;
      }
      console.log(event.key);
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
    .left-menu {
      width: 100%;
      height: 100%;
      padding-top: 50px;
      
    }
    .top-bar {
      height: 64px;
      background-color: white;
      .top-menu {
        height: 100%;
        width: 100%;
        text-align: left;

        .top-menu-item {
          margin-left: 50px;
        }
      }
    }
    .task-cards {
      
      margin: 100px, 100px, 100px, 100px;

    }
  }
  
}
</style>
