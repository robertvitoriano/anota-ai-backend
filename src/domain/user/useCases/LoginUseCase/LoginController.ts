import { Response, Request } from 'express'
import { LoginUseCase } from './LoginUseCase'

class LoginController {

  constructor(private loginUseCase: LoginUseCase) { }

  async handle(request: Request, response: Response):Promise<Response> {

    const { username, email, password } = request.body

    try {
      const loginData = await this.loginUseCase.execute({
        username,
        email,
        password
      })

      return response.status(201).json(loginData);
    } catch (error) {
      response.status(500).send({
        errorMessage: error.message
      })
    }
  }
}

export {
  LoginController
}