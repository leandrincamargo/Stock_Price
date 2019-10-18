const cotacoesForm = document.querySelector('form');
const mainMessage = document.querySelector('h3');
const name = document.querySelector('#name');
const currency = document.querySelector('#currency');
const price = document.querySelector('#price');
const price_open = document.querySelector('#price_open');
const day_low = document.querySelector('#day_low');
const day_high = document.querySelector('#day_high');

cotacoesForm.addEventListener('submit', (event) => {
    mainMessage.innerText = 'Searching...';
    name.innerText = '';
    currency.innerText = '';
    price.innerText = '';
    price_open.innerText = '';
    day_low.innerText = '';
    day_high.innerText = '';

    event.preventDefault();
    const ativo = document.querySelector('input').value;

    if (!ativo) {
        mainMessage.innerText = 'The value must be informed';
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mainMessage.innerText = 'Something went wrong';
                price.innerText = 'Message: ' + data.error.message;
                price_open.innerText = 'Code: ' + data.error.code;
            }
            else {
                mainMessage.innerText = 'Symbol: ' + data.symbol;
                name.innerText = 'Name: ' + data.name;
                currency.innerText = 'Currency: ' + data.currency;
                price.innerText = 'Price: ' + data.price;
                price_open.innerText = 'Price Open: ' + data.price_open;
                day_high.innerText = 'Day High: ' + data.day_high;
                day_low.innerText = 'Day Low: ' + data.day_low;
            }
        });
    });
});