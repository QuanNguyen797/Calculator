console.log("Hello, world!");

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function devide(a, b) {
    return a / b;
};


function operate(operator, a, b) {
    if (operator == "+") {
        add(a, b);
    };
    if (operator == "-") {
        subtract(a, b);
    };
    if (operator == "*") {
        multiply(a, b);
    };
    if (operator == "/") {
        devide(a, b);
    };
};



