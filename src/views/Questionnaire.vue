<template>
    <div class="questionnaire">
        <a-layout class="container">
            <a-layout-sider class="sider">
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
            </a-layout-sider>
            <a-layout-content class="content">
              <div class="questionnaire-info">
                <a-input class="title" v-model="questionnaire.title" />
                <a-textarea class="description" :autosize="{ minRows: 3, maxRows: 3 }" v-model="questionnaire.description" />
              </div>
              <div class="question-wrapper" v-for="(question, qindex) in questionnaire.questions" :key="question.id">
                <Choice v-bind:question="questionnaire.questions[qindex]" v-if="question.type == 'choose'"/>
                <Fill v-bind:question="questionnaire.questions[qindex]" v-else-if="question.type == 'fill'"/>
                <Score v-bind:question="questionnaire.questions[qindex]" v-else-if="question.type == 'score'"/>
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
        SCORE: 4
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
        }
      ],
      questionnaire: {
        title: '问卷标题',
        description: '为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！',
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
    }
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

            .button-area {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;

                .button {
                    margin-bottom: 10px;
                }
            }
        }

        .content {
            height: calc(95vh - 70px);
            margin-left: 20px;
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
