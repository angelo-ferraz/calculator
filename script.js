const buttons = document.querySelectorAll('button')
const operators = document.querySelectorAll('.operator')
const janitors = document.querySelectorAll('.janitor')
const previousDisplay = document.querySelector('[data-previous]')
const currentDisplay = document.querySelector('[data-current]')
let firstNumber
let secondNumber
let result
let operator

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent
        const previous = previousDisplay.textContent
        const current = currentDisplay.textContent

        // Screen Functionality
        if (button.classList.contains('number')) {
            if (current === '0') {
                currentDisplay.textContent = value} 
            else {currentDisplay.textContent = current + value}}
        
        if (button.classList.contains('decimal')) {
            // Stopping empty .
            if (current === '') {
                currentDisplay.textContent = '0.'}
            // Stopping multiple decimals
            else if (currentDisplay.textContent.includes('.') && currentDisplay.textContent != ''){
                currentDisplay.textContent = currentDisplay.textContent} 
            else {currentDisplay.textContent = current + '.'}}

        if (button.classList.contains('operator')) {
            // Prevent multiple operator clicks
            firstNumber = parseFloat(current)
            operator = button.textContent
            operators.forEach(selected => {selected.dataset.state = ''})
            button.dataset.state = 'selected'
            previousDisplay.textContent = current + ' ' + operator
            currentDisplay.textContent = ''}
        
        if (button.classList.contains('equals')) {
            operators.forEach(selected => {selected.dataset.state = ''})
            previousDisplay.textContent = `${previous} ${current} =`

            // Calculation
            secondNumber = parseFloat(current)

            switch (operator) {
                case '+':
                    result = add(firstNumber, secondNumber)
                    break
                case '-':
                    result = subtract(firstNumber, secondNumber)
                    break
                case '*':
                    result = multiply(firstNumber, secondNumber)
                    break
                case '÷':
                    result = divide(firstNumber, secondNumber)
                    break}

            currentDisplay.textContent = `${result}`
            console.log(firstNumber, secondNumber)}
        
        if (button.classList.contains('janitor')) {
            switch (button.textContent) {
                case 'AC':
                    previousDisplay.textContent = ''
                    currentDisplay.textContent = '0'
                    operators.forEach(selected => {selected.dataset.state = ''})
                    break
                case 'DEL':
                    console.log(currentDisplay);
                    currentDisplay.textContent = currentDisplay.innerText.slice(0, -1)
                    operators.forEach(selected => {selected.dataset.state = ''})
                    break
                case 'ANS':
                    currentDisplay.textContent = `${result}`
                    break}
            }
    })
})

function add(firstNumber, secondNumber){
    return firstNumber + secondNumber}

function subtract(firstNumber, secondNumber){
    return firstNumber - secondNumber}

function multiply(firstNumber, secondNumber){
    return firstNumber * secondNumber}

function divide(firstNumber, secondNumber){
    return firstNumber / secondNumber}
