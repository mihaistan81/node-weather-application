console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = "Loading...!";
    messageTwo.textContent = "";

    const url = '/weather?address='+ search.value

    fetch(url).then((response) => {
        response.json().then((forecastData) => {
            if( forecastData.error ) {
                messageOne.textContent = "Error: " + forecastData.error;
            } else {
                messageOne.textContent = forecastData.location;
                messageTwo.textContent = forecastData.forecast;
            }
        })
    })
});