<template>
    <div>
        <div class="rate-area">
            <div class="text">{{question.score_problem.min_text}}</div>
            <a-rate class="rate" v-model="question.answer" :count="question.score_problem.score"/>
            <div class="text">{{question.score_problem.max_text}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['question']
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
</style>
