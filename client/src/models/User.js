import JwtDecode from 'jwt-decode'

export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (_) {
      return null
    }
  }

  constructor ({id, username, password, isAdmin}) {
    this.id = id // eslint-disable-line camelcase
    this.username = username
    this.password = password
    this.isAdmin = isAdmin
  }

  get isAdmin () {
    return this.isAdmin
  }
}