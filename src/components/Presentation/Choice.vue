<template>
    <div>
        <a-radio-group
            v-show="state !== 'statistics' && question.choose_problem.max_choose == 1"
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
            v-show="state !== 'statistics' && question.choose_problem.max_choose >= 2"
            class="group"
            :options="checkboxList"
            v-model="checkList"
            @change="onClick"
        />
        <p class="tips" v-if="state !== 'statistics' && question.choose_problem.max_choose >= 2">(最多可选{{question.choose_problem.max_choose}}个选项)</p>
        <div v-if="state === 'statistics' && isFinish">
          <div class="wrapper" v-for="option in question.choose_problem.options" :key="option.id">
            <a-progress class="progress" :percent="parseInt(option.count*100/total)"/>
            <p class="content">{{option.content}}</p>
            <p class="content">{{option.count}}人</p>
          </div>
        </div>
    </div>
</template>

<script>
const defaultList = []

export default {
  props: ['question', 'state', 'isFinish', 'total'],
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
    },
    options: function() {
      return this.question.choose_problem.options
    }
  },
  created: function() {
  },
  mounted: function() {
    this.question.answer = []
    this.question.choose_problem.options.forEach((option) => {
      if (option.count === undefined) {
        option.count = 0
      }
    })
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
