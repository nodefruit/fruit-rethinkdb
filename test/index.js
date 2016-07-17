'use strict'
const test = require('ava')
const Adapter = require('..')
const config = require('../config')

const adapter = new Adapter({host: config.db.host, port: config.db.port, db: config.db.db})

test('Connect to the database', async t => {
  let connection = await adapter.connect()
  t.deepEqual(connection.host, config.db.host)
})

test('Insert data into an specific table', async t => {
  let body = {user: 'miguhruiz'}
  let table = 'users'

  let result = await adapter.insert(body, table)
  t.deepEqual(result.inserted, 1)
})

test('Find data into an specific table', async t => {
  let query = {'user': 'miguhruiz'}
  let table = 'users'

  let result = await adapter.find(query, table)
  t.is(typeof result, 'object', 'Result is an object')
})