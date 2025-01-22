"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Handle = require("./Handle");

var _Handle2 = _interopRequireDefault(_Handle);

var _Track = require("./Track");

var _Track2 = _interopRequireDefault(_Track);

var _useTouches = require("./useTouches");

var _useTouches2 = _interopRequireDefault(_useTouches);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function step(min, max, x) {
  return Math.max(0, Math.min((x - min) / (max - min), 1));
}

var MultiSlider = function (_React$Component) {
  _inherits(MultiSlider, _React$Component);

  function MultiSlider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MultiSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MultiSlider.__proto__ || Object.getPrototypeOf(MultiSlider)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      down: null
    }, _this.concernedEvent = function (e) {
      var down = _this.state.down;
      if (!(0, _useTouches2.default)()) {
        return e;
      } else {
        if (!down) return e.targetTouches[0];
        var touchId = down.touchId;
        var touches = e.changedTouches;
        for (var i = 0; i < touches.length; ++i) {
          if (touches[i].identifier === touchId) return touches[i];
        }
        return null;
      }
    }, _this.onHandleStart = function (i, e) {
      var event = _this.concernedEvent(e);
      if (!event) return;
      e.preventDefault();
      _this.setState({
        down: {
          touchId: event.identifier,
          x: _this.xForEvent(event),
          controlled: i
        }
      });
    }, _this.onHandleMove = function (e) {
      var event = _this.concernedEvent(e);
      if (!event) return;
      e.preventDefault();
      var x = _this.xForEvent(event);
      var valuePos = _this.reverseX(x);
      var down = _this.state.down;
      var values = _this.props.values;
      var leftIndex = down.controlled - 1;
      var rightIndex = down.controlled;
      var leftValue = values[leftIndex];
      var rightValue = values[rightIndex];
      var w = leftValue + rightValue;
      var offsetLeft = 0;
      for (var i = 0; i < leftIndex; ++i) {
        offsetLeft += values[i];
      }var left = Math.round(w * step(offsetLeft, offsetLeft + w, valuePos));
      var right = w - left;

      if (left !== leftValue && right !== rightValue) {
        values = [].concat(values);
        values[leftIndex] = left;
        values[rightIndex] = right;
        _this.props.onChange(values);
      }
    }, _this.onHandleEnd = function (e) {
      var event = _this.concernedEvent(e);
      if (!event) return;
      _this.setState({
        down: null
      });
    }, _this.onHandleAbort = function (e) {
      var event = _this.concernedEvent(e);
      if (!event) return;
      _this.setState({
        down: null
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MultiSlider, [{
    key: "xForEvent",
    value: function xForEvent(e) {
      var node = this.root;
      var clientX = e.clientX;
      var m = node.getScreenCTM();
      var p = node.createSVGPoint();
      if ((0, _useTouches2.default)()) {
        // There is a bug in touch events and we need to compute the real clientX
        // http://stackoverflow.com/questions/5885808/includes-touch-events-clientx-y-scrolling-or-not
        clientX = e.pageX; // safer to start with pageX
        var stopAt = document.body.parentElement;
        while (node && node !== stopAt) {
          clientX -= node.scrollLeft;
          node = node.parentElement;
        }
      }
      p.x = e.clientX;
      p = p.matrixTransform(m.inverse());
      return p.x;
    }
  }, {
    key: "sum",
    value: function sum() {
      // (might optimize this computation on values change if costy)
      return this.props.values.reduce(function (a, b) {
        return a + b;
      });
    }

    // map a value to an x position

  }, {
    key: "x",
    value: function x(value) {
      var props = this.props;
      var width = props.width;
      var padX = props.padX;
      var sum = this.sum();
      return Math.round(padX + value * (width - 2 * padX) / sum);
    }
  }, {
    key: "reverseX",
    value: function reverseX(x) {
      var props = this.props;
      var width = props.width;
      var padX = props.padX;
      var sum = this.sum();
      return sum * ((x - padX) / (width - 2 * padX));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.state;
      var down = state.down;
      var props = this.props;
      var width = props.width;
      var height = props.height;
      var values = props.values;
      var len = values.length;
      var colors = props.colors;
      var trackSize = props.trackSize;
      var handleSize = props.handleSize;
      var handleStrokeSize = props.handleStrokeSize;
      var handleInnerDotSize = props.handleInnerDotSize;
      var bg = props.bg;
      var centerY = height / 2;
      var touchEvents = (0, _useTouches2.default)();

      var tracks = [];
      var handles = [];
      var prev = 0;
      var prevColor = bg;
      for (var i = 0; i < len; ++i) {
        var value = values[i];
        var next = prev + value;
        var fromX = this.x(prev);
        var toX = this.x(next);
        var color = colors[i % colors.length];
        tracks.push(_react2.default.createElement(_Track2.default, {
          key: i,
          color: color,
          y: centerY,
          lineWidth: trackSize,
          fromX: fromX,
          toX: toX
        }));
        if (i !== 0) {
          var handleEvents = {};
          if (touchEvents) {
            if (!down) {
              handleEvents.onTouchStart = this.onHandleStart.bind(null, i);
            } else if (down.controlled === i) {
              handleEvents.onTouchMove = this.onHandleMove;
              handleEvents.onTouchEnd = this.onHandleEnd;
              handleEvents.onTouchCancel = this.onHandleAbort;
            }
          } else {
            handleEvents.onMouseDown = this.onHandleStart.bind(null, i);
          }
          handles.push(_react2.default.createElement(_Handle2.default, {
            key: i,
            active: down && down.controlled === i,
            x: fromX,
            y: centerY,
            bg: bg,
            color: prevColor,
            strokeWidth: handleStrokeSize,
            innerRadius: handleInnerDotSize,
            size: handleSize,
            events: handleEvents
          }));
        }
        prev = next;
        prevColor = color;
      }
      // Specific case to avoid blocking the slider.
      if (len >= 3 && values[len - 2] === 0 && values[len - 1] === 0) {
        var reverseFromIndex;
        for (reverseFromIndex = len - 1; values[reverseFromIndex] === 0 && reverseFromIndex > 0; reverseFromIndex--) {}
        var h1 = handles.slice(0, reverseFromIndex);
        var h2 = handles.slice(reverseFromIndex);
        h2.reverse();
        handles = h1.concat(h2);
      }
      var events = {};
      if (!touchEvents && down) {
        events.onMouseMove = this.onHandleMove;
        events.onMouseUp = this.onHandleEnd;
        events.onMouseLeave = this.onHandleAbort;
      }
      return _react2.default.createElement(
        "svg",
        _extends({
          ref: function ref(node) {
            _this2.root = node;
          }
        }, events, {
          width: "100%",
          height: "100%",
          viewBox: "0 0 " + width + " " + height
        }),
        tracks,
        handles
      );
    }
  }]);

  return MultiSlider;
}(_react2.default.Component);

MultiSlider.propTypes = {
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  values: _propTypes2.default.arrayOf(_propTypes2.default.number),
  onChange: _propTypes2.default.func,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  padX: _propTypes2.default.number,
  trackSize: _propTypes2.default.number,
  handleSize: _propTypes2.default.number,
  handleStrokeSize: _propTypes2.default.number,
  handleInnerDotSize: _propTypes2.default.number,
  bg: _propTypes2.default.string
};
MultiSlider.defaultProps = {
  colors: ["#000"], // define your own colors instead.
  handleSize: 16,
  padX: 20, // MUST be > handleSize to avoid clip issues
  width: 400,
  height: 80,
  trackSize: 6,
  handleStrokeSize: 3,
  handleInnerDotSize: 4,
  bg: "#fff"
};
exports.default = MultiSlider;
//# sourceMappingURL=MultiSlider.js.map