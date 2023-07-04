import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import User from '../app/models/User.js'
import Products from '../app/models/Products.js'
import condigDatabase from '../config/database.js'
import Category from '../app/models/Category.js'

const models = [User, Products, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(condigDatabase /*'postgresql://postgres:kaCri7BQMW5gkErJRthb@containers-us-west-202.railway.app:6461/railway'*/)

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/codeburger',
      // 'mongodb://mongo:to9gDObPzde2SnCjJKS3@containers-us-west-90.railway.app:8049',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  }
}

export default new Database()
