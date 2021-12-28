import { css } from '@emotion/core'
import { makeStyles } from '@material-ui/core/styles'

const layoutStyle = css`
  display: grid;
  grid-row-gap: 24px;
`

const navStyle = css`
  padding: 8px;
  height: 80px;
  background: #fdfdfd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-row: 1;
  border-bottom: 1px solid grey;

  #brand {
    width: 100px;
    font-size: 2em;
    padding-left: 40px;
    color: #2f2f2f;
  }

  .spacer {
    width: 140px;
  }

  & > ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
  }

  & > ul > li > a {
    font-size: 1.3em;
    position: relative;
    text-decoration: none;
    padding 0 3px;
    margin: 0 20px;
    height: 100%;
    cursor: pointer;
    color: #2f2f2f;
    transition: color 0.2s ease-in;
  }

  a:hover {
    color: #2255BD;
  }

  a::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #2255BD;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  a:hover::before {
    transform: scaleX(1);
  }

  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }

  .active {
    color: #2255BD;
  }
`

const contentStyle = css`
  grid-row: 2;
  padding: 8px;
`

const createButton = css`
  margin: 0px 10px !important;
  padding: 6px 26px !important;
  background-color: #2f2f2f !important;
  color: #fdfdfd !important;
  `

const createHeader = css`
  margin: 0px 10px 0 0;
  `

const dollarSign = css`
  position: absolute;
  top: 39%;
  left: 0px;`

const centerStyle = css`
  text-align: center;`

const flexCenter = css`
  display: flex;
  align-items: center;`

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
  layoutStyle,
  navStyle,
  contentStyle,
  spacer,
  dropdown,
  input,
  largeModal,
  modal,
  submitButton,
  dollarSign,
  relativeParent,
  tableHeader,
  centerStyle,
  flexCenter,
  createButton,
  createHeader
}
