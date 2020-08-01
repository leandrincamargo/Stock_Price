const cotacoesForm = document.querySelector('form');
const mainMessage = document.querySelector('h3');
const name = document.querySelector('#name');
const exchange = document.querySelector('#exchange');
const price = document.querySelector('#price');
const price_open = document.querySelector('#open');
const low = document.querySelector('#low');
const high = document.querySelector('#high');

cotacoesForm.addEventListener('submit', (event) => {
    mainMessage.innerText = 'Searching...';
    name.innerText = '';
    exchange.innerText = '';
    price.innerText = '';
    price_open.innerText = '';
    low.innerText = '';
    high.innerText = '';

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
                open.innerText = 'Code: ' + data.error.code;
            }
            else {
                mainMessage.innerText = 'Symbol: ' + data.symbol;
                name.innerText = 'Name: ' + data.name;
                exchange.innerText = 'Exchange: ' + data.exchange;
                price.innerText = 'Price: ' + data.close;
                open.innerText = 'Price Open: ' + data.open;
                high.innerText = 'Day High: ' + data.high;
                low.innerText = 'Day Low: ' + data.low;
            }
        });
    });
});