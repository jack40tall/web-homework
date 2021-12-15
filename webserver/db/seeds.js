const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID
const Transaction = require('../data-models/Transaction').TransactionModel
const User = require('../data-models/User').UserModel

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

const seedTransactions = [
  {
    id: new ObjectID(),
    user_id: firstUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  },
  {
    id: new ObjectID(),
    user_id: firstUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  },
  {
    id: new ObjectID(),
    user_id: firstUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  },
  {
    id: new ObjectID(),
    user_id: secondUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  },
  {
    id: new ObjectID(),
    user_id: secondUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  },
  {
    id: new ObjectID(),
    user_id: secondUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  },
  {
    id: new ObjectID(),
    user_id: thirdUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  },
  {
    id: new ObjectID(),
    user_id: thirdUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  },
  {
    id: new ObjectID(),
    user_id: thirdUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  },
  {
    id: new ObjectID(),
    user_id: fourthUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  },
  {
    id: new ObjectID(),
    user_id: fourthUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  },
  {
    id: new ObjectID(),
    user_id: fourthUserId,
    amount: 250,
    credit: false,
    debit: true,
    description: 'Flight to LAX',
    merchant_id: new ObjectID()
  }
]

const seedDB = async () => {
  await User.deleteMany({})
  await User.insertMany(seedUsers)

  await Transaction.deleteMany({})
  await Transaction.insertMany(seedTransactions)
}

seedDB().then(() => {
  mongoose.connection.close()
})
