import { css } from '@emotion/core'
import { makeStyles } from '@material-ui/core/styles'

const dollarSign = css`
  position: absolute;
  top: 39%;
  left: 0px;`

const relativeParent = css`
  position: relative;`

const spacer = css`
  height: 30px;`

const dropdown = css`
  width: 300px;
  height: 40px;`

const input = css`
  margin-bottom: 30px;
  width: 300px;
  height: 40px;`

const largeModal = css`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 30px 30px 30px;
  height: 500px;
  width: 400px;
  boxShadow: 24;`

const modal = css`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 30px 30px 30px;
  height: 300px;
  width: 400px;
  boxShadow: 24;`

const submitButton = css`
  position: absolute;
  bottom: 15px;
  right: 15px;`

const tableHeader = css`
  .tableHeader {
    font-weight: bold;
  }`

export const muiStyles = makeStyles(theme => ({
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

export default {
  spacer,
  dropdown,
  input,
  largeModal,
  modal,
  submitButton,
  dollarSign,
  relativeParent,
  tableHeader
}
