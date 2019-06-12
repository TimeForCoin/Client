<template>
	<div class="tag-block">
		<template v-for="tag in tags">
			<a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
				<a-tag class="tag" :closable="true" :key="tag" :afterClose="() => handleClose(tag)">
					{{`${tag.slice(0, 20)}...`}}
					</a-tag>
			</a-tooltip>
			<a-tag v-else class="tag" :closable="true" :key="tag" :afterClose="() => handleClose(tag)">{{tag}}</a-tag>
		</template>
		<a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      :style="{ width: 'auto' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
		<a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
      <a-icon type="plus" /> {{text}}
    </a-tag>
	</div>
</template>

<script>
export default {
	props: ['text'],
  data() {
    return {
			inputVisible: false,
			inputValue: '',
			tags: [],
    }
	},
	methods: {
		handleClose (removedTag) {
			const tags = this.tags.filter(tag => tag !== removedTag)
			this.tags = tags
			this.$emit("addTag", tags)
		},
		showInput () {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },
    handleInputChange (e) {
      this.inputValue = e.target.value
		},
		handleInputConfirm () {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
			}
			Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
			})
			this.$emit("addTag", tags)
    },
	}
}
</script>

<style lang="less" scoped>
.tag-block {
	width: 280px;
	height: auto;
	min-height: 60px;
	background-color: white;
	padding: 10px;
	border-radius: 5px;
	border: 1px lightgray solid;
	display: inline-flex;
	flex-wrap: wrap;
	flex-direction: row;

	.tag {
		margin-bottom: 5px;
	}
}
</style>