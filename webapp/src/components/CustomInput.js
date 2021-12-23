import React from 'react'
import { Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { string, func, any } from 'prop-types'

const useStyles = makeStyles(theme => ({
  input: {
    width: 130,
    height: 40
  }
}))

export const CustomInput = ({ tx, name, text, onChange }) => {
  const classes = useStyles()
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
