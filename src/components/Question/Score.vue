<template>
    <div class="score" @mouseenter="isEnter = true" @mouseleave="isEnter = false">
        <div class="top">
            <div class="question-info">
                <div class="index">{{this.index}}</div>
                <div class="title" v-show="!isModify">{{question.content}}</div>
                <a-input class="title" v-show="isModify" v-model="question.content"/>
                <div class="note" v-show="!isModify">{{question.note}}</div>
                <a-input class="note" v-show="isModify" v-model="question.note"/>
            </div>
            <div class="button-area" v-show="!isModify && isEnter">
                <a-popover>
                    <template slot="content">
                        <h4>编辑</h4>
                    </template>
                    <a-button class="button" size="small" @click="isModify = true">
                        <a-icon type="edit"/>
                    </a-button>
                </a-popover>
                <a-popover>
                    <template slot="content">
                        <h4>复制</h4>
                    </template>
                    <a-button class="button" size="small" @click="sendMsgToParent('copy')">
                        <a-icon type="copy"/>
                    </a-button>
                </a-popover>
                <a-popover>
                    <template slot="content">
                        <h4>删除</h4>
                    </template>
                    <a-button class="button" size="small" @click="sendMsgToParent('delete')">
                        <a-icon type="minus"/>
                    </a-button>
                </a-popover>
                <a-popover>
                    <template slot="content">
                        <h4>上移</h4>
                    </template>
                    <a-button class="button" size="small" @click="sendMsgToParent('up')">
                        <a-icon type="arrow-up"/>
                    </a-button>
                </a-popover>
                <a-popover>
                    <template slot="content">
                        <h4>下移</h4>
                    </template>
                    <a-button class="button" size="small" @click="sendMsgToParent('down')">
                        <a-icon type="arrow-down"/>
                    </a-button>
                </a-popover>
                <a-popover>
                    <template slot="content">
                        <h4>最前</h4>
                    </template>
                    <a-button class="button" size="small" @click="sendMsgToParent('first')">
                        <a-icon type="caret-up"/>
                    </a-button>
                </a-popover>
                <a-popover>
                    <template slot="content">
                        <h4>最后</h4>
                    </template>
                    <a-button class="button" size="small" @click="sendMsgToParent('last')">
                        <a-icon type="caret-down"/>
                    </a-button>
                </a-popover>
            </div>
            <a-button
                v-show="isModify"
                type="primary"
                class="edit-finish-button"
                size="small"
                @mousedown="modifyFinish"
            >完成编辑</a-button>
        </div>
        <div class="content">
            <div class="rate-area" v-show="!isModify">
                <div class="text">{{question.score_problem.min_text}}</div>
                <a-rate class="rate" :count="question.anwser"/>
                <div class="text">{{question.score_problem.max_text}}</div>
            </div>
            <div class="modify-input" v-show="isModify">
                <a-input class="input" v-model="question.score_problem.min_text"/>
                <a-input class="input" v-model="question.score_problem.max_text"/>
            </div>
            <a-select
                v-show="isModify"
                class="select"
                :value="question.score_problem.score"
                @change="(v)=>{question.score_problem.score = v}"
            >
                <a-select-option v-for="i in score_array" :key="i" :value="i">{{i}}</a-select-option>
            </a-select>
        </div>
    </div>
</template>

<script>
export default {
  props: ['question', 'index'],
  data() {
    return {
      isModify: false,
      isEnter: false
    }
  },
  computed: {
    score_array: function() {
      let rateRange = 6
      return [...new Array(rateRange).keys()].map(i => {
        return i + 5
      })
    }
  },
  methods: {
    sendMsgToParent: function(msg) {
      this.$emit('handleMsgFromChild', { msg: msg, index: this.index })
    },
    modifyFinish: function() {
      this.$emit('handleMsgFromChild', { msg: 'finish', index: this.index })
      this.isModify = false
      this.isEnter = false
    }
  }
}
</script>

<style lang="less" scoped>
.score {
    padding: 20px 20px 20px 50px;
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

    .top {
        display: flex;
        justify-content: space-between;
        position: relative;

        .question-info {
            text-align: left;

            .index {
                position: absolute;
                left: -30px;
            }

            .title {
                font-size: 16px;
            }

            .note {
                font-size: 13px;
                margin-top: 10px;
            }
        }

        .button-area {
            display: flex;

            .button {
                margin-right: 10px;
            }
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        position: relative;
        font-size: 16px;
        text-align: left;

        .rate-area {
            display: flex;
            align-items: flex-end;
            margin-top: 30px;

            .rate {
                margin: 0px 15px;
            }

            .text {
                font-size: 13px;
            }
        }

        .modify-input {
            width: 60%;
            margin-top: 10px;

            .input {
                margin-bottom: 5px;
            }
        }

        .select {
            margin-top: 10px;
            width: 50px;
        }
    }
}
</style>
