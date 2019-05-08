export async function GetVioletUrl(url) {
  const res = await this.$https.get('/users/login', {
    params: {
      redirectUrl: url
    }
  })
  return res.data
}
