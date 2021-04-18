const problemElement = document.querySelector('.problem')
const ourForm = document.querySelector('.our-form')
const ourField = document.querySelector('.our-field')
const pointsNeeded = document.querySelector('.points-needed')
const mistakesAllowed = document.querySelector('.mistakes-allowed')
const progressBar = document.querySelector('.progress-inner')
const endMessage = document.querySelector('.end-message')
const resetButton = document.querySelector('.reset-button')

let state = {
    score: 0,
    wrongAnswers: 0,
}

function updateProblem() {
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
    ourField.value = ''
    ourField.focus()
}

updateProblem()

function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
    return {
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operator: ['+', '-', 'x'][generateNumber(2)]
    }
}

ourForm.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
    event.preventDefault()
    let correctAnswer
    const prob = state.currentProblem
    if (prob.operator == '+') correctAnswer = prob.numberOne + prob.numberTwo
    if (prob.operator == '-') correctAnswer = prob.numberOne - prob.numberTwo
    if (prob.operator == 'x') correctAnswer = prob.numberOne * prob.numberTwo

    if (parseInt(ourField.value, 10) === correctAnswer) {
        state.score++
        pointsNeeded.textContent = 10 - state.score
        problemElement.classList.add('animate-right')
        setTimeout(()=> problemElement.classList.remove('animate-right'), 331)
        updateProblem()
        renderProgressBar()
    } else {
        state.wrongAnswers++
        mistakesAllowed.textContent = 2 - state.wrongAnswers
        problemElement.classList.add('animate-wrong')
        setTimeout(()=> problemElement.classList.remove('animate-wrong'), 331)
    }
    checkLogic()
}

function checkLogic() {
    //if you won
    if (state.score === 10) {
        endMessage.textContent = 'Congrats You Won!'
        document.body.classList.add('overlay-is-open')
        setTimeout(()=> resetButton.focus(),331)
    }
    //if you lost
    if (state.wrongAnswers === 3) {
        endMessage.textContent = 'YOU LOST!!'
        document.body.classList.add('overlay-is-open')
        setTimeout(()=> resetButton.focus(),331)
    }
}

resetButton.addEventListener('click', resetGame)

function resetGame(){
    document.body.classList.remove('overlay-is-open')
    updateProblem()
    state.score = 0
    state.wrongAnswers = 0
    pointsNeeded.textContent = 10
    mistakesAllowed.textContent = 2
    renderProgressBar()
}

function renderProgressBar(){
    progressBar.style.transform = `scaleX(${state.score / 10})`
}

