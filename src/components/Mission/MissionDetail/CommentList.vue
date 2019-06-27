<template>
  <div class="comment-list">
    <a-comment>
      <a-avatar slot="avatar" :src="$store.getters.getAvatar" :alt="$store.getters.getNickname"/>
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="3" @change="handleChange" :value="value"></a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button
            htmlType="submit"
            :loading="submitting"
            @click="handleSubmit"
            type="primary"
          >添加评论</a-button>
        </a-form-item>
      </div>
    </a-comment>
    <a-list
      v-if="comments.length"
      :dataSource="comments"
      :header="`${comments.length} ${'条评论'}`"
      itemLayout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment class="comment-item">
          <template slot="actions">
            <span>
              <a-tooltip title="Like">
                <a-icon
                  type="like"
                  :theme="item.liked === true ? 'filled' : 'outlined'"
                  @click="addLike(item.id, item.liked)"
                />
              </a-tooltip>
              <span style="padding-left: '8px';cursor: 'auto'">{{item.like_count}}</span>
            </span>
          </template>
          <a slot="author">{{item.user.nickname}}</a>
          <a-avatar :src="item.user.avatar" :alt="item.user.nickname" slot="avatar"/>
          <p slot="content">{{item.content}}</p>
        </a-comment>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const moment = require('moment')
export default {
  props: ['taskID'],
  data() {
    return {
      comments: [],
      submitting: false,
      value: ''
    }
  },
  computed: {},
  methods: {
    async handleSubmit() {
      let p = {
        type: 'task',
        content: this.value
			}
			try {
				await this.$service.comment.AddComment.call(this, this.taskID, p)
				this.value = ''
			} catch (err) {
				this.$utils.handler.check.call(this, err)
		  }
      this.refreshComments()
    },
    handleChange(e) {
      this.value = e.target.value
    },
    async refreshComments() {
			try {
				let res = await this.$service.comment.GetComments.call(this, this.taskID)
				console.log(res)
				this.comments = res.data
				for (let i = 0; i < this.comments.length; i++) {
					let newTime = new Date(this.comments[i].time * 1000)
					this.comments[i].time = moment(newTime)
						.startOf('hour')
						.fromNow()
				}
			} catch (err) {
				this.$utils.handler.check.call(this, err)
		  }
    },
    async addLike(id, liked) {
			try {
				if (liked) {
					await this.$service.comment.DeleteLikeComment.call(this, id)
				} else {
					await this.$service.comment.AddLikeComment.call(this, id)
				}
			} catch (err) {
				this.$utils.handler.check.call(this, err)
		  }
      this.refreshComments()
    }
  },
  mounted: async function() {
    this.refreshComments()
  }
}
</script>

<style lang="less" scoped>
.comment-list {
  width: 600px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;

  .comment-item {
    //text-align: left;
    height: auto;
  }

  .ant-comment-actions {
    margin-bottom: 0px;
  }
}
</style>
