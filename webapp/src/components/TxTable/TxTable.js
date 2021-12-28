import React, { useState, useEffect } from 'react'
import { arrayOf, string, bool, number, shape, any } from 'prop-types'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from '@material-ui/core'
// Icons
import EditIcon from '@material-ui/icons/EditOutlined'
import DoneIcon from '@material-ui/icons/DoneAllTwoTone'
import RevertIcon from '@material-ui/icons/NotInterestedOutlined'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
// Components
import { Dropdown } from './tableInputs/Dropdown'
import { TypeDropdown } from './tableInputs/TypeDropdown'
import { CustomInput } from './tableInputs/CustomInput'
// gql
import { useMutation } from '@apollo/client'
import DeleteTransaction from '../../gql/mutations/deleteTransaction.gql'
import UpdateTransaction from '../../gql/mutations/updateTransaction.gql'
// style
import emotionStyles, { muiStyles } from '../../style/globalStyles'

const { dollarSign, relativeParent, tableHeader } = emotionStyles

export const TxTable = ({ data, dropdownData }) => {
  const classes = muiStyles()

  const [merchants, setMerchants] = useState(null)
  const [users, setUsers] = useState(null)
  const [previous, setPrevious] = useState({})
  const [rows, setRows] = useState(
    data.map(tx => {
      return { ...tx, isEditMode: false }
    })
  )

  const [deleteTransaction] = useMutation(DeleteTransaction)
  const [updateTransaction] = useMutation(UpdateTransaction)

  useEffect(() => {
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

  const onToggleEditMode = id => {
    // prevState prevents race condition
    setRows(prevState => {
      return (
        prevState.map(row => {
          if (row.id === id) {
            return { ...row, isEditMode: !row.isEditMode }
          }
          return row
        }))
    })
  }

  const onChange = (edit, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }))
    }

    const value = edit.target.value
    const name = edit.target.name
    const { id } = row
    const newRows = rows.map(currRow => {
      if (currRow.id === id) {
        return { ...currRow, [name]: value }
      }
      return currRow
    })

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

    setRows(newRows)
  }

  const onUserChange = (tx, option) => {
    if (!previous[tx.id]) {
      setPrevious(state => ({ ...state, [tx.id]: tx }))
    }
    const { id: transactionId } = tx
    const newRows = rows.map(tx => {
      if (tx.id === transactionId) {
        return (
          { ...tx,
            user_id: option.id,
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

    const { id: transactionId } = tx
    const newRows = rows.map(tx => {
      if (tx.id === transactionId) {
        return (
          { ...tx,
            merchant_id: option.id,
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
    const newRowArray = rows.filter(row => row.id === id)
    const newRow = newRowArray[0]
    updateTransaction({
      variables:
        {
          id: newRow.id,
          user_id: newRow.user_id,
          amount: newRow.amount,
          credit: newRow.credit,
          debit: newRow.debit,
          description: newRow.description,
          merchant_id: newRow.merchant_id
        } })
    onToggleEditMode(id)
  }

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row
      }
      return row
    })
    setRows(newRows)
    setPrevious(state => {
      delete state[id]
      return state
    })

    onToggleEditMode(id)
  }

  const onDeleteRow = id => {
    deleteTransaction({ variables: { id } })
    const newRows = rows.filter(row => row.id !== id)
    setRows(newRows)
    setPrevious(newRows)
  }

  return (
    <>
      <Paper className={classes.root}>
        <Table aria-label='caption table' className={classes.table}>
          <TableHead css={tableHeader} >
            <TableRow>
              <TableCell align='left' className='tableHeader' />
              <TableCell align='left' className='tableHeader'>Transaction ID</TableCell>
              <TableCell align='left' className='tableHeader'>Purchaser</TableCell>
              <TableCell align='left' className='tableHeader'>Merchant</TableCell>
              <TableCell align='left' className='tableHeader'>Description</TableCell>
              <TableCell align='left' className='tableHeader'>Type</TableCell>
              <TableCell align='left' className='tableHeader'>Amount</TableCell>
              <TableCell align='left' className='tableHeader' />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(tx => {
              const { id, user, description, merchant, debit, credit, amount, isEditMode } = tx
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
                  <TableCell align='left' className={classes.tableCell}>
                    <CustomInput {...{ tx, name: 'description', text: description, onChange }} />

                  </TableCell>
                  <TableCell align='left' className={classes.tableCell}>
                    <TypeDropdown {...{ tx, name: 'type', debit, credit, onTypeChange }} />
                  </TableCell>
                  <TableCell align='left' className={classes.tableCell} css={relativeParent}>
                    <div css={dollarSign}>$</div>
                    <CustomInput {...{ tx, name: 'amount', text: `${amount}`, onChange }} />
                  </TableCell>
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
