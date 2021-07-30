const mongoose = require('mongoose')

if (process.argv < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (process.argv > 3 && process.argv.length < 5) {
  console.log('Please provide the password, name, and number as arguments: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]
const nameArg = process.argv[3]
const numberArg = process.argv[4]

const url = `mongodb+srv://fullstack_user:${password}@cluster0.7udjh.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!nameArg) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: nameArg,
    number: numberArg
  })

  person.save().then(result => {

    console.log(`added ${nameArg} number ${numberArg} to phonebook`)
    mongoose.connection.close()
  })
}

