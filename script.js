/**
 * Calculator Project - The Odin Project Foundations Track
 * Author: [Your Name]
 * Description:
 *   - Handles basic arithmetic operations (+, -, *, /)
 *   - Supports chained operations, decimal rounding, backspace, and error handling
 *   - Fully DOM-driven interface with internal state management
 */

console.log("Hello, world!");

function add(a, b) {
    return Number(a) + Number(b);
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b != 0) {
        return a / b;
    }
    else {
        alert("Devide by zero!");
        clean();
        return null;
    }

};


let num1 = ""
let opr = "";
let num2 = "";
let result;
let calculated = false;

function operate(operator, a, b) {
    if (operator == "+") {
        return add(a, b);
    };
    if (operator == "-") {
        return subtract(a, b);
    };
    if (operator == "*") {
        return multiply(a, b);
    };
    if (operator == "/") {
        return divide(a, b);
    };
};

let button = document.querySelectorAll(".digits>button, .operators>button");
let dsp = document.querySelector(".display");

button.forEach((btn) => {
    btn.addEventListener("click", () => {
        display(btn);
    });
});

function display(btn) {
    const value = btn.textContent;

    let span = document.createElement("span");
    span.textContent = btn.textContent;

    // don’t allow multiple operators in a row
    if ((value === "+" || value === "-" || value === "*" || value === "/") && opr !== "" && num2 === "") {
        return;
    }

    // Allow chaining after equals by accepting operator input
    if ((value === "+" || value === "-" || value === "*" || value === "/") && calculated && num1 && !num2) {
        opr = value;
        calculated = false;
        dsp.appendChild(span);
        return;
    }

    // Handle numeric and decimal input
    if (!isNaN(value) || value === ".") {
        if (calculated === false) {
            if (opr === "") {
                if (num1.includes(".") && value === ".") {
                    return;
                }
                else {
                    num1 += value;
                    dsp.appendChild(span);
                }

            }
            else {
                if (num2.includes(".") && value === ".") {
                    return;
                }
                else {
                    num2 += value;
                    dsp.appendChild(span);
                }

            }
        }
        else if (calculated === true) {
            num1 = "";
            num2 = "";
            opr = "";
            dsp.textContent = "";
            calculated = false;
            num1 += value;
            dsp.appendChild(span);
        }

    }

    // Handle initial operator input
    if ((value === "+" || value === "-" || value === "*" || value === "/") && opr === "" && num2 === "" && num1 !== "") {
        opr = value;
        dsp.appendChild(span);
    }
    // Handle chained operations when num1, opr, and num2 are all present
    if ((value === "+" || value === "-" || value === "*" || value === "/") && num1 && num2 && opr) {
        let raw = operate(opr, num1, num2);
        if (raw === null) {
            clean();
            return;
        }
        result = Math.round(raw * 10000) / 10000;
        dsp.textContent = "";
        apnd(result);
        num1 = result.toString();
        calculated = false;
        num2 = "";
        opr = value;
        dsp.appendChild(span);
    }


    const clickedElement = btn;
    console.log(`num1=${num1},num2=${num2}, opr: ${opr}. Clicked element ${clickedElement.textContent}`)
}


let equal = document.querySelector(".equal");
equal.addEventListener('click', () => {
    if (calculated === true) {
        return;
    }
    if (!num1 || !opr || !num2) return;
    let raw = operate(opr, num1, num2);
    if (raw === null) {
        clean();
        return;
    }
    result = Math.round(raw * 10000) / 10000;
    dsp.textContent = "";
    apnd(result);
    num1 = result.toString();
    num2 = "";
    opr = "";
    calculated = true;

    console.log(`num1=${num1},num2=${num2}, opr: ${opr}. "=" pressed.`)
})


function apnd(content) {
    let span = document.createElement("span");
    span.textContent = content;
    dsp.appendChild(span);
}

function clean() {
    num1 = "";
    num2 = "";
    opr = "";
    dsp.textContent = "";
    result = null;
    calculated = false;
}
const clear = document.querySelector(".clear");
clear.addEventListener('click', clean);

const bkspc = document.querySelector(".bkspc");
bkspc.addEventListener('click', () => {
    if (dsp.lastChild) {
        dsp.removeChild(dsp.lastChild);
    }
    if (num2 && opr !== "") {
        num2 = num2.slice(0, -1);
    }
    else if (opr !== "") {
        opr = "";
    }
    else if (opr == "" && num1) {
        num1 = num1.toString().slice(0, -1);
    }
})