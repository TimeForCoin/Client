export async function createQuestionaire(taskID, params) {
  const res = await this.$axios.post('/questionnaires/' + taskID, params)
  return res
}
