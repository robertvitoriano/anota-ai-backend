import { Response, Request } from 'express'
import { BeginPasswordRecoveryUseCase } from './BeginPasswordRecoveryUseCase'

class BeginPasswordRecoveryController {

  constructor(private beginPasswordRecoveryUseCase: BeginPasswordRecoveryUseCase) { }

  async handle(request: Request, response: Response):Promise<Response> {

    const { email } = request.body

    try {
      await this.beginPasswordRecoveryUseCase.execute({email})

      return response.status(201).json({message:  'password recovery started'});
    } catch (error) {
      response.status(500).send({
        errorMessage: error.message
      })
    }
  }
}

export {
  BeginPasswordRecoveryController
}