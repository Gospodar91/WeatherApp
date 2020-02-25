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

<<<<<<< HEAD
  GlobalEmitter.ON_START = 'ON_START';//g
  GlobalEmitter.ON_GEO = 'ON_GEO';//Эмиттиттся после получения данных.В данные приходит
  GlobalEmitter.ON_BG_LOADED = 'ON_BG_LOADED';
  GlobalEmitter.ON_DATE_LOADED = 'ON_DATE_LOADED' // получение данных для данных о текущем дне
=======
    const onceFn = function(...args) {
      self.removeListener(eventName, onceFn);
      fn.apply(self, args);
    };
    this.on(eventName, onceFn);
  }
>>>>>>> dev

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
export default GlobalEmitter;
