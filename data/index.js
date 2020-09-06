const { PrismaClient } = require('@prisma/client')

const { prismaQuery } = require('../lib/prisma')

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
})

async function putRecord({ id, value }) {
  // Inserting the record into database
  const record = await prisma.information.upsert({
    where: { id },
    update: { value, id },
    create: { value, id },
  })

  // returning an object with an id property
  return { id: record.id }
}


async function getRecords(id) {
  // Building the so called queries with a helper function
  const query = prismaQuery(id)

  // Querying the database
  const records = await prisma.information.findMany(query)

  // Returning the records array
  return records
}

module.exports = {
  putRecord,
  getRecords
}