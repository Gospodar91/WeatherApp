import './Quote.css';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
GlobalEmitter.on(GlobalEmitter.ON_QUOTE_READY, showRandomQuote);
const quoteRandomQuote = document.querySelector('.quote__text');

const quoteRandomAuthor = document.querySelector('.quote__author');


function showRandomQuote(incomingData) {
  quoteRandomQuote.textContent = incomingData.quote;
  quoteRandomAuthor.textContent = incomingData.author;

}
