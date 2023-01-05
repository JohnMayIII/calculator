//Build a calculator class
class Calculator {
    constructor(prevOperText, currOperText) {
        this.prevOperText = prevOperText;
        this.currOperText = currOperText;
        this.clear();
    }
    /**
     * WHAT DO WE WANT THE CALC TO DO????
     * define operations
     *      clear
     *      delete(single number)
     *      append number
     * choose operations
     * compute
     * update display
     */

    clear() {
        this.prevOperand = '';
        this.currOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }
    
    chooseOperation(operation) {
        if (this.currOperand === '') return;
        if (this.prevOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = ''
        
    }
    
    compute() {
        let computation;
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currOperand);
        
        console.log(prev, current)

        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                //do stuff
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
            }
            console.log(computation)
            this.currOperand = computation;
            this.operation = undefined;
            this.prevOperand = '';

        }
        
        getDisplay(number) {
            const stringNumber = number.toString();
            const integerDigits = parseFloat(stringNumber.split('.')[0]);
            const decimalDigits = stringNumber.split('.')[1];
            let integerDisplay;
            
            if (isNaN(integerDigits)) {
                integerDisplay = ''
            } else {
                integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
            }
            if (decimalDigits != null){
                return `${integerDisplay}.${decimalDigits}`
            } else{
                return integerDisplay
            }
    }
    
    updateDisplay() {
        // console.log(currOperText)
        // console.log(this.currOperand)
        this.currOperText.innerText = this.getDisplay(this.currOperand);
        if (this.operation != null) {
            this.prevOperText.innerText = `${this.getDisplay(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperText.innerText = '';
        }
    }
}



//set constant to access buttons
//enclose attribute-value pairs in brackets

const numBtn = document.querySelectorAll('[data-number]');
// console.log(numBtn);
const operBtn = document.querySelectorAll('[data-operation]')
const equalBtn = document.querySelector('[data-equals]')
const delBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-all-clear]')

const prevOperText = document.querySelector('[data-prev-operand]')
const currOperText = document.querySelector('[data-curr-operand]')
const calculator = new Calculator(prevOperText, currOperText);

allClearBtn.addEventListener('click',  ()=> {
    calculator.clear();
    calculator.updateDisplay();
})

numBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalBtn.addEventListener('click', ()=> {
    calculator.compute();
    calculator.updateDisplay();
})

delBtn.addEventListener('click', ()=> {
    calculator.delete();
    calculator.updateDisplay();
})