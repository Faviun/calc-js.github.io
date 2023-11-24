let tmp = 0;
let val = 0;
let display = document.getElementById("val-d");
let secDisp = document.getElementById("sec-val-d");
let buttons = Array.from(document.querySelectorAll(".but"));

buttons.map((button) => {
    button.addEventListener("click", (e) => {
        switch (e.target.innerText) {
            case "AC":
                sound('');
                clearFirst();
                clearSecond();
            break;
            case "+/-":
                otricanie();
            break;
            case "%":
                proc();
            break;
            case "/":
                calculate("/");
            break;
            case "X":
                calculate("*");
                break;
            case "-":
                calculate("-");
            break;
            case "+":
                calculate("+");
            break;
            case ".":
                checkPoint();
                break;
            case "=":
                equalent();
                break;
            default:
                sound('');
                if (display.innerText.length < 8) {
                    if (display.innerText === "") {
                        display.innerText = e.target.innerText;
                    } else {
                        display.innerText += e.target.innerText; 
                    }
            }
        }
    });
});

function clearFirst(){
    display.innerText = "";
}

function clearSecond(){
    secDisp.innerText = "";
}

function calculate(op){
    sound('');
    if(display.innerText !== "" && secDisp.innerText === ""){
        secDisp.innerText = display.innerText + op;
        clearFirst();
    } else if (display.innerText !== "" && secDisp.innerText !== "") {
        val = secDisp.innerText + display.innerText;
        clearFirst();
        secDisp.innerText = eval(val) + op;
    } else if (display.innerText === "" && secDisp.innerText !== ""){
        tmp = secDisp.innerText.slice(0, secDisp.innerText.length-1);
        secDisp.innerText = tmp + op;
    }
}

function otricanie(){
    sound('');
    if(display.innerText === ""){
        display.innerText = "-";
    } else if(display.innerText === "-"){
        clearFirst();
    }
    else {
        display.innerText = display.innerText * - 1;
    }
}

function proc(){
    sound('');
    if (display.innerText < 0 || display.innerText > 0){
        display.innerText = eval(display.innerText + "/100");
    }
}

function checkPoint(){
    sound('');
    for(let i = 0; i < display.innerText.length; i++){
        if(display.innerText[i] == "."){
            tmp++;
        }
    }
    if(tmp == 0){
        display.innerText += ".";
    }
    tmp = 0;
}

function equalent(){
    sound();
    if (display.innerText !== "") {
        display.innerText = eval(secDisp.innerText + display.innerText);
        clearSecond();
    } else if(display.innerText === "" && secDisp.innerText !== ""){
        display.innerText = eval(secDisp.innerText.slice(0, secDisp.innerText.length-1));
        clearSecond();
    }
}

function sound(){
    new Audio('sound.mp3').play()
}