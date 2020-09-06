const { encryptData, decryptData } = require('../../lib/encrypt')
const mockObject = {
  "test": "mocktest",
  "arr": ["item1"]
}
const mySecret = "superSecret2"

describe("encrypt.js test", () => {
  it("should encrypt data to a string value", () => {
    const stringRepresentation = encryptData({ data: mockObject, key: mySecret })
    expect(typeof stringRepresentation).toBe("string")
  })

  it("should encrypt and decrypt data successfully", () => {
    const stringRepresentation = encryptData({ data: mockObject, key: mySecret })
    const decrypted = decryptData({ data: stringRepresentation, key: mySecret})
    expect(decrypted).toEqual(mockObject)
  })
})