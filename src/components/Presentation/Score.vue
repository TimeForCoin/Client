<template>
    <div v-if="isFinish">
        <div class="rate-area" v-show="state !== 'statistics'">
            <div class="text">{{question.score_problem.min_text}}</div>
            <a-rate class="rate" v-model="question.answer" :count="question.score_problem.score"/>
            <div class="text">{{question.score_problem.max_text}}</div>
        </div>
        <div v-if="state === 'statistics'  && isFinish" class="text">{{question.score_problem.min_text}}</div>
        <div v-if="state === 'statistics'  && isFinish">
          <div class="wrapper" v-for="(option, index) in question.score_problem.options" :key="option.id">
            <a-progress class="progress" :percent="parseInt(option.count*100/total)"/>
            <p class="content">{{index}}分</p>
            <p class="content">{{option.count}}人</p>
          </div>
        </div>
        <div v-if="state === 'statistics'  && isFinish" class="text">{{question.score_problem.max_text}}</div>
    </div>
</template>

<script>
export default {
  props: ['question', 'state', 'isFinish', 'total'],
  data() {
    return {

    }
  },
  mounted: function() {
  }
}
</script>

<style lang="less" scoped>
.rate-area {
    display: flex;
    align-items: flex-end;
    margin-top: 30px;

    .rate {
        margin: 0px 15px;
    }

    .text {
        font-size: 13px;
        white-space: nowrap;
    }
}

.wrapper {
  display: flex;
  align-content: center;
  white-space: nowrap;

  .progress {
    width: 150px;
  }

  .content {
      margin-left: 5px;
  }
}
</style>
