<template>
  <div id="banner">
    <div id="left">
      <h1>Time For Coin</h1>
      <p>{{description}}</p>
    </div>
    <div id="right">

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
// 变量
@content-height: 576px;

// 样式
#banner {
  height: @content-height;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  display: flex;
  align-items: center;

  #left {
    width: 54%;
    min-width: 420px;
    max-width: 560px;
    min-height: 336px;
    text-align: left;

    h1 {
      font-weight: 900px;
      font-size: 68px;
    }
  }

  #right {
    width: 46%;
    min-width: 420px;
    max-width: 560px;
    min-height: 336px;

  }
}

</style>
