let inputNmr = document.querySelectorAll('.fraction .numerator');
let inputDenom = document.querySelectorAll('.fraction .denomenator');
let inputs = document.querySelectorAll('.fraction input');
let operator = document.querySelector('select#operator'); 
let calculatorBtn = document.querySelector('button#calculator-btn');
let resultInputNmr = document.querySelector(".fraction-result .numerator");
let resultInputDenom = document.querySelector(".fraction-result .denomenator");
let resultInputWholeNum = document.querySelector(".fraction-result .wholeNumber");
let fractionFigure = document.querySelector("#fraction-figure");
let denomenatorResult, numeratorResult, wholeNumResult;

calculatorBtn.addEventListener('click', ()=> {
  let box = document.querySelectorAll("#fraction-figure div");
  wholeNumResult = ""; /* to reset the whole number input value after having an improper fraction then a normal fraction */
  for(x = 0; x < inputs.length; x++ ) {
    if(inputs[x].value == "") {
      alert("fill all the input");
      return;
    }
    else if(isNaN(inputs[x].value)) {
      alert("please input numbers");
      return;
    }
  }

    switch(operator.value) {
      case '+': 
      denomenatorResult = inputDenom[0].value * inputDenom[1].value;
      numeratorResult = (inputNmr[0].value * inputDenom[1].value) + (inputNmr[1].value * inputDenom[0].value);
      simplify();
      break;

      case '-': 
      denomenatorResult = inputDenom[0].value * inputDenom[1].value;
      numeratorResult = (inputNmr[0].value * inputDenom[1].value) - (inputNmr[1].value * inputDenom[0].value);
      simplify();
      break;

      case '*':
        denomenatorResult = inputDenom[0].value * inputDenom[1].value;
        numeratorResult = inputNmr[0].value * inputNmr[1].value;
        simplify();
        break;

      case '/':
        denomenatorResult = inputDenom[0].value * inputNmr[1].value;
        numeratorResult = inputNmr[0].value * inputDenom[1].value;
        simplify();
        break;
    }
    if(numeratorResult == 0) {
      resultInputNmr.value = 0;
      resultInputDenom.value = "";
    } else if(denomenatorResult == 1) {
      resultInputNmr.value = numeratorResult;
      resultInputDenom.value = "";
    } else if(numeratorResult == denomenatorResult && resultInputWholeNum.value == "") {
      resultInputNmr.value = denomenatorResult;
      resultInputDenom.value = "";
    } else {
      resultInputNmr.value = numeratorResult;
      resultInputDenom.value = denomenatorResult;
      if(wholeNumResult != undefined) {
        resultInputWholeNum.value = wholeNumResult;
      }
    }
    
    box.forEach(element => {
      element.parentNode.removeChild(element); // to reset the figure
    });

    let biggerNum = denomenatorResult;
    let numerator = numeratorResult;

    /* !improper fractions! */
    if(wholeNumResult > 0) {
      numerator = (denomenatorResult * wholeNumResult) + numeratorResult;
      biggerNum = (denomenatorResult * wholeNumResult) + numeratorResult;
      while(biggerNum % denomenatorResult) {
        biggerNum++;
      }
      let denomMultiplier = 1;
      for(x = 1; x <= biggerNum; x++) {
        box = document.createElement("div");
        fractionFigure.appendChild(box);
        box.classList.add("denom-box");
        if(x == denomenatorResult * denomMultiplier) {
          box.classList.add("seperate");
          denomMultiplier++;
        }
      }
  
      box = document.querySelectorAll("#fraction-figure div");
      for(x = 0; x < numerator; x++) {
        box[x].classList.add("numerator-box");
      }
      return;
    }
    

    /* !normal fractions! */
    for(x = 1; x <= biggerNum; x++) {
      box = document.createElement("div");
      fractionFigure.appendChild(box);
      box.classList.add("denom-box");
    }

    box = document.querySelectorAll("#fraction-figure div");
    for(x = 0; x < numeratorResult; x++) {
      box[x].classList.add("numerator-box");
    }
  
});

function simplify() {
      let biggerNum = denomenatorResult;
      if(denomenatorResult < numeratorResult) {
        biggerNum = numeratorResult;
      }

      for(biggerNum; biggerNum >= 1; biggerNum--) {
        if(denomenatorResult % biggerNum == 0 && numeratorResult % biggerNum == 0) {
          numeratorResult/= biggerNum;
          denomenatorResult/= biggerNum;
          if(denomenatorResult < numeratorResult && numeratorResult % denomenatorResult != 0) {
            wholeNumResult = parseInt(numeratorResult / denomenatorResult);
            console.log(denomenatorResult);
            numeratorResult = numeratorResult % denomenatorResult;
            break;
          }
          break;
        }
      }
}



