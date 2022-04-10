import { CreateUserUseCase } from './CreateUserUseCase'
import { Request, Response } from 'express'
class CreateUserController {

  constructor(private createUserUseCase: CreateUserUseCase) { }

  async handle(request: Request, response: Response) {

    const { email } = request.body
    try {
      const createUserResponse = await this.createUserUseCase.execute(email)
      return response.status(201).json(createUserResponse)
    } catch (error) {
      response.status(500).send({
        errrorMessage: error.message
      })
    }
  }
}

export {
  CreateUserController
}