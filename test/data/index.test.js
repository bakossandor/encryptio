jest.mock('@prisma/client')
const { PrismaClient } = require('@prisma/client')

const mockData = {
  id: "abc",
  value: { "some": "value"}
}

const upsertMock = jest.fn().mockResolvedValue(mockData)
const findManyMock = jest.fn().mockResolvedValue([mockData])
PrismaClient.mockImplementation(() => {
  return {
    information: {
      upsert: upsertMock,
      findMany: findManyMock
    }
  }
})

const { putRecord, getRecords } = require('../../data/index')

describe('should test the data layer functionalities', () => {
  it('should putRecord return the record', async () => {
    const record = await putRecord(mockData)
    expect(upsertMock).toHaveBeenCalledTimes(1)
    expect(upsertMock).toHaveBeenCalledWith({
      'where': { 'id': mockData.id },
      'update': { 'value': mockData.value, 'id': mockData.id },
      'create': { 'value': mockData.value, 'id': mockData.id }
    })
    expect(record).toEqual({ 'id': mockData.id })
  })

  it('should putRecord return the record', async () => {
    const record = await getRecords(mockData.id)
    expect(findManyMock).toHaveBeenCalledTimes(1)
    expect(findManyMock).toHaveBeenCalledWith({
      'where': { 'id': mockData.id },
    })
    expect(record).toEqual([mockData])
  })
})