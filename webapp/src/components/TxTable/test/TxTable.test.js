import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TxTable } from '../TxTable'
// Import mocks
import { MockedProvider } from '@apollo/client/testing'
import { mockData as data, mockDropdownData as dropdownData } from '../../../../mocks/transactions-data'
import { mocks } from '../../../../mocks/gqlMocks'

describe('Transactions Table', () => {
  // eslint-disable-next-line react/prop-types
  const mockedProvider = ({ children }) => <MockedProvider addTypename={false} mocks={mocks}>{children}</MockedProvider>

  it('should display correct table headers', () => {
    render(<TxTable data={data} dropdownData={dropdownData} />, { wrapper: mockedProvider })
    const transactionId = screen.getByRole('columnheader', { name: /transaction id/i })
    const purchaser = screen.getByRole('columnheader', { name: /purchaser/i })
    const merchant = screen.getByRole('columnheader', { name: /merchant/i })
    const description = screen.getByRole('columnheader', { name: /description/i })
    const transactionType = screen.getByRole('columnheader', { name: /type/i })
    const amount = screen.getByRole('columnheader', { name: /amount/i })

    expect(transactionId).toBeInTheDocument()
    expect(purchaser).toBeInTheDocument()
    expect(merchant).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(transactionType).toBeInTheDocument()
    expect(amount).toBeInTheDocument()
  })

  it('should render first row of mock data correctly', () => {
    render(<TxTable data={data} dropdownData={dropdownData} />, { wrapper: mockedProvider })
    const { id, user: { firstName, lastName }, merchant: { name: merchantName }, description, debit, amount } = data[0]
    const fullName = firstName + ' ' + lastName

    const transactionId = screen.getByRole('cell', { name: id })
    expect(transactionId).toBeInTheDocument()

    const purchaser = screen.getByRole('cell', { name: fullName })
    expect(purchaser).toBeInTheDocument()

    const merchant = screen.getByRole('cell', { name: merchantName })
    expect(merchant).toBeInTheDocument()

    const descriptionText = screen.getByRole('cell', { name: description })
    expect(descriptionText).toBeInTheDocument()

    const transactionType = screen.getByRole('cell', { name: `${debit ? 'Debit' : 'Credit'}` })
    expect(transactionType).toBeInTheDocument()

    const amountText = screen.getByRole('cell', { name: `$ ${amount}` })
    expect(amountText).toBeInTheDocument()
  })

  it('should show correct dropdown options when users and merchants dropdowns are clicked', () => {
    render(<TxTable data={data} dropdownData={dropdownData} />, { wrapper: mockedProvider })
    // First purchaser option
    const { firstName: firstNameOne, lastName: lastNameOne } = dropdownData.users[0]
    const fullNameOne = `${firstNameOne} ${lastNameOne}`
    // Second purchaser option
    const { firstName: firstNameTwo, lastName: lastNameTwo } = dropdownData.users[1]
    const fullNameTwo = `${firstNameTwo} ${lastNameTwo}`
    // First merchant option
    const { name: merchantNameOne } = dropdownData.merchants[0]
    // Second merchant option
    const { name: merchantNameTwo } = dropdownData.merchants[1]

    // let secondMerchOption = queryByRole()
    // Click edit
    const editButton = screen.getByRole('button', { name: /edit/i })
    userEvent.click(editButton)
    screen.debug()

    // Click purchaser dropdown
    const purchaserDropdown = screen.getByRole('button', { name: fullNameOne })
    expect(purchaserDropdown).toHaveTextContent(fullNameOne)
    userEvent.click(purchaserDropdown)

    // Select second option
    const purchaserOptionTwo = screen.getByRole('option', { name: fullNameTwo })
    userEvent.click(purchaserOptionTwo)

    // Assert change
    expect(purchaserDropdown).toHaveTextContent(fullNameTwo)

    // Click merchant dropdown
    const merchantDropdown = screen.getByRole('button', { name: merchantNameOne })
    expect(merchantDropdown).toHaveTextContent(merchantNameOne)
    userEvent.click(merchantDropdown)

    // Select second option
    const merchantOptionTwo = screen.getByRole('option', { name: merchantNameTwo })
    userEvent.click(merchantOptionTwo)

    // Assert change
    expect(merchantDropdown).toHaveTextContent(merchantNameTwo)

    // Click confirm edit
    const confirmEditButton = screen.getByRole('button', { name: 'done' })
    userEvent.click(confirmEditButton)

    // Assert changes
  })
})
