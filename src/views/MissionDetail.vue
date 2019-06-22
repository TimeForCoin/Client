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
			<a-tag class="status-tag" :color="color">{{status}}</a-tag>
			<div class="content-div">
				<p>任务详情</p>
				<p class="content">{{mission.content}}</p>
			</div>
			<p>开始时间</p>
			<p>{{startDate}}</p>
			<p>结束时间</p>
			<p>{{endDate}}</p>
			<p>任务标签</p>
			<div>
				<template v-for="tag in mission.tags">
					<a-tag :key="tag">{{tag}}</a-tag>
				</template>
			</div>
			<p>任务地点</p>
			<div>
				<template v-for="tag in mission.location" >
					<a-tag :key="tag">{{tag}}</a-tag>
				</template>
			</div>
			<p>相关图片</p>
			<div class="image-div">
				<div class="image" v-for="img in mission.images" :key="img.id">
					<img :src="img.url"/>
				</div>
			</div>
			<p>当前参与者</p>
		</div>
	</div>
</template>

<script>
	const moment = require('moment')
  export default {
		data() {
			return {
				mission: {},
			}
		},
		computed: {
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
			status: function() {
				switch(this.mission.status) {
					case "draft":
						return "草稿"
					case "wait":
						return "进行中"
					case "close":
						return "已关闭"
					case "finish":
						return "已完成"
				}
				return "未知"
			},
			startDate: function() {
				var newTime = new Date(this.mission.start_date * 1000)
				return moment(newTime).format("YYYY-MM-DD")
			},
			endDate: function() {
				var newTime = new Date(this.mission.end_date * 1000)
				return moment(newTime).format("YYYY-MM-DD")
			},
		},
		created: async function() {
			var id = this.$route.params.id
			console.log(id)
			var res = await this.$service.task.GetTask.call(this, id)
			console.log(res)
			this.mission = res
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
		height: 100vh;
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

		.status-tag {

		}

		.content-div {
			width: 600px;
			height: auto;
			min-height: 100px;
			margin-left: auto;
			margin-right: auto;
			transition: 0.5s;

			.content {
				text-align: left;
			}
		}

		.content-div:hover {
			transition: 0.5s;
			transform: scale(1.03);
			box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2);
		}

		.image-div {
			height: auto;
			width: 600px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;

			.image {
				img {
					height: 100px;
					width: 100px;
				}
			}
		}
	}
	
}


</style>