<template>
    <div class="fill">
        <a-input class="input" v-model="question.answer" v-show="state !== 'statistics' && !question.fill_problem.multi_line"></a-input>
        <a-textarea class="input" v-model="question.answer" v-show="state !== 'statistics' && question.fill_problem.multi_line"></a-textarea>
        <div v-if="state === 'statistics'  && isFinish">
          <div class="wrapper" v-for="(count, key) in question.fill_problem.options" :key="key.id">
            <a-progress class="progress" :percent="parseInt(count*100/total)"/>
            <p class="content">{{key}}</p>
            <p class="content">{{count}}人</p>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['question', 'state', 'isFinish', 'total'],
  mounted: function() {
  }
}
</script>

<style lang="less" scoped>

.fill {
    .input {
        width: 150px;
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
}

</style>
