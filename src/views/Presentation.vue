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
          <Choice :question="question" :total="total" :isFinish="isFinish" :state="state" v-if="question.type == 'choose'"/>
          <Fill :question="question" :total="total" :isFinish="isFinish" :state="state" v-else-if="question.type == 'fill'"/>
          <Score :question="question" :total="total" :isFinish="isFinish" :state="state" v-else-if="question.type == 'score'"/>
        </div>
        <div class="wrapper">
          <a-button class="submit" v-if="this.state == 'answer'" @click="submit" type="primary" ghost>提交问卷</a-button>
          <a-button type="primary" v-if="this.state == 'statistics'" @click="back" ghost>完成</a-button>
        </div>
    </div>
</template>

<script>
import Choice from '../components/Presentation/Choice.vue'
import Score from '../components/Presentation/Score.vue'
import Fill from '../components/Presentation/Fill.vue'
import { async } from 'q'

export default {
  props: ['state'],
  components: {
    Choice, Score, Fill
  },
  data() {
    return {
      questions: [],
      total: 1,
      isFinish: false
    }
  },
  computed: {
    answer: function() {
      return this.questions
    }
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
      return { data: this.questions.map((v, index) => {
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
      }
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
      await this.$service.questionnaire.addAnswer.call(this, this.$route.query.id, this.getAnswer())
    },
    back: function() {
      this.$router.go(-1)
    },
    statistics: function(data) {
      let users = data.data
      users.forEach((user) => {
        let questions = user.data
        questions.forEach((question, index) => {
          let type = this.questions[index].type
          switch (type) {
            case 'choose':
              question.choose_value.forEach((v) => {
                if (this.questions[index].choose_problem.options[v].count === undefined) {
                  this.questions[index].choose_problem.options[v].count = 0
                }
                this.questions[index].choose_problem.options[v].count++
              })
              break
            case 'fill':
              if (this.questions[index].fill_problem.options === undefined) {
                this.questions[index].fill_problem.options = {}
              }
              let key = question.string_value
              if (this.questions[index].fill_problem.options[key] === undefined) {
                this.questions[index].fill_problem.options[key] = 0
              }
              this.questions[index].fill_problem.options[key]++
              break
            case 'score':
              if (this.questions[index].score_problem.options === undefined) {
                let maxScore = this.questions[index].score_problem.score
                this.questions[index].score_problem.options = []
                for (let i = 0; i <= maxScore; i++) {
                  this.questions[index].score_problem.options.push({ count: 0 })
                }
              }
              let score = question.score_value
              this.questions[index].score_problem.options[score].count++
              break
          }
        })
      })
    }
  },
  mounted: async function() {
    // 获取题信息
    let questions = await this.$service.questionnaire.getQuestions.call(this, this.$route.query.id)
    this.questions = JSON.parse(JSON.stringify(questions.data.problems))
    // 获取问卷信息
    let info = await this.$service.questionnaire.getInfo.call(this, this.$route.query.id)
    this.info = JSON.parse(JSON.stringify(info.data))
    this.total = this.info.answer
    // 获取并统计数据
    let answer = await this.$service.questionnaire.getAnswers.call(this, this.$route.query.id, { page: 1, size: this.info.answer })
    this.statistics(answer.data)
    this.isFinish = true
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
