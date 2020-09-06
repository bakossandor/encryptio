const { prismaQuery } = require('../../lib/prisma')

describe('should test the prisma helper functions', () => {
  it('should return an object to query for individual items', () => {
    const id = 'asdfeg'
    const expected = { 'where': { 'id': id}}
    const query = prismaQuery(id)
    expect(query).toEqual(expected)
  })

  it('should return an object to query for many items because of the wildcard ending of the id', () => {
    const id = 'asdfeg-*'
    const expected = { 'where': { 'id': { 'contains': id.slice(0, -1) } } }
    const query = prismaQuery(id)
    expect(query).toEqual(expected)
  })
})