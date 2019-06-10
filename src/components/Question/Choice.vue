<template>
    <div
        class="choice"
        @mouseenter="isEnter = true"
        @mouseleave="isEnter = false"
        @click="isModify = true"
    >
        <h3 class="title">{{index}}. {{title}}</h3>
        <a-radio-group v-if="type == 0" class="group">
            <a-radio
                class="radio"
                v-for="(option, qindex) in options"
                :value="qindex"
                :key="option.id"
            >{{option}}</a-radio>
        </a-radio-group>
        <a-checkbox-group v-else-if="type == 1" class="group" :options="options"/>
        <a-select defaultValue="请选择" v-else-if="type == 2" class="down-group" >
          <a-select-option v-for="option in options" :key="option.id" :value="option">{{option}}</a-select-option>
        </a-select>
        <div class="button-area" v-show="!isModify && isEnter">
            <a-button class="button" size="small" @click="isModify = true">
                <a-icon type="edit"/>编辑
            </a-button>
            <a-button class="button" size="small">
                <a-icon type="copy"/>复制
            </a-button>
            <a-button class="button" size="small">
                <a-icon type="minus"/>删除
            </a-button>
            <a-button class="button" size="small">
                <a-icon type="arrow-up"/>上移
            </a-button>
            <a-button class="button" size="small">
                <a-icon type="arrow-down"/>下移
            </a-button>
            <a-button class="button" size="small">
                <a-icon type="caret-up"/>最前
            </a-button>
            <a-button class="button" size="small">
                <a-icon type="caret-down"/>最后
            </a-button>
        </div>
        <div class="modify-erea" v-show="isModify">
            <div class="triangle"></div>
            <div class="tips">标题</div>
            <div class="modify-title">
                <a-input v-model="title"/>
            </div>
            <div class="tips">选项</div>
            <div class="modify-input" v-for="(option, index) in options" :key="index">
                <a-input class="input" v-model="options[index]"/>
                <div class="move-area">
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
            <div class="tips">增加选项</div>
            <a-button class="add-button" size="small" shape="circle" @click="optionAdd()">
                <a-icon type="plus"/>
            </a-button>
            <a-button
                type="primary"
                class="edit-finish-button"
                size="small"
                @mousedown="isModify = false; isEnter = false"
            >完成编辑</a-button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isModify: false,
      isEnter: false,
      index: 1,
      title: '标题',
      type: 2,
      options: ['A', 'B', 'C']
    }
  },
  methods: {
    optionUp: function(index) {
      if (index !== 0) {
        let temp = this.options[index]
        this.options[index] = this.options[index - 1]
        this.options[index - 1] = temp
        this.$forceUpdate()
      }
    },
    optionDown: function(index) {
      if (index !== this.options.length - 1) {
        let temp = this.options[index]
        this.options[index] = this.options[index + 1]
        this.options[index + 1] = temp
        this.$forceUpdate()
      }
    },
    optionAdd: function() {
      this.options.push('新选项')
    },
    optionRemove: function(index) {
      this.options.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.choice {
    text-align: left;
    margin-bottom: 10 px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    .title {
        font-weight: bold;
        padding: 10px 50px;
    }

    .group {
        display: flex;
        flex-direction: column;
        padding: 10px 50px;
        margin-left: 20px;

        .radio {
            margin-bottom: 5px;
        }
    }

    .down-group {
      margin: 10px 70px 10px;
      width: 100px;
    }

    .button-area {
        display: flex;
        padding: 10px 50px;

        .button {
            margin-right: 10px;
        }
    }

    .modify-erea {
        margin: 15px 5px 0px;
        background-color: rgb(245, 245, 245);
        padding: 5px;
        position: relative;
        display: flex;
        flex-direction: column;

        .triangle {
            width: 0px;
            height: 0px;
            border-bottom: 10px solid rgb(240, 177, 17);
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            position: absolute;
            left: 50px;
            top: -15px;
        }

        .tips {
            margin: 5px 50px;
            padding: 5px;
            background-color: rgb(230, 230, 230);
        }

        .modify-title {
            width: 100px;
            margin-left: 50px;
            margin-bottom: 5px;
        }

        .modify-input {
            margin-left: 50px;
            margin-bottom: 5px;
            display: flex;

            .input {
                width: 100px;
                margin-right: 100px;
            }

            .move-area {
                display: flex;

                .move-button {
                    margin-right: 10px;
                }
            }
        }

        .add-button {
            margin-left: 50px;
        }

        .edit-finish-button {
            width: 100px;
            margin: 10px auto;
        }
    }
}
</style>
