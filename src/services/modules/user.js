export async function GetVioletUrl() {
  const res = await this.$axios.get('/session')
  return res.data
}

export async function GetLoginStatus() {
  const res = await this.$axios.get('/session/status')
  return res.data
}

export async function GetInfo() {
  const res = await this.$axios.get('/user/info/me')
  return res.data
}

export async function Logout() {
  const res = await this.$axios.delete('/session')
  return res.data
}
