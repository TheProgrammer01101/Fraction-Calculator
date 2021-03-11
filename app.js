let inputNmr = document.querySelectorAll('.numerator');

let inputDenom = document.querySelectorAll('.denomenator');

let inputs = document.querySelectorAll('input');

let operator = document.querySelector('#operator'); 

let calBtn = document.querySelector('#cal-btn');

let result = document.querySelector("#result");

let denomenatorResult, numeratorResult;

calBtn.addEventListener('click', ()=> {
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
      result.innerHTML = 0;
      return;
    }

    else if(numeratorResult == denomenatorResult) {
      result.innerHTML = denomenatorResult;
      return;
    }
    result.innerHTML = `Result: <br> ${numeratorResult}<br> ---- <br>${denomenatorResult}`;

    


  
})

function simplify() {
      let biggerNum = denomenatorResult;
      if(denomenatorResult < numeratorResult) {
        biggerNum = numeratorResult;
      }

      for(biggerNum; biggerNum >= 1; biggerNum--) {
        if(denomenatorResult % biggerNum == 0 && numeratorResult % biggerNum == 0) {
          numeratorResult/= biggerNum;
          denomenatorResult/= biggerNum;
          console.log(biggerNum);
          break;
        }
      }
}



