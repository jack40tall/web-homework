import React from 'react'
import { Select, MenuItem } from '@material-ui/core'
import { string, func, any, object } from 'prop-types'
import { muiStyles } from '../../../style/globalStyles'

export const Dropdown = ({ tx, options, selectedVal, onChange }) => {
  const classes = muiStyles()

  return (
    <Select
      className={classes.input}
      onChange={e => onChange(tx, options.find(option => option.name === e.target.value)
      )}
      value={selectedVal}
    >
      {options.map((option) => {
        return (
          <MenuItem key={option.id} value={option.name}>{option.name}</MenuItem>
        )
      })}
    </Select>
  )
}

Dropdown.propTypes = {
  tx: object,
  options: any,
  selectedVal: string,
  onChange: func
}
