import UpdateTransaction from '../src/gql/mutations/updateTransaction.gql'
import { mockData, mockDropdownData } from './transactions-data'

const { id, amount, credit, debit, description } = mockData[0]
const { id: merchantId } = mockDropdownData.merchants[1]
const { id: userId } = mockDropdownData.users[1]

console.log('mock version: ', `{"id":"${id}","user_id":"${userId}","amount":${amount},"credit":${credit},"debit":${debit},"description":"${description}","merchant_id":"${merchantId}"}`)

// {"id":"61c3f92383f0a2e3871797d8","user_id":"userId456","amount":40,"credit":false,"debit":true,"description":"Flight to NRT","merchant_id":"merchantId456"}

const mocks = [
  {
    request: {
      query: UpdateTransaction,
      variables: {
        id: id,
        user_id: userId,
        amount: amount,
        credit: credit,
        debit: debit,
        description: description,
        merchant_id: merchantId
      }
    },
    result: { data: { updateTransaction: { id: id } } }
  }
]

export default mocks
