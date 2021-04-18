let form = document.getElementById('form')
let field = document.getElementById('field')
let list = document.getElementById('list')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    createItem(field.value)
})

function createItem(x){
    let html = `<li> ${x} <button onclick="deleteItem(this)">Delete</button></li>`
    list.insertAdjacentHTML('beforeend', html)
    field.value = ''
    field.focus()
}

function deleteItem(elementToDelete){
    elementToDelete.parentElement.remove()
}