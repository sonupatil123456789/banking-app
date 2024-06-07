const prismadb = require('@prisma/client')

const prisma = new prismadb.PrismaClient()
// const prisma = new prismadb.PrismaClient({log: ["query"]})

module.exports =prisma 