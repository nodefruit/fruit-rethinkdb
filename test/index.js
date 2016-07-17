'use strict'
const test = require('ava')
const adapter = require('..')
const config = require('../config')

test('Connect to the database', async t => {
  let connection = await adapter.connect(config.db)
  t.deepEqual(connection.host, config.db.host)
})
