import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactionsWithInfo from '../../gql/queries/getTransactionsWithInfo.gql'
import GetDropdownOptions from '../../gql/queries/getDropdownOptions.gql'
import { TxTable } from '../../components/transactions/TxTable'
import { css } from '@emotion/core'
import { Button } from '@material-ui/core'
import { NewUserModal } from '../../components/transactions/buttons/NewUserModal'
import { NewMerchantModal } from '../../components/transactions/buttons/NewMerchantModal'
import { NewTransactionModal } from '../../components/transactions/buttons/NewTransactionModal'

export function Home () {
  const { loading, error, data } = useQuery(GetTransactionsWithInfo)
  console.log('refetch query')
  const { loading: dropdownLoading, error: dropdownError, data: dropdownData } = useQuery(GetDropdownOptions)

  const [openUser, setOpenUser] = useState(false)
  const [openMerchant, setOpenMerchant] = useState(false)
  const [openTransaction, setOpenTransaction] = useState(false)

  // useEffect(() => {
  //   ({ loading, error, data } = useQuery(GetTransactionsWithInfo))
  //   // eslint-disable-next-line func-call-spacing
  //   console.log('refetch query')
  //   // eslint-disable-next-line no-unexpected-multiline
  //   ({ loading: dropdownLoading, error: dropdownError, data: dropdownData } = useQuery(GetDropdownOptions))
  // }, [openUser, openMerchant])

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
      {console.log('rerender')}
      <div css={css`{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            // border: 1px solid red;
            // width: 600px;
            }`}>
        <h1>Create: </h1>
        <Button onClick={() => setOpenMerchant(true)} variant='outlined'>Merchant</Button>
        <Button onClick={() => setOpenUser(true)} variant='outlined'>User</Button>
        <Button onClick={() => setOpenTransaction(true)} variant='outlined'>Transaction</Button>
        <NewUserModal closeFn={() => setOpenUser(false)} open={openUser} />
        <NewMerchantModal closeFn={() => setOpenMerchant(false)} open={openMerchant} />
        <NewTransactionModal closeFn={() => setOpenTransaction(false)} open={openTransaction} />
      </div>
      <TxTable data={data.transactions} dropdownData={dropdownData} />
    </Fragment>
  )
}

const centerStyle = css`
  text-align: center;
`
