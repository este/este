/* eslint-disable */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPrefixr = require('react-prefixr');

var _reactPrefixr2 = _interopRequireDefault(_reactPrefixr);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PinchView = function (_Component) {
  (0, _inherits3.default)(PinchView, _Component);

  function PinchView() {
    (0, _classCallCheck3.default)(this, PinchView);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PinchView).apply(this, arguments));
  }

  (0, _createClass3.default)(PinchView, [{
    key: 'getContainerStyle',
    value: function getContainerStyle() {
      var _props = this.props;
      var backgroundColor = _props.backgroundColor;
      var containerRatio = _props.containerRatio;

      return {
        paddingTop: containerRatio.toFixed(2) + '%',
        overflow: 'hidden',
        position: 'relative',
        background: backgroundColor
      };
    }
  }, {
    key: 'getInnerStyle',
    value: function getInnerStyle() {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      };
    }
  }, {
    key: 'getHolderStyle',
    value: function getHolderStyle() {
      return {
        position: 'relative'
      };
    }
  }, {
    key: 'getContentStyle',
    value: function getContentStyle(obj) {
      return {
        width: '100%',
        height: '100%',
        align: 'center',
        display: 'flex',
        alignItems: 'center',
        transform: 'scale(' + obj.scale + ') translateY(' + obj.y + 'px)translateX(' + obj.x + 'px)',
        transition: '.3s ease-out'
      };
    }
  }, {
    key: 'renderDebug',
    value: function renderDebug(obj) {
      return _react2.default.createElement(
        'div',
        { style: { position: 'absolute', bottom: 0, left: 0, background: '#555', color: '#fff', padding: '3px 6px' } },
        'Scale: ',
        obj.scale,
        ', X: ',
        obj.x,
        ', Y: ',
        obj.y
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props;
      var debug = _props2.debug;
      var maxScale = _props2.maxScale;
      var children = _props2.children;

      return _react2.default.createElement(_.ReactPinchZoomPan, { maxScale: maxScale, render: function render(obj) {
          return _react2.default.createElement(
            'div',
            { style: _this2.getHolderStyle() },
            _react2.default.createElement(
              'div',
              { style: _this2.getContainerStyle() },
              _react2.default.createElement(
                'div',
                { style: _this2.getInnerStyle() },
                _react2.default.createElement(
                  'div',
                  { style: (0, _reactPrefixr2.default)(_this2.getContentStyle(obj)) },
                  children
                )
              )
            ),
            debug && _this2.renderDebug(obj)
          );
        } });
    }
  }]);
  return PinchView;
}(_react.Component);

PinchView.defaultProps = {
  maxScale: 2,
  containerRatio: 100,
  backgroundColor: '#f2f2f2',
  debug: false
};

PinchView.propTypes = {
  containerRatio: _react.PropTypes.number,
  maxScale: _react.PropTypes.number,
  children: _react.PropTypes.element,
  backgroundColor: _react.PropTypes.string,
  debug: _react.PropTypes.bool
};

exports.default = PinchView;
