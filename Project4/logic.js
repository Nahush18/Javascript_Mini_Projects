let randomNumber = parseInt(Math.random()*100 + 1)

const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHigh = document.querySelector('.lowOrHigh')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuess = []
let numGuess = 1

let playGame = true;

if(playGame){
    submit.addEventListener('click',(e) =>{
        e.preventDefault()
        const guess = parseInt(userInput.value)
        validateGuess(guess)
    })
}



function validateGuess(guess){
    if(isNaN(guess)){
        alert("Please enter a valid number...")
    }
    else if(guess < 1){
        alert("Please enter a valid number...")
    }

    else if(guess > 100){
        alert("Please enter a valid number...")
    }
    else{
        prevGuess.push(guess)
        if(numGuess === 10){
            displayGuess(guess)
            displayMessage(`Game Over. Original number was: ${randomNumber}`)
            endGame()
        }
        else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`You guessed it right. Congratulations...`)
    }
    else if(guess < randomNumber){
        displayMessage(`Please enter a higher number`)
    }
    else if(guess > randomNumber){
        displayMessage(`Please enter a lower number`)
    }
}

function displayMessage(message){
    lowOrHigh.innerHTML = `<h2>${message}</h2>`
}

function displayGuess(guess){
    userInput.value = ``
    guessSlot.innerHTML += `${guess} `
    numGuess++
    remaining.innerHTML = `${10 - numGuess}`
}

function endGame(){
    userInput.value = ``
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML = `<button id="newGame" style="margin-top: 10px; height: 60px;width: 150px; font-size: 20px;border-radius: 4px; background-color: black; color: #fff; cursor:pointer;margin-left: 120px;">Start New Game</button>`
    startOver.appendChild(p)
    playGame = false
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click',(e) => {
        randomNumber = parseInt(Math.random()*100 + 1)
        prevGuess = []
        numGuess = 1
        guessSlot.innerHTML = ``
        remaining.innerHTML = `${10 - numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true
    })
}