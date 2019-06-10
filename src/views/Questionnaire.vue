<template>
    <div class="questionnaire">
        <a-layout class="container">
            <a-layout-sider class="sider">
              <a-collapse :activeKey="activeKey">
                  <a-collapse-panel v-for="(type, _, index) in sider" :header="type.title" :bordered="false" :key="String(index)">
                        <div class="button-area">
                            <a-popover v-for="(detail, typeIndex) in type.detail" :title="detail" placement="right" :key="detail.id">
                                <template slot="content">
                                </template>
                                <a-button @click="addQuestion(typeIndex)" size="small" type="primary" class="button" ghost>{{detail}}</a-button>
                            </a-popover>
                        </div>
                    </a-collapse-panel>
              </a-collapse>
            </a-layout-sider>
            <a-layout-content class="content" id="questionnaire-content">
              <div class="question-wrapper" v-for="question in questionnaire" :key="question.id">
                <Choice  v-if="question.type == questionType.SINGLE_CHOICE"/>
                <Choice v-else-if="question.type == questionType.MULTI_CHOICE"/>
                <Choice v-else-if="question.type == questionType.DOWN_CHOICE"/>
                <Choice v-else-if="question.type == questionType.SINGLE_FILL"/>
                <Choice v-else-if="question.type == questionType.MULTI_FILL"/>
                <Choice v-else-if="question.type == questionType.TABLE_FILL"/>
                <Choice v-else-if="question.type == questionType.GAUGE_SCORE"/>
                <Choice v-else-if="question.type == questionType.NPS_SCORE"/>
              </div>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>
import Choice from '../components/Question/Choice.vue'

export default {
  components: {
    Choice
  },
  data() {
    return {
      questionType: {
        SINGLE_CHOICE: 0,
        MULTI_CHOICE: 1,
        DOWN_CHOICE: 2,
        SINGLE_FILL: 3,
        MULTI_FILL: 4,
        TABLE_FILL: 5,
        GAUGE_SCORE: 6,
        NPS_SCORE: 7
      },
      sider: {
        choice: {
          title: '选择题',
          detail: ['单选', '多选', '下拉框']
        },
        multiChoice: {
          title: '填空题',
          detail: ['单项', '多项', '表格']
        },
        sorce: {
          title: '评分题',
          detail: ['量表', 'NPS']
        }
      },
      questionnaire: []
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
    addQuestion: function(clickType) {
      this.questionnaire.push({
        type: clickType,
        data: []
      })
    }
  }
}
</script>

<style lang="less" scoped>
.questionnaire {
    margin-top: 70px;
    min-width: 1200px;

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
            background-color: white;
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
            margin-left: 20px;

            .question-wrapper {
              width: 100%;
            }
        }
    }
}
</style>
