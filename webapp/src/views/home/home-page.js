import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../../gql/transactions.gql'
import { TxTable } from '../../components/transactions/TxTable'
import { css } from '@emotion/core'

export function Home () {
  const { loading, error, data = {} } = useQuery(GetTransactions)

  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <h1 css={centerStyle}>Transactions</h1>
      <p css={centerStyle}>Edit, Add, and Delete your Transactions</p>
      <TxTable data={data.transactions} />
    </Fragment>
  )
}

const centerStyle = css`
  text-align: center;
`
