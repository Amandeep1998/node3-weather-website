const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const $getLocation = document.querySelector('#get-location');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = search.value;

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
});

$getLocation.addEventListener('click', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    if(!navigator.geolocation) {
        return alert('Geolocation not supported in your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        fetch(`/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    messageOne.textContent = data.error;
                } else{
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })
        })
    })
});