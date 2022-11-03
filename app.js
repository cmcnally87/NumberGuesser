// Set random number
function number(){
    return Math.floor(Math.random() * 10) + 1;
}
let numberOfAttempts = 0;
//set number in local storage
if(localStorage.getItem('number') === null){
    localStorage.setItem('number', number().toString());
    localStorage.setItem('numberOfAttempts', numberOfAttempts.toString())
}


const guess = document.querySelector('#guess');
const submit = document.querySelector('#submitBtn');
const reset = document.querySelector('#resetBtn');
const feedback = document.querySelector('#feedback');



//listen for submit
submit.addEventListener('click', (e)=>{
    //console.log(`Value: ${guess.value}`)
    if(!guess.value){
        alert('Please enter a number')
    } else if(parseInt(guess.value) <= 0 || parseInt(guess.value) > 10){
        alert('Guess must be between 1 and 10');
    } else {
        compareNumbers(guess.value);
    }
    e.preventDefault();
})

//listen for reset
reset.addEventListener('click', () =>{
    resetGame();
})



//compare numbers
const compareNumbers = (guessValue) =>{
    //console.log(`guess val: ${guessValue}`)
    if(guessValue < parseInt(localStorage.getItem('number'))){
        feedback.textContent = 'You answer is low';
        feedback.style.display = 'block';
        feedback.className = 'text-danger';
        addAttempt();
        checkGameState();
    } else if(guessValue > parseInt(localStorage.getItem('number'))){
        feedback.textContent = 'You answer is high';
        feedback.style.display = 'block';
        feedback.className = 'text-danger';
        addAttempt();
        checkGameState();
    } else {
        feedback.textContent = 'You answer is CORRECT!!! \n game reseting in 3 seconds';
        feedback.style.display = 'block';
        feedback.className = 'text-success';
        setTimeout(()=> resetGame(), 3000);
    }

}
//Add attempts
function addAttempt(){
    let attemptNumber = parseInt(localStorage.getItem('numberOfAttempts'));
    attemptNumber++;
    localStorage.setItem('numberOfAttempts', attemptNumber.toString());

}

// Get game status
function checkGameState(){
    if(parseInt(localStorage.getItem('numberOfAttempts')) == 3){
        alert('Game Over - game is restarting');
      resetGame();
    }
}

//reset game
function resetGame(){
    localStorage.clear();
    localStorage.setItem('number', number().toString());
    localStorage.setItem('numberOfAttempts', numberOfAttempts.toString())
    guess.value = '';
    feedback.style.display = 'none'
}



