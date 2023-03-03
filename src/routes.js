// const {Router} = require('express');
import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import authMiddlewares from './app/middlewares/auth'

import ProductController from './app/controllers/ProductController'
import SessionController from './app/controllers/SessionController'
import UserController from './app/controllers/UserController'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

const upload = multer(multerConfig)
const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddlewares) // será chamado por todas as rotas abaixo

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)

export default routes
