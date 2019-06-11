<template>
	<div class="file-uploader">
		<a-upload 
			:multiple="true" 
			:fileList="fileList" 
			:remove="handleRemove"
      :beforeUpload="beforeUpload"
		>
    <a-button>
      <a-icon type="upload" /> 上传文件
    </a-button>
  </a-upload>
	</div>
</template>

<script>
export default {
  data() {
    return {
			fileList: [],
    }
	},
	methods: {
		// await this.$service.user.ChangeInfo.call(this, this.info)
		handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList
    },
		beforeUpload(file) {
			console.log(file);
      this.fileList = [...this.fileList, file]
      return false;
    },
	}
}
</script>

<style lang="less" scoped>

.file-uploader {
	text-align: left;
}

</style>