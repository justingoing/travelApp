/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* First Attempt at Distance Calculator Site - Paul Barstad */



var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _distanceCalculatorJs = __webpack_require__(1);

var _validatorJs = __webpack_require__(2);

var bigBadGlobalVariableKilometers = false;

var Header = (function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'jumbotron text-center' },
        React.createElement(
          'h1',
          null,
          'Dave Matthews Band - Distance Calculator'
        )
      );
    }
  }]);

  return Header;
})(React.Component);

var Button = (function (_React$Component2) {
  _inherits(Button, _React$Component2);

  function Button(props) {
    _classCallCheck(this, Button);

    _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).call(this, props);

    this.state = {
      km: false,
      text: "Miles"
    };
  }

  _createClass(Button, [{
    key: 'setKM',
    value: function setKM(event, obj) {
      console.log("Hello");
      console.log(obj);
      console.log(event);

      if (event === true) {
        this.setState({ km: true });
        this.setState({ text: "Kilometers" });
        bigBadGlobalVariableKilometers = true;
        document.getElementById("dropdown").innerHTML = "Kilometers";
      } else {
        this.setState({ km: false });
        this.setState({ text: "Miles" });
        bigBadGlobalVariableKilometers = false;
        document.getElementById("dropdown").innerHTML = "Miles";
      }

      console.log(bigBadGlobalVariableKilometers);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'text-center' },
        React.createElement(
          'div',
          { className: 'dropdown' },
          React.createElement(
            'button',
            { type: 'button', id: 'dropdown', className: 'btn btn-primary dropdown-toggle', 'data-toggle': 'dropdown' },
            'Miles'
          ),
          React.createElement(
            'div',
            { className: 'dropdown-menu' },
            React.createElement(
              'a',
              { className: 'dropdown-item', onClick: this.setKM.bind(this, false), href: '#' },
              'Miles'
            ),
            React.createElement(
              'a',
              { className: 'dropdown-item', onClick: this.setKM.bind(this, true), href: '#' },
              'Kilometers'
            )
          )
        )
      );
    }
  }]);

  return Button;
})(React.Component);

var FirstCoordinate = (function (_React$Component3) {
  _inherits(FirstCoordinate, _React$Component3);

  function FirstCoordinate() {
    _classCallCheck(this, FirstCoordinate);

    _get(Object.getPrototypeOf(FirstCoordinate.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FirstCoordinate, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center' },
        React.createElement('input', { type: 'text', required: true, className: 'text-left form-control', id: 'cord1', placeholder: 'Coordinate 1', pattern: '([+-]?[0-9]{1,3}°\\s*[0-9]{1,2}\\x27\\s*[0-9]{1,2}\\x22\\s*[NSEW]\\s*){2}|[+-]?([0-9]{1,2}°\\s*[0-9]*\\.?[0-9]+\\x27\\s*[NSEW]\\s*){2}|([+-]?[0-9]*\\.?[0-9]+°\\s*[ENSW]\\s*){2}|([+-]?[0-9]*\\.?[0-9]+\\s*){2}' })
      );
    }
  }]);

  return FirstCoordinate;
})(React.Component);

var SecondCoordinate = (function (_React$Component4) {
  _inherits(SecondCoordinate, _React$Component4);

  function SecondCoordinate() {
    _classCallCheck(this, SecondCoordinate);

    _get(Object.getPrototypeOf(SecondCoordinate.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SecondCoordinate, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center' },
        React.createElement('input', { type: 'text', required: true, className: 'text-left form-control', id: 'cord2', placeholder: 'Coordinate 2', pattern: '([+-]?[0-9]{1,3}°\\s*[0-9]{1,2}\\x27\\s*[0-9]{1,2}\\x22\\s*[NEWS]\\s*){2}|([+-]?[0-9]{1,2}°\\s*[0-9]*\\.?[0-9]+\\x27\\s*[NEWS]\\s*){2}|([+-]?[0-9]*\\.?[0-9]+°\\s*[NEWS]\\s*){2}|([+-]?[0-9]*\\.?[0-9]+\\s*){2}' })
      );
    }
  }]);

  return SecondCoordinate;
})(React.Component);

var Calc = (function (_React$Component5) {
  _inherits(Calc, _React$Component5);

  function Calc() {
    _classCallCheck(this, Calc);

    _get(Object.getPrototypeOf(Calc.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Calc, [{
    key: 'onClickLogic',
    value: function onClickLogic() {
      var shouldProcess = true;
      if (!document.getElementById('cord1').checkValidity()) {
        window.alert("Please check the format of your first coordinate");
        shouldProcess = false;
      }
      if (!document.getElementById('cord2').checkValidity()) {
        window.alert("Please check the format of your second coordinate");
        shouldProcess = false;
      }

      if (shouldProcess) {
        var lat1 = (0, _validatorJs.getLatitude)(document.getElementById('cord1').value);
        var lon1 = (0, _validatorJs.getLongitude)(document.getElementById('cord1').value);
        var lat2 = (0, _validatorJs.getLatitude)(document.getElementById('cord2').value);
        var lon2 = (0, _validatorJs.getLongitude)(document.getElementById('cord2').value);

        lat1 = (0, _validatorJs.parseCoord)(lat1);
        lon1 = (0, _validatorJs.parseCoord)(lon1);
        lat2 = (0, _validatorJs.parseCoord)(lat2);
        lon2 = (0, _validatorJs.parseCoord)(lon2);

        var distance = Math.round((0, _distanceCalculatorJs.calculateGreatCircleDistance)(lat1, lon1, lat2, lon2, bigBadGlobalVariableKilometers));
        document.getElementById("answer_box").value = distance + (bigBadGlobalVariableKilometers ? " km" : " mi");
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'col-sm text-center' },
        React.createElement('br', null),
        React.createElement(
          'button',
          { className: 'btn btn-primary mr-sm-2', type: 'submit', value: 'submit', onClick: this.onClickLogic.bind(this) },
          'Calculate!'
        )
      );
    }
  }]);

  return Calc;
})(React.Component);

var Answer = (function (_React$Component6) {
  _inherits(Answer, _React$Component6);

  function Answer() {
    _classCallCheck(this, Answer);

    _get(Object.getPrototypeOf(Answer.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Answer, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'col offset-2 col-8 text-center' },
        React.createElement('br', null),
        'Distance:',
        React.createElement('input', { type: 'text', id: 'answer_box', className: 'text-left form-control mr-sm-2', disabled: true })
      );
    }
  }]);

  return Answer;
})(React.Component);

var Main = (function (_React$Component7) {
  _inherits(Main, _React$Component7);

  function Main() {
    _classCallCheck(this, Main);

    _get(Object.getPrototypeOf(Main.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Main, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          null,
          React.createElement(Header, null),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(FirstCoordinate, null),
            React.createElement(SecondCoordinate, null)
          ),
          React.createElement('br', null),
          React.createElement(Button, null),
          React.createElement(Calc, null),
          React.createElement(Answer, null)
        )
      );
    }
  }]);

  return Main;
})(React.Component);

ReactDOM.render(React.createElement(Main, null), document.getElementById("root"));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * distanceCalculator.js 
 * Contains functions to calculate the distance between two points on the earth.
 * 
 * @author Samuel Kaessner
 */

/**
 * Takes a argument in degrees and converts it to radians.
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateGreatCircleDistance = calculateGreatCircleDistance;
function toRadians(degrees) {
  return degrees * Math.PI / 180.0;
}

/**
 * Takes two lat-lon pairs, and returns the great circle distance between the two,
 * using the chord length formula. If the boolean useKilometers parameter is set to true,
 * then the function returns the distance in kilometers; otherwise, returns distance in miles.
 */

function calculateGreatCircleDistance(lat1, lon1, lat2, lon2, useKilometers) {
  //Values for radius
  var radiusMiles = 3958.7613;
  var radiusKilometers = 6371.0088;

  //Convert to radians
  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  //We use the chord-length formula to figure out the distance between two points.
  var deltaX = Math.cos(lat2) * Math.cos(lon2) - Math.cos(lat1) * Math.cos(lon1);
  var deltaY = Math.cos(lat2) * Math.sin(lon2) - Math.cos(lat1) * Math.sin(lon1);
  var deltaZ = Math.sin(lat2) - Math.sin(lat1);

  var C = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

  var centralAngle = 2.0 * Math.asin(C / 2.0);

  //Use the correct radius (KM or MI)
  var circleDistance = (useKilometers == true ? radiusKilometers : radiusMiles) * centralAngle;

  return circleDistance;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * validator.js 
 * Validate input from the user and pass it to the distance calculator
 * 
 * @author Isaac Gentz
 */

/**
  Makes sure that the user input is valid
*/


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLatitude = getLatitude;
exports.getLongitude = getLongitude;
exports.parseCoord = parseCoord;
function validateLatLong(elem_name) {
  return document.getElementById(elem_name).checkValidity();
}

/**
  Gets the latidude from an input string
*/

function getLatitude(input) {
  // we know input is validated so we can search for North or South
  var search = input.search(/[NS]/);
  var latitude = "";
  // coordinate must be in decimal format
  if (search == -1) {
    latitude = input.substring(0, input.search(" "));
  } else {
    latitude = input.substring(0, search + 1);
  }

  return latitude;
}

/**
  Gets the longitude from an input string
*/

function getLongitude(input) {
  // we  know input is validated so we know we can go from North/South to the end
  var search = input.search(/[NS]/);

  var longitude = "";
  if (search == -1) {
    longitude = input.substr(input.search(' '));
  } else {
    longitude = input.substring(search + 1);
  }

  return longitude;
}

function parseCoord(input) {
  var seconds = 0;
  var minutes = 0;
  var degrees = 0;
  var direction = 1;

  if (input.indexOf('S') > -1 || input.indexOf('W') > -1) direction = -1;

  if (input.indexOf('\x22') > -1) {

    var start = input.indexOf('\x27');
    var end = input.indexOf('\x22');
    // go from the single quote to the double quote
    seconds = parseFloat(input.substring(start + 1, end));
    seconds /= 3600; //convert seconds to degrees
  }

  // check for single quotes 40° 26.767′ N 79° 58.933′ W or above format
  if (input.indexOf('\x27') > -1) {
    start = input.indexOf('°');
    end = input.indexOf('\x27');
    minutes = parseFloat(input.substring(start + 1, end));
    minutes /= 60; //convert minutes to degrees
  }

  if (input.indexOf('°') > -1) {
    start = 0;
    end = input.indexOf('°');
    degrees = parseFloat(input.substring(start, end));
    degrees += minutes + seconds;
  } else {
    degrees = parseFloat(input);
  }

  return degrees * direction;
}

/***/ })
/******/ ]);