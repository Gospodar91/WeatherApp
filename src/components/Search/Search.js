import './Search.css';
import services from '../../services';

const choiseForm = document.querySelector('#search-form');
const choiseInput = document.querySelector('#search-input');

choiseForm.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  services.city = choiseInput.value;
  if (services.blockSection === 'today') {
    services.getTodayWeather(services.city);
  } else if (services.blockSection === 'fiveDay') {
    services.getFiveDayWeather(services.city);
  }
  services.getImgBackground(services.city);
}
