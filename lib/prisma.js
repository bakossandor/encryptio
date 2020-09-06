// I could have been more specific with this function name

function prismaQuery(id) {
  // checking if the last character is representing the Wildcard sign
  if (id[id.length -1] !== '*') {
    return {
      'where': { id }
    }
  } else {
    const shortenedId = id.slice(0, -1)
    return {
      'where': {
        'id': { 'contains': shortenedId}
      }
    }
  }
}

module.exports = {
  prismaQuery,
}