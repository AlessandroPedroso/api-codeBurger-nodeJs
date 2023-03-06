import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/User'

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // console.log(err)
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json()
    }

    const { name } = request.body
    const { filename: path } = request.file

    const categoryExists = await Category.findOne({
      where: { name },
    })

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists' })
    }

    // const category = await Category.create({ name })
    const { id } = await Category.create({ name, path })

    // const newCategory = {
    //   id: category.id,
    //   name: category.name,
    // }

    return response.json({ name, id })
  }

  async index(request, response) {
    const category = await Category.findAll()

    return response.json(category)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // console.log(err)
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json()
    }

    const { name } = request.body

    const { id } = request.params

    const category = await Category.findByPk(id)

    if (!category) {
      return response
        .status(401)
        .json({ error: 'Make sure your category id is correct' })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    // const { filename: path } = request.file

    const categoryExists = await Category.findOne({
      where: { name },
    })

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists' })
    }

    // const category = await Category.create({ name })
    await Category.update({ name, path }, { where: { id } })

    // const newCategory = {
    //   id: category.id,
    //   name: category.name,
    // }

    return response.status(200).json()
  }
}

export default new CategoryController()
