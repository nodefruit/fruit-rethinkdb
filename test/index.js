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

test('Get a piece of data into an specific table', async t => {
  let table = 'users'

  let created = await adapter.insert({user: 'miguhruiz'}, table)
  let id = created.generated_keys[0]

  let result = await adapter.findOne(id, table)
  t.deepEqual(result.id, id)
})

test('List all data from an specific table', async t => {
  let table = 'users'

  let result = await adapter.findAll(table)

  t.is(typeof result, 'object', 'Result is an object')
})

test('Count data in a table', async t => {
  let table = 'users'

  let result = await adapter.count(table)

  t.is(typeof result, 'number', 'Result is a number')
})

test('Update a piece of data from a table', async t => {
  let data = await adapter.insert({user: 'miguhruiz'}, 'users')
  let i = data.generated_keys[0]
  let tb = 'users'
  let b = {user: 'fruitworld23'}

  let result = await adapter.update(i, tb, b)
  t.is(result.replaced, 1)
})

test('Update all data from a table', async t => {
  let tb = 'users'
  let b = {user: 'fruitworld'}

  let result = await adapter.updateAll(tb, b)

  t.is(typeof result.replaced, 'number', 'Result is a number')
})

test('Delete a piece of data from a table', async t => {
  let data = await adapter.insert({user: 'miguhruiz'}, 'users')
  let i = data.generated_keys[0]
  let tb = 'users'

  let result = await adapter.delete(i, tb)
  t.is(result.deleted, 1)
})

test('Delete all data from a table', async t => {
  let data = await adapter.insert({user: 'miguhruiz'}, 'users2')

  let tb = 'users2'

  let result = await adapter.deleteAll(tb)
  t.is(typeof result.deleted, 'number', 'Result is a number')
})
