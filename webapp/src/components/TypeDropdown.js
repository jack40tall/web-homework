import React from 'react'
import { Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { string, func, any, bool } from 'prop-types'

const useStyles = makeStyles(theme => ({
  input: {
    width: 130,
    height: 40
  }
}))

export const TypeDropdown = ({ tx, name, debit, credit, onTypeChange }) => {
  const classes = useStyles()
  const { isEditMode } = tx

  let selectedVal
  if (debit) selectedVal = 'Debit'
  else if (credit) selectedVal = 'Credit'

  if (isEditMode) {
    return (
      <Select
        className={classes.input}
        name={name}
        onChange={e => onTypeChange(e, tx)}
        value={selectedVal}
      >
        <MenuItem value={'Debit'}>Debit</MenuItem>
        <MenuItem value={'Credit'}>Credit</MenuItem>
      </Select>
    )
  }
  return selectedVal
}

TypeDropdown.propTypes = {
  tx: any,
  name: string,
  debit: bool,
  credit: bool,
  onTypeChange: func
}
