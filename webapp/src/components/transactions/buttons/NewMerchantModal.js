import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Modal, Paper, InputLabel, Input, Button } from '@material-ui/core'
import { bool, func } from 'prop-types'
import CreateMerchant from '../../../gql/mutations/createMerchant.gql'
import GetDropdownOptions from '../../../gql/queries/getDropdownOptions.gql'
import globalStyles from '../../../style/globalStyles'

const { input, modal, submitButton } = globalStyles

export const NewMerchantModal = ({ open, closeFn }) => {
  const [name, setName] = useState('')
  const [createMerchant] = useMutation(CreateMerchant, {
    update (
      cache,
      {
        data: { createMerchant }
      }
    ) {
      const { merchants } = cache.readQuery({ query: GetDropdownOptions })
      cache.writeQuery({
        query: GetDropdownOptions,
        data: { merchants: merchants.concat([createMerchant]) }
      })
    }
  })

  const onSubmit = () => {
    if (name != null) {
      createMerchant({ variables: { name } })
      setName('')
      closeFn()
    }
  }

  return (
    <Modal
      aria-describedby='modal-modal-description'
      aria-labelledby='modal-modal-title'
      onClose={closeFn}
      open={open}
    >

      <Paper css={modal}>
        <h3>Add New Merchant:</h3>
        <InputLabel>Merchant Name</InputLabel>
        <Input
          css={input}
          onChange={e => { setName(e.target.value) }}
          value={name}
        />

        <div
          css={submitButton}>
          <Button
            onClick={onSubmit} variant='contained'>Create</Button>
        </div>
      </Paper>
    </Modal>
  )
}

NewMerchantModal.propTypes = {
  open: bool,
  closeFn: func
}
