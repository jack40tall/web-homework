import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactionsWithInfo from '../../gql/queries/getTransactionsWithInfo.gql'
import GetDropdownOptions from '../../gql/queries/getDropdownOptions.gql'
import { TxTable } from '../../components/TxTable/TxTable'
import { Button } from '@material-ui/core'
import { NewUserModal } from '../../components/transactions/buttons/NewUserModal'
import { NewMerchantModal } from '../../components/transactions/buttons/NewMerchantModal'
import { NewTransactionModal } from '../../components/transactions/buttons/NewTransactionModal'
import emotionStyles from '../../style/globalStyles'

const { centerStyle, flexCenter, createButton, createHeader } = emotionStyles

export function Home () {
  const { loading, error, data } = useQuery(GetTransactionsWithInfo)
  const { loading: dropdownLoading, error: dropdownError, data: dropdownData } = useQuery(GetDropdownOptions)

  const [openUser, setOpenUser] = useState(false)
  const [openMerchant, setOpenMerchant] = useState(false)
  const [openTransaction, setOpenTransaction] = useState(false)

  if (loading || dropdownLoading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error || dropdownError) {
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
      <div css={flexCenter}>
        <h2 css={createHeader}>Create: </h2>
        <Button css={createButton} onClick={() => setOpenMerchant(true)} variant='contained'>Merchant</Button>
        <Button css={createButton} onClick={() => setOpenUser(true)} variant='contained'>User</Button>
        <Button css={createButton} onClick={() => setOpenTransaction(true)} variant='contained'>Transaction</Button>
        <NewUserModal closeFn={() => setOpenUser(false)} open={openUser} />
        <NewMerchantModal closeFn={() => setOpenMerchant(false)} open={openMerchant} />
        <NewTransactionModal closeFn={() => setOpenTransaction(false)} open={openTransaction} />
      </div>
      <p>* Refresh page after creating entity to load </p>
      <TxTable data={data.transactions} dropdownData={dropdownData} />
    </Fragment>
  )
}
