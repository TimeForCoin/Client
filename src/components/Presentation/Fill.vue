<template>
    <div class="fill">
        <a-input class="input" v-model="question.answer" v-show="!question.fill_problem.multi_line"></a-input>
        <a-textarea class="input" v-model="question.answer" v-show="question.fill_problem.multi_line"></a-textarea>
    </div>
</template>

<script>
export default {
  props: ['question']
}
</script>

<style lang="less" scoped>

.fill {
    .input {
        width: 150px;
    }
}

</style>
