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
			fileIDList: [],
    }
	},
	methods: {
		async handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
			this.fileList = newFileList

			await this.$service.file.DeleteFile.call(this, this.fileIDList[index]);

			const newFileIDList = this.fileIDList.slice();
      newFileIDList.splice(index, 1);
			this.fileIDList = newFileIDList
			this.$emit("fileChange", this.fileIDList)
    },
		async beforeUpload(file) {
			this.fileList = [...this.fileList, file]
			const formData = new FormData();
			formData.append("data", file);
			formData.append("owner", "user");
			formData.append("type", "file");
			
			const res = await this.$service.file.UploadFile.call(this, formData);
			console.log(res);
			this.fileIDList.push(res.id)
			this.$emit("fileChange", this.fileIDList)
			throw "Finsih"
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