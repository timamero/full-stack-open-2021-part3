require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
var morgan = require('morgan')

const Person = require('./models/persons')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// persons = [
//     { 
//         "id": 1,
//         "name": "Arto Hellas", 
//         "number": "040-123456"
//     },
//     { 
//         "id": 2,
//         "name": "Ada Lovelace", 
//         "number": "39-44-5323523"
//     },
//     { 
//         "id": 3,
//         "name": "Dan Abramov", 
//         "number": "12-43-234345"
//     },
//     { 
//         "id": 4,
//         "name": "Mary Poppendieck", 
//         "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            console.log('length', persons.length)
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
               response.json(person) 
            } else {
                response.status(404).end()
            } 
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const name = request.body.name
    const number = request.body.number
    
    if (!name || !number) {
        return response.status(400).json({
            error: 'name and number are required'
        })
    }

    const person = new Person({ 
        name, 
        number
     })
    
    person.save()
        .then(newPerson => {
            response.json(newPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.find({})
        .then(persons => {
            const numberOfPeople = persons.length
            const message = '<p>Phonebook has info for ' + String(numberOfPeople) + ' people<p>'
            const date = '<p>' + String(Date()) + '</p>'
            response.type('html')
            response.send(message + date)
        }) 
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.log('errorHandler run')
    console.error(error.message) 
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})