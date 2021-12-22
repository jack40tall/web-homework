const path = require('path')
const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat
} = graphql

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    description: { type: GraphQLString },
    merchant_id: { type: GraphQLString },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
    amount: { type: GraphQLFloat },
    user: {
      type: UserType,
      resolve (parentValue, args) {
        return User.findOne({ id: parentValue.user_id })
      }
    },
    merchant: {
      type: MerchantType,
      resolve (parentValue, args) {
        return Merchant.findOne({ id: parentValue.merchant_id })
      }
    }
  })
})

module.exports = TransactionType

const TransactionSchema = require(path.join('..', 'data-models', 'Transaction')) // eslint-disable-line no-unused-vars
const { UserModel: User } = require(path.join('..', 'data-models', 'User'))
const { MerchantModel: Merchant } = require(path.join('..', 'data-models', 'Merchant'))
const UserType = require('./user-type')
const MerchantType = require('./merchant-type')
