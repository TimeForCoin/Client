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