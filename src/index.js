import './stylesheet/fonts.css';
import './stylesheet/WorkFonts.css';
import './stylesheet/normalize.css';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import './stylesheet/styles.css';
import './components/Search/Search';
import './components/FavoriteList/FavoriteList';
import './components/WeatherInfo/WeatherInfo';
import './components/Quote/Quote';
import './components/BackgroundImg/BackgroundImg';
import './components/DataWindow/DataWindow';
import './components/FiveDaysSmall/FiveDaysSmall';
import './components/MoreInfo/MoreInfo';
import './components/Schedule/Schedule';
import './components/Geolocation/Geolocation';
import './components/AnimationWeather/AnimationWeather';
import './components/CubeAnimation/CubeAnimation';
import './components/GlobalFunctionAndVariables/globalFunctionAndVariables';
import GlobalEmitter from './components/GlobalFunctionAndVariables/EventEmitter';


GlobalEmitter.on(GlobalEmitter.ON_START, onStart);

function onStart(e){

    console.log('HELLO ON START', e);
}


setTimeout(function(){
    GlobalEmitter.emit(GlobalEmitter.ON_GEO, {z:'ON_GEO'})
}, 1000);