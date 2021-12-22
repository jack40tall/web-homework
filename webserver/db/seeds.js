const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID
const Transaction = require('../data-models/Transaction').TransactionModel
const User = require('../data-models/User').UserModel
const Merchant = require('../data-models/Merchant').MerchantModel

const { MONGO_URI } = require('../constants')

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MONGO CONNECTION OPEN!!!')
  })
  .catch(err => {
    console.log(err)
  })

const firstUserId = new ObjectID()
const secondUserId = new ObjectID()
const thirdUserId = new ObjectID()
const fourthUserId = new ObjectID()

const firstMerchantId = new ObjectID()
const secondMerchantId = new ObjectID()
const thirdMerchantId = new ObjectID()
const fourthMerchantId = new ObjectID()

const seedUsers = [
  {
    id: firstUserId,
    firstName: 'John',
    lastName: 'Smith',
    dob: '5/20/1945'
  },
  {
    id: secondUserId,
    firstName: 'Jane',
    lastName: 'Richins',
    dob: '9/14/2000'
  },
  {
    id: thirdUserId,
    firstName: 'Gris',
    lastName: 'Worn',
    dob: '7/9/1998'
  },
  {
    id: fourthUserId,
    firstName: 'French',
    lastName: 'Montana',
    dob: '1/1/1967'
  }
]

const seedMerchants = [
  {
    id: firstMerchantId,
    name: 'United'
  },
  {
    id: secondMerchantId,
    name: 'Delta'
  },
  {
    id: thirdMerchantId,
    name: 'Southwest'
  },
  {
    id: fourthMerchantId,
    name: 'Korean Air'
  }
]

const seedTransactions = [
  {
    id: new ObjectID(),
    user_id: firstUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: firstMerchantId
  },
  {
    id: new ObjectID(),
    user_id: firstUserId,
    amount: 34,
    credit: false,
    debit: true,
    description: 'Flight to SLC',
    merchant_id: secondMerchantId
  },
  {
    id: new ObjectID(),
    user_id: firstUserId,
    amount: 673,
    credit: false,
    debit: true,
    description: 'Flight to NRT',
    merchant_id: thirdMerchantId
  },
  {
    id: new ObjectID(),
    user_id: secondUserId,
    amount: 5678,
    credit: false,
    debit: true,
    description: 'Flight to SML',
    merchant_id: fourthMerchantId
  },
  {
    id: new ObjectID(),
    user_id: secondUserId,
    amount: 12,
    credit: false,
    debit: true,
    description: 'Flight to SMH',
    merchant_id: firstMerchantId
  },
  {
    id: new ObjectID(),
    user_id: secondUserId,
    amount: 5,
    credit: false,
    debit: true,
    description: 'Flight to LOL',
    merchant_id: secondMerchantId
  },
  {
    id: new ObjectID(),
    user_id: thirdUserId,
    amount: 569,
    credit: false,
    debit: true,
    description: 'Flight to HND',
    merchant_id: thirdMerchantId
  },
  {
    id: new ObjectID(),
    user_id: thirdUserId,
    amount: 476,
    credit: false,
    debit: true,
    description: 'Flight to CNA',
    merchant_id: fourthMerchantId
  },
  {
    id: new ObjectID(),
    user_id: thirdUserId,
    amount: 87,
    credit: false,
    debit: true,
    description: 'Flight to TOT',
    merchant_id: firstMerchantId
  },
  {
    id: new ObjectID(),
    user_id: fourthUserId,
    amount: 234,
    credit: false,
    debit: true,
    description: 'Flight to BUL',
    merchant_id: secondMerchantId
  },
  {
    id: new ObjectID(),
    user_id: fourthUserId,
    amount: 986,
    credit: false,
    debit: true,
    description: 'Flight to DTR',
    merchant_id: thirdMerchantId
  },
  {
    id: new ObjectID(),
    user_id: fourthUserId,
    amount: 1001,
    credit: false,
    debit: true,
    description: 'Flight to IOY',
    merchant_id: fourthMerchantId
  }
]

const seedDB = async () => {
  await User.deleteMany({})
  await User.insertMany(seedUsers)
  await Transaction.deleteMany({})
  await Transaction.insertMany(seedTransactions)
  await Merchant.deleteMany({})
  await Merchant.insertMany(seedMerchants)
}

seedDB().then(() => {
  mongoose.connection.close()
})
