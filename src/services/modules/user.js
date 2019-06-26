export async function GetVioletUrl() {
  const res = await this.$axios.get('/session')
  return res.data
}

export async function GetLoginStatus() {
  const res = await this.$axios.get('/session/status')
  return res.data
}

export async function GetInfo() {
  const res = await this.$axios.get('/users/info/me')
  return res.data
}

export async function GetUserInfo(userID) {
  const res = await this.$axios.get('/users/info/' + userID)
  return res.data
}

export async function Logout() {
  const res = await this.$axios.delete('/session')
  return res.data
}

export async function ChangeInfo(params) {
  const res = await this.$axios.put('/users/info', params)
  return res.data
}
