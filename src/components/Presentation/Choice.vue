<template>
    <div>
        <a-radio-group
            v-show="question.choose_problem.max_choose == 1"
            @change="onSingle"
            class="group"
        >
            <div
                class="group-item"
                v-for="(option, oindex) in question.choose_problem.options"
                :value="oindex"
                :key="option.id"
            >
                <a-radio class="radio" :value="oindex">{{option.content}}</a-radio>
            </div>
        </a-radio-group>
        <a-checkbox-group
            v-show="question.choose_problem.max_choose >= 2"
            class="group"
            :options="checkboxList"
            v-model="checkList"
            @change="onClick"
        />
        <p class="tips" v-if="question.choose_problem.max_choose >= 2">(最多可选{{question.choose_problem.max_choose}}个选项)</p>
    </div>
</template>

<script>
const defaultList = []

export default {
  props: ['question'],
  data() {
    return {
      checkList: defaultList
    }
  },
  methods: {
    onClick: function() {
      if (!(this.checkList.length > this.question.choose_problem.max_choose)) {
        this.question.answer.splice(0, this.question.answer.length)
        this.question.answer.push.apply(this.question.answer, this.checkList)
      } else {
        this.checkList.splice(0, this.checkList.length)
        this.checkList.push.apply(this.checkList, this.question.answer)
      }
    },
    onSingle: function(v) {
      this.question.answer = [v.target.value]
    }
  },
  computed: {
    checkboxList: function() {
      return this.question.choose_problem.options.map((value, index) => {
        return {
          label: value.content,
          value: index
        }
      })
    }
  },
  mounted: function() {
    this.question.answer = []
  }
}
</script>

<style lang="less" scoped>
.group{
    display: flex;
    flex-direction: column;

    .group-item{
        .radio {
            font-size: 15px;
        }
    }
}

.tips {
    margin-top: 20px;
    font-size: 12px;
    color: red;
}
</style>
