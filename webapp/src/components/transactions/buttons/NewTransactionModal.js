import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Modal, Paper, InputLabel, Input, Button } from '@material-ui/core'
import { bool, func } from 'prop-types'
import CreateTransaction from '../../../gql/mutations/createTransaction.gql'
import GetDropdownOptions from '../../../gql/queries/getDropdownOptions.gql'
import { Dropdown } from '../../TxTable/tableInputs/Dropdown'
import { TypeDropdown } from '../../TxTable/tableInputs/TypeDropdown'
import globalStyles from '../../../style/globalStyles'
import GetTransactionsWithInfo from '../../../gql/queries/getTransactionsWithInfo.gql'

const { spacer, dropdown, input, largeModal, modal, submitButton } = globalStyles

export const NewTransactionModal = ({ open, closeFn }) => {
  const { loading, error, data } = useQuery(GetDropdownOptions)
  const [createTransaction] = useMutation(CreateTransaction, {
    update (
      cache,
      {
        data: { createTransaction }
      }
    ) {
      const { transactions } = cache.readQuery({ query: GetTransactionsWithInfo })
      cache.writeQuery({
        query: GetTransactionsWithInfo,
        data: { transactions: transactions.concat([createTransaction]) }
      })
    }
  })

  const [userId, setUserId] = useState(null)
  const [amount, setAmount] = useState('')
  const [credit, setCredit] = useState(false)
  const [debit, setDebit] = useState(true)
  const [description, setDescription] = useState('')
  const [merchantId, setMerchantId] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedMerchant, setSelectedMerchant] = useState(null)
  const [reload, toggleReload] = useState(true)

  const [merchants, setMerchants] = useState(null)
  const [users, setUsers] = useState(null)

  const tx = { isEditMode: true }

  useEffect(() => {
    const { users: rawUsers, merchants: rawMerchants } = data
    const formattedUsers = rawUsers.map(user => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.firstName + ' ' + user.lastName,
        id: user.id
      }
    })

    setMerchants(rawMerchants)
    setUsers(formattedUsers)

    // Set initial values
    setSelectedUser(formattedUsers[0].name)
    setSelectedMerchant(rawMerchants[0].name)
    setUserId(formattedUsers[0].id)
    setMerchantId(rawMerchants[0].id)
  }, [data, reload])

  const onSubmit = () => {
    console.log('userId: ', userId)
    if (
      userId != null &&
      amount !== '' &&
      credit != null &&
      debit != null &&
      description !== '' &&
      merchantId != null
    ) {
      createTransaction({
        variables: { user_id: userId, amount: parseFloat(amount), credit, debit, description, merchant_id: merchantId }
      })
      setUserId(null)
      setAmount('')
      setCredit(false)
      setDebit(true)
      setDescription('')
      setMerchantId(null)
      toggleReload(!reload)
      closeFn()
    } else {
      console.log('Cannot create transaction: contains null values')
    }
  }

  const onTypeChange = (edit, _tx) => {
    const { value } = edit.target
    if (value === 'Credit') {
      setCredit(true)
      setDebit(false)
    } else {
      setCredit(false)
      setDebit(true)
    }
  }

  const onUserChange = (_tx, option) => {
    setUserId(option.id)
    setSelectedUser(option.name)
  }

  const onMerchantChange = (_tx, option) => {
    setMerchantId(option.id)
    setSelectedMerchant(option.name)
  }

  if (loading) {
    return (
      <Modal
        aria-describedby='modal-modal-description'
        aria-labelledby='modal-modal-title'
        onClose={closeFn}
        open={open}
      >
        <Paper css={modal}>
          <h3>Loading...</h3>
        </Paper>
      </Modal>
    )
  }

  if (error) {
    return (
      <Modal
        aria-describedby='modal-modal-description'
        aria-labelledby='modal-modal-title'
        onClose={closeFn}
        open={open}
      >
        <Paper css={modal}>
          <h3>Error</h3>
          <h2>Please try again</h2>
        </Paper>
      </Modal>
    )
  }

  return (
    <Modal aria-describedby='modal-modal-description' aria-labelledby='modal-modal-title' onClose={closeFn} open={open}>
      <Paper css={largeModal}>
        <h3>Create Transaction:</h3>

        <InputLabel>Purchaser</InputLabel>
        <Dropdown
          css={dropdown}
          {...{ tx, name: 'user', options: users, selectedVal: selectedUser, onChange: onUserChange }}
        />
        <div css={spacer} />
        <InputLabel>Merchant</InputLabel>
        <Dropdown
          css={dropdown}
          {...{ tx, name: 'merchant', options: merchants, selectedVal: selectedMerchant, onChange: onMerchantChange }}
        />
        <div css={spacer} />
        <InputLabel>Amount (in dollars)</InputLabel>
        <Input
          css={input}
          // name={name}
          onChange={e => {
            setAmount(e.target.value)
          }}
          value={amount}
        />
        <InputLabel>Type</InputLabel>
        <TypeDropdown css={dropdown} {...{ tx, name: 'type', debit, credit, onTypeChange }} />
        <div css={spacer} />
        <InputLabel>Description</InputLabel>
        <Input
          css={input}
          onChange={e => {
            setDescription(e.target.value)
          }}
          // name={name}
          value={description}
        />

        <div css={submitButton}>
          <Button onClick={onSubmit} variant='contained'>
            Create
          </Button>
        </div>
      </Paper>
    </Modal>
  )
}

NewTransactionModal.propTypes = {
  open: bool,
  closeFn: func,
  refetch: func
}
