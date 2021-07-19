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
    console.log('getting all persons')
    return response.json(persons)
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