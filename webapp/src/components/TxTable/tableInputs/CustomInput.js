import React from 'react'
import { Input } from '@material-ui/core'
import { muiStyles } from '../../../style/globalStyles'
import { string, func, any } from 'prop-types'

export const CustomInput = ({ tx, name, text, onChange }) => {
  const classes = muiStyles()
  const { isEditMode } = tx

  if (isEditMode) {
    return (
      <Input
        className={classes.input}
        name={name}
        onChange={e => onChange(e, tx)}
        value={text}
      />
    )
  }
  return text
}

CustomInput.propTypes = {
  tx: any,
  name: string,
  text: string,
  onChange: func
}
