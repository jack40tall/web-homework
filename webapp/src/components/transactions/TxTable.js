import React from 'react'
// eslint-disable-next-line no-unused-vars
import { arrayOf, string, bool, number, shape, func, object, any, objectOf } from 'prop-types'
import { css } from '@emotion/core'
import { makeStyles } from '@material-ui/core/styles'
// eslint-disable-next-line no-unused-vars
import { Table, TableBody, TableCell, TableHead, TableRow, Input, Select, Paper, IconButton, MenuItem, Button } from '@material-ui/core'
// Icons
import EditIcon from '@material-ui/icons/EditOutlined'
import DoneIcon from '@material-ui/icons/DoneAllTwoTone'
import RevertIcon from '@material-ui/icons/NotInterestedOutlined'

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
  }
}))

const CustomTableCell = ({ tx, name, text, onChange }) => {
  const classes = useStyles()
  const { isEditMode } = tx

  return (
    <TableCell align='left' className={classes.tableCell}>
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

const DropdownTableCell = ({ tx, name, debit, credit, onDropdownChange }) => {
  const classes = useStyles()
  const { isEditMode } = tx

  let selectedVal
  if (debit) selectedVal = 'Debit'
  else if (credit) selectedVal = 'Credit'
  else selectedVal = 'Other'

  return (
    <TableCell align='left' className={classes.tableCell}>
      {isEditMode ? (
        <Select
          className={classes.input}
          name={name}
          onChange={e => onDropdownChange(e, tx)}
          value={selectedVal}
        >
          <MenuItem value={'Debit'}>Debit</MenuItem>
          <MenuItem value={'Credit'}>Credit</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </Select>
      ) : (
        selectedVal
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

DropdownTableCell.propTypes = {
  tx: any,
  name: string,
  debit: bool,
  credit: bool,
  onDropdownChange: func
}

export const TxTable = ({ data }) => {
  const [rows, setRows] = React.useState(
    data.map(tx => {
      return { ...tx, isEditMode: false }
    })
  )

  const [previous, setPrevious] = React.useState({})
  const classes = useStyles()

  const onToggleEditMode = id => {
    setRows(
      rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode }
        }
        return row
      })
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
    setRows(newRows)
  }

  const onDropdownChange = (edit, tx) => {
    if (!previous[tx.id]) {
      setPrevious(state => ({ ...state, [tx.id]: tx }))
    }
    const { value, name } = edit.target
    const { id } = tx
    const newRows = rows.map(tx => {
      if (tx.id === id) {
        return { ...tx, [name]: value }
      }
      return tx
    })
    setRows(newRows)
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

  return (
    <>
      <div css={css`{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            // border: 1px solid red;
            // width: 600px;
            }`}>
        <h1>Create: </h1>
        <Button variant='outlined'>Merchant</Button>
        <Button variant='outlined'>User</Button>
        <Button variant='outlined'>Transaction</Button>
      </div>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(tx => {
            // eslint-disable-next-line no-unused-vars
              const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount, isEditMode } = tx
              return (
                <TableRow data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                  <TableCell className={classes.selectTableCell}>
                    {isEditMode ? (
                      <>
                        <IconButton
                          aria-label='done'
                          onClick={() => onToggleEditMode(id)}
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
                        aria-label='delete'
                        onClick={() => onToggleEditMode(id)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell align='left' className={classes.tableCell}>
                    {id}
                  </TableCell>
                  <CustomTableCell {...{ tx, name: 'id', text: id, onChange }} />
                  <CustomTableCell {...{ tx, name: 'user_id', text: userId, onChange }} />
                  <CustomTableCell {...{ tx, name: 'merchant_id', text: merchantId, onChange }} />
                  <CustomTableCell {...{ tx, name: 'description', text: description, onChange }} />
                  <DropdownTableCell {...{ tx, name: 'type', debit, credit, onDropdownChange }} />
                  <CustomTableCell {...{ tx, name: 'amount', text: `$${amount}`, onChange }} />
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
  }))
}
