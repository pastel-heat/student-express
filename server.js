let express = require('express')
let api_routes = require('./routes/api')
let path = require('path')

// create and configure app to handle json requests properly
let app = express()

let vueClientPath = path.join(__dirname, 'student-client', 'dist')

app.use(express.static(vueClientPath))

app.use(express.json())

app.use('/api', api_routes)

// respond with 404 to any invalid reqs
app.use(function(req, res, next) {
    res.status(404).send('Not found')
})

// error handling
app.use(function(error, req, res, next) {
    console.error(err.stack)
    res.status(500).send('server error')
})

// start server
let server = app.listen(process.env.PORT || 3000, () => {
    console.log("Express server running on port " + server.address().port )
})

