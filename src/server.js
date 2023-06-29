// //const app = require('./app')
import app from './app'
// const port = 3001

// app.listen(port)

// precisa adicionar dessa maneira para funcionar no railway

const port = process.env.PORT || 3001;

app.listen(port, "0.0.0.0")