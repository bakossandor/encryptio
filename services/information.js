const { getRecords, putRecord } = require('../data/index')
const { encryptData, decryptData } = require('../lib/encrypt')

async function getInformation(req, res, next) {
  try {
    const { 'query': { id, decryption_key: key } } = req

    // quick and very rudimentary validation
    if (!id || !key) {
      res.status(400).send({"developerMessage": "id or key query parameter is missing"})
      return
    }

    //get the records from the db
    const records = await getRecords(id)

    const decryptedRecords = records.map((record) => {
      const decryptedData = decryptData({ data: record.value, key })
      if (!decryptedData) {
        console.warn("Wrong Encryption Key: " + key)
        return {}
      }
      const newRecord = {
        id: record.id,
        value: decryptedData,
      }
      return newRecord
    })
    // send back the response
    res.send(decryptedRecords)
  } catch (error) {
    next(error)
  }
}

async function postInformation(req, res, next) {
  try {
    // destructuring the request object to extract the required values from post body
    const { 'body': {
      id,
      encryption_key: key,
      value,
    } } = req
    // quick and very rudimentary validation
    if (!id || !key || !value) {
      res.status(400).send({'developerMessage': 'Invalid body'})
      return
    }

    if (typeof value !== 'object') {
      res.status(400).send({'developerMessage': 'Invalid body'})
      return
    }

    const encrypted = encryptData({ data: value, key })
    // inserting the record
    const response = await putRecord({ id, value: encrypted })

    // send back the response
    res.send(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getInformation,
  postInformation
}