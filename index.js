const express = require('express')
const app = express()

app.use(express.json())

persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    
})

const generateId = () => Math.floor(Math.random() * 1000)

app.post('/api/persons', (request, response) => {
    const name = request.body.name
    const number = request.body.number
    
    
    if (!name || !number) {
        return response.status(400).json({
            error: 'missing information'
        })
    }

    const person = { 
        id: generateId(),
        name, 
        number
     }
    
    persons = persons.concat(person)
    
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    const numberOfPeople = persons.length + 1
    const message = '<p>Phonebook has info for ' + String(numberOfPeople) + ' people<p>'
    const date = '<p>' + String(Date()) + '</p>'
    response.type('html')
    response.send(message + date)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})