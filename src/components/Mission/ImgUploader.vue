<template>
	<div class="img-uploader">
		<p>最多上传9张图片</p>
		<a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture-card"
      :fileList="fileList"
      @preview="handlePreview"
      @change="handleChange"
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
  data() {
    return {
			previewVisible: false,
			previewImage: '',
			fileList: [],
    }
	},
	methods: {
		handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
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