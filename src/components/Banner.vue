<template>
  <div id="banner">
    <a-row>
      <a-col id="left" :span="7">
        <div>
          <h1>Time For Coin</h1>
          <p>{{description}}</p>
        </div>
      </a-col>
      <a-col id="right" :span="6" push="4">
        <div>
          <img src="../assets/logo.png" />
        </div>
      </a-col>
    </a-row>
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
// 变量
@content-height: 576px;

// 样式
#banner {
  height: @content-height;
  position: relative;
  max-width: 1200px;
  min-width: 580px;
  margin: 0px auto;
  padding: 0 24px;
  display: flex;
  align-items: center;

  #left {
    width: 54%;
    min-width: 500px;
    max-width: 560px;
    min-height: 250px;
    text-align: left;
    animation: titleAntimation 2s;

    h1 {
      font-weight: 900px;
      font-size: 68px;
    }

    p {
      font-size: 20px;
      color: #314659;
    }

  }

  #right {
    width: 46%;
    min-width: 420px;
    max-width: 560px;
    min-height: 336px;
    animation: upDown 3s infinite;
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
