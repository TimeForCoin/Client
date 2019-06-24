<template>
	<div class="mission-detail">
		<div class="main">
			<div class="background">
				<div class="black">
					<p class="mission-title"><img class="top-logo" src="@/assets/logo.png">{{mission.title}}</p>
				</div>
				<div class="triangle-top"></div>
				<div class="triangle-bottom"></div>
			</div>
			<div class="status-div">
				<p class="title"><span>任务状态</span></p>
				<a-tag class="status-tag" :color="color">{{missionStatus}}</a-tag>
			</div>
			<div class="content-div">
				<p class="title"><span>任务详情</span></p>
				<p class="content">{{mission.content}}</p>
			</div>
			<div class="date-div">
				<p class="title">任务时间</p>
				<p class="content">{{startDate}} - {{endDate}}</p>
			</div>
			<div class="block">
				<p class="title">任务标签</p>
				<div class="content">
					<template v-for="tag in mission.tags">
						<a-tag :key="tag">{{tag}}</a-tag>
					</template>
				</div>
			</div>
			<div class="block">
				<p class="title">任务地点</p>
				<div class="content">
					<template v-for="tag in mission.location" >
						<a-tag :key="tag">{{tag}}</a-tag>
					</template>
				</div>
			</div>
			<div class="image-div">
				<p class="title"><span>相关图片</span></p>
				<div class="image" v-for="img in mission.images" :key="img.id">
					<img :src="img.url"/>
				</div>
			</div>
			<div class="player-div">
				<p class="title"><span>当前参与者</span></p>
				<PlayerList :Players="runningPlayer"/>
			</div>
			<div class="waiting-div" v-if="isPublisher == true">
				<p class="title"><span>待审核参与者</span></p>
			</div>
			<div class="btn-group">
				<a-button type="primary" icon="like">点赞</a-button>
				<a-button type="primary" icon="star">收藏</a-button>
				<a-button v-if="isPublisher == false && isPlayer == false" type="primary" @click="joinTask">{{this.joinBtnText}}</a-button>
				<a-button v-if="isPublisher == false && isPlayer == true" type="primary" @click="giveUpTask">放弃任务</a-button>
				<a-button v-else type="primary" @click="deleteTask">中止任务</a-button>
			</div>
		</div>
	</div>
</template>

<script>
	import PlayerList from '@/components/Mission/MissionDetail/PlayerList.vue'
	const moment = require('moment')

  export default {
		components: {
			PlayerList
		},
		data() {
			return {
				mission: {},
				imgList: [],
				allPlayer: [],
				isPublisher: false,
				isPlayer: false,
			}
		},
		computed: {
			userID: function() {
				return this.$store.getters.getID
			},
			color: function() {
				switch(this.mission.status) {
					case "draft":
						return "blue"
					case "wait":
						return "orange"
					case "close":
						return "red"
					case "finish":
						return "green"
				}
				return "yellow"
			},
			missionStatus: function() {
				switch(this.mission.status) {
					case "draft":
						return "草稿"
					case "wait":
						if(this.mission.start_date > moment().startOf('day').unix()) {
							return "等待中"
						}
						return "进行中"
					case "close":
						return "已关闭"
					case "finish":
						return "已完成"
				}
				return "未知"
			},
			joinBtnText: function() {
				if(this.mission.auto_accept == true) {
					return "立即加入"
				}
				return "申请加入"
			},
			startDate: function() {
				var newTime = new Date(this.mission.start_date * 1000)
				return moment(newTime).format("YYYY-MM-DD")
			},
			endDate: function() {
				var newTime = new Date(this.mission.end_date * 1000)
				return moment(newTime).format("YYYY-MM-DD")
			},
			// 当前带审核的参与者
			waitPlayer: function() {
				return this.allPlayer.filter((item) => {
					return item.status == 'wait'
				})
			},
			// 当前已加入的参与者
			runningPlayer: function() {
				return this.allPlayer.filter((item) => {
					return item.status == 'running'
				})
			}
		},
		// 加载任务消息和参与者信息
		created: async function() {
			var id = this.$route.query.id
			//console.log(id)
			var res = await this.$service.task.GetTask.call(this, id)
			//console.log(res)
			this.mission = res
			if (this.userID == this.mission.publisher.id) {
				this.isPublisher = true
			}
			var res2 = await this.$service.task.GetPlayerList.call(this, this.mission.id)
			this.allPlayer = res2.data
			console.log(this.allPlayer)
			// 判断是否参与
			this.allPlayer.forEach(element => {
				if(element.player.id == this.userID) this.isPlayer = true
			});
		},
		methods: {
			async joinTask() {
				let p = {}
				if (this.mission.auto_accept == false) p.note = "我要参加"
				var res = await this.$service.task.JoinTask.call(this, this.mission.id, p)
				console.log(res)
				if(res.result == 'wait') {
					this.$message.success('申请成功，等待审核')
				}
				else {
					this.$message.success('成功加入')
				}
			},
			deleteTask() {

			},
			giveUpTask() {

			}
		}
	}
</script>

<style lang="less" scoped>
@width: 60vw;

.mission-detail {
	margin-top: 70px;
	
	.main {
		background: white;
		width: 800px;
		height: auto;
		margin-left: auto;
		margin-right: auto;
		position: relative;

		.background {
			width: 100%;
			height: 30vh;
			min-height: 250px;
			background-image: url("../assets/HomePage/page1-background.jpg");
			background-size: cover;
			background-position: center;
			position: relative;
			
			.black {
				width: 100%;
				height: 100%;
				background-color: black;
				background-color:rgba(0,0,0,0.35);
				display: flex;
				justify-content: center;
				align-items: center;
				
				.mission-title {
					color: white;
					font-size: 40px;
					font-weight: bold;
					margin-top: 30px;

					.top-logo {
						width: 65px;
						height: 65px;
						margin-right: 10px;
					}
				}
			}

			.triangle-top {
				width: 0px;
				height: 0px;
				border-width: 40px 160px 0 640px;
				border-style: solid;
				border-color: white transparent transparent transparent; 
				position: absolute;
				top: 0px;
			}

			.triangle-bottom {
				width: 0px;
				height: 0px;
				border-width: 0 640px 45px 160px;
				border-style: solid;
				border-color: transparent transparent white transparent; 
				position: relative;
				top: -45px;
			}
		}

		.title {
			text-align: left;
			padding-left: 10px;
			border-left-style:solid;
			border-width:5px;
			border-color:#F0B11B;
			color: #7c7c7c;
			font-size: 18px;
			font-weight: bold;
			span {
				vertical-align: middle;
				margin-right: 10px;
			}
		}

		.content {
			text-align: left;
			padding: 10px;
		}

		.block {
			width: 600px;
			height: auto;
			margin-left: auto;
			margin-right: auto;
			margin-top: 15px;
			text-align: left;
		}

		.status-div {
			.block();
			text-align: left;

			.title {
				display: inline-block;
			}
			.status-tag {
				font-size: 14px;
				margin-left: 15px;
			}
		}

		.content-div {
			.block();
			transition: 0.5s;
		}

		// .content-div:hover {
		// 	transition: 0.5s;
		// 	transform: scale(1.03);
		// 	box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2);
		// }

		.date-div {
			.block();
		}

		.tag-div {
			.block();
		}

		.image-div {
			.block();

			.image {
				img {
					height: 100px;
					width: 100px;
				}
			}
		}

		.player-div {
			.block();
		}
		.waiting-div {
			.block();
		}

		.btn-group {
			width: 400px;
			margin-top: 30px;
			padding-bottom: 30px;
			margin-left: auto;
			margin-right: auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: space-around;
		}
	}
	
}


</style>