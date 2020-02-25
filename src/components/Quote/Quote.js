import './Quote.css';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
GlobalEmitter.on(GlobalEmitter.ON_QUOTE_READY,showRandomQuote);
const quoteRandomQuote = document.querySelector(".quote__text");
// quoteRandomQuote.textContent = quoteArray[Number(quoteRandom)].quote;

const quoteRandomAuthor = document.querySelector(".quote__author");
// quoteRandomAuthor.textContent = quoteArray[Number(quoteRandom)].author;


function showRandomQuote(incomingData){
  quoteRandomQuote.textContent=incomingData.quote;
  quoteRandomAuthor.textContent=incomingData.author;

}
