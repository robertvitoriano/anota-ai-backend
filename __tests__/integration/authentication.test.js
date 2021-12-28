const truncate = require('../utils/truncate')

const { User } = require('./../../src/models')

const app = require('./../../src/app')

const request = require('supertest')

jest.setTimeout(30000);

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  });

  it('should not be able to authenticate without email confirmation', async () => {
    const user = await User.create({ name: 'Robert da Silva Vitoriano', password: '123', email: 'robertvitoriano@gmail.com', username: 'robertvitoriano' })

    const response = await request(app)
      .post('/users/login')
      .send({ email: user.email, password: '123' })


    expect(response.status).toBe(500)

  });


  it('should not be able to authenticate with invalid credentials', async () => {
    const user = await User.create({ name: 'Robert da Silva Vitoriano', password: '123', email: 'robertvitoriano@gmail.com', username: 'robertvitoriano' })

    user.confirmed = true
    user.receivedEmail = true
    await user.save()

    const response = await request(app)
      .post('/users/login')
      .send({ email: user.email, password: '1234' })


    expect(response.status).toBe(400)

  });


  it('should be able to authenticate after email is confirmed', async () => {
    const user = await User.create({ name: 'Robert da Silva Vitoriano', password: '123', email: 'robertvitoriano@gmail.com', username: 'robertvitoriano' })
    user.confirmed = true
    user.receivedEmail = true
    await user.save()
    const response = await request(app)
      .post('/users/login')
      .send({ email: user.email, password: '123' })

    expect(response.status).toBe(200)
  });

  it('should return a valid token on login ', async () => {
    const user = await User.create({ name: 'Robert da Silva Vitoriano', password: '123', email: 'robertvitoriano@gmail.com', username: 'robertvitoriano' })
    user.confirmed = true
    user.receivedEmail = true
    await user.save()
    const response = await request(app)
      .post('/users/login')
      .send({ email: user.email, password: '123' })



    expect(response.body).toHaveProperty('token')
  });

});