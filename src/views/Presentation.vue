<template>
    <div class="presentation">
        <div class="background"></div>
        <a-divider class="title">问卷标题</a-divider>
        <p>问卷备注</p>
        <div class="question-area" v-for="(question, index) in questions" :key="question.id">
          <div class="index">{{index+1}}</div>
          <a-tag :color="color(question.type, question.choose_problem.max_choose)" class="tag">{{type(question.type, question.choose_problem.max_choose)}}</a-tag>
          <p class="content">{{question.content}}</p>
          <p class="note">{{question.note}}</p>
          <Choice :question="question" v-if="question.type == 'choose'"/>
          <Fill :question="question" v-else-if="question.type == 'fill'"/>
          <Score :question="question" v-else-if="question.type == 'score'"/>
        </div>
        <div class="wrapper">
          <a-button class="submit" v-if="this.state == 'answer'" @click="submit" type="primary" ghost>提交问卷</a-button>
        </div>
    </div>
</template>

<script>
import Choice from '../components/Presentation/Choice.vue'
import Score from '../components/Presentation/Score.vue'
import Fill from '../components/Presentation/Fill.vue'
import { async } from 'q'
import { constants } from 'crypto'

export default {
  props: ['state'],
  components: {
    Choice, Score, Fill
  },
  data() {
    return {
      questions: [],
      answer: []
    }
  },
  computed: {
  },
  methods: {
    type: function(qtype, maxChoose) {
      switch (qtype) {
        case 'choose':
          return maxChoose === 1 ? '单选' : '多选'
        case 'fill':
          return '填空'
        case 'score':
          return '评分'
      }
    },
    color: function(qtype, maxChoose) {
      switch (qtype) {
        case 'choose':
          return maxChoose === 1 ? 'red' : 'blue'
        case 'fill':
          return 'green'
        case 'score':
          return 'purple'
      }
    },
    getAnswer: function() {
      return this.questions.map((v, index) => {
        if (v.type === 'choose') {
          return {
            problem_index: index,
            choose_value: v.answer
          }
        } else if (v.type === 'fill') {
          return {
            problem_index: index,
            string_value: v.answer
          }
        } else if (v.type === 'score') {
          return {
            problem_index: index,
            score_value: v.answer
          }
        }
      })
    },
    verifyAnswer() {
      let errIndex = []
      this.questions.forEach((v, index) => {
        if (v.type === 'choose' && !v.answer.length) {
          errIndex.push(index)
        } else if (v.type === 'fill' && !v.answer) {
          errIndex.push(index)
        } else if (v.type === 'score' && !v.answer) {
          errIndex.push(index)
        }
      })
      if (errIndex.length) this.$message.error(errIndex.map((v) => v + 1).join(' ') + '题未完成')
      return !errIndex.length
    },
    submit: async function() {
      if (!this.verifyAnswer()) return
      console.log(this.getAnswer())
      await this.$service.questionnaire.addAnswer.call(this, this.$route.query.id, this.getAnswer())
    }
  },
  mounted: async function() {
    // 获取问卷信息
    let questions = await this.$service.questionnaire.getQuestions.call(this, this.$route.query.id)
    this.questions = JSON.parse(JSON.stringify(questions.data.problems))
  }
}
</script>

<style lang="less" scoped>
@left: 100px;

.presentation {
  background-color: white;
  display: flex;
  min-width: 700px;
  flex-direction: column;
  justify-content: space-between;

  .background {
    width: 100%;
    height: 100px;
    background-image: url("../assets/HomePage/page1-background.jpg");
    background-size: cover;
    background-position: center;
  }

  .title {
    font-size: 30px;
  }

  .question-area {
    text-align: left;
    position: relative;
    margin: 0px auto 20px;
    width: 600px;
    padding-bottom: 20px;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.2);

    .index {
      position: absolute;
      font-weight: bold;
      left: -65px;
    }

    .tag {
      position: absolute;
      left: -50px;
    }

    .content {
      font-weight: bold;
      font-size: 15px;
    }

    .note {
      font-size: 12px;
    }
  }

  .wrapper {
    margin: 20px;

    .submmit {
      width: 100px;
    }
  }
}
</style>
