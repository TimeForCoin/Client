<template>
    <div class="missionblock">
        <a-divider class="divider">闲得一币</a-divider>
        <div class="function-bar">
            <a-select class="mission-select" defaultValue="time" @change="handleChange">
                <a-select-option value="time">时间</a-select-option>
                <a-select-option value="hit">热度</a-select-option>
            </a-select>
            <a-select class="mission-select" defaultValue="questionnaire" @change="handleChange">
                <a-select-option value="questionnaire">问卷</a-select-option>
                <a-select-option value="errand">跑腿</a-select-option>
                <a-select-option value="information">信息</a-select-option>
            </a-select>
            <a-select class="mission-select" defaultValue="icon" @change="handleChange">
                <a-select-option value="icon">闲币报酬</a-select-option>
                <a-select-option value="money">现金报酬</a-select-option>
                <a-select-option value="physical">实物报酬</a-select-option>
            </a-select>
            <a-button class="mission-sort" type="primary" ghost>开始排序</a-button>
        </div>
        <a-list
            class="mission-list"
            :grid="{ column:3, gutter:16 }"
            :dataSource="test"
        >
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card class="mission-list-item">
                    <img src="@/assets/logo.png">
                </a-card>
            </a-list-item>
        </a-list>
        <a-pagination :total="50" showQuickJumper />
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      test: [
        {
          title: 'Title 1'
        },
        {
          title: 'Title 2'
        },
        {
          title: 'Title 3'
        },
        {
          title: 'Title 4'
        },
        {
          title: 'Title 5'
        },
        {
          title: 'Title 6'
        },
        {
          title: 'Title 4'
        },
        {
          title: 'Title 5'
        },
        {
          title: 'Title 6'
        }
      ]
    }
  },
  methods: {
    OnSortClick: function() {

    }
  }
}
</script>>

<style lang="less" scoped>
.missionblock {
    width: 70vw;
    margin: auto;
    margin-bottom: 100px;
    display: flex;
    min-width: 750px;
    flex-direction: column;

    .divider {
        font-size: 30px;
    }

    .function-bar {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .mission-select {
            margin-left: 10px;
        }

        .mission-sort {
            margin-left: 10px;
        }
    }

    .mission-list {
        margin-top: 20px;
        margin-bottom: 20px;
    }
}
</style>
