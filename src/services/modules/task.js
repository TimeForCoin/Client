export async function GetTasksList(p) {
  const res = await this.$axios.get('/tasks', {params: p})
  return res.data
}

export async function GetTask(id) {
  const res = await this.$axios.get('/tasks/' + id)
  return res.data
}

export async function GetPlayingTaskList(id, p) {
  const res = await this.$axios.get('/users/task/' + id, {params: p})
  return res.data
}

export async function GetColllectedTaskList(id, p) {
  const res = await this.$axios.get('/users/collect/' + id, {params: p})
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

export async function GetPlayerList(task_id) {
  const res = await this.$axios.get('/tasks/' + task_id + '/player')
  return res.data
}

export async function GetPlayerStatusOfTask(task_id, user_id) {
  const res = await this.$axios.get('/tasks/' + task_id + '/player/' + user_id)
  return res.data
}

export async function ChangePlayerStatusOfTask(task_id, user_id, params) {
  const res = await this.$axios.put('/tasks/' + task_id + '/player/' + user_id, params)
  return res.data
}

export async function AddLikeTask(task_id) {
  const res = await this.$axios.post('/tasks/' + task_id + '/like')
  return res.data
}

export async function DeleteLikeTask(task_id) {
  const res = await this.$axios.delete('/tasks/' + task_id + '/like')
  return res.data
}

export async function AddCollectTask(task_id) {
  const res = await this.$axios.post('/tasks/' + task_id + '/collect')
  return res.data
}

export async function DeleteCollectTask(task_id) {
  const res = await this.$axios.delete('/tasks/' + task_id + '/collect')
  return res.data
}