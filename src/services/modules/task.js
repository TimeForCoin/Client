export async function GetTasksList(p) {
  const res = await this.$axios.get('/tasks', { params: p })
  return res.data
}

export async function GetTask(id) {
  const res = await this.$axios.get('/tasks/' + id)
  return res.data
}

export async function GetPlayingTaskList(id, p) {
  const res = await this.$axios.get('/users/task/' + id, { params: p })
  return res.data
}

export async function GetCollectedTaskList(id, p) {
  const res = await this.$axios.get('/users/collect/' + id, { params: p })
  return res.data
}

export async function CreateTask(params) {
  const res = await this.$axios.post('/tasks', params)
  return res.data
}

export async function ChangeTask(id, params) {
  const res = await this.$axios.put('/tasks/' + id, params)
  return res.data
}

export async function JoinTask(id, p) {
  const res = await this.$axios.post('/tasks/' + id + '/player', p)
  return res.data
}

export async function GetPlayerList(taskId) {
  const res = await this.$axios.get('/tasks/' + taskId + '/player')
  return res.data
}

export async function GetPlayerStatusOfTask(taskId, userId) {
  const res = await this.$axios.get('/tasks/' + taskId + '/player/' + userId)
  return res.data
}

export async function ChangePlayerStatusOfTask(taskId, userId, params) {
  const res = await this.$axios.put('/tasks/' + taskId + '/player/' + userId, params)
  return res.data
}

export async function AddLikeTask(taskId) {
  const res = await this.$axios.post('/tasks/' + taskId + '/like')
  return res.data
}

export async function DeleteLikeTask(taskId) {
  const res = await this.$axios.delete('/tasks/' + taskId + '/like')
  return res.data
}

export async function AddCollectTask(taskId) {
  const res = await this.$axios.post('/tasks/' + taskId + '/collect')
  return res.data
}

export async function DeleteCollectTask(taskId) {
  const res = await this.$axios.delete('/tasks/' + taskId + '/collect')
  return res.data
}
