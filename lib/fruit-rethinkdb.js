const co = require('co')
const r = require('rethinkdb')
const Promise = require('bluebird')

class dataManager {
  constructor (options) {
    options = options || {}
    this.host = options.host
    this.port = options.port
    this.db = options.db
  }
  connect (callback) {
    this.connection = r.connect({
      host: this.host,
      port: this.port,
      db: this.db
    })

    let connection = this.connection
    return Promise.resolve(connection).asCallback(callback)
  }
  insert (data, t, callback) {
    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection

      let request = yield r.db(db).table(t).insert(data).run(conn)

      return Promise.resolve(request)
    })
    return Promise.resolve(tasks()).asCallback(callback)
  }
  find(query, t, callback) {
    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection

      let search = yield r.db(db).table(t).filter(query).coerceTo('array').run(conn, callback)

      return Promise.resolve(search)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
  findOne(id, t, callback) {
    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection

      let search = yield r.db(db).table(t).get(id).run(conn)

      return Promise.resolve(search)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
  findAll(t, callback) {
    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection

      let result = yield r.db(db).table(t).run(conn)

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
  count(t, callback) {
    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection

      let result = yield r.db(db).table(t).count().run(conn)

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
  update(id, table, body, callback) {
    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection

      let result = yield r.db(db).table(table).get(id).update(body).run(conn)

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
  updateAll(table, body, callback) {
    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection

      let result = yield r.db(db).table(table).update(body).run(conn)

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
  delete(id, table, callback) {
    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection

      let result = yield r.db(db).table(table).get(id).delete().run(conn)

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
  deleteAll(table, callback) {
    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection

      let result = yield r.db(db).table(table).delete().run(conn)

      return Promise.resolve(result)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }
}

module.exports = dataManager
