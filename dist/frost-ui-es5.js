"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

  var Alert = /*#__PURE__*/function () {
    /**
     * New Alert constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Alert with.
     * @param {number} [settings.duration=250] The duration of the animation.
     * @returns {Alert} A new Alert object.
     */
    function Alert(node, settings) {
      _classCallCheck(this, Alert);

      this._node = node;
      this._settings = Core.extend({}, this.constructor.defaults, dom.getDataset(this._node), settings);
      dom.setData(this._node, 'alert', this);
    }
    /**
     * Destroy the Alert.
     */


    _createClass(Alert, [{
      key: "destroy",
      value: function destroy() {
        dom.removeData(this._node, 'alert');
      }
      /**
       * Close the Alert.
       */

    }, {
      key: "close",
      value: function close() {
        var _this = this;

        if (this._animating || !dom.triggerOne(this._node, 'close.frost.alert')) {
          return;
        }

        this._animating = true;
        dom.fadeOut(this._node, {
          duration: this._settings.duration
        }).then(function (_) {
          dom.triggerEvent(_this._node, 'closed.frost.alert');
          dom.remove(_this._node);
        })["catch"](function (_) {})["finally"](function (_) {
          _this._animating = false;
        });
      }
      /**
       * Initialize an Alert.
       * @param {HTMLElement} node The input node.
       * @param {object} [settings] The options to create the Alert with.
       * @param {number} [settings.duration=250] The duration of the animation.
       * @returns {Alert} A new Alert object.
       */

    }], [{
      key: "init",
      value: function init(node, settings) {
        return dom.hasData(node, 'alert') ? dom.getData(node, 'alert') : new this(node, settings);
      }
    }]);

    return Alert;
  }(); // Alert events


  dom.addEventDelegate(document, 'click.frost.alert', '[data-dismiss="alert"]', function (e) {
    e.preventDefault();
    var target = UI.getTarget(e.currentTarget, '.alert');
    var alert = Alert.init(target);
    alert.close();
  }); // Alert default options

  Alert.defaults = {
    duration: 250
  }; // Alert QuerySet method

  if (QuerySet) {
    QuerySet.prototype.alert = function (a) {
      var settings, method;

      if (Core.isObject(a)) {
        settings = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iterator = _createForOfIteratorHelper(this),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;

          if (!Core.isElement(node)) {
            continue;
          }

          var alert = Alert.init(node, settings);

          if (method) {
            alert[method].apply(alert, args);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return this;
    };
  }

  UI.Alert = Alert;
  /**
   * Button Class
   * @class
   */

  var Button = /*#__PURE__*/function () {
    /**
     * New Button constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Button with.
     * @returns {Button} A new Button object.
     */
    function Button(node, settings) {
      _classCallCheck(this, Button);

      this._node = node;
      this._settings = Core.extend({}, this.constructor.defaults, dom.getDataset(this._node), settings);
      this._input = dom.findOne('input', this._node);
      this._isRadio = this._input && dom.is(this._input, '[type="radio"]');

      if (this._isRadio) {
        this._siblings = dom.siblings(this._node);
      }

      dom.setData(this._node, 'button', this);
    }
    /**
     * Destroy the Button.
     */


    _createClass(Button, [{
      key: "destroy",
      value: function destroy() {
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
      /**
       * Toggle a checkbox-type Button.
       */

    }, {
      key: "_toggleCheckbox",
      value: function _toggleCheckbox() {
        dom.toggleClass(this._node, 'active');

        if (this._input) {
          var isChecked = dom.getProperty(this._input, 'checked');
          dom.setProperty(this._input, 'checked', !isChecked);
          dom.triggerEvent(this._input, 'change');
        }
      }
      /**
       * Toggle a radio-type Button.
       */

    }, {
      key: "_toggleRadio",
      value: function _toggleRadio() {
        dom.addClass(this._node, 'active');
        dom.removeClass(this._siblings, 'active');
        dom.setProperty(this._input, 'checked', true);
        dom.triggerEvent(this._input, 'change');
      }
      /**
       * Initialize a Button.
       * @param {HTMLElement} node The input node.
       * @param {object} [settings] The options to create the Button with.
       * @returns {Button} A new Button object.
       */

    }], [{
      key: "init",
      value: function init(node, settings) {
        return dom.hasData(node, 'button') ? dom.getData(node, 'button') : new this(node, settings);
      }
    }]);

    return Button;
  }(); // Button events


  dom.addEventDelegate(document, 'click.frost.button', '[data-toggle="buttons"] > *, [data-toggle="button"]', function (e) {
    e.preventDefault();
    var button = Button.init(e.currentTarget);
    button.toggle();
  }); // Button default settings

  Button.defaults = {}; // Button QuerySet method

  if (QuerySet) {
    QuerySet.prototype.button = function (a) {
      var settings, method;

      if (Core.isObject(a)) {
        settings = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var _iterator2 = _createForOfIteratorHelper(this),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var node = _step2.value;

          if (!Core.isElement(node)) {
            continue;
          }

          var button = Button.init(node, settings);

          if (method) {
            button[method].apply(button, args);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return this;
    };
  }

  UI.Button = Button;
  /**
   * Carousel Class
   * @class
   */

  var Carousel = /*#__PURE__*/function () {
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
      this._settings = Core.extend({}, this.constructor.defaults, dom.getDataset(this._node), settings);
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
        this._queue = [];

        if (this._timer) {
          clearTimeout(this._timer);
        }

        if (this._settings.keyboard) {
          dom.removeEvent(this._node, 'keydown.frost.carousel');
        }

        if (this._settings.pause) {
          dom.removeEvent(this._node, 'mouseenter.frost.carousel');
          dom.removeEvent(this._node, 'mouseleave.frost.carousel');
        }

        dom.removeEvent(this._node, 'remove.frost.carousel');
        dom.removeData(this._node, 'carousel');
      }
      /**
       * Cycle to the next Carousel item.
       */

    }, {
      key: "next",
      value: function next() {
        this.slide();
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
       */

    }, {
      key: "prev",
      value: function prev() {
        this.slide(-1);
      }
      /**
       * Cycle to a specific Carousel item.
       * @param {number} index The item index to cycle to.
       */

    }, {
      key: "show",
      value: function show(index) {
        this._show(index);
      }
      /**
       * Slide the Carousel in a specific direction.
       * @param {number} [direction=1] The direction to slide to.
       */

    }, {
      key: "slide",
      value: function slide() {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var index = this._queue.length ? this._queue[this._queue.length - 1] : this._index;
        this.show(index + direction);
      }
      /**
       * Initialize a Carousel.
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

    }], [{
      key: "init",
      value: function init(node, settings) {
        return dom.hasData(node, 'carousel') ? dom.getData(node, 'carousel') : new this(node, settings);
      }
    }]);

    return Carousel;
  }(); // Carousel events


  dom.addEventDelegate(document, 'click.frost.carousel', '.carousel-next, .carousel-prev, [data-slide], [data-slide-to]', function (e) {
    e.preventDefault();
    var target = UI.getTarget(e.currentTarget, '.carousel');
    var carousel = Carousel.init(target);
    var slideTo = dom.getDataset(e.currentTarget, 'slideTo');

    if (!Core.isUndefined(slideTo)) {
      carousel.show(slideTo);
    } else if (dom.hasClass(e.currentTarget, 'carousel-prev')) {
      carousel.prev();
    } else {
      carousel.next();
    }
  });
  /**
   * Carousel Helpers
   */

  Object.assign(Carousel.prototype, {
    /**
     * Attach events for the Carousel.
     */
    _events: function _events() {
      var _this2 = this;

      if (this._settings.keyboard) {
        dom.addEvent(this._node, 'keydown.frost.carousel', function (e) {
          switch (e.key) {
            case 'ArrowLeft':
              e.preventDefault();

              _this2.prev()["catch"](function (_) {});

              break;

            case 'ArrowRight':
              e.preventDefault();

              _this2.next()["catch"](function (_) {});

              break;
          }
        });
      }

      if (this._settings.pause) {
        dom.addEvent(this._node, 'mouseenter.frost.carousel', function (_) {
          _this2.pause();
        });
        dom.addEvent(this._node, 'mouseleave.frost.carousel', function (_) {
          _this2._setTimer();
        });
      }

      dom.addEvent(this._node, 'remove.frost.carousel', function (_) {
        _this2.destroy();
      });
    },

    /**
     * Set a timer for the next Carousel cycle.
     */
    _setTimer: function _setTimer() {
      var _this3 = this;

      var interval = dom.getDataset(this._items[this._index], 'interval');
      this._timer = setTimeout(function (_) {
        return _this3.cycle();
      }, interval || this._settings.interval);
    },

    /**
     * Cycle to a specific Carousel item.
     * @param {number} index The item index to cycle to.
     */
    _show: function _show(index) {
      var _this4 = this;

      if (this._sliding) {
        this._queue.push(index);

        return;
      }

      index = parseInt(index);

      if (!this._settings.wrap && (index < 0 || index > this._items.length - 1)) {
        return;
      }

      var dir = 0;

      if (index < 0) {
        dir = -1;
      } else if (index > this._items.length - 1) {
        dir = 1;
      }

      index %= this._items.length;

      if (index < 0) {
        index = this._items.length + index;
      }

      if (index === this._index) {
        return;
      }

      var direction = dir == -1 || dir == 0 && index < this._index ? 'left' : 'right';
      var eventData = {
        direction: direction,
        relatedTarget: this._items[index],
        from: this._index,
        to: index
      };

      if (!dom.triggerOne(this._node, 'slide.frost.carousel', eventData)) {
        return;
      }

      var oldIndex = this._index;
      this._index = index;
      this._sliding = true;
      this.pause();
      dom.addClass(this._items[this._index], 'active');
      dom.removeClass(this._items[oldIndex], 'active');
      dom.animate(this._items[this._index], function (node, progress, options) {
        return _this4._update(node, _this4._items[oldIndex], progress, options.direction);
      }, {
        direction: direction,
        duration: this._settings.transition
      }).then(function (_) {
        var oldIndicator = dom.find('.active[data-slide-to]', _this4._node);
        var newIndicator = dom.find('[data-slide-to="' + _this4._index + '"]', _this4._node);
        dom.removeClass(oldIndicator, 'active');
        dom.addClass(newIndicator, 'active');
        dom.triggerEvent(_this4._node, 'slid.frost.carousel', eventData);
        _this4._sliding = false;

        if (!_this4._queue.length) {
          _this4._setTimer();
        } else {
          var next = _this4._queue.shift();

          _this4._show(next);
        }
      })["catch"](function (_) {
        _this4._sliding = false;
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
        nodeOut.style.setProperty('display', '');
        nodeOut.style.setProperty('transform', '');
        nodeIn.style.setProperty('transform', '');
        return;
      }

      var inverse = direction === 'right';
      nodeOut.style.setProperty('display', 'block');
      nodeOut.style.setProperty('transform', "translateX(".concat(Math.round(progress * 100) * (inverse ? -1 : 1), "%)"));
      nodeIn.style.setProperty('transform', "translateX(".concat(Math.round((1 - progress) * 100) * (inverse ? 1 : -1), "%)"));
    }
  }); // Carousel default options

  Carousel.defaults = {
    interval: 5000,
    transition: 500,
    keyboard: true,
    ride: false,
    pause: true,
    wrap: true
  }; // Carousel init

  dom.addEventOnce(window, 'load', function (_) {
    var nodes = dom.find('[data-ride="carousel"]');

    var _iterator3 = _createForOfIteratorHelper(nodes),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var node = _step3.value;
        Carousel.init(node);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }); // Carousel QuerySet method

  if (QuerySet) {
    QuerySet.prototype.carousel = function (a) {
      var settings, method;

      if (Core.isObject(a)) {
        settings = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var _iterator4 = _createForOfIteratorHelper(this),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var node = _step4.value;

          if (!Core.isElement(node)) {
            continue;
          }

          var carousel = Carousel.init(node, settings);

          if (method) {
            carousel[method].apply(carousel, args);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return this;
    };
  }

  UI.Carousel = Carousel;
  /**
   * Collapse Class
   * @class
   */

  var Collapse = /*#__PURE__*/function () {
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

      var id = this._node.getAttribute('id');

      this._triggers = dom.find("[data-toggle=\"collapse\"][data-target=\"#".concat(id, "\"]"));
      console.log(this._triggers);
      this._settings = Core.extend({}, this.constructor.defaults, dom.getDataset(this._node), settings);

      if (this._settings.parent) {
        this._parent = dom.findOne(this._settings.parent);
      }

      dom.setData(this._node, 'collapse', this);
    }
    /**
     * Destroy the Collapse.
     */


    _createClass(Collapse, [{
      key: "destroy",
      value: function destroy() {
        dom.removeData(this._node, 'collapse');
      }
      /**
       * Hide the element.
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this5 = this;

        if (this._animating || !dom.hasClass(this._node, 'show') || !dom.triggerOne(this._node, 'hide.frost.collapse')) {
          return;
        }

        this._animating = true;
        dom.squeezeOut(this._node, {
          direction: this._settings.direction,
          duration: this._settings.duration
        }).then(function (_) {
          dom.removeClass(_this5._node, 'show');
          dom.setAttribute(_this5._triggers, 'aria-expanded', false);
          dom.triggerEvent(_this5._node, 'hidden.frost.collapse');
        })["catch"](function (_) {})["finally"](function (_) {
          _this5._animating = false;
        });
      }
      /**
       * Show the element.
       */

    }, {
      key: "show",
      value: function show() {
        var _this6 = this;

        if (this._animating || dom.hasClass(this._node, 'show')) {
          return;
        }

        var collapses = [];

        if (this._parent) {
          var siblings = dom.find('.collapse.show', this._parent);

          var _iterator5 = _createForOfIteratorHelper(siblings),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var sibling = _step5.value;
              var collapse = this.constructor.init(sibling);

              if (this._parent !== collapse._parent) {
                continue;
              }

              if (collapse._animating) {
                return;
              }

              collapses.push(collapse);
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }

        if (!dom.triggerOne(this._node, 'show.frost.collapse')) {
          return;
        }

        for (var _i = 0, _collapses = collapses; _i < _collapses.length; _i++) {
          var _collapse = _collapses[_i];

          _collapse.hide();
        }

        this._animating = true;
        dom.addClass(this._node, 'show');
        dom.squeezeIn(this._node, {
          direction: this._settings.direction,
          duration: this._settings.duration
        }).then(function (_) {
          dom.setAttribute(_this6._triggers, 'aria-expanded', true);
          dom.triggerEvent(_this6._node, 'shown.frost.collapse');
        })["catch"](function (_) {})["finally"](function (_) {
          _this6._animating = false;
        });
      }
      /**
       * Toggle the element.
       */

    }, {
      key: "toggle",
      value: function toggle() {
        dom.hasClass(this._node, 'show') ? this.hide() : this.show();
      }
      /**
       * Initialize a Collapse.
       * @param {HTMLElement} node The input node.
       * @param {object} [settings] The options to create the Collapse with.
       * @param {string} [settings.direction=bottom] The direction to collapse the targets from/to.
       * @param {number} [settings.duration=300] The duration of the animation.
       * @returns {Collapse} A new Collapse object.
       */

    }], [{
      key: "init",
      value: function init(node, settings) {
        return dom.hasData(node, 'collapse') ? dom.getData(node, 'collapse') : new this(node, settings);
      }
    }]);

    return Collapse;
  }(); // Collapse events


  dom.addEventDelegate(document, 'click.frost.collapse', '[data-toggle="collapse"]', function (e) {
    e.preventDefault();
    var selector = UI.getTargetSelector(e.currentTarget);
    var targets = dom.find(selector);

    var _iterator6 = _createForOfIteratorHelper(targets),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var target = _step6.value;
        var collapse = Collapse.init(target);
        collapse.toggle();
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  }); // Collapse default options

  Collapse.defaults = {
    direction: 'bottom',
    duration: 250
  }; // Collapse QuerySet method

  if (QuerySet) {
    QuerySet.prototype.collapse = function (a) {
      var options, method;

      if (Core.isObject(a)) {
        options = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      var _iterator7 = _createForOfIteratorHelper(this),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var node = _step7.value;

          if (!Core.isElement(node)) {
            continue;
          }

          var collapse = Collapse.init(node, options);

          if (method) {
            collapse[method].apply(collapse, args);
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      return this;
    };
  }

  UI.Collapse = Collapse;
  /**
   * Dropdown Class
   * @class
   */

  var Dropdown = /*#__PURE__*/function () {
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
      var _this7 = this;

      _classCallCheck(this, Dropdown);

      this._node = node;
      this._settings = Core.extend({}, this.constructor.defaults, dom.getDataset(this._node), settings);
      this._containerNode = dom.parent(this._node).shift();
      this._menuNode = dom.next(this._node, '.dropdown-menu').shift();

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

      dom.addEvent(this._node, 'remove.frost.dropdown', function (_) {
        _this7.destroy();
      });
      dom.setData(this._node, 'dropdown', this);
    }
    /**
     * Destroy the Dropdown.
     */


    _createClass(Dropdown, [{
      key: "destroy",
      value: function destroy() {
        if (this._popper) {
          this._popper.destroy();
        }

        dom.removeEvent(this._node, 'keyup.frost.dropdown');
        dom.removeEvent(this._node, 'remove.frost.dropdown');
        dom.removeData(this._node, 'dropdown');
      }
      /**
       * Hide the Dropdown.
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this8 = this;

        if (this._animating || !dom.hasClass(this._containerNode, 'open') || !dom.triggerOne(this._node, 'hide.frost.dropdown')) {
          return;
        }

        this._animating = true;
        dom.fadeOut(this._menuNode, {
          duration: this._settings.duration
        }).then(function (_) {
          dom.removeClass(_this8._containerNode, 'open');
          dom.setAttribute(_this8._node, 'aria-expanded', false);
          dom.triggerEvent(_this8._node, 'hidden.frost.dropdown');
        })["catch"](function (_) {})["finally"](function (_) {
          _this8._animating = false;
        });
      }
      /**
       * Show the Dropdown.
       */

    }, {
      key: "show",
      value: function show() {
        var _this9 = this;

        if (this._animating || dom.hasClass(this._containerNode, 'open') || !dom.triggerOne(this._node, 'show.frost.dropdown')) {
          return;
        }

        this._animating = true;
        dom.addClass(this._containerNode, 'open');
        dom.fadeIn(this._menuNode, {
          duration: this._settings.duration
        }).then(function (_) {
          dom.setAttribute(_this9._node, 'aria-expanded', true);
          dom.triggerEvent(_this9._node, 'shown.frost.dropdown');
        })["catch"](function (_) {})["finally"](function (_) {
          _this9._animating = false;
        });
      }
      /**
       * Toggle the Dropdown.
       */

    }, {
      key: "toggle",
      value: function toggle() {
        dom.hasClass(this._containerNode, 'open') ? this.hide() : this.show();
      }
      /**
       * Auto-hide all visible dropdowns.
       * @param {HTMLElement} [target] The target node.
       * @param {Boolean} [noHideSelf=false] Whether to force prevent hiding self.
       */

    }], [{
      key: "autoHide",
      value: function autoHide(target) {
        var noHideSelf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (!noHideSelf) {
          noHideSelf = dom.is(target, 'form');
        }

        var menus = dom.find('.open > .dropdown-menu');

        var _iterator8 = _createForOfIteratorHelper(menus),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var menu = _step8.value;

            if (target && dom.hasDescendent(menu, target) && (noHideSelf || dom.closest(target, 'form', menu).length)) {
              continue;
            }

            var trigger = dom.prev(menu).shift();

            if (trigger === target) {
              continue;
            }

            var dropdown = this.init(trigger);
            dropdown.hide();
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }
      /**
       * Initialize a Dropdown.
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

    }, {
      key: "init",
      value: function init(node, settings) {
        return dom.hasData(node, 'dropdown') ? dom.getData(node, 'dropdown') : new this(node, settings);
      }
    }]);

    return Dropdown;
  }(); // Dropdown events


  dom.addEventDelegate(document, 'click.frost.dropdown keyup.frost.dropdown', '[data-toggle="dropdown"]', function (e) {
    if (e.key && e.key !== ' ') {
      return;
    }

    e.preventDefault();
    var dropdown = Dropdown.init(e.currentTarget);
    dropdown.toggle();
  });
  dom.addEventDelegate(document, 'keydown.frost.dropdown', '[data-toggle="dropdown"]', function (e) {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        var node = e.currentTarget;
        var dropdown = Dropdown.init(node);

        if (!dom.hasClass(dropdown._containerNode, 'open')) {
          dropdown.show();
        }

        var focusNode = dom.findOne('.dropdown-item:not([tabindex="-1"])', dropdown._menuNode);
        dom.focus(focusNode);
        break;
    }
  });
  dom.addEventDelegate(document, 'keydown.frost.dropdown', '.open > .dropdown-menu .dropdown-item', function (e) {
    var focusNode;

    switch (e.key) {
      case 'ArrowDown':
        focusNode = dom.nextAll(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').shift();
        break;

      case 'ArrowUp':
        focusNode = dom.prevAll(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').pop();
        break;

      default:
        return;
    }

    e.preventDefault();
    dom.focus(focusNode);
  });
  dom.addEvent(document, 'click.frost.dropdown', function (e) {
    Dropdown.autoHide(e.target);
  });
  dom.addEvent(document, 'keyup.frost.dropdown', function (e) {
    switch (e.key) {
      case 'Tab':
        Dropdown.autoHide(e.target, true);

      case 'Escape':
        Dropdown.autoHide();
    }
  }); // Dropdown default options

  Dropdown.defaults = {
    duration: 100,
    placement: 'bottom',
    position: 'start',
    fixed: false,
    spacing: 2,
    minContact: false
  }; // Dropdown QuerySet method

  if (QuerySet) {
    QuerySet.prototype.dropdown = function (a) {
      var settings, method;

      if (Core.isObject(a)) {
        settings = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      var _iterator9 = _createForOfIteratorHelper(this),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var node = _step9.value;

          if (!Core.isElement(node)) {
            continue;
          }

          var dropdown = Dropdown.init(node, settings);

          if (method) {
            dropdown[method].apply(dropdown, args);
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return this;
    };
  }

  UI.Dropdown = Dropdown;
  /**
   * Get a target from a node.
   * @param {HTMLElement} node The input node.
   * @param {string} [closestSelector] The default closest selector.
   * @return {HTMLElement} The target node.
   */

  UI.getTarget = function (node, closestSelector) {
    var selector = UI.getTargetSelector(node);
    var target;

    if (selector && selector !== '#') {
      target = dom.findOne(selector);
    } else if (closestSelector) {
      target = dom.closest(node, closestSelector).shift();
    }

    if (!target) {
      throw new Error('Target not found');
    }

    return target;
  };
  /**
   * Get the target selector from a node.
   * @param {HTMLElement} node The input node.
   * @return {string} The target selector.
   */


  UI.getTargetSelector = function (node) {
    return dom.getDataset(node, 'target') || dom.getAttribute(node, 'href');
  };
  /**
   * Modal Class
   * @class
   */


  var Modal = /*#__PURE__*/function () {
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
      this._settings = Core.extend({}, this.constructor.defaults, dom.getDataset(node), settings);
      this._dialog = dom.child(this._node, '.modal-dialog').shift();

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
        dom.removeData(this._node, 'modal');
      }
      /**
       * Hide the Modal.
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this10 = this;

        if (this._animating || !dom.hasClass(this._node, 'show') || !dom.triggerOne(this._node, 'hide.frost.modal')) {
          return;
        }

        this._animating = true;
        Promise.all([dom.fadeOut(this._dialog, {
          duration: this._settings.duration
        }), dom.dropOut(this._dialog, {
          duration: this._settings.duration
        }), dom.fadeOut(this._backdrop, {
          duration: this._settings.duration
        })]).then(function (_) {
          if (_this10._settings.backdrop) {
            dom.remove(_this10._backdrop);
            _this10._backdrop = null;
          }

          dom.removeAttribute(_this10._node, 'aria-modal');
          dom.setAttribute(_this10._node, 'aria-hidden', true);
          dom.removeClass(_this10._node, 'show');
          dom.removeClass(document.body, 'modal-open');

          if (_this10._activeTarget) {
            dom.focus(_this10._activeTarget);
          }

          dom.triggerEvent(_this10._node, 'hidden.frost.modal');
        })["catch"](function (_) {})["finally"](function (_) {
          _this10._animating = false;
        });
      }
      /**
       * Show the Modal.
       * @param {HTMLElement} [activeTarget] The active target.
       */

    }, {
      key: "show",
      value: function show(activeTarget) {
        var _this11 = this;

        if (this._animating || dom.hasClass(this._node, 'show') || !dom.triggerOne(this._node, 'show.frost.modal')) {
          return;
        }

        if (this._settings.backdrop) {
          this._backdrop = dom.create('div', {
            "class": 'modal-backdrop'
          });
          dom.append(document.body, this._backdrop);
        }

        this._activeTarget = activeTarget;
        this._animating = true;
        dom.addClass(this._node, 'show');
        dom.addClass(document.body, 'modal-open');
        Promise.all([dom.fadeIn(this._dialog, {
          duration: this._settings.duration
        }), dom.dropIn(this._dialog, {
          duration: this._settings.duration
        }), dom.fadeIn(this._backdrop, {
          duration: this._settings.duration
        })]).then(function (_) {
          dom.removeAttribute(_this11._node, 'aria-hidden');
          dom.setAttribute(_this11._node, 'aria-modal', true);

          if (_this11._settings.focus) {
            dom.focus(_this11._node);
          }

          dom.triggerEvent(_this11._node, 'shown.frost.modal');
        })["catch"](function (_) {})["finally"](function (_) {
          _this11._animating = false;
        });
      }
      /**
       * Toggle the Modal.
       */

    }, {
      key: "toggle",
      value: function toggle() {
        dom.hasClass(this._node, 'show') ? this.hide() : this.show();
      }
      /**
       * Initialize a Modal.
       * @param {HTMLElement} node The input node.
       * @param {object} [settings] The options to create the Modal with.
       * @param {number} [settings.duration=250] The duration of the animation.
       * @param {Boolean} [settings.backdrop=true] Whether to display a backdrop for the modal.
       * @param {Boolean} [settings.focus=true] Whether to set focus on the modal when shown.
       * @param {Boolean} [settings.show=true] Whether to show the modal on initialization.
       * @param {Boolean} [settings.keyboard=true] Whether to close the modal when the escape key is pressed.
       * @returns {Modal} A new Modal object.
       */

    }], [{
      key: "init",
      value: function init(node, settings) {
        return dom.hasData(node, 'modal') ? dom.getData(node, 'modal') : new this(node, settings);
      }
    }]);

    return Modal;
  }(); // Modal events


  dom.addEventDelegate(document, 'click.frost.modal', '[data-toggle="modal"]', function (e) {
    e.preventDefault();
    var target = UI.getTarget(e.currentTarget, '.modal');
    var modal = Modal.init(target);
    modal.show(e.currentTarget);
  });
  dom.addEventDelegate(document, 'click.frost.modal', '[data-dismiss="modal"]', function (e) {
    e.preventDefault();
    var target = UI.getTarget(e.currentTarget, '.modal');
    var modal = Modal.init(target);
    modal.hide();
  });
  dom.addEvent(document, 'click.frost.modal', function (e) {
    var backdrop = dom.findOne('.modal-backdrop');

    if (!backdrop) {
      return;
    }

    var targets = dom.find('.modal.show');

    var _iterator10 = _createForOfIteratorHelper(targets),
        _step10;

    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var target = _step10.value;

        if (target !== e.target && dom.hasDescendent(target, e.target)) {
          continue;
        }

        var modal = Modal.init(target);

        if (modal._settings.backdrop === 'static') {
          continue;
        }

        modal.hide();
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }
  });
  dom.addEvent(document, 'keyup.frost.modal', function (e) {
    if (e.key !== 'Escape') {
      return;
    }

    var targets = dom.find('.modal.show');

    var _iterator11 = _createForOfIteratorHelper(targets),
        _step11;

    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var target = _step11.value;
        var modal = Modal.init(target);

        if (!modal._settings.keyboard) {
          continue;
        }

        modal.hide();
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
  }); // Modal default options

  Modal.defaults = {
    duration: 250,
    backdrop: true,
    focus: true,
    show: false,
    keyboard: true
  }; // Modal QuerySet method

  if (QuerySet) {
    QuerySet.prototype.modal = function (a) {
      var settings, method;

      if (Core.isObject(a)) {
        settings = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      var _iterator12 = _createForOfIteratorHelper(this),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var node = _step12.value;

          if (!Core.isElement(node)) {
            continue;
          }

          var modal = Modal.init(node, settings);

          if (method) {
            modal[method].apply(modal, args);
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }

      return this;
    };
  }

  UI.Modal = Modal;
  /**
   * Popover Class
   * @class
   */

  var Popover = /*#__PURE__*/function () {
    /**
     * New Popover constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Popover with.
     * @param {string} [settings.template] The HTML template for the popover.
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
      this._settings = Core.extend({}, this.constructor.defaults, dom.getDataset(this._node), settings);
      this._triggers = this._settings.trigger.split(' ');

      this._render();

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
        if (this._popper) {
          this._popper.destroy();
        }

        dom.remove(this._popover);

        if (this._triggers.includes('hover')) {
          dom.removeEvent(this._node, 'mouseover.frost.popover');
          dom.removeEvent(this._node, 'mouseout.frost.popover');
        }

        if (this._triggers.includes('focus')) {
          dom.removeEvent(this._node, 'focus.frost.popover');
          dom.removeEvent(this._node, 'blur.frost.popover');
        }

        if (this._triggers.includes('click')) {
          dom.removeEvent(this._node, 'click.frost.popover');
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
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this12 = this;

        if (this._animating) {
          dom.stop(this._popover);
        }

        if (!dom.isConnected(this._popover) || !dom.triggerOne(this._node, 'hide.frost.popover')) {
          return;
        }

        this._animating = true;
        dom.fadeOut(this._popover, {
          duration: this._settings.duration
        }).then(function (_) {
          _this12._popper.destroy();

          dom.removeClass(_this12._popover, 'show');
          dom.detach(_this12._popover);
          dom.triggerEvent(_this12._node, 'hidden.frost.popover');
        })["catch"](function (_) {})["finally"](function (_) {
          _this12._animating = false;
        });
      }
      /**
       * Show the Popover.
       */

    }, {
      key: "show",
      value: function show() {
        var _this13 = this;

        if (this._animating) {
          dom.stop(this._popover);
        }

        if (dom.isConnected(this._popover) || !dom.triggerOne(this._node, 'show.frost.popover')) {
          return;
        }

        this._show();

        this._animating = true;
        dom.addClass(this._popover, 'show');
        dom.fadeIn(this._popover, {
          duration: this._settings.duration
        }).then(function (_) {
          dom.triggerEvent(_this13._node, 'shown.frost.popover');
        })["catch"](function (_) {})["finally"](function (_) {
          _this13._animating = false;
        });
      }
      /**
       * Toggle the Popover.
       */

    }, {
      key: "toggle",
      value: function toggle() {
        dom.isConnected(this._popover) ? this.hide() : this.show();
      }
      /**
       * Update the Popover position.
       */

    }, {
      key: "update",
      value: function update() {
        if (this._popper) {
          this._popper.update();
        }
      }
      /**
       * Initialize a Popover.
       * @param {HTMLElement} node The input node.
       * @param {object} [settings] The options to create the Popover with.
       * @param {string} [settings.template] The HTML template for the popover.
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

    }], [{
      key: "init",
      value: function init(node, settings) {
        return dom.hasData(node, 'popover') ? dom.getData(node, 'popover') : new this(node, settings);
      }
    }]);

    return Popover;
  }();
  /**
   * Popover Helpers
   */


  Object.assign(Popover.prototype, {
    /**
     * Attach events for the Popover.
     */
    _events: function _events() {
      var _this14 = this;

      if (this._triggers.includes('hover')) {
        dom.addEvent(this._node, 'mouseover.frost.popover', function (_) {
          if (!_this14._enabled) {
            return;
          }

          _this14.show();
        });
        dom.addEvent(this._node, 'mouseout.frost.popover', function (_) {
          if (!_this14._enabled) {
            return;
          }

          _this14.hide();
        });
      }

      if (this._triggers.includes('focus')) {
        dom.addEvent(this._node, 'focus.frost.popover', function (_) {
          if (!_this14._enabled) {
            return;
          }

          _this14.show();
        });
        dom.addEvent(this._node, 'blur.frost.popover', function (_) {
          if (!_this14._enabled) {
            return;
          }

          _this14.hide();
        });
      }

      if (this._triggers.includes('click')) {
        dom.addEvent(this._node, 'click.frost.popover', function (e) {
          e.preventDefault();

          if (!_this14._enabled) {
            return;
          }

          _this14.toggle();
        });
      }
    },

    /**
     * Render the Popover element.
     */
    _render: function _render() {
      this._popover = dom.parseHTML(this._settings.template).shift();
      this._arrow = dom.find('.popover-arrow', this._popover);
      this._popoverHeader = dom.find('.popover-header', this._popover);
      this._popoverBody = dom.find('.popover-body', this._popover);
    },

    /**
     * Update the Popover and append to the DOM.
     */
    _show: function _show() {
      var method = this._settings.html ? 'setHTML' : 'setText';

      var title = dom.getAttribute(this._node, 'title') || this._settings.title;

      var content = this._settings.content;
      dom[method](this._popoverHeader, this._settings.html && this._settings.sanitize ? this._settings.sanitize(title) : title);

      if (!title) {
        dom.hide(this._popoverHeader);
      } else {
        dom.show(this._popoverHeader);
      }

      dom[method](this._popoverBody, this._settings.html && this._settings.sanitize ? this._settings.sanitize(content) : content);

      if (this._container) {
        dom.append(this._container, this._popover);
      } else {
        dom.before(this._node, this._popover);
      }

      this._popper = new Popper(this._popover, {
        reference: this._node,
        arrow: this._arrow,
        placement: this._settings.placement,
        position: this._settings.position,
        fixed: this._settings.fixed,
        spacing: this._settings.spacing,
        minContact: this._settings.minContact
      });
    }
  }); // Popover default options

  Popover.defaults = {
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
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
    spacing: 3,
    minContact: false
  }; // Add Popover QuerySet method

  if (QuerySet) {
    QuerySet.prototype.popover = function (a) {
      var settings, method;

      if (Core.isObject(a)) {
        settings = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }

      var _iterator13 = _createForOfIteratorHelper(this),
          _step13;

      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var node = _step13.value;

          if (!Core.isElement(node)) {
            continue;
          }

          var popover = Popover.init(node, settings);

          if (method) {
            popover[method].apply(popover, args);
          }
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }

      return this;
    };
  }

  UI.Popover = Popover;
  /**
   * Popper Class
   * @class
   */

  var Popper = /*#__PURE__*/function () {
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
      var _this15 = this;

      _classCallCheck(this, Popper);

      this._node = node;
      this._settings = Core.extend({}, this.constructor.defaults, dom.getDataset(this._node), settings);
      this._fixed = dom.isFixed(this._settings.reference);
      this._scrollParent = this.constructor.getScrollParent(this._node);
      this._relativeParent = this.constructor.getRelativeParent(this._node);
      dom.setStyle(this._node, {
        position: this._fixed ? 'fixed' : 'absolute',
        top: 0,
        left: 0
      });
      PopperSet.add(this);

      if (this._scrollParent) {
        PopperSet.addOverflow(this._scrollParent, this);
      }

      dom.addEvent(this._node, 'remove.frost.popper', function (_) {
        _this15.destroy();
      });
      this.update();
      dom.setData(this._node, 'popper', this);
    }
    /**
     * Destroy the Popper.
     */


    _createClass(Popper, [{
      key: "destroy",
      value: function destroy() {
        PopperSet.remove(this);

        if (this._scrollParent) {
          PopperSet.removeOverflow(this._scrollParent, this);
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
        var windowBox = this.constructor.windowContainer(this._fixed); // check object could be seen

        if (this.constructor.isNodeHidden(nodeBox, referenceBox, windowBox, this._settings.spacing)) {
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


        var placement = this._settings.fixed ? this._settings.placement : this.constructor.getPopperPlacement(nodeBox, referenceBox, minimumBox, this._settings.placement, this._settings.spacing + 2);
        dom.setDataset(this._settings.reference, 'placement', placement);
        dom.setDataset(this._node, 'placement', placement); // get auto position

        var position = this._settings.position !== 'auto' ? this._settings.position : this.constructor.getPopperPosition(nodeBox, referenceBox, minimumBox, placement, this._settings.position); // calculate actual offset

        var offset = {
          x: Math.round(referenceBox.x),
          y: Math.round(referenceBox.y)
        }; // offset for relative parent

        var relativeBox = this._relativeParent && !this._fixed ? dom.rect(this._relativeParent, !this._fixed) : null;

        if (relativeBox) {
          offset.x -= Math.round(relativeBox.x);
          offset.y -= Math.round(relativeBox.y);
        } // offset for placement


        this.constructor.adjustPlacement(offset, nodeBox, referenceBox, placement, this._settings.spacing); // offset for position

        this.constructor.adjustPosition(offset, nodeBox, referenceBox, placement, position); // compensate for margins

        offset.x -= parseInt(dom.css(this._node, 'margin-left'));
        offset.y -= parseInt(dom.css(this._node, 'margin-top')); // corrective positioning

        this.constructor.adjustConstrain(offset, nodeBox, referenceBox, minimumBox, relativeBox, placement, this._settings.minContact); // compensate for scroll parent

        if (this._scrollParent) {
          offset.x += dom.getScrollX(this._scrollParent);
          offset.y += dom.getScrollY(this._scrollParent);
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
      /**
       * Update the position of the arrow for the actual placement and position.
       * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
       * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
       * @param {string} placement The actual placement of the Popper.
       * @param {string} position The actual position of the Popper.
       */

    }, {
      key: "_updateArrow",
      value: function _updateArrow(nodeBox, referenceBox, placement, position) {
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
    }]);

    return Popper;
  }();
  /**
   * PopperSet Class
   * @class
   */


  var PopperSet = /*#__PURE__*/function () {
    function PopperSet() {
      _classCallCheck(this, PopperSet);
    }

    _createClass(PopperSet, null, [{
      key: "add",

      /**
       * Add a Popper to the set.
       * @param {Popper} popper The popper to add.
       */
      value: function add(popper) {
        var _this16 = this;

        this._poppers.push(popper);

        if (this._running) {
          return;
        }

        dom.addEvent(window, 'resize.frost.popper scroll.frost.popper', Core.animation(function (_) {
          var _iterator14 = _createForOfIteratorHelper(_this16._poppers),
              _step14;

          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var _popper = _step14.value;

              _popper.update();
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
        }));
        this._running = true;
      }
      /**
       * Add a Popper to a scrolling parent set.
       * @param {HTMLElement} scrollParent The scrolling container element.
       * @param {Popper} popper The popper to add.
       */

    }, {
      key: "addOverflow",
      value: function addOverflow(scrollParent, popper) {
        var _this17 = this;

        if (!this._popperOverflows.has(scrollParent)) {
          this._popperOverflows.set(scrollParent, []);

          dom.addEvent(scrollParent, 'scroll.frost.popper', Core.animation(function (_) {
            var _iterator15 = _createForOfIteratorHelper(_this17._popperOverflows.get(scrollParent)),
                _step15;

            try {
              for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                var _popper2 = _step15.value;

                _popper2.update();
              }
            } catch (err) {
              _iterator15.e(err);
            } finally {
              _iterator15.f();
            }
          }));
        }

        this._popperOverflows.get(scrollParent).push(popper);
      }
      /**
       * Remove a Popper from the set.
       * @param {Popper} popper The popper to remove.
       */

    }, {
      key: "remove",
      value: function remove(popper) {
        this._poppers = this._poppers.filter(function (oldPopper) {
          return oldPopper !== popper;
        });

        if (this._poppers.length) {
          return;
        }

        dom.removeEvent(window, 'resize.frost.popper scroll.frost.popper');
        this._running = false;
      }
      /**
       * Remove a Popper from a scrolling parent set.
       * @param {HTMLElement} scrollParent The scrolling container element.
       * @param {Popper} popper The popper to remove.
       */

    }, {
      key: "removeOverflow",
      value: function removeOverflow(scrollParent, popper) {
        if (!this._popperOverflows.has(scrollParent)) {
          return;
        }

        var poppers = this._popperOverflows.get(scrollParent).filter(function (oldPopper) {
          return oldPopper !== popper;
        });

        if (poppers.length) {
          this._popperOverflows.set(scrollParent, poppers);

          return;
        }

        this._popperOverflows["delete"](scrollParent);

        dom.removeEvent(scrollParent, 'scroll.frost.popper');
      }
    }]);

    return PopperSet;
  }();
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
     * Adjust the offset for the position.
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
      return dom.closest(node, function (parent) {
        return !!['overflow', 'overflowX', 'overflowY'].find(function (overflow) {
          return !!['auto', 'scroll'].find(function (value) {
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
  }); // Popper default options

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
  PopperSet._poppers = [];
  PopperSet._popperOverflows = new Map();
  UI.Popper = Popper;
  UI.PopperSet = PopperSet; // Ripple events

  dom.addEventDelegate(document, 'mousedown.frost.ripple', '.ripple', function (e) {
    var pos = dom.position(e.currentTarget, true);
    UI.ripple(e.currentTarget, e.pageX - pos.x, e.pageY - pos.y);
  });
  /**
   * Create a ripple effect on a node.
   * @param {HTMLElement} node The input node.
   * @param {number} x The x position to start the ripple from.
   * @param {number} y The y position to start the ripple from.
   * @param {number} [duration=500] The duration of the ripple.
   */

  UI.ripple = function (node, x, y) {
    var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
    var width = dom.width(node);
    var height = dom.height(node);
    var scaleMultiple = Math.max(width, height);
    var ripple = dom.create('span', {
      "class": 'ripple-effect',
      style: {
        left: x,
        top: y
      }
    });
    dom.append(node, ripple);
    dom.animate(ripple, function (node, progress) {
      dom.setStyle(node, {
        scale: Math.floor(progress * scaleMultiple),
        opacity: 1 - progress
      });
    }, {
      duration: duration
    })["finally"](function (_) {
      dom.remove(ripple);
    });
  };
  /**
   * Tab Class
   * @class
   */


  var Tab = /*#__PURE__*/function () {
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
      this._settings = Core.extend({}, this.constructor.defaults, dom.getDataset(this._node), settings);
      var selector = UI.getTargetSelector(this._node);
      this._target = dom.findOne(selector);
      this._siblings = dom.siblings(this._node);
      dom.setData(this._node, 'tab', this);
    }
    /**
     * Destroy the Tab.
     */


    _createClass(Tab, [{
      key: "destroy",
      value: function destroy() {
        dom.removeData(this._node, 'tab');
      }
      /**
       * Hide the current Tab.
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this18 = this;

        if (this._animating || !dom.hasClass(this._target, 'active') || !dom.triggerOne(this._node, 'hide.frost.tab')) {
          return;
        }

        this._animating = true;
        dom.fadeOut(this._target, {
          duration: this._settings.duration
        }).then(function (_) {
          dom.removeClass(_this18._target, 'active');
          dom.removeClass(_this18._node, 'active');
          dom.setAttribute(_this18._node, 'aria-selected', false);
          dom.triggerEvent(_this18._node, 'hidden.frost.tab');
        })["catch"](function (_) {})["finally"](function (_) {
          _this18._animating = false;
        });
      }
      /**
       * Hide any active Tabs, and show the current Tab.
       */

    }, {
      key: "show",
      value: function show() {
        var _this19 = this;

        if (this._animating || dom.hasClass(this._target, 'active') || !dom.triggerOne(this._node, 'show.frost.tab')) {
          return;
        }

        var active = this._siblings.find(function (sibling) {
          return dom.hasClass(sibling, 'active');
        });

        var activeTab;

        if (active) {
          activeTab = this.constructor.init(active);

          if (activeTab._animating) {
            return;
          }
        }

        if (!dom.triggerOne(this._node, 'show.frost.tab')) {
          return;
        }

        var show = function show(_) {
          _this19._animating = true;
          dom.addClass(_this19._target, 'active');
          dom.addClass(_this19._node, 'active');
          dom.fadeIn(_this19._target, {
            duration: _this19._settings.duration
          }).then(function (_) {
            dom.setAttribute(_this19._node, 'aria-selected', true);
            dom.triggerEvent(_this19._node, 'shown.frost.tab');
          })["catch"](function (_) {})["finally"](function (_) {
            _this19._animating = false;
          });
        };

        if (!activeTab) {
          return show();
        }

        if (!dom.triggerOne(active, 'hide.frost.tab')) {
          return;
        }

        dom.addEventOnce(active, 'hidden.frost.tab', function (_) {
          show();
        });
        activeTab.hide();
      }
      /**
       * Initialize a Tab.
       * @param {HTMLElement} node The input node.
       * @param {object} [settings] The options to create the Tab with.
       * @param {number} [settings.duration=100] The duration of the animation.
       * @returns {Tab} A new Tab object.
       */

    }], [{
      key: "init",
      value: function init(node, settings) {
        return dom.hasData(node, 'tab') ? dom.getData(node, 'tab') : new this(node, settings);
      }
    }]);

    return Tab;
  }(); // Tab default options


  Tab.defaults = {
    duration: 100
  }; // Tab events

  dom.addEventDelegate(document, 'click.frost.tab', '[data-toggle="tab"]', function (e) {
    e.preventDefault();
    var tab = Tab.init(e.currentTarget);
    tab.show();
  }); // Tab QuerySet method

  if (QuerySet) {
    QuerySet.prototype.tab = function (a) {
      var settings, method;

      if (Core.isObject(a)) {
        settings = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }

      var _iterator16 = _createForOfIteratorHelper(this),
          _step16;

      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var node = _step16.value;

          if (!Core.isElement(node)) {
            continue;
          }

          var tab = Tab.init(node, settings);

          if (method) {
            tab[method].apply(tab, args);
          }
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
      }

      return this;
    };
  }

  UI.Tab = Tab;
  /**
   * Toast Class
   * @class
   */

  var Toast = /*#__PURE__*/function () {
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
      var _this20 = this;

      _classCallCheck(this, Toast);

      this._node = node;
      this._settings = Core.extend({}, this.constructor.defaults, dom.getDataset(this._node), settings);

      if (this._settings.autohide) {
        setTimeout(function (_) {
          return _this20.hide();
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
        dom.removeData(this._node, 'toast');
      }
      /**
       * Hide the Toast.
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this21 = this;

        if (this._animating || !dom.isVisible(this._node) || !dom.triggerOne(this._node, 'hide.frost.toast')) {
          return;
        }

        this._animating = true;
        dom.fadeOut(this._node, {
          duration: this._settings.duration
        }).then(function (_) {
          dom.hide(_this21._node);
          dom.triggerEvent(_this21._node, 'hidden.frost.toast');
        })["catch"](function (_) {})["finally"](function (_) {
          _this21._animating = false;
        });
      }
      /**
       * Show the Toast.
       */

    }, {
      key: "show",
      value: function show() {
        var _this22 = this;

        if (this._animating || dom.isVisible(this._node) || !dom.triggerOne(this._node, 'show.frost.toast')) {
          return;
        }

        this._animating = true;
        dom.show(this._node);
        dom.fadeIn(this._node, {
          duration: this._settings.duration
        }).then(function (_) {
          dom.triggerEvent(_this22._node, 'shown.frost.toast');
        })["catch"](function (_) {})["finally"](function (_) {
          _this22._animating = false;
        });
      }
      /**
       * Initialize a Toast.
       * @param {HTMLElement} node The input node.
       * @param {object} [settings] The options to create the Toast with.
       * @param {Boolean} [autohide=true] Whether to hide the toast after initialization.
       * @param {number} [settings.delay=5000] The duration to wait before hiding the toast.
       * @param {number} [settings.duration=100] The duration of the animation.
       * @returns {Toast} A new Toast object.
       */

    }], [{
      key: "init",
      value: function init(node, settings) {
        return dom.hasData(node, 'toast') ? dom.getData(node, 'toast') : new this(node, settings);
      }
    }]);

    return Toast;
  }(); // Toast default options


  Toast.defaults = {
    autohide: true,
    delay: 5000,
    duration: 100
  }; // Auto-initialize Toast from data-toggle

  dom.addEventDelegate(document, 'click.frost.toast', '[data-dismiss="toast"]', function (e) {
    e.preventDefault();
    var target = UI.getTarget(e.currentTarget, '.toast');
    var toast = Toast.init(target, {
      autohide: false
    });
    toast.hide();
  }); // Toast QuerySet method

  if (QuerySet) {
    QuerySet.prototype.toast = function (a) {
      var settings, method;

      if (Core.isObject(a)) {
        settings = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        args[_key9 - 1] = arguments[_key9];
      }

      var _iterator17 = _createForOfIteratorHelper(this),
          _step17;

      try {
        for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
          var node = _step17.value;

          if (!Core.isElement(node)) {
            continue;
          }

          var toast = Toast.init(node, settings);

          if (method) {
            toast[method].apply(toast, args);
          }
        }
      } catch (err) {
        _iterator17.e(err);
      } finally {
        _iterator17.f();
      }

      return this;
    };
  }

  UI.Toast = Toast;
  /**
   * Tooltip Class
   * @class
   */

  var Tooltip = /*#__PURE__*/function () {
    /**
     * New Tooltip constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Tooltip with.
     * @param {string} [settings.template] The HTML template for the tooltip.
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
      this._settings = Core.extend({}, this.constructor.defaults, dom.getDataset(this._node), settings);
      this._triggers = this._settings.trigger.split(' ');

      this._render();

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
        if (this._popper) {
          this._popper.destroy();
        }

        dom.remove(this._tooltip);

        if (this._triggers.includes('hover')) {
          dom.removeEvent(this._node, 'mouseover.frost.tooltip');
          dom.removeEvent(this._node, 'mouseout.frost.tooltip');
        }

        if (this._triggers.includes('focus')) {
          dom.removeEvent(this._node, 'focus.frost.tooltip');
          dom.removeEvent(this._node, 'blur.frost.tooltip');
        }

        if (this._triggers.includes('click')) {
          dom.removeEvent(this._node, 'click.frost.tooltip');
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
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this23 = this;

        if (this._animating) {
          dom.stop(this._tooltip);
        }

        if (!dom.isConnected(this._tooltip) || !dom.triggerOne(this._node, 'hide.frost.tooltip')) {
          return;
        }

        this._animating = true;
        dom.fadeOut(this._tooltip, {
          duration: this._settings.duration
        }).then(function (_) {
          _this23._popper.destroy();

          dom.removeClass(_this23._tooltip, 'show');
          dom.detach(_this23._tooltip);
          dom.triggerEvent(_this23._node, 'hidden.frost.tooltip');
        })["catch"](function (_) {})["finally"](function (_) {
          _this23._animating = false;
        });
      }
      /**
       * Show the Tooltip.
       */

    }, {
      key: "show",
      value: function show() {
        var _this24 = this;

        if (this._animating) {
          dom.stop(this._tooltip);
        }

        if (dom.isConnected(this._tooltip) || !dom.triggerOne(this._node, 'show.frost.tooltip')) {
          return;
        }

        this._show();

        this._animating = true;
        dom.addClass(this._tooltip, 'show');
        dom.fadeIn(this._tooltip, {
          duration: this._settings.duration
        }).then(function (_) {
          dom.triggerEvent(_this24._node, 'shown.frost.tooltip');
        })["catch"](function (_) {})["finally"](function (_) {
          _this24._animating = false;
        });
      }
      /**
       * Toggle the Tooltip.
       */

    }, {
      key: "toggle",
      value: function toggle() {
        dom.isConnected(this._tooltip) ? this.hide() : this.show();
      }
      /**
       * Update the Tooltip position.
       */

    }, {
      key: "update",
      value: function update() {
        if (this._popper) {
          this._popper.update();
        }
      }
      /**
       * Initialize a Tooltip.
       * @param {HTMLElement} node The input node.
       * @param {object} [settings] The options to create the Tooltip with.
       * @param {string} [settings.template] The HTML template for the tooltip.
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

    }], [{
      key: "init",
      value: function init(node, settings) {
        return dom.hasData(node, 'tooltip') ? dom.getData(node, 'tooltip') : new this(node, settings);
      }
    }]);

    return Tooltip;
  }();
  /**
   * Tooltip Helpers
   */


  Object.assign(Tooltip.prototype, {
    /**
     * Attach events for the Tooltip.
     */
    _events: function _events() {
      var _this25 = this;

      if (this._triggers.includes('hover')) {
        dom.addEvent(this._node, 'mouseover.frost.popover', function (_) {
          if (!_this25._enabled) {
            return;
          }

          _this25.show();
        });
        dom.addEvent(this._node, 'mouseout.frost.popover', function (_) {
          if (!_this25._enabled) {
            return;
          }

          _this25.hide();
        });
      }

      if (this._triggers.includes('focus')) {
        dom.addEvent(this._node, 'focus.frost.popover', function (_) {
          if (!_this25._enabled) {
            return;
          }

          _this25.show();
        });
        dom.addEvent(this._node, 'blur.frost.popover', function (_) {
          if (!_this25._enabled) {
            return;
          }

          _this25.hide();
        });
      }

      if (this._triggers.includes('click')) {
        dom.addEvent(this._node, 'click.frost.popover', function (e) {
          e.preventDefault();

          if (!_this25._enabled) {
            return;
          }

          _this25.toggle();
        });
      }
    },

    /**
     * Render the Tooltip element.
     */
    _render: function _render() {
      this._tooltip = dom.parseHTML(this._settings.template).shift();
      this._arrow = dom.find('.tooltip-arrow', this._tooltip);
      this._tooltipInner = dom.find('.tooltip-inner', this._tooltip);
    },

    /**
     * Update the Tooltip and append to the DOM.
     */
    _show: function _show() {
      var title = dom.getAttribute(this._node, 'title') || this._settings.title;

      var method = this._settings.html ? 'setHTML' : 'setText';
      dom[method](this._tooltipInner, this._settings.html && this._settings.sanitize ? this._settings.sanitize(title) : title);

      if (this._container) {
        dom.append(this._container, this._tooltip);
      } else {
        dom.before(this._node, this._tooltip);
      }

      this._popper = new Popper(this._tooltip, {
        reference: this._node,
        arrow: this._arrow,
        placement: this._settings.placement,
        position: this._settings.position,
        fixed: this._settings.fixed,
        spacing: this._settings.spacing,
        minContact: this._settings.minContact
      });
    }
  }); // Tooltip default options

  Tooltip.defaults = {
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
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
  }; // Tooltip QuerySet method

  if (QuerySet) {
    QuerySet.prototype.tooltip = function (a) {
      var settings, method;

      if (Core.isObject(a)) {
        settings = a;
      } else if (Core.isString(a)) {
        method = a;
      }

      for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        args[_key10 - 1] = arguments[_key10];
      }

      var _iterator18 = _createForOfIteratorHelper(this),
          _step18;

      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var node = _step18.value;

          if (!Core.isElement(node)) {
            continue;
          }

          var tooltip = Tooltip.init(node, settings);

          if (method) {
            tooltip[method].apply(tooltip, args);
          }
        }
      } catch (err) {
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }

      return this;
    };
  }

  UI.Tooltip = Tooltip;
  return {
    UI: UI
  };
});