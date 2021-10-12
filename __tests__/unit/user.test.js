



const truncate = require('../utils/truncate')

const { User } = require('./../../src/models')
const bcrypt = require('bcryptjs')

const app = require('./../../src/app')

const request = require('supertest')

jest.setTimeout(30000);

describe('user', () => {
  beforeEach(async () => {
    await truncate()
  });

  it('should  encrypt user password', async () => {
    const user = await User.create({ name: 'Robert da Silva Vitoriano', password: '123', email: 'robertvitoriano@gmail.com', username: 'robertvitoriano' })

    const isHashValid = await bcrypt.compare('123', user.password)

    expect(isHashValid).toBe(true)
});


});