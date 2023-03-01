import * as Yup from 'yup'
import Product from '../models/Products'
import Category from '../models/Category'

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // console.log(err)
      return response.status(400).json({ error: err.errors })
    }

    const { filename: path } = request.file
    const { name, price, category_id } = request.body
    // console.log(file)
    const product = await Product.create({
      name,
      price,
      category_id,
      path,
    })
    return response.json(product)
  }

  async index(request, response) {
    const product = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    })

    console.log('id: ' + request.userId)
    return response.json(product)
  }
}

export default new ProductController()
