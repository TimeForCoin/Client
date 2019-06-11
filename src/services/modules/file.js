export async function UploadFile(formData) {
	const res = await this.$axios.post('/file', formData, {
		headers: {
			'Content-Type':'multipart/form-data'
		}
	})
	return res.data
}