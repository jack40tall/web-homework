const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}

async function findOne (id) {
  // TODO: Change this
  const query = TransactionModel.find(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

module.exports = {
  find,
  findOne
}
