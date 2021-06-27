const  truncate  =  require('../utils/truncate')

const {User} = require('./../../src/models')

const app = require('./../../src/app')

const request = require('supertest')


describe('Authentication', () => {
  beforeEach(async () => {
      await truncate()
  });

  it('should not be able to authenticate without email confirmation', async()=>{
     const user  = await User.create({name:'Robert da Silva Vitoriano', password:'123', email:'robertvitoriano@gmail.com', username:'robertvitoriano'})

     console.log('USER ', user)

     const response = await request(app)
       .post('/users/login')
       .send({email:user.email, password:'123'})


       expect(response.status).toBe(500)



  });

});

