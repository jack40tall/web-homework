const mockData = [{
  amount: 40,
  credit: false,
  debit: true,
  description: 'Flight to NRT',
  id: '61c3f92383f0a2e3871797d8',
  merchant: { name: 'Southwest' },
  merchant_id: 'merchantId123',
  user: { firstName: 'John', lastName: 'Smith' },
  user_id: 'userId123'
}]

const mockDropdownData = {
  merchants: [{
    id: 'merchantId123',
    name: 'Southwest'
  },
  {
    id: 'merchantId456',
    name: 'Delta'
  }],
  users: [{
    firstName: 'John',
    id: 'userId123',
    lastName: 'Smith'
  },
  {
    firstName: 'Leroy',
    id: 'userId456',
    lastName: 'Jenkins'
  }]
}

export { mockData, mockDropdownData }
