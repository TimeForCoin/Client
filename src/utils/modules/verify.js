export default {
  isValidEmail: function(email) {
    let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if (reg.test(email)) {
      return true
    }
    return false
  }
}
