<template>
  <div class="player-list">
		<a-modal
			v-model="modelVisible"
      :title="modalTitle"
      @ok="handleOk"
			@cancel="handleCancel"
			okText="确认"
      cancelText="取消"
		>
		<a-textarea placeholder="添加备注" :autosize="{ minRows: 2, maxRows: 6 }" v-model="note"/>
		</a-modal>
		<div v-for="(item) in Players" class="list-item" :key="item.player.id" >
			<img class="head-img" :src="item.player.avatar" />
			<span class="nickname">{{item.player.nickname}}</span>
			<div class="btn-pair" v-if="isPublisher == true && playerStatus == 'running'">
				<a-button class="btn" icon="smile" @click="finishTask(item.player.id, item.player.nickname)">完成</a-button>
				<a-button class="btn" icon="frown" @click="failTask(item.player.id, item.player.nickname)">失败</a-button>
			</div>
			<div class="btn-pair" v-else-if="isPublisher == true && playerStatus == 'wait'">
				<a-button class="btn" icon="smile" @click="acceptPlayer(item.player.id, item.player.nickname)">同意</a-button>
				<a-button class="btn" icon="frown" @click="refusePlayer(item.player.id, item.player.nickname)">拒绝</a-button>
			</div>
			<a-tag class="tag" v-if="isPublisher == false && playerStatus == 'running'" color="orange">参与中</a-tag>
			<a-tag class="tag" v-if="playerStatus == 'finish'" color="green">已完成</a-tag>
			<a-tag class="tag" v-if="playerStatus == 'failure'" color="red">已失败</a-tag>
		</div>
  </div>
</template>

<script>
export default {
	// 参与者列表, 是否为发布者(bool), 参与者状态(running | wait) 
  props: ['Players', 'isPublisher', 'playerStatus', 'taskID'],
  data() {
    return {
			modalTitle: '',
			modelVisible: false,
			changeStatus: '',
			note: '',
			currentUserID: ''
    }
  },
  computed: {
	},
	methods: {
		async acceptPlayer(user_id, nickname) {
			this.currentUserID = user_id
			this.modalTitle = '确认同意' + nickname + '加入任务？'
			this.changeStatus = 'running'
			this.modelVisible = true
		},
		async refusePlayer(user_id, nickname) {
			this.currentUserID = user_id
			this.modalTitle = '确认拒绝' + nickname + '加入任务？'
			this.changeStatus = 'refuse'
			this.modelVisible = true
		},
		async failTask(user_id, nickname) {
			this.currentUserID = user_id
			this.modalTitle = '确认' + nickname + '任务失败？'
			this.changeStatus = 'failure'
			this.modelVisible = true
		},
		async finishTask(user_id, nickname) {
			this.currentUserID = user_id
			this.modalTitle = '确认' + nickname + '任务完成？'
			this.changeStatus = 'finish'
			this.modelVisible = true
		},
		async handleOk(e){
			let p = {
				status: this.changeStatus,
				note: this.note
			}
			var res = await this.$service.task.ChangePlayerStatusOfTask.call(this, this.taskID, this.currentUserID, p)
			//console.log(res)
			this.note = ""
			this.$emit("onChange")
			this.modelVisible = false
		},
		handleCancel(e){
			this.note = ""
		}
	}
}
</script>

<style lang="less" scoped>
.player-list {
	width: 600px;
	margin-left: auto;
	margin-right: auto;

	.list-item {
		width: 100%;
		height: 45px;
		box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		margin-bottom: 5px;
		position: relative;

		.head-img {
      width: 35px;
      height: 35px;
      display: block;
			border-radius: 100%;
			float: left;
			margin-top: 5px;
			margin-left: 20px;
      //transform: translate(10px, 15px);
    }

		.nickname {
			font-size: 16px;
			margin-left: 30px;
			position: relative;
			top: 10px;
		}

		.tag {
			height: 25px;
			font-size: 12px;
			float: right;
			margin-top: 10px;
			margin-right: 20px;
		}

		.btn-pair {
			float: right;
			margin-top: 10px;
			margin-right: 20px;

			.btn {
				height: 25px;
				margin-left: 10px;
			}
		}
	}
}
</style>