const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User')
const { MerchantModel } = require('../data-models/Merchant')
const Transactions = require('../query-resolvers/transaction-resolvers.js')
const TransactionType = require('./transaction-type')
const UserType = require('./user-type')
const MerchantType = require('./merchant-type')
const ObjectID = require('mongodb').ObjectID

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        const newId = new ObjectID()
        return (new TransactionModel({ id: newId, user_id, description, merchant_id, debit, credit, amount })).save()
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { id, user_id, description, merchant_id, debit, credit, amount }) {
        return (Transactions.updateOne(id, user_id, description, merchant_id, debit, credit, amount))
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, { id }) {
        return Transactions.deleteOne(id)
      }
    },
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dob: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { firstName, lastName, dob }) {
        const newId = new ObjectID()
        return (new UserModel({ id: newId, firstName, lastName, dob })).save()
      }
    },
    createMerchant: {
      type: MerchantType,
      args: {
        name: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { name }) {
        const newId = new ObjectID()
        return (new MerchantModel({ id: newId, name })).save()
      }
    }
  }
})

module.exports = mutation
