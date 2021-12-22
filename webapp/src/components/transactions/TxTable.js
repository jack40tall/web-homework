import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { arrayOf, string, bool, number, shape, func, object, any, objectOf } from 'prop-types'
// import { css } from '@emotion/core'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/client'
// eslint-disable-next-line no-unused-vars
import { Table, TableBody, TableCell, TableHead, TableRow, Input, Select, Paper, IconButton, MenuItem, Button, Modal, Typography, Box, InputLabel } from '@material-ui/core'
// Icons
import EditIcon from '@material-ui/icons/EditOutlined'
import DoneIcon from '@material-ui/icons/DoneAllTwoTone'
import RevertIcon from '@material-ui/icons/NotInterestedOutlined'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
// eslint-disable-next-line no-unused-vars
import { Dropdown } from '../Dropdown'
import { TypeDropdown } from '../TypeDropdown'
// import GetDropdownOptions from '../../gql/queries/getDropdownOptions.gql'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  },
  deleteCell: {
    width: 60
  }
}))

const CustomTableCell = ({ tx, name, text, onChange }) => {
  const classes = useStyles()
  const { isEditMode } = tx

  return (
    <TableCell align='left' className={classes.tableCell}>
      {name === 'amount' ? '$ ' : ''}
      {isEditMode ? (
        <Input
          className={classes.input}
          name={name}
          onChange={e => onChange(e, tx)}
          value={text}
        />
      ) : (
        text
      )}
    </TableCell>
  )
}

CustomTableCell.propTypes = {
  tx: any,
  name: string,
  text: string,
  onChange: func
}

export const TxTable = ({ data, dropdownData }) => {
  const [merchants, setMerchants] = useState(null)
  const [users, setUsers] = useState(null)

  const [] = useMutation()

  useEffect(() => {
    console.log('dropdwon: ', dropdownData)
    const { users: rawUsers, merchants: rawMerchants } = dropdownData
    setMerchants(rawMerchants)
    const formattedUsers = rawUsers.map(user => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.firstName + ' ' + user.lastName,
        id: user.id
      }
    })
    setUsers(formattedUsers)
  }, [dropdownData])

  // // eslint-disable-next-line no-unused-vars
  // const [merchants, setMerchants] = useState({})
  // // eslint-disable-next-line no-unused-vars
  // const [users, setUsers] = useState({})

  console.log('dropdownData: ', dropdownData)
  console.log('users: ', users)
  const [rows, setRows] = useState(
    data.map(tx => {
      return { ...tx, isEditMode: false }
    })
  )

  const [previous, setPrevious] = useState({})
  const classes = useStyles()

  const onToggleEditMode = id => {
    console.log('onToggleEditMode')

    // Prevents race condition
    setRows(prevState => {
      return (
        prevState.map(row => {
          if (row.id === id) {
            return { ...row, isEditMode: !row.isEditMode }
          }
          return row
        }))
    }
    )
  }

  const onChange = (edit, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }))
    }
    console.log('Previous', previous, ' row: ', row, ' edit.target.value: ', edit.target.value)
    const value = edit.target.value
    const name = edit.target.name
    const { id } = row
    const newRows = rows.map(currRow => {
      if (currRow.id === id) {
        return { ...currRow, [name]: value }
      }
      return currRow
    })
    console.log('onChange')

    setRows(newRows)
  }

  const onTypeChange = (edit, tx) => {
    if (!previous[tx.id]) {
      setPrevious(state => ({ ...state, [tx.id]: tx }))
    }
    const { value } = edit.target
    const { id } = tx
    const newRows = rows.map(tx => {
      if (tx.id === id) {
        return (
          value === 'Credit' ? { ...tx, credit: true, debit: false }
            : { ...tx, credit: false, debit: true }
        )
      }
      return tx
    })
    console.log('TypeChange')

    setRows(newRows)
  }

  const onUserChange = (tx, option) => {
    if (!previous[tx.id]) {
      setPrevious(state => ({ ...state, [tx.id]: tx }))
    }
    const { id } = tx
    const newRows = rows.map(tx => {
      if (tx.id === id) {
        return (
          { ...tx,
            user: {
              id: option.id,
              firstName: option.firstName,
              lastName: option.lastName
            } }
        )
      }
      return tx
    })

    setRows(newRows)
  }

  const onMerchantChange = (tx, option) => {
    if (!previous[tx.id]) {
      setPrevious(state => ({ ...state, [tx.id]: tx }))
    }

    const { id } = tx
    const newRows = rows.map(tx => {
      if (tx.id === id) {
        return (
          { ...tx,
            merchant: {
              id: option.id,
              name: option.name
            } }
        )
      }
      return tx
    })

    setRows(newRows)
  }

  const onConfirmEdit = id => {
    onToggleEditMode(id)
  }

  const onRevert = id => {
    console.log('previous: ', previous['61b953f649cf053bd07e6e06'])
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row
      }
      return row
    })
    console.log('newRows: ', newRows)
    setRows(newRows)
    setPrevious(state => {
      delete state[id]
      return state
    })

    onToggleEditMode(id)
  }

  const onDeleteRow = id => {
    const newRows = rows.map(row => {
      if (row.id !== id) {
        return row
      }
    })
    console.log('newRows: ', newRows)
    setRows(newRows)
    setPrevious(state => {
      delete state[id]
      return state
    })

    onToggleEditMode(id)
  }

  return (
    <>

      <Paper className={classes.root}>

        <Table aria-label='caption table' className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align='left' />
              <TableCell align='left'>Transaction ID</TableCell>
              <TableCell align='left'>Purchaser</TableCell>
              <TableCell align='left'>Merchant</TableCell>
              <TableCell align='left'>Description</TableCell>
              <TableCell align='left'>Type</TableCell>
              <TableCell align='left'>Amount</TableCell>
              <TableCell align='left' />

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(tx => {
            // eslint-disable-next-line no-unused-vars
              const { id, user_id: userId, user, description, merchant_id: merchantId, merchant, debit, credit, amount, isEditMode } = tx
              const fullName = `${user.firstName} ${user.lastName}`
              return (
                <TableRow data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                  <TableCell className={classes.selectTableCell}>
                    {isEditMode ? (
                      <>
                        <IconButton
                          aria-label='done'
                          onClick={() => onConfirmEdit(id)}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton
                          aria-label='revert'
                          onClick={() => onRevert(id)}
                        >
                          <RevertIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        aria-label='edit'
                        onClick={() => onToggleEditMode(id)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell align='left' className={classes.tableCell}>
                    {id}
                  </TableCell>
                  <TableCell align='left' className={classes.tableCell}>
                    <Dropdown {...{ tx, name: 'user_id', options: users, selectedVal: fullName, onChange: onUserChange }} />
                  </TableCell>
                  <TableCell align='left' className={classes.tableCell}>
                    <Dropdown {...{ tx, name: 'merchant', options: merchants, selectedVal: merchant.name, onChange: onMerchantChange }} />
                  </TableCell>
                  <CustomTableCell {...{ tx, name: 'description', text: description, onChange }} />
                  <TableCell align='left' className={classes.tableCell}>
                    <TypeDropdown {...{ tx, name: 'type', debit, credit, onTypeChange }} />
                  </TableCell>
                  <CustomTableCell {...{ tx, name: 'amount', text: `${amount}`, onChange }} />
                  <TableCell className={classes.deleteCell}>
                    {isEditMode ? (
                      <IconButton
                        aria-label='delete'
                        onClick={() => onDeleteRow(id)}
                      >
                        <DeleteOutline />
                      </IconButton>

                    ) : ''}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}

// const styles = css`
//  .header {
//    font-weight: bold;
//  }
// `

// const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

// export function TxTable ({ data }) {
//   return (
//     <table css={styles}>
//       <tbody>
//         <tr className='header'>
//           <td >ID</td>
//           <td >User ID</td>
//           <td >Description</td>
//           <td >Merchant ID</td>
//           <td >Debit</td>
//           <td >Credit</td>
//           <td >Amount</td>
//         </tr>
//         {
//           data.map(tx => {
//             const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
//             return (
//               <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
//                 <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
//                 <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
//                 <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
//                 <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
//                 <td data-testid={makeDataTestId(id, 'debit')}>{debit ? 'true' : 'false'}</td>
//                 <td data-testid={makeDataTestId(id, 'credit')}>{credit ? 'true' : 'false'}</td>
//                 <td data-testid={makeDataTestId(id, 'amount')}>{amount}</td>
//               </tr>
//             )
//           })
//         }
//       </tbody>
//     </table>

//   )
// }

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  })),
  dropdownData: any
}
