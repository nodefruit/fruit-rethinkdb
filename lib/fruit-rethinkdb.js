'use strict'
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
}

module.exports = dataManager
