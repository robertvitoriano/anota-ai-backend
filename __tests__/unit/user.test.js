



const truncate = require('../utils/truncate')

const { User } = require('./../../src/models')

const app = require('./../../src/app')

const request = require('supertest')

jest.setTimeout(30000);

describe('user', () => {
  beforeEach(async () => {
    await truncate()
  });

  it('should  be able to create user', async () => {
    const user = await User.create({ name: 'Robert da Silva Vitoriano', password: '123', email: 'robertvitoriano@gmail.com', username: 'robertvitoriano' })

    Object.assign(user, {
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(user).toMatchObject({
        
      confirmed: false,
      receivedEmail: false,
      emailAttempts: 0,
      notesId: [],
      categoriesId: [],
      name: 'Robert da Silva Vitoriano',
      email: 'robertvitoriano@gmail.com',
      username: 'robertvitoriano',
      });

      expect(user.created_at).toBeInstanceOf(Date)

      expect(user.updated_at).toBeInstanceOf(Date)

});


});