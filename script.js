// To Do: make operator unselectable without number
//         



const buttons = document.querySelectorAll('button')
const operators = document.querySelectorAll('.operator')
const janitors = document.querySelectorAll('.janitor')
const previousDisplay = document.querySelector('[data-previous]')
const currentDisplay = document.querySelector('[data-current]')
let firstNumber
let secondNumber
let result = '0'
let operator
let calcDone = false

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent
        const previous = previousDisplay.textContent
        const current = currentDisplay.textContent
        if (currentDisplay.textContent.includes(undefined)){currentDisplay.textContent = '0'}
        if (currentDisplay.textContent.includes(NaN)){currentDisplay.textContent = '0'}
        if (previousDisplay.textContent.includes(undefined)){currentDisplay.textContent = ''}
        if (previousDisplay.textContent.includes(NaN)){currentDisplay.textContent = ''}

        // Screen Functionality
        if (button.classList.contains('number')) {
            if (calcDone === true){
                operator = undefined
                previousDisplay.textContent = ``
                currentDisplay.textContent = button.textContent}
            else if (current === '0') {
                currentDisplay.textContent = value} 
            else {currentDisplay.textContent = current + value}
        calcDone = false}
        
        if (button.classList.contains('decimal')) {
            calcDone = false
            // Stopping empty .
            if (current === '') {
                currentDisplay.textContent = '0.'}
            // Stopping multiple decimals
            else if (currentDisplay.textContent.includes('.') && currentDisplay.textContent != ''){
                currentDisplay.textContent = currentDisplay.textContent} 
            else {currentDisplay.textContent = current + '.'}}

        if (button.classList.contains('operator')) {
            if (previousDisplay.textContent === '' && operator !== undefined){
                button.dataset.state = ''
                operator = undefined
                return}
            else if (currentDisplay.textContent === '0'){return}
            else if (previousDisplay.textContent.includes(operator) && calcDone === false){
                switch  (operator){
                    case '+':
                        operator = button.textContent
                        secondNumber = parseFloat(current)
                        firstNumber = parseFloat(previousDisplay.innerText.slice(0, -2))
                        if (String(firstNumber).includes('.') || String(secondNumber).includes('.')){
                            result = add(firstNumber, secondNumber).toFixed(2)}
                        else result = add(firstNumber, secondNumber)  
                        previousDisplay.textContent = `${result} ${operator}` 
                        currentDisplay.textContent = ''
                        operators.forEach(selected => {selected.dataset.state = ''})
                        button.dataset.state = 'selected'
                        if (previousDisplay.textContent.includes(NaN)){previousDisplay.textContent = ''}
                        break
                    case '-':
                        operator = button.textContent
                        secondNumber = parseFloat(current)
                        firstNumber = parseFloat(previousDisplay.innerText.slice(0, -2))
                        if (String(firstNumber).includes('.') || String(secondNumber).includes('.')){
                            result = subtract(firstNumber, secondNumber).toFixed(2)}
                        else result = subtract(firstNumber, secondNumber)  
                        previousDisplay.textContent = `${result} ${operator}` 
                        currentDisplay.textContent = ''
                        operators.forEach(selected => {selected.dataset.state = ''})
                        button.dataset.state = 'selected'
                        break
                    case '*':
                        operator = button.textContent
                        secondNumber = parseFloat(current)
                        firstNumber = parseFloat(previousDisplay.innerText.slice(0, -2))
                        if (String(firstNumber).includes('.') || String(secondNumber).includes('.')){
                            result = multiply(firstNumber, secondNumber).toFixed(2)}
                        else result = multiply(firstNumber, secondNumber)  
                        previousDisplay.textContent = `${result} ${operator}` 
                        currentDisplay.textContent = ''
                        operators.forEach(selected => {selected.dataset.state = ''})
                        button.dataset.state = 'selected'
                        break
                    case '÷':
                        operator = button.textContent
                        secondNumber = parseFloat(current)
                        firstNumber = parseFloat(previousDisplay.innerText.slice(0, -2))
                        if (String(firstNumber).includes('.') || String(secondNumber).includes('.')){
                            result = divide(firstNumber, secondNumber).toFixed(2)}
                        else result = divide(firstNumber, secondNumber)  
                        previousDisplay.textContent = `${result} ${operator}` 
                        currentDisplay.textContent = ''
                        operators.forEach(selected => {selected.dataset.state = ''})
                        button.dataset.state = 'selected'
                        break
                    default:
                        break}
            }
            else {
            calcDone = false
            operator = button.textContent
            firstNumber = parseFloat(current)
            operators.forEach(selected => {selected.dataset.state = ''})
            button.dataset.state = 'selected'
            previousDisplay.textContent = current + ' ' + operator
            currentDisplay.textContent = ''}
        }
        
        if (button.classList.contains('equals')) {
            secondNumber = parseFloat(current)
            firstNumber = parseFloat(previousDisplay.innerText.slice(0, -2))

            if (currentDisplay.textContent === '' || previousDisplay.textContent !== firstNumber + ' ' + operator){
                previousDisplay.textContent = 'Error'
                operators.forEach(selected => {selected.dataset.state = ''})
                return
            }

            operators.forEach(selected => {selected.dataset.state = ''})
            previousDisplay.textContent = `${previous} ${current} =`

            // Calculation

            switch (operator) {
                case '+':
                    if (String(firstNumber).includes('.') || String(secondNumber).includes('.')){
                        result = add(firstNumber, secondNumber).toFixed(2)}
                    else result = add(firstNumber, secondNumber)
                    break
                case '-':
                    if (String(firstNumber).includes('.') || String(secondNumber).includes('.')){
                        result = subtract(firstNumber, secondNumber).toFixed(2)}
                    else result = subtract(firstNumber, secondNumber)
                    break
                case '*':
                if (String(firstNumber).includes('.') || String(secondNumber).includes('.')){
                        result = multiply(firstNumber, secondNumber).toFixed(2)}
                    else result = multiply(firstNumber, secondNumber)
                    break
                case '÷':
                    if (String(firstNumber).includes('.') || String(secondNumber).includes('.')){
                        result = divide(firstNumber, secondNumber).toFixed(2)}
                    else result = divide(firstNumber, secondNumber)
                    break
                default:
                    break}

            calcDone = true
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
                    currentDisplay.textContent = currentDisplay.innerText.slice(0, -1)
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

