import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Modal, Paper, InputLabel, Input, Button } from '@material-ui/core'
import { bool, func } from 'prop-types'
import CreateUser from '../../../gql/mutations/createUser.gql'
import globalStyles from '../../../style/globalStyles'

const { input, modal, submitButton } = globalStyles

export const NewUserModal = ({ open, closeFn }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [createUser] = useMutation(CreateUser)

  const onSubmit = () => {
    if (firstName != null && lastName != null && birthDate != null) {
      createUser({ variables: { firstName, lastName, dob: birthDate } })
      setFirstName('')
      setLastName('')
      setBirthDate('')
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
        <h3>Add New User:</h3>
        <InputLabel>First Name</InputLabel>
        <Input
          css={input}
          onChange={e => { setFirstName(e.target.value) }}
          value={firstName}
        />
        <InputLabel>Last Name</InputLabel>
        <Input
          css={input}
          onChange={e => { setLastName(e.target.value) }}
          value={lastName}
        />
        <InputLabel>Date of Birth</InputLabel>
        <Input
          css={input}
          onChange={e => { setBirthDate(e.target.value) }}
          placeholder='MM/DD/YYYY'
          value={birthDate}
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

NewUserModal.propTypes = {
  open: bool,
  closeFn: func
}
