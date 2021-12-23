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
  const query = TransactionModel.find({ id: id })
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

async function deleteOne (id) {
  const query = TransactionModel.deleteOne({ id: id })
  const result = await query.exec()
  return result
}

module.exports = {
  find,
  findOne,
  deleteOne
}
