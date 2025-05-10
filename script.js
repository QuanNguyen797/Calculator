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

function devide(a, b) {
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
        return devide(a, b);
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
    if ((value === "+" || value === "-" || value === "*" || value === "/") && opr === "" && num2 == "") {
        opr = value;
        dsp.appendChild(span);
    }
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
        num2 = "";
        opr = value;
        dsp.appendChild(span);
    }
}


let equal = document.querySelector(".equal");
equal.addEventListener('click', () => {
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
})
console.log(result);

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