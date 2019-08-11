const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let randomCorrect = 0;
let newGuesses;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});

app.post('/guesses', (req, res) => {
  newGuesses = req.body;
  console.log(newGuesses);

  // CHECK TO SEE IF ITS RIGHT!

  

  res.send(checkNumbers());
});

function checkNumbers(){
  // newGuesses
  // const checkArray = [];
  // checkArray.push(newGuesses.array[0].macyNumber);

  let checkThisArray = newGuesses.array;

  // for( let guess of checkThisArray ) {
  //   checkNumber(guess);
  // }

  for (let i = 0; i < checkThisArray.length; i++) {
    checkThisArray[i] = checkNumber(checkThisArray[i]);
  }

  return checkThisArray;
}

function checkNumber(guess) {
  if(guess == randomCorrect){
    return "You got it!";
  } else if (guess > randomCorrect) {
    return "Too high!"
  } else {
    return "Too low!"
  }
}

function randomNumber(){
  const maxNumber = 26
  randomCorrect = Math.floor(Math.random()* maxNumber) + 1;
  console.log(randomCorrect);
}

randomNumber();