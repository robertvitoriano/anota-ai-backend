import { Request, Response } from "express";
import { FinishSignUpUseCase } from "./FinishSignUpUseCase";

class FinishSignUpController {
  constructor(private finishSignUpUseCase: FinishSignUpUseCase) { }

  public async handle(request: Request, response: Response): Promise<Response> {

    const { name, password, username, email } = request.body

    try {
      await this.finishSignUpUseCase.execute({
        name,
        password,
        username,
        email
      })

      return response.status(201).json({ message: 'Cadastro Finalizado com sucesso' });
    } catch (error) {
      response.status(500).json({ message: error.message })
    }
  }
}

export {
  FinishSignUpController
}