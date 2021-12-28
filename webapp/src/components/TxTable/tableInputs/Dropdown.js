import React from 'react'
import { Select, MenuItem } from '@material-ui/core'
import { string, func, any } from 'prop-types'
import { muiStyles } from '../../../style/globalStyles'

export const Dropdown = ({ tx, name, options, selectedVal, onChange }) => {
  const classes = muiStyles()
  const { isEditMode } = tx
  let index = -1
  let selectedIndex

  let currIndex = 0
  isEditMode && options.every(option => {
    if (option.name === selectedVal) {
      selectedIndex = currIndex
      return false
    }
    currIndex += 1
    return true
  })

  if (isEditMode) {
    return (
      <Select
        className={classes.input}
        name={name}
        onChange={e => onChange(tx, options[e.target.value])}
        value={selectedIndex}
      >
        {options.map(option => {
          index += 1
          return (
            <MenuItem key={option.id} value={index}>{option.name}</MenuItem>
          )
        })}
      </Select>
    )
  }
  return selectedVal
}

Dropdown.propTypes = {
  tx: any,
  name: string,
  options: any,
  selectedVal: string,
  onChange: func
}
