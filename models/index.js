let {Sequelize, DataTypes} = require('sequelize')

let env = process.env.NODE_ENV || 'development'

console.log('using environment ' + env)

let configFile = require(__dirname + '/../config.json')

let config = configFile[env]

// password is undefined locally, since we do not need it for development. will need to define for deployment via Azure
let password = process.env.DB_PASSWORD
config.password = password

let db = {}

let sequelize = new Sequelize(config)

let studentModelCreate = require('./student')
let studentModel = studentModelCreate(sequelize, DataTypes)

db[studentModel.name] = studentModel

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db