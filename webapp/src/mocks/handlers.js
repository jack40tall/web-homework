import { graphql } from 'msw'

export const handlers = [
  graphql.query('GetTransactionsWithInfo', (req, res, ctx) => {
    return res(
      ctx.data({
        transactions: {
          id: '123',
          user_id: 'userId123',
          user: {
            firstName: 'John',
            lastName: 'McTester'
          },
          merchant: {
            name: 'Test Inc'
          },
          description: 'This is my test',
          merchant_id: 'merchId123',
          debit: true,
          credit: false,
          amount: 20
        }
      })
    )
  })
]
