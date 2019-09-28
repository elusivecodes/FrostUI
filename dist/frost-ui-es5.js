"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * FrostUI v1.0
 * https://github.com/elusivecodes/FrostUI
 */
(function (global, factory) {
  'use strict';

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory;
  } else {
    Object.assign(global, factory(global));
  }
})(window, function (window) {
  'use strict';

  if (!window) {
    throw new Error('FrostUI requires a Window.');
  }

  if (!('DOM' in window)) {
    throw new Error('FrostUI requires FrostDOM.');
  }

  var Core = window.Core;
  var DOM = window.DOM;
  var dom = window.dom;
  var QuerySet = window.QuerySet;
  var document = window.document;
  var UI = {};
  /**
   * Alert Class
   * @class
   */

  var Alert =
  /*#__PURE__*/
  function () {
    /**
     * New Alert constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Alert with.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @returns {Alert} A new Alert object.
     */
    function Alert(node, settings) {
      _classCallCheck(this, Alert);

      this._node = node;
      this._settings = _objectSpread({}, Alert.defaults, {}, dom.getDataset(this._node), {}, settings);
      this._dismiss = dom.find('[data-dismiss="alert"]', this._node);

      this._events();

      dom.setData(this._node, 'alert', this);
    }
    /**
     * Destroy the Alert.
     */


    _createClass(Alert, [{
      key: "destroy",
      value: function destroy() {
        if (this._dismiss.length) {
          dom.removeEvent(this._dismiss, 'click.frost.alert', this._dismissEvent);
        }

        dom.removeData(this._node, 'alert');
      }
      /**
       * Close the Alert.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "close",
      value: function close() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (dom.getDataset(_this._node, 'animating')) {
            return reject();
          }

          if (!DOM._triggerEvent(_this._node, 'close.frost.alert')) {
            return reject();
          }

          dom.setDataset(_this._node, 'animating', true);
          dom.fadeOut(_this._node, {
            duration: _this._settings.duration
          }).then(function (_) {
            dom.triggerEvent(_this._node, 'closed.frost.alert');
            dom.remove(_this._node);
            resolve();
          })["catch"](function (e) {
            dom.removeDataset(_this._node, 'animating');
            reject(e);
          });
        });
      }
    }]);

    return Alert;
  }(); // Default Alert options


  Alert.defaults = {
    duration: 100
  }; // Auto-initialize Alert from data-toggle

  dom.addEventOnce(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="alert"]');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var node = _step.value;
        new Alert(node);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }); // Add Alert QuerySet method

  if (QuerySet) {
    QuerySet.prototype.alert = function (a) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var options, method;

      if (Core.isObject(a)) {
        options = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      var result;
      this.each(function (node, index) {
        if (!Core.isElement(node)) {
          return;
        }

        var alert = dom.hasData(node, 'alert') ? dom.getData(node, 'alert') : new Alert(node, options);

        if (index) {
          return;
        }

        if (!method) {
          result = alert;
        } else {
          result = alert[method].apply(alert, args);
        }
      });
      return result;
    };
  }

  UI.Alert = Alert;
  /**
   * Alert Private
   */

  Object.assign(Alert.prototype, {
    /**
     * Attach events for the Alert.
     */
    _events: function _events() {
      var _this2 = this;

      this._dismissEvent = function (e) {
        e.preventDefault();

        _this2.close()["catch"](function (_) {});
      };

      if (this._dismiss.length) {
        dom.addEvent(this._dismiss, 'click.frost.alert', this._dismissEvent);
      }
    }
  });
  /**
   * Button Class
   * @class
   */

  var Button =
  /*#__PURE__*/
  function () {
    /**
     * New Button constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Button with.
     * @returns {Button} A new Button object.
     */
    function Button(node, settings) {
      _classCallCheck(this, Button);

      this._node = node;
      this._settings = _objectSpread({}, Button.defaults, {}, dom.getDataset(this._node), {}, settings);
      this._input = dom.findOne('input[type="checkbox"], input[type="radio"]', this._node);
      this._isRadio = this._input && dom.is(this._input, '[type="radio"]');

      if (this._isRadio) {
        this._siblings = dom.siblings(this._node);
      }

      this._events();

      dom.setData(this._node, 'button', this);
    }
    /**
     * Destroy the Button.
     */


    _createClass(Button, [{
      key: "destroy",
      value: function destroy() {
        dom.removeEvent(this._node, 'frost.click.button', this._clickEvent);
        dom.removeData(this._node, 'button');
      }
      /**
       * Toggle the Button.
       */

    }, {
      key: "toggle",
      value: function toggle() {
        this._isRadio ? this._toggleRadio() : this._toggleCheckbox();
      }
    }]);

    return Button;
  }(); // Default Button options


  Button.defaults = {}; // Auto-initialize Button from data-toggle

  dom.addEventOnce(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="buttons"] > *, [data-toggle="button"]');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var node = _step2.value;
        new Button(node);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }); // Add Button QuerySet method

  if (QuerySet) {
    QuerySet.prototype.button = function (a) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var options, method;

      if (Core.isObject(a)) {
        options = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      var result;
      this.each(function (node, index) {
        if (!Core.isElement(node)) {
          return;
        }

        var button = dom.hasData(node, 'button') ? dom.getData(node, 'button') : new Button(node, options);

        if (index) {
          return;
        }

        if (!method) {
          result = button;
        } else {
          result = button[method].apply(button, args);
        }
      });
      return result;
    };
  }

  UI.Button = Button;
  /**
   * Button Private
   */

  Object.assign(Button.prototype, {
    /**
     * Attach events for the Button.
     */
    _events: function _events() {
      var _this3 = this;

      this._clickEvent = function (e) {
        e.preventDefault();

        _this3.toggle();
      };

      dom.addEvent(this._node, 'click.frost.button', this._clickEvent);
    },

    /**
     * Toggle a checkbox-type Button.
     */
    _toggleCheckbox: function _toggleCheckbox() {
      dom.toggleClass(this._node, 'active');

      if (this._input) {
        dom.setProperty(this._input, 'checked', !dom.getProperty(this._input, 'checked'));
        dom.triggerEvent(this._input, 'change');
      }
    },

    /**
     * Toggle a radio-type Button.
     */
    _toggleRadio: function _toggleRadio() {
      dom.addClass(this._node, 'active');

      if (this._siblings) {
        dom.removeClass(this._siblings, 'active');
      }

      dom.setProperty(this._input, 'checked', true);
      dom.triggerEvent(this._input, 'change');
    }
  });
  /**
   * Carousel Class
   * @class
   */

  var Carousel =
  /*#__PURE__*/
  function () {
    /**
     * New Carousel constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Carousel with.
     * @param {number} [settings.interval=5000] The duration of the interval.
     * @param {number} [settings.transition=500] The duration of the transition.
     * @param {Boolean} [settings.keyboard=true] Whether to all keyboard navigation.
     * @param {Boolean|string} [settings.ride=false] Set to "carousel" to automatically start the carousel.
     * @param {Boolean} [settings.pause=true] Whether to pause the carousel on mouseover.
     * @param {Boolean} [settings.wrap=true] Whether the carousel should cycle around.
     * @returns {Carousel} A new Carousel object.
     */
    function Carousel(node, settings) {
      _classCallCheck(this, Carousel);

      this._node = node;
      this._settings = _objectSpread({}, Carousel.defaults, {}, dom.getDataset(this._node), {}, settings);
      this._items = dom.find('.carousel-item', this._node);
      this._index = this._items.findIndex(function (item) {
        return dom.hasClass(item, 'active');
      });
      this._queue = [];

      this._events();

      dom.setData(this._node, 'carousel', this);

      if (this._settings.ride === 'carousel') {
        this._setTimer();
      }
    }
    /**
     * Cycle to the next carousel item.
     */


    _createClass(Carousel, [{
      key: "cycle",
      value: function cycle() {
        dom.isHidden(document) ? this._setTimer() : this.slide(1);
      }
      /**
       * Destroy the Carousel.
       */

    }, {
      key: "destroy",
      value: function destroy() {
        if (this._timer) {
          clearTimeout(this._timer);
        }

        dom.removeEvent(this._node, 'click.frost.carousel', this._clickNextEvent);
        dom.removeEvent(this._node, 'click.frost.carousel', this._clickPrevEvent);
        dom.removeEvent(this._node, 'click.frost.carousel', this._clickSlideEvent);

        if (this._settings.keyboard) {
          dom.removeEvent(this._node, 'keydown.frost.carousel', this._keyDownEvent);
        }

        if (this._settings.pause) {
          dom.removeEvent(this._node, 'mouseenter.frost.carousel', this._mouseEnterEvent);
          dom.removeEvent(this._node, 'mouseleave.frost.carousel', this._mouseLeaveEvent);
        }

        dom.removeData(this._node, 'carousel');
      }
      /**
       * Cycle to the next Carousel item.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "next",
      value: function next() {
        return this.slide();
      }
      /**
       * Stop the carousel from cycling through items.
       */

    }, {
      key: "pause",
      value: function pause() {
        if (this._timer) {
          clearTimeout(this._timer);
        }
      }
      /**
       * Cycle to the previous Carousel item.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "prev",
      value: function prev() {
        return this.slide(-1);
      }
      /**
       * Cycle to a specific Carousel item.
       * @param {number} index The item index to cycle to.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "show",
      value: function show(index) {
        return this._show(index);
      }
      /**
       * Slide the Carousel in a specific direction.
       * @param {number} [direction=1] The direction to slide to.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "slide",
      value: function slide() {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var index = this._queue.length ? this._queue[this._queue.length - 1].index : this._index;
        return this.show(index + direction);
      }
    }]);

    return Carousel;
  }(); // Default Carousel options


  Carousel.defaults = {
    interval: 5000,
    transition: 500,
    keyboard: true,
    ride: false,
    pause: true,
    wrap: true
  }; // Auto-initialize Carousel from data-ride

  dom.addEventOnce(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="carousel"], [data-ride="carousel"]');
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = nodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var node = _step3.value;
        new Carousel(node);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }); // Add Carousel QuerySet method

  if (QuerySet) {
    QuerySet.prototype.carousel = function (a) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var options, method;

      if (Core.isObject(a)) {
        options = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      var result;
      this.each(function (node, index) {
        if (!Core.isElement(node)) {
          return;
        }

        var carousel = dom.hasData(node, 'carousel') ? dom.getData(node, 'carousel') : new Carousel(node, options);

        if (index) {
          return;
        }

        if (!method) {
          result = carousel;
        } else {
          result = carousel[method].apply(carousel, args);
        }
      });
      return result;
    };
  }

  UI.Carousel = Carousel;
  /**
   * Carousel Private
   */

  Object.assign(Carousel.prototype, {
    /**
     * Attach events for the Carousel.
     */
    _events: function _events() {
      var _this4 = this;

      this._clickNextEvent = function (e) {
        e.preventDefault();

        _this4.next()["catch"](function (_) {});
      };

      this._clickPrevEvent = function (e) {
        e.preventDefault();

        _this4.prev()["catch"](function (_) {});
      };

      this._clickSlideEvent = function (e) {
        e.preventDefault();
        var slideTo = dom.getDataset(e.currentTarget, 'slideTo');

        _this4.show(slideTo)["catch"](function (_) {});
      };

      this._keyDownEvent = function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
          return;
        }

        e.preventDefault();

        if (e.key === 'ArrowLeft') {
          _this4.prev()["catch"](function (_) {});
        } else if (e.key === 'ArrowRight') {
          _this4.next()["catch"](function (_) {});
        }
      };

      this._mouseEnterEvent = function (_) {
        return _this4.pause();
      };

      this._mouseLeaveEvent = function (_) {
        return _this4._setTimer();
      };

      dom.addEventDelegate(this._node, 'click.frost.carousel', '.carousel-next', this._clickNextEvent);
      dom.addEventDelegate(this._node, 'click.frost.carousel', '.carousel-prev', this._clickPrevEvent);
      dom.addEventDelegate(this._node, 'click.frost.carousel', '[data-slide-to]', this._clickSlideEvent);

      if (this._settings.keyboard) {
        dom.addEvent(this._node, 'keydown.frost.carousel', this._keyDownEvent);
      }

      if (this._settings.pause) {
        dom.addEvent(this._node, 'mouseenter.frost.carousel', this._mouseEnterEvent);
        dom.addEvent(this._node, 'mouseleave.frost.carousel', this._mouseLeaveEvent);
      }
    },

    /**
     * Set a timer for the next Carousel cycle.
     */
    _setTimer: function _setTimer() {
      var _this5 = this;

      var interval = dom.getDataset(this._items[this._index], 'interval');
      this._timer = setTimeout(function (_) {
        return _this5.cycle();
      }, interval ? interval : this._settings.interval);
    },

    /**
     * Cycle to a specific Carousel item.
     * @param {number} index The item index to cycle to.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    _show: function _show(index) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        if (dom.getDataset(_this6._node, 'sliding')) {
          _this6._queue.push(index);

          return;
        }

        index = parseInt(index);

        if (!_this6._settings.wrap && (index < 0 || index > _this6._items.length - 1)) {
          return reject();
        }

        var dir = 0;

        if (index < 0) {
          dir = -1;
        } else if (index > _this6._items.length - 1) {
          dir = 1;
        }

        index %= _this6._items.length;

        if (index < 0) {
          index = _this6._items.length + index;
        }

        if (index === _this6._index) {
          return reject();
        }

        var direction = dir == -1 || dir == 0 && index < _this6._index ? 'left' : 'right';
        var eventData = {
          direction: direction,
          relatedTarget: _this6._items[index],
          from: _this6._index,
          to: index
        };

        if (!DOM._triggerEvent(_this6._node, 'slide.frost.carousel', eventData)) {
          return reject();
        }

        var oldIndex = _this6._index;
        _this6._index = index;
        dom.setDataset(_this6._node, 'sliding', true);

        _this6.pause();

        dom.addClass(_this6._items[_this6._index], 'active');
        dom.removeClass(_this6._items[oldIndex], 'active');
        dom.animate(_this6._items[_this6._index], function (node, progress, options) {
          return _this6._update(node, _this6._items[oldIndex], progress, options.direction);
        }, {
          direction: direction,
          duration: _this6._settings.transition
        }).then(function (_) {
          dom.removeClass(dom.find('.active[data-slide-to]', _this6._node), 'active');
          dom.addClass(dom.find('[data-slide-to="' + _this6._index + '"]', _this6._node), 'active');
          dom.removeDataset(_this6._node, 'sliding');
          dom.triggerEvent(_this6._node, 'slid.frost.carousel', eventData);
          resolve();

          if (!_this6._queue.length) {
            _this6._setTimer();

            return;
          }

          var next = _this6._queue.shift();

          return _this6._show(next);
        })["catch"](reject);
      });
    },

    /**
     * Update the position of the Carousel items.
     * @param {Node} nodeIn The new node.
     * @param {Node} nodeOut The old node.
     * @param {number} progress The progress of the cycle.
     * @param {string} direction The direction to cycle to.
     */
    _update: function _update(nodeIn, nodeOut, progress, direction) {
      if (progress >= 1) {
        DOMNode.setStyle(nodeOut, 'display', '');
        DOMNode.setStyle(nodeOut, 'transform', '');
        DOMNode.setStyle(nodeIn, 'transform', '');
        return;
      }

      var inverse = direction === 'right';
      DOMNode.setStyle(nodeOut, 'display', 'block');
      DOMNode.setStyle(nodeOut, 'transform', "translateX(".concat(Math.round(progress * 100) * (inverse ? -1 : 1), "%)"));
      DOMNode.setStyle(nodeIn, 'transform', "translateX(".concat(Math.round((1 - progress) * 100) * (inverse ? 1 : -1), "%)"));
    }
  });
  /**
   * Collapse Class
   * @class
   */

  var Collapse =
  /*#__PURE__*/
  function () {
    /**
     * New Collapse constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Collapse with.
     * @param {string} [settings.direction=bottom] The direction to collapse the targets from/to.
     * @param {number} [settings.duration=300] The duration of the animation.
     * @returns {Collapse} A new Collapse object.
     */
    function Collapse(node, settings) {
      _classCallCheck(this, Collapse);

      this._node = node;
      this._settings = _objectSpread({}, Collapse.defaults, {}, dom.getDataset(this._node), {}, settings);
      this._targets = dom.find(this._settings.target);

      this._events();

      dom.setData(this._node, 'collapse', this);
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._targets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var target = _step4.value;

          if (!Collapse._toggles.has(target)) {
            Collapse._toggles.set(target, []);
          }

          Collapse._toggles.get(target).push(this._node);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
    /**
     * Destroy the Collapse.
     */


    _createClass(Collapse, [{
      key: "destroy",
      value: function destroy() {
        var _this7 = this;

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this._targets[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var target = _step5.value;

            var toggles = Collapse._toggles.get(target).filter(function (toggle) {
              return !dom.isSame(toggle, _this7._node);
            });

            if (toggles.length) {
              Collapse._toggles.set(target, toggles);
            } else {
              Collapse._toggles["delete"](target);
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        dom.removeEvent(this._node, 'click.frost.collapse', this._clickEvent);
        dom.removeData(this._node, 'collapse');
      }
      /**
       * Hide the target element.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this8 = this;

        return new Promise(function (resolve, reject) {
          var targets = _this8._targets.filter(function (target) {
            return dom.hasClass(target, 'show') && !dom.getDataset(target, 'animating');
          });

          if (!targets.length) {
            return reject();
          }

          if (!DOM._triggerEvent(_this8._node, 'hide.frost.collapse')) {
            return reject();
          }

          dom.setDataset(targets, 'animating', true);
          dom.squeezeOut(targets, {
            direction: _this8._settings.direction,
            duration: _this8._settings.duration
          }).then(function (_) {
            dom.removeClass(targets, 'show');

            _this8._setExpanded(targets, false);

            dom.triggerEvent(_this8._node, 'hidden.frost.collapse');
            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset(targets, 'animating');
          });
        });
      }
      /**
       * Show the target element.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "show",
      value: function show() {
        var _this9 = this;

        return new Promise(function (resolve, reject) {
          var targets = _this9._targets.filter(function (target) {
            return dom.hasClass(target, 'show') && !dom.getDataset(target, 'animating');
          });

          if (!targets.length) {
            return reject();
          }

          var accordion = _this9._getAccordion(hidden);

          if (!accordion) {
            return reject();
          }

          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = accordion.nodes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var node = _step6.value;

              if (!DOM._triggerEvent(node, 'hide.frost.collapse')) {
                return reject();
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                _iterator6["return"]();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }

          if (!DOM._triggerEvent(_this9._node, 'show.frost.collapse')) {
            return reject();
          }

          var allTargets = _toConsumableArray(targets);

          allTargets.push.apply(allTargets, _toConsumableArray(accordion.targets));
          dom.setDataset(allTargets, 'animating', true);
          var animations = allTargets.map(function (target) {
            var animation = accordion.targets.includes(target) ? 'squeezeOut' : 'squeezeIn';
            return dom[animation](target, {
              direction: _this9._settings.direction,
              duration: _this9._settings.duration,
              type: 'linear'
            });
          });
          dom.addClass(targets, 'show');
          Promise.all(animations).then(function (_) {
            if (accordion.targets.length) {
              dom.removeClass(accordion.targets, 'show');

              _this9._setExpanded(accordion.targets, false);
            }

            if (accordion.nodes.length) {
              dom.triggerEvent(accordion.nodes, 'hidden.frost.collapse');
            }

            _this9._setExpanded(targets);

            dom.triggerEvent(_this9._node, 'shown.frost.collapse');
            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset(allTargets, 'animating');
          });
        });
      }
      /**
       * Toggle the target element.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "toggle",
      value: function toggle() {
        var _this10 = this;

        return new Promise(function (resolve, reject) {
          var targets = [];
          var hidden = [];
          var visible = [];
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = _this10._targets[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var target = _step7.value;

              if (dom.getDataset(target, 'animating')) {
                continue;
              }

              targets.push(target);

              if (dom.hasClass(target, 'show')) {
                visible.push(target);
              } else {
                hidden.push(target);
              }
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                _iterator7["return"]();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }

          if (!targets.length) {
            return reject();
          }

          if (visible.length && !DOM._triggerEvent(_this10._node, 'hide.frost.collapse')) {
            return reject();
          }

          var accordion = _this10._getAccordion(hidden);

          if (!accordion) {
            return reject();
          }

          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = accordion.nodes[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var node = _step8.value;

              if (!DOM._triggerEvent(node, 'hide.frost.collapse')) {
                return reject();
              }
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                _iterator8["return"]();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }

          if (hidden.length && !DOM._triggerEvent(_this10._node, 'show.frost.collapse')) {
            return reject();
          }

          var allTargets = [].concat(targets);
          allTargets.push.apply(allTargets, _toConsumableArray(accordion.targets));
          dom.setDataset(allTargets, 'animating', true);
          var animations = allTargets.map(function (target) {
            var animation = visible.includes(target) || accordion.targets.includes(target) ? 'squeezeOut' : 'squeezeIn';
            return dom[animation](target, {
              direction: _this10._settings.direction,
              duration: _this10._settings.duration,
              type: 'linear'
            });
          });
          dom.addClass(hidden, 'show');
          Promise.all(animations).then(function (_) {
            if (accordion.targets.length) {
              dom.removeClass(accordion.targets, 'show');

              _this10._setExpanded(accordion.targets, false);
            }

            if (accordion.nodes.length) {
              dom.triggerEvent(accordion.nodes, 'hidden.frost.collapse');
            }

            if (visible.length) {
              dom.removeClass(visible, 'show');

              _this10._setExpanded(visible, false);

              dom.triggerEvent(_this10._node, 'hidden.frost.collapse');
            }

            if (hidden.length) {
              _this10._setExpanded(hidden);

              dom.triggerEvent(_this10._node, 'shown.frost.collapse');
            }

            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset(allTargets, 'animating');
          });
        });
      }
    }]);

    return Collapse;
  }(); // Default Collapse options


  Collapse.defaults = {
    direction: 'bottom',
    duration: 250
  };
  Collapse._toggles = new WeakMap(); // Auto-initialize Collapse from data-ride

  dom.addEventOnce(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="collapse"]');
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = nodes[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var node = _step9.value;
        new Collapse(node);
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
          _iterator9["return"]();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }
  }); // Add Collapse QuerySet method

  if (QuerySet) {
    QuerySet.prototype.collapse = function (a) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      var options, method;

      if (Core.isObject(a)) {
        options = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      var result;
      this.each(function (node, index) {
        if (!Core.isElement(node)) {
          return;
        }

        var collapse = dom.hasData(node, 'collapse') ? dom.getData(node, 'collapse') : new Collapse(node, options);

        if (index) {
          return;
        }

        if (!method) {
          result = collapse;
        } else {
          result = collapse[method].apply(collapse, args);
        }
      });
      return result;
    };
  }

  UI.Collapse = Collapse;
  /**
   * Collapse Private
   */

  Object.assign(Collapse.prototype, {
    /**
     * Attach events for the Collapse.
     */
    _events: function _events() {
      var _this11 = this;

      this._clickEvent = function (e) {
        e.preventDefault();

        _this11.toggle()["catch"](function (_) {});
      };

      dom.addEvent(this._node, 'click.frost.collapse', this._clickEvent);
    },

    /**
     * Get accordion toggles and targets for the target nodes.
     * @param {array} targets The target nodes.
     * @return {object} The accordion toggles and targets.
     */
    _getAccordion: function _getAccordion(targets) {
      var _this12 = this;

      var accordionToggles = [];
      var accordionTargets = [];
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = targets[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var target = _step10.value;
          var parent = dom.getDataset(target, 'parent');

          if (!parent) {
            continue;
          }

          var parentNode = dom.closest(target, parent);
          var collapseToggles = dom.find('[data-toggle="collapse"]', parentNode).filter(function (toggle) {
            return !dom.isSame(toggle, _this12._node) && dom.hasData(toggle, 'collapse');
          });
          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (var _iterator11 = collapseToggles[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
              var toggle = _step11.value;

              if (accordionToggles.includes(toggle)) {
                continue;
              }

              var collapse = dom.getData(toggle, 'collapse');
              var collapseTargets = dom.find(collapse._settings.target).filter(function (target) {
                return !targets.includes(target) && !accordionTargets.includes(target) && dom.hasClass(target, 'show');
              });

              if (!collapseTargets.length) {
                continue;
              }

              if (collapseTargets.find(function (target) {
                return dom.getDataset(target, 'animating');
              })) {
                return false;
              }

              accordionToggles.push(toggle);
              accordionTargets.push.apply(accordionTargets, _toConsumableArray(collapseTargets));
            }
          } catch (err) {
            _didIteratorError11 = true;
            _iteratorError11 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
                _iterator11["return"]();
              }
            } finally {
              if (_didIteratorError11) {
                throw _iteratorError11;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      return {
        nodes: accordionToggles,
        targets: accordionTargets
      };
    },

    /**
     * Set the ARIA expanded attribute for all targets.
     * @param {array} targets The targets array.
     * @param {Boolean} [expanded=true] Whether the target is expanded.
     */
    _setExpanded: function _setExpanded(targets) {
      var expanded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = targets[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var target = _step12.value;

          var toggles = Collapse._toggles.get(target);

          var _iteratorNormalCompletion13 = true;
          var _didIteratorError13 = false;
          var _iteratorError13 = undefined;

          try {
            for (var _iterator13 = toggles[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
              var toggle = _step13.value;
              dom.setAttribute(toggle, 'aria-expanded', expanded);
            }
          } catch (err) {
            _didIteratorError13 = true;
            _iteratorError13 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
                _iterator13["return"]();
              }
            } finally {
              if (_didIteratorError13) {
                throw _iteratorError13;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    }
  });
  /**
   * Dropdown Class
   * @class
   */

  var Dropdown =
  /*#__PURE__*/
  function () {
    /**
     * New Dropdown constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Dropdown with.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @param {string} [settings.placement=bottom] The placement of the dropdown relative to the toggle.
     * @param {string} [settings.position=start] The position of the dropdown relative to the toggle.
     * @param {Boolean} [settings.fixed=false] Whether the dropdown position is fixed.
     * @param {number} [settings.spacing=2] The spacing between the dropdown and the toggle.
     * @param {number} [settings.minContact=false] The minimum amount of contact the dropdown must make with the toggle.
     * @returns {Dropdown} A new Dropdown object.
     */
    function Dropdown(node, settings) {
      _classCallCheck(this, Dropdown);

      this._node = node;
      this._settings = _objectSpread({}, Dropdown.defaults, {}, dom.getDataset(this._node), {}, settings);
      this._containerNode = dom.parent(this._node);
      this._menuNode = dom.siblings(this._node).find(function (child) {
        return dom.hasClass(child, 'dropdown-menu');
      });

      if (this._settings.reference) {
        if (this._settings.reference === 'parent') {
          this._referenceNode = this._containerNode;
        } else {
          this._referenceNode = dom.findOne(this._settings.reference);
        }
      } else {
        this._referenceNode = this._node;
      } // Attach popper


      if (!dom.closest(this._node, '.navbar-nav').length) {
        this._popper = new Popper(this._menuNode, {
          reference: this._referenceNode,
          placement: this._settings.placement,
          position: this._settings.position,
          fixed: this._settings.fixed,
          spacing: this._settings.spacing,
          minContact: this._settings.minContact
        });
      }

      this._events();

      dom.setData(this._node, 'dropdown', this);
    }
    /**
     * Destroy the Dropdown.
     */


    _createClass(Dropdown, [{
      key: "destroy",
      value: function destroy() {
        dom.stop(this._menuNode, true);

        if (this._popper) {
          this._popper.destroy();
        }

        dom.removeClass(this._containerNode, 'open');
        dom.removeEvent(document, 'click.frost.dropdown', this._documentClickEvent);
        dom.removeEvent(this._node, 'click.frost.dropdown', this._clickEvent);
        dom.removeEvent(this._node, 'keyup.frost.dropdown', this._keyUpEvent);
        dom.removeEvent(this._node, 'keydown.frost.dropdown', this._keyDownEvent);
        dom.removeEventDelegate(this._menuNode, 'keydown.frost.dropdown', '.dropdown-item', this._menuKeyDownEvent);
        dom.removeData(this._node, 'dropdown');
      }
      /**
       * Hide the Dropdown.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this13 = this;

        return new Promise(function (resolve, reject) {
          if (!dom.hasClass(_this13._containerNode, 'open') || dom.getDataset(_this13._menuNode, 'animating')) {
            return reject();
          }

          if (!DOM._triggerEvent(_this13._node, 'hide.frost.dropdown')) {
            return reject();
          }

          dom.setDataset(_this13._menuNode, 'animating', true);
          dom.removeEvent(document, 'click.frost.dropdown', _this13._documentClickEvent);
          dom.fadeOut(_this13._menuNode, {
            duration: _this13._settings.duration
          }).then(function (_) {
            dom.removeClass(_this13._containerNode, 'open');
            dom.setAttribute(_this13._node, 'aria-expanded', false);
            dom.triggerEvent(_this13._node, 'hidden.frost.dropdown');
            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset(_this13._menuNode, 'animating');
          });
        });
      }
      /**
       * Show the Dropdown.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "show",
      value: function show() {
        var _this14 = this;

        return new Promise(function (resolve, reject) {
          if (dom.hasClass(_this14._containerNode, 'open') || dom.getDataset(_this14._menuNode, 'animating')) {
            return reject();
          }

          if (!DOM._triggerEvent(_this14._node, 'show.frost.dropdown')) {
            return reject();
          }

          dom.setDataset(_this14._menuNode, 'animating', true);
          dom.addClass(_this14._containerNode, 'open');
          dom.fadeIn(_this14._menuNode, {
            duration: _this14._settings.duration
          }).then(function (_) {
            dom.setAttribute(_this14._node, 'aria-expanded', true);
            dom.addEvent(document, 'click.frost.dropdown', _this14._documentClickEvent);
            dom.triggerEvent(_this14._node, 'shown.frost.dropdown');
            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset(_this14._menuNode, 'animating');
          });
        });
      }
      /**
       * Toggle the Dropdown.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "toggle",
      value: function toggle() {
        return dom.hasClass(this._containerNode, 'open') ? this.hide() : this.show();
      }
    }]);

    return Dropdown;
  }(); // Default Dropdown options


  Dropdown.defaults = {
    duration: 100,
    placement: 'bottom',
    position: 'start',
    fixed: false,
    spacing: 2,
    minContact: false
  }; // Auto-initialize Dropdown from data-toggle

  dom.addEventOnce(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="dropdown"]');
    var _iteratorNormalCompletion14 = true;
    var _didIteratorError14 = false;
    var _iteratorError14 = undefined;

    try {
      for (var _iterator14 = nodes[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
        var node = _step14.value;
        new Dropdown(node);
      }
    } catch (err) {
      _didIteratorError14 = true;
      _iteratorError14 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
          _iterator14["return"]();
        }
      } finally {
        if (_didIteratorError14) {
          throw _iteratorError14;
        }
      }
    }
  }); // Add Dropdown QuerySet method

  if (QuerySet) {
    QuerySet.prototype.dropdown = function (a) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      var options, method;

      if (Core.isObject(a)) {
        options = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      var result;
      this.each(function (node, index) {
        if (!Core.isElement(node)) {
          return;
        }

        var dropdown = dom.hasData(node, 'dropdown') ? dom.getData(node, 'dropdown') : new Dropdown(node, options);

        if (index) {
          return;
        }

        if (!method) {
          result = dropdown;
        } else {
          result = dropdown[method].apply(dropdown, args);
        }
      });
      return result;
    };
  }

  UI.Dropdown = Dropdown;
  /**
   * Dropdown Private
   */

  Object.assign(Dropdown.prototype, {
    /**
     * Attach events for the Dropdown.
     */
    _events: function _events() {
      var _this15 = this;

      this._clickEvent = function (e) {
        e.preventDefault();

        _this15.toggle()["catch"](function (_) {});
      };

      this._keyUpEvent = function (e) {
        if (e.key !== ' ') {
          return;
        }

        e.preventDefault();

        _this15.toggle()["catch"](function (_) {});
      };

      this._keyDownEvent = function (e) {
        if (!['ArrowDown', 'ArrowUp'].includes(e.key)) {
          return;
        }

        e.preventDefault();

        _this15.show().then(function (_) {
          var next = dom.findOne('.dropdown-item', _this15._menuNode);
          dom.focus(next);
        })["catch"](function (_) {});
      };

      this._menuKeyDownEvent = function (e) {
        if (!['ArrowDown', 'ArrowUp'].includes(e.key)) {
          return;
        }

        e.preventDefault();

        if (e.key === 'ArrowDown') {
          var next = dom.nextAll(e.currentTarget, '.dropdown-item').shift();
          dom.focus(next);
        } else if (e.key === 'ArrowUp') {
          var prev = dom.prevAll(e.currentTarget, '.dropdown-item').shift();
          dom.focus(prev);
        }
      };

      this._documentClickEvent = function (e) {
        if ((dom.isSame(e.target, _this15._menuNode) || dom.hasDescendent(_this15._menuNode, e.target)) && (dom.getDataset(e.target, 'dropdownClose') === false || dom.closest(e.target, function (parent) {
          return dom.getDataset(parent, 'dropdownClose') === false;
        }, _this15._menuNode).length)) {
          return;
        }

        _this15.hide()["catch"](function (_) {});
      };

      dom.addEvent(this._node, 'click.frost.dropdown', this._clickEvent);
      dom.addEvent(this._node, 'keyup.frost.dropdown', this._keyUpEvent);
      dom.addEvent(this._node, 'keydown.frost.dropdown', this._keyDownEvent);
      dom.addEventDelegate(this._menuNode, 'keydown.frost.dropdown', '.dropdown-item', this._menuKeyDownEvent);
    }
  });
  /**
   * Modal Class
   * @class
   */

  var Modal =
  /*#__PURE__*/
  function () {
    /**
     * New Modal constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Modal with.
     * @param {number} [settings.duration=250] The duration of the animation.
     * @param {Boolean} [settings.backdrop=true] Whether to display a backdrop for the modal.
     * @param {Boolean} [settings.focus=true] Whether to set focus on the modal when shown.
     * @param {Boolean} [settings.show=true] Whether to show the modal on initialization.
     * @param {Boolean} [settings.keyboard=true] Whether to close the modal when the escape key is pressed.
     * @returns {Modal} A new Modal object.
     */
    function Modal(node, settings) {
      _classCallCheck(this, Modal);

      this._node = node;
      this._settings = _objectSpread({}, Modal.defaults, {}, dom.getDataset(node), {}, settings);
      this._dialog = dom.child(this._node, '.modal-dialog').shift();
      this._dismiss = dom.find('[data-dismiss="modal"]', this._node);

      this._events();

      if (this._settings.show) {
        this.show();
      }

      dom.setData(this._node, 'modal', this);
    }
    /**
     * Destroy the Modal.
     */


    _createClass(Modal, [{
      key: "destroy",
      value: function destroy() {
        if (Modal._toggles.has(this._node)) {
          var toggles = Modal._toggles.get(this._node);

          dom.removeEvent(toggles, 'click.frost.modal', this._clickEvent);

          Modal._toggles["delete"](this._node);
        }

        if (this._dismiss.length) {
          dom.removeEvent(this._dismiss, 'click.frost.modal', this._dismissEvent);
        }

        if (this._settings.backdrop) {
          dom.removeEvent(document, 'click.frost.modal', this._documentClickEvent);
        }

        if (this._settings.keyboard) {
          dom.removeEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
        }

        dom.removeData(this._node, 'modal');
      }
      /**
       * Hide the Modal.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this16 = this;

        return new Promise(function (resolve, reject) {
          if (!dom.hasClass(_this16._node, 'show') || dom.getDataset(_this16._dialog, 'animating')) {
            return reject();
          }

          if (!DOM._triggerEvent(_this16._node, 'hide.frost.modal')) {
            return reject();
          }

          dom.setDataset([_this16._dialog, _this16._backdrop], 'animating', true);

          if (_this16._settings.backdrop) {
            dom.removeEvent(document, 'click.frost.modal', _this16._documentClickEvent);
          }

          if (_this16._settings.keyboard) {
            dom.removeEvent(window, 'keydown.frost.modal', _this16._windowKeyDownEvent);
          }

          Promise.all([dom.fadeOut(_this16._dialog, {
            duration: _this16._settings.duration
          }), dom.dropOut(_this16._dialog, {
            duration: _this16._settings.duration
          }), dom.fadeOut(_this16._backdrop, {
            duration: _this16._settings.duration
          })]).then(function (_) {
            if (_this16._settings.backdrop) {
              dom.remove(_this16._backdrop);
              _this16._backdrop = null;
            }

            dom.removeAttribute(_this16._node, 'aria-modal');
            dom.setAttribute(_this16._node, 'aria-hidden', true);
            dom.removeClass(_this16._node, 'show');
            dom.removeClass(document.body, 'modal-open');
            dom.triggerEvent(_this16._node, 'hidden.frost.modal');
            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset([_this16._dialog, _this16._backdrop], 'animating');
          });
        });
      }
      /**
       * Show the Modal.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "show",
      value: function show() {
        var _this17 = this;

        return new Promise(function (resolve, reject) {
          if (dom.hasClass(_this17._node, 'show') || dom.getDataset(_this17._dialog, 'animating')) {
            return reject();
          }

          if (!DOM._triggerEvent(_this17._node, 'show.frost.modal')) {
            return reject();
          }

          if (_this17._settings.backdrop) {
            _this17._backdrop = dom.create('div', {
              "class": 'modal-backdrop'
            });
            dom.append(document.body, _this17._backdrop);
          }

          dom.setDataset([_this17._dialog, _this17._backdrop], 'animating', true);
          dom.addClass(_this17._node, 'show');
          dom.addClass(document.body, 'modal-open');
          Promise.all([dom.fadeIn(_this17._dialog, {
            duration: _this17._settings.duration
          }), dom.dropIn(_this17._dialog, {
            duration: _this17._settings.duration
          }), dom.fadeIn(_this17._backdrop, {
            duration: _this17._settings.duration
          })]).then(function (_) {
            dom.removeAttribute(_this17._node, 'aria-hidden');
            dom.setAttribute(_this17._node, 'aria-modal', true);

            if (_this17._settings.backdrop) {
              dom.addEvent(document, 'click.frost.modal', _this17._documentClickEvent);
            }

            if (_this17._settings.keyboard) {
              dom.addEvent(window, 'keydown.frost.modal', _this17._windowKeyDownEvent);
            }

            if (_this17._settings.focus) {
              dom.focus(_this17._node);
            }

            dom.triggerEvent(_this17._node, 'shown.frost.modal');
            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset([_this17._dialog, _this17._backdrop], 'animating');
          });
        });
      }
      /**
       * Toggle the Modal.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "toggle",
      value: function toggle() {
        return dom.hasClass(this._node, 'show') ? this.hide() : this.show();
      }
    }], [{
      key: "fromToggle",
      value: function fromToggle(toggle) {
        var show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var target = dom.getDataset(toggle, 'target');
        var element = dom.findOne(target);
        var modal = dom.hasData(element, 'modal') ? dom.getData(element, 'modal') : new this(element, {
          show: show
        });

        if (!this._toggles.has(element)) {
          this._toggles.set(element, []);
        }

        this._toggles.get(element).push(toggle);

        dom.addEvent(toggle, 'click.frost.modal', modal._clickEvent);
      }
    }]);

    return Modal;
  }(); // Default Modal options


  Modal.defaults = {
    duration: 250,
    backdrop: true,
    focus: true,
    show: true,
    keyboard: true
  };
  Modal._toggles = new WeakMap(); // Auto-initialize Modal from data-toggle

  dom.addEventOnce(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="modal"]');
    var _iteratorNormalCompletion15 = true;
    var _didIteratorError15 = false;
    var _iteratorError15 = undefined;

    try {
      for (var _iterator15 = nodes[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
        var node = _step15.value;
        Modal.fromToggle(node);
      }
    } catch (err) {
      _didIteratorError15 = true;
      _iteratorError15 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
          _iterator15["return"]();
        }
      } finally {
        if (_didIteratorError15) {
          throw _iteratorError15;
        }
      }
    }
  }); // Add Modal QuerySet method

  if (QuerySet) {
    QuerySet.prototype.modal = function (a) {
      for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      var options, method;

      if (Core.isObject(a)) {
        options = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      var result;
      this.each(function (node, index) {
        if (!Core.isElement(node)) {
          return;
        }

        var modal = dom.hasData(node, 'modal') ? dom.getData(node, 'modal') : new Modal(node, options);

        if (index) {
          return;
        }

        if (!method) {
          result = modal;
        } else {
          result = modal[method].apply(modal, args);
        }
      });
      return result;
    };
  }

  UI.Modal = Modal;
  /**
   * Modal Private
   */

  Object.assign(Modal.prototype, {
    /**
     * Attach events for the Modal.
     */
    _events: function _events() {
      var _this18 = this;

      this._clickEvent = function (e) {
        e.preventDefault();

        _this18.show()["catch"](function (_) {});
      };

      this._dismissEvent = function (e) {
        e.preventDefault();

        _this18.hide()["catch"](function (_) {});
      };

      this._documentClickEvent = function (e) {
        if (dom.isSame(e.target, _this18._dialog) || dom.hasDescendent(_this18._dialog, e.target)) {
          return;
        }

        _this18.hide()["catch"](function (_) {});
      };

      this._windowKeyDownEvent = function (e) {
        if (e.key !== 'Escape') {
          return;
        }

        e.preventDefault();

        _this18.hide()["catch"](function (_) {});
      };

      if (this._dismiss.length) {
        dom.addEvent(this._dismiss, 'click.frost.modal', this._dismissEvent);
      }
    }
  });
  /**
   * Popover Class
   * @class
   */

  var Popover =
  /*#__PURE__*/
  function () {
    /**
     * New Popover constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Popover with.
     * @param {object} [settings.classes] The CSS classes to style the popover.
     * @param {string} [settings.classes.popover=popover] The CSS classes for the popover.
     * @param {string} [settings.classes.popoverHeader=popover-header] The CSS classes for the popover header.
     * @param {string} [settings.classes.popoverBody=popover-body] The CSS classes for the popover body.
     * @param {string} [settings.classes.arrow=arrow] The CSS classes for the arrow.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @param {Boolean} [settings.enable=true] Whether the popover is enabled.
     * @param {Boolean} [settings.html=false] Whether to allow HTML in the popover.
     * @param {function} [settings.sanitize] The HTML sanitization function.
     * @param {string} [settings.trigger=click] The events to trigger the popover.
     * @param {string} [settings.placement=auto] The placement of the popover relative to the toggle.
     * @param {string} [settings.position=center] The position of the popover relative to the toggle.
     * @param {Boolean} [settings.fixed=false] Whether the popover position is fixed.
     * @param {number} [settings.spacing=7] The spacing between the popover and the toggle.
     * @param {number} [settings.minContact=false] The minimum amount of contact the popover must make with the toggle.
     * @returns {Popover} A new Popover object.
     */
    function Popover(node, settings) {
      _classCallCheck(this, Popover);

      this._node = node;
      this._settings = _objectSpread({}, Popover.defaults, {}, dom.getDataset(this._node), {}, settings);
      this._triggers = this._settings.trigger.split(' ');

      this._events();

      if (this._settings.enable) {
        this.enable();
      }

      dom.setData(this._node, 'popover', this);
    }
    /**
     * Destroy the Popover.
     */


    _createClass(Popover, [{
      key: "destroy",
      value: function destroy() {
        if (this._popover) {
          this._popper.destroy();

          dom.remove(this._popover);
          this._popover = null;
          this._popper = null;
        }

        if (this._triggers.includes('hover')) {
          dom.removeEvent(this._node, 'mouseover.frost.popover', this._hoverEvent);
          dom.removeEvent(this._node, 'mouseout.frost.popover', this._hideEvent);
        }

        if (this._triggers.includes('focus')) {
          dom.removeEvent(this._node, 'focus.frost.popover', this._focusEvent);
          dom.removeEvent(this._node, 'blur.frost.popover', this._hideEvent);
        }

        if (this._triggers.includes('click')) {
          dom.removeEvent(this._node, 'click.frost.popover', this._clickEvent);
        }

        dom.removeData(this._node, 'popover', this);
      }
      /**
       * Disable the Popover.
       */

    }, {
      key: "disable",
      value: function disable() {
        this._enabled = false;
      }
      /**
       * Enable the Popover.
       */

    }, {
      key: "enable",
      value: function enable() {
        this._enabled = true;
      }
      /**
       * Hide the Popover.
       * @returns {Promise}
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this19 = this;

        return new Promise(function (resolve, reject) {
          if (!_this19._popover) {
            return reject();
          }

          if (!DOM._triggerEvent(_this19._node, 'hide.frost.popover')) {
            return reject();
          }

          dom.setDataset(_this19._popover, 'animating', true);
          dom.stop(_this19._popover);
          dom.fadeOut(_this19._popover, {
            duration: _this19._settings.duration
          }).then(function (_) {
            _this19._popper.destroy();

            dom.remove(_this19._popover);
            _this19._popover = null;
            _this19._popper = null;
            dom.triggerEvent(_this19._node, 'hidden.frost.popover');
            resolve();
          })["catch"](function (e) {
            dom.removeDataset(_this19._popover, 'animating');
            reject(e);
          });
        });
      }
      /**
       * Show the Popover.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "show",
      value: function show() {
        var _this20 = this;

        return new Promise(function (resolve, reject) {
          if (_this20._popover) {
            return reject();
          }

          if (!DOM._triggerEvent(_this20._node, 'show.frost.popover')) {
            return reject();
          }

          _this20._render();

          dom.setDataset(_this20._popover, 'animating', true);
          dom.addClass(_this20._popover, 'show');
          dom.fadeIn(_this20._popover, {
            duration: _this20._settings.duration
          }).then(function (_) {
            dom.triggerEvent(_this20._node, 'shown.frost.popover');
            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset(_this20._popover, 'animating');
          });
        });
      }
      /**
       * Toggle the Popover.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "toggle",
      value: function toggle() {
        return this._popover ? this.hide() : this.show();
      }
      /**
       * Update the Popover position.
       */

    }, {
      key: "update",
      value: function update() {
        if (!this._popper) {
          return;
        }

        this._popper.update();
      }
    }]);

    return Popover;
  }(); // Default Popover options


  Popover.defaults = {
    classes: {
      popover: 'popover',
      popoverHeader: 'popover-header',
      popoverBody: 'popover-body',
      arrow: 'arrow'
    },
    duration: 100,
    enable: true,
    html: false,
    sanitize: function sanitize(input) {
      return dom.sanitize(input);
    },
    trigger: 'click',
    placement: 'auto',
    position: 'center',
    fixed: false,
    spacing: 5,
    minContact: false
  }; // Auto-initialize Popover from data-toggle

  dom.addEventOnce(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="popover"]');
    var _iteratorNormalCompletion16 = true;
    var _didIteratorError16 = false;
    var _iteratorError16 = undefined;

    try {
      for (var _iterator16 = nodes[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
        var node = _step16.value;
        new Popover(node);
      }
    } catch (err) {
      _didIteratorError16 = true;
      _iteratorError16 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
          _iterator16["return"]();
        }
      } finally {
        if (_didIteratorError16) {
          throw _iteratorError16;
        }
      }
    }
  }); // Add Popover QuerySet method

  if (QuerySet) {
    QuerySet.prototype.popover = function (a) {
      for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }

      var options, method;

      if (Core.isObject(a)) {
        options = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      var result;
      this.each(function (node, index) {
        if (!Core.isElement(node)) {
          return;
        }

        var popover = dom.hasData(node, 'popover') ? dom.getData(node, 'popover') : new Popover(node, options);

        if (index) {
          return;
        }

        if (!method) {
          result = popover;
        } else {
          result = popover[method].apply(popover, args);
        }
      });
      return result;
    };
  }

  UI.Popover = Popover;
  /**
   * Popover Private
   */

  Object.assign(Popover.prototype, {
    /**
     * Attach events for the Popover.
     */
    _events: function _events() {
      var _this21 = this;

      this._hideEvent = function (_) {
        if (!_this21._enabled || !_this21._popover) {
          return;
        }

        dom.stop(_this21._popover);

        _this21.hide()["catch"](function (_) {});
      };

      this._hoverEvent = function (_) {
        if (!_this21._enabled) {
          return;
        }

        dom.addEventOnce(_this21._node, 'mouseout.frost.popover', _this21._hideEvent);

        _this21.show()["catch"](function (_) {});
      };

      this._focusEvent = function (_) {
        if (!_this21._enabled) {
          return;
        }

        dom.addEventOnce(_this21._node, 'blur.frost.popover', _this21._hideEvent);

        _this21.show()["catch"](function (_) {});
      };

      this._clickEvent = function (e) {
        e.preventDefault();

        if (!_this21._enabled) {
          return;
        }

        _this21.toggle()["catch"](function (_) {});
      };

      if (this._triggers.includes('hover')) {
        dom.addEvent(this._node, 'mouseover.frost.popover', this._hoverEvent);
      }

      if (this._triggers.includes('focus')) {
        dom.addEvent(this._node, 'focus.frost.popover', this._focusEvent);
      }

      if (this._triggers.includes('click')) {
        dom.addEvent(this._node, 'click.frost.popover', this._clickEvent);
      }
    },

    /**
     * Render the Popover element.
     */
    _render: function _render() {
      this._popover = dom.create('div', {
        "class": this._settings.classes.popover,
        attributes: {
          role: 'tooltip'
        }
      });
      var arrow = dom.create('div', {
        "class": this._settings.classes.arrow
      });
      dom.append(this._popover, arrow);
      var method = this._settings.html ? 'html' : 'text';

      var title = dom.getAttribute(this._node, 'title') || this._settings.title;

      if (title) {
        var _dom$create;

        var popoverHeader = dom.create('h3', (_dom$create = {}, _defineProperty(_dom$create, method, this._settings.html && this._settings.sanitize ? this._settings.sanitize(title) : title), _defineProperty(_dom$create, "class", this._settings.classes.popoverHeader), _dom$create));
        dom.append(this._popover, popoverHeader);
      }

      var content = this._settings.content;

      if (content) {
        var _dom$create2;

        var popoverBody = dom.create('div', (_dom$create2 = {}, _defineProperty(_dom$create2, method, this._settings.html && this._settings.sanitize ? this._settings.sanitize(content) : content), _defineProperty(_dom$create2, "class", this._settings.classes.popoverBody), _dom$create2));
        dom.append(this._popover, popoverBody);
      }

      if (this._container) {
        dom.append(this._container, this._popover);
      } else {
        dom.before(this._node, this._popover);
      }

      this._popper = new Popper(this._popover, {
        reference: this._node,
        arrow: arrow,
        placement: this._settings.placement,
        position: this._settings.position,
        fixed: this._settings.fixed,
        spacing: this._settings.spacing,
        minContact: this._settings.minContact
      });
    }
  });
  /**
   * Popper Class
   * @class
   */

  var Popper =
  /*#__PURE__*/
  function () {
    /**
     * New Popper constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} settings The options to create the Popper with.
     * @param {HTMLElement} settings.referencee The node to use as the reference.
     * @param {HTMLElement} [settings.container] The node to use as the container.
     * @param {HTMLElement} [settings.arrow] The node to use as the arrow.
     * @param {string} [settings.placement=bottom] The placement of the node relative to the reference.
     * @param {string} [settings.position=center] The position of the node relative to the reference.
     * @param {Boolean} [settings.fixed=false] Whether the node position is fixed.
     * @param {number} [settings.spacing=0] The spacing between the node and the reference.
     * @param {number} [settings.minContact=false] The minimum amount of contact the node must make with the reference.
     * @param {Boolean} [settings.useGpu=true] Whether to use GPU acceleration.
     * @returns {Popper} A new Popper object.
     */
    function Popper(node, settings) {
      _classCallCheck(this, Popper);

      this._node = node;
      this._settings = _objectSpread({}, Popper.defaults, {}, dom.getDataset(this._node), {}, settings);
      this._fixed = dom.isFixed(this._settings.reference);
      this._relativeParent = Popper.getRelativeParent(this._node);
      this._scrollParent = Popper.getScrollParent(this._node);
      dom.setStyle(this._node, {
        position: 'absolute',
        top: 0,
        left: 0
      });

      this._events();

      this.update();
      dom.setData(this._node, 'popper', this);
    }
    /**
     * Destroy the Popper.
     */


    _createClass(Popper, [{
      key: "destroy",
      value: function destroy() {
        dom.removeEvent(window, 'resize.frost.popper', this._updateEvent);
        dom.removeEvent(window, 'scroll.frost.popper', this._updateEvent);

        if (this._scrollParent) {
          dom.removeEvent(this._scrollParent, 'scroll.frost.popper', this._updateEvent);
        }

        dom.removeData(this._node, 'popper');
      }
      /**
       * Update the Popper position.
       */

    }, {
      key: "update",
      value: function update() {
        if (!dom.isConnected(this._node)) {
          return;
        } // calculate boxes


        var nodeBox = dom.rect(this._node, !this._fixed);
        var referenceBox = dom.rect(this._settings.reference, !this._fixed);
        var windowBox = Popper.windowContainer(this._fixed); // check object could be seen

        if (Popper.isNodeHidden(nodeBox, referenceBox, windowBox, this._settings.spacing)) {
          return;
        }

        var scrollBox = this._scrollParent ? dom.rect(this._scrollParent, !this._fixed) : null;
        var containerBox = this._settings.container ? dom.rect(this._settings.container, !this._fixed) : null;

        var minimumBox = _objectSpread({}, windowBox);

        if (scrollBox) {
          minimumBox.top = Math.max(minimumBox.top, scrollBox.top);
          minimumBox.right = Math.min(minimumBox.right, scrollBox.right);
          minimumBox.bottom = Math.min(minimumBox.bottom, scrollBox.bottom);
          minimumBox.left = Math.max(minimumBox.left, scrollBox.left);
        }

        if (containerBox) {
          minimumBox.top = Math.max(minimumBox.top, containerBox.top);
          minimumBox.right = Math.min(minimumBox.right, containerBox.right);
          minimumBox.bottom = Math.min(minimumBox.bottom, containerBox.bottom);
          minimumBox.left = Math.max(minimumBox.left, containerBox.left);
        }

        if (scrollBox || containerBox) {
          minimumBox.x = minimumBox.left;
          minimumBox.y = minimumBox.top;
          minimumBox.width = minimumBox.right - minimumBox.left;
          minimumBox.height = minimumBox.bottom - minimumBox.top;
        } // get optimal placement


        var placement = this._settings.fixed ? this._settings.placement : Popper.getPopperPlacement(nodeBox, referenceBox, minimumBox, this._settings.placement, this._settings.spacing + 2);
        dom.setDataset(this._settings.reference, 'placement', placement);
        dom.setDataset(this._node, 'placement', placement); // get auto position

        var position = this._settings.position !== 'auto' ? this._settings.position : Popper.getPopperPosition(nodeBox, referenceBox, minimumBox, placement, this._settings.position); // calculate actual offset

        var offset = {
          x: Math.round(referenceBox.x),
          y: Math.round(referenceBox.y)
        }; // offset for relative parent

        var relativeBox = this._relativeParent ? dom.rect(this._relativeParent, !this._fixed) : null;

        if (relativeBox) {
          offset.x -= Math.round(relativeBox.x);
          offset.y -= Math.round(relativeBox.y);
        } // offset for placement


        Popper.adjustPlacement(offset, nodeBox, referenceBox, placement, this._settings.spacing); // offset for position

        Popper.adjustPosition(offset, nodeBox, referenceBox, placement, position); // compensate for margins

        offset.x -= parseInt(dom.css(this._node, 'margin-left'));
        offset.y -= parseInt(dom.css(this._node, 'margin-top')); // corrective positioning

        Popper.adjustConstrain(offset, nodeBox, referenceBox, minimumBox, relativeBox, placement, this._settings.minContact); // compensate for scroll parent

        if (this._scrollParent) {
          offset.x += dom.getScrollX(this._scrollParent);
          offset.y += dom.getScrollY(this._scrollParent);
        } // compensate for fixed position


        if (this._fixed) {
          offset.x += dom.getScrollX(window);
          offset.y += dom.getScrollY(window);
        } // update position


        var style = {};

        if (this._settings.useGpu) {
          style.transform = 'translate3d(' + offset.x + 'px , ' + offset.y + 'px , 0)';
        } else {
          style.marginLeft = offset.x;
          style.marginTop = offset.y;
        }

        dom.setStyle(this._node, style); // update arrow

        if (this._settings.arrow) {
          var newNodeBox = dom.rect(this._node, !this._fixed);

          this._updateArrow(newNodeBox, referenceBox, placement, position);
        }
      }
    }]);

    return Popper;
  }(); // Default Popper options


  Popper.defaults = {
    reference: null,
    container: null,
    arrow: null,
    placement: 'bottom',
    position: 'center',
    fixed: false,
    spacing: 0,
    minContact: false,
    useGpu: true
  };
  Popper._overflowTypes = ['overflow', 'overflowX', 'overflowY'];
  Popper._overflowValues = ['auto', 'scroll'];
  UI.Popper = Popper;
  /**
   * Popper Private
   */

  Object.assign(Popper.prototype, {
    /**
     * Attach events for the Popper.
     */
    _events: function _events() {
      var _this22 = this;

      this._updateEvent = Core.animation(function (_) {
        return _this22.update();
      });
      dom.addEvent(window, 'resize.frost.popper', this._updateEvent);
      dom.addEvent(window, 'scroll.frost.popper', this._updateEvent);

      if (this._scrollParent) {
        dom.addEvent(this._scrollParent, 'scroll.frost.popper', this._updateEvent);
      }
    },

    /**
     * Update the position of the arrow for the actual placement and position.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {string} placement The actual placement of the Popper.
     * @param {string} position The actual position of the Popper.
     */
    _updateArrow: function _updateArrow(nodeBox, referenceBox, placement, position) {
      var arrowStyles = {
        position: 'absolute',
        top: '',
        right: '',
        bottom: '',
        left: ''
      };
      dom.setStyle(this._settings.arrow, arrowStyles);
      var arrowBox = dom.rect(this._settings.arrow, !this._fixed);

      if (['top', 'bottom'].includes(placement)) {
        arrowStyles[placement === 'top' ? 'bottom' : 'top'] = -arrowBox.height;
        var diff = (referenceBox.width - nodeBox.width) / 2;
        var offset = nodeBox.width / 2 - arrowBox.width / 2;

        if (position === 'start') {
          offset += diff;
        } else if (position === 'end') {
          offset -= diff;
        }

        arrowStyles.left = Core.clamp(offset, Math.max(referenceBox.left, nodeBox.left) - arrowBox.left, Math.min(referenceBox.right, nodeBox.right) - arrowBox.left - arrowBox.width);
      } else {
        arrowStyles[placement === 'right' ? 'left' : 'right'] = -arrowBox.width;

        var _diff = (referenceBox.height - nodeBox.height) / 2;

        var _offset = nodeBox.height / 2 - arrowBox.height;

        if (position === 'start') {
          _offset += _diff;
        } else if (position === 'end') {
          _offset -= _diff;
        }

        arrowStyles.top = Core.clamp(_offset, Math.max(referenceBox.top, nodeBox.top) - arrowBox.top, Math.min(referenceBox.bottom, nodeBox.bottom) - arrowBox.top - arrowBox.height);
      }

      dom.setStyle(this._settings.arrow, arrowStyles);
    }
  });
  /**
   * Popper Static
   */

  Object.assign(Popper, {
    /**
     * Constrain the offset within the minimumBox.
     * @param {object} offset The offset object.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {object} minimumBox The computed minimum bounding rectangle of the container.
     * @param {DOMRect} [relativeBox] The computed bounding rectangle of the relative parent.
     * @param {string} placement The actual placement of the Popper.
     * @param {number} [minContact] The minimum amount of contact to make with the reference node.
     */
    adjustConstrain: function adjustConstrain(offset, nodeBox, referenceBox, minimumBox, relativeBox, placement, minContact) {
      if (['left', 'right'].includes(placement)) {
        var offsetY = offset.y;
        var refTop = referenceBox.top;

        if (relativeBox) {
          offsetY += relativeBox.top;
          refTop -= relativeBox.top;
        }

        var minSize = minContact !== false ? minContact : referenceBox.height;

        if (offsetY + nodeBox.height > minimumBox.bottom) {
          // bottom of offset node is below the container
          var diff = offsetY + nodeBox.height - minimumBox.bottom;
          offset.y = Math.max(refTop - nodeBox.height + minSize, offset.y - diff);
        } else if (offsetY < minimumBox.top) {
          // top of offset node is above the container
          var _diff2 = offsetY - minimumBox.top;

          offset.y = Math.min(refTop + referenceBox.height - minSize, offset.y - _diff2);
        }
      } else {
        var offsetX = offset.x;
        var refLeft = referenceBox.left;

        if (relativeBox) {
          offsetX += relativeBox.left;
          refLeft -= relativeBox.left;
        }

        var _minSize = minContact !== false ? minContact : referenceBox.width;

        if (offsetX + nodeBox.width > minimumBox.right) {
          // right of offset node is to the right of the container
          var _diff3 = offsetX + nodeBox.width - minimumBox.right;

          offset.x = Math.max(refLeft - nodeBox.width + _minSize, offset.x - _diff3);
        } else if (offsetX < minimumBox.left) {
          // left of offset node is to the left of the container
          var _diff4 = offsetX - minimumBox.left;

          offset.x = Math.min(refLeft + referenceBox.width - _minSize, offset.x - _diff4);
        }
      }
    },

    /**
     * Adjust the offset for the placement.
     * @param {object} offset The offset object.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {string} placement The actual placement of the Popper.
     * @param {number} spacing The amount of spacing to use.
     */
    adjustPlacement: function adjustPlacement(offset, nodeBox, referenceBox, placement, spacing) {
      if (placement === 'top') {
        offset.y -= Math.round(nodeBox.height) + spacing;
      } else if (placement === 'right') {
        offset.x += Math.round(referenceBox.width) + spacing;
      } else if (placement === 'bottom') {
        offset.y += Math.round(referenceBox.height) + spacing;
      } else if (placement === 'left') {
        offset.x -= Math.round(nodeBox.width) + spacing;
      }
    },

    /**
     * Adjust the offset for the placement.
     * @param {object} offset The offset object.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {string} placement The actual placement of the Popper.
     * @param {string} position The actual position of the Popper.
     */
    adjustPosition: function adjustPosition(offset, nodeBox, referenceBox, placement, position) {
      if (position === 'start') {
        return;
      }

      if (['top', 'bottom'].includes(placement)) {
        var deltaX = Math.round(nodeBox.width) - Math.round(referenceBox.width);

        if (position === 'center') {
          offset.x -= Math.round(deltaX / 2);
        } else if (position === 'end') {
          offset.x -= deltaX;
        }
      } else {
        var deltaY = Math.round(nodeBox.height) - Math.round(referenceBox.height);

        if (position === 'center') {
          offset.y -= Math.round(deltaY / 2);
        } else if (position === 'end') {
          offset.y -= deltaY;
        }
      }
    },

    /**
     * Get the actual placement of the Popper.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {object} minimumBox The computed minimum bounding rectangle of the container.
     * @param {string} placement The initial placement of the Popper.
     * @param {number} spacing The amount of spacing to use.
     * @returns {string} The new placement of the Popper.
     */
    getPopperPlacement: function getPopperPlacement(nodeBox, referenceBox, minimumBox, placement, spacing) {
      var spaceTop = referenceBox.top - minimumBox.top;
      var spaceRight = minimumBox.right - referenceBox.right;
      var spaceBottom = minimumBox.bottom - referenceBox.bottom;
      var spaceLeft = referenceBox.left - minimumBox.left;

      if (placement === 'top') {
        // if node is bigger than space top and there is more room on bottom
        if (spaceTop < nodeBox.height + spacing && spaceBottom > spaceTop) {
          return 'bottom';
        }
      } else if (placement === 'right') {
        // if node is bigger than space right and there is more room on left
        if (spaceRight < nodeBox.width + spacing && spaceLeft > spaceRight) {
          return 'left';
        }
      } else if (placement === 'bottom') {
        // if node is bigger than space bottom and there is more room on top
        if (spaceBottom < nodeBox.height + spacing && spaceTop > spaceBottom) {
          return 'top';
        }
      } else if (placement === 'left') {
        // if node is bigger than space left and there is more room on right
        if (spaceLeft < nodeBox.width + spacing && spaceRight > spaceLeft) {
          return 'right';
        }
      } else if (placement === 'auto') {
        var maxVSpace = Math.max(spaceTop, spaceBottom);
        var maxHSpace = Math.max(spaceRight, spaceLeft);
        var minVSpace = Math.min(spaceTop, spaceBottom);

        if (maxHSpace > maxVSpace && maxHSpace >= nodeBox.width + spacing && minVSpace + referenceBox.height >= nodeBox.height + spacing - Math.max(0, nodeBox.height - referenceBox.height)) {
          return spaceLeft > spaceRight ? 'left' : 'right';
        }

        var minHSpace = Math.min(spaceRight, spaceLeft);

        if (maxVSpace >= nodeBox.height + spacing && minHSpace + referenceBox.width >= nodeBox.width + spacing - Math.max(0, nodeBox.width - referenceBox.width)) {
          return spaceBottom > spaceTop ? 'bottom' : 'top';
        }

        var maxSpace = Math.max(maxVSpace, maxHSpace);

        if (spaceBottom === maxSpace && spaceBottom >= nodeBox.height + spacing) {
          return 'bottom';
        }

        if (spaceTop === maxSpace && spaceTop >= nodeBox.height + spacing) {
          return 'top';
        }

        if (spaceRight === maxSpace && spaceRight >= nodeBox.width + spacing) {
          return 'right';
        }

        if (spaceLeft === maxSpace && spaceLeft >= nodeBox.width + spacing) {
          return 'left';
        }

        return 'bottom';
      }

      return placement;
    },

    /**
     * Get the actual position of the Popper.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {object} minimumBox The computed minimum bounding rectangle of the container.
     * @param {string} placement The actual placement of the Popper.
     * @param {string} position The initial position of the Popper.
     * @returns {string} The new position of the Popper.
     */
    getPopperPosition: function getPopperPosition(nodeBox, referenceBox, minimumBox, placement, position) {
      var deltaX = nodeBox.width - referenceBox.width;
      var deltaY = nodeBox.height - referenceBox.height;

      if (['bottom', 'top'].includes(placement)) {
        var spaceLeft = referenceBox.left - minimumBox.left;
        var spaceRight = minimumBox.right - referenceBox.right;

        if (position === 'start') {
          if (spaceRight < deltaX) {
            if (spaceLeft >= deltaX / 2 && spaceRight >= deltaX / 2) {
              return 'center';
            }

            if (spaceLeft >= deltaX) {
              return 'end';
            }
          }
        } else if (position === 'center') {
          if (spaceLeft < deltaX / 2 || spaceRight < deltaX / 2) {
            if (spaceRight >= deltaX) {
              return 'start';
            }

            if (spaceLeft >= deltaX) {
              return 'end';
            }
          }
        } else if (position === 'end') {
          if (spaceLeft < deltaX) {
            if (spaceLeft >= deltaX / 2 && spaceRight >= deltaX / 2) {
              return 'center';
            }

            if (spaceRight >= deltaX) {
              return 'start';
            }
          }
        }
      } else {
        var spaceTop = referenceBox.top - minimumBox.top;
        var spaceBottom = minimumBox.bottom - referenceBox.bottom;

        if (position === 'start') {
          if (spaceBottom < deltaY) {
            if (spaceBottom >= deltaY / 2 && spaceTop >= deltaY / 2) {
              return 'center';
            }

            if (spaceTop >= deltaY) {
              return 'end';
            }
          }
        } else if (position === 'center') {
          if (spaceTop < deltaY / 2 || spaceBottom < deltaY / 2) {
            if (spaceBottom >= deltaY) {
              return 'start';
            }

            if (spaceTop >= deltaY) {
              return 'end';
            }
          }
        } else if (position === 'end') {
          if (spaceTop < deltaY) {
            if (spaceTop >= deltaY / 2 && spaceBottom >= deltaY / 2) {
              return 'center';
            }

            if (spaceBottom >= deltaY) {
              return 'start';
            }
          }
        }
      }

      return position;
    },

    /**
     * Get the relative parent of the node.
     * @param {HTMLElement} node The input node.
     * @return {HTMLElement} The relative parent.
     */
    getRelativeParent: function getRelativeParent(node) {
      return dom.closest(node, function (parent) {
        return dom.css(parent, 'position') === 'relative';
      }, document.body).shift();
    },

    /**
     * Get the scroll parent of the node.
     * @param {HTMLElement} node The input node.
     * @return {HTMLElement} The scroll parent.
     */
    getScrollParent: function getScrollParent(node) {
      var _this23 = this;

      return dom.closest(node, function (parent) {
        return !!_this23._overflowTypes.find(function (overflow) {
          return !!_this23._overflowValues.find(function (value) {
            return new RegExp(value).test(dom.css(parent, overflow));
          });
        });
      }, document.body).shift();
    },

    /**
     * Returns true if the node can not be visible inside the window.
     * @param {object} offset The offset object.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {object} windowContainer The computed bounding rectangle of the window.
     * @param {number} spacing The amount of spacing to use.
     * @returns {Boolean} TRUE if the node can not be visible inside the window, otherwise FALSE.
     */
    isNodeHidden: function isNodeHidden(nodeBox, referenceBox, windowContainer, spacing) {
      return windowContainer.top > referenceBox.bottom + nodeBox.height + spacing || windowContainer.left > referenceBox.right + nodeBox.width + spacing || windowContainer.bottom < referenceBox.top - nodeBox.height - spacing || windowContainer.right < referenceBox.left - nodeBox.width - spacing;
    },

    /**
     * Calculate the computed bounding rectangle of the window.
     * @param {Boolean} fixed Whether the Popper is fixed.
     * @returns {object} The computed bounding rectangle of the window.
     */
    windowContainer: function windowContainer(fixed) {
      var scrollX = fixed ? 0 : dom.getScrollX(window);
      var scrollY = fixed ? 0 : dom.getScrollY(window);
      var windowWidth = dom.width(document);
      var windowHeight = dom.height(document);
      return {
        x: scrollX,
        y: scrollY,
        width: windowWidth,
        height: windowHeight,
        top: scrollY,
        right: scrollX + windowWidth,
        bottom: scrollY + windowHeight,
        left: scrollX
      };
    }
  });
  /**
   * Tab Class
   * @class
   */

  var Tab =
  /*#__PURE__*/
  function () {
    /**
     * New Tab constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Tab with.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @returns {Tab} A new Tab object.
     */
    function Tab(node, settings) {
      _classCallCheck(this, Tab);

      this._node = node;
      this._settings = _objectSpread({}, Tab.defaults, {}, dom.getDataset(this._node), {}, settings);

      if (!this._settings.target) {
        this._settings.target = dom.getAttribute(this._node, 'href');
      }

      this._target = dom.findOne(this._settings.target);
      this._siblings = dom.siblings(this._node);

      this._events();

      dom.setData(this._node, 'tab', this);
    }
    /**
     * Destroy the Tab.
     */


    _createClass(Tab, [{
      key: "destroy",
      value: function destroy() {
        dom.removeEvent(this._node, 'click.frost.tab', this._clickEvent);
        dom.removeData(this._node, 'tab');
      }
      /**
       * Hide the current Tab.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this24 = this;

        return new Promise(function (resolve, reject) {
          if (!dom.hasClass(_this24._target, 'active') || dom.getDataset(_this24._target, 'animating')) {
            return reject();
          }

          if (!DOM._triggerEvent(_this24._node, 'hide.frost.tab')) {
            return reject();
          }

          dom.setDataset(_this24._target, 'animating', true);
          dom.fadeOut(_this24._target, {
            duration: _this24._settings.duration
          }).then(function (_) {
            dom.removeClass(_this24._target, 'active');
            dom.removeClass(_this24._node, 'active');
            dom.setAttribute(_this24._node, 'aria-selected', false);
            dom.triggerEvent(_this24._node, 'hidden.frost.tab');
            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset(_this24._target, 'animating');
          });
        });
      }
      /**
       * Hide any active Tabs, and show the current Tab.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "show",
      value: function show() {
        var _this25 = this;

        return new Promise(function (resolve, reject) {
          if (dom.hasClass(_this25._target, 'active') || dom.getDataset(_this25._target, 'animating')) {
            return reject();
          }

          var activeTab = _this25._siblings.find(function (sibling) {
            return dom.hasClass(sibling, 'active');
          });

          if (activeTab && !dom.hasData(activeTab, 'tab')) {
            return reject();
          }

          (activeTab ? dom.getData(activeTab, 'tab').hide() : Promise.resolve()).then(function (_) {
            if (!DOM._triggerEvent(_this25._node, 'show.frost.tab')) {
              return reject();
            }

            dom.setDataset(_this25._target, 'animating', true);
            dom.addClass(_this25._target, 'active');
            dom.addClass(_this25._node, 'active');
            return dom.fadeIn(_this25._target, {
              duration: _this25._settings.duration
            });
          }).then(function (_) {
            dom.setAttribute(_this25._node, 'aria-selected', true);
            dom.triggerEvent(_this25._node, 'shown.frost.tab');
            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset(_this25._target, 'animating');
          });
        });
      }
    }]);

    return Tab;
  }(); // Default Tab options


  Tab.defaults = {
    duration: 100
  }; // Auto-initialize Tab from data-toggle

  dom.addEventOnce(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="tab"]');
    var _iteratorNormalCompletion17 = true;
    var _didIteratorError17 = false;
    var _iteratorError17 = undefined;

    try {
      for (var _iterator17 = nodes[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
        var node = _step17.value;
        new Tab(node);
      }
    } catch (err) {
      _didIteratorError17 = true;
      _iteratorError17 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
          _iterator17["return"]();
        }
      } finally {
        if (_didIteratorError17) {
          throw _iteratorError17;
        }
      }
    }
  }); // Add Tab QuerySet method

  if (QuerySet) {
    QuerySet.prototype.tab = function (a) {
      for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }

      var options, method;

      if (Core.isObject(a)) {
        options = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      var result;
      this.each(function (node, index) {
        if (!Core.isElement(node)) {
          return;
        }

        var tab = dom.hasData(node, 'tab') ? dom.getData(node, 'tab') : new Tab(node, options);

        if (index) {
          return;
        }

        if (!method) {
          result = tab;
        } else {
          result = tab[method].apply(tab, args);
        }
      });
      return result;
    };
  }

  UI.Tab = Tab;
  /**
   * Tab Private
   */

  Object.assign(Tab.prototype, {
    /**
     * Attach events for the Tab.
     */
    _events: function _events() {
      var _this26 = this;

      this._clickEvent = function (e) {
        e.preventDefault();

        _this26.show()["catch"](function (_) {});
      };

      dom.addEvent(this._node, 'click.frost.tab', this._clickEvent);
    }
  });
  /**
   * Toast Class
   * @class
   */

  var Toast =
  /*#__PURE__*/
  function () {
    /**
     * New Toast constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Toast with.
     * @param {Boolean} [autohide=true] Whether to hide the toast after initialization.
     * @param {number} [settings.delay=5000] The duration to wait before hiding the toast.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @returns {Toast} A new Toast object.
     */
    function Toast(node, settings) {
      var _this27 = this;

      _classCallCheck(this, Toast);

      this._node = node;
      this._settings = _objectSpread({}, Toast.defaults, {}, dom.getDataset(this._node), {}, settings);
      this._dismiss = dom.find('[data-dismiss="toast"]', this._node);

      this._events();

      if (this._settings.autohide) {
        setTimeout(function (_) {
          _this27.hide()["catch"](function (_) {});
        }, this._settings.delay);
      }

      dom.setData(this._node, 'toast', this);
    }
    /**
     * Destroy the Toast.
     */


    _createClass(Toast, [{
      key: "destroy",
      value: function destroy() {
        if (this._dismiss.length) {
          dom.removeEvent(this._dismiss, 'click.frost.toast', this._dismissEvent);
        }

        dom.removeData(this._node, 'toast');
      }
      /**
       * Hide the Toast.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this28 = this;

        return new Promise(function (resolve, reject) {
          if (!dom.isVisible(_this28._node) || dom.getDataset(_this28._node, 'animating')) {
            return reject();
          }

          if (!DOM._triggerEvent(_this28._node, 'hide.frost.toast')) {
            return reject();
          }

          dom.setDataset(_this28._node, 'animating', true);
          return dom.fadeOut(_this28._node, {
            duration: _this28._settings.duration
          }).then(function (_) {
            dom.hide(_this28._node);
            dom.triggerEvent(_this28._node, 'hidden.frost.toast');
            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset(_this28._node, 'animating');
          });
        });
      }
      /**
       * Show the Toast.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "show",
      value: function show() {
        var _this29 = this;

        return new Promise(function (resolve, reject) {
          if (dom.isVisible(_this29._node) || dom.getDataset(_this29._node, 'animating')) {
            return reject();
          }

          if (!DOM._triggerEvent(_this29._node, 'show.frost.toast')) {
            return reject();
          }

          dom.setDataset(_this29._node, 'animating', true);
          dom.show(_this29._node);
          return dom.fadeIn(_this29._node, {
            duration: _this29._settings.duration
          }).then(function (_) {
            dom.triggerEvent(_this29._node, 'shown.frost.toast');
            resolve();
          })["catch"](reject)["finally"](function (_) {
            return dom.removeDataset(_this29._node, 'animating');
          });
        });
      }
    }]);

    return Toast;
  }(); // Default Toast options


  Toast.defaults = {
    autohide: true,
    delay: 5000,
    duration: 100
  }; // Auto-initialize Toast from data-toggle

  dom.addEventOnce(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="toast"]');
    var _iteratorNormalCompletion18 = true;
    var _didIteratorError18 = false;
    var _iteratorError18 = undefined;

    try {
      for (var _iterator18 = nodes[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
        var node = _step18.value;
        new Toast(node);
      }
    } catch (err) {
      _didIteratorError18 = true;
      _iteratorError18 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
          _iterator18["return"]();
        }
      } finally {
        if (_didIteratorError18) {
          throw _iteratorError18;
        }
      }
    }
  }); // Add Toast QuerySet method

  if (QuerySet) {
    QuerySet.prototype.toast = function (a) {
      for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        args[_key9 - 1] = arguments[_key9];
      }

      var options, method;

      if (Core.isObject(a)) {
        options = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      var result;
      this.each(function (node, index) {
        if (!Core.isElement(node)) {
          return;
        }

        var toast = dom.hasData(node, 'toast') ? dom.getData(node, 'toast') : new Toast(node, options);

        if (index) {
          return;
        }

        if (!method) {
          result = toast;
        } else {
          result = toast[method].apply(toast, args);
        }
      });
      return result;
    };
  }

  UI.Toast = Toast;
  /**
   * Toast Private
   */

  Object.assign(Toast.prototype, {
    /**
     * Attach events for the Toast.
     */
    _events: function _events() {
      var _this30 = this;

      this._dismissEvent = function (e) {
        e.preventDefault();

        _this30.hide()["catch"](function (_) {});
      };

      if (this._dismiss.length) {
        dom.addEvent(this._dismiss, 'click.frost.toast', this._dismissEvent);
      }
    }
  });
  /**
   * Tooltip Class
   * @class
   */

  var Tooltip =
  /*#__PURE__*/
  function () {
    /**
     * New Tooltip constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Tooltip with.
     * @param {object} [settings.classes] The CSS classes to style the tooltip.
     * @param {string} [settings.classes.tooltip=tooltip] The CSS classes for the tooltip.
     * @param {string} [settings.classes.tooltipInner=tooltip-inner] The CSS classes for the tooltip inner-element.
     * @param {string} [settings.classes.arrow=arrow] The CSS classes for the arrow.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @param {Boolean} [settings.enable=true] Whether the tooltip is enabled.
     * @param {Boolean} [settings.html=false] Whether to allow HTML in the tooltip.
     * @param {function} [settings.sanitize] The HTML sanitization function.
     * @param {string} [settings.trigger=hover focus] The events to trigger the tooltip.
     * @param {string} [settings.placement=auto] The placement of the tooltip relative to the toggle.
     * @param {string} [settings.position=center] The position of the tooltip relative to the toggle.
     * @param {Boolean} [settings.fixed=false] Whether the tooltip position is fixed.
     * @param {number} [settings.spacing=2] The spacing between the tooltip and the toggle.
     * @param {number} [settings.minContact=false] The minimum amount of contact the tooltip must make with the toggle.
     * @returns {Tooltip} A new Tooltip object.
     */
    function Tooltip(node, settings) {
      _classCallCheck(this, Tooltip);

      this._node = node;
      this._settings = _objectSpread({}, Tooltip.defaults, {}, dom.getDataset(this._node), {}, settings);
      this._triggers = this._settings.trigger.split(' ');

      this._events();

      if (this._settings.enable) {
        this.enable();
      }

      dom.setData(this._node, 'tooltip', this);
    }
    /**
     * Destroy the Tooltip.
     */


    _createClass(Tooltip, [{
      key: "destroy",
      value: function destroy() {
        if (this._tooltip) {
          this._popper.destroy();

          dom.remove(this._tooltip);
          this._tooltip = null;
          this._popper = null;
        }

        if (this._triggers.includes('hover')) {
          dom.removeEvent(this._node, 'mouseover.frost.tooltip', this._hoverEvent);
          dom.removeEvent(this._node, 'mouseout.frost.tooltip', this._hideEvent);
        }

        if (this._triggers.includes('focus')) {
          dom.removeEvent(this._node, 'focus.frost.tooltip', this._focusEvent);
          dom.removeEvent(this._node, 'blur.frost.tooltip', this._hideEvent);
        }

        if (this._triggers.includes('click')) {
          dom.removeEvent(this._node, 'click.frost.tooltip', this._clickEvent);
        }

        dom.removeData(this._node, 'tooltip', this);
      }
      /**
       * Disable the Tooltip.
       */

    }, {
      key: "disable",
      value: function disable() {
        this._enabled = false;
      }
      /**
       * Enable the Tooltip.
       */

    }, {
      key: "enable",
      value: function enable() {
        this._enabled = true;
      }
      /**
       * Hide the Tooltip.
       * @returns {Promise}
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this31 = this;

        return new Promise(function (resolve, reject) {
          if (!_this31._tooltip) {
            return reject();
          }

          if (!DOM._triggerEvent(_this31._node, 'hide.frost.tooltip')) {
            return reject();
          }

          dom.setDataset(_this31._tooltip, 'animating', true);
          dom.stop(_this31._tooltip);
          dom.fadeOut(_this31._tooltip, {
            duration: _this31._settings.duration
          }).then(function (_) {
            _this31._popper.destroy();

            dom.remove(_this31._tooltip);
            _this31._tooltip = null;
            _this31._popper = null;
            dom.triggerEvent(_this31._node, 'hidden.frost.tooltip');
            resolve();
          })["catch"](function (_) {
            dom.removeDataset(_this31._tooltip, 'animating');
            reject();
          });
        });
      }
      /**
       * Show the Tooltip.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "show",
      value: function show() {
        var _this32 = this;

        return new Promise(function (resolve, reject) {
          if (_this32._tooltip) {
            return reject();
          }

          if (!DOM._triggerEvent(_this32._node, 'show.frost.tooltip')) {
            return reject();
          }

          _this32._render();

          dom.setDataset(_this32._tooltip, 'animating', true);
          dom.addClass(_this32._tooltip, 'show');
          dom.fadeIn(_this32._tooltip, {
            duration: _this32._settings.duration
          }).then(function (_) {
            dom.triggerEvent(_this32._node, 'shown.frost.tooltip');
            resolve();
          })["catch"](function (_) {
            return reject();
          })["finally"](function (_) {
            return dom.removeDataset(_this32._tooltip, 'animating');
          });
        });
      }
      /**
       * Toggle the Tooltip.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "toggle",
      value: function toggle() {
        return this._tooltip ? this.hide() : this.show();
      }
      /**
       * Update the Tooltip position.
       */

    }, {
      key: "update",
      value: function update() {
        if (!this._popper) {
          return;
        }

        this._popper.update();
      }
    }]);

    return Tooltip;
  }(); // Default Tooltip options


  Tooltip.defaults = {
    classes: {
      tooltip: 'tooltip',
      tooltipInner: 'tooltip-inner',
      arrow: 'arrow'
    },
    duration: 100,
    enable: true,
    html: false,
    trigger: 'hover focus',
    sanitize: function sanitize(input) {
      return dom.sanitize(input);
    },
    placement: 'auto',
    position: 'center',
    fixed: false,
    spacing: 2,
    minContact: false
  }; // Auto-initialize Tooltip from data-toggle

  dom.addEventOnce(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="tooltip"]');
    var _iteratorNormalCompletion19 = true;
    var _didIteratorError19 = false;
    var _iteratorError19 = undefined;

    try {
      for (var _iterator19 = nodes[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
        var node = _step19.value;
        new Tooltip(node);
      }
    } catch (err) {
      _didIteratorError19 = true;
      _iteratorError19 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion19 && _iterator19["return"] != null) {
          _iterator19["return"]();
        }
      } finally {
        if (_didIteratorError19) {
          throw _iteratorError19;
        }
      }
    }
  }); // Add Tooltip QuerySet method

  if (QuerySet) {
    QuerySet.prototype.tooltip = function (a) {
      for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        args[_key10 - 1] = arguments[_key10];
      }

      var options, method;

      if (Core.isObject(a)) {
        options = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      var result;
      this.each(function (node, index) {
        if (!Core.isElement(node)) {
          return;
        }

        var tooltip = dom.hasData(node, 'tooltip') ? dom.getData(node, 'tooltip') : new Tooltip(node, options);

        if (index) {
          return;
        }

        if (!method) {
          result = tooltip;
        } else {
          result = tooltip[method].apply(tooltip, args);
        }
      });
      return result;
    };
  }

  UI.Tooltip = Tooltip;
  /**
   * Tooltip Private
   */

  Object.assign(Tooltip.prototype, {
    /**
     * Attach events for the Tooltip.
     */
    _events: function _events() {
      var _this33 = this;

      this._hideEvent = function (_) {
        if (!_this33._enabled || !_this33._tooltip) {
          return;
        }

        dom.stop(_this33._tooltip);

        _this33.hide()["catch"](function (_) {});
      };

      this._hoverEvent = function (_) {
        if (!_this33._enabled) {
          return;
        }

        dom.addEventOnce(_this33._node, 'mouseout.frost.tooltip', _this33._hideEvent);

        _this33.show()["catch"](function (_) {});
      };

      this._focusEvent = function (_) {
        if (!_this33._enabled) {
          return;
        }

        dom.addEventOnce(_this33._node, 'blur.frost.tooltip', _this33._hideEvent);

        _this33.show()["catch"](function (_) {});
      };

      this._clickEvent = function (e) {
        e.preventDefault();

        if (!_this33._enabled) {
          return;
        }

        _this33.toggle()["catch"](function (_) {});
      };

      if (this._triggers.includes('hover')) {
        dom.addEvent(this._node, 'mouseover.frost.tooltip', this._hoverEvent);
      }

      if (this._triggers.includes('focus')) {
        dom.addEvent(this._node, 'focus.frost.tooltip', this._focusEvent);
      }

      if (this._triggers.includes('click')) {
        dom.addEvent(this._node, 'click.frost.tooltip', this._clickEvent);
      }
    },

    /**
     * Render the Tooltip element.
     */
    _render: function _render() {
      var _dom$create3;

      this._tooltip = dom.create('div', {
        "class": this._settings.classes.tooltip,
        attributes: {
          role: 'tooltip'
        }
      });
      var arrow = dom.create('div', {
        "class": this._settings.classes.arrow
      });
      dom.append(this._tooltip, arrow);

      var title = dom.getAttribute(this._node, 'title') || this._settings.title;

      var method = this._settings.html ? 'html' : 'text';
      var tooltipInner = dom.create('div', (_dom$create3 = {}, _defineProperty(_dom$create3, method, this._settings.html && this._settings.sanitize ? this._settings.sanitize(title) : title), _defineProperty(_dom$create3, "class", this._settings.classes.tooltipInner), _dom$create3));
      dom.append(this._tooltip, tooltipInner);

      if (this._container) {
        dom.append(this._container, this._tooltip);
      } else {
        dom.before(this._node, this._tooltip);
      }

      this._popper = new Popper(this._tooltip, {
        reference: this._node,
        arrow: arrow,
        placement: this._settings.placement,
        position: this._settings.position,
        fixed: this._settings.fixed,
        spacing: this._settings.spacing,
        minContact: this._settings.minContact
      });
    }
  });
  return {
    UI: UI
  };
});