const cotacoesForm = document.querySelector('form');
const mainMessage = document.querySelector('h3');
const price = document.querySelector('#price');
const price_open = document.querySelector('#price_open');
const day_low = document.querySelector('#day_low');
const day_high = document.querySelector('#day_high');

cotacoesForm.addEventListener('submit', (event) => {    
    mainMessage.innerText = 'Buscando...';
    price.innerText = '';
    price_open.innerText = '';
    day_low.innerText = '';
    day_high.innerText = '';

    event.preventDefault();
    const ativo = document.querySelector('input').value;

    if (!ativo) {
        mainMessage.innerText = 'O ativo deve ser informado';
        return;
    }

    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) => {
    response.json().then((data) => {
        if (data.error){
            mainMessage.innerText = 'Alguma coisa deu errado';
            price.innerText = 'Mensagem: ' + data.error.message;
            price_open.innerText = 'Código: ' + data.error.code;
        }
        else {
            mainMessage.innerText = 'Ação: ' + data.symbol;
            price.innerText = 'Preço: ' + data.price;
            price_open.innerText = 'Preço de Abertura: ' + data.price_open;
            day_high.innerText = 'Alta do dia: ' + data.day_high;
            day_low.innerText = 'Baixa do dia: ' + data.day_low;
            
            console.log(data);
        }
    });
});
});