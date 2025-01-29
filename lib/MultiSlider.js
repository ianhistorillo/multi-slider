"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _extends =
  Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function step(min, max, x) {
  return Math.max(0, Math.min((x - min) / (max - min), 1));
}

var MultiSlider = (function (_React$Component) {
  _inherits(MultiSlider, _React$Component);

  function MultiSlider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MultiSlider);

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret =
        ((_temp =
          ((_this = _possibleConstructorReturn(
            this,
            (_ref =
              MultiSlider.__proto__ ||
              Object.getPrototypeOf(MultiSlider)).call.apply(
              _ref,
              [this].concat(args)
            )
          )),
          _this)),
        (_this.state = {
          down: null,
        }),
        (_this.concernedEvent = function (e) {
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
        }),
        (_this.onHandleStart = (i, e) => {
          const event = this.concernedEvent(e);
          if (!event) return;

          e.preventDefault();

          if (this.state.down) return;

          this.setState({
            down: {
              touchId: event.identifier,
              x: this.xForEvent(event),
              controlled: i,
            },
          });
        }),
        (_this.onHandleMove = (e) => {
          const event = this.concernedEvent(e);
          if (!event) return;

          e.preventDefault();

          if (!this.state.down) return;

          const x = this.xForEvent(event);
          const valuePos = this.reverseX(x);
          const down = this.state.down;

          if (down) {
            const values = [...this.props.values];
            const leftIndex = down.controlled - 1;
            const rightIndex = down.controlled;
            const leftValue = values[leftIndex];
            const rightValue = values[rightIndex];
            const w = leftValue + rightValue;
            let offsetLeft = 0;

            for (let i = 0; i < leftIndex; ++i) {
              offsetLeft += values[i];
            }

            const left = Math.round(
              w * step(offsetLeft, offsetLeft + w, valuePos)
            );
            const right = w - left;

            if (left !== leftValue && right !== rightValue) {
              values[leftIndex] = left;
              values[rightIndex] = right;
              this.props.onChange(values);
            }
          }
        }),
        (_this.onHandleEnd = function (e) {
          var event = _this.concernedEvent(e);
          if (!event) return;
          _this.setState({
            down: null,
          });
        }),
        (_this.onHandleAbort = function (e) {
          var event = _this.concernedEvent(e);
          if (!event) return;
          _this.setState({
            down: null,
          });
        }),
        _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  _createClass(MultiSlider, [
    {
      key: "xForEvent",
      value: function xForEvent(e) {
        var node = this.root;
        let clientX = e.clientX;

        if (e.touches) {
          clientX = e.touches[0].clientX; // Use the first touch point
        }

        let m = node.getScreenCTM();
        let p = node.createSVGPoint();
        p.x = clientX;

        p = p.matrixTransform(m.inverse());
        return p.x;
      },
    },
    {
      key: "sum",
      value: function sum() {
        return this.props.values.reduce(function (a, b) {
          return a + b;
        });
      },
    },
    {
      key: "x",
      value: function x(value) {
        var props = this.props;
        var width = props.width;
        var padX = props.padX;
        var sum = this.sum();
        return Math.round(padX + (value * (width - 2 * padX)) / sum);
      },
    },
    {
      key: "reverseX",
      value: function reverseX(x) {
        var props = this.props;
        var width = props.width;
        var padX = props.padX;
        var sum = this.sum();
        return (sum * (x - padX)) / (width - 2 * padX);
      },
    },
    {
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
          tracks.push(
            _react2.default.createElement(_Track2.default, {
              key: i,
              color: color,
              y: centerY,
              lineWidth: trackSize,
              fromX: fromX,
              toX: toX,
            })
          );
          if (i !== 0) {
            var handleEvents = {};

            handleEvents.onTouchStart = this.onHandleStart.bind(null, i);
            if (down && down.controlled === i) {
              handleEvents.onTouchMove = this.onHandleMove;
              handleEvents.onTouchEnd = this.onHandleEnd;
              handleEvents.onTouchCancel = this.onHandleAbort;
            }

            handleEvents.onMouseDown = this.onHandleStart.bind(null, i);

            handles.push(
              _react2.default.createElement(_Handle2.default, {
                key: i,
                active: down && down.controlled === i,
                x: fromX,
                y: centerY,
                bg: bg,
                color: prevColor,
                strokeWidth: handleStrokeSize,
                innerRadius: handleInnerDotSize,
                size: handleSize,
                events: handleEvents,
              })
            );
          }
          prev = next;
          prevColor = color;
        }

        var events = {};
        if (!this.props.isTouchDevice && down) {
          events.onMouseMove = this.onHandleMove;
          events.onMouseUp = this.onHandleEnd;
          events.onMouseLeave = this.onHandleAbort;
        }

        return _react2.default.createElement(
          "svg",
          _extends(
            {
              ref: function ref(node) {
                _this2.root = node;
              },
            },
            events,
            {
              width: "100%",
              height: "100%",
              viewBox: "0 0 " + width + " " + height,
            }
          ),
          tracks,
          handles
        );
      },
    },
  ]);

  return MultiSlider;
})(_react2.default.Component);

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
  bg: _propTypes2.default.string,
};

MultiSlider.defaultProps = {
  colors: ["#000"],
  handleSize: 16,
  padX: 20,
  width: 400,
  height: 80,
  trackSize: 6,
  handleStrokeSize: 3,
  handleInnerDotSize: 4,
  bg: "#fff",
};

exports.default = MultiSlider;
