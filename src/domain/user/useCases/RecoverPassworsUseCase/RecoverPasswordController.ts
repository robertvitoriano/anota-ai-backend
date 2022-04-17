import { Response, Request } from 'express'
import { RecoverPasswordUseCase } from './RecoverPasswordUseCase'

class RecoverPasswordController {

  constructor(private recoverPasswordUseCase: RecoverPasswordUseCase) { }

  async handle(request: Request, response: Response):Promise<Response> {

    const { password, email } = request.body

    try {
      await this.recoverPasswordUseCase.execute({password, email})

      return response.status(201).json();
    } catch (error) {
      response.status(500).send({
        errorMessage: error.message
      })
    }
  }
}

export {
  RecoverPasswordController
}