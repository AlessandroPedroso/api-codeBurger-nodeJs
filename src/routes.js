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

routes.get('/',(req,res)=>{
    return res.json("My first API")
})

routes.use(authMiddlewares) // será chamado por todas as rotas abaixo

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)
routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.post('/categories', upload.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', upload.single('file'), CategoryController.update)
routes.delete('/categories/:id',CategoryController.delete)

routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)

export default routes
