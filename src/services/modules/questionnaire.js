export async function create(taskID, params) {
  const res = await this.$axios.post('/questionnaires/' + taskID, params)
  return res
}

export async function getInfo(taskID) {
  const res = await this.$axios.get('/questionnaires/' + taskID)
  return res
}

export async function modifyInfo(taskID, params) {
  const res = await this.$axios.put('/questionnaires/' + taskID, params)
  return res
}

export async function getQuestions(taskID) {
  const res = await this.$axios.get('/questionnaires/' + taskID + '/questions')
  return res
}

export async function modifyQuestions(taskID, questions) {
  const res = await this.$axios.post('/questionnaires/' + taskID + '/questions', questions)
  return res
}

export async function getAnswers(taskID, params) {
  const res = await this.$axios.get('/questionnaires/' + taskID + '/answers', { params: params })
  return res
}

export async function addAnswer(taskID, answer) {
  const res = await this.$axios.post('/questionnaires/' + taskID + '/answers', answer)
  return res
}
