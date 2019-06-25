<template>
	<div class="img-uploader">
		<p>最多上传9张图片</p>
		<a-upload
      listType="picture-card"
      :fileList="fileList"
			:remove="handleRemove"
			:beforeUpload="beforeUpload"
      @preview="handlePreview"
    >
      <div v-if="fileList.length < 9">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
	</div>
</template>

<script>
export default {
	props: ['parentFileList'],
  data() {
    return {
			previewVisible: false,
			previewImage: '',
			fileList: [],
			fileIDList: [],
    }
	},
	methods: {
		handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
			//console.log(file)
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
		},
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
			// get img url
			let reader = new FileReader();
			reader.onload = (evt)=> {
				file.url = evt.target.result;
				this.fileList = [...this.fileList, file]
			}
			reader.readAsDataURL(file);
				
			const formData = new FormData();
			formData.append("data", file);
			formData.append("owner", "user");
			formData.append("type", "image");
			//console.log(formData);
			const res = await this.$service.file.UploadFile.call(this, formData);
			//console.log(res);
			this.fileIDList.push(res.id)
			this.$emit("fileChange", this.fileIDList)
			throw "Finsih"
      return false;
		}
	},
	watch: {
		parentFileList(val) {
			this.fileList = []
			this.parentFileList.forEach(element => {
				let f = {
        	uid: element.id,
					name: element.id,
					status: 'done',
					url: element.url,
				}
				this.fileList.push(f)
				this.fileIDList.push(element.id)
			});
			this.$emit("fileChange", this.fileIDList)
		}
	}
}
</script>

<style lang="less" scoped>

.img-uploader {
	text-align: left;

	.ant-upload-select-picture-card {

		.ant-upload-text {
			margin-top: 8px;
    	color: #666;
		}
	}
}

</style>