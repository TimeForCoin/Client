<template>
    <div class="fill" @mouseenter="isEnter = true" @mouseleave="isEnter = false">
        <div class="top">
            <div class="question-info">
                <div class="index">{{this.index}}</div>
                <div class="title" v-show="!isModify">{{question.content}}</div>
                <a-input class="title" v-show="isModify" :value="question.content"/>
                <div class="note" v-show="!isModify">{{question.note}}</div>
                <a-input class="note" v-show="isModify" :value="question.note"/>
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
            <a-input v-show="!isModify && !question.fill_problem.multi_line"></a-input>
            <a-textarea v-show="!isModify && question.fill_problem.multi_line"></a-textarea>
            <span class="tips" v-show="isModify">是否多行输入</span>
            <a-select v-show="isModify" defaultValue="false" @change="onChange">
                <a-select-option value="true">是</a-select-option>
                <a-select-option value="false">否</a-select-option>
            </a-select>
            <span class="tips" v-show="isModify">最多可输入字数(最大为2048)</span>
            <a-input v-show="isModify" v-model="question.fill_problem.max_word"></a-input>
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
  computed: {},
  methods: {
    onChange: function(value) {
      this.question.fill_problem.multi_line = value
    },
    sendMsgToParent: function(msg) {
      this.$emit('handleMsgFromChild', { msg: msg, index: this.index })
    }
  }
}
</script>

<style lang="less" scoped>
.fill {
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
        width: 60%;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        position: relative;
        font-size: 16px;
        text-align: left;

        .tips {
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 13px;
        }
    }
}
</style>
