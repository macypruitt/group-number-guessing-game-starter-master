let roundCount = 0;

$(document).ready(handleReady);

function handleReady() {
  $('#guesses').on('submit', submitGuesses);
  console.log("jquery is loaded!")
}

function submitGuesses(event) {

  event.preventDefault();

  const arrayOfInputs = $('#guesses').serializeArray();
  const dataForServer = { array: [] };
  // for (let person of arrayOfInputs) {
  //   const personObject = {};
  //   personObject[person.name] = person.value;
  //   dataForServer.array.push(personObject);
  // }

  const arrayOfGuesses = [];

  console.log(arrayOfInputs);

  for (let person of arrayOfInputs) {
    arrayOfGuesses.push(parseInt(person.value));
  }

  dataForServer.array = arrayOfGuesses;

  roundCount++;
  $.ajax({
    type: 'POST',
    url: '/guesses',
    data: dataForServer,
  }).then(function (response) {
    render(response);
  });
}

// function checkResponse() {
//   $.ajax({
//     type: 'GET',
//     url: '/guesses',
//   }).then(function (response) {
//     console.log('we getting')
//   })
// };

// const dataForServer = {
//   numberGuessMacy: $("#js-input-macy").val(),
// }

// }

function render(response) {
  $('#js-round-count').text(roundCount);
  $('#js-container').append(`
    <div>
      <p>Macy : ${response[0]}</p>
      <p>Luke : ${response[1]}</p>
      <p>James : ${response[2]}</p>
      <p>Shanice : ${response[3]}</p>
      <p>Ellen : ${response[4]}</p>
    </div>
  `)
}