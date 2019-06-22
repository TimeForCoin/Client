<template>
    <div class="choice" @mouseenter="isEnter = true" @mouseleave="isEnter = false">
        <div class="top">
            <div class="question-info">
                <div class="index">{{index}}</div>
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
            @mousedown="isModify = false; isEnter = false"
        >完成编辑</a-button>
        </div>
        <div class="content">
            <a-radio-group
                v-show="question.choose_problem.max_choose == 1 && !isModify"
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
                v-show="question.choose_problem.max_choose > 1 && !isModify"
                class="group"
                :options="checkboxList"
            />
            <div class="modify-input" v-show="isModify">
                <div
                    class="modify-input-item"
                    v-for="(option, index) in question.choose_problem.options"
                    :key="option.id"
                >
                    <a-input
                        class="input"
                        v-model="question.choose_problem.options[index].content"
                    />
                    <div class="move-area" v-show="isModify">
                        <a-button
                            class="move-button"
                            shape="circle"
                            size="small"
                            @click="optionUp(index)"
                        >
                            <a-icon type="arrow-up"/>
                        </a-button>
                        <a-button
                            class="move-button"
                            shape="circle"
                            size="small"
                            @click="optionDown(index)"
                        >
                            <a-icon type="arrow-down"/>
                        </a-button>
                        <a-button
                            class="move-button"
                            shape="circle"
                            size="small"
                            @click="optionRemove(index)"
                        >
                            <a-icon type="minus"/>
                        </a-button>
                    </div>
                </div>
            </div>
            <div
                v-show="isModify"
                class="add-button"
                size="small"
                shape="circle"
                @click="optionAdd()"
            >增加选项</div>
            <span class="tips" v-show="isModify && question.choose_problem.max_choose >= 2">最多可选</span>
            <a-select
                v-show="isModify && question.choose_problem.max_choose >= 2"
                class="select"
                :value="question.choose_problem.max_choose"
                @change="(v)=>{question.choose_problem.max_choose = v}"
            >
                <a-select-option v-for="i in choose_arry" :key="i" :value="i">{{i}}</a-select-option>
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
    checkboxList: function() {
      return this.question.choose_problem.options.map((value, index) => {
        return {
          label: value.content,
          value: index
        }
      })
    },
    choose_arry: function() {
      let range = this.question.choose_problem.options.length - 1
      return [...new Array(range).keys()].map(i => {
        return i + 2
      })
    }
  },
  methods: {
    optionUp: function(index) {
      if (index !== 0) {
        let temp = this.question.choose_problem.options[index].content
        this.question.choose_problem.options[index].content = this.question.choose_problem.options[index - 1].content
        this.question.choose_problem.options[index - 1].content = temp
        this.$forceUpdate()
      }
    },
    optionDown: function(index) {
      if (index !== this.question.choose_problem.options.length - 1) {
        let temp = this.question.choose_problem.options[index].content
        this.question.choose_problem.options[index].content = this.question.choose_problem.options[index + 1].content
        this.question.choose_problem.options[index + 1].content = temp
        this.$forceUpdate()
      }
    },
    optionAdd: function() {
      this.question.choose_problem.options.push({
        index: this.question.choose_problem.options.length,
        content: '新选项',
        image: ''
      })
    },
    optionRemove: function(index) {
      if ((this.question.choose_problem.max_choose === 1 && this.question.choose_problem.options.length === 2) ||
            (this.question.choose_problem.max_choose > 1 && this.question.choose_problem.options.length === this.question.choose_problem.max_choose)) {
        this.$message.error('选项过少')
        return
      }
      this.question.choose_problem.options.splice(index, 1)
    },
    sendMsgToParent: function(msg) {
      this.$emit('handleMsgFromChild', { msg: msg, index: this.index })
    }
  }
}
</script>

<style lang="less" scoped>
.choice {
    padding: 20px 20px 20px 50px;
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

    .top {
        display: flex;
        justify-content: space-between;
        position: relative;

        .question-info {
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
        width: 80%;
        display: flex;
        flex-direction: column;
        position: relative;
        font-size: 16px;
        text-align: left;

        .group {
            display: flex;
            flex-direction: column;
            margin-top: 20px;

            .group-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;

                .radio {
                    width: 100px;
                }
            }
        }

        .modify-input {

            .modify-input-item {
                display: flex;
                align-items: center;
                margin-top: 10px;

                .move-area {
                    display: flex;

                    .move-button {
                        margin-left: 10px;
                    }
                }
            }

        }

        .add-button {
            color: rgb(24, 144, 255);
            font-size: 13px;
            margin-top: 30px;
        }

        .add-button:hover {
            cursor: pointer;
        }

        .tips {
            margin-top: 10px;
            font-size: 13px;
        }

        .select {
            margin-top: 10px;
            width: 50px;
        }
    }
}
</style>
