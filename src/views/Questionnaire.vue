<template>
    <div class="questionnaire">
        <a-layout class="container">
            <a-layout-sider class="sider">
              <div class="wrapper">
                <a-collapse :activeKey="activeKey">
                  <a-collapse-panel v-for="(type, index) in sider" :header="type.menu" :bordered="false" :key="String(index)">
                        <div class="button-area">
                            <a-popover v-for="(menuItem, typeIndex) in type.menuItem" :title="menuItem" placement="right" :key="menuItem.id">
                                <template slot="content">
                                </template>
                                <a-button @click="addQuestion(index, typeIndex)" size="small" type="primary" class="button" ghost>{{menuItem}}</a-button>
                            </a-popover>
                        </div>
                    </a-collapse-panel>
              </a-collapse>
              <div class="function-button-area">
                <a-button type="primary" class="button" ghost @click="preview">问卷预览</a-button>
                <a-button type="primary" class="button" @click="finish">编辑完成</a-button>
              </div>
              </div>
            </a-layout-sider>
            <a-layout-content class="content">
              <div class="questionnaire-info">
                <a-input class="title" v-model="questionnaire.title" />
                <a-textarea class="description" :autosize="{ minRows: 3, maxRows: 3 }" v-model="questionnaire.description" />
              </div>
              <div class="question-wrapper" v-for="(question, qindex) in questionnaire.questions" :key="question.id">
                <Choice @handleMsgFromChild="changeQuestionaire" :question="questionnaire.questions[qindex]" :index="qindex" v-if="question.type == 'choose'"/>
                <Fill @handleMsgFromChild="changeQuestionaire" :question="questionnaire.questions[qindex]" :index="qindex" v-else-if="question.type == 'fill'"/>
                <Score @handleMsgFromChild="changeQuestionaire" :question="questionnaire.questions[qindex]" :index="qindex" v-else-if="question.type == 'score'"/>
              </div>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>
import Choice from '../components/Question/Choice.vue'
import Score from '../components/Question/Score.vue'
import Fill from '../components/Question/Fill.vue'

export default {
  components: {
    Choice, Score, Fill
  },
  data() {
    return {
      questionType: {
        SINGLE_CHOICE: 0,
        MULTI_CHOICE: 1,
        SINGLE_FILL: 2,
        MULTI_FILL: 3,
        SCORE: 4,
        SORT: 5
      },
      sider: [
        {
          menu: '选择题',
          menuItem: ['单选', '多选']
        },
        {
          menu: '填空题',
          menuItem: ['单项', '多项']
        },
        {
          menu: '评分题',
          menuItem: ['量表']
        },
        {
          menu: '排序题',
          menuItem: ['排序']
        }
      ],
      questionnaire: {
        title: '',
        description: '',
        anonymous: true,
        questions: []
      }
    }
  },
  computed: {
    activeKey: function() {
      return [...new Array(Object.keys(this.sider).length).keys()].map((value) => {
        return String(value)
      })
    }
  },
  methods: {
    // 添加问题
    addQuestion: function(mindex, offset) {
      let clickType = 0
      for (let i = 0; i < mindex; i++) {
        clickType += this.sider[i].menuItem.length
      }
      clickType += offset
      let question = {
        index: this.questionnaire.questions.length + 1,
        content: '问题内容',
        note: '问题备注'
      }
      switch (clickType) {
        case this.questionType.SINGLE_CHOICE:
        case this.questionType.MULTI_CHOICE:
          question.type = 'choose'
          question.choose_problem = JSON.parse(JSON.stringify({
            options: [{
              index: 1,
              content: '选项',
              image: ''
            },
            {
              index: 2,
              content: '选项',
              image: ''
            }],
            max_choose: clickType === this.questionType.MULTI_CHOICE ? 2 : 1
          }))
          break
        case this.questionType.SINGLE_FILL:
        case this.questionType.MULTI_FILL:
          question.type = 'fill'
          question.fill_problem = JSON.parse(JSON.stringify({
            type: 'all',
            multi_line: false,
            max_word: 1000
          }))
          break
        case this.questionType.SCORE:
          question.type = 'score'
          question.score_problem = JSON.parse(JSON.stringify({
            min_text: '不满意',
            max_text: '很满意',
            score: 5
          }))
          break
      }
      this.questionnaire.questions.push(question)
    },
    // 问题操作：复制、删除、上移、下移、最前和最后
    changeQuestionaire: function(params) {
      let index = params.index
      let msg = params.msg
      let temp
      switch (msg) {
        case 'copy':
          let newQuestion = JSON.parse(JSON.stringify(this.questionnaire.questions[index]))
          this.questionnaire.questions.splice(index, 0, newQuestion)
          this.autoSave()
          break
        case 'delete':
          this.questionnaire.questions.splice(index, 1)
          break
        case 'up':
          if (index !== 0) {
            temp = this.questionnaire.questions[index]
            this.questionnaire.questions.splice(index, 1)
            this.questionnaire.questions.splice(index - 1, 0, temp)
            this.autoSave()
          }
          break
        case 'down':
          if (index !== this.questionnaire.questions.length - 1) {
            temp = this.questionnaire.questions[index]
            this.questionnaire.questions.splice(index, 1)
            this.questionnaire.questions.splice(index + 1, 0, temp)
            this.autoSave()
          }
          break
        case 'first':
          if (index !== 0) {
            temp = this.questionnaire.questions[index]
            this.questionnaire.questions.splice(index, 1)
            this.questionnaire.questions.splice(0, 0, temp)
            this.autoSave()
          }
          break
        case 'last':
          if (index !== this.questionnaire.questions.length - 1) {
            temp = this.questionnaire.questions[index]
            this.questionnaire.questions.splice(index, 1)
            this.questionnaire.questions.push(temp)
          }
          break
      }
    },
    // 进入问卷预览
    preview: function() {
      console.log(this.$route.query.id)
    },
    // 完成问卷编辑
    finish: function() {

    },
    // 自动保存
    autoSave: async function() {
      // 保存基本信息
      let res = await this.$service.questionnaire.modifyInfo.call(this, this.$route.query.id, {
        title: this.questionnaire.title,
        description: this.questionnaire.description,
        anonymous: this.questionnaire.anonymous
      })
      // 保存问题
      res = await this.$service.questionnaire.modifyQuestions.call(this, this.$route.query.id, {
        problems: this.questionnaire.questions
      })
    }
  },
  mounted: async function() {
    let info = await this.$service.questionnaire.getInfo.call(this, this.$route.query.id)
    this.questionnaire.title = info.data.title
    this.questionnaire.description = info.data.description
    this.questionnaire.anonymous = true
    // console.log(this.questionnaire)
    let questions = await this.$service.questionnaire.getQuestions.call(this, this.$route.query.id)
    this.questionnaire.questions = JSON.parse(JSON.stringify(questions.data.problems))
  }
}
</script>

<style lang="less" scoped>
.questionnaire {
    margin-top: 70px;
    min-width: 1200px;
    font-family: 'PingFang SC', tahoma, arial, 'helvetica neue', 'hiragino sans gb', 'microsoft yahei ui', 'microsoft yahei', simsun, sans-serif;

    .container {
        height: calc(100vh - 80px);
        margin: 10px 20vw 0px 20vw;

        .sider {
            height: calc(95vh - 70px);
            background-color: white;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);

            .wrapper {
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .button-area {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;

                  .button {
                      margin-bottom: 10px;
                  }
              }

              .function-button-area {
                margin: 0px 10px 20px;
                display: flex;
                flex-direction: column;

                .button {
                  margin-bottom: 10px;
                }
              }
            }
        }

        .content {
            height: calc(95vh - 70px);
            margin-left: 20px;
            padding: 0px 20px 0px 0px;
            display: flex;

            flex-direction: column;

            .questionnaire-info{
              background-color: white;
              box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

              .title {
                margin: 50px 50px 0px;
                font-size: 16px;
                width: calc(100% - 100px);
                text-align: center;
                font-weight: bold;
              }

              .description {
                margin: 10px 50px 20px;
                width: calc(100% - 100px);
                font-size: 13px;
              }
            }

            .question-wrapper {
              margin-top: 20px;
              width: 100%;
            }
        }
    }
}
</style>
