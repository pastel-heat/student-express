let express = require('express')
let db = require('../models')
let Student = db.Student

let router = express.Router()

router.get('/students', function(req, res, next) {
    Student.findAll( {order: ['name']} ).then( students => {
        return res.json(students)
    }).catch(err => next(err))
})

router.post('/students', function(req, res, next) {
    Student.create(req.body).then( data => {
        return res.status(201).send('success')
    }).catch(err => {
        if (err instanceof db.Sequelize.ValidationError) {
            let messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        } 

        return next(err)
    })
})

router.patch('/students/:id', function(req, res, next) {
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update(updatedStudent, { where: {id: studentID} })
        .then( (rowsModified) => {
            let numberOfRowsModified = rowsModified[0]

            if (numberOfRowsModified === 1) {
                return res.send('ok')
            } else {
                return res.status(404).json(['student with specified ID not found'])
            }



        })
        .catch( err => {
            if (err instanceof db.Sequelize.ValidationError) {
                let messages = err.errors.map(e => e.message)
                return res.status(400).json(messages)
            } else {
                return next(err)
            }
        })
}) 

router.delete('/students/:id', function(req, res, next) {
    let studentID = req.params.id
    Student.destroy({ where: {id: studentID} })
        .then( () => {
            return res.send('ok')
        })
        .catch(err => next(err))
})

module.exports = router