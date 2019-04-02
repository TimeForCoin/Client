<template>
  <div class="banner">
    <div id="left">
      <h1>Time For Coin</h1>
      <p>{{description}}</p>
    </div>
    <div id="right">
      <img src="../../assets/logo.png" />
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      description: '闲得一币是大学生通过做任务挣钱的云平台，定位上是重点在于运营的众包系统。在本平台中，每个人可以是挣闲钱的受益者，也可以是所谓的“奶牛”。'
    }
  }
}

</script>

<style lang="less" scoped>

// 样式
.banner {
  position: relative;
  max-width: 1200px;
  min-width: 580px;
  min-height: 500px;
  margin: 150px auto 0px;
  padding: 0 24px;
  display: flex;
  align-items: center;

  #left {
    width: 54%;
    min-width: 420px;
    max-width: 560px;
    min-height: 250px;
    text-align: left;
    animation: titleAntimation 2s;

    h1 {
      font-size: 65px;
    }

    p {
      font-size: 20px;
      color: #314659;
    }

  }

  #right {
    width: 46%;
    max-width: 482px;
    min-height: 250px;
    margin-top: 50px;
    animation: upDown 3s infinite;
  }
}

// 屏幕宽度小于760时调整布局
@media screen and (max-width: 760px) {
  .banner {
    margin: 50px auto 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 700px;

    #left {
      width: 100%;
      text-align: center;
      margin-top: 100px;
    }

    #right {
      margin-top: 0px;
      width: 100%;
    }
  }
}

// 动画
@keyframes titleAntimation
{
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes upDown
{
  0% {
    transform: translateY(0px);
  }
  10% {
    transform: translateY(40px);
  }
  20% {
    transform: translateY(10px);
  }
  30% {
    transform: translateY(40px);
  }
  40% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
