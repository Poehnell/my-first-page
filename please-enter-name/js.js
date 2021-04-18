const ourInput = document.getElementById("ourInput")
const ourHeader = document.getElementById("ourHeader")
const aRay = document.getElementById('a-ray')

ourInput.addEventListener("input", amazingFunction)

function amazingFunction() {
    if (ourInput.value) {
        ourHeader.innerText = ourInput.value + ' is Cool'
    } else {
        ourHeader.innerText = 'Please enter a name'
    }
}

let john = {
    firstName: 'John',
    lastName: 'Doe',
}
let bob = {
    firstName: 'Bob',
    lastName: 'Doe',
}

function breathe() {
    console.log(this.firstName + ' ' + this.lastName + ' just took a breath')
}
breathe.call(bob)

let myNumnbers = [10,500,2000]
let doubleNumbers = myNumnbers.map(x => x * 2)

console.log(doubleNumbers)