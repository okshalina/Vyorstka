var quotesRussian = [
     "Привычка - вторая натура",
     "Заметьте хорошо!",
     "Беда не приходит одна",
  	 "Через тернии к звёздам"
]
var quotesLatin = [
  "Consuetudo est altera natura",
   "Nota bene",
    "Nulla calamitas sola",
     "Per aspera ad astra"
]

var rusQuoteCounter=0;  // считаем, сколько фраз из списка мы уже использовали
var usedquotesIndexes = [];  // сохраняем сюда индексы использованных цитат
var quotesRus = document.querySelector('.phrases__rus');
var quotesLat = document.querySelector('.phrases__latin');
var createButton = document.querySelector('.btn-create');
var changeButton = document.querySelector('.btn-change');
var buttons = document.querySelector('.phrases__buttons');

  createButton.addEventListener('click', ()=> {
    if(rusQuoteCounter  >= quotesRussian.length) {
      quotesAlertMessage();
    }
    else {
      var randomIndex = Math.floor(Math.random()*quotesRussian.length); // получаем рандомное число от 0 до quotes.length-1
      while(usedquotesIndexes.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random()*quotesRussian.length);
      };
      usedquotesIndexes.push(randomIndex);
      rusQuoteCounter++;
      var quote = addQuote(randomIndex);
      quotesRus.append(quote);
      toLatinQuote(quote,rusQuoteCounter);
    }
  });

function addQuote(index) {
  var quote = document.createElement('div');
  quote.classList.add('quote__item');
  quote.innerHTML = (`Фраза ${rusQuoteCounter}: ${quotesRussian[index]}`);
  return quote;
}

function toLatinQuote(quote, rusQuoteCounter) {
  quote.addEventListener('click', (par) => {
  var index = quotesRussian.indexOf(quote.innerHTML.substring(9));
  quote.innerHTML = (`Фраза ${rusQuoteCounter}: ${quotesLatin[index]}`);
  quote.classList.add('quote__item-latin');
  quotesLat.prepend(quote);
  });
};

function quotesAlertMessage() {
var alert = document.createElement('p');
alert.classList.add('alert__message');
alert.innerHTML = "Фразы закончились";
if(buttons. getElementsByTagName('p').length < 1) buttons.append(alert);
}

changeButton.addEventListener('click', () => {
      var change = document.querySelectorAll('.quote__item-latin');
      change.forEach(elem => {
        elem.classList.add('change-color-item');
      });
  });