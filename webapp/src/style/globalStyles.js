import { css } from '@emotion/core'

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

export default {
  spacer,
  dropdown,
  input,
  largeModal,
  modal,
  submitButton
}
