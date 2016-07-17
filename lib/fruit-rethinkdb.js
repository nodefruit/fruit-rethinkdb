'use strict'
const r = require('rethinkdb')
const Promise = require('bluebird')

class dataManager {
  connect (config, callback) {
    this.connection = r.connect({
      host: config.host,
      port: config.port,
      db: config.db
    })

    let connection = this.connection
    return Promise.resolve(connection).asCallback(callback)
  }
}

module.exports = dataManager
