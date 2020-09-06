const CryptoJS = require("crypto-js");

// Encrypt
function encryptData({ data, key }) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

// Decrypt
function decryptData({ data, key }) {
  const bytes = CryptoJS.AES.decrypt(data, key);
  const stringData = bytes.toString(CryptoJS.enc.Utf8);

  // if stringData is undefined the encryption key is incorrect
  if (!stringData) return undefined
  return JSON.parse(stringData)
}

module.exports = {
  encryptData,
  decryptData
}

