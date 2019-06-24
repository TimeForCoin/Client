<template>
  <div class="player-list">
		<div v-for="(item) in Players" class="list-item" :key="item.id" >
			<img class="head-img" :src="item.player.avatar" />
			<span class="nickname">{{item.player.nickname}}</span>
			<div class="btn-pair">
				<a-button class="btn" icon="smile">完成</a-button>
				<a-button class="btn" icon="frown">失败</a-button>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	// 参与者列表, 是否为发布者(bool), 参与者状态(running | wait) 
  props: ['Players', 'isPublisher', 'playerStatus'],
  data() {
    return {

    }
  },
  computed: {
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