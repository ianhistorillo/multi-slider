"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _useTouches = require("./useTouches");

var _useTouches2 = _interopRequireDefault(_useTouches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Handle = function (_React$Component) {
  _inherits(Handle, _React$Component);

  function Handle() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Handle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Handle.__proto__ || Object.getPrototypeOf(Handle)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hover: false
    }, _this.hoverIn = function () {
      return _this.setState({
        hover: true
      });
    }, _this.hoverOut = function () {
      return _this.setState({
        hover: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Handle, [{
    key: "render",
    value: function render() {
      var state = this.state;
      var hover = state.hover;
      var props = this.props;
      var active = props.active;
      var x = props.x;
      var y = props.y;
      var size = props.size;
      var strokeWidth = props.strokeWidth;
      var innerRadius = props.innerRadius;
      var bg = props.bg;
      var color = props.color;
      var events = (0, _objectAssign2.default)((0, _useTouches2.default)() ? {} : {
        onMouseEnter: this.hoverIn,
        onMouseLeave: this.hoverOut
      }, props.events);
      var style = {
        cursor: active ? "ew-resize" : "pointer",
        WebkitTapHighlightColor: "rgba(0,0,0,0)"
      };

      return _react2.default.createElement(
        "g",
        _extends({ style: style }, events),
        _react2.default.createElement("circle", { key: "1", cx: x, cy: y, r: size, fill: color }),
        _react2.default.createElement("circle", {
          key: "2",
          opacity: active ? 0 : hover ? 0.8 : 1,
          cx: x,
          cy: y,
          r: size - strokeWidth,
          fill: bg
        }),
        _react2.default.createElement("circle", {
          key: "3",
          cx: x,
          cy: y,
          r: innerRadius,
          fill: active ? bg : color
        })
      );
    }
  }]);

  return Handle;
}(_react2.default.Component);

exports.default = Handle;
//# sourceMappingURL=Handle.js.map