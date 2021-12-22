import React from 'react'
import { Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// eslint-disable-next-line no-unused-vars
import { arrayOf, string, func, any } from 'prop-types'

const useStyles = makeStyles(theme => ({
  input: {
    width: 130,
    height: 40
  }
}))

export const Dropdown = ({ tx, name, options, selectedVal, onChange }) => {
  const classes = useStyles()
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
