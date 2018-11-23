(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('core-js/modules/es7.symbol.async-iterator'), require('core-js/modules/es6.symbol'), require('three')) :
  typeof define === 'function' && define.amd ? define(['core-js/modules/es7.symbol.async-iterator', 'core-js/modules/es6.symbol', 'three'], factory) :
  (global.MeshController = factory(null,null,global.three));
}(this, (function (es7_symbol_asyncIterator,es6_symbol,three) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var STATE = {
    NONE: -1,
    ROTATE: 0
  };
  var state = Symbol();
  var rotateStart = Symbol();
  var rotateEnd = Symbol();
  var rotateDelta = Symbol();

  var MeshController =
  /*#__PURE__*/
  function () {
    function MeshController(mesh) {
      var domElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

      _classCallCheck(this, MeshController);

      this.domElement = domElement;
      this.mesh = mesh;
      this[state] = STATE.NONE;
      this[rotateStart] = new three.Vector2();
      this[rotateEnd] = new three.Vector2();
      this[rotateDelta] = new three.Vector2();
      this.domElement.addEventListener('contextmenu', this.onContextMenu.bind(this), false);
      this.domElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    }

    _createClass(MeshController, [{
      key: "handleMouseDownRotate",
      value: function handleMouseDownRotate(ev) {
        this[rotateStart].set(ev.clientX, ev.clientY);
      }
    }, {
      key: "handleMouseMoveRotate",
      value: function handleMouseMoveRotate(ev) {
        this[rotateEnd].set(ev.clientX, ev.clientY);
        this[rotateDelta].subVectors(this[rotateEnd], this[rotateStart]);
        this[rotateStart].copy(this[rotateEnd]);
        this.update();
      }
    }, {
      key: "onContextMenu",
      value: function onContextMenu(ev) {
        ev.preventDefault();
      }
    }, {
      key: "onMouseDown",
      value: function onMouseDown(ev) {
        ev.preventDefault();

        if (ev.button === three.MOUSE.LEFT) {
          this[state] = STATE.ROTATE;
          this.handleMouseDownRotate(ev);
          this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
          this.domElement.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        }
      }
    }, {
      key: "onMouseMove",
      value: function onMouseMove(ev) {
        ev.preventDefault();

        if (this[state] === STATE.ROTATE) {
          this.handleMouseMoveRotate(ev);
        }
      }
    }, {
      key: "onMouseUp",
      value: function onMouseUp(ev) {
        ev.preventDefault();
        this[state] = STATE.NONE;
        this.domElement.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
        this.domElement.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
      }
    }, {
      key: "update",
      value: function update() {
        var angle = 2 * Math.PI * (this[rotateDelta].length() / this.domElement.clientWidth);
        var axis = this[rotateDelta].clone().rotateAround(new three.Vector2(0, 0), Math.PI / 2);
        axis = new three.Vector3(axis.x, axis.y, 0).normalize();
        this.mesh.rotateOnWorldAxis(new three.Vector3(axis.x, axis.y, 0).normalize(), angle);
      }
    }]);

    return MeshController;
  }();

  return MeshController;

})));
