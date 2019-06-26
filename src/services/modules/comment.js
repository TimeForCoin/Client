export async function GetComments(id) {
	const res = await this.$axios.get('/comments/' + id)
	return res.data
}

export async function AddComment(id, p) {
  const res = await this.$axios.post('/comments/' + id, p)
  return res.data
}

export async function DeleteComment(id) {
  const res = await this.$axios.delete('/comments/' + id)
  return res.data
}

export async function AddLikeComment(id) {
  const res = await this.$axios.post('/comments/' + id + '/like')
  return res.data
}

export async function DeleteLikeComment(id) {
  const res = await this.$axios.delete('/comments/' + id + '/like')
  return res.data
}