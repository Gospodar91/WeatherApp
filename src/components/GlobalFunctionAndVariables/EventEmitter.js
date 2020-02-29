class EventEmitter {
  constructor() {
    this.events = {};
  }

  _getEventListByName(eventName) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = new Set();
    }
    return this.events[eventName];
  }

  on(eventName, fn) {
    this._getEventListByName(eventName).add(fn);
  }

  once(eventName, fn) {
    const self = this;

    const onceFn = function(...args) {
      self.removeListener(eventName, onceFn);
      fn.apply(self, args);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName, ...args) {
    //   console.log(eventName);
    this._getEventListByName(eventName).forEach(
      function(fn) {
        fn.apply(this, args);
      }.bind(this),
    );
  }

  removeListener(eventName, fn) {
    this._getEventListByName(eventName).delete(fn);
  }
}

let GlobalEmitter;
if (!GlobalEmitter) {
  GlobalEmitter = new EventEmitter();
}
GlobalEmitter.ON_QUOTE_READY='ON_QUOTE_READY';//это событие на которое нужно показывать цитаты // {quote:'text content',author:'Autor names'}
GlobalEmitter.ON_BG_LOADED='ON_BG_LOADED'; //Это событие на которое нужно поменять бэкграунд ({url:url })
GlobalEmitter.ON_WEATHER_READY='ON_WEATHER_READY';//Это событие для запуска анимации погоды (weather:String = 'Rain'||'Snow'||'Clouds'||'Clear')
GlobalEmitter.ON_SEND_SUBMIT_FROM_FAVORITES='ON_SEND_SUBMIT_FROM_FAVORITES';
GlobalEmitter.ON_GRAPH_READY='ON_GRAPH_READY';// Это событие рисует график по полученным данным
export default GlobalEmitter;

