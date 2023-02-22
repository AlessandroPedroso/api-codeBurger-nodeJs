import Sequelize from 'sequelize'

import User from '../app/models/User.js'
import condigDatabase from '../config/database.js'

const models = [User]

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
