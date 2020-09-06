jest.mock('../../data/index')
const operations = require('../../data/index')
const records = [{'id': 'abc', 'value': {'some': 'value'}}]

operations.getRecords.mockResolvedValue(records)
operations.putRecord.mockResolvedValue({ 'id': records[0].id })

jest.mock('../../lib/encrypt')
const crypt = require('../../lib/encrypt')

const { getInformation, postInformation } = require('../../services/information')

describe('should test getInformation service', () => {
  it('should send information array', async () => {
    crypt.decryptData.mockReturnValue(records[0].value)
    const request = {
      'query': {
        'id': records[0].id,
        'decryption_key': 'some-random-key'
      }
    }
    const response = {
      send: jest.fn(),
      status: jest.fn()
    }
    const next = jest.fn()

    await getInformation(request, response, next)
    expect(response.send).toHaveBeenCalledTimes(1)
    expect(response.send).toHaveBeenCalledWith(records)
  })

  it('should return an empty array on \'wrong\' decrypt_key', async () => {
    crypt.decryptData.mockReturnValue(undefined)
    global.console = { 'warn': jest.fn() }

    const request = {
      'query': {
        'id': records[0].id,
        'decryption_key': 'some-random-key'
      }
    }
    const response = {
      send: jest.fn(),
      status: jest.fn()
    }
    const next = jest.fn()

    await getInformation(request, response, next)
    expect(response.send).toHaveBeenCalledTimes(1)
    expect(response.send).toHaveBeenCalledWith([{}])
    expect(console.warn).toBeCalled()
  })

  it('should handle generic error', async () => {
    const request = "this gonna be a problem"
    const response = {
      send: jest.fn(),
      status: jest.fn()
    }
    const next = jest.fn()

    await getInformation(request, response, next)
    expect(next).toHaveBeenCalledTimes(1)
  })
})

describe('should test postInformation service', () => {
  it('should send id response back', async () => {
    crypt.encryptData.mockReturnValue("some string")
    const request = {
      'body': {
        'id': records[0].id,
        'encryption_key': 'some-random-key',
        'value': records[0].value,
      }
    }
    const response = {
      send: jest.fn(),
      status: jest.fn()
    }
    const next = jest.fn()

    await postInformation(request, response, next)
    expect(response.send).toHaveBeenCalledTimes(1)
    expect(response.send).toHaveBeenCalledWith({ 'id': records[0].id })
  })

  it('should return 400, because of wrong post body', async () => {
    const request = { 'body': {} }
    const response = {
      send: jest.fn(),
      status: jest.fn()
    }
    const next = jest.fn()

    await postInformation(request, response, next)
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should handle generic error', async () => {
    const request = "this gonna be a problem"
    const response = {
      send: jest.fn(),
      status: jest.fn()
    }
    const next = jest.fn()

    await postInformation(request, response, next)
    expect(next).toHaveBeenCalledTimes(1)
  })
})
