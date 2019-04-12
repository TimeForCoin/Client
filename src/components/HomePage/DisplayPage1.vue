<template>
  <div class="page1">
    <div id="title" class="empty">{{ title }}</div>
    <div id="image-area"></div>
    <div class="empty">{{ ability }}</div>
    <div id="content">
      <div v-for="item in logoPath" class="ability" :key="item.text">
        <div class="image">
          <img :src="item.path">
        </div>
        <div class="text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: '闲得一币',
      ability: '功能',
      logoPath: [
        { path: require('../../assets/HomePage/questionnaire.png'), text: '问卷调查' },
        { path: require('../../assets/HomePage/errand.png'), text: '跑腿代取' },
        { path: require('../../assets/HomePage/notice.png'), text: '寻物启事' }]
    }
  }
}
</script>

<style lang="less" scoped>

.page1 {
  background: url("../../assets/HomePage/page1-background.jpg");
  background-attachment: fixed;
  background-size: cover;

  .empty {
    height: 150px;
    line-height: 150px;
    width: 100%;
    font-size: 40px;
    color: white;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.4);
    background-color: rgb(50, 79, 229);
  }

  #image-area {
    height: 800px;
    width: 100%;
  }

  #content {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgb(50, 79, 229);

    .ability {
      transition: 1s;
      display: flex;
      flex-direction: column;

      .image {
        height: 120px;
        width: 120px;
        line-height: 120px;
        background-color: white;
        border-radius: 100%;
        transition: 1s;

        img {
          height: 70px;
          width: 70px;
          line-height: 120px;
        }
      }

      .text {
        font-size: 20px;
        color: white;
        margin-top: 10px;
      }
    }

    .ability:hover {
      transform: translateY(-20px)
    }
  }
}

</style>
