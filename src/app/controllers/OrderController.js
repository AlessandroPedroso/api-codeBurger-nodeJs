import * as Yup from 'yup'
import Product from '../models/Products'
import Category from '../models/Category'
import Order from '../schemas/Order'

class OrderController {
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        ),
    })

    console.log(request)

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // console.log(err)
      return response.status(400).json({ error: err.errors })
    }

    const productsId = request.body.products.map((product) => product.id)

    console.log(productsId)

    const UpdateProducts = await Product.findAll({
      where: {
        id: productsId,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    })

    const editedProduct = UpdateProducts.map((product) => {
      const productIndex = request.body.products.findIndex(
        (requestProducts) => requestProducts.id === product.id
      )

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: request.body.products[productIndex].quantity,
      }

      return newProduct
    })

    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: editedProduct,
      status: 'Pedido Realizado',
    }

    const orderResponse = await Order.create(order)

    return response.status(201).json(orderResponse)
  }

  async index(request, response) {
    const orders = await Order.find()

    return response.json(orders)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // console.log(err)
      return response.status(400).json({ error: err.errors })
    }

    const { id } = request.params
    const { status } = request.body

    try {
      if (isNaN(status)) {
        // update utilizando mongoDb
        await Order.updateOne({ _id: id }, { status })
      } else {
        return response
          .status(400)
          .json({ message: 'Status not accept Integer' })
      }
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
    return response.json({ message: 'Status updated sucess' })
  }
}

export default new OrderController()
