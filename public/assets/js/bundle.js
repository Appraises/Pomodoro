/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PomodoroClock = /*#__PURE__*/function () {
  function PomodoroClock() {
    var _this = this;
    _classCallCheck(this, PomodoroClock);
    document.addEventListener('click', function (e) {
      var el = e.target;
      if (el.classList.contains('inicia')) {
        _this.iniciaContador();
      } else if (el.classList.contains('proxima-pausa') && _this.numberFocus < 4) {
        _this.goToPause();
      } else if (el.classList.contains('proxima-pausa') && _this.numberFocus === 4) {
        _this.goToLongPause();
      } else if (el.classList.contains('proximo-foco')) {
        _this.goToFocus();
      }
    });
    this.backgroundColor = document.body;
    this.backgroundSection = document.querySelector('.pomodoro');
    this.next = document.querySelector('.next');
    this.timer = document.querySelector('.timer');
    this.interval = null;
    this.startTime = null;
    this.duration = 25 * 60;
    this.buttonStart = document.querySelector('.inicia');
    this.focusDiv = document.querySelector('.foco');
    this.shortPauseDiv = document.querySelector('.pausa-curta');
    this.longPauseDiv = document.querySelector('.pausa-longa');
    this.numberFocus = 1;
    this.sound = new Audio('/ringtone-1-46486.mp3');
  }
  _createClass(PomodoroClock, [{
    key: "formatTime",
    value: function formatTime(seconds) {
      var minutes = Math.floor(seconds / 60);
      var remainingSeconds = seconds % 60;
      return "".concat(minutes < 10 ? '0' + minutes : minutes, ":").concat(remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds);
    }
  }, {
    key: "iniciaContador",
    value: function iniciaContador() {
      var _this2 = this;
      clearInterval(this.interval);
      this.startTime = Date.now();
      this.interval = setInterval(function () {
        var elapsedTime = Math.floor((Date.now() - _this2.startTime) / 1000);
        var tempoRestante = _this2.duration - elapsedTime;
        _this2.timer.innerHTML = _this2.formatTime(tempoRestante);
        if (tempoRestante <= 0 && _this2.numberFocus != 4) {
          clearInterval(_this2.interval);
          _this2.sound.play();
          _this2.goToPause();
        } else if (tempoRestante <= 0 && _this2.numberFocus === 4) {
          clearInterval(_this2.interval);
          _this2.sound.play();
          _this2.goToLongPause();
        }
      }, 1000);
    }
  }, {
    key: "goToPause",
    value: function goToPause() {
      clearInterval(this.interval);
      this.next.classList.remove('proxima-pausa');
      this.next.classList.add('proximo-foco');
      this.timer.innerHTML = '05:00';
      this.duration = 5 * 60;
      this.backgroundColor.style.backgroundColor = '#59a5d8';
      this.backgroundColor.style.transition = 'background-color 1s ease-in-out';
      this.backgroundSection.style.backgroundColor = '#64b5f6';
      this.backgroundSection.style.transition = 'background-color 1.3s ease-in-out';
      this.buttonStart.style.color = '#59a5d8';
      this.buttonStart.style.transition = 'color 1.3s ease-in-out';
      this.focusDiv.classList.remove('ativo-foco');
      this.shortPauseDiv.classList.add('ativo-pausa');
      this.shortPauseDiv.style.transition = 'background-color 1.3s ease-in-out';
      if (this.timer.innerHTML === '00:00') {
        this.sound.play();
        vaiProFoco();
      }
    }
  }, {
    key: "goToLongPause",
    value: function goToLongPause() {
      console.log('vai pra pausa longa');
      this.numberFocus = 0;
      this.next.classList.remove('proxima-pausa');
      this.next.classList.add('proximo-foco');
      this.timer.innerHTML = '15:00';
      this.duration = 15 * 60;
      this.backgroundColor.style.backgroundColor = '#59a5d8';
      this.backgroundColor.style.transition = 'background-color 1s ease-in-out';
      this.backgroundSection.style.backgroundColor = '#64b5f6';
      this.backgroundSection.style.transition = 'background-color 1.3s ease-in-out';
      this.buttonStart.style.color = '#59a5d8';
      this.buttonStart.style.transition = 'color 1.3s ease-in-out';
      this.focusDiv.classList.remove('ativo-foco');
      this.longPauseDiv.classList.add('ativo-pausa');
      this.longPauseDiv.style.transition = 'background-color 1.3s ease-in-out';
      if (this.timer.innerHTML === '00:00') {
        this.sound.play();
        goTiFocus();
      }
    }
  }, {
    key: "goToFocus",
    value: function goToFocus() {
      if (this.numberFocus === 0) {
        this.longPauseDiv.classList.remove('ativo-pausa');
      }
      this.numberFocus++;
      console.log(this.numberFocus);
      clearInterval(this.interval);
      this.next.classList.remove('proximo-foco');
      this.next.classList.add('proxima-pausa');
      this.timer.innerHTML = '25:00';
      this.duration = 25 * 60;
      this.focusDiv.style.transition = 'background-color 1.3s ease-in-out';
      this.shortPauseDiv.classList.remove('ativo-pausa');
      this.focusDiv.classList.add('ativo-foco');
      this.backgroundColor.style.backgroundColor = '#B93F3F';
      this.backgroundColor.style.transition = 'background-color 1s ease-in-out';
      this.backgroundSection.style.backgroundColor = '#CE6161';
      this.backgroundSection.style.transition = 'background-color 1.3s ease-in-out';
      this.buttonStart.style.color = '#B93F3F';
      this.buttonStart.style.transition = 'color 1.3s ease-in-out';
      console.log(a)
    }
  }]);
  return PomodoroClock;
}();
new PomodoroClock();
/******/ })()
;
//# sourceMappingURL=bundle.js.map