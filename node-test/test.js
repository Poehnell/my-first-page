const validator = require('validator')

const tripleMe = require('./tripleMe')
const fs = require('fs')

console.log(tripleMe(10))

fs.readFile('./content.txt', 'utf-8', function (err, data){
    if (err) throw err
    fs.writeFile('./index.html', `<h1>${data}</h1>`, function (err){
        if (err) throw err
        console.log('File was successfully created.')
    })
})

console.log(validator.isEmail('jon@test,cin'))