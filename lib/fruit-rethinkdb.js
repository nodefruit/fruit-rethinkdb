'use strict'

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
}

module.exports = dataManager