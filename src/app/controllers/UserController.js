/* 
    store  => Cadastrar/adicionar
    index  => Listar vários
    show   => Listar apenas UM
    update => Atualizar
    delete => Deletar
*/
import { v4 } from 'uuid'
import User from '../models/User'
import * as Yup from 'yup'

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    })

    // if (!(await schema.isValid(request.body))) {
    //   return response
    //     .status(400)
    //     .json({ error: 'certifique-se de que seus dados estão corretos' })
    // }

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // console.log(err)
      return response.status(400).json({ error: err.errors })
    }

    const { name, email, password, admin } = request.body

    const userExist = await User.findOne({
      where: { email },
    })

    if (userExist) {
      return response.status(409).json({ error: 'E-mail já cadastrado! Faça o login para continuar' })
    }

    // const user = {
    //   id: v4(),
    //   name,
    //   email,
    //   password_hash,
    //   admin,
    // }

    // await User.create(user)

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    })

    return response.status(201).json({ id: user.id, name, email })
  }
}

export default new UserController()
