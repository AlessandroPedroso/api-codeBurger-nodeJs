import Sequelize from 'sequelize'

import User from '../app/models/User.js'
import Products from '../app/models/Products.js'
import condigDatabase from '../config/database.js'

const models = [User, Products]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(condigDatabase)

    models.map((model) => model.init(this.connection))
  }
}

export default new Database()
