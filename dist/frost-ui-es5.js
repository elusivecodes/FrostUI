"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  'use strict';

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory;
  } else {
    Object.assign(global, factory(global));
  }
})(window, function (window) {
  'use strict';

  var document = window.document;
  var Core = window.Core;
  var DOM = window.DOM;
  var dom = window.dom;
  var QuerySet = window.QuerySet;
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
     * @returns {Alert} A new Alert object.
     */
    function Alert(node, settings) {
      _classCallCheck(this, Alert);

      this._node = node;
      this._settings = _objectSpread({}, Alert.defaults, dom.getDataset(this._node), settings);
      dom.setData(this._node, 'alert', this);
    }
    /**
     * Destroy the Alert.
     */


    _createClass(Alert, [{
      key: "destroy",
      value: function destroy() {
        dom.stop(this._node, true);
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
          if (_this._animating || !DOM._triggerEvent(_this._node, 'close.frost.alert')) {
            return reject();
          }

          _this._animating = true;
          dom.fadeOut(_this._node, {
            duration: _this._settings.duration
          }).then(function (_) {
            dom.triggerEvent(_this._node, 'closed.frost.alert');
            dom.remove(_this._node);
            resolve();
          }).catch(function (_) {
            return reject();
          }).finally(function (_) {
            _this._animating = false;
          });
        });
      }
    }]);

    return Alert;
  }(); // Default Alert options


  Alert.defaults = {
    duration: 100
  }; // Remove Alert from data-dismiss

  dom.addEventDelegate(document, 'click', '[data-dismiss="alert"]', function (e) {
    e.preventDefault();
    var element = dom.closest(e.currentTarget, '.alert').shift();
    var alert = dom.hasData(element, 'alert') ? dom.getData(element, 'alert') : new Alert(element);
    alert.close();
  });
  UI.Alert = Alert;
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
     * @returns {Carousel} A new Carousel object.
     */
    function Carousel(node, settings) {
      _classCallCheck(this, Carousel);

      this._node = node;
      this._settings = _objectSpread({}, Carousel.defaults, dom.getDataset(this._node), settings);
      this._items = dom.find('.carousel-item', this._node);
      this._index = this._items.findIndex(function (item) {
        return dom.hasClass(item, 'active');
      });
      this._queue = [];

      this._events();

      if (this._settings.ride === 'carousel') {
        this._setTimer();
      }

      dom.setData(this._node, 'carousel', this);
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

        dom.stop(this._node, true);
        dom.removeEvent(this._node, 'click.frost.carousel', this._clickNextEvent);
        dom.removeEvent(this._node, 'click.frost.carousel', this._clickPrevEvent);
        dom.removeEvent(this._node, 'click.frost.carousel', this._clickSlideEvent);
        dom.removeEvent(this._node, 'keydown.frost.carousel', this._keyDownEvent);
        dom.removeEvent(this._node, 'mouseenter.frost.carousel', this._mouseEnterEvent);
        dom.removeEvent(this._node, 'mouseleave.frost.carousel', this._mouseLeaveEvent);
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
        if (this._sliding) {
          dom.stop(this._items, true);
        }

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
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          if (_this2._sliding) {
            _this2._queue.push({
              index: index
            });

            return reject();
          }

          index = parseInt(index);

          if (!_this2._settings.wrap && (index < 0 || index > _this2._items.length - 1)) {
            return reject();
          }

          var dir = 0;

          if (index < 0) {
            dir = -1;
          } else if (index > _this2._items.length - 1) {
            dir = 1;
          }

          index %= _this2._items.length;

          if (index < 0) {
            index = _this2._items.length + index;
          }

          if (index === _this2._index) {
            return reject();
          }

          var direction = dir == -1 || dir == 0 && index < _this2._index ? 'left' : 'right';
          var eventData = {
            direction: direction,
            relatedTarget: _this2._items[index],
            from: _this2._index,
            to: index
          };

          if (!DOM._triggerEvent(_this2._node, 'slide.frost.carousel', eventData)) {
            return reject();
          }

          var oldIndex = _this2._index;
          _this2._index = index;
          _this2._sliding = true;

          _this2.pause();

          dom.addClass(_this2._items[_this2._index], 'active');
          dom.animate(_this2._items[_this2._index], function (node, progress, options) {
            return _this2._update(node, _this2._items[oldIndex], progress, options.direction);
          }, {
            direction: direction,
            duration: _this2._settings.transition
          }).then(function (_) {
            dom.removeClass(_this2._items[oldIndex], 'active');
            dom.removeClass(dom.find('.active[data-slide-to]', _this2._node), 'active');
            dom.addClass(dom.find('[data-slide-to="' + _this2._index + '"]', _this2._node), 'active');
            _this2._sliding = false;
            dom.triggerEvent(_this2._node, 'slid.frost.carousel', eventData);

            if (!_this2._queue.length) {
              _this2._setTimer();

              return resolve();
            }

            var next = _this2._queue.shift();

            return next.dir ? _this2.slide(next.dir) : _this2.show(next.index);
          });
        });
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

        if (this._sliding) {
          return this._queue.push({
            dir: direction
          });
        }

        return this.show(this._index + direction);
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

  dom.addEvent(window, 'load', function (_) {
    var nodes = dom.find('[data-ride="carousel"]');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var node = _step.value;
        new Carousel(node);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }); // Add Carousel QuerySet method

  if (QuerySet) {
    QuerySet.prototype.carousel = function (a) {
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

        var carousel = dom.hasData(node, 'carousel') ? dom.getData(node, 'carousel') : new Carousel(node, options);

        if (index || !method) {
          return;
        }

        result = carousel[method].apply(carousel, args);
      });
      return method ? result : this;
    };
  }

  UI.Carousel = Carousel;
  /**
   * Carousel Private
   */

  Object.assign(Carousel.prototype, {
    /**
     * Update the position of the Carousel items.
     * @param {Node} nodeIn The new node.
     * @param {Node} nodeOut The old node.
     * @param {number} progress The progress of the cycle.
     * @param {string} direction The direction to cycle to.
     */
    _update: function _update(nodeIn, nodeOut, progress, direction) {
      if (progress < 1) {
        var size = DOM._width(nodeIn);

        var inverse = direction === 'left';
        DOMNode.setStyle(nodeIn, 'position', 'absolute');
        DOMNode.setStyle(nodeIn, 'top', 0);
        DOMNode.setStyle(nodeIn, 'transform', "translateX(".concat(Math.round(size - size * progress) * (inverse ? -1 : 1), "px)"));
        DOMNode.setStyle(nodeOut, 'transform', "translateX(".concat(Math.round(size - size * (1 - progress)) * (inverse ? 1 : -1), "px)"));
      } else {
        DOMNode.setStyle(nodeIn, 'transform', '');
        DOMNode.setStyle(nodeIn, 'position', '');
        DOMNode.setStyle(nodeIn, 'top', '');
        DOMNode.setStyle(nodeOut, 'transform', '');
      }
    },

    /**
     * Attach events for the Carousel.
     */
    _events: function _events() {
      var _this3 = this;

      this._clickNextEvent = function (e) {
        e.preventDefault();

        try {
          _this3.next();
        } catch (e) {}
      };

      this._clickPrevEvent = function (e) {
        e.preventDefault();

        try {
          _this3.prev();
        } catch (e) {}
      };

      this._clickSlideEvent = function (e) {
        e.preventDefault();
        var slideTo = dom.getDataset(e.currentTarget, 'slideTo');

        try {
          _this3.show(slideTo);
        } catch (e) {}
      };

      this._keyDownEvent = function (e) {
        if (_this3._sliding || e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
          return;
        }

        e.preventDefault();

        try {
          if (e.key === 'ArrowLeft') {
            _this3.prev();
          } else if (e.key === 'ArrowRight') {
            _this3.next();
          }
        } catch (e) {}
      };

      this._mouseEnterEvent = function (_) {
        return _this3.pause();
      };

      this._mouseLeaveEvent = function (_) {
        return _this3._setTimer();
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
      var _this4 = this;

      this._timer = setTimeout(function (_) {
        try {
          _this4.cycle();
        } catch (e) {}
      }, this._settings.interval);
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
     * @returns {Collapse} A new Collapse object.
     */
    function Collapse(node, settings) {
      _classCallCheck(this, Collapse);

      this._node = node;
      this._settings = _objectSpread({}, Collapse.defaults, dom.getDataset(this._node), settings);
      this._target = dom.find(this._settings.target);
      this._visible = dom.isVisible(this._target);

      this._events();

      dom.setData(this._node, 'collapse', this);
    }
    /**
     * Destroy the Collapse.
     */


    _createClass(Collapse, [{
      key: "destroy",
      value: function destroy() {
        dom.stop(this._target, true);
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
        var _this5 = this;

        return new Promise(function (resolve, reject) {
          if (!_this5._visible || _this5._animating || !DOM._triggerEvent(_this5._node, 'hide.frost.collapse')) {
            return reject();
          }

          _this5._animating = true;
          dom.squeezeOut(_this5._target, {
            dir: _this5._settings.direction,
            duration: _this5._settings.duration
          }).then(function (_) {
            _this5._visible = false;
            dom.hide(_this5._target);
            dom.triggerEvent(_this5._node, 'hidden.frost.collapse');
            resolve();
          }).catch(function (_) {
            return reject();
          }).finally(function (_) {
            _this5._animating = false;
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
        var _this6 = this;

        return new Promise(function (resolve, reject) {
          if (_this6._visible || _this6._animating || !DOM._triggerEvent(_this6._node, 'show.frost.collapse')) {
            return reject();
          }

          _this6._animating = true;
          _this6._visible = true;
          dom.show(_this6._target);
          dom.squeezeIn(_this6._target, {
            dir: _this6._settings.direction,
            duration: _this6._settings.duration
          }).then(function (_) {
            dom.triggerEvent(_this6._node, 'shown.frost.collapse');
            resolve();
          }).catch(function (_) {
            return reject();
          }).finally(function (_) {
            _this6._animating = false;
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
        return this._visible ? this.hide() : this.show();
      }
    }]);

    return Collapse;
  }(); // Default Collapse options


  Collapse.defaults = {
    direction: 'bottom',
    duration: 300
  }; // Auto-initialize Collapse from data-toggle

  dom.addEvent(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="collapse"]');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var node = _step2.value;
        new Collapse(node);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }); // Add Collapse QuerySet method

  if (QuerySet) {
    QuerySet.prototype.collapse = function (a) {
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

        var collapse = dom.hasData(node, 'collapse') ? dom.getData(node, 'collapse') : new Collapse(node, options);

        if (index || !method) {
          return;
        }

        result = collapse[method].apply(collapse, args);
      });
      return method ? result : this;
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
      var _this7 = this;

      this._clickEvent = function (e) {
        e.preventDefault();

        _this7.toggle();
      };

      dom.addEvent(this._node, 'click.frost.collapse', this._clickEvent);
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
     * @returns {Dropdown} A new Dropdown object.
     */
    function Dropdown(node, settings) {
      var _this8 = this;

      _classCallCheck(this, Dropdown);

      this._node = node;
      this._settings = _objectSpread({}, Dropdown.defaults, dom.getDataset(this._node), settings);
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


      this._popper = new Popper(this._menuNode, this._referenceNode, {
        placement: this._settings.placement,
        position: this._settings.position,
        fixed: this._settings.fixed,
        spacing: this._settings.spacing,
        width: this._settings.width,
        zIndex: this._settings.zIndex
      });
      this._visible = dom.hasClass(this._containerNode, 'open');

      this._getDir = function (_) {
        return dom.getDataset(_this8._referenceNode, 'placement');
      };

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

        this._popper.destroy();

        dom.removeClass(this._containerNode, 'open');
        dom.removeEvent(window, 'click.frost.dropdown', this._windowClickEvent);
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
        var _this9 = this;

        return new Promise(function (resolve, reject) {
          if (!_this9._visible || _this9._animating || !DOM._triggerEvent(_this9._node, 'hide.frost.dropdown')) {
            return reject();
          }

          _this9._animating = true;
          dom.removeEvent(window, 'click.frost.dropdown', _this9._windowClickEvent);
          Promise.all([dom.fadeOut(_this9._menuNode, {
            duration: _this9._settings.duration
          }), dom.squeezeOut(_this9._menuNode, {
            dir: _this9._getDir,
            duration: _this9._settings.duration
          })]).then(function (_) {
            _this9._visible = false;
            dom.removeClass(_this9._containerNode, 'open');
            dom.triggerEvent(_this9._node, 'hidden.frost.dropdown');
            resolve();
          }).catch(function (_) {
            return reject();
          }).finally(function (_) {
            _this9._animating = false;
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
        var _this10 = this;

        return new Promise(function (resolve, reject) {
          if (_this10._visible || _this10._animating || !DOM._triggerEvent(_this10._node, 'show.frost.dropdown')) {
            return reject();
          }

          _this10._animating = true;
          _this10._visible = true;
          dom.addClass(_this10._containerNode, 'open');
          Promise.all([dom.fadeIn(_this10._menuNode, {
            duration: _this10._settings.duration
          }), dom.squeezeIn(_this10._menuNode, {
            dir: _this10._getDir,
            duration: _this10._settings.duration
          })]).then(function (_) {
            dom.addEventOnce(window, 'click.frost.dropdown', _this10._windowClickEvent);
            dom.triggerEvent(_this10._node, 'shown.frost.dropdown');
            resolve();
          }).catch(function (_) {
            return reject();
          }).finally(function (_) {
            _this10._animating = false;
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
        return this._visible ? this.hide() : this.show();
      }
    }]);

    return Dropdown;
  }(); // Default Dropdown options


  Dropdown.defaults = {
    duration: 150,
    placement: 'bottom',
    position: 'start',
    fixed: false,
    spacing: 2,
    width: false,
    zIndex: 1000
  }; // Auto-initialize Dropdown from data-toggle

  dom.addEvent(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="dropdown"]');
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = nodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var node = _step3.value;
        new Dropdown(node);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }); // Add Dropdown QuerySet method

  if (QuerySet) {
    QuerySet.prototype.dropdown = function (a) {
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

        var dropdown = dom.hasData(node, 'dropdown') ? dom.getData(node, 'dropdown') : new Dropdown(node, options);

        if (index || !method) {
          return;
        }

        result = dropdown[method].apply(dropdown, args);
      });
      return method ? result : this;
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
      var _this11 = this;

      this._clickEvent = function (e) {
        e.preventDefault();

        _this11.toggle();
      };

      this._keyUpEvent = function (e) {
        if (e.key !== ' ') {
          return;
        }

        e.preventDefault();

        _this11.toggle();
      };

      this._keyDownEvent = function (e) {
        if (!['ArrowDown', 'ArrowUp'].includes(e.key)) {
          return;
        }

        e.preventDefault();

        _this11.show().then(function (_) {
          var next = dom.findOne('.dropdown-item', _this11._menuNode);
          dom.focus(next);
        });
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

      this._windowClickEvent = function (_) {
        return _this11.hide();
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
     * @returns {Modal} A new Modal object.
     */
    function Modal(node, settings) {
      var _this12 = this;

      _classCallCheck(this, Modal);

      this._node = node;
      this._settings = _objectSpread({}, Modal.defaults, dom.getDataset(node), settings);
      this._dialog = dom.child(this._node, '.modal-dialog');
      this._visible = dom.isVisible(this._node);

      this._windowKeyDownEvent = function (e) {
        if (e.key !== 'Escape') {
          return;
        }

        e.preventDefault();

        _this12.hide();
      };

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
        dom.stop([this._node, this._dialog, this._backdrop], true);

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
        var _this13 = this;

        return new Promise(function (resolve, reject) {
          if (!_this13._visible || _this13._animating || !DOM._triggerEvent(_this13._node, 'hide.frost.modal')) {
            return reject();
          }

          _this13._animating = true;
          dom.removeEvent(_this13._backdrop, 'click.frost.autocomplete');
          Promise.all([dom.fadeOut(_this13._dialog, {
            duration: _this13._settings.duration
          }), dom.dropOut(_this13._dialog, {
            duration: _this13._settings.duration
          }), dom.fadeOut(_this13._backdrop, {
            duration: _this13._settings.duration
          })]).then(function (_) {
            _this13._visible = false;

            if (_this13._settings.backdrop) {
              dom.remove(_this13._backdrop);
            }

            if (_this13._settings.keyboard) {
              dom.removeEvent(window, 'keydown.frost.modal', _this13._windowKeyDownEvent);
            }

            dom.removeClass(_this13._node, 'show');
            dom.removeClass(document.body, 'modal-open');
            dom.triggerEvent(_this13._node, 'hidden.frost.modal');
            resolve();
          }).catch(function (_) {
            return reject();
          }).finally(function (_) {
            _this13._animating = false;
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
        var _this14 = this;

        return new Promise(function (resolve, reject) {
          if (_this14._visible || _this14._animating || !DOM._triggerEvent(_this14._node, 'show.frost.modal')) {
            return reject();
          }

          if (_this14._settings.backdrop) {
            _this14._backdrop = dom.create('div', {
              class: 'modal-backdrop'
            });
            dom.append(document.body, _this14._backdrop);
          }

          _this14._animating = true;
          _this14._visible = true;
          dom.addClass(_this14._node, 'show');
          dom.addClass(document.body, 'modal-open');
          Promise.all([dom.fadeIn(_this14._dialog, {
            duration: _this14._settings.duration
          }), dom.dropIn(_this14._dialog, {
            duration: _this14._settings.duration
          }), dom.fadeIn(_this14._backdrop, {
            duration: _this14._settings.duration
          })]).then(function (_) {
            _this14._animating = false;

            if (_this14._settings.backdrop) {
              dom.addEventOnce(_this14._backdrop, 'click.frost.modal', function (_) {
                return _this14.hide();
              });
            }

            if (_this14._settings.keyboard) {
              dom.addEvent(window, 'keydown.frost.modal', _this14._windowKeyDownEvent);
            }

            if (_this14._settings.focus) {
              dom.focus(_this14._node);
            }

            dom.triggerEvent(_this14._node, 'shown.frost.modal');
            resolve();
          }).catch(function (_) {
            return reject();
          }).finally(function (_) {
            _this14._animating = false;
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
        return this._visible ? this.hide() : this.show();
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
  }; // Initialize Modal from data-toggle

  dom.addEventDelegate(document, 'click', '[data-toggle="modal"]', function (e) {
    e.preventDefault();
    var target = dom.getDataset(e.currentTarget, 'target');
    var element = dom.findOne(target);

    if (dom.hasData(element, 'modal')) {
      dom.getData(element, 'modal').show();
    } else {
      new Modal(element);
    }
  }); // Hide Modal from data-dismiss

  dom.addEventDelegate(document, 'click', '[data-dismiss="modal"]', function (e) {
    e.preventDefault();
    var element = dom.closest(e.currentTarget, '.modal');
    var modal = dom.hasData(element, 'modal') ? dom.getData(element, 'modal') : new Modal(element);
    modal.hide();
  }); // Add Modal QuerySet method

  if (QuerySet) {
    QuerySet.prototype.modal = function (a) {
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

        var modal = dom.hasData(node, 'modal') ? dom.getData(node, 'modal') : new Modal(node, options);

        if (index || !method) {
          return;
        }

        result = modal[method].apply(modal, args);
      });
      return method ? result : this;
    };
  }

  UI.Modal = Modal;
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
     * @returns {Popover} A new Popover object.
     */
    function Popover(node, settings) {
      _classCallCheck(this, Popover);

      this._node = node;
      this._settings = _objectSpread({}, Popover.defaults, dom.getDataset(this._node), settings);

      if (this._settings.container) {
        this._container = dom.findOne(this._settings.container);
      }

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
        var _this15 = this;

        return new Promise(function (resolve, reject) {
          if (!_this15._popover || !DOM._triggerEvent(_this15._node, 'hide.frost.popover')) {
            return reject();
          }

          dom.fadeOut(_this15._popover, {
            duration: _this15._settings.duration
          }).then(function (_) {
            _this15._popper.destroy();

            dom.remove(_this15._popover);
            _this15._popover = null;
            _this15._popper = null;
            dom.triggerEvent(_this15._node, 'hidden.frost.popover');
            resolve();
          }).catch(function (_) {
            return reject();
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
        var _this16 = this;

        return new Promise(function (resolve, reject) {
          if (_this16._popover || !DOM._triggerEvent(_this16._node, 'show.frost.popover')) {
            return reject();
          }

          _this16._render();

          dom.addClass(_this16._popover, 'show');
          dom.fadeIn(_this16._popover, {
            duration: _this16._settings.duration
          }).then(function (_) {
            dom.triggerEvent(_this16._node, 'shown.frost.popover');
            resolve();
          }).catch(function (_) {
            return reject();
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
    delay: 0,
    duration: 100,
    enable: true,
    html: false,
    trigger: 'click',
    sanitize: function sanitize(input) {
      return dom.sanitize(input);
    },
    placement: 'auto',
    position: 'center',
    fixed: false,
    spacing: 7,
    width: false,
    zIndex: 1000
  }; // Auto-initialize Popover from data-toggle

  dom.addEvent(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="popover"]');
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = nodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var node = _step4.value;
        new Popover(node);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }); // Add Popover QuerySet method

  if (QuerySet) {
    QuerySet.prototype.popover = function (a) {
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

        var popover = dom.hasData(node, 'popover') ? dom.getData(node, 'popover') : new Popover(node, options);

        if (index || !method) {
          return;
        }

        result = popover[method].apply(popover, args);
      });
      return method ? result : this;
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
      var _this17 = this;

      this._hideEvent = function (_) {
        if (!_this17._enabled) {
          return;
        }

        try {
          _this17.hide();
        } catch (e) {}
      };

      this._hoverEvent = function (_) {
        if (!_this17._enabled) {
          return;
        }

        try {
          _this17.show();

          dom.addEventOnce(_this17._node, 'mouseout.frost.popover', _this17._hideEvent);
        } catch (e) {}
      };

      this._focusEvent = function (_) {
        if (!_this17._enabled) {
          return;
        }

        try {
          _this17.show();

          dom.addEventOnce(_this17._node, 'blur.frost.popover', _this17._hideEvent);
        } catch (e) {}
      };

      this._clickEvent = function (e) {
        e.preventDefault();

        if (!_this17._enabled) {
          return;
        }

        try {
          _this17.toggle();
        } catch (e) {}
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
        class: this._settings.classes.popover,
        attributes: {
          role: 'tooltip'
        }
      });
      var arrow = dom.create('div', {
        class: this._settings.classes.arrow
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

      this._popper = new Popper(this._popover, this._node, {
        arrow: arrow,
        placement: this._settings.placement,
        position: this._settings.position,
        fixed: this._settings.fixed,
        spacing: this._settings.spacing,
        width: this._settings.width,
        zIndex: this._settings.zIndex
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
     * @param {HTMLElement} reference The reference node.
     * @param {object} [settings] The options to create the Popper with.
     * @returns {Popper} A new Popper object.
     */
    function Popper(node, reference, settings) {
      _classCallCheck(this, Popper);

      this._node = node;
      this._referenceNode = reference;
      this._fixed = dom.isFixed(this._referenceNode);
      this._settings = _objectSpread({}, Popper.defaults, dom.getDataset(this._node), settings);
      var wrapper = dom.create('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: this._settings.zIndex
        }
      });

      if (this._settings.width && this._settings.width !== 'reference') {
        dom.setStyle(wrapper, 'width', this._settings.width);
      }

      dom.wrap(this._node, wrapper);
      this._wrapper = dom.parent(this._node);
      dom.setData(this._node, 'popper', this);
      this.update();

      if (!this._fixed) {
        Popper._poppers.set(this._node, this);

        Popper.start();
      }
    }

    _createClass(Popper, [{
      key: "destroy",
      value: function destroy() {
        dom.before(this._wrapper, dom.contents(this._wrapper));
        dom.remove(this._wrapper);
        dom.removeData(this._node, 'popper');

        Popper._poppers.delete(this._node);
      }
    }, {
      key: "update",
      value: function update() {
        if (!dom.isConnected(this._node)) {
          return;
        }

        if (!this._settings.width) {
          dom.setStyle(this._node, 'width', '');
          dom.setStyle(this._wrapper, 'width', '100%');
        } // calculate boxes


        var nodeBox = dom.rect(this._node, !this._fixed);
        var referenceBox = dom.rect(this._referenceNode, !this._fixed);
        var windowY = this._fixed ? 0 : dom.getScrollY(window);
        var windowX = this._fixed ? 0 : dom.getScrollX(window);
        var docWidth = dom.width(document);
        var docHeight = dom.height(document); // check object could be seen

        if (windowY > referenceBox.bottom + nodeBox.height + this._settings.spacing || windowX > referenceBox.right + nodeBox.width + this._settings.spacing || windowY + docHeight < referenceBox.top - nodeBox.height - this._settings.spacing || windowX + docWidth < referenceBox.left - nodeBox.width - this._settings.spacing) {
          return;
        } // get optimal placement


        var placement = this._settings.fixed ? this._settings.placement : Popper.getPopperPlacement(nodeBox, referenceBox.top - windowY, windowX + docWidth - referenceBox.right, windowY + docHeight - referenceBox.bottom, referenceBox.left - windowX, this._settings.placement, this._settings.spacing + 2);
        dom.setDataset(this._referenceNode, 'placement', placement);
        dom.setDataset(this._node, 'placement', placement); // calculate actual offset

        var offsetY = Math.round(referenceBox.y);
        var offsetX = Math.round(referenceBox.x);

        if (placement === 'top') {
          offsetY -= Math.round(nodeBox.height) + this._settings.spacing;
        } else if (placement === 'bottom') {
          offsetY += Math.round(referenceBox.height) + this._settings.spacing;
        } else if (placement === 'left') {
          offsetX -= Math.round(nodeBox.width) + this._settings.spacing;
        } else if (placement === 'right') {
          offsetX += Math.round(referenceBox.width) + this._settings.spacing;
        } // adjust position


        var deltaX = Math.round(nodeBox.width) - Math.round(referenceBox.width);
        var deltaY = Math.round(nodeBox.height) - Math.round(referenceBox.height);
        var position = this._settings.fixed ? this._settings.position : Popper.getPopperPosition(referenceBox, deltaX, deltaY, docWidth, docHeight, placement, this._settings.position);

        if (position === 'center') {
          if (placement === 'top' || placement === 'bottom') {
            offsetX -= Math.round(deltaX / 2);
          } else {
            offsetY -= Math.round(deltaY / 2);
          }
        } else if (position === 'end') {
          if (placement === 'top' || placement === 'bottom') {
            offsetX -= deltaX;
          } else {
            offsetY -= deltaY;
          }
        } // corrective positioning


        if (!this._settings.fixed) {
          if (placement === 'left' || placement === 'right') {
            if (offsetY + nodeBox.height > windowY + docHeight) {
              var diff = offsetY + nodeBox.height - (windowY + docHeight);
              offsetY = Math.max(referenceBox.top, offsetY - diff);
            } else if (offsetY < windowY) {
              var _diff = offsetY - windowY;

              offsetY = Math.min(referenceBox.bottom - nodeBox.height, offsetY - _diff);
            }
          } else {
            if (offsetX + nodeBox.width > windowX + docWidth) {
              var _diff2 = offsetX + nodeBox.width - (windowX + docWidth);

              offsetX = Math.max(referenceBox.left, offsetX - _diff2);
            } else if (offsetX < windowX) {
              var _diff3 = offsetX - windowX;

              offsetX = Math.min(referenceBox.right - nodeBox.width, offsetX - _diff3);
            }
          }
        } // relative position


        dom.setStyle(this._wrapper, 'transform', '');
        var offset = dom.position(this._wrapper, !this._fixed);
        offsetY -= Math.round(offset.y);
        offsetX -= Math.round(offset.x); // update position

        if (this._settings.arrow) {
          var arrowBox = dom.rect(this._settings.arrow);
          var arrowStyles = {
            top: '',
            right: '',
            bottom: '',
            left: ''
          };

          if (placement === 'top' || placement === 'bottom') {
            arrowStyles[placement === 'top' ? 'bottom' : 'top'] = -arrowBox.height;

            var _diff4 = (referenceBox.width - nodeBox.width) / 2;

            var _offset = nodeBox.width / 2 - arrowBox.width / 2;

            if (position === 'start') {
              _offset += _diff4;
            } else if (position === 'end') {
              _offset -= _diff4;
            }

            arrowStyles.left = _offset;
          } else {
            arrowStyles[placement === 'right' ? 'left' : 'right'] = -arrowBox.width;

            var _diff5 = (referenceBox.height - nodeBox.height) / 2;

            var _offset2 = nodeBox.height / 2 - arrowBox.height;

            if (position === 'start') {
              _offset2 += _diff5;
            } else if (position === 'end') {
              _offset2 -= _diff5;
            }

            arrowStyles.top = Core.clamp(_offset2, 0, nodeBox.height);
          }

          dom.setStyle(this._settings.arrow, arrowStyles);
        }

        var style = {
          transform: 'translate3d(' + offsetX + 'px , ' + offsetY + 'px , 0)'
        };

        if (!this._settings.width) {
          dom.setStyle(this._node, 'width', '100%');
          style.width = Math.ceil(nodeBox.width);
        } else if (this._settings.width === 'reference') {
          style.width = Math.ceil(referenceBox.width);
        }

        dom.setStyle(this._wrapper, style);
      }
    }]);

    return Popper;
  }(); // Default Popper options


  Popper.defaults = {
    placement: 'bottom',
    position: 'center',
    fixed: false,
    spacing: 0,
    width: 'auto',
    zIndex: 1000
  };
  Popper._poppers = new Map();
  UI.Popper = Popper;
  Object.assign(Popper, {
    getPopperPlacement: function getPopperPlacement(nodeBox, spaceTop, spaceRight, spaceBottom, spaceLeft, placement, spacing) {
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
        var vLoss = Math.min(spaceTop, spaceBottom);
        var vSpace = Math.max(spaceTop, spaceBottom);
        var hSpace = Math.max(spaceRight, spaceLeft);

        if (hSpace > vSpace && hSpace > nodeBox.width + spacing && vLoss > nodeBox.height) {
          if (spaceLeft > spaceRight) {
            return 'left';
          }

          return 'right';
        }

        if (spaceBottom > spaceTop) {
          return 'bottom';
        }

        return 'top';
      }

      return placement;
    },
    getPopperPosition: function getPopperPosition(referenceBox, deltaX, deltaY, docWidth, docHeight, placement, position) {
      if (placement === 'top' || placement === 'bottom') {
        if (position === 'start') {
          if (referenceBox.right > docWidth) {
            if (referenceBox.right - deltaX < docWidth && referenceBox.left - deltaX > 0) {
              return 'end';
            }

            if (referenceBox.right - deltaX / 2 < docWidth && referenceBox.left - deltaX / 2 > 0) {
              return 'center';
            }
          }
        } else if (position === 'center') {
          if (referenceBox.left - deltaX / 2 < 0 || referenceBox.right - deltaX / 2 > docWidth) {
            if (referenceBox.right < docWidth && referenceBox.left > 0) {
              return 'start';
            }

            if (referenceBox.right - deltaX < docWidth && referenceBox.left - deltaX > 0) {
              return 'end';
            }
          }
        } else if (position === 'end') {
          if (referenceBox.left - deltaX < 0) {
            if (referenceBox.right < docWidth && referenceBox.left > 0) {
              return 'start';
            }

            if (referenceBox.right - deltaX / 2 < docWidth && referenceBox.left - deltaX / 2 > 0) {
              return 'center';
            }
          }
        }
      } else if (placement === 'left' || placement === 'right') {
        if (position === 'start') {
          if (referenceBox.bottom > docHeight) {
            if (referenceBox.bottom - deltaY < docHeight && referenceBox.top - deltaY > 0) {
              return 'end';
            }

            if (referenceBox.bottom - deltaY / 2 < docHeight && referenceBox.top - deltaY / 2 > 0) {
              return 'center';
            }
          }
        } else if (position === 'center') {
          if (referenceBox.top - deltaY / 2 < 0 || referenceBox.bottom - deltaY / 2 > docHeight) {
            if (referenceBox.bottom < docHeight && referenceBox.top > 0) {
              return 'start';
            }

            if (referenceBox.bottom - deltaY < docHeight && referenceBox.top - deltaY > 0) {
              return 'end';
            }
          }
        } else if (position === 'end') {
          if (referenceBox.top - deltaY < 0) {
            if (referenceBox.bottom < docHeight && referenceBox.top > 0) {
              return 'start';
            }

            if (referenceBox.bottom - deltaY / 2 < docHeight && referenceBox.top - deltaY / 2 > 0) {
              return 'center';
            }
          }
        }
      }

      return position;
    },
    run: function run() {
      this._poppers.forEach(function (popper) {
        return popper.update();
      });

      if (this._poppers.size === 0) {
        dom.removeEvent(window, 'resize.frost.popper scroll.frost.popper');
        this._running = false;
      }
    },
    start: function start() {
      if (this._running) {
        return;
      }

      this._running = true;
      dom.addEvent(window, 'resize.frost.popper scroll.frost.popper', Core.animation(function (_) {
        return Popper.run();
      }));
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
     * @returns {Tab} A new Tab object.
     */
    function Tab(node, settings) {
      _classCallCheck(this, Tab);

      this._node = node;
      this._settings = _objectSpread({}, Tab.defaults, dom.getDataset(this._node), settings);

      if (!this._settings.target) {
        this._settings.target = dom.getAttribute(this._node, 'href');
      }

      this._target = dom.find(this._settings.target);

      this._events();

      dom.setData(this._node, 'tab', this);
    }
    /**
     * Destroy the Tab.
     */


    _createClass(Tab, [{
      key: "destroy",
      value: function destroy() {
        dom.stop(this._target, true);
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
        var _this18 = this;

        return new Promise(function (resolve, reject) {
          if (_this18._animating || !DOM._triggerEvent(_this18._node, 'hide.frost.tab')) {
            return reject();
          }

          _this18._animating = true;
          dom.fadeOut(_this18._target, {
            duration: _this18._settings.duration
          }).then(function (_) {
            dom.removeClass(_this18._target, 'active');
            dom.removeClass(_this18._node, 'active');
            dom.triggerEvent(_this18._node, 'hidden.frost.tab');
            resolve();
          }).catch(function (_) {
            return reject();
          }).finally(function (_) {
            _this18._animating = false;
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
        var _this19 = this;

        return new Promise(function (resolve, reject) {
          var activeTab = dom.siblings(_this19._node, '.active').shift();

          if (_this19._animating || !activeTab || !dom.hasData(activeTab, 'tab')) {
            return reject();
          }

          _this19._animating = true;
          dom.getData(activeTab, 'tab').hide().then(function (_) {
            if (!DOM._triggerEvent(_this19._node, 'show.frost.tab')) {
              return reject();
            }

            dom.addClass(_this19._target, 'active');
            dom.addClass(_this19._node, 'active');
            return dom.fadeIn(_this19._target, {
              duration: _this19._settings.duration
            });
          }).then(function (_) {
            dom.triggerEvent(_this19._node, 'shown.frost.tab');
            resolve();
          }).catch(function (_) {
            return reject();
          }).finally(function (_) {
            _this19._animating = false;
          });
        });
      }
    }]);

    return Tab;
  }(); // Default Tab options


  Tab.defaults = {
    duration: 100
  }; // Auto-initialize Tab from data-toggle

  dom.addEvent(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="tab"]');
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = nodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var node = _step5.value;
        new Tab(node);
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  }); // Add Tab QuerySet method

  if (QuerySet) {
    QuerySet.prototype.tab = function (a) {
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

        var tab = dom.hasData(node, 'tab') ? dom.getData(node, 'tab') : new Tab(node, options);

        if (index || !method) {
          return;
        }

        result = tab[method].apply(tab, args);
      });
      return method ? result : this;
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
      var _this20 = this;

      this._clickEvent = function (e) {
        e.preventDefault();

        _this20.show();
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
     * @returns {Toast} A new Toast object.
     */
    function Toast(node, settings) {
      var _this21 = this;

      _classCallCheck(this, Toast);

      this._node = node;
      this._settings = _objectSpread({}, Toast.defaults, dom.getDataset(this._node), settings);
      this._visible = dom.isVisible(this._node);

      if (this._settings.autohide) {
        setTimeout(function (_) {
          try {
            _this21.hide();
          } catch (e) {}
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
        dom.stop(this._node, true);
        dom.removeData(this._node, 'toast');
      }
      /**
       * Hide the Toast.
       * @returns {Promise} A new Promise that resolves when the animation has completed.
       */

    }, {
      key: "hide",
      value: function hide() {
        var _this22 = this;

        return new Promise(function (resolve, reject) {
          if (_this22._animating || !_this22._visible || !DOM._triggerEvent(_this22._node, 'hide.frost.toast')) {
            return reject();
          }

          _this22._animating = true;
          return dom.fadeOut(_this22._node, {
            duration: _this22._settings.duration
          }).then(function (_) {
            _this22._visible = false;
            dom.hide(_this22._node);
            dom.triggerEvent(_this22._node, 'hidden.frost.toast');
            resolve();
          }).catch(function (_) {
            return reject();
          }).finally(function (_) {
            _this22._animating = false;
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
        var _this23 = this;

        return new Promise(function (resolve, reject) {
          if (_this23._animating || _this23._visible || !DOM._triggerEvent(_this23._node, 'show.frost.toast')) {
            return reject();
          }

          _this23._animating = true;
          _this23._visible = true;
          dom.show(_this23._node);
          return dom.fadeIn(_this23._node, {
            duration: _this23._settings.duration
          }).then(function (_) {
            dom.triggerEvent(_this23._node, 'shown.frost.toast');
            resolve();
          }).catch(function (_) {
            return reject();
          }).finally(function (_) {
            _this23._animating = false;
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

  dom.addEvent(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="toast"]');
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = nodes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var node = _step6.value;
        new Toast(node);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  }); // Hide Toast from data-dismiss

  dom.addEventDelegate(document, 'click', '[data-dismiss="toast"]', function (e) {
    e.preventDefault();
    var element = dom.closest(e.currentTarget, '.toast');
    var toast = dom.hasData(element, 'toast') ? dom.getData(element, 'toast') : new Toast(element);
    toast.hide();
  }); // Add Toast QuerySet method

  if (QuerySet) {
    QuerySet.prototype.toast = function (a) {
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

        var toast = dom.hasData(node, 'toast') ? dom.getData(node, 'toast') : new Toast(node, options);

        if (index || !method) {
          return;
        }

        result = toast[method].apply(toast, args);
      });
      return method ? result : this;
    };
  }

  UI.Toast = Toast;
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
     * @returns {Tooltip} A new Tooltip object.
     */
    function Tooltip(node, settings) {
      _classCallCheck(this, Tooltip);

      this._node = node;
      this._settings = _objectSpread({}, Tooltip.defaults, dom.getDataset(this._node), settings);

      if (this._settings.container) {
        this._container = dom.findOne(this._settings.container);
      }

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
        var _this24 = this;

        return new Promise(function (resolve, reject) {
          if (!_this24._tooltip || !DOM._triggerEvent(_this24._node, 'hide.frost.tooltip')) {
            return reject();
          }

          dom.fadeOut(_this24._tooltip, {
            duration: _this24._settings.duration
          }).then(function (_) {
            _this24._popper.destroy();

            dom.remove(_this24._tooltip);
            _this24._tooltip = null;
            _this24._popper = null;
            dom.triggerEvent(_this24._node, 'hidden.frost.tooltip');
            resolve();
          }).catch(function (_) {
            return reject();
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
        var _this25 = this;

        return new Promise(function (resolve, reject) {
          if (_this25._tooltip || !DOM._triggerEvent(_this25._node, 'show.frost.tooltip')) {
            return reject();
          }

          _this25._render();

          dom.addClass(_this25._tooltip, 'show');
          dom.fadeIn(_this25._tooltip, {
            duration: _this25._settings.duration
          }).then(function (_) {
            dom.triggerEvent(_this25._node, 'shown.frost.tooltip');
            resolve();
          }).catch(function (_) {
            return reject();
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
    delay: 0,
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
    width: false,
    zIndex: 1000
  }; // Auto-initialize Tooltip from data-toggle

  dom.addEvent(window, 'load', function (_) {
    var nodes = dom.find('[data-toggle="tooltip"]');
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = nodes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var node = _step7.value;
        new Tooltip(node);
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
          _iterator7.return();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }
  }); // Add Tooltip QuerySet method

  if (QuerySet) {
    QuerySet.prototype.tooltip = function (a) {
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

        var tooltip = dom.hasData(node, 'tooltip') ? dom.getData(node, 'tooltip') : new Tooltip(node, options);

        if (index || !method) {
          return;
        }

        result = tooltip[method].apply(tooltip, args);
      });
      return method ? result : this;
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
      var _this26 = this;

      this._hideEvent = function (_) {
        if (!_this26._enabled) {
          return;
        }

        try {
          _this26.hide();
        } catch (e) {}
      };

      this._hoverEvent = function (_) {
        if (!_this26._enabled) {
          return;
        }

        try {
          _this26.show();

          dom.addEventOnce(_this26._node, 'mouseout.frost.tooltip', _this26._hideEvent);
        } catch (e) {}
      };

      this._focusEvent = function (_) {
        if (!_this26._enabled) {
          return;
        }

        try {
          _this26.show();

          dom.addEventOnce(_this26._node, 'blur.frost.tooltip', _this26._hideEvent);
        } catch (e) {}
      };

      this._clickEvent = function (e) {
        e.preventDefault();

        if (!_this26._enabled) {
          return;
        }

        try {
          _this26.toggle();
        } catch (e) {}
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
        class: this._settings.classes.tooltip,
        attributes: {
          role: 'tooltip'
        }
      });
      var arrow = dom.create('div', {
        class: this._settings.classes.arrow
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

      this._popper = new Popper(this._tooltip, this._node, {
        arrow: arrow,
        placement: this._settings.placement,
        position: this._settings.position,
        fixed: this._settings.fixed,
        spacing: this._settings.spacing,
        width: this._settings.width,
        zIndex: this._settings.zIndex
      });
    }
  });
  return {
    UI: UI
  };
});