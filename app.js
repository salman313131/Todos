const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const todo = require('./router/todo')
const completed = require('./router/completed')

const app = express()
app.use(cors())
const sequelize = require('./util/database')

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

app.use('/api/v1/todo',todo)
app.use('/api/v1/completed',completed)

sequelize.sync().then(res=>{
    app.listen(3000)
}).catch(err=>console.log(err))