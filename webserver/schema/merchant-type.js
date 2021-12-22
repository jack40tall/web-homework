/* eslint-disable no-unused-vars */
const path = require('path')
const graphql = require('graphql')
const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql

const MerchantType = new GraphQLObjectType({
  name: 'Merchant',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve (parentValue, args) {
        return Transaction.find({ merchant_id: parentValue.id }).populate('transaction')
      }
    }
  })
})

module.exports = MerchantType

const MerchantSchema = require(path.join('..', 'data-models', 'Merchant')) // eslint-disable-line no-unused-vars
const { TransactionModel: Transaction } = require(path.join('..', 'data-models', 'Transaction'))
const TransactionType = require('./transaction-type')
