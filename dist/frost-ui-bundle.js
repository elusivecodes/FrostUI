(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.UI = {}));
})(this, (function (exports) { 'use strict';

    /**
     * Testing methods
     */

    const ELEMENT_NODE = 1;
    const TEXT_NODE = 3;
    const COMMENT_NODE = 8;
    const DOCUMENT_NODE = 9;
    const DOCUMENT_FRAGMENT_NODE = 11;

    /**
     * Returns true if the value is an array.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is an array, otherwise FALSE.
     */
    const isArray = Array.isArray;

    /**
     * Returns true if the value is array-like.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is array-like, otherwise FALSE.
     */
    const isArrayLike = (value) =>
        isArray(value) ||
        (
            isObject(value) &&
            !isFunction(value) &&
            !isWindow(value) &&
            !isElement(value) &&
            (
                (
                    Symbol.iterator in value &&
                    isFunction(value[Symbol.iterator])
                ) ||
                (
                    'length' in value &&
                    isNumeric(value.length) &&
                    (
                        !value.length ||
                        value.length - 1 in value
                    )
                )
            )
        );

    /**
     * Returns true if the value is a Boolean.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is boolean, otherwise FALSE.
     */
    const isBoolean = (value) =>
        value === !!value;

    /**
     * Returns true if the value is a Document.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a Document, otherwise FALSE.
     */
    const isDocument = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_NODE;

    /**
     * Returns true if the value is a HTMLElement.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
     */
    const isElement = (value) =>
        !!value &&
        value.nodeType === ELEMENT_NODE;

    /**
     * Returns true if the value is a DocumentFragment.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a DocumentFragment, otherwise FALSE.
     */
    const isFragment = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_FRAGMENT_NODE &&
        !value.host;

    /**
     * Returns true if the value is a function.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a function, otherwise FALSE.
     */
    const isFunction = (value) =>
        typeof value === 'function';

    /**
     * Returns true if the value is NaN.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is NaN, otherwise FALSE.
     */
    const isNaN = Number.isNaN;

    /**
     * Returns true if the value is a Node.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a Node, otherwise FALSE.
     */
    const isNode = (value) =>
        !!value &&
        (
            value.nodeType === ELEMENT_NODE ||
            value.nodeType === TEXT_NODE ||
            value.nodeType === COMMENT_NODE
        );

    /**
     * Returns true if the value is null.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is null, otherwise FALSE.
     */
    const isNull = (value) =>
        value === null;

    /**
     * Returns true if the value is numeric.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is numeric, otherwise FALSE.
     */
    const isNumeric = (value) =>
        !isNaN(parseFloat(value)) &&
        isFinite(value);

    /**
     * Returns true if the value is an object.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is an object, otherwise FALSE.
     */
    const isObject = (value) =>
        !!value &&
        value === Object(value);

    /**
     * Returns true if the value is a plain object.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a plain object, otherwise FALSE.
     */
    const isPlainObject = (value) =>
        !!value &&
        value.constructor === Object;

    /**
     * Returns true if the value is a ShadowRoot.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a ShadowRoot, otherwise FALSE.
     */
    const isShadow = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_FRAGMENT_NODE &&
        !!value.host;

    /**
     * Returns true if the value is a string.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE is the value is a string, otherwise FALSE.
     */
    const isString = (value) =>
        value === `${value}`;

    /**
     * Returns true if the value is a text Node.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a text Node, otherwise FALSE.
     */
    const isText = (value) =>
        !!value &&
        value.nodeType === TEXT_NODE;

    /**
     * Returns true if the value is undefined.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is undefined, otherwise FALSE.
     */
    const isUndefined = (value) =>
        value === undefined;

    /**
     * Returns true if the value is a Window.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE is the value is a Window, otherwise FALSE.
     */
    const isWindow = (value) =>
        !!value &&
        !!value.document &&
        value.document.defaultView === value;

    /**
     * Math methods
     */

    /**
     * Clamp a value between a min and max.
     * @param {number} value The value to clamp.
     * @param {number} [min=0] The minimum value of the clamped range.
     * @param {number} [max=1] The maximum value of the clamped range.
     * @return {number} The clamped value.
     */
    const clamp = (value, min = 0, max = 1) =>
        Math.max(
            min,
            Math.min(
                max,
                value,
            ),
        );

    /**
     * Clamp a value between 0 and 100.
     * @param {number} value The value to clamp.
     * @return {number} The clamped value.
     */
    const clampPercent = (value) =>
        clamp(value, 0, 100);

    /**
     * Get the distance between two vectors.
     * @param {number} x1 The first vector X co-ordinate.
     * @param {number} y1 The first vector Y co-ordinate.
     * @param {number} x2 The second vector X co-ordinate.
     * @param {number} y2 The second vector Y co-ordinate.
     * @return {number} The distance between the vectors.
     */
    const dist = (x1, y1, x2, y2) =>
        len(
            x1 - x2,
            y1 - y2,
        );

    /**
     * Inverse linear interpolation from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} value The value to inverse interpolate.
     * @return {number} The interpolated amount.
     */
    const inverseLerp = (v1, v2, value) =>
        (value - v1) / (v2 - v1);

    /**
     * Get the length of an X,Y vector.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @returns {number} The length of the vector.
     */
    const len = Math.hypot;

    /**
     * Linear interpolation from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} amount The amount to interpolate.
     * @return {number} The interpolated value.
     */
    const lerp = (v1, v2, amount) =>
        v1 *
        (1 - amount) +
        v2 *
        amount;

    /**
     * Map a value from one range to another.
     * @param {number} value The value to map.
     * @param {number} fromMin The minimum value of the current range.
     * @param {number} fromMax The maximum value of the current range.
     * @param {number} toMin The minimum value of the target range.
     * @param {number} toMax The maximum value of the target range.
     * @return {number} The mapped value.
     */
    const map = (value, fromMin, fromMax, toMin, toMax) =>
        (value - fromMin) *
        (toMax - toMin) /
        (fromMax - fromMin) +
        toMin;

    /**
     * Return a random floating-point number.
     * @param {number} [a=1] The minimum value (inclusive).
     * @param {number} [b] The maximum value (exclusive).
     * @return {number} A random number.
     */
    const random = (a = 1, b = null) =>
        isNull(b) ?
            Math.random() * a :
            map(
                Math.random(),
                0,
                1,
                a,
                b,
            );

    /**
     * Return a random number.
     * @param {number} [a=1] The minimum value (inclusive).
     * @param {number} [b] The maximum value (exclusive).
     * @return {number} A random number.
     */
    const randomInt = (a = 1, b = null) =>
        random(a, b) | 0;

    /**
     * Constrain a number to a specified step-size.
     * @param {number} value The value to constrain.
     * @param {number} step The minimum step-size.
     * @return {number} The constrained value.
     */
    const toStep = (value, step = 0.01) =>
        parseFloat(
            (
                Math.round(value / step) *
                step
            ).toFixed(
                `${step}`.replace(/\d*\.?/, '').length,
            ),
        );

    /**
     * Array methods
     */

    /**
     * Create a new array containing the values of the first array, that do not exist in any of the additional passed arrays.
     * @param {array} array The input array.
     * @param {...array} arrays The arrays to compare against.
     * @return {array} The output array.
     */
    const diff = (array, ...arrays) => {
        arrays = arrays.map(unique);
        return array.filter(
            (value) => !arrays
                .some((other) => other.includes(value)),
        );
    };

    /**
     * Create a new array containing the unique values that exist in all of the passed arrays.
     * @param {...array} arrays The input arrays.
     * @return {array} The output array.
     */
    const intersect = (...arrays) =>
        unique(
            arrays
                .reduce(
                    (acc, array, index) => {
                        array = unique(array);
                        return merge(
                            acc,
                            array.filter(
                                (value) =>
                                    arrays.every(
                                        (other, otherIndex) =>
                                            index == otherIndex ||
                                            other.includes(value),
                                    ),
                            ),
                        );
                    },
                    [],
                ),
        );

    /**
     * Merge the values from one or more arrays or array-like objects onto an array.
     * @param {array} array The input array.
     * @param {...array|object} arrays The arrays or array-like objects to merge.
     * @return {array} The output array.
     */
    const merge = (array = [], ...arrays) =>
        arrays.reduce(
            (acc, other) => {
                Array.prototype.push.apply(acc, other);
                return array;
            },
            array,
        );

    /**
     * Return a random value from an array.
     * @param {array} array The input array.
     * @return {*} A random value from the array, or null if it is empty.
     */
    const randomValue = (array) =>
        array.length ?
            array[randomInt(array.length)] :
            null;

    /**
     * Return an array containing a range of values.
     * @param {number} start The first value of the sequence.
     * @param {number} end The value to end the sequence on.
     * @param {number} [step=1] The increment between values in the sequence.
     * @return {number[]} The array of values from start to end.
     */
    const range = (start, end, step = 1) => {
        const sign = Math.sign(end - start);
        return new Array(
            (
                (
                    Math.abs(end - start) /
                    step
                ) +
                1
            ) | 0,
        )
            .fill()
            .map(
                (_, i) =>
                    start + toStep(
                        (i * step * sign),
                        step,
                    ),
            );
    };

    /**
     * Remove duplicate elements in an array.
     * @param {array} array The input array.
     * @return {array} The filtered array.
     */
    const unique = (array) =>
        Array.from(
            new Set(array),
        );

    /**
     * Create an array from any value.
     * @param {*} value The input value.
     * @return {array} The wrapped array.
     */
    const wrap$2 = (value) =>
        isUndefined(value) ?
            [] :
            (
                isArray(value) ?
                    value :
                    (
                        isArrayLike(value) ?
                            merge([], value) :
                            [value]
                    )
            );

    /**
     * Function methods
     */

    const isBrowser = typeof window !== 'undefined' && 'requestAnimationFrame' in window;

    /**
     * Execute a callback on the next animation frame
     * @param {function} callback Callback function to execute.
     * @return {number} The request ID.
     */
    const _requestAnimationFrame = isBrowser ?
        (...args) => window.requestAnimationFrame(...args) :
        (callback) => setTimeout(callback, 1000 / 60);

    /**
     * Create a wrapped version of a function that executes at most once per animation frame
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {object} [options] The options for executing the function.
     * @param {Boolean} [options.leading=false] Whether to execute on the leading edge of the animation frame.
     * @return {function} The wrapped function.
     */
    const animation = (callback, { leading = false } = {}) => {
        let animationReference;
        let newArgs;
        let running;

        const animation = (...args) => {
            newArgs = args;

            if (running) {
                return;
            }

            if (leading) {
                callback(...newArgs);
            }

            running = true;
            animationReference = _requestAnimationFrame((_) => {
                if (!leading) {
                    callback(...newArgs);
                }

                running = false;
                animationReference = null;
            });
        };

        animation.cancel = (_) => {
            if (!animationReference) {
                return;
            }

            if (isBrowser) {
                global.cancelAnimationFrame(animationReference);
            } else {
                clearTimeout(animationReference);
            }

            running = false;
            animationReference = null;
        };

        return animation;
    };

    /**
     * Create a wrapped function that will execute each callback in reverse order,
     * passing the result from each function to the previous.
     * @param {...function} callbacks Callback functions to execute.
     * @return {function} The wrapped function.
     */
    const compose = (...callbacks) =>
        (arg) =>
            callbacks.reduceRight(
                (acc, callback) =>
                    callback(acc),
                arg,
            );

    /**
     * Create a wrapped version of a function, that will return new functions
     * until the number of total arguments passed reaches the arguments length
     * of the original function (at which point the function will execute).
     * @param {function} callback Callback function to execute.
     * @return {function} The wrapped function.
     */
    const curry = (callback) => {
        const curried = (...args) =>
            args.length >= callback.length ?
                callback(...args) :
                (...newArgs) =>
                    curried(
                        ...args.concat(newArgs),
                    );

        return curried;
    };

    /**
     * Create a wrapped version of a function that executes once per wait period
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {number} [wait=0] The number of milliseconds to wait until next execution.
     * @param {object} [options] The options for executing the function.
     * @param {Boolean} [options.leading=false] Whether to execute on the leading edge of the wait period.
     * @param {Boolean} [options.trailing=true] Whether to execute on the trailing edge of the wait period.
     * @return {function} The wrapped function.
     */
    const debounce$1 = (callback, wait = 0, { leading = false, trailing = true } = {}) => {
        let debounceReference;
        let lastRan;
        let newArgs;

        const debounced = (...args) => {
            const now = Date.now();
            const delta = lastRan ?
                now - lastRan :
                null;

            if (leading && (delta === null || delta >= wait)) {
                lastRan = now;
                callback(...args);
                return;
            }

            newArgs = args;
            if (!trailing) {
                return;
            }

            if (debounceReference) {
                clearTimeout(debounceReference);
            }

            debounceReference = setTimeout(
                (_) => {
                    lastRan = Date.now();
                    callback(...newArgs);

                    debounceReference = null;
                },
                wait,
            );
        };

        debounced.cancel = (_) => {
            if (!debounceReference) {
                return;
            }

            clearTimeout(debounceReference);

            debounceReference = null;
        };

        return debounced;
    };

    /**
     * Evaluate a value from a function or value.
     * @param {*} value The value to evaluate.
     * @return {*} The evaluated value.
     */
    const evaluate = (value) =>
        isFunction(value) ?
            value() :
            value;

    /**
     * Create a wrapped version of a function that will only ever execute once.
     * Subsequent calls to the wrapped function will return the result of the initial call.
     * @param {function} callback Callback function to execute.
     * @return {function} The wrapped function.
     */
    const once = (callback) => {
        let ran;
        let result;

        return (...args) => {
            if (ran) {
                return result;
            }

            ran = true;
            result = callback(...args);
            return result;
        };
    };

    /**
     * Create a wrapped version of a function with predefined arguments.
     * @param {function} callback Callback function to execute.
     * @param {...*} [defaultArgs] Default arguments to pass to the function.
     * @return {function} The wrapped function.
     */
    const partial = (callback, ...defaultArgs) =>
        (...args) =>
            callback(
                ...(defaultArgs
                    .slice()
                    .map((v) =>
                        isUndefined(v) ?
                            args.shift() :
                            v,
                    ).concat(args)
                ),
            );

    /**
     * Create a wrapped function that will execute each callback in order,
     * passing the result from each function to the next.
     * @param {...function} callbacks Callback functions to execute.
     * @return {function} The wrapped function.
     */
    const pipe = (...callbacks) =>
        (arg) =>
            callbacks.reduce(
                (acc, callback) =>
                    callback(acc),
                arg,
            );

    /**
     * Create a wrapped version of a function that executes at most once per wait period.
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {number} [wait=0] The number of milliseconds to wait until next execution.
     * @param {object} [options] The options for executing the function.
     * @param {Boolean} [options.leading=true] Whether to execute on the leading edge of the wait period.
     * @param {Boolean} [options.trailing=true] Whether to execute on the trailing edge of the wait period.
     * @return {function} The wrapped function.
     */
    const throttle = (callback, wait = 0, { leading = true, trailing = true } = {}) => {
        let throttleReference;
        let lastRan;
        let newArgs;
        let running;

        const throttled = (...args) => {
            const now = Date.now();
            const delta = lastRan ?
                now - lastRan :
                null;

            if (leading && (delta === null || delta >= wait)) {
                lastRan = now;
                callback(...args);
                return;
            }

            newArgs = args;
            if (running || !trailing) {
                return;
            }

            running = true;
            throttleReference = setTimeout(
                (_) => {
                    lastRan = Date.now();
                    callback(...newArgs);

                    running = false;
                    throttleReference = null;
                },
                delta === null ?
                    wait :
                    wait - delta,
            );
        };

        throttled.cancel = (_) => {
            if (!throttleReference) {
                return;
            }

            clearTimeout(throttleReference);

            running = false;
            throttleReference = null;
        };

        return throttled;
    };

    /**
     * Execute a function a specified number of times.
     * @param {function} callback Callback function to execute.
     * @param {number} amount The amount of times to execute the callback.
     */
    const times = (callback, amount) => {
        while (amount--) {
            if (callback() === false) {
                break;
            }
        }
    };

    /**
     * Object methods
     */

    /**
     * Merge the values from one or more objects onto an object (recursively).
     * @param {object} object The input object.
     * @param {...object} objects The objects to merge.
     * @return {object} The output objects.
     */
    const extend = (object, ...objects) =>
        objects.reduce(
            (acc, val) => {
                for (const k in val) {
                    if (isArray(val[k])) {
                        acc[k] = extend(
                            isArray(acc[k]) ?
                                acc[k] :
                                [],
                            val[k],
                        );
                    } else if (isPlainObject(val[k])) {
                        acc[k] = extend(
                            isPlainObject(acc[k]) ?
                                acc[k] :
                                {},
                            val[k],
                        );
                    } else {
                        acc[k] = val[k];
                    }
                }
                return acc;
            },
            object,
        );

    /**
     * Flatten an object using dot notation.
     * @param {object} object input The object.
     * @param {string} [prefix] The key prefix.
     * @return {object} The new object.
     */
    const flatten = (object, prefix = '') =>
        Object.keys(object).reduce((acc, key) => {
            const prefixedKey = `${prefix}${key}`;
            if (isPlainObject(object[key])) {
                Object.assign(acc, flatten(object[key], `${prefixedKey}.`));
            } else {
                acc[prefixedKey] = object[key];
            }

            return acc;
        }, {});

    /**
     * Remove a specified key from an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to remove from the object.
     */
    const forgetDot = (object, key) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (
                !isObject(object) ||
                !(key in object)
            ) {
                break;
            }

            if (keys.length) {
                object = object[key];
            } else {
                delete object[key];
            }
        }
    };

    /**
     * Retrieve the value of a specified key from an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to retrieve from the object.
     * @param {*} [defaultValue] The default value if key does not exist.
     * @return {*} The value retrieved from the object.
     */
    const getDot = (object, key, defaultValue) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (
                !isObject(object) ||
                !(key in object)
            ) {
                return defaultValue;
            }

            object = object[key];
        }

        return object;
    };

    /**
     * Returns true if a specified key exists in an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to test for in the object.
     * @return {Boolean} TRUE if the key exists, otherwise FALSE.
     */
    const hasDot = (object, key) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (
                !isObject(object) ||
                !(key in object)
            ) {
                return false;
            }

            object = object[key];
        }

        return true;
    };

    /**
     * Retrieve values of a specified key from an array of objects using dot notation.
     * @param {object[]} objects The input objects.
     * @param {string} key The key to retrieve from the objects.
     * @param {*} [defaultValue] The default value if key does not exist.
     * @return {array} An array of values retrieved from the objects.
     */
    const pluckDot = (objects, key, defaultValue) =>
        objects
            .map((pointer) =>
                getDot(pointer, key, defaultValue),
            );

    /**
     * Set a specified value of a key for an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to set in the object.
     * @param {*} value The value to set.
     * @param {object} [options] The options for setting the value.
     * @param {Boolean} [options.overwrite=true] Whether to overwrite, if the key already exists.
     */
    const setDot = (object, key, value, { overwrite = true } = {}) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (key === '*') {
                for (const k in object) {
                    if (!{}.hasOwnProperty.call(object, k)) {
                        continue;
                    }

                    setDot(
                        object,
                        [k].concat(keys).join('.'),
                        value,
                        overwrite,
                    );
                }
                return;
            }

            if (keys.length) {
                if (
                    !isObject(object[key]) ||
                    !(key in object)
                ) {
                    object[key] = {};
                }

                object = object[key];
            } else if (
                overwrite ||
                !(key in object)
            ) {
                object[key] = value;
            }
        }
    };

    // HTML escape characters
    const escapeChars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&apos;',
    };

    const unescapeChars = {
        amp: '&',
        lt: '<',
        gt: '>',
        quot: '"',
        apos: '\'',
    };

    /**
     * String methods
     */

    /**
     * Split a string into individual words.
     * @param {string} string The input string.
     * @return {string[]} The split parts of the string.
     */
    const _splitString = (string) =>
        `${string}`
            .split(/[^a-zA-Z0-9']|(?=[A-Z])/)
            .reduce(
                (acc, word) => {
                    word = word.replace(/[^\w]/, '').toLowerCase();
                    if (word) {
                        acc.push(word);
                    }
                    return acc;
                },
                [],
            );

    /**
     * Convert a string to camelCase.
     * @param {string} string The input string.
     * @return {string} The camelCased string.
     */
    const camelCase = (string) =>
        _splitString(string)
            .map(
                (word, index) =>
                    index ?
                        capitalize(word) :
                        word,
            )
            .join('');

    /**
     * Convert the first character of string to upper case and the remaining to lower case.
     * @param {string} string The input string.
     * @return {string} The capitalized string.
     */
    const capitalize = (string) =>
        string.charAt(0).toUpperCase() +
        string.substring(1).toLowerCase();

    /**
     * Convert HTML special characters in a string to their corresponding HTML entities.
     * @param {string} string The input string.
     * @return {string} The escaped string.
     */
    const escape = (string) =>
        string.replace(
            /[&<>"']/g,
            (match) =>
                escapeChars[match],
        );

    /**
     * Escape RegExp special characters in a string.
     * @param {string} string The input string.
     * @return {string} The escaped string.
     */
    const escapeRegExp = (string) =>
        string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

    /**
     * Convert a string to a humanized form.
     * @param {string} string The input string.
     * @return {string} The humanized string.
     */
    const humanize = (string) =>
        capitalize(
            _splitString(string)
                .join(' '),
        );

    /**
     * Convert a string to kebab-case.
     * @param {string} string The input string.
     * @return {string} The kebab-cased string.
     */
    const kebabCase = (string) =>
        _splitString(string)
            .join('-')
            .toLowerCase();

    /**
     * Convert a string to PascalCase.
     * @param {string} string The input string.
     * @return {string} The camelCased string.
     */
    const pascalCase = (string) =>
        _splitString(string)
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() +
                    word.substring(1),
            )
            .join('');

    /**
     * Return a random string.
     * @param {number} [length=16] The length of the output string.
     * @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789] The characters to generate the string from.
     * @return {string} The random string.
     */
    const randomString = (length = 16, chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789') =>
        new Array(length)
            .fill()
            .map(
                (_) =>
                    chars[random(chars.length) | 0],
            )
            .join('');

    /**
     * Convert a string to snake_case.
     * @param {string} string The input string.
     * @return {string} The snake_cased string.
     */
    const snakeCase = (string) =>
        _splitString(string)
            .join('_')
            .toLowerCase();

    /**
     * Convert HTML entities in a string to their corresponding characters.
     * @param {string} string The input string.
     * @return {string} The unescaped string.
     */
    const unescape = (string) =>
        string.replace(
            /&(amp|lt|gt|quot|apos);/g,
            (_, code) =>
                unescapeChars[code],
        );

    var _ = /*#__PURE__*/Object.freeze({
        __proto__: null,
        animation: animation,
        camelCase: camelCase,
        capitalize: capitalize,
        clamp: clamp,
        clampPercent: clampPercent,
        compose: compose,
        curry: curry,
        debounce: debounce$1,
        diff: diff,
        dist: dist,
        escape: escape,
        escapeRegExp: escapeRegExp,
        evaluate: evaluate,
        extend: extend,
        flatten: flatten,
        forgetDot: forgetDot,
        getDot: getDot,
        hasDot: hasDot,
        humanize: humanize,
        intersect: intersect,
        inverseLerp: inverseLerp,
        isArray: isArray,
        isArrayLike: isArrayLike,
        isBoolean: isBoolean,
        isDocument: isDocument,
        isElement: isElement,
        isFragment: isFragment,
        isFunction: isFunction,
        isNaN: isNaN,
        isNode: isNode,
        isNull: isNull,
        isNumeric: isNumeric,
        isObject: isObject,
        isPlainObject: isPlainObject,
        isShadow: isShadow,
        isString: isString,
        isText: isText,
        isUndefined: isUndefined,
        isWindow: isWindow,
        kebabCase: kebabCase,
        len: len,
        lerp: lerp,
        map: map,
        merge: merge,
        once: once,
        partial: partial,
        pascalCase: pascalCase,
        pipe: pipe,
        pluckDot: pluckDot,
        random: random,
        randomInt: randomInt,
        randomString: randomString,
        randomValue: randomValue,
        range: range,
        setDot: setDot,
        snakeCase: snakeCase,
        throttle: throttle,
        times: times,
        toStep: toStep,
        unescape: unescape,
        unique: unique,
        wrap: wrap$2
    });

    /**
     * DOM Config
     */

    const ajaxDefaults = {
        afterSend: null,
        beforeSend: null,
        cache: true,
        contentType: 'application/x-www-form-urlencoded',
        data: null,
        headers: {},
        isLocal: null,
        method: 'GET',
        onProgress: null,
        onUploadProgress: null,
        processData: true,
        rejectOnCancel: true,
        responseType: null,
        url: null,
        xhr: (_) => new XMLHttpRequest,
    };

    const animationDefaults = {
        duration: 1000,
        type: 'ease-in-out',
        infinite: false,
        debug: false,
    };

    const config = {
        ajaxDefaults,
        animationDefaults,
        context: null,
        useTimeout: false,
        window: null,
    };

    /**
     * Get the AJAX defaults.
     * @return {object} The AJAX defaults.
     */
    function getAjaxDefaults() {
        return ajaxDefaults;
    }
    /**
     * Get the animation defaults.
     * @return {object} The animation defaults.
     */
    function getAnimationDefaults() {
        return animationDefaults;
    }
    /**
     * Get the document context.
     * @return {Document} The document context.
     */
    function getContext() {
        return config.context;
    }
    /**
     * Get the window.
     * @return {Window} The window.
     */
    function getWindow() {
        return config.window;
    }
    /**
     * Set the AJAX defaults.
     * @param {object} options The ajax default options.
     */
    function setAjaxDefaults(options) {
        extend(ajaxDefaults, options);
    }
    /**
     * Set the animation defaults.
     * @param {object} options The animation default options.
     */
    function setAnimationDefaults(options) {
        extend(animationDefaults, options);
    }
    /**
     * Set the document context.
     * @param {Document} context The document context.
     */
    function setContext(context) {
        if (!isDocument(context)) {
            throw new Error('FrostDOM requires a valid Document.');
        }

        config.context = context;
    }
    /**
     * Set the window.
     * @param {Window} window The window.
     */
    function setWindow(window) {
        if (!isWindow(window)) {
            throw new Error('FrostDOM requires a valid Window.');
        }

        config.window = window;
    }
    /**
     * Set whether animations should use setTimeout.
     * @param {Boolean} [enable=true] Whether animations should use setTimeout.
     */
    function useTimeout(enable = true) {
        config.useTimeout = enable;
    }

    /**
     * DOM Helpers
     */

    /**
     * Create a wrapped version of a function that executes once per tick.
     * @param {function} callback Callback function to debounce.
     * @return {function} The wrapped function.
     */
    function debounce(callback) {
        let running;

        return (...args) => {
            if (running) {
                return;
            }

            running = true;

            Promise.resolve().then((_) => {
                callback(...args);
                running = false;
            });
        };
    }
    /**
     * Return a RegExp for testing a namespaced event.
     * @param {string} event The namespaced event.
     * @return {RegExp} The namespaced event RegExp.
     */
    function eventNamespacedRegExp(event) {
        return new RegExp(`^${escapeRegExp(event)}(?:\\.|$)`, 'i');
    }
    /**
     * Return a single dimensional array of classes (from a multi-dimensional array or space-separated strings).
     * @param {array} classList The classes to parse.
     * @return {string[]} The parsed classes.
     */
    function parseClasses(classList) {
        return classList
            .flat()
            .flatMap((val) => val.split(' '))
            .filter((val) => !!val);
    }
    /**
     * Return a data object from a key and value, or a data object.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     * @param {object} [options] The options for parsing data.
     * @param {Boolean} [options.json=false] Whether to JSON encode the values.
     * @return {object} The data object.
     */
    function parseData(key, value, { json = false } = {}) {
        const result = isString(key) ?
            { [key]: value } :
            key;

        if (!json) {
            return result;
        }

        return Object.fromEntries(
            Object.entries(result)
                .map(([key, value]) => [key, isObject(value) || isArray(value) ? JSON.stringify(value) : value]),
        );
    }
    /**
     * Return a JS primitive from a dataset string.
     * @param {string} value The input value.
     * @return {*} The parsed value.
     */
    function parseDataset(value) {
        if (isUndefined(value)) {
            return value;
        }

        const lower = value.toLowerCase().trim();

        if (['true', 'on'].includes(lower)) {
            return true;
        }

        if (['false', 'off'].includes(lower)) {
            return false;
        }

        if (lower === 'null') {
            return null;
        }

        if (isNumeric(lower)) {
            return parseFloat(lower);
        }

        if (['{', '['].includes(lower.charAt(0))) {
            try {
                const result = JSON.parse(value);
                return result;
            } catch (e) { }
        }

        return value;
    }
    /**
     * Return a "real" event from a namespaced event.
     * @param {string} event The namespaced event.
     * @return {string} The real event.
     */
    function parseEvent(event) {
        return event.split('.')
            .shift();
    }
    /**
     * Return an array of events from a space-separated string.
     * @param {string} events The events.
     * @return {array} The parsed events.
     */
    function parseEvents(events) {
        return events.split(' ');
    }

    /**
     * DOM Variables
     */

    const CONTENT_BOX = 0;
    const PADDING_BOX = 1;
    const BORDER_BOX = 2;
    const MARGIN_BOX = 3;
    const SCROLL_BOX = 4;

    const allowedTags = {
        '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
        'a': ['target', 'href', 'title', 'rel'],
        'area': [],
        'b': [],
        'br': [],
        'col': [],
        'code': [],
        'div': [],
        'em': [],
        'hr': [],
        'h1': [],
        'h2': [],
        'h3': [],
        'h4': [],
        'h5': [],
        'h6': [],
        'i': [],
        'img': ['src', 'alt', 'title', 'width', 'height'],
        'li': [],
        'ol': [],
        'p': [],
        'pre': [],
        's': [],
        'small': [],
        'span': [],
        'sub': [],
        'sup': [],
        'strong': [],
        'u': [],
        'ul': [],
    };

    const eventLookup = {
        mousedown: ['mousemove', 'mouseup'],
        touchstart: ['touchmove', 'touchend'],
    };

    const animations = new Map();

    const data = new WeakMap();

    const events = new WeakMap();

    const queues = new WeakMap();

    const styles = new WeakMap();

    /**
     * Ajax Helpers
     */

    /**
     * Append a query string to a URL.
     * @param {string} url The input URL.
     * @param {string} key The query string key.
     * @param {string} value The query string value.
     * @return {string} The new URL.
     */
    function appendQueryString(url, key, value) {
        const searchParams = getSearchParams(url);

        searchParams.append(key, value);

        return setSearchParams(url, searchParams);
    }
    /**
     * Get the URLSearchParams from a URL string.
     * @param {string} url The URL.
     * @return {URLSearchParams} The URLSearchParams.
     */
    function getSearchParams(url) {
        return getURL(url).searchParams;
    }
    /**
     * Get the URL from a URL string.
     * @param {string} url The URL.
     * @return {URL} The URL.
     */
    function getURL(url) {
        const window = getWindow();
        const baseHref = (window.location.origin + window.location.pathname).replace(/\/$/, '');

        return new URL(url, baseHref);
    }
    /**
     * Return a FormData object from an array or object.
     * @param {array|object} data The input data.
     * @return {FormData} The FormData object.
     */
    function parseFormData(data) {
        const values = parseValues(data);

        const formData = new FormData;

        for (const [key, value] of values) {
            if (key.substring(key.length - 2) === '[]') {
                formData.append(key, value);
            } else {
                formData.set(key, value);
            }
        }

        return formData;
    }
    /**
     * Return a URI-encoded attribute string from an array or object.
     * @param {array|object} data The input data.
     * @return {string} The URI-encoded attribute string.
     */
    function parseParams(data) {
        const values = parseValues(data);

        const paramString = values
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        return encodeURI(paramString);
    }
    /**
     * Return an attributes array, or a flat array of attributes from a key and value.
     * @param {string} key The input key.
     * @param {array|object|string} [value] The input value.
     * @return {array} The parsed attributes.
     */
    function parseValue(key, value) {
        if (value === null || isUndefined(value)) {
            return [];
        }

        if (isArray(value)) {
            if (key.substring(key.length - 2) !== '[]') {
                key += '[]';
            }

            return value.flatMap((val) => parseValue(key, val));
        }

        if (isObject(value)) {
            return Object.entries(value)
                .flatMap(([subKey, val]) => parseValue(`${key}[${subKey}]`, val));
        }

        return [[key, value]];
    }
    /**
     * Return an attributes array from a data array or data object.
     * @param {array|object} data The input data.
     * @return {array} The parsed attributes.
     */
    function parseValues(data) {
        if (isArray(data)) {
            return data.flatMap((value) => parseValue(value.name, value.value));
        }

        if (isObject(data)) {
            return Object.entries(data)
                .flatMap(([key, value]) => parseValue(key, value));
        }

        return data;
    }
    /**
     * Set the URLSearchParams for a URL string.
     * @param {string} url The URL.
     * @param {URLSearchParams} searchParams The URLSearchParams.
     * @return {string} The new URL string.
     */
    function setSearchParams(url, searchParams) {
        const urlData = getURL(url);

        urlData.search = searchParams.toString();

        const newUrl = urlData.toString();

        const pos = newUrl.indexOf(url);
        return newUrl.substring(pos);
    }

    /**
     * AjaxRequest Class
     * @class
     */
    class AjaxRequest {
        /**
         * New AjaxRequest constructor.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.url=window.location] The URL of the request.
         * @param {string} [options.method=GET] The HTTP method of the request.
         * @param {Boolean|string|array|object|FormData} [options.data=null] The data to send with the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {string} [options.mimeType] The MIME type to use.
         * @param {string} [options.username] The username to authenticate with.
         * @param {string} [options.password] The password to authenticate with.
         * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
         * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
         */
        constructor(options) {
            this._options = extend(
                {},
                getAjaxDefaults(),
                options,
            );

            if (!this._options.url) {
                this._options.url = getWindow().location.href;
            }

            if (!this._options.cache) {
                this._options.url = appendQueryString(this._options.url, '_', Date.now());
            }

            if (!('Content-Type' in this._options.headers) && this._options.contentType) {
                this._options.headers['Content-Type'] = this._options.contentType;
            }

            if (this._options.isLocal === null) {
                this._options.isLocal = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(location.protocol);
            }

            if (!this._options.isLocal && !('X-Requested-With' in this._options.headers)) {
                this._options.headers['X-Requested-With'] = 'XMLHttpRequest';
            }

            this._promise = new Promise((resolve, reject) => {
                this._resolve = (value) => {
                    this._isResolved = true;
                    resolve(value);
                };

                this._reject = (error) => {
                    this._isRejected = true;
                    reject(error);
                };
            });

            this.xhr = this._options.xhr();

            if (this._options.data) {
                if (this._options.processData && isObject(this._options.data)) {
                    if (this._options.contentType === 'application/json') {
                        this._options.data = JSON.stringify(this._options.data);
                    } else if (this._options.contentType === 'application/x-www-form-urlencoded') {
                        this._options.data = parseParams(this._options.data);
                    } else {
                        this._options.data = parseFormData(this._options.data);
                    }
                }

                if (this._options.method === 'GET') {
                    const dataParams = new URLSearchParams(this._options.data);

                    const searchParams = getSearchParams(this._options.url);
                    for (const [key, value] of dataParams.entries()) {
                        searchParams.append(key, value);
                    }

                    this._options.url = setSearchParams(this._options.url, searchParams);
                    this._options.data = null;
                }
            }

            this.xhr.open(this._options.method, this._options.url, true, this._options.username, this._options.password);

            for (const [key, value] of Object.entries(this._options.headers)) {
                this.xhr.setRequestHeader(key, value);
            }

            if (this._options.responseType) {
                this.xhr.responseType = this._options.responseType;
            }

            if (this._options.mimeType) {
                this.xhr.overrideMimeType(this._options.mimeType);
            }

            if (this._options.timeout) {
                this.xhr.timeout = this._options.timeout;
            }

            this.xhr.onload = (e) => {
                if (this.xhr.status > 400) {
                    this._reject({
                        status: this.xhr.status,
                        xhr: this.xhr,
                        event: e,
                    });
                } else {
                    this._resolve({
                        response: this.xhr.response,
                        xhr: this.xhr,
                        event: e,
                    });
                }
            };

            if (!this._options.isLocal) {
                this.xhr.onerror = (e) =>
                    this._reject({
                        status: this.xhr.status,
                        xhr: this.xhr,
                        event: e,
                    });
            }

            if (this._options.onProgress) {
                this.xhr.onprogress = (e) =>
                    this._options.onProgress(e.loaded / e.total, this.xhr, e);
            }

            if (this._options.onUploadProgress) {
                this.xhr.upload.onprogress = (e) =>
                    this._options.onUploadProgress(e.loaded / e.total, this.xhr, e);
            }

            if (this._options.beforeSend) {
                this._options.beforeSend(this.xhr);
            }

            this.xhr.send(this._options.data);

            if (this._options.afterSend) {
                this._options.afterSend(this.xhr);
            }
        }

        /**
         * Cancel a pending request.
         * @param {string} [reason=Request was cancelled] The reason for cancelling the request.
         */
        cancel(reason = 'Request was cancelled') {
            if (this._isResolved || this._isRejected || this._isCancelled) {
                return;
            }

            this.xhr.abort();

            this._isCancelled = true;

            if (this._options.rejectOnCancel) {
                this._reject({
                    status: this.xhr.status,
                    xhr: this.xhr,
                    reason,
                });
            }
        }

        /**
         * Execute a callback if the request is rejected.
         * @param {function} [onRejected] The callback to execute if the request is rejected.
         * @return {Promise} The promise.
         */
        catch(onRejected) {
            return this._promise.catch(onRejected);
        }

        /**
         * Execute a callback once the request is settled (resolved or rejected).
         * @param {function} [onFinally] The callback to execute once the request is settled.
         * @return {Promise} The promise.
         */
        finally(onFinally) {
            return this._promise.finally(onFinally);
        }

        /**
         * Execute a callback once the request is resolved (or optionally rejected).
         * @param {function} onFulfilled The callback to execute if the request is resolved.
         * @param {function} [onRejected] The callback to execute if the request is rejected.
         * @return {Promise} The promise.
         */
        then(onFulfilled, onRejected) {
            return this._promise.then(onFulfilled, onRejected);
        }
    }

    Object.setPrototypeOf(AjaxRequest.prototype, Promise.prototype);

    /**
     * DOM Ajax
     */

    /**
     * Perform an XHR DELETE request.
     * @param {string} url The URL of the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=DELETE] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function _delete(url, options) {
        return new AjaxRequest({
            url,
            method: 'DELETE',
            ...options,
        });
    }
    /**
     * New AjaxRequest constructor.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.url=window.location] The URL of the request.
     * @param {string} [options.method=GET] The HTTP method of the request.
     * @param {Boolean|string|array|object|FormData} [options.data=null] The data to send with the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function ajax(options) {
        return new AjaxRequest(options);
    }
    /**
     * Perform an XHR GET request.
     * @param {string} url The URL of the request.
     * @param {string|array|object} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=GET] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function get(url, data, options) {
        return new AjaxRequest({
            url,
            data,
            ...options,
        });
    }
    /**
     * Perform an XHR PATCH request.
     * @param {string} url The URL of the request.
     * @param {string|array|object|FormData} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=PATCH] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function patch(url, data, options) {
        return new AjaxRequest({
            url,
            data,
            method: 'PATCH',
            ...options,
        });
    }
    /**
     * Perform an XHR POST request.
     * @param {string} url The URL of the request.
     * @param {string|array|object|FormData} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=POST] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function post(url, data, options) {
        return new AjaxRequest({
            url,
            data,
            method: 'POST',
            ...options,
        });
    }
    /**
     * Perform an XHR PUT request.
     * @param {string} url The URL of the request.
     * @param {string|array|object|FormData} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=PUT] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function put(url, data, options) {
        return new AjaxRequest({
            url,
            data,
            method: 'PUT',
            ...options,
        });
    }

    /**
     * Animation Helpers
     */

    let animating = false;

    /**
     * Get the current time.
     * @return {number} The current time.
     */
    function getTime() {
        return document.timeline ?
            document.timeline.currentTime :
            performance.now();
    }
    /**
     * Start the animation loop (if not already started).
     */
    function start() {
        if (animating) {
            return;
        }

        animating = true;
        update();
    }
    /**
     * Run a single frame of all animations, and then queue up the next frame.
     */
    function update() {
        const time = getTime();

        for (const [node, currentAnimations] of animations) {
            const otherAnimations = currentAnimations.filter((animation) => !animation.update(time));

            if (!otherAnimations.length) {
                animations.delete(node);
            } else {
                animations.set(node, otherAnimations);
            }
        }

        if (!animations.size) {
            animating = false;
        } else if (config.useTimeout) {
            setTimeout(update, 1000 / 60);
        } else {
            getWindow().requestAnimationFrame(update);
        }
    }

    /**
     * Animation Class
     * @class
     */
    class Animation {
        /**
         * New Animation constructor.
         * @param {HTMLElement} node The input node.
         * @param {DOM~animationCallback} callback The animation callback.
         * @param {object} [options] The options to use for the animation.
         * @param {string} [options.type=ease-in-out] The type of animation
         * @param {number} [options.duration=1000] The duration the animation should last.
         * @param {Boolean} [options.infinite] Whether to repeat the animation.
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         */
        constructor(node, callback, options) {
            this._node = node;
            this._callback = callback;

            this._options = {
                ...getAnimationDefaults(),
                ...options,
            };

            if (!('start' in this._options)) {
                this._options.start = getTime();
            }

            if (this._options.debug) {
                this._node.dataset.animationStart = this._options.start;
            }

            this._promise = new Promise((resolve, reject) => {
                this._resolve = resolve;
                this._reject = reject;
            });

            if (!animations.has(node)) {
                animations.set(node, []);
            }

            animations.get(node).push(this);
        }

        /**
         * Execute a callback if the animation is rejected.
         * @param {function} [onRejected] The callback to execute if the animation is rejected.
         * @return {Promise} The promise.
         */
        catch(onRejected) {
            return this._promise.catch(onRejected);
        }

        /**
         * Clone the animation to a new node.
         * @param {HTMLElement} node The input node.
         * @return {Animation} The cloned Animation.
         */
        clone(node) {
            return new Animation(node, this._callback, this._options);
        }

        /**
         * Execute a callback once the animation is settled (resolved or rejected).
         * @param {function} [onFinally] The callback to execute once the animation is settled.
         * @return {Promise} The promise.
         */
        finally(onFinally) {
            return this._promise.finally(onFinally);
        }

        /**
         * Stop the animation.
         * @param {object} [options] The options for stopping the animation.
         * @param {Boolean} [options.finish=true] Whether to finish the animation.
        */
        stop({ finish = true } = {}) {
            if (this._isStopped || this._isFinished) {
                return;
            }

            const otherAnimations = animations.get(this._node)
                .filter((animation) => animation !== this);

            if (!otherAnimations.length) {
                animations.delete(this._node);
            } else {
                animations.set(this._node, otherAnimations);
            }

            if (finish) {
                this.update();
            }

            this._isStopped = true;

            if (!finish) {
                this._reject(this._node);
            }
        }

        /**
         * Execute a callback once the animation is resolved (or optionally rejected).
         * @param {function} onFulfilled The callback to execute if the animation is resolved.
         * @param {function} [onRejected] The callback to execute if the animation is rejected.
         * @return {Promise} The promise.
         */
        then(onFulfilled, onRejected) {
            return this._promise.then(onFulfilled, onRejected);
        }

        /**
         * Run a single frame of the animation.
         * @param {number} [time] The current time.
         * @return {Boolean} TRUE if the animation is finished, otherwise FALSE.
         */
        update(time = null) {
            if (this._isStopped) {
                return true;
            }

            let progress;

            if (time === null) {
                progress = 1;
            } else {
                progress = (time - this._options.start) / this._options.duration;

                if (this._options.infinite) {
                    progress %= 1;
                } else {
                    progress = clamp(progress);
                }

                if (this._options.type === 'ease-in') {
                    progress = progress ** 2;
                } else if (this._options.type === 'ease-out') {
                    progress = Math.sqrt(progress);
                } else if (this._options.type === 'ease-in-out') {
                    if (progress <= 0.5) {
                        progress = progress ** 2 * 2;
                    } else {
                        progress = 1 - ((1 - progress) ** 2 * 2);
                    }
                }
            }

            if (this._options.debug) {
                this._node.dataset.animationTime = time;
                this._node.dataset.animationProgress = progress;
            }

            this._callback(this._node, progress, this._options);

            if (progress < 1) {
                return false;
            }

            if (this._options.debug) {
                delete this._node.dataset.animationStart;
                delete this._node.dataset.animationTime;
                delete this._node.dataset.animationProgress;
            }

            if (!this._isFinished) {
                this._isFinished = true;

                this._resolve(this._node);
            }

            return true;
        }
    }

    Object.setPrototypeOf(Animation.prototype, Promise.prototype);

    /**
    * AnimationSet Class
    * @class
    */
    class AnimationSet {
        /**
         * New AnimationSet constructor.
         * @param {array} animations The animations.
         */
        constructor(animations) {
            this._animations = animations;
            this._promise = Promise.all(animations);
        }

        /**
         * Execute a callback if any of the animations is rejected.
         * @param {function} [onRejected] The callback to execute if an animation is rejected.
         * @return {Promise} The promise.
         */
        catch(onRejected) {
            return this._promise.catch(onRejected);
        }

        /**
         * Execute a callback once the animation is settled (resolved or rejected).
         * @param {function} [onFinally] The callback to execute once the animation is settled.
         * @return {Promise} The promise.
         */
        finally(onFinally) {
            return this._promise.finally(onFinally);
        }

        /**
         * Stop the animations.
         * @param {object} [options] The options for stopping the animation.
         * @param {Boolean} [options.finish=true] Whether to finish the animations.
        */
        stop({ finish = true } = {}) {
            for (const animation of this._animations) {
                animation.stop({ finish });
            }
        }

        /**
         * Execute a callback once the animation is resolved (or optionally rejected).
         * @param {function} onFulfilled The callback to execute if the animation is resolved.
         * @param {function} [onRejected] The callback to execute if the animation is rejected.
         * @return {Promise} The promise.
         */
        then(onFulfilled, onRejected) {
            return this._promise.then(onFulfilled, onRejected);
        }
    }

    Object.setPrototypeOf(AnimationSet.prototype, Promise.prototype);

    /**
     * DOM Create
     */

    /**
     * Attach a shadow DOM tree to the first node.
     * @param {string|array|HTMLElement|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for attaching the shadow DOM.
     * @param {Boolean} [options.open=true] Whether the elements are accessible from JavaScript outside the root.
     * @return {ShadowRoot} The new ShadowRoot.
     */
    function attachShadow$1(selector, { open = true } = {}) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node.attachShadow({
            mode: open ?
                'open' :
                'closed',
        });
    }
    /**
     * Create a new DOM element.
     * @param {string} [tagName=div] The type of HTML element to create.
     * @param {object} [options] The options to use for creating the element.
     * @param {string} [options.html] The HTML contents.
     * @param {string} [options.text] The text contents.
     * @param {string|array} [options.class] The classes.
     * @param {object} [options.style] An object containing style properties.
     * @param {string} [options.value] The value.
     * @param {object} [options.attributes] An object containing attributes.
     * @param {object} [options.properties] An object containing properties.
     * @param {object} [options.dataset] An object containing dataset values.
     * @return {HTMLElement} The new HTMLElement.
     */
    function create(tagName = 'div', options = {}) {
        const node = getContext().createElement(tagName);

        if ('html' in options) {
            node.innerHTML = options.html;
        } else if ('text' in options) {
            node.textContent = options.text;
        }

        if ('class' in options) {
            const classes = parseClasses(wrap$2(options.class));

            node.classList.add(...classes);
        }

        if ('style' in options) {
            for (let [style, value] of Object.entries(options.style)) {
                style = kebabCase(style);

                // if value is numeric and property doesn't support number values, add px
                if (value && isNumeric(value) && !CSS.supports(style, value)) {
                    value += 'px';
                }

                node.style.setProperty(style, value);
            }
        }

        if ('value' in options) {
            node.value = options.value;
        }

        if ('attributes' in options) {
            for (const [key, value] of Object.entries(options.attributes)) {
                node.setAttribute(key, value);
            }
        }

        if ('properties' in options) {
            for (const [key, value] of Object.entries(options.properties)) {
                node[key] = value;
            }
        }

        if ('dataset' in options) {
            const dataset = parseData(options.dataset, null, { json: true });

            for (let [key, value] of Object.entries(dataset)) {
                key = camelCase(key);
                node.dataset[key] = value;
            }
        }

        return node;
    }
    /**
     * Create a new comment node.
     * @param {string} comment The comment contents.
     * @return {Node} The new comment node.
     */
    function createComment(comment) {
        return getContext().createComment(comment);
    }
    /**
     * Create a new document fragment.
     * @return {DocumentFragment} The new DocumentFragment.
     */
    function createFragment() {
        return getContext().createDocumentFragment();
    }
    /**
     * Create a new range object.
     * @return {Range} The new Range.
     */
    function createRange() {
        return getContext().createRange();
    }
    /**
     * Create a new text node.
     * @param {string} text The text contents.
     * @return {Node} The new text node.
     */
    function createText(text) {
        return getContext().createTextNode(text);
    }

    /**
     * DOM Parser
     */

    const parser = new DOMParser();

    /**
     * Create a Document object from a string.
     * @param {string} input The input string.
     * @param {object} [options] The options for parsing the string.
     * @param {string} [options.contentType=text/html] The content type.
     * @return {Document} A new Document object.
     */
    function parseDocument(input, { contentType = 'text/html' } = {}) {
        return parser.parseFromString(input, contentType);
    }
    /**
     * Create an Array containing nodes parsed from a HTML string.
     * @param {string} html The HTML input string.
     * @return {array} An array of nodes.
     */
    function parseHTML(html) {
        const childNodes = createRange()
            .createContextualFragment(html)
            .children;

        return merge([], childNodes);
    }

    /**
     * QuerySet Class
     * @class
     */
    class QuerySet {
        /**
         * New DOM constructor.
         * @param {array} nodes The input nodes.
         */
        constructor(nodes = []) {
            this._nodes = nodes;
        }

        /**
         * Get the number of nodes.
         * @return {number} The number of nodes.
         */
        get length() {
            return this._nodes.length;
        }

        /**
         * Execute a function for each node in the set.
         * @param {function} callback The callback to execute
         * @return {QuerySet} The QuerySet object.
         */
        each(callback) {
            this._nodes.forEach(
                (v, i) => callback(v, i),
            );

            return this;
        }

        /**
         * Retrieve the DOM node(s) contained in the QuerySet.
         * @param {number} [index=null] The index of the node.
         * @return {array|Node|Document|Window} The node(s).
         */
        get(index = null) {
            if (index === null) {
                return this._nodes;
            }

            return index < 0 ?
                this._nodes[index + this._nodes.length] :
                this._nodes[index];
        }

        /**
         * Execute a function for each node in the set.
         * @param {function} callback The callback to execute
         * @return {QuerySet} A new QuerySet object.
         */
        map(callback) {
            const nodes = this._nodes.map(callback);

            return new QuerySet(nodes);
        }

        /**
         * Reduce the set of matched nodes to a subset specified by a range of indices.
         * @param {number} [begin] The index to slice from.
         * @param {number} [end]  The index to slice to.
         * @return {QuerySet} A new QuerySet object.
         */
        slice(begin, end) {
            const nodes = this._nodes.slice(begin, end);

            return new QuerySet(nodes);
        }

        /**
         * Return an iterable from the nodes.
         * @return {ArrayIterator} The iterator object.
         */
        [Symbol.iterator]() {
            return this._nodes.values();
        }
    }

    /**
     * DOM Find
     */

    /**
     * Return all nodes matching a selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {array} The matching nodes.
     */
    function find$1(selector, context = getContext()) {
        if (!selector) {
            return [];
        }

        // fast selector
        const match = selector.match(/^([\#\.]?)([\w\-]+)$/);

        if (match) {
            if (match[1] === '#') {
                return findById$1(match[2], context);
            }

            if (match[1] === '.') {
                return findByClass$1(match[2], context);
            }

            return findByTag$1(match[2], context);
        }

        if (isDocument(context) || isElement(context) || isFragment(context) || isShadow(context)) {
            return merge([], context.querySelectorAll(selector));
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        const results = [];

        for (const node of nodes) {
            const newNodes = node.querySelectorAll(selector);

            results.push(...newNodes);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all nodes with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {array} The matching nodes.
     */
    function findByClass$1(className, context = getContext()) {
        if (isDocument(context) || isElement(context)) {
            return merge([], context.getElementsByClassName(className));
        }

        if (isFragment(context) || isShadow(context)) {
            return merge([], context.querySelectorAll(`.${className}`));
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        const results = [];

        for (const node of nodes) {
            const newNodes = isFragment(node) || isShadow(node) ?
                node.querySelectorAll(`.${className}`) :
                node.getElementsByClassName(className);

            results.push(...newNodes);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all nodes with a specific ID.
     * @param {string} id The id.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {array} The matching nodes.
     */
    function findById$1(id, context = getContext()) {
        if (isDocument(context) || isElement(context) || isFragment(context) || isShadow(context)) {
            return merge([], context.querySelectorAll(`#${id}`));
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        const results = [];

        for (const node of nodes) {
            const newNodes = node.querySelectorAll(`#${id}`);

            results.push(...newNodes);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all nodes with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {array} The matching nodes.
     */
    function findByTag$1(tagName, context = getContext()) {
        if (isDocument(context) || isElement(context)) {
            return merge([], context.getElementsByTagName(tagName));
        }

        if (isFragment(context) || isShadow(context)) {
            return merge([], context.querySelectorAll(tagName));
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        const results = [];

        for (const node of nodes) {
            const newNodes = isFragment(node) || isShadow(node) ?
                node.querySelectorAll(tagName) :
                node.getElementsByTagName(tagName);

            results.push(...newNodes);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return a single node matching a selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {HTMLElement} The matching node.
     */
    function findOne$1(selector, context = getContext()) {
        if (!selector) {
            return null;
        }

        // fast selector
        const match = selector.match(/^([\#\.]?)([\w\-]+)$/);

        if (match) {
            if (match[1] === '#') {
                return findOneById$1(match[2], context);
            }

            if (match[1] === '.') {
                return findOneByClass$1(match[2], context);
            }

            return findOneByTag$1(match[2], context);
        }

        if (isDocument(context) || isElement(context) || isFragment(context) || isShadow(context)) {
            return context.querySelector(selector);
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const result = node.querySelector(selector);

            if (result) {
                return result;
            }
        }

        return null;
    }
    /**
     * Return a single node with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {HTMLElement} The matching node.
     */
    function findOneByClass$1(className, context = getContext()) {
        if (isDocument(context) || isElement(context)) {
            return context.getElementsByClassName(className).item(0);
        }

        if (isFragment(context) || isShadow(context)) {
            return context.querySelector(`.${className}`);
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const result = isFragment(node) || isShadow(node) ?
                node.querySelector(`.${className}`) :
                node.getElementsByClassName(className).item(0);

            if (result) {
                return result;
            }
        }

        return null;
    }
    /**
     * Return a single node with a specific ID.
     * @param {string} id The id.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {HTMLElement} The matching element.
     */
    function findOneById$1(id, context = getContext()) {
        if (isDocument(context)) {
            return context.getElementById(id);
        }

        if (isElement(context) || isFragment(context) || isShadow(context)) {
            return context.querySelector(`#${id}`);
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const result = isDocument(node) ?
                node.getElementById(id) :
                node.querySelector(`#${id}`);

            if (result) {
                return result;
            }
        }

        return null;
    }
    /**
     * Return a single node with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {HTMLElement} The matching node.
     */
    function findOneByTag$1(tagName, context = getContext()) {
        if (isDocument(context) || isElement(context)) {
            return context.getElementsByTagName(tagName).item(0);
        }

        if (isFragment(context) || isShadow(context)) {
            return context.querySelector(tagName);
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const result = isFragment(node) || isShadow(node) ?
                node.querySelector(tagName) :
                node.getElementsByTagName(tagName).item(0);

            if (result) {
                return result;
            }
        }

        return null;
    }

    /**
     * DOM Filters
     */

    /**
     * Recursively parse nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} context The context node(s), or a query selector string.
     * @param {DOM~nodeCallback} [nodeFilter] The callback to use for filtering nodes.
     * @param {Boolean} [first=false] Whether to only return the first result.
     * @return {array|Node|DocumentFragment|ShadowRoot|Document|Window} The parsed node(s).
     */
    function _parseNode(nodes, context, nodeFilter, { html = false } = {}) {
        if (isString(nodes)) {
            if (html && nodes.trim().charAt(0) === '<') {
                return parseHTML(nodes).shift();
            }

            return findOne$1(nodes, context);
        }

        if (nodeFilter(nodes)) {
            return nodes;
        }

        if (nodes instanceof QuerySet) {
            const node = nodes.get(0);

            return nodeFilter(node) ? node : undefined;
        }

        if (nodes instanceof HTMLCollection || nodes instanceof NodeList) {
            const node = nodes.item(0);

            return nodeFilter(node) ? node : undefined;
        }
    }
    /**
     * Recursively parse nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} context The context node(s), or a query selector string.
     * @param {DOM~nodeCallback} [nodeFilter] The callback to use for filtering nodes.
     * @param {Boolean} [first=false] Whether to only return the first result.
     * @return {array|Node|DocumentFragment|ShadowRoot|Document|Window} The parsed node(s).
     */
    function _parseNodes(nodes, context, nodeFilter, { html = false } = {}) {
        if (isString(nodes)) {
            if (html && nodes.trim().charAt(0) === '<') {
                return parseHTML(nodes);
            }

            return find$1(nodes, context);
        }

        if (nodeFilter(nodes)) {
            return [nodes];
        }

        if (nodes instanceof QuerySet) {
            return nodes.get().filter(nodeFilter);
        }

        if (nodes instanceof HTMLCollection || nodes instanceof NodeList) {
            return merge([], nodes).filter(nodeFilter);
        }

        return [];
    }
    /**
     * Return a node filter callback.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [defaultValue=true] The default return value.
     * @return {DOM~filterCallback} The node filter callback.
     */
    function parseFilter(filter, defaultValue = true) {
        if (!filter) {
            return (_) => defaultValue;
        }

        if (isFunction(filter)) {
            return filter;
        }

        if (isString(filter)) {
            return (node) => isElement(node) && node.matches(filter);
        }

        if (isNode(filter) || isFragment(filter) || isShadow(filter)) {
            return (node) => node.isSameNode(filter);
        }

        filter = parseNodes(filter, {
            node: true,
            fragment: true,
            shadow: true,
        });

        if (filter.length) {
            return (node) => filter.includes(node);
        }

        return (_) => !defaultValue;
    }
    /**
     * Return a node contains filter callback.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [defaultValue=true] The default return value.
     * @return {DOM~filterCallback} The node contains filter callback.
     */
    function parseFilterContains(filter, defaultValue = true) {
        if (!filter) {
            return (_) => defaultValue;
        }

        if (isFunction(filter)) {
            return (node) => merge([], node.querySelectorAll('*')).some(filter);
        }

        if (isString(filter)) {
            return (node) => !!findOne$1(filter, node);
        }

        if (isNode(filter) || isFragment(filter) || isShadow(filter)) {
            return (node) => node.contains(filter);
        }

        filter = parseNodes(filter, {
            node: true,
            fragment: true,
            shadow: true,
        });

        if (filter.length) {
            return (node) => filter.some((other) => node.contains(other));
        }

        return (_) => !defaultValue;
    }
    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|Document} [options.context=getContext()] The Document context.
     * @return {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} The matching node.
     */
    function parseNode(nodes, options = {}) {
        const filter = parseNodesFilter(options);

        if (!isArray(nodes)) {
            return _parseNode(nodes, options.context || getContext(), filter, options);
        }

        for (const node of nodes) {
            const result = _parseNode(node, options.context || getContext(), filter, options);

            if (result) {
                return result;
            }
        }
    }
    /**
     * Return a filtered array of nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} [options.context=getContext()] The Document context.
     * @return {array} The filtered array of nodes.
     */
    function parseNodes(nodes, options = {}) {
        const filter = parseNodesFilter(options);

        if (!isArray(nodes)) {
            return _parseNodes(nodes, options.context || getContext(), filter, options);
        }

        const results = nodes.flatMap((node) => _parseNodes(node, options.context || getContext(), filter, options));

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return a function for filtering nodes.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @return {DOM~nodeCallback} The node filter function.
     */
    function parseNodesFilter(options) {
        if (!options) {
            return isElement;
        }

        const callbacks = [];

        if (options.node) {
            callbacks.push(isNode);
        } else {
            callbacks.push(isElement);
        }

        if (options.document) {
            callbacks.push(isDocument);
        }

        if (options.window) {
            callbacks.push(isWindow);
        }

        if (options.fragment) {
            callbacks.push(isFragment);
        }

        if (options.shadow) {
            callbacks.push(isShadow);
        }

        return (node) => callbacks.some((callback) => callback(node));
    }

    /**
     * DOM Animate
     */

    /**
     * Add an animation to each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function animate$1(selector, callback, options) {
        const nodes = parseNodes(selector);

        const newAnimations = nodes.map((node) => new Animation(node, callback, options));

        start();

        return new AnimationSet(newAnimations);
    }
    /**
     * Stop all animations for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for stopping the animation.
     * @param {Boolean} [options.finish=true] Whether to complete all current animations.
     */
    function stop$1(selector, { finish = true } = {}) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            if (!animations.has(node)) {
                continue;
            }

            const currentAnimations = animations.get(node);
            for (const animation of currentAnimations) {
                animation.stop({ finish });
            }
        }
    }

    /**
     * DOM Animations
     */

    /**
     * Drop each node into place.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function dropIn$1(selector, options) {
        return slideIn$1(
            selector,
            {
                direction: 'top',
                ...options,
            },
        );
    }
    /**
     * Drop each node out of place.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function dropOut$1(selector, options) {
        return slideOut$1(
            selector,
            {
                direction: 'top',
                ...options,
            },
        );
    }
    /**
     * Fade the opacity of each node in.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function fadeIn$1(selector, options) {
        return animate$1(
            selector,
            (node, progress) =>
                node.style.setProperty(
                    'opacity',
                    progress < 1 ?
                        progress.toFixed(2) :
                        '',
                ),
            options,
        );
    }
    /**
     * Fade the opacity of each node out.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function fadeOut$1(selector, options) {
        return animate$1(
            selector,
            (node, progress) =>
                node.style.setProperty(
                    'opacity',
                    progress < 1 ?
                        (1 - progress).toFixed(2) :
                        '',
                ),
            options,
        );
    }
    /**
     * Rotate each node in on an X, Y or Z.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {number} [options.z=1] The amount to rotate on the Z-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function rotateIn$1(selector, options) {
        return animate$1(
            selector,
            (node, progress, options) => {
                const amount = ((90 - (progress * 90)) * (options.inverse ? -1 : 1)).toFixed(2);
                node.style.setProperty(
                    'transform',
                    progress < 1 ?
                        `rotate3d(${options.x}, ${options.y}, ${options.z}, ${amount}deg)` :
                        '',
                );
            },
            {
                x: 0,
                y: 1,
                z: 0,
                ...options,
            },
        );
    }
    /**
     * Rotate each node out on an X, Y or Z.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {number} [options.z=1] The amount to rotate on the Z-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function rotateOut$1(selector, options) {
        return animate$1(
            selector,
            (node, progress, options) => {
                const amount = ((progress * 90) * (options.inverse ? -1 : 1)).toFixed(2);
                node.style.setProperty(
                    'transform',
                    progress < 1 ?
                        `rotate3d(${options.x}, ${options.y}, ${options.z}, ${amount}deg)` :
                        '',
                );
            },
            {
                x: 0,
                y: 1,
                z: 0,
                ...options,
            },
        );
    }
    /**
     * Slide each node in from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function slideIn$1(selector, options) {
        return animate$1(
            selector,
            (node, progress, options) => {
                if (progress === 1) {
                    node.style.setProperty('overflow', '');
                    if (options.useGpu) {
                        node.style.setProperty('transform', '');
                    } else {
                        node.style.setProperty('margin-left', '');
                        node.style.setProperty('margin-top', '');
                    }
                    return;
                }

                const dir = evaluate(options.direction);

                let size; let translateStyle; let inverse;
                if (['top', 'bottom'].includes(dir)) {
                    size = node.clientHeight;
                    translateStyle = options.useGpu ?
                        'Y' :
                        'margin-top';
                    inverse = dir === 'top';
                } else {
                    size = node.clientWidth;
                    translateStyle = options.useGpu ?
                        'X' :
                        'margin-left';
                    inverse = dir === 'left';
                }

                const translateAmount = ((size - (size * progress)) * (inverse ? -1 : 1)).toFixed(2);
                if (options.useGpu) {
                    node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                } else {
                    node.style.setProperty(translateStyle, `${translateAmount}px`);
                }
            },
            {
                direction: 'bottom',
                useGpu: true,
                ...options,
            },
        );
    }
    /**
     * Slide each node out from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function slideOut$1(selector, options) {
        return animate$1(
            selector,
            (node, progress, options) => {
                if (progress === 1) {
                    node.style.setProperty('overflow', '');
                    if (options.useGpu) {
                        node.style.setProperty('transform', '');
                    } else {
                        node.style.setProperty('margin-left', '');
                        node.style.setProperty('margin-top', '');
                    }
                    return;
                }

                const dir = evaluate(options.direction);

                let size; let translateStyle; let inverse;
                if (['top', 'bottom'].includes(dir)) {
                    size = node.clientHeight;
                    translateStyle = options.useGpu ?
                        'Y' :
                        'margin-top';
                    inverse = dir === 'top';
                } else {
                    size = node.clientWidth;
                    translateStyle = options.useGpu ?
                        'X' :
                        'margin-left';
                    inverse = dir === 'left';
                }

                const translateAmount = (size * progress * (inverse ? -1 : 1)).toFixed(2);
                if (options.useGpu) {
                    node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                } else {
                    node.style.setProperty(translateStyle, `${translateAmount}px`);
                }
            },
            {
                direction: 'bottom',
                useGpu: true,
                ...options,
            },
        );
    }
    /**
     * Squeeze each node in from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function squeezeIn$1(selector, options) {
        const nodes = parseNodes(selector);

        options = {
            direction: 'bottom',
            useGpu: true,
            ...options,
        };

        const newAnimations = nodes.map((node) => {
            const initialHeight = node.style.height;
            const initialWidth = node.style.width;
            node.style.setProperty('overflow', 'hidden');

            return new Animation(
                node,
                (node, progress, options) => {
                    node.style.setProperty('height', initialHeight);
                    node.style.setProperty('width', initialWidth);

                    if (progress === 1) {
                        node.style.setProperty('overflow', '');
                        if (options.useGpu) {
                            node.style.setProperty('transform', '');
                        } else {
                            node.style.setProperty('margin-left', '');
                            node.style.setProperty('margin-top', '');
                        }
                        return;
                    }

                    const dir = evaluate(options.direction);

                    let size; let sizeStyle; let translateStyle;
                    if (['top', 'bottom'].includes(dir)) {
                        size = node.clientHeight;
                        sizeStyle = 'height';
                        if (dir === 'top') {
                            translateStyle = options.useGpu ?
                                'Y' :
                                'margin-top';
                        }
                    } else {
                        size = node.clientWidth;
                        sizeStyle = 'width';
                        if (dir === 'left') {
                            translateStyle = options.useGpu ?
                                'X' :
                                'margin-left';
                        }
                    }

                    const amount = (size * progress).toFixed(2);

                    node.style.setProperty(sizeStyle, `${amount}px`);

                    if (translateStyle) {
                        const translateAmount = (size - amount).toFixed(2);
                        if (options.useGpu) {
                            node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                        } else {
                            node.style.setProperty(translateStyle, `${translateAmount}px`);
                        }
                    }
                },
                options,
            );
        });

        start();

        return new AnimationSet(newAnimations);
    }
    /**
     * Squeeze each node out from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function squeezeOut$1(selector, options) {
        const nodes = parseNodes(selector);

        options = {
            direction: 'bottom',
            useGpu: true,
            ...options,
        };

        const newAnimations = nodes.map((node) => {
            const initialHeight = node.style.height;
            const initialWidth = node.style.width;
            node.style.setProperty('overflow', 'hidden');

            return new Animation(
                node,
                (node, progress, options) => {
                    node.style.setProperty('height', initialHeight);
                    node.style.setProperty('width', initialWidth);

                    if (progress === 1) {
                        node.style.setProperty('overflow', '');
                        if (options.useGpu) {
                            node.style.setProperty('transform', '');
                        } else {
                            node.style.setProperty('margin-left', '');
                            node.style.setProperty('margin-top', '');
                        }
                        return;
                    }

                    const dir = evaluate(options.direction);

                    let size; let sizeStyle; let translateStyle;
                    if (['top', 'bottom'].includes(dir)) {
                        size = node.clientHeight;
                        sizeStyle = 'height';
                        if (dir === 'top') {
                            translateStyle = options.useGpu ?
                                'Y' :
                                'margin-top';
                        }
                    } else {
                        size = node.clientWidth;
                        sizeStyle = 'width';
                        if (dir === 'left') {
                            translateStyle = options.useGpu ?
                                'X' :
                                'margin-left';
                        }
                    }

                    const amount = (size - (size * progress)).toFixed(2);

                    node.style.setProperty(sizeStyle, `${amount}px`);

                    if (translateStyle) {
                        const translateAmount = (size - amount).toFixed(2);
                        if (options.useGpu) {
                            node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                        } else {
                            node.style.setProperty(translateStyle, `${translateAmount}px`);
                        }
                    }
                },
                options,
            );
        });

        start();

        return new AnimationSet(newAnimations);
    }

    /**
     * DOM Utility
     */

    /**
     * Execute a command in the document context.
     * @param {string} command The command to execute.
     * @param {string} [value] The value to give the command.
     * @return {Boolean} TRUE if the command was executed, otherwise FALSE.
     */
    function exec(command, value = null) {
        return getContext().execCommand(command, false, value);
    }
    /**
     * Get the index of the first node relative to it's parent.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {number} The index.
     */
    function index$1(selector) {
        const node = parseNode(selector, {
            node: true,
        });

        if (!node || !node.parentNode) {
            return;
        }

        return merge([], node.parentNode.children).indexOf(node);
    }
    /**
     * Get the index of the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {number} The index.
     */
    function indexOf$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).findIndex(nodeFilter);
    }
    /**
     * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function normalize$1(selector) {
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
        });

        for (const node of nodes) {
            node.normalize();
        }
    }
    /**
     * Return a serialized string containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {string} The serialized string.
     */
    function serialize$1(selector) {
        return parseParams(
            serializeArray$1(selector),
        );
    }
    /**
     * Return a serialized array containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The serialized array.
     */
    function serializeArray$1(selector) {
        return parseNodes(selector, {
            fragment: true,
            shadow: true,
        }).reduce(
            (values, node) => {
                if (
                    (isElement(node) && node.matches('form')) ||
                    isFragment(node) ||
                    isShadow(node)
                ) {
                    return values.concat(
                        serializeArray$1(
                            node.querySelectorAll(
                                'input, select, textarea',
                            ),
                        ),
                    );
                }

                if (
                    isElement(node) &&
                    node.matches('[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')
                ) {
                    return values;
                }

                const name = node.getAttribute('name');
                if (!name) {
                    return values;
                }

                if (
                    isElement(node) &&
                    node.matches('select[multiple]')
                ) {
                    for (const option of node.selectedOptions) {
                        values.push(
                            {
                                name,
                                value: option.value || '',
                            },
                        );
                    }
                } else {
                    values.push(
                        {
                            name,
                            value: node.value || '',
                        },
                    );
                }

                return values;
            },
            [],
        );
    }

    /**
     * Sort nodes by their position in the document.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The sorted array of nodes.
     */
    function sort$1(selector) {
        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        }).sort((node, other) => {
            if (isWindow(node)) {
                return 1;
            }

            if (isWindow(other)) {
                return -1;
            }

            if (isDocument(node)) {
                return 1;
            }

            if (isDocument(other)) {
                return -1;
            }

            if (isFragment(other)) {
                return 1;
            }

            if (isFragment(node)) {
                return -1;
            }

            if (isShadow(node)) {
                node = node.host;
            }

            if (isShadow(other)) {
                other = other.host;
            }

            if (node.isSameNode(other)) {
                return 0;
            }

            const pos = node.compareDocumentPosition(other);

            if (pos & Node.DOCUMENT_POSITION_FOLLOWING || pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                return -1;
            }

            if (pos & Node.DOCUMENT_POSITION_PRECEDING || pos & Node.DOCUMENT_POSITION_CONTAINS) {
                return 1;
            }

            return 0;
        });
    }
    /**
     * Return the tag name (lowercase) of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {string} The nodes tag name (lowercase).
     */
    function tagName$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node.tagName.toLowerCase();
    }

    /**
     * DOM Traversal
     */

    /**
     * Return the first child of each node (optionally matching a filter).
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The matching nodes.
     */
    function child$1(selector, nodeFilter) {
        return children$1(selector, nodeFilter, { first: true });
    }
    /**
     * Return all children of each node (optionally matching a filter).
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {object} [options] The options for filtering the nodes.
     * @param {Boolean} [options.first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [options.elementsOnly=true] Whether to only return element nodes.
     * @return {array} The matching nodes.
     */
    function children$1(selector, nodeFilter, { first = false, elementsOnly = true } = {}) {
        nodeFilter = parseFilter(nodeFilter);

        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        });

        const results = [];

        for (const node of nodes) {
            const childNodes = elementsOnly ?
                merge([], node.children) :
                merge([], node.childNodes);

            for (const child of childNodes) {
                if (!nodeFilter(child)) {
                    continue;
                }

                results.push(child);

                if (first) {
                    break;
                }
            }
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @return {array} The matching nodes.
     */
    function closest$1(selector, nodeFilter, limitFilter) {
        return parents$1(selector, nodeFilter, limitFilter, { first: true });
    }
    /**
     * Return the common ancestor of all nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {HTMLElement} The common ancestor.
     */
    function commonAncestor$1(selector) {
        const nodes = sort$1(selector);

        if (!nodes.length) {
            return;
        }

        // Make sure all nodes have a parent
        if (nodes.some((node) => !node.parentNode)) {
            return;
        }

        const range = createRange();

        if (nodes.length === 1) {
            range.selectNode(nodes.shift());
        } else {
            range.setStartBefore(nodes.shift());
            range.setEndAfter(nodes.pop());
        }

        return range.commonAncestorContainer;
    }
    /**
     * Return all children of each node (including text and comment nodes).
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The matching nodes.
     */
    function contents$1(selector) {
        return children$1(selector, false, { elementsOnly: false });
    }
    /**
     * Return the DocumentFragment of the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {DocumentFragment} The DocumentFragment.
     */
    function fragment$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node.content;
    }
    /**
     * Return the next sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The matching nodes.
     */
    function next$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            while (node = node.nextSibling) {
                if (!isElement(node)) {
                    continue;
                }

                if (nodeFilter(node)) {
                    results.push(node);
                }

                break;
            }
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all next siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @return {array} The matching nodes.
     */
    function nextAll$1(selector, nodeFilter, limitFilter, { first = false } = {}) {
        nodeFilter = parseFilter(nodeFilter);
        limitFilter = parseFilter(limitFilter, false);

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            while (node = node.nextSibling) {
                if (!isElement(node)) {
                    continue;
                }

                if (limitFilter(node)) {
                    break;
                }

                if (!nodeFilter(node)) {
                    continue;
                }

                results.push(node);

                if (first) {
                    break;
                }
            }
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return the offset parent (relatively positioned) of the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {HTMLElement} The offset parent.
     */
    function offsetParent$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node.offsetParent;
    }
    /**
     * Return the parent of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The matching nodes.
     */
    function parent$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        // DocumentFragment and ShadowRoot nodes have no parent
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            node = node.parentNode;

            if (!node) {
                continue;
            }

            if (!nodeFilter(node)) {
                continue;
            }

            results.push(node);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all parents of each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @return {array} The matching nodes.
     */
    function parents$1(selector, nodeFilter, limitFilter, { first = false } = {}) {
        nodeFilter = parseFilter(nodeFilter);
        limitFilter = parseFilter(limitFilter, false);

        // DocumentFragment and ShadowRoot nodes have no parent
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            const parents = [];
            while (node = node.parentNode) {
                if (isDocument(node)) {
                    break;
                }

                if (limitFilter(node)) {
                    break;
                }

                if (!nodeFilter(node)) {
                    continue;
                }

                parents.unshift(node);

                if (first) {
                    break;
                }
            }

            results.push(...parents);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return the previous sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The matching nodes.
     */
    function prev$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            while (node = node.previousSibling) {
                if (!isElement(node)) {
                    continue;
                }

                if (nodeFilter(node)) {
                    results.push(node);
                }

                break;
            }
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all previous siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @return {array} The matching nodes.
     */
    function prevAll$1(selector, nodeFilter, limitFilter, { first = false } = {}) {
        nodeFilter = parseFilter(nodeFilter);
        limitFilter = parseFilter(limitFilter, false);

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            const siblings = [];
            while (node = node.previousSibling) {
                if (!isElement(node)) {
                    continue;
                }

                if (limitFilter(node)) {
                    break;
                }

                if (!nodeFilter(node)) {
                    continue;
                }

                siblings.unshift(node);

                if (first) {
                    break;
                }
            }

            results.push(...siblings);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return the ShadowRoot of the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {ShadowRoot} The ShadowRoot.
     */
    function shadow$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node.shadowRoot;
    }
    /**
     * Return all siblings for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {object} [options] The options for filtering the nodes.
     * @param {Boolean} [options.elementsOnly=true] Whether to only return element nodes.
     * @return {array} The matching nodes.
     */
    function siblings$1(selector, nodeFilter, { elementsOnly = true } = {}) {
        nodeFilter = parseFilter(nodeFilter);

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (const node of nodes) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            const siblings = elementsOnly ?
                parent.children :
                parent.childNodes;

            let sibling;
            for (sibling of siblings) {
                if (node.isSameNode(sibling)) {
                    continue;
                }

                if (!nodeFilter(sibling)) {
                    continue;
                }

                results.push(sibling);
            }
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }

    /**
     * DOM Event Factory
     */

    /**
     * Return a function for matching a delegate target to a custom selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @return {DOM~delegateCallback} The callback for finding the matching delegate.
     */
    function getDelegateContainsFactory(node, selector) {
        return (target) => {
            const matches = merge([], node.querySelectorAll(selector));

            if (!matches.length) {
                return false;
            }

            if (matches.includes(target)) {
                return target;
            }

            return closest$1(
                target,
                (parent) => matches.includes(parent),
                (parent) => parent.isSameNode(node),
            ).shift();
        };
    }
    /**
     * Return a function for matching a delegate target to a standard selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @return {DOM~delegateCallback} The callback for finding the matching delegate.
     */
    function getDelegateMatchFactory(node, selector) {
        return (target) =>
            target.matches && target.matches(selector) ?
                target :
                closest$1(
                    target,
                    (parent) => parent.matches(selector),
                    (parent) => parent.isSameNode(node),
                ).shift();
    }
    /**
     * Return a wrapped event callback that executes on a delegate selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @param {function} callback The event callback.
     * @return {DOM~eventCallback} The delegated event callback.
     */
    function delegateFactory(node, selector, callback) {
        const getDelegate = selector.match(/(?:^\s*\:scope|\,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*\:scope)/) ?
            getDelegateContainsFactory(node, selector) :
            getDelegateMatchFactory(node, selector);

        return (event) => {
            if (node.isSameNode(event.target)) {
                return;
            }

            const delegate = getDelegate(event.target);

            if (!delegate) {
                return;
            }

            Object.defineProperty(event, 'currentTarget', {
                configurable: true,
                enumerable: true,
                value: delegate,
            });
            Object.defineProperty(event, 'delegateTarget', {
                configurable: true,
                enumerable: true,
                value: node,
            });

            return callback(event);
        };
    }
    /**
     * Return a wrapped event callback that cleans up delegate events.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {function} callback The event callback.
     * @return {DOM~eventCallback} The cleaned event callback.
     */
    function delegateFactoryClean(node, callback) {
        return (event) => {
            if (!event.delegateTarget) {
                return callback(event);
            }

            Object.defineProperty(event, 'currentTarget', {
                configurable: true,
                enumerable: true,
                value: node,
            });
            Object.defineProperty(event, 'delegateTarget', {
                writable: true,
            });

            delete event.delegateTarget;

            return callback(event);
        };
    }

    /**
     * Return a wrapped mouse drag event (optionally debounced).
     * @param {DOM~eventCallback} down The callback to execute on mousedown.
     * @param {DOM~eventCallback} move The callback to execute on mousemove.
     * @param {DOM~eventCallback} up The callback to execute on mouseup.
     * @param {object} [options] The options for the mouse drag event.
     * @param {Boolean} [options.debounce=true] Whether to debounce the move event.
     * @param {Boolean} [options.passive=true] Whether to use passive event listeners.
     * @param {Boolean} [options.preventDefault=true] Whether to prevent the default event.
     * @param {number} [options.touches=1] The number of touches to trigger the event for.
     * @return {DOM~eventCallback} The mouse drag event callback.
     */
    function mouseDragFactory(down, move, up, { debounce: debounce$1 = true, passive = true, preventDefault = true, touches = 1 } = {}) {
        if (move && debounce$1) {
            move = debounce(move);

            // needed to make sure up callback executes after final move callback
            if (up) {
                up = debounce(up);
            }
        }

        return (event) => {
            const isTouch = event.type === 'touchstart';

            if (isTouch && event.touches.length !== touches) {
                return;
            }

            if (down && down(event) === false) {
                return;
            }

            if (preventDefault) {
                event.preventDefault();
            }

            if (!move && !up) {
                return;
            }

            const [moveEvent, upEvent] = event.type in eventLookup ?
                eventLookup[event.type] :
                eventLookup.mousedown;

            const realMove = (event) => {
                if (isTouch && event.touches.length !== touches) {
                    return;
                }

                if (preventDefault && !passive) {
                    event.preventDefault();
                }

                if (!move) {
                    return;
                }

                move(event);
            };

            const realUp = (event) => {
                if (isTouch && event.touches.length !== touches - 1) {
                    return;
                }

                if (up && up(event) === false) {
                    return;
                }

                if (preventDefault) {
                    event.preventDefault();
                }

                removeEvent$1(window, moveEvent, realMove);
                removeEvent$1(window, upEvent, realUp);
            };

            addEvent$1(window, moveEvent, realMove, { passive });
            addEvent$1(window, upEvent, realUp);
        };
    }
    /**
     * Return a wrapped event callback that checks for a namespace match.
     * @param {string} eventName The namespaced event name.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @return {DOM~eventCallback} The wrapped event callback.
     */
    function namespaceFactory(eventName, callback) {
        return (event) => {
            if ('namespaceRegExp' in event && !event.namespaceRegExp.test(eventName)) {
                return;
            }

            return callback(event);
        };
    }
    /**
     * Return a wrapped event callback that checks for a return false for preventing default.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @return {DOM~eventCallback} The wrapped event callback.
     */
    function preventFactory(callback) {
        return (event) => {
            if (callback(event) === false) {
                event.preventDefault();
            }
        };
    }
    /**
     * Return a wrapped event callback that removes itself after execution.
     * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
     * @param {string} eventName The event name.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {string} [optoins.delegate] The delegate selector.
     * @return {DOM~eventCallback} The wrapped event callback.
     */
    function selfDestructFactory(node, eventName, callback, { capture = null, delegate = null } = {}) {
        return (event) => {
            removeEvent$1(node, eventName, callback, { capture, delegate });
            return callback(event);
        };
    }

    /**
     * DOM Event Handlers
     */

    /**
     * Add events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} eventNames The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {string} [options.delegate] The delegate selector.
     * @param {Boolean} [options.passive] Whether to use a passive event.
     * @param {Boolean} [options.selfDestruct] Whether to use a self-destructing event.
     */
    function addEvent$1(selector, eventNames, callback, { capture = false, delegate = null, passive = false, selfDestruct = false } = {}) {
        const nodes = parseNodes(selector, {
            shadow: true,
            document: true,
            window: true,
        });

        eventNames = parseEvents(eventNames);

        for (const eventName of eventNames) {
            const realEventName = parseEvent(eventName);

            const eventData = {
                callback,
                delegate,
                selfDestruct,
                capture,
                passive,
            };

            for (const node of nodes) {
                if (!events.has(node)) {
                    events.set(node, {});
                }

                const nodeEvents = events.get(node);

                let realCallback = callback;

                if (selfDestruct) {
                    realCallback = selfDestructFactory(node, eventName, realCallback, { capture, delegate });
                }

                realCallback = preventFactory(realCallback);

                if (delegate) {
                    realCallback = delegateFactory(node, delegate, realCallback);
                } else {
                    realCallback = delegateFactoryClean(node, realCallback);
                }

                realCallback = namespaceFactory(eventName, realCallback);

                eventData.realCallback = realCallback;
                eventData.eventName = eventName;
                eventData.realEventName = realEventName;

                if (!nodeEvents[realEventName]) {
                    nodeEvents[realEventName] = [];
                }

                nodeEvents[realEventName].push({ ...eventData });

                node.addEventListener(realEventName, realCallback, { capture, passive });
            }
        }
    }
    /**
     * Add delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {Boolean} [options.passive] Whether to use a passive event.
     */
    function addEventDelegate$1(selector, events, delegate, callback, { capture = false, passive = false } = {}) {
        addEvent$1(selector, events, callback, { capture, delegate, passive });
    }
    /**
     * Add self-destructing delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {Boolean} [options.passive] Whether to use a passive event.
     */
    function addEventDelegateOnce$1(selector, events, delegate, callback, { capture = false, passive = false } = {}) {
        addEvent$1(selector, events, callback, { capture, delegate, passive, selfDestruct: true });
    }
    /**
     * Add self-destructing events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {Boolean} [options.passive] Whether to use a passive event.
     */
    function addEventOnce$1(selector, events, callback, { capture = false, passive = false } = {}) {
        addEvent$1(selector, events, callback, { capture, passive, selfDestruct: true });
    }
    /**
     * Clone all events from each node to other nodes.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function cloneEvents$1(selector, otherSelector) {
        const nodes = parseNodes(selector, {
            shadow: true,
            document: true,
            window: true,
        });

        for (const node of nodes) {
            const nodeEvents = events.get(node);

            for (const realEvents of Object.values(nodeEvents)) {
                for (const eventData of realEvents) {
                    addEvent$1(
                        otherSelector,
                        eventData.eventName,
                        eventData.callback,
                        {
                            capture: eventData.capture,
                            delegate: eventData.delegate,
                            passive: eventData.passive,
                            selfDestruct: eventData.selfDestruct,
                        },
                    );
                }
            }
        }
    }
    /**
     * Remove events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [eventNames] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {string} [options.delegate] The delegate selector.
     */
    function removeEvent$1(selector, eventNames, callback, { capture = null, delegate = null } = {}) {
        const nodes = parseNodes(selector, {
            shadow: true,
            document: true,
            window: true,
        });

        let eventLookup;
        if (eventNames) {
            eventNames = parseEvents(eventNames);

            eventLookup = {};

            for (const eventName of eventNames) {
                const realEventName = parseEvent(eventName);

                if (!(realEventName in eventLookup)) {
                    eventLookup[realEventName] = [];
                }

                eventLookup[realEventName].push(eventName);
            }
        }

        for (const node of nodes) {
            if (!events.has(node)) {
                continue;
            }

            const nodeEvents = events.get(node);

            for (const [realEventName, realEvents] of Object.entries(nodeEvents)) {
                if (eventLookup && !(realEventName in eventLookup)) {
                    continue;
                }

                const otherEvents = realEvents.filter((eventData) => {
                    if (eventLookup && !eventLookup[realEventName].some((eventName) => {
                        if (eventName === realEventName) {
                            return true;
                        }

                        const regExp = eventNamespacedRegExp(eventName);

                        return eventData.eventName.match(regExp);
                    })) {
                        return true;
                    }

                    if (callback && callback !== eventData.callback) {
                        return true;
                    }

                    if (delegate && delegate !== eventData.delegate) {
                        return true;
                    }

                    if (capture !== null && capture !== eventData.capture) {
                        return true;
                    }

                    node.removeEventListener(realEventName, eventData.realCallback, eventData.capture);

                    return false;
                });

                if (!otherEvents.length) {
                    delete nodeEvents[realEventName];
                }
            }

            if (!Object.keys(nodeEvents).length) {
                events.delete(node);
            }
        }
    }
    /**
     * Remove delegated events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     */
    function removeEventDelegate$1(selector, events, delegate, callback, { capture = null } = {}) {
        removeEvent$1(selector, events, callback, { capture, delegate });
    }
    /**
     * Trigger events on each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {object} [options] The options to use for the Event.
     * @param {object} [options.data] Additional data to attach to the event.
     * @param {*} [options.detail] Additional details to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     */
    function triggerEvent$1(selector, events, { data = null, detail = null, bubbles = true, cancelable = true } = {}) {
        const nodes = parseNodes(selector, {
            shadow: true,
            document: true,
            window: true,
        });

        events = parseEvents(events);

        for (const event of events) {
            const realEvent = parseEvent(event);

            const eventData = new CustomEvent(realEvent, {
                detail,
                bubbles,
                cancelable,
            });

            if (data) {
                Object.assign(eventData, data);
            }

            if (realEvent !== event) {
                eventData.namespace = event.substring(realEvent.length + 1);
                eventData.namespaceRegExp = eventNamespacedRegExp(event);
            }

            for (const node of nodes) {
                node.dispatchEvent(eventData);
            }
        }
    }
    /**
     * Trigger an event for the first node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} event The event name.
     * @param {object} [options] The options to use for the Event.
     * @param {object} [options.data] Additional data to attach to the event.
     * @param {*} [options.detail] Additional details to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     * @return {Boolean} FALSE if the event was cancelled, otherwise TRUE.
     */
    function triggerOne$1(selector, event, { data = null, detail = null, bubbles = true, cancelable = true } = {}) {
        const node = parseNode(selector, {
            shadow: true,
            document: true,
            window: true,
        });

        const realEvent = parseEvent(event);

        const eventData = new CustomEvent(realEvent, {
            detail,
            bubbles,
            cancelable,
        });

        if (data) {
            Object.assign(eventData, data);
        }

        if (realEvent !== event) {
            eventData.namespace = event.substring(realEvent.length + 1);
            eventData.namespaceRegExp = eventNamespacedRegExp(event);
        }

        return node.dispatchEvent(eventData);
    }

    /**
     * DOM Manipulation
     */

    /**
     * Clone each node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} options The options for cloning the node.
     * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [options.events] Whether to also clone events.
     * @param {Boolean} [options.data] Whether to also clone custom data.
     * @param {Boolean} [options.animations] Whether to also clone animations.
     * @return {array} The cloned nodes.
     */
    function clone$1(selector, { deep = true, events = false, data = false, animations = false } = {}) {
        // ShadowRoot nodes can not be cloned
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
        });

        return nodes.map((node) => {
            const clone = node.cloneNode(deep);

            if (events || data || animations) {
                deepClone(node, clone, { deep, events, data, animations });
            }

            return clone;
        });
    }
    /**
     * Deep clone a single node.
     * @param {Node|HTMLElement|DocumentFragment} node The node.
     * @param {Node|HTMLElement|DocumentFragment} clone The clone.
     * @param {object} options The options for cloning the node.
     * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [options.events] Whether to also clone events.
     * @param {Boolean} [options.data] Whether to also clone custom data.
     * @param {Boolean} [options.animations] Whether to also clone animations.
     */
    function deepClone(node, clone, { deep = true, events: events$1 = false, data: data$1 = false, animations: animations$1 = false } = {}) {
        if (events$1 && events.has(node)) {
            const nodeEvents = events.get(node);

            for (const realEvents of Object.values(nodeEvents)) {
                for (const eventData of realEvents) {
                    addEvent$1(
                        clone,
                        eventData.eventName,
                        eventData.callback,
                        {
                            capture: eventData.capture,
                            delegate: eventData.delegate,
                            selfDestruct: eventData.selfDestruct,
                        },
                    );
                }
            }
        }

        if (data$1 && data.has(node)) {
            const nodeData = data.get(node);
            data.set(clone, { ...nodeData });
        }

        if (animations$1 && animations.has(node)) {
            const nodeAnimations = animations.get(node);

            for (const animation of nodeAnimations) {
                animation.clone(clone);
            }
        }

        if (deep) {
            for (const [i, child] of node.childNodes.entries()) {
                const childClone = clone.childNodes.item(i);
                deepClone(child, childClone, { deep, events: events$1, data: data$1, animations: animations$1 });
            }
        }
    }
    /**
     * Detach each node from the DOM.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The detached nodes.
     */
    function detach$1(selector) {
        // DocumentFragment and ShadowRoot nodes can not be detached
        const nodes = parseNodes(selector, {
            node: true,
        });

        for (const node of nodes) {
            node.remove();
        }

        return nodes;
    }
    /**
     * Remove all children of each node from the DOM.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function empty$1(selector) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        });

        for (const node of nodes) {
            const childNodes = merge([], node.childNodes);

            // Remove descendent elements
            for (const child of childNodes) {
                if (isElement(node) || isFragment(node) || isShadow(node)) {
                    removeNode(child);
                }

                child.remove();
            }

            // Remove ShadowRoot
            if (node.shadowRoot) {
                removeNode(node.shadowRoot);
            }

            // Remove DocumentFragment
            if (node.content) {
                removeNode(node.content);
            }
        }
    }
    /**
     * Remove each node from the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function remove$1(selector) {
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        for (const node of nodes) {
            if (isElement(node) || isFragment(node) || isShadow(node)) {
                removeNode(node);
            }

            // DocumentFragment and ShadowRoot nodes can not be removed
            if (isNode(node)) {
                node.remove();
            }
        }
    }
    /**
     * Remove all data for a single node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node.
     */
    function removeNode(node) {
        if (events.has(node)) {
            const nodeEvents = events.get(node);

            if ('remove' in nodeEvents) {
                const eventData = new CustomEvent('remove', {
                    bubbles: false,
                    cancelable: false,
                });

                node.dispatchEvent(eventData);
            }

            for (const [realEventName, realEvents] of Object.entries(nodeEvents)) {
                for (const eventData of realEvents) {
                    node.removeEventListener(realEventName, eventData.realCallback, { capture: eventData.capture });
                }
            }

            events.delete(node);
        }

        if (queues.has(node)) {
            queues.delete(node);
        }

        if (animations.has(node)) {
            const nodeAnimations = animations.get(node);
            for (const animation of nodeAnimations) {
                animation.stop();
            }
        }

        if (styles.has(node)) {
            styles.delete(node);
        }

        if (data.has(node)) {
            data.delete(node);
        }

        // Remove descendent elements
        const childNodes = merge([], node.children);

        for (const child of childNodes) {
            removeNode(child);
        }

        // Remove ShadowRoot
        if (node.shadowRoot) {
            removeNode(node.shadowRoot);
        }

        // Remove DocumentFragment
        if (node.content) {
            removeNode(node.content);
        }
    }
    /**
     * Replace each other node with nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector string.
     */
    function replaceAll$1(selector, otherSelector) {
        replaceWith$1(otherSelector, selector);
    }
    /**
     * Replace each node with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector or HTML string.
     */
    function replaceWith$1(selector, otherSelector) {
        // DocumentFragment and ShadowRoot nodes can not be removed
        let nodes = parseNodes(selector, {
            node: true,
        });

        // ShadowRoot nodes can not be cloned
        let others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            html: true,
        });

        // Move nodes to a fragment so they don't get removed
        const fragment = createFragment();

        for (const other of others) {
            fragment.insertBefore(other, null);
        }

        others = merge([], fragment.childNodes);

        nodes = nodes.filter((node) =>
            !others.includes(node) &&
            !nodes.some((other) =>
                !other.isSameNode(node) &&
                other.contains(node),
            ),
        );

        for (const [i, node] of nodes.entries()) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            let clones;
            if (i === nodes.length - 1) {
                clones = others;
            } else {
                clones = clone$1(others, {
                    events: true,
                    data: true,
                    animations: true,
                });
            }

            for (const clone of clones) {
                parent.insertBefore(clone, node);
            }
        }

        remove$1(nodes);
    }

    /**
     * DOM Attributes
     */

    /**
     * Get attribute value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [attribute] The attribute name.
     * @return {string|object} The attribute value, or an object containing attributes.
     */
    function getAttribute$1(selector, attribute) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        if (attribute) {
            return node.getAttribute(attribute);
        }

        return Object.fromEntries(
            merge([], node.attributes)
                .map((attribute) => [attribute.nodeName, attribute.nodeValue]),
        );
    }
    /**
     * Get dataset value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The dataset key.
     * @return {*} The dataset value, or an object containing the dataset.
     */
    function getDataset$2(selector, key) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        if (key) {
            key = camelCase(key);

            return parseDataset(node.dataset[key]);
        }

        return Object.fromEntries(
            Object.entries(node.dataset)
                .map(([key, value]) => [key, parseDataset(value)]),
        );
    }
    /**
     * Get the HTML contents of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {string} The HTML contents.
     */
    function getHTML$1(selector) {
        return getProperty$1(selector, 'innerHTML');
    }
    /**
     * Get a property value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @return {string} The property value.
     */
    function getProperty$1(selector, property) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node[property];
    }
    /**
     * Get the text contents of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {string} The text contents.
     */
    function getText$1(selector) {
        return getProperty$1(selector, 'textContent');
    }
    /**
     * Get the value property of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {string} The value.
     */
    function getValue$1(selector) {
        return getProperty$1(selector, 'value');
    }
    /**
     * Remove an attribute from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     */
    function removeAttribute$1(selector, attribute) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            node.removeAttribute(attribute);
        }
    }
    /**
     * Remove a dataset value from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} key The dataset key.
     */
    function removeDataset$1(selector, key) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            key = camelCase(key);

            delete node.dataset[key];
        }
    }
    /**
     * Remove a property from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} property The property name.
     */
    function removeProperty$1(selector, property) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            delete node[property];
        }
    }
    /**
     * Set an attribute value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|object} attribute The attribute name, or an object containing attributes.
     * @param {string} [value] The attribute value.
     */
    function setAttribute$1(selector, attribute, value) {
        const nodes = parseNodes(selector);

        const attributes = parseData(attribute, value);

        for (const [key, value] of Object.entries(attributes)) {
            for (const node of nodes) {
                node.setAttribute(key, value);
            }
        }
    }
    /**
     * Set a dataset value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|object} key The dataset key, or an object containing dataset values.
     * @param {*} [value] The dataset value.
     */
    function setDataset$1(selector, key, value) {
        const nodes = parseNodes(selector);

        const dataset = parseData(key, value, { json: true });

        for (let [key, value] of Object.entries(dataset)) {
            key = camelCase(key);
            for (const node of nodes) {
                node.dataset[key] = value;
            }
        }
    }
    /**
     * Set the HTML contents of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} html The HTML contents.
     */
    function setHTML$1(selector, html) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            const childNodes = merge([], node.children);

            for (const child of childNodes) {
                removeNode(child);
            }

            // Remove ShadowRoot
            if (node.shadowRoot) {
                removeNode(node.shadowRoot);
            }

            // Remove DocumentFragment
            if (node.content) {
                removeNode(node.content);
            }

            node.innerHTML = html;
        }
    }
    /**
     * Set a property value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|object} property The property name, or an object containing properties.
     * @param {string} [value] The property value.
     */
    function setProperty$1(selector, property, value) {
        const nodes = parseNodes(selector);

        const properties = parseData(property, value);

        for (const [key, value] of Object.entries(properties)) {
            for (const node of nodes) {
                node[key] = value;
            }
        }
    }
    /**
     * Set the text contents of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} text The text contents.
     */
    function setText$1(selector, text) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            const childNodes = merge([], node.children);

            for (const child of childNodes) {
                removeNode(child);
            }

            // Remove ShadowRoot
            if (node.shadowRoot) {
                removeNode(node.shadowRoot);
            }

            // Remove DocumentFragment
            if (node.content) {
                removeNode(node.content);
            }

            node.textContent = text;
        }
    }
    /**
     * Set the value property of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} value The value.
     */
    function setValue$1(selector, value) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            node.value = value;
        }
    }

    /**
     * DOM Data
     */

    /**
     * Clone custom data from each node to each other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function cloneData$1(selector, otherSelector) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        });

        const others = parseNodes(otherSelector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        });

        for (const node of nodes) {
            if (!data.has(node)) {
                continue;
            }

            const nodeData = data.get(node);
            setData$1(others, { ...nodeData });
        }
    }
    /**
     * Get custom data for the first node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @return {*} The data value.
     */
    function getData$1(selector, key) {
        const node = parseNode(selector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        });

        if (!node || !data.has(node)) {
            return;
        }

        const nodeData = data.get(node);

        return key ?
            nodeData[key] :
            nodeData;
    }
    /**
     * Remove custom data from each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     */
    function removeData$1(selector, key) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        });

        for (const node of nodes) {
            if (!data.has(node)) {
                continue;
            }

            const nodeData = data.get(node);

            if (key) {
                delete nodeData[key];
            }

            if (!key || !Object.keys(nodeData).length) {
                data.delete(node);
            }
        }
    }
    /**
     * Set custom data for each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     */
    function setData$1(selector, key, value) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        });

        const newData = parseData(key, value);

        for (const node of nodes) {
            if (!data.has(node)) {
                data.set(node, {});
            }

            const nodeData = data.get(node);

            Object.assign(nodeData, newData);
        }
    }

    /**
     * DOM Styles
     */

    /**
     * Add classes to each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    function addClass$1(selector, ...classes) {
        const nodes = parseNodes(selector);

        classes = parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            node.classList.add(...classes);
        }
    }
    /**
     * Get computed CSS style value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [style] The CSS style name.
     * @return {string|object} The CSS style value, or an object containing the computed CSS style properties.
     */
    function css$1(selector, style) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        if (!styles.has(node)) {
            styles.set(
                node,
                getWindow().getComputedStyle(node),
            );
        }

        const nodeStyles = styles.get(node);

        if (!style) {
            return { ...nodeStyles };
        }

        style = kebabCase(style);

        return nodeStyles.getPropertyValue(style);
    }
    /**
     * Get style properties for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [style] The style name.
     * @return {string|object} The style value, or an object containing the style properties.
     */
    function getStyle$1(selector, style) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        if (style) {
            style = kebabCase(style);

            return node.style[style];
        }

        const styles = {};

        for (const style of node.style) {
            styles[style] = node.style[style];
        }

        return styles;
    }
    /**
     * Hide each node from display.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function hide$1(selector) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            node.style.setProperty('display', 'none');
        }
    }
    /**
     * Remove classes from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    function removeClass$1(selector, ...classes) {
        const nodes = parseNodes(selector);

        classes = parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            node.classList.remove(...classes);
        }
    }
    /**
     * Remove a style property from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector
     * @param {string} style The style name.
     */
    function removeStyle$1(selector, style) {
        const nodes = parseNodes(selector);

        style = kebabCase(style);

        for (const node of nodes) {
            node.style.removeProperty(style);
        }
    }
    /**
     * Set style properties for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|object} style The style name, or an object containing styles.
     * @param {string} [value] The style value.
     * @param {object} [options] The options for setting the style.
     * @param {Boolean} [options.important] Whether the style should be !important.
     */
    function setStyle$1(selector, style, value, { important = false } = {}) {
        const nodes = parseNodes(selector);

        const styles = parseData(style, value);

        for (let [style, value] of Object.entries(styles)) {
            style = kebabCase(style);

            // if value is numeric and property doesn't support number values, add px
            if (value && isNumeric(value) && !CSS.supports(style, value)) {
                value += 'px';
            }

            for (const node of nodes) {
                node.style.setProperty(
                    style,
                    value,
                    important ?
                        'important' :
                        '',
                );
            }
        }
    }
    /**
     * Display each hidden node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function show$1(selector) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            node.style.setProperty('display', '');
        }
    }
    /**
     * Toggle the visibility of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function toggle$1(selector) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            node.style.setProperty(
                'display',
                node.style.display === 'none' ?
                    '' :
                    'none',
            );
        }
    }
    /**
     * Toggle classes for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    function toggleClass$1(selector, ...classes) {
        const nodes = parseNodes(selector);

        classes = parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            for (const className of classes) {
                node.classList.toggle(className);
            }
        }
    }

    /**
     * DOM Position
     */

    /**
     * Get the X,Y co-ordinates for the center of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for calculating the co-ordinates.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {object} An object with the x and y co-ordinates.
     */
    function center$1(selector, { offset = false } = {}) {
        const nodeBox = rect$1(selector, { offset });

        if (!nodeBox) {
            return;
        }

        return {
            x: nodeBox.left + nodeBox.width / 2,
            y: nodeBox.top + nodeBox.height / 2,
        };
    }
    /**
     * Contrain each node to a container node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} containerSelector The container node, or a query selector string.
     */
    function constrain$1(selector, containerSelector) {
        const containerBox = rect$1(containerSelector);

        if (!containerBox) {
            return;
        }

        const nodes = parseNodes(selector);

        const context = getContext();
        const window = getWindow();
        const getScrollX = (_) => context.documentElement.scrollHeight > window.outerHeight;
        const getScrollY = (_) => context.documentElement.scrollWidth > window.outerWidth;

        const preScrollX = getScrollX();
        const preScrollY = getScrollY();

        for (const node of nodes) {
            const nodeBox = rect$1(node);

            if (nodeBox.height > containerBox.height) {
                node.style.setProperty('height', `${containerBox.height}px`);
            }

            if (nodeBox.width > containerBox.width) {
                node.style.setProperty('width', `${containerBox.width}px`);
            }

            let leftOffset;
            if (nodeBox.left - containerBox.left < 0) {
                leftOffset = nodeBox.left - containerBox.left;
            } else if (nodeBox.right - containerBox.right > 0) {
                leftOffset = nodeBox.right - containerBox.right;
            }

            if (leftOffset) {
                const oldLeft = css$1(node, 'left');
                const trueLeft = oldLeft && oldLeft !== 'auto' ? parseFloat(oldLeft) : 0;
                node.style.setProperty('left', `${trueLeft - leftOffset}px`);
            }

            let topOffset;
            if (nodeBox.top - containerBox.top < 0) {
                topOffset = nodeBox.top - containerBox.top;
            } else if (nodeBox.bottom - containerBox.bottom > 0) {
                topOffset = nodeBox.bottom - containerBox.bottom;
            }

            if (topOffset) {
                const oldTop = css$1(node, 'top');
                const trueTop = oldTop && oldTop !== 'auto' ? parseFloat(oldTop) : 0;
                node.style.setProperty('top', `${trueTop - topOffset}px`);
            }

            if (css$1(node, 'position') === 'static') {
                node.style.setProperty('position', 'relative');
            }
        }

        const postScrollX = getScrollX();
        const postScrollY = getScrollY();

        if (preScrollX !== postScrollX || preScrollY !== postScrollY) {
            constrain$1(nodes, containerSelector);
        }
    }
    /**
     * Get the distance of a node to an X,Y position in the Window.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the distance.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {number} The distance to the element.
     */
    function distTo$1(selector, x, y, { offset = false } = {}) {
        const nodeCenter = center$1(selector, { offset });

        if (!nodeCenter) {
            return;
        }

        return dist(nodeCenter.x, nodeCenter.y, x, y);
    }
    /**
     * Get the distance between two nodes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
     * @return {number} The distance between the nodes.
     */
    function distToNode$1(selector, otherSelector) {
        const otherCenter = center$1(otherSelector);

        if (!otherCenter) {
            return;
        }

        return distTo$1(selector, otherCenter.x, otherCenter.y);
    }
    /**
     * Get the nearest node to an X,Y position in the Window.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the distance.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {HTMLElement} The nearest node.
     */
    function nearestTo$1(selector, x, y, { offset = false } = {}) {
        let closest;
        let closestDistance = Number.MAX_VALUE;

        const nodes = parseNodes(selector);

        for (const node of nodes) {
            const dist = distTo$1(node, x, y, { offset });
            if (dist && dist < closestDistance) {
                closestDistance = dist;
                closest = node;
            }
        }

        return closest;
    }
    /**
     * Get the nearest node to another node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
     * @return {HTMLElement} The nearest node.
     */
    function nearestToNode$1(selector, otherSelector) {
        const otherCenter = center$1(otherSelector);

        if (!otherCenter) {
            return;
        }

        return nearestTo$1(selector, otherCenter.x, otherCenter.y);
    }
    /**
     * Get the percentage of an X co-ordinate relative to a node's width.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {object} [options] The options for calculating the percentage.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
     * @return {number} The percent.
     */
    function percentX$1(selector, x, { offset = false, clamp = true } = {}) {
        const nodeBox = rect$1(selector, { offset });

        if (!nodeBox) {
            return;
        }

        const percent = (x - nodeBox.left) /
            nodeBox.width *
            100;

        return clamp ?
            clampPercent(percent) :
            percent;
    }
    /**
     * Get the percentage of a Y co-ordinate relative to a node's height.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the percentage.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
     * @return {number} The percent.
     */
    function percentY$1(selector, y, { offset = false, clamp = true } = {}) {
        const nodeBox = rect$1(selector, { offset });

        if (!nodeBox) {
            return;
        }

        const percent = (y - nodeBox.top) /
            nodeBox.height *
            100;

        return clamp ?
            clampPercent(percent) :
            percent;
    }
    /**
     * Get the position of the first node relative to the Window or Document.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for calculating the position.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {object} An object with the X and Y co-ordinates.
     */
    function position$1(selector, { offset = false } = {}) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        const result = {
            x: node.offsetLeft,
            y: node.offsetTop,
        };

        if (offset) {
            let offsetParent = node;

            while (offsetParent = offsetParent.offsetParent) {
                result.x += offsetParent.offsetLeft;
                result.y += offsetParent.offsetTop;
            }
        }

        return result;
    }
    /**
     * Get the computed bounding rectangle of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for calculating the bounding rectangle.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {DOMRect} The computed bounding rectangle.
     */
    function rect$1(selector, { offset = false } = {}) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        const result = node.getBoundingClientRect();

        if (offset) {
            const window = getWindow();
            result.x += window.scrollX;
            result.y += window.scrollY;
        }

        return result;
    }

    /**
     * DOM Scroll
     */

    /**
     * Get the scroll X position of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {number} The scroll X position.
     */
    function getScrollX$1(selector) {
        const node = parseNode(selector, {
            document: true,
            window: true,
        });

        if (!node) {
            return;
        }

        if (isWindow(node)) {
            return node.scrollX;
        }

        if (isDocument(node)) {
            return node.scrollingElement.scrollLeft;
        }

        return node.scrollLeft;
    }
    /**
     * Get the scroll Y position of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {number} The scroll Y position.
     */
    function getScrollY$1(selector) {
        const node = parseNode(selector, {
            document: true,
            window: true,
        });

        if (!node) {
            return;
        }

        if (isWindow(node)) {
            return node.scrollY;
        }

        if (isDocument(node)) {
            return node.scrollingElement.scrollTop;
        }

        return node.scrollTop;
    }
    /**
     * Scroll each node to an X,Y position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    function setScroll$1(selector, x, y) {
        const nodes = parseNodes(selector, {
            document: true,
            window: true,
        });

        for (const node of nodes) {
            if (isWindow(node)) {
                node.scroll(x, y);
            } else if (isDocument(node)) {
                node.scrollingElement.scrollLeft = x;
                node.scrollingElement.scrollTop = y;
            } else {
                node.scrollLeft = x;
                node.scrollTop = y;
            }
        }
    }
    /**
     * Scroll each node to an X position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     */
    function setScrollX$1(selector, x) {
        const nodes = parseNodes(selector, {
            document: true,
            window: true,
        });

        for (const node of nodes) {
            if (isWindow(node)) {
                node.scroll(x, node.scrollY);
            } else if (isDocument(node)) {
                node.scrollingElement.scrollLeft = x;
            } else {
                node.scrollLeft = x;
            }
        }
    }
    /**
     * Scroll each node to a Y position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} y The scroll Y position.
     */
    function setScrollY$1(selector, y) {
        const nodes = parseNodes(selector, {
            document: true,
            window: true,
        });

        for (const node of nodes) {
            if (isWindow(node)) {
                node.scroll(node.scrollX, y);
            } else if (isDocument(node)) {
                node.scrollingElement.scrollTop = y;
            } else {
                node.scrollTop = y;
            }
        }
    }

    /**
     * DOM Size
     */

    /**
     * Get the computed height of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for calculating the height.
     * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
     * @param {Boolean} [options.outer] Whether to use the window outer height.
     * @return {number} The height.
     */
    function height$1(selector, { boxSize = PADDING_BOX, outer = false } = {}) {
        let node = parseNode(selector, {
            document: true,
            window: true,
        });

        if (!node) {
            return;
        }

        if (isWindow(node)) {
            return outer ?
                node.outerHeight :
                node.innerHeight;
        }

        if (isDocument(node)) {
            node = node.documentElement;
        }

        if (boxSize >= SCROLL_BOX) {
            return node.scrollHeight;
        }

        let result = node.clientHeight;

        if (boxSize <= CONTENT_BOX) {
            result -= parseInt(css$1(node, 'padding-top'));
            result -= parseInt(css$1(node, 'padding-bottom'));
        }

        if (boxSize >= BORDER_BOX) {
            result += parseInt(css$1(node, 'border-top-width'));
            result += parseInt(css$1(node, 'border-bottom-width'));
        }

        if (boxSize >= MARGIN_BOX) {
            result += parseInt(css$1(node, 'margin-top'));
            result += parseInt(css$1(node, 'margin-bottom'));
        }

        return result;
    }
    /**
     * Get the computed width of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for calculating the width.
     * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
     * @param {Boolean} [options.outer] Whether to use the window outer width.
     * @return {number} The width.
     */
    function width$1(selector, { boxSize = PADDING_BOX, outer = false } = {}) {
        let node = parseNode(selector, {
            document: true,
            window: true,
        });

        if (!node) {
            return;
        }

        if (isWindow(node)) {
            return outer ?
                node.outerWidth :
                node.innerWidth;
        }

        if (isDocument(node)) {
            node = node.documentElement;
        }

        if (boxSize >= SCROLL_BOX) {
            return node.scrollWidth;
        }

        let result = node.clientWidth;

        if (boxSize <= CONTENT_BOX) {
            result -= parseInt(css$1(node, 'padding-left'));
            result -= parseInt(css$1(node, 'padding-right'));
        }

        if (boxSize >= BORDER_BOX) {
            result += parseInt(css$1(node, 'border-left-width'));
            result += parseInt(css$1(node, 'border-right-width'));
        }

        if (boxSize >= MARGIN_BOX) {
            result += parseInt(css$1(node, 'margin-left'));
            result += parseInt(css$1(node, 'margin-right'));
        }

        return result;
    }

    /**
     * DOM Cookie
     */

    /**
     * Get a cookie value.
     * @param {string} name The cookie name.
     * @return {*} The cookie value.
     */
    function getCookie(name) {
        const cookie = getContext().cookie
            .split(';')
            .find((cookie) =>
                cookie
                    .trimStart()
                    .substring(0, name.length) === name,
            )
            .trimStart();

        if (!cookie) {
            return null;
        }

        return decodeURIComponent(
            cookie.substring(name.length + 1),
        );
    }
    /**
     * Remove a cookie.
     * @param {string} name The cookie name.
     * @param {object} [options] The options to use for the cookie.
     * @param {string} [options.path] The cookie path.
     * @param {Boolean} [options.secure] Whether the cookie is secure.
     */
    function removeCookie(name, { path = null, secure = false } = {}) {
        if (!name) {
            return;
        }

        let cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;

        if (path) {
            cookie += `;path=${path}`;
        }

        if (secure) {
            cookie += ';secure';
        }

        getContext().cookie = cookie;
    }
    /**
     * Set a cookie value.
     * @param {string} name The cookie name.
     * @param {*} value The cookie value.
     * @param {object} [options] The options to use for the cookie.
     * @param {number} [options.expires] The number of seconds until the cookie will expire.
     * @param {string} [options.path] The path to use for the cookie.
     * @param {Boolean} [options.secure] Whether the cookie is secure.
     */
    function setCookie(name, value, { expires = null, path = null, secure = false } = {}) {
        if (!name) {
            return;
        }

        let cookie = `${name}=${value}`;

        if (expires) {
            const date = new Date;
            date.setTime(
                date.getTime() +
                expires * 1000,
            );
            cookie += `;expires=${date.toUTCString()}`;
        }

        if (path) {
            cookie += `;path=${path}`;
        }

        if (secure) {
            cookie += ';secure';
        }

        getContext().cookie = cookie;
    }

    /**
     * DOM Events
     */

    /**
     * Trigger a blur event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function blur$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        node.blur();
    }
    /**
     * Trigger a click event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function click$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        node.click();
    }
    /**
     * Trigger a focus event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function focus$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        node.focus();
    }
    /**
     * Add a function to the ready queue.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    function ready(callback) {
        if (getContext().readyState === 'complete') {
            callback();
        } else {
            getWindow().addEventListener('DOMContentLoaded', callback, { once: true });
        }
    }

    /**
     * DOM Move
     */

    /**
     * Insert each other node after each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function after$1(selector, otherSelector) {
        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        // ShadowRoot nodes can not be moved
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            html: true,
        }).reverse();

        for (const [i, node] of nodes.entries()) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            let clones;
            if (i === nodes.length - 1) {
                clones = others;
            } else {
                clones = clone$1(others, {
                    events: true,
                    data: true,
                    animations: true,
                });
            }

            for (const clone of clones) {
                parent.insertBefore(clone, node.nextSibling);
            }
        }
    }
    /**
     * Append each other node to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function append$1(selector, otherSelector) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        });

        // ShadowRoot nodes can not be moved
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            html: true,
        });

        for (const [i, node] of nodes.entries()) {
            let clones;
            if (i === nodes.length - 1) {
                clones = others;
            } else {
                clones = clone$1(others, {
                    events: true,
                    data: true,
                    animations: true,
                });
            }

            for (const clone of clones) {
                node.insertBefore(clone, null);
            }
        }
    }
    /**
     * Append each node to each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function appendTo$1(selector, otherSelector) {
        append$1(otherSelector, selector);
    }
    /**
     * Insert each other node before each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function before$1(selector, otherSelector) {
        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        // ShadowRoot nodes can not be moved
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            html: true,
        });

        for (const [i, node] of nodes.entries()) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            let clones;
            if (i === nodes.length - 1) {
                clones = others;
            } else {
                clones = clone$1(others, {
                    events: true,
                    data: true,
                    animations: true,
                });
            }

            for (const clone of clones) {
                parent.insertBefore(clone, node);
            }
        }
    }
    /**
     * Insert each node after each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function insertAfter$1(selector, otherSelector) {
        after$1(otherSelector, selector);
    }
    /**
     * Insert each node before each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function insertBefore$1(selector, otherSelector) {
        before$1(otherSelector, selector);
    }
    /**
     * Prepend each other node to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} otherSelector The other node(s), or a query selector or HTML string.
     */
    function prepend$1(selector, otherSelector) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        });

        // ShadowRoot nodes can not be moved
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            html: true,
        });

        for (const [i, node] of nodes.entries()) {
            const firstChild = node.firstChild;

            let clones;
            if (i === nodes.length - 1) {
                clones = others;
            } else {
                clones = clone$1(others, {
                    events: true,
                    data: true,
                    animations: true,
                });
            }

            for (const clone of clones) {
                node.insertBefore(clone, firstChild);
            }
        }
    }
    /**
     * Prepend each node to each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function prependTo$1(selector, otherSelector) {
        prepend$1(otherSelector, selector);
    }

    /**
     * DOM Wrap
     */

    /**
     * Unwrap each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     */
    function unwrap$1(selector, nodeFilter) {
        // DocumentFragment and ShadowRoot nodes can not be unwrapped
        const nodes = parseNodes(selector, {
            node: true,
        });

        nodeFilter = parseFilter(nodeFilter);

        const parents = [];

        for (const node of nodes) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            if (parents.includes(parent)) {
                continue;
            }

            if (!nodeFilter(parent)) {
                continue;
            }

            parents.push(parent);
        }

        for (const parent of parents) {
            const outerParent = parent.parentNode;

            if (!outerParent) {
                continue;
            }

            const children = merge([], parent.childNodes);

            for (const child of children) {
                outerParent.insertBefore(child, parent);
            }
        }

        remove$1(parents);
    }
    /**
     * Wrap each nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function wrap$1(selector, otherSelector) {
        // DocumentFragment and ShadowRoot nodes can not be wrapped
        const nodes = parseNodes(selector, {
            node: true,
        });

        // ShadowRoot nodes can not be cloned
        const others = parseNodes(otherSelector, {
            fragment: true,
            html: true,
        });

        for (const node of nodes) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            const clones = clone$1(others, {
                events: true,
                data: true,
                animations: true,
            });

            const firstClone = clones.slice().shift();

            const firstCloneNode = isFragment(firstClone) ?
                firstClone.firstChild :
                firstClone;
            const deepest = merge([], firstCloneNode.querySelectorAll('*')).find((node) => !node.childElementCount) || firstCloneNode;

            for (const clone of clones) {
                parent.insertBefore(clone, node);
            }

            deepest.insertBefore(node, null);
        }
    }
    /**
     * Wrap all nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function wrapAll$1(selector, otherSelector) {
        // DocumentFragment and ShadowRoot nodes can not be wrapped
        const nodes = parseNodes(selector, {
            node: true,
        });

        // ShadowRoot nodes can not be cloned
        const others = parseNodes(otherSelector, {
            fragment: true,
            html: true,
        });

        const clones = clone$1(others, {
            events: true,
            data: true,
            animations: true,
        });

        const firstNode = nodes[0];

        if (!firstNode) {
            return;
        }

        const parent = firstNode.parentNode;

        if (!parent) {
            return;
        }

        const firstClone = clones[0];

        const firstCloneNode = isFragment(firstClone) ?
            firstClone.firstChild :
            firstClone;
        const deepest = merge([], firstCloneNode.querySelectorAll('*')).find((node) => !node.childElementCount) || firstCloneNode;

        for (const clone of clones) {
            parent.insertBefore(clone, firstNode);
        }

        for (const node of nodes) {
            deepest.insertBefore(node, null);
        }
    }
    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function wrapInner$1(selector, otherSelector) {
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        // ShadowRoot nodes can not be cloned
        const others = parseNodes(otherSelector, {
            fragment: true,
            html: true,
        });

        for (const node of nodes) {
            const children = merge([], node.childNodes);

            const clones = clone$1(others, {
                events: true,
                data: true,
                animations: true,
            });

            const firstClone = clones.slice().shift();

            const firstCloneNode = isFragment(firstClone) ?
                firstClone.firstChild :
                firstClone;
            const deepest = merge([], firstCloneNode.querySelectorAll('*')).find((node) => !node.childElementCount) || firstCloneNode;

            for (const clone of clones) {
                node.insertBefore(clone, null);
            }

            for (const child of children) {
                deepest.insertBefore(child, null);
            }
        }
    }

    /**
     * QuerySet Animate
     */

    /**
     * Add an animation to the queue for each node.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function animate(callback, { queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            animate$1(node, callback, options),
        { queueName },
        );
    }
    /**
     * Stop all animations and clear the queue of each node.
     * @param {object} [options] The options for stopping the animation.
     * @param {Boolean} [options.finish=true] Whether to complete all current animations.
     * @return {QuerySet} The QuerySet object.
     */
    function stop({ finish = true } = {}) {
        this.clearQueue();
        stop$1(this, { finish });

        return this;
    }

    /**
     * QuerySet Animations
     */

    /**
     * Add a drop in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=top] The direction to drop the node from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function dropIn({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            dropIn$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a drop out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=top] The direction to drop the node to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function dropOut({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            dropOut$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a fade in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function fadeIn({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            fadeIn$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a fade out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function fadeOut({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            fadeOut$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a rotate in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {number} [options.z=0] The amount to rotate on the Z-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function rotateIn({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            rotateIn$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a rotate out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {number} [options.z=0] The amount to rotate on the Z-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function rotateOut({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            rotateOut$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a slide in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=bottom] The direction to slide from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function slideIn({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            slideIn$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a slide out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=bottom] The direction to slide to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function slideOut({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            slideOut$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a squeeze in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=bottom] The direction to squeeze from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function squeezeIn({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            squeezeIn$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a squeeze out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=bottom] The direction to squeeze to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function squeezeOut({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            squeezeOut$1(node, options),
        { queueName },
        );
    }

    /**
     * QuerySet Attributes
     */

    /**
     * Get attribute value(s) for the first node.
     * @param {string} [attribute] The attribute name.
     * @return {string} The attribute value.
     */
    function getAttribute(attribute) {
        return getAttribute$1(this, attribute);
    }
    /**
     * Get dataset value(s) for the first node.
     * @param {string} [key] The dataset key.
     * @return {*} The dataset value, or an object containing the dataset.
     */
    function getDataset$1(key) {
        return getDataset$2(this, key);
    }
    /**
     * Get the HTML contents of the first node.
     * @return {string} The HTML contents.
     */
    function getHTML() {
        return getHTML$1(this);
    }
    /**
     * Get a property value for the first node.
     * @param {string} property The property name.
     * @return {string} The property value.
     */
    function getProperty(property) {
        return getProperty$1(this, property);
    }
    /**
     * Get the text contents of the first node.
     * @return {string} The text contents.
     */
    function getText() {
        return getText$1(this);
    }
    /**
     * Get the value property of the first node.
     * @return {string} The value.
     */
    function getValue() {
        return getValue$1(this);
    }
    /**
     * Remove an attribute from each node.
     * @param {string} attribute The attribute name.
     * @return {QuerySet} The QuerySet object.
     */
    function removeAttribute(attribute) {
        removeAttribute$1(this, attribute);

        return this;
    }
    /**
     * Remove a dataset value from each node.
     * @param {string} key The dataset key.
     * @return {QuerySet} The QuerySet object.
     */
    function removeDataset(key) {
        removeDataset$1(this, key);

        return this;
    }
    /**
     * Remove a property from each node.
     * @param {string} property The property name.
     * @return {QuerySet} The QuerySet object.
     */
    function removeProperty(property) {
        removeProperty$1(this, property);

        return this;
    }
    /**
     * Set an attribute value for each node.
     * @param {string|object} attribute The attribute name, or an object containing attributes.
     * @param {string} [value] The attribute value.
     * @return {QuerySet} The QuerySet object.
     */
    function setAttribute(attribute, value) {
        setAttribute$1(this, attribute, value);

        return this;
    }
    /**
     * Set a dataset value for each node.
     * @param {string|object} key The dataset key, or an object containing dataset values.
     * @param {*} [value] The dataset value.
     * @return {QuerySet} The QuerySet object.
     */
    function setDataset(key, value) {
        setDataset$1(this, key, value);

        return this;
    }
    /**
     * Set the HTML contents of each node.
     * @param {string} html The HTML contents.
     * @return {QuerySet} The QuerySet object.
     */
    function setHTML(html) {
        setHTML$1(this, html);

        return this;
    }
    /**
     * Set a property value for each node.
     * @param {string|object} property The property name, or an object containing properties.
     * @param {string} [value] The property value.
     * @return {QuerySet} The QuerySet object.
     */
    function setProperty(property, value) {
        setProperty$1(this, property, value);

        return this;
    }
    /**
     * Set the text contents of each node.
     * @param {string} text The text contents.
     * @return {QuerySet} The QuerySet object.
     */
    function setText(text) {
        setText$1(this, text);

        return this;
    }
    /**
     * Set the value property of each node.
     * @param {string} value The value.
     * @return {QuerySet} The QuerySet object.
     */
    function setValue(value) {
        setValue$1(this, value);

        return this;
    }

    /**
     * QuerySet Data
     */

    /**
     * Clone custom data from each node to each other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function cloneData(otherSelector) {
        cloneData$1(this, otherSelector);

        return this;
    }
    /**
     * Get custom data for the first node.
     * @param {string} [key] The data key.
     * @return {*} The data value.
     */
    function getData(key) {
        return getData$1(this, key);
    }
    /**
     * Remove custom data from each node.
     * @param {string} [key] The data key.
     * @return {QuerySet} The QuerySet object.
     */
    function removeData(key) {
        removeData$1(this, key);

        return this;
    }
    /**
     * Set custom data for each node.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     * @return {QuerySet} The QuerySet object.
     */
    function setData(key, value) {
        setData$1(this, key, value);

        return this;
    }

    /**
     * QuerySet Position
     */

    /**
     * Get the X,Y co-ordinates for the center of the first node.
     * @param {object} [options] The options for calculating the co-ordinates.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {object} An object with the x and y co-ordinates.
     */
    function center({ offset = false } = {}) {
        return center$1(this, { offset });
    }
    /**
     * Contrain each node to a container node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} container The container node, or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function constrain(container) {
        constrain$1(this, container);

        return this;
    }
    /**
     * Get the distance of a node to an X,Y position in the Window.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the distance.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {number} The distance to the node.
     */
    function distTo(x, y, { offset = false } = {}) {
        return distTo$1(this, x, y, { offset });
    }
    /**
     * Get the distance between two nodes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
     * @return {number} The distance between the nodes.
     */
    function distToNode(otherSelector) {
        return distToNode$1(this, otherSelector);
    }
    /**
     * Get the nearest node to an X,Y position in the Window.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the distance.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {QuerySet} A new QuerySet object.
     */
    function nearestTo(x, y, { offset = false } = {}) {
        const node = nearestTo$1(this, x, y, { offset });

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Get the nearest node to another node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
     * @return {QuerySet} A new QuerySet object.
     */
    function nearestToNode(otherSelector) {
        const node = nearestToNode$1(this, otherSelector);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Get the percentage of an X co-ordinate relative to a node's width.
     * @param {number} x The X co-ordinate.
     * @param {object} [options] The options for calculating the percentage.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
     * @return {number} The percent.
     */
    function percentX(x, { offset = false, clamp = true } = {}) {
        return percentX$1(this, x, { offset, clamp });
    }
    /**
     * Get the percentage of a Y co-ordinate relative to a node's height.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the percentage.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
     * @return {number} The percent.
     */
    function percentY(y, { offset = false, clamp = true } = {}) {
        return percentY$1(this, y, { offset, clamp });
    }
    /**
     * Get the position of the first node relative to the Window or Document.
     * @param {object} [options] The options for calculating the position.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {object} An object with the x and y co-ordinates.
     */
    function position({ offset = false } = {}) {
        return position$1(this, { offset });
    }
    /**
     * Get the computed bounding rectangle of the first node.
     * @param {object} [options] The options for calculating the bounding rectangle.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {DOMRect} The computed bounding rectangle.
     */
    function rect({ offset = false } = {}) {
        return rect$1(this, { offset });
    }

    /**
     * QuerySet Scroll
     */

    /**
     * Get the scroll X position of the first node.
     * @return {number} The scroll X position.
     */
    function getScrollX() {
        return getScrollX$1(this);
    }
    /**
     * Get the scroll Y position of the first node.
     * @return {number} The scroll Y position.
     */
    function getScrollY() {
        return getScrollY$1(this);
    }
    /**
     * Scroll each node to an X,Y position.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     * @return {QuerySet} The QuerySet object.
     */
    function setScroll(x, y) {
        setScroll$1(this, x, y);

        return this;
    }
    /**
     * Scroll each node to an X position.
     * @param {number} x The scroll X position.
     * @return {QuerySet} The QuerySet object.
     */
    function setScrollX(x) {
        setScrollX$1(this, x);

        return this;
    }
    /**
     * Scroll each node to a Y position.
     * @param {number} y The scroll Y position.
     * @return {QuerySet} The QuerySet object.
     */
    function setScrollY(y) {
        setScrollY$1(this, y);

        return this;
    }

    /**
     * QuerySet Size
     */

    /**
     * Get the computed height of the first node.
     * @param {object} [options] The options for calculating the height.
     * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
     * @param {Boolean} [options.outer] Whether to use the window outer height.
     * @return {number} The height.
     */
    function height({ boxSize = PADDING_BOX, outer = false } = {}) {
        return height$1(this, { boxSize, outer });
    }
    /**
     * Get the computed width of the first node.
     * @param {object} [options] The options for calculating the width.
     * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
     * @param {Boolean} [options.outer] Whether to use the window outer width.
     * @return {number} The width.
     */
    function width({ boxSize = PADDING_BOX, outer = false } = {}) {
        return width$1(this, { boxSize, outer });
    }

    /**
     * QuerySet Styles
     */

    /**
     * Add classes to each node.
     * @param {...string|string[]} classes The classes.
     * @return {QuerySet} The QuerySet object.
     */
    function addClass(...classes) {
        addClass$1(this, ...classes);

        return this;
    }
    /**
     * Get computed CSS style values for the first node.
     * @param {string} [style] The CSS style name.
     * @return {string|object} The CSS style value, or an object containing the computed CSS style properties.
     */
    function css(style) {
        return css$1(this, style);
    }
    /**
     * Get style properties for the first node.
     * @param {string} [style] The style name.
     * @return {string|object} The style value, or an object containing the style properties.
     */
    function getStyle(style) {
        return getStyle$1(this, style);
    }
    /**
     * Hide each node from display.
     * @return {QuerySet} The QuerySet object.
     */
    function hide() {
        hide$1(this);

        return this;
    }
    /**
     * Remove classes from each node.
     * @param {...string|string[]} classes The classes.
     * @return {QuerySet} The QuerySet object.
     */
    function removeClass(...classes) {
        removeClass$1(this, ...classes);

        return this;
    }
    /**
     * Remove a style property from each node.
     * @param {string} style The style name.
     * @return {QuerySet} The QuerySet object.
     */
    function removeStyle(style) {
        removeStyle$1(this, style);

        return this;
    }
    /**
     * Set style properties for each node.
     * @param {string|object} style The style name, or an object containing styles.
     * @param {string} [value] The style value.
     * @param {object} [options] The options for setting the style.
     * @param {Boolean} [options.important] Whether the style should be !important.
     * @return {QuerySet} The QuerySet object.
     */
    function setStyle(style, value, { important = false } = {}) {
        setStyle$1(this, style, value, { important });

        return this;
    }
    /**
     * Display each hidden node.
     * @return {QuerySet} The QuerySet object.
     */
    function show() {
        show$1(this);

        return this;
    }
    /**
     * Toggle the visibility of each node.
     * @return {QuerySet} The QuerySet object.
     */
    function toggle() {
        toggle$1(this);

        return this;
    }
    /**
     * Toggle classes for each node.
     * @param {...string|string[]} classes The classes.
     * @return {QuerySet} The QuerySet object.
     */
    function toggleClass(...classes) {
        toggleClass$1(this, ...classes);

        return this;
    }

    /**
     * QuerySet Event Handlers
     */

    /**
     * Add an event to each node.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {Boolean} [options.passive] Whether to use a passive event.
     * @return {QuerySet} The QuerySet object.
     */
    function addEvent(events, callback, { capture = false, passive = false } = {}) {
        addEvent$1(this, events, callback, { capture, passive });

        return this;
    }
    /**
     * Add a delegated event to each node.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {Boolean} [options.passive] Whether to use a passive event.
     * @return {QuerySet} The QuerySet object.
     */
    function addEventDelegate(events, delegate, callback, { capture = false, passive = false } = {}) {
        addEventDelegate$1(this, events, delegate, callback, { capture, passive });

        return this;
    }
    /**
     * Add a self-destructing delegated event to each node.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {Boolean} [options.passive] Whether to use a passive event.
     * @return {QuerySet} The QuerySet object.
     */
    function addEventDelegateOnce(events, delegate, callback, { capture = false, passive = false } = {}) {
        addEventDelegateOnce$1(this, events, delegate, callback, { capture, passive });

        return this;
    }
    /**
     * Add a self-destructing event to each node.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {Boolean} [options.passive] Whether to use a passive event.
     * @return {QuerySet} The QuerySet object.
     */
    function addEventOnce(events, callback, { capture = false, passive = false } = {}) {
        addEventOnce$1(this, events, callback, { capture, passive });

        return this;
    }
    /**
     * Clone all events from each node to other nodes.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function cloneEvents(otherSelector) {
        cloneEvents$1(this, otherSelector);

        return this;
    }
    /**
     * Remove events from each node.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @return {QuerySet} The QuerySet object.
     */
    function removeEvent(events, callback, { capture = null } = {}) {
        removeEvent$1(this, events, callback, { capture });

        return this;
    }
    /**
     * Remove delegated events from each node.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @return {QuerySet} The QuerySet object.
     */
    function removeEventDelegate(events, delegate, callback, { capture = null } = {}) {
        removeEventDelegate$1(this, events, delegate, callback, { capture });

        return this;
    }
    /**
     * Trigger events on each node.
     * @param {string} events The event names.
     * @param {object} [options] The options to use for the Event.
     * @param {object} [options.data] Additional data to attach to the event.
     * @param {*} [options.detail] Additional details to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     * @return {QuerySet} The QuerySet object.
     */
    function triggerEvent(events, { data = null, detail = null, bubbles = true, cancelable = true } = {}) {
        triggerEvent$1(this, events, { data, detail, bubbles, cancelable });

        return this;
    }
    /**
     * Trigger an event for the first node.
     * @param {string} event The event name.
     * @param {object} [options] The options to use for the Event.
     * @param {object} [options.data] Additional data to attach to the event.
     * @param {*} [options.detail] Additional details to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     * @return {Boolean} FALSE if the event was cancelled, otherwise TRUE.
     */
    function triggerOne(event, { data = null, detail = null, bubbles = true, cancelable = true } = {}) {
        return triggerOne$1(this, event, { data, detail, bubbles, cancelable });
    }

    /**
     * QuerySet Events
     */

    /**
     * Trigger a blur event on the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function blur() {
        blur$1(this);

        return this;
    }
    /**
     * Trigger a click event on the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function click() {
        click$1(this);

        return this;
    }
    /**
     * Trigger a focus event on the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function focus() {
        focus$1(this);

        return this;
    }

    /**
     * QuerySet Create
     */

    /**
     * Attach a shadow DOM tree to the first node.
     * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
     * @return {QuerySet} A new QuerySet object.
     */
    function attachShadow({ open = true } = {}) {
        const shadow = attachShadow$1(this, { open });

        return new QuerySet(shadow ? [shadow] : []);
    }

    /**
     * QuerySet Manipulation
     */

    /**
     * Clone each node.
     * @param {object} options The options for cloning the node.
     * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [options.events] Whether to also clone events.
     * @param {Boolean} [options.data] Whether to also clone custom data.
     * @param {Boolean} [options.animations] Whether to also clone animations.
     * @return {QuerySet} A new QuerySet object.
     */
    function clone(options) {
        const clones = clone$1(this, options);

        return new QuerySet(clones);
    }
    /**
     * Detach each node from the DOM.
     * @return {QuerySet} The QuerySet object.
     */
    function detach() {
        detach$1(this);

        return this;
    }
    /**
     * Remove all children of each node from the DOM.
     * @return {QuerySet} The QuerySet object.
     */
    function empty() {
        empty$1(this);

        return this;
    }
    /**
     * Remove each node from the DOM.
     * @return {QuerySet} The QuerySet object.
     */
    function remove() {
        remove$1(this);

        return this;
    }
    /**
     * Replace each other node with nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function replaceAll(otherSelector) {
        replaceAll$1(this, otherSelector);

        return this;
    }
    /**
     * Replace each node with other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function replaceWith(otherSelector) {
        replaceWith$1(this, otherSelector);

        return this;
    }

    /**
     * QuerySet Move
     */

    /**
     * Insert each other node after the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function after(otherSelector) {
        after$1(this, otherSelector);

        return this;
    }
    /**
     * Append each other node to the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function append(otherSelector) {
        append$1(this, otherSelector);

        return this;
    }
    /**
     * Append each node to the first other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function appendTo(otherSelector) {
        appendTo$1(this, otherSelector);

        return this;
    }
    /**
     * Insert each other node before the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function before(otherSelector) {
        before$1(this, otherSelector);

        return this;
    }
    /**
     * Insert each node after the first other node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function insertAfter(otherSelector) {
        insertAfter$1(this, otherSelector);

        return this;
    }
    /**
     * Insert each node before the first other node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function insertBefore(otherSelector) {
        insertBefore$1(this, otherSelector);

        return this;
    }
    /**
     * Prepend each other node to the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function prepend(otherSelector) {
        prepend$1(this, otherSelector);

        return this;
    }
    /**
     * Prepend each node to the first other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function prependTo(otherSelector) {
        prependTo$1(this, otherSelector);

        return this;
    }

    /**
     * QuerySet Wrap
     */

    /**
     * Unwrap each node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function unwrap(nodeFilter) {
        unwrap$1(this, nodeFilter);

        return this;
    }
    /**
     * Wrap each nodes with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function wrap(otherSelector) {
        wrap$1(this, otherSelector);

        return this;
    }
    /**
     * Wrap all nodes with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function wrapAll(otherSelector) {
        wrapAll$1(this, otherSelector);

        return this;
    }
    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function wrapInner(otherSelector) {
        wrapInner$1(this, otherSelector);

        return this;
    }

    /**
     * DOM Queue
     */

    /**
     * Clear the queue of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName] The name of the queue to use.
     */
    function clearQueue$1(selector, { queueName = null } = {}) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            if (!queues.has(node)) {
                continue;
            }

            const queue = queues.get(node);

            if (queueName) {
                delete queue[queueName];
            }

            if (!queueName || !Object.keys(queue).length) {
                queues.delete(node);
            }
        }
    }
    /**
     * Run the next callback for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName=default] The name of the queue to use.
     */
    function dequeue(node, { queueName = 'default' } = {}) {
        const queue = queues.get(node);

        if (!queue || !(queueName in queue)) {
            return;
        }

        const next = queue[queueName].shift();

        if (!next) {
            queues.delete(node);
            return;
        }

        Promise.resolve(next(node))
            .then((_) => {
                dequeue(node, { queueName });
            }).catch((_) => {
                queues.delete(node);
            });
    }
    /**
     * Queue a callback on each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {DOM~queueCallback} callback The callback to queue.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName=default] The name of the queue to use.
     */
    function queue$1(selector, callback, { queueName = 'default' } = {}) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            if (!queues.has(node)) {
                queues.set(node, {});
            }

            const queue = queues.get(node);
            const runningQueue = queueName in queue;

            if (!runningQueue) {
                queue[queueName] = [
                    (_) => new Promise((resolve) => {
                        setTimeout(resolve, 1);
                    }),
                ];
            }

            queue[queueName].push(callback);

            if (!runningQueue) {
                dequeue(node, { queueName });
            }
        }
    }

    /**
     * QuerySet Queue
     */

    /**
     * Clear the queue of each node.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName=default] The name of the queue to clear.
     * @return {QuerySet} The QuerySet object.
     */
    function clearQueue({ queueName = 'default' } = {}) {
        clearQueue$1(this, { queueName });

        return this;
    }
    /**
     * Delay execution of subsequent items in the queue for each node.
     * @param {number} duration The number of milliseconds to delay execution by.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @return {QuerySet} The QuerySet object.
     */
    function delay(duration, { queueName = 'default' } = {}) {
        return this.queue((_) =>
            new Promise((resolve) =>
                setTimeout(resolve, duration),
            ),
        { queueName },
        );
    }
    /**
     * Queue a callback on each node.
     * @param {DOM~queueCallback} callback The callback to queue.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @return {QuerySet} The QuerySet object.
     */
    function queue(callback, { queueName = 'default' } = {}) {
        queue$1(this, callback, { queueName });

        return this;
    }

    /**
     * DOM Filter
     */

    /**
     * Return all nodes connected to the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function connected$1(selector) {
        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).filter((node) => node.isConnected);
    }
    /**
     * Return all nodes considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function equal$1(selector, otherSelector) {
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).filter((node) =>
            others.some((other) =>
                node.isEqualNode(other),
            ),
        );
    }
    /**
     * Return all nodes matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The filtered nodes.
     */
    function filter$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).filter(nodeFilter);
    }
    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
     */
    function filterOne$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).find(nodeFilter) || null;
    }
    /**
     * Return all "fixed" nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function fixed$1(selector) {
        return parseNodes(selector, {
            node: true,
        }).filter((node) =>
            (isElement(node) && css$1(node, 'position') === 'fixed') ||
            closest$1(
                node,
                (parent) => isElement(parent) && css$1(parent, 'position') === 'fixed',
            ).length,
        );
    }
    /**
     * Return all hidden nodes.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function hidden$1(selector) {
        return parseNodes(selector, {
            node: true,
            document: true,
            window: true,
        }).filter((node) => {
            if (isWindow(node)) {
                return node.document.visibilityState !== 'visible';
            }

            if (isDocument(node)) {
                return node.visibilityState !== 'visible';
            }

            return !node.offsetParent;
        });
    }
    /**
     * Return all nodes not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The filtered nodes.
     */
    function not$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).filter((node, index) => !nodeFilter(node, index));
    }
    /**
     * Return the first node not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
     */
    function notOne$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).find((node, index) => !nodeFilter(node, index)) || null;
    }
    /**
     * Return all nodes considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function same$1(selector, otherSelector) {
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).filter((node) =>
            others.some((other) =>
                node.isSameNode(other),
            ),
        );
    }
    /**
     * Return all visible nodes.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function visible$1(selector) {
        return parseNodes(selector, {
            node: true,
            document: true,
            window: true,
        }).filter((node) => {
            if (isWindow(node)) {
                return node.document.visibilityState === 'visible';
            }

            if (isDocument(node)) {
                return node.visibilityState === 'visible';
            }

            return node.offsetParent;
        });
    }
    /**
     * Return all nodes with an animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function withAnimation$1(selector) {
        return parseNodes(selector)
            .filter((node) =>
                animations.has(node),
            );
    }
    /**
     * Return all nodes with a specified attribute.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @return {array} The filtered nodes.
     */
    function withAttribute$1(selector, attribute) {
        return parseNodes(selector)
            .filter((node) =>
                node.hasAttribute(attribute),
            );
    }
    /**
     * Return all nodes with child elements.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function withChildren$1(selector) {
        return parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        }).filter((node) =>
            !!node.childElementCount,
        );
    }
    /**
     * Return all nodes with any of the specified classes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     * @return {array} The filtered nodes.
     */
    function withClass$1(selector, ...classes) {
        classes = parseClasses(classes);

        return parseNodes(selector)
            .filter((node) =>
                classes.some((className) =>
                    node.classList.contains(className),
                ),
            );
    }
    /**
     * Return all nodes with a CSS animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function withCSSAnimation$1(selector) {
        return parseNodes(selector)
            .filter((node) =>
                parseFloat(css$1(node, 'animation-duration')),
            );
    }
    /**
     * Return all nodes with a CSS transition.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function withCSSTransition$1(selector) {
        return parseNodes(selector)
            .filter((node) =>
                parseFloat(css$1(node, 'transition-duration')),
            );
    }
    /**
     * Return all nodes with custom data.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @return {array} The filtered nodes.
     */
    function withData$1(selector, key) {
        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        }).filter((node) => {
            if (!data.has(node)) {
                return false;
            }

            if (!key) {
                return true;
            }

            const nodeData = data.get(node);

            return nodeData.hasOwnProperty(key);
        });
    }
    /**
     * Return all nodes with a descendent matching a filter.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The filtered nodes.
     */
    function withDescendent$1(selector, nodeFilter) {
        nodeFilter = parseFilterContains(nodeFilter);

        return parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        }).filter(nodeFilter);
    }
    /**
     * Return all nodes with a specified property.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @return {array} The filtered nodes.
     */
    function withProperty$1(selector, property) {
        return parseNodes(selector)
            .filter((node) =>
                node.hasOwnProperty(property),
            );
    }

    /**
     * QuerySet Filter
     */

    /**
     * Return all nodes connected to the DOM.
     * @return {QuerySet} The QuerySet object.
     */
    function connected() {
        return new QuerySet(connected$1(this));
    }
    /**
     * Return all nodes considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function equal(otherSelector) {
        return new QuerySet(equal$1(this, otherSelector));
    }
    /**
     * Return all nodes matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function filter(nodeFilter) {
        return new QuerySet(filter$1(this, nodeFilter));
    }
    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function filterOne(nodeFilter) {
        const node = filterOne$1(this, nodeFilter);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return all "fixed" nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function fixed() {
        return new QuerySet(fixed$1(this));
    }
    /**
     * Return all hidden nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function hidden() {
        return new QuerySet(hidden$1(this));
    }
    /**
     * Return all nodes not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function not(nodeFilter) {
        return new QuerySet(not$1(this, nodeFilter));
    }
    /**
     * Return the first node not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function notOne(nodeFilter) {
        const node = notOne$1(this, nodeFilter);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return all nodes considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function same(otherSelector) {
        return new QuerySet(same$1(this, otherSelector));
    }
    /**
     * Return all visible nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function visible() {
        return new QuerySet(visible$1(this));
    }
    /**
     * Return all nodes with an animation.
     * @return {QuerySet} The QuerySet object.
    */
    function withAnimation() {
        return new QuerySet(withAnimation$1(this));
    }
    /**
     * Return all nodes with a specified attribute.
     * @param {string} attribute The attribute name.
     * @return {QuerySet} The QuerySet object.
     */
    function withAttribute(attribute) {
        return new QuerySet(withAttribute$1(this, attribute));
    }
    /**
     * Return all nodes with child elements.
     * @return {QuerySet} The QuerySet object.
     */
    function withChildren() {
        return new QuerySet(withChildren$1(this));
    }
    /**
     * Return all nodes with any of the specified classes.
     * @param {...string|string[]} classes The classes.
     * @return {QuerySet} The QuerySet object.
     */
    function withClass(classes) {
        return new QuerySet(withClass$1(this, classes));
    }
    /**
     * Return all nodes with a CSS animation.
     * @return {QuerySet} The QuerySet object.
    */
    function withCSSAnimation() {
        return new QuerySet(withCSSAnimation$1(this));
    }
    /**
     * Return all nodes with a CSS transition.
     * @return {QuerySet} The QuerySet object.
     */
    function withCSSTransition() {
        return new QuerySet(withCSSTransition$1(this));
    }
    /**
     * Return all nodes with custom data.
     * @param {string} [key] The data key.
     * @return {QuerySet} The QuerySet object.
     */
    function withData(key) {
        return new QuerySet(withData$1(this, key));
    }
    /**
     * Return all elements with a descendent matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function withDescendent(nodeFilter) {
        return new QuerySet(withDescendent$1(this, nodeFilter));
    }
    /**
     * Return all nodes with a specified property.
     * @param {string} property The property name.
     * @return {QuerySet} The QuerySet object.
     */
    function withProperty(property) {
        return new QuerySet(withProperty$1(this, property));
    }

    /**
     * QuerySet Find
     */

    /**
     * Return all descendent nodes matching a selector.
     * @param {string} selector The query selector.
     * @return {QuerySet} The QuerySet object.
     */
    function find(selector) {
        return new QuerySet(find$1(selector, this));
    }
    /**
     * Return all descendent nodes with a specific class.
     * @param {string} className The class name.
     * @return {QuerySet} The QuerySet object.
     */
    function findByClass(className) {
        return new QuerySet(findByClass$1(className, this));
    }
    /**
     * Return all descendent nodes with a specific ID.
     * @param {string} id The id.
     * @return {QuerySet} The QuerySet object.
     */
    function findById(id) {
        return new QuerySet(findById$1(id, this));
    }
    /**
     * Return all descendent nodes with a specific tag.
     * @param {string} tagName The tag name.
     * @return {QuerySet} The QuerySet object.
     */
    function findByTag(tagName) {
        return new QuerySet(findByTag$1(tagName, this));
    }
    /**
     * Return a single descendent node matching a selector.
     * @param {string} selector The query selector.
     * @return {QuerySet} The QuerySet object.
     */
    function findOne(selector) {
        const node = findOne$1(selector, this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return a single descendent node with a specific class.
     * @param {string} className The class name.
     * @return {QuerySet} The QuerySet object.
     */
    function findOneByClass(className) {
        const node = findOneByClass$1(className, this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return a single descendent node with a specific ID.
     * @param {string} id The id.
     * @return {QuerySet} The QuerySet object.
     */
    function findOneById(id) {
        const node = findOneById$1(id, this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return a single descendent node with a specific tag.
     * @param {string} tagName The tag name.
     * @return {QuerySet} The QuerySet object.
     */
    function findOneByTag(tagName) {
        const node = findOneByTag$1(tagName, this);

        return new QuerySet(node ? [node] : []);
    }

    /**
     * QuerySet Traversal
     */

    /**
     * Return the first child of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function child(nodeFilter) {
        return new QuerySet(child$1(this, nodeFilter));
    }
    /**
     * Return all children of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function children(nodeFilter, { elementsOnly = true } = {}) {
        return new QuerySet(children$1(this, nodeFilter, { elementsOnly }));
    }
    /**
     * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function closest(nodeFilter, limitFilter) {
        return new QuerySet(closest$1(this, nodeFilter, limitFilter));
    }
    /**
     * Return the common ancestor of all nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function commonAncestor() {
        const node = commonAncestor$1(this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return all children of each node (including text and comment nodes).
     * @return {QuerySet} The QuerySet object.
     */
    function contents() {
        return new QuerySet(contents$1(this));
    }
    /**
     * Return the DocumentFragment of the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function fragment() {
        const node = fragment$1(this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return the next sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function next(nodeFilter) {
        return new QuerySet(next$1(this, nodeFilter));
    }
    /**
     * Return all next siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function nextAll(nodeFilter, limitFilter) {
        return new QuerySet(nextAll$1(this, nodeFilter, limitFilter));
    }
    /**
     * Return the offset parent (relatively positioned) of the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function offsetParent() {
        const node = offsetParent$1(this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return the parent of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function parent(nodeFilter) {
        return new QuerySet(parent$1(this, nodeFilter));
    }
    /**
     * Return all parents of each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function parents(nodeFilter, limitFilter) {
        return new QuerySet(parents$1(this, nodeFilter, limitFilter));
    }
    /**
     * Return the previous sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function prev(nodeFilter) {
        return new QuerySet(prev$1(this, nodeFilter));
    }
    /**
     * Return all previous siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function prevAll(nodeFilter, limitFilter) {
        return new QuerySet(prevAll$1(this, nodeFilter, limitFilter));
    }
    /**
     * Return the ShadowRoot of the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function shadow() {
        const node = shadow$1(this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return all siblings for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function siblings(nodeFilter, { elementsOnly = true } = {}) {
        return new QuerySet(siblings$1(this, nodeFilter, { elementsOnly }));
    }

    /**
     * DOM Selection
     */

    /**
     * Insert each node after the selection.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     */
    function afterSelection$1(selector) {
        // ShadowRoot nodes can not be moved
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            html: true,
        }).reverse();

        const selection = getWindow().getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();
        range.collapse();

        for (const node of nodes) {
            range.insertNode(node);
        }
    }
    /**
     * Insert each node before the selection.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     */
    function beforeSelection$1(selector) {
        // ShadowRoot nodes can not be moved
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            html: true,
        }).reverse();

        const selection = getWindow().getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        for (const node of nodes) {
            range.insertNode(node);
        }
    }
    /**
     * Extract selected nodes from the DOM.
     * @return {array} The selected nodes.
     */
    function extractSelection() {
        const selection = getWindow().getSelection();

        if (!selection.rangeCount) {
            return [];
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        const fragment = range.extractContents();

        return merge([], fragment.childNodes);
    }
    /**
     * Return all selected nodes.
     * @return {array} The selected nodes.
     */
    function getSelection() {
        const selection = getWindow().getSelection();

        if (!selection.rangeCount) {
            return [];
        }

        const range = selection.getRangeAt(0);
        const nodes = merge([], range.commonAncestorContainer.querySelectorAll('*'));

        if (!nodes.length) {
            return [range.commonAncestorContainer];
        }

        if (nodes.length === 1) {
            return nodes;
        }

        const startContainer = range.startContainer;
        const endContainer = range.endContainer;
        const start = isElement(startContainer) ?
            startContainer :
            startContainer.parentNode;
        const end = isElement(endContainer) ?
            endContainer :
            endContainer.parentNode;

        const selectedNodes = nodes.slice(
            nodes.indexOf(start),
            nodes.indexOf(end) + 1,
        );
        const results = [];

        let lastNode;
        for (const node of selectedNodes) {
            if (lastNode && lastNode.contains(node)) {
                continue;
            }

            lastNode = node;
            results.push(node);
        }

        return results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Create a selection on the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function select$1(selector) {
        const node = parseNode(selector, {
            node: true,
        });

        if (node && 'select' in node) {
            node.select();
            return;
        }

        const selection = getWindow().getSelection();

        if (selection.rangeCount > 0) {
            selection.removeAllRanges();
        }

        if (!node) {
            return;
        }

        const range = createRange();
        range.selectNode(node);
        selection.addRange(range);
    }
    /**
     * Create a selection containing all of the nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function selectAll$1(selector) {
        const nodes = sort$1(selector);

        const selection = getWindow().getSelection();

        if (selection.rangeCount) {
            selection.removeAllRanges();
        }

        if (!nodes.length) {
            return;
        }

        const range = createRange();

        if (nodes.length == 1) {
            range.selectNode(nodes.shift());
        } else {
            range.setStartBefore(nodes.shift());
            range.setEndAfter(nodes.pop());
        }

        selection.addRange(range);
    }
    /**
     * Wrap selected nodes with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     */
    function wrapSelection$1(selector) {
        // ShadowRoot nodes can not be cloned
        const nodes = parseNodes(selector, {
            fragment: true,
            html: true,
        });

        const selection = getWindow().getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        const node = nodes.slice().shift();
        const deepest = merge([], node.querySelectorAll('*')).find((node) => !node.childElementCount) || node;

        const fragment = range.extractContents();

        const childNodes = merge([], fragment.childNodes);

        for (const child of childNodes) {
            deepest.insertBefore(child, null);
        }

        for (const node of nodes) {
            range.insertNode(node);
        }
    }

    /**
     * QuerySet Selection
     */

    /**
     * Insert each node after the selection.
     * @return {QuerySet} The QuerySet object.
     */
    function afterSelection() {
        afterSelection$1(this);

        return this;
    }
    /**
     * Insert each node before the selection.
     * @return {QuerySet} The QuerySet object.
     */
    function beforeSelection() {
        beforeSelection$1(this);

        return this;
    }
    /**
     * Create a selection on the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function select() {
        select$1(this);

        return this;
    }
    /**
     * Create a selection containing all of the nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function selectAll() {
        selectAll$1(this);

        return this;
    }
    /**
     * Wrap selected nodes with other nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function wrapSelection() {
        wrapSelection$1(this);

        return this;
    }

    /**
     * DOM Tests
     */

    /**
     * Returns true if any of the nodes has an animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
     */
    function hasAnimation$1(selector) {
        return parseNodes(selector)
            .some((node) => animations.has(node));
    }
    /**
     * Returns true if any of the nodes has a specified attribute.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @return {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
     */
    function hasAttribute$1(selector, attribute) {
        return parseNodes(selector)
            .some((node) => node.hasAttribute(attribute));
    }
    /**
     * Returns true if any of the nodes has child nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
     */
    function hasChildren$1(selector) {
        return parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        }).some((node) => node.childElementCount);
    }
    /**
     * Returns true if any of the nodes has any of the specified classes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     * @return {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
     */
    function hasClass$1(selector, ...classes) {
        classes = parseClasses(classes);

        return parseNodes(selector)
            .some((node) =>
                classes.some((className) => node.classList.contains(className)),
            );
    }
    /**
     * Returns true if any of the nodes has a CSS animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
     */
    function hasCSSAnimation$1(selector) {
        return parseNodes(selector)
            .some((node) =>
                parseFloat(css$1(node, 'animation-duration')),
            );
    }
    /**
     * Returns true if any of the nodes has a CSS transition.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
     */
    function hasCSSTransition$1(selector) {
        return parseNodes(selector)
            .some((node) =>
                parseFloat(css$1(node, 'transition-duration')),
            );
    }
    /**
     * Returns true if any of the nodes has custom data.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @return {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
     */
    function hasData$1(selector, key) {
        return parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        }).some((node) => {
            if (!data.has(node)) {
                return false;
            }

            if (!key) {
                return true;
            }

            const nodeData = data.get(node);

            return nodeData.hasOwnProperty(key);
        });
    }
    /**
     * Returns true if any of the nodes has the specified dataset value.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The dataset key.
     * @return {Boolean} TRUE if any of the nodes has the dataset value, otherwise FALSE.
     */
    function hasDataset$1(selector, key) {
        key = camelCase(key);

        return parseNodes(selector)
            .some((node) => !!node.dataset[key]);
    }
    /**
     * Returns true if any of the nodes contains a descendent matching a filter.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
     */
    function hasDescendent$1(selector, nodeFilter) {
        nodeFilter = parseFilterContains(nodeFilter);

        return parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        }).some(nodeFilter);
    }
    /**
     * Returns true if any of the nodes has a DocumentFragment.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
     */
    function hasFragment$1(selector) {
        return parseNodes(selector)
            .some((node) => node.content);
    }
    /**
     * Returns true if any of the nodes has a specified property.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @return {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
     */
    function hasProperty$1(selector, property) {
        return parseNodes(selector)
            .some((node) => node.hasOwnProperty(property));
    }
    /**
     * Returns true if any of the nodes has a ShadowRoot.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
     */
    function hasShadow$1(selector) {
        return parseNodes(selector)
            .some((node) => node.shadowRoot);
    }
    /**
     * Returns true if any of the nodes matches a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
     */
    function is$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).some(nodeFilter);
    }
    /**
     * Returns true if any of the nodes is connected to the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
     */
    function isConnected$1(selector) {
        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).some((node) => node.isConnected);
    }
    /**
     * Returns true if any of the nodes is considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @param {object} options The options for performing the comparison.
     * @param {Boolean} [options.shallow=true] Whether to do a shallow comparison.
     * @return {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
     */
    function isEqual$1(selector, otherSelector, { shallow = false } = {}) {
        let nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        let others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        if (shallow) {
            nodes = $.clone(nodes, { deep: false });
            others = $.clone(others, { deep: false });
        }

        return nodes.some((node) =>
            others.some((other) => node.isEqualNode(other)),
        );
    }
    /**
     * Returns true if any of the nodes or a parent of any of the nodes is "fixed".
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
     */
    function isFixed$1(selector) {
        return parseNodes(selector, {
            node: true,
        }).some((node) =>
            (isElement(node) && css$1(node, 'position') === 'fixed') ||
            closest$1(
                node,
                (parent) => isElement(parent) && css$1(parent, 'position') === 'fixed',
            ).length,
        );
    }
    /**
     * Returns true if any of the nodes is hidden.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
     */
    function isHidden$1(selector) {
        return parseNodes(selector, {
            node: true,
            document: true,
            window: true,
        }).some((node) => {
            if (isWindow(node)) {
                return node.document.visibilityState !== 'visible';
            }

            if (isDocument(node)) {
                return node.visibilityState !== 'visible';
            }

            return !node.offsetParent;
        });
    }
    /**
     * Returns true if any of the nodes is considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
     */
    function isSame$1(selector, otherSelector) {
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).some((node) =>
            others.some((other) => node.isSameNode(other)),
        );
    }
    /**
     * Returns true if any of the nodes is visible.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
     */
    function isVisible$1(selector) {
        return parseNodes(selector, {
            node: true,
            document: true,
            window: true,
        }).some((node) => {
            if (isWindow(node)) {
                return node.document.visibilityState === 'visible';
            }

            if (isDocument(node)) {
                return node.visibilityState === 'visible';
            }

            return node.offsetParent;
        });
    }

    /**
     * QuerySet Tests
     */

    /**
     * Returns true if any of the nodes has an animation.
     * @return {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
     */
    function hasAnimation() {
        return hasAnimation$1(this);
    }
    /**
     * Returns true if any of the nodes has a specified attribute.
     * @param {string} attribute The attribute name.
     * @return {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
     */
    function hasAttribute(attribute) {
        return hasAttribute$1(this, attribute);
    }
    /**
     * Returns true if any of the nodes has child nodes.
     * @return {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
     */
    function hasChildren() {
        return hasChildren$1(this);
    }
    /**
     * Returns true if any of the nodes has any of the specified classes.
     * @param {...string|string[]} classes The classes.
     * @return {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
     */
    function hasClass(...classes) {
        return hasClass$1(this, ...classes);
    }
    /**
     * Returns true if any of the nodes has a CSS animation.
     * @return {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
     */
    function hasCSSAnimation() {
        return hasCSSAnimation$1(this);
    }
    /**
     * Returns true if any of the nodes has a CSS transition.
     * @return {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
     */
    function hasCSSTransition() {
        return hasCSSTransition$1(this);
    }
    /**
     * Returns true if any of the nodes has custom data.
     * @param {string} [key] The data key.
     * @return {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
     */
    function hasData(key) {
        return hasData$1(this, key);
    }
    /**
     * Returns true if any of the nodes has the specified dataset value.
     * @param {string} [key] The dataset key.
     * @return {Boolean} TRUE if any of the nodes has the dataset value, otherwise FALSE.
     */
    function hasDataset(key) {
        return hasDataset$1(this, key);
    }
    /**
     * Returns true if any of the nodes contains a descendent matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
     */
    function hasDescendent(nodeFilter) {
        return hasDescendent$1(this, nodeFilter);
    }
    /**
     * Returns true if any of the nodes has a DocumentFragment.
     * @return {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
     */
    function hasFragment() {
        return hasFragment$1(this);
    }
    /**
     * Returns true if any of the nodes has a specified property.
     * @param {string} property The property name.
     * @return {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
     */
    function hasProperty(property) {
        return hasProperty$1(this, property);
    }
    /**
     * Returns true if any of the nodes has a ShadowRoot.
     * @return {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
     */
    function hasShadow() {
        return hasShadow$1(this);
    }
    /**
     * Returns true if any of the nodes matches a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
     */
    function is(nodeFilter) {
        return is$1(this, nodeFilter);
    }
    /**
     * Returns true if any of the nodes is connected to the DOM.
     * @return {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
     */
    function isConnected() {
        return isConnected$1(this);
    }
    /**
     * Returns true if any of the nodes is considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @param {object} options The options for performing the comparison.
     * @param {Boolean} [options.shallow=true] Whether to do a shallow comparison.
     * @return {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
     */
    function isEqual(otherSelector, { shallow = false } = {}) {
        return isEqual$1(this, otherSelector, { shallow });
    }
    /**
     * Returns true if any of the elements or a parent of any of the elements is "fixed".
     * @return {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
     */
    function isFixed() {
        return isFixed$1(this);
    }
    /**
     * Returns true if any of the nodes is hidden.
     * @return {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
     */
    function isHidden() {
        return isHidden$1(this);
    }
    /**
     * Returns true if any of the nodes is considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
     */
    function isSame(otherSelector) {
        return isSame$1(this, otherSelector);
    }
    /**
     * Returns true if any of the nodes is visible.
     * @return {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
     */
    function isVisible() {
        return isVisible$1(this);
    }

    /**
     * QuerySet Utility
     */

    /**
     * Merge with new nodes and sort the results.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input selector.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
     * @return {QuerySet} The QuerySet object.
     */
    function add(selector, context = null) {
        const nodes = sort$1(unique(merge([], this.get(), query(selector, context).get())));

        return new QuerySet(nodes);
    }
    /**
     * Reduce the set of nodes to the one at the specified index.
     * @param {number} index The index of the node.
     * @return {QuerySet} The QuerySet object.
     */
    function eq(index) {
        const node = this.get(index);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Reduce the set of nodes to the first.
     * @return {QuerySet} The QuerySet object.
     */
    function first() {
        return this.eq(0);
    }
    /**
     * Get the index of the first node relative to it's parent node.
     * @return {number} The index.
     */
    function index() {
        return index$1(this);
    }
    /**
     * Get the index of the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {number} The index.
     */
    function indexOf(nodeFilter) {
        return indexOf$1(this, nodeFilter);
    }
    /**
     * Reduce the set of nodes to the last.
     * @return {QuerySet} The QuerySet object.
     */
    function last() {
        return this.eq(-1);
    }
    /**
     * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
     * @return {QuerySet} The QuerySet object.
     */
    function normalize() {
        normalize$1(this);

        return this;
    }
    /**
     * Return a serialized string containing names and values of all form nodes.
     * @return {string} The serialized string.
     */
    function serialize() {
        return serialize$1(this);
    }
    /**
     * Return a serialized array containing names and values of all form nodes.
     * @return {array} The serialized array.
     */
    function serializeArray() {
        return serializeArray$1(this);
    }
    /**
     * Sort nodes by their position in the document.
     * @return {QuerySet} The QuerySet object.
     */
    function sort() {
        return new QuerySet(sort$1(this));
    }
    /**
     * Return the tag name (lowercase) of the first node.
     * @return {string} The nodes tag name (lowercase).
     */
    function tagName() {
        return tagName$1(this);
    }

    const proto$5 = QuerySet.prototype;

    proto$5.add = add;
    proto$5.addClass = addClass;
    proto$5.addEvent = addEvent;
    proto$5.addEventDelegate = addEventDelegate;
    proto$5.addEventDelegateOnce = addEventDelegateOnce;
    proto$5.addEventOnce = addEventOnce;
    proto$5.after = after;
    proto$5.afterSelection = afterSelection;
    proto$5.animate = animate;
    proto$5.append = append;
    proto$5.appendTo = appendTo;
    proto$5.attachShadow = attachShadow;
    proto$5.before = before;
    proto$5.beforeSelection = beforeSelection;
    proto$5.blur = blur;
    proto$5.center = center;
    proto$5.child = child;
    proto$5.children = children;
    proto$5.clearQueue = clearQueue;
    proto$5.click = click;
    proto$5.clone = clone;
    proto$5.cloneData = cloneData;
    proto$5.cloneEvents = cloneEvents;
    proto$5.closest = closest;
    proto$5.commonAncestor = commonAncestor;
    proto$5.connected = connected;
    proto$5.constrain = constrain;
    proto$5.contents = contents;
    proto$5.css = css;
    proto$5.delay = delay;
    proto$5.detach = detach;
    proto$5.distTo = distTo;
    proto$5.distToNode = distToNode;
    proto$5.dropIn = dropIn;
    proto$5.dropOut = dropOut;
    proto$5.empty = empty;
    proto$5.eq = eq;
    proto$5.equal = equal;
    proto$5.fadeIn = fadeIn;
    proto$5.fadeOut = fadeOut;
    proto$5.filter = filter;
    proto$5.filterOne = filterOne;
    proto$5.find = find;
    proto$5.findByClass = findByClass;
    proto$5.findById = findById;
    proto$5.findByTag = findByTag;
    proto$5.findOne = findOne;
    proto$5.findOneByClass = findOneByClass;
    proto$5.findOneById = findOneById;
    proto$5.findOneByTag = findOneByTag;
    proto$5.first = first;
    proto$5.fixed = fixed;
    proto$5.focus = focus;
    proto$5.fragment = fragment;
    proto$5.getAttribute = getAttribute;
    proto$5.getData = getData;
    proto$5.getDataset = getDataset$1;
    proto$5.getHTML = getHTML;
    proto$5.getProperty = getProperty;
    proto$5.getScrollX = getScrollX;
    proto$5.getScrollY = getScrollY;
    proto$5.getStyle = getStyle;
    proto$5.getText = getText;
    proto$5.getValue = getValue;
    proto$5.hasAnimation = hasAnimation;
    proto$5.hasAttribute = hasAttribute;
    proto$5.hasChildren = hasChildren;
    proto$5.hasClass = hasClass;
    proto$5.hasCSSAnimation = hasCSSAnimation;
    proto$5.hasCSSTransition = hasCSSTransition;
    proto$5.hasData = hasData;
    proto$5.hasDataset = hasDataset;
    proto$5.hasDescendent = hasDescendent;
    proto$5.hasFragment = hasFragment;
    proto$5.hasProperty = hasProperty;
    proto$5.hasShadow = hasShadow;
    proto$5.height = height;
    proto$5.hidden = hidden;
    proto$5.hide = hide;
    proto$5.index = index;
    proto$5.indexOf = indexOf;
    proto$5.insertAfter = insertAfter;
    proto$5.insertBefore = insertBefore;
    proto$5.is = is;
    proto$5.isConnected = isConnected;
    proto$5.isEqual = isEqual;
    proto$5.isFixed = isFixed;
    proto$5.isHidden = isHidden;
    proto$5.isSame = isSame;
    proto$5.isVisible = isVisible;
    proto$5.last = last;
    proto$5.nearestTo = nearestTo;
    proto$5.nearestToNode = nearestToNode;
    proto$5.next = next;
    proto$5.nextAll = nextAll;
    proto$5.normalize = normalize;
    proto$5.not = not;
    proto$5.notOne = notOne;
    proto$5.offsetParent = offsetParent;
    proto$5.parent = parent;
    proto$5.parents = parents;
    proto$5.percentX = percentX;
    proto$5.percentY = percentY;
    proto$5.position = position;
    proto$5.prepend = prepend;
    proto$5.prependTo = prependTo;
    proto$5.prev = prev;
    proto$5.prevAll = prevAll;
    proto$5.queue = queue;
    proto$5.rect = rect;
    proto$5.remove = remove;
    proto$5.removeAttribute = removeAttribute;
    proto$5.removeClass = removeClass;
    proto$5.removeData = removeData;
    proto$5.removeDataset = removeDataset;
    proto$5.removeEvent = removeEvent;
    proto$5.removeEventDelegate = removeEventDelegate;
    proto$5.removeProperty = removeProperty;
    proto$5.removeStyle = removeStyle;
    proto$5.replaceAll = replaceAll;
    proto$5.replaceWith = replaceWith;
    proto$5.rotateIn = rotateIn;
    proto$5.rotateOut = rotateOut;
    proto$5.same = same;
    proto$5.select = select;
    proto$5.selectAll = selectAll;
    proto$5.serialize = serialize;
    proto$5.serializeArray = serializeArray;
    proto$5.setAttribute = setAttribute;
    proto$5.setData = setData;
    proto$5.setDataset = setDataset;
    proto$5.setHTML = setHTML;
    proto$5.setProperty = setProperty;
    proto$5.setScroll = setScroll;
    proto$5.setScrollX = setScrollX;
    proto$5.setScrollY = setScrollY;
    proto$5.setStyle = setStyle;
    proto$5.setText = setText;
    proto$5.setValue = setValue;
    proto$5.shadow = shadow;
    proto$5.show = show;
    proto$5.siblings = siblings;
    proto$5.slideIn = slideIn;
    proto$5.slideOut = slideOut;
    proto$5.sort = sort;
    proto$5.squeezeIn = squeezeIn;
    proto$5.squeezeOut = squeezeOut;
    proto$5.stop = stop;
    proto$5.tagName = tagName;
    proto$5.toggle = toggle;
    proto$5.toggleClass = toggleClass;
    proto$5.triggerEvent = triggerEvent;
    proto$5.triggerOne = triggerOne;
    proto$5.unwrap = unwrap;
    proto$5.visible = visible;
    proto$5.width = width;
    proto$5.withAnimation = withAnimation;
    proto$5.withAttribute = withAttribute;
    proto$5.withChildren = withChildren;
    proto$5.withClass = withClass;
    proto$5.withCSSAnimation = withCSSAnimation;
    proto$5.withCSSTransition = withCSSTransition;
    proto$5.withData = withData;
    proto$5.withDescendent = withDescendent;
    proto$5.withProperty = withProperty;
    proto$5.wrap = wrap;
    proto$5.wrapAll = wrapAll;
    proto$5.wrapInner = wrapInner;
    proto$5.wrapSelection = wrapSelection;

    /**
     * DOM Query
     */

    /**
     * Add a function to the ready queue or return a QuerySet.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet|function} selector The input selector.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
     * @return {QuerySet} The new QuerySet object.
     */
    function query(selector, context = null) {
        if (isFunction(selector)) {
            return ready(selector);
        }

        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
            window: true,
            html: true,
            context: context || getContext(),
        });

        return new QuerySet(nodes);
    }
    /**
     * Return a QuerySet for the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input selector.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
     * @return {QuerySet} The new QuerySet object.
     */
    function queryOne(selector, context = null) {
        const node = parseNode(selector, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
            window: true,
            html: true,
            context: context || getContext(),
        });

        return new QuerySet(node ? [node] : []);
    }

    /**
     * DOM AJAX Scripts
     */

    /**
     * Load and execute a JavaScript file.
     * @param {string} url The URL of the script.
     * @param {object} [attributes] Additional attributes to set on the script tag.
     * @param {object} [options] The options for loading the script.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Document} [options.context=getContext()] The document context.
     * @return {Promise} A new Promise that resolves when the script is loaded, or rejects on failure.
     */
    function loadScript(url, attributes, { cache = true, context = getContext() } = {}) {
        attributes = {
            src: url,
            type: 'text/javascript',
            ...attributes,
        };

        if (!('async' in attributes)) {
            attributes.defer = '';
        }

        if (!cache) {
            attributes.src = appendQueryString(attributes.src, '_', Date.now());
        }

        const script = context.createElement('script');

        for (const [key, value] of Object.entries(attributes)) {
            script.setAttribute(key, value);
        }

        context.head.appendChild(script);

        return new Promise((resolve, reject) => {
            script.onload = (_) => resolve();
            script.onerror = (error) => reject(error);
        });
    }
    /**
     * Load and executes multiple JavaScript files (in order).
     * @param {array} urls An array of script URLs or attribute objects.
     * @param {object} [options] The options for loading the scripts.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Document} [options.context=getContext()] The document context.
     * @return {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    function loadScripts(urls, { cache = true, context = getContext() } = {}) {
        return Promise.all(
            urls.map((url) =>
                isString(url) ?
                    loadScript(url, null, { cache, context }) :
                    loadScript(null, url, { cache, context }),
            ),
        );
    }

    /**
     * DOM AJAX Styles
     */

    /**
     * Import a CSS Stylesheet file.
     * @param {string} url The URL of the stylesheet.
     * @param {object} [attributes] Additional attributes to set on the style tag.
     * @param {object} [options] The options for loading the stylesheet.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Document} [options.context=getContext()] The document context.
     * @return {Promise} A new Promise that resolves when the stylesheet is loaded, or rejects on failure.
     */
    function loadStyle(url, attributes, { cache = true, context = getContext() } = {}) {
        attributes = {
            href: url,
            rel: 'stylesheet',
            ...attributes,
        };

        if (!cache) {
            attributes.href = appendQueryString(attributes.href, '_', Date.now());
        }

        const link = context.createElement('link');

        for (const [key, value] of Object.entries(attributes)) {
            link.setAttribute(key, value);
        }

        context.head.appendChild(link);

        return new Promise((resolve, reject) => {
            link.onload = (_) => resolve();
            link.onerror = (error) => reject(error);
        });
    }
    /**
     * Import multiple CSS Stylesheet files.
     * @param {array} urls An array of stylesheet URLs or attribute objects.
     * @param {object} [options] The options for loading the stylesheets.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Document} [options.context=getContext()] The document context.
     * @return {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    function loadStyles(urls, { cache = true, context = getContext() } = {}) {
        return Promise.all(
            urls.map((url) =>
                isString(url) ?
                    loadStyle(url, null, { cache, context }) :
                    loadStyle(null, url, { cache, context }),
            ),
        );
    }

    /**
     * DOM Utility
     */

    /**
     * Sanitize a HTML string.
     * @param {string} html The input HTML string.
     * @param {object} [allowedTags] An object containing allowed tags and attributes.
     * @return {string} The sanitized HTML string.
     */
    function sanitize(html, allowedTags$1 = allowedTags) {
        const template = getContext().createElement('template');
        template.innerHTML = html;
        const fragment = template.content;
        const childNodes = merge([], fragment.children);

        for (const child of childNodes) {
            sanitizeNode(child, allowedTags$1);
        }

        return template.innerHTML;
    }
    /**
     * Sanitize a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} [allowedTags] An object containing allowed tags and attributes.
     */
    function sanitizeNode(node, allowedTags$1 = allowedTags) {
        // check node
        const name = node.tagName.toLowerCase();

        if (!(name in allowedTags$1)) {
            node.remove();
            return;
        }

        // check node attributes
        const allowedAttributes = [];

        if ('*' in allowedTags$1) {
            allowedAttributes.push(...allowedTags$1['*']);
        }

        allowedAttributes.push(...allowedTags$1[name]);

        const attributes = merge([], node.attributes);

        for (const attribute of attributes) {
            if (!allowedAttributes.find((test) => attribute.nodeName.match(test))) {
                node.removeAttribute(attribute.nodeName);
            }
        }

        // check children
        const childNodes = merge([], node.children);
        for (const child of childNodes) {
            sanitizeNode(child, allowedTags$1);
        }
    }

    Object.assign(query, {
        BORDER_BOX,
        CONTENT_BOX,
        MARGIN_BOX,
        PADDING_BOX,
        SCROLL_BOX,
        Animation,
        AnimationSet,
        QuerySet,
        addClass: addClass$1,
        addEvent: addEvent$1,
        addEventDelegate: addEventDelegate$1,
        addEventDelegateOnce: addEventDelegateOnce$1,
        addEventOnce: addEventOnce$1,
        after: after$1,
        afterSelection: afterSelection$1,
        ajax,
        animate: animate$1,
        append: append$1,
        appendTo: appendTo$1,
        attachShadow: attachShadow$1,
        before: before$1,
        beforeSelection: beforeSelection$1,
        blur: blur$1,
        center: center$1,
        child: child$1,
        children: children$1,
        clearQueue: clearQueue$1,
        click: click$1,
        clone: clone$1,
        cloneData: cloneData$1,
        cloneEvents: cloneEvents$1,
        closest: closest$1,
        commonAncestor: commonAncestor$1,
        connected: connected$1,
        constrain: constrain$1,
        contents: contents$1,
        create,
        createComment,
        createFragment,
        createRange,
        createText,
        css: css$1,
        debounce,
        delete: _delete,
        detach: detach$1,
        distTo: distTo$1,
        distToNode: distToNode$1,
        dropIn: dropIn$1,
        dropOut: dropOut$1,
        empty: empty$1,
        equal: equal$1,
        exec,
        extractSelection,
        fadeIn: fadeIn$1,
        fadeOut: fadeOut$1,
        filter: filter$1,
        filterOne: filterOne$1,
        find: find$1,
        findByClass: findByClass$1,
        findById: findById$1,
        findByTag: findByTag$1,
        findOne: findOne$1,
        findOneByClass: findOneByClass$1,
        findOneById: findOneById$1,
        findOneByTag: findOneByTag$1,
        fixed: fixed$1,
        focus: focus$1,
        fragment: fragment$1,
        get,
        getAjaxDefaults,
        getAnimationDefaults,
        getAttribute: getAttribute$1,
        getContext,
        getCookie,
        getData: getData$1,
        getDataset: getDataset$2,
        getHTML: getHTML$1,
        getProperty: getProperty$1,
        getScrollX: getScrollX$1,
        getScrollY: getScrollY$1,
        getSelection,
        getStyle: getStyle$1,
        getText: getText$1,
        getValue: getValue$1,
        getWindow,
        hasAnimation: hasAnimation$1,
        hasAttribute: hasAttribute$1,
        hasCSSAnimation: hasCSSAnimation$1,
        hasCSSTransition: hasCSSTransition$1,
        hasChildren: hasChildren$1,
        hasClass: hasClass$1,
        hasData: hasData$1,
        hasDataset: hasDataset$1,
        hasDescendent: hasDescendent$1,
        hasFragment: hasFragment$1,
        hasProperty: hasProperty$1,
        hasShadow: hasShadow$1,
        height: height$1,
        hidden: hidden$1,
        hide: hide$1,
        index: index$1,
        indexOf: indexOf$1,
        insertAfter: insertAfter$1,
        insertBefore: insertBefore$1,
        is: is$1,
        isConnected: isConnected$1,
        isEqual: isEqual$1,
        isFixed: isFixed$1,
        isHidden: isHidden$1,
        isSame: isSame$1,
        isVisible: isVisible$1,
        loadScript,
        loadScripts,
        loadStyle,
        loadStyles,
        mouseDragFactory,
        nearestTo: nearestTo$1,
        nearestToNode: nearestToNode$1,
        next: next$1,
        nextAll: nextAll$1,
        noConflict,
        normalize: normalize$1,
        not: not$1,
        notOne: notOne$1,
        offsetParent: offsetParent$1,
        parent: parent$1,
        parents: parents$1,
        parseDocument,
        parseFormData,
        parseHTML,
        parseParams,
        patch,
        percentX: percentX$1,
        percentY: percentY$1,
        position: position$1,
        post,
        prepend: prepend$1,
        prependTo: prependTo$1,
        prev: prev$1,
        prevAll: prevAll$1,
        put,
        query,
        queryOne,
        queue: queue$1,
        ready,
        rect: rect$1,
        remove: remove$1,
        removeAttribute: removeAttribute$1,
        removeClass: removeClass$1,
        removeCookie,
        removeData: removeData$1,
        removeDataset: removeDataset$1,
        removeEvent: removeEvent$1,
        removeEventDelegate: removeEventDelegate$1,
        removeProperty: removeProperty$1,
        removeStyle: removeStyle$1,
        replaceAll: replaceAll$1,
        replaceWith: replaceWith$1,
        rotateIn: rotateIn$1,
        rotateOut: rotateOut$1,
        same: same$1,
        sanitize,
        select: select$1,
        selectAll: selectAll$1,
        serialize: serialize$1,
        serializeArray: serializeArray$1,
        setAjaxDefaults,
        setAnimationDefaults,
        setAttribute: setAttribute$1,
        setContext,
        setCookie,
        setData: setData$1,
        setDataset: setDataset$1,
        setHTML: setHTML$1,
        setProperty: setProperty$1,
        setScroll: setScroll$1,
        setScrollX: setScrollX$1,
        setScrollY: setScrollY$1,
        setStyle: setStyle$1,
        setText: setText$1,
        setValue: setValue$1,
        setWindow,
        shadow: shadow$1,
        show: show$1,
        siblings: siblings$1,
        slideIn: slideIn$1,
        slideOut: slideOut$1,
        sort: sort$1,
        squeezeIn: squeezeIn$1,
        squeezeOut: squeezeOut$1,
        stop: stop$1,
        tagName: tagName$1,
        toggle: toggle$1,
        toggleClass: toggleClass$1,
        triggerEvent: triggerEvent$1,
        triggerOne: triggerOne$1,
        unwrap: unwrap$1,
        useTimeout,
        visible: visible$1,
        width: width$1,
        withAnimation: withAnimation$1,
        withAttribute: withAttribute$1,
        withCSSAnimation: withCSSAnimation$1,
        withCSSTransition: withCSSTransition$1,
        withChildren: withChildren$1,
        withClass: withClass$1,
        withData: withData$1,
        withDescendent: withDescendent$1,
        withProperty: withProperty$1,
        wrap: wrap$1,
        wrapAll: wrapAll$1,
        wrapInner: wrapInner$1,
        wrapSelection: wrapSelection$1,
    });

    for (const [key, value] of Object.entries(_)) {
        query[`_${key}`] = value;
    }

    let _$;

    /**
     * Reset the global $ variable.
     */
    function noConflict() {
        const window = getWindow();

        if (window.$ === query) {
            window.$ = _$;
        }
    }
    /**
     * Register the global variables.
     * @param {Window} window The window.
     * @param {Document} [document] The document.
     * @return {object} The fQuery object.
     */
    function registerGlobals(window, document) {
        setWindow(window);
        setContext(document || window.document);

        _$ = window.$;
        window.$ = query;

        return query;
    }

    var fQuery = isWindow(globalThis) ? registerGlobals(globalThis) : registerGlobals;

    let $$1;

    if (fQuery !== fQuery.query) {
        $$1 = fQuery(globalThis);
    } else {
        $$1 = fQuery;
    }

    if (!('fQuery' in globalThis)) {
        globalThis.fQuery = $$1;
    }

    const document$1 = $$1.getContext();
    const window$1 = $$1.getWindow();

    let scrollbarSize;

    /**
     * Add scrollbar padding to a node.
     * @param {array} nodes The nodes.
     */
    function addScrollPadding(nodes) {
        const scrollSizeY = getScrollbarSize(window$1, document$1, 'y');

        if (!scrollSizeY) {
            return;
        }

        for (const node of nodes) {
            $$1.setDataset(node, {
                uiPaddingRight: $$1.getStyle(node, 'paddingRight'),
            });
            $$1.setStyle(node, {
                paddingRight: `${scrollSizeY + parseInt($$1.css(node, 'paddingRight'))}px`,
            });
        }
    }
    /**
     * Get the size of the scrollbar.
     * @return {number} The scrollbar size.
     */
    function calculateScrollbarSize() {
        if (scrollbarSize) {
            return scrollbarSize;
        }

        const div = $$1.create('div', {
            style: {
                width: '100px',
                height: '100px',
                overflow: 'scroll',
                position: 'absolute',
                top: '-9999px',
            },
        });
        $$1.append(document$1.body, div);

        scrollbarSize = $$1.getProperty(div, 'offsetWidth') - $$1.width(div);

        $$1.detach(div);

        return scrollbarSize;
    }
    /**
     * Generate a unique element ID.
     * @param {string} [prefix] The ID prefix.
     * @return {string} The unique ID.
     */
    function generateId(prefix) {
        const id = `${prefix}${$$1._randomInt(10000, 99999)}`;

        if ($$1.findOne(`#${id}`)) {
            return generateId(prefix);
        }

        return id;
    }
    /**
     * Get normalized UI data from a node.
     * @param {HTMLElement} node The input node.
     * @return {object} The normalized data.
     */
    function getDataset(node) {
        const dataset = $$1.getDataset(node);

        return Object.fromEntries(
            Object.entries(dataset)
                .map(([key, value]) => [key.slice(2, 3).toLowerCase() + key.slice(3), value]),
        );
    }
    /**
     * Get position from a mouse/touch event.
     * @param {Event} e The mouse/touch event.
     * @return {object} The position.
     */
    function getPosition(e) {
        if ('touches' in e && e.touches.length) {
            return {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,
            };
        }

        return {
            x: e.pageX,
            y: e.pageY,
        };
    }
    /**
     * Get the scrollbar size for a given axis.
     * @param {HTMLElement|Window} [node=window] The input node.
     * @param {HTMLElement|Document} [scrollNode=document] The scroll node.
     * @param {string} [axis] The axis to check.
     * @return {number} The scrollbar size.
     */
    function getScrollbarSize(node = window$1, scrollNode = document$1, axis) {
        const method = axis === 'x' ? 'width' : 'height';
        const size = $$1[method](node);
        const scrollSize = $$1[method](scrollNode, { boxSize: $$1.SCROLL_BOX });

        if (scrollSize > size) {
            return calculateScrollbarSize();
        }

        return 0;
    }
    /**
     * Calculate the computed bounding rectangle of a node (minus scroll bars).
     * @param {HTMLElement|Window} node The input node.
     * @param {HTMLElement|Document} scrollNode The scroll node.
     * @return {object} The computed bounding rectangle of the node.
     */
    function getScrollContainer(node, scrollNode) {
        const isWindow = $$1._isWindow(node);
        const rect = isWindow ?
            getWindowContainer(node) :
            $$1.rect(node, { offset: true });

        const scrollSizeX = getScrollbarSize(node, scrollNode, 'x');
        const scrollSizeY = getScrollbarSize(node, scrollNode, 'y');

        if (scrollSizeX) {
            rect.height -= scrollSizeX;

            if (isWindow) {
                rect.bottom -= scrollSizeX;
            }
        }

        if (scrollSizeY) {
            rect.width -= scrollSizeY;

            if (isWindow) {
                rect.right -= scrollSizeY;
            }
        }

        return rect;
    }
    /**
     * Get a target from a node.
     * @param {HTMLElement} node The input node.
     * @param {string} [closestSelector] The default closest selector.
     * @return {HTMLElement} The target node.
     */
    function getTarget(node, closestSelector) {
        const selector = getTargetSelector(node);

        let target;

        if (selector && selector !== '#') {
            target = $$1.findOne(selector);
        } else if (closestSelector) {
            target = $$1.closest(node, closestSelector).shift();
        }

        if (!target) {
            throw new Error('Target not found');
        }

        return target;
    }
    /**
     * Get the target selector from a node.
     * @param {HTMLElement} node The input node.
     * @return {string} The target selector.
     */
    function getTargetSelector(node) {
        return $$1.getDataset(node, 'uiTarget') || $$1.getAttribute(node, 'href');
    }
    /**
     * Get positions from a touch event.
     * @param {Event} e The touch event.
     * @return {array} The positions.
     */
    function getTouchPositions(e) {
        return Array.from(e.touches)
            .map((touch) => ({ x: touch.pageX, y: touch.pageY }));
    }
    /**
     * Calculate the computed bounding rectangle of a window.
     * @param {Window} node The window object.
     * @return {object} The computed bounding rectangle of the window.
     */
    function getWindowContainer(node) {
        const scrollX = $$1.getScrollX(node);
        const scrollY = $$1.getScrollY(node);
        const width = $$1.width(node);
        const height = $$1.height(node);

        return {
            x: scrollX,
            y: scrollY,
            width,
            height,
            top: scrollY,
            right: scrollX + width,
            bottom: scrollY + height,
            left: scrollX,
        };
    }
    /**
     * Initialize a UI component.
     * @param {string} key The component key.
     * @param {class} component The component class.
     */
    function initComponent(key, component) {
        component.DATA_KEY = key;
        component.REMOVE_EVENT = `remove.ui.${key}`;

        $$1.QuerySet.prototype[key] = function(a, ...args) {
            let settings; let method; let firstResult;

            if ($$1._isObject(a)) {
                settings = a;
            } else if ($$1._isString(a)) {
                method = a;
            }

            for (const [index, node] of this.get().entries()) {
                if (!$$1._isElement(node)) {
                    continue;
                }

                let result = component.init(node, settings);

                if (method) {
                    result = result[method](...args);
                }

                if (index === 0) {
                    firstResult = result;
                }
            }

            return firstResult;
        };
    }
    /**
     * Reset body scrollbar padding.
     * @param {array} nodes The nodes.
     */
    function resetScrollPadding(nodes) {
        for (const node of nodes) {
            $$1.setStyle(node, {
                paddingRight: $$1.getDataset(node, 'uiPaddingRight'),
            });
            $$1.removeDataset(node, 'uiPaddingRight');
        }
    }

    /**
     * BaseComponent Class
     * @class
     */
    class BaseComponent {
        /**
         * New BaseComponent constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the BaseComponent with.
         */
        constructor(node, options) {
            this._node = node;

            this._options = $$1._extend(
                {},
                this.constructor.defaults,
                getDataset(this._node),
                options,
            );

            $$1.addEvent(this._node, this.constructor.REMOVE_EVENT, (_) => {
                this.dispose();
            });

            $$1.setData(this._node, { [this.constructor.DATA_KEY]: this });
        }

        /**
         * Dispose the BaseComponent.
         */
        dispose() {
            $$1.removeEvent(this._node, this.constructor.REMOVE_EVENT);
            $$1.removeData(this._node, this.constructor.DATA_KEY);
            this._node = null;
            this._options = null;
        }

        /**
         * Initialize a BaseComponent.
         * @param {HTMLElement} node The input node.
         * @return {BaseComponent} A new BaseComponent object.
         */
        static init(node, ...args) {
            return $$1.hasData(node, this.DATA_KEY) ?
                $$1.getData(node, this.DATA_KEY) :
                new this(node, ...args);
        }
    }

    /**
     * Alert Class
     * @class
     */
    class Alert extends BaseComponent {
        /**
         * Close the Alert.
         */
        close() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                !$$1.triggerOne(this._node, 'close.ui.alert')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'out' });

            $$1.fadeOut(this._node, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.detach(this._node);
                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'closed.ui.alert');
                $$1.remove(this._node);
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }
    }

    // Alert default options
    Alert.defaults = {
        duration: 100,
    };

    // Alert init
    initComponent('alert', Alert);

    // Alert events
    $$1.addEventDelegate(document$1, 'click.ui.alert', '[data-ui-dismiss="alert"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.alert');
        const alert = Alert.init(target);
        alert.close();
    });

    /**
     * Button Class
     * @class
     */
    class Button extends BaseComponent {
        /**
         * Toggle the Button.
         */
        toggle() {
            $$1.toggleClass(this._node, 'active');

            const active = $$1.hasClass(this._node, 'active');
            $$1.setAttribute(this._node, { 'aria-pressed': active });
        }
    }

    // Button init
    initComponent('button', Button);

    // Button events
    $$1.addEventDelegate(document$1, 'click.ui.button keydown.ui.button', '[data-ui-toggle="button"]', (e) => {
        if (e.code && e.code !== 'Space') {
            return;
        }

        e.preventDefault();

        const button = Button.init(e.currentTarget);
        button.toggle();
    });

    /**
     * Carousel Class
     * @class
     */
    class Carousel extends BaseComponent {
        /**
         * New Carousel constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Carousel with.
         */
        constructor(node, options) {
            super(node, options);

            this._items = $$1.find('.carousel-item', this._node);

            this._index = this._items.findIndex((item) =>
                $$1.hasClass(item, 'active'),
            );

            this._events();

            if (this._options.ride === 'carousel') {
                this._setTimer();
            }
        }

        /**
         * Cycle to the next carousel item.
         */
        cycle() {
            if (!$$1.isHidden(document$1)) {
                this.slide(1);
            } else {
                this._paused = false;
                this._setTimer();
            }
        }

        /**
         * Dispose the Carousel.
         */
        dispose() {
            if (this._timer) {
                clearTimeout(this._timer);
            }

            if (this._options.keyboard) {
                $$1.removeEvent(this._node, 'keydown.ui.carousel');
            }

            if (this._options.pause) {
                $$1.removeEvent(this._node, 'mouseenter.ui.carousel');
                $$1.removeEvent(this._node, 'mouseleave.ui.carousel');
            }

            if (this._options.swipe) {
                $$1.removeEvent(this._node, 'mousedown.ui.carousel');
            }

            this._items = null;

            super.dispose();
        }

        /**
         * Cycle to the next Carousel item.
         */
        next() {
            this.slide();
        }

        /**
         * Stop the carousel from cycling through items.
         */
        pause() {
            clearTimeout(this._timer);
            this._timer = null;
            this._paused = true;
        }

        /**
         * Cycle to the previous Carousel item.
         */
        prev() {
            this.slide(-1);
        }

        /**
         * Cycle to a specific Carousel item.
         * @param {number} index The item index to cycle to.
         */
        show(index) {
            this._show(index);
        }

        /**
         * Slide the Carousel in a specific direction.
         * @param {number} [direction=1] The direction to slide to.
         */
        slide(direction = 1) {
            this.show(this._index + direction);
        }
    }

    /**
     * Get the direction offset from an index.
     * @param {number} index The index.
     * @param {number} totalItems The total number of items.
     * @return {number} The direction.
     */
    function getDirOffset(index, totalItems) {
        if (index < 0) {
            return -1;
        }

        if (index > totalItems - 1) {
            return 1;
        }

        return 0;
    }
    /**
     * Get the direction from an offset and index.
     * @param {number} offset The direction offset.
     * @param {number} oldIndex The old item index.
     * @param {number} newIndex The new item index.
     * @return {string} The direction.
     */
    function getDirection$1(offset, oldIndex, newIndex) {
        if (offset == -1 || (offset == 0 && newIndex < oldIndex)) {
            return 'left';
        }

        return 'right';
    }
    /**
     * Get the real index from an index.
     * @param {number} index The item index.
     * @param {number} totalItems The total number of items.
     * @return {number} The real item index.
     */
    function getIndex(index, totalItems) {
        index %= totalItems;

        if (index < 0) {
            return totalItems + index;
        }

        return index;
    }

    /**
     * Attach events for the Carousel.
     */
    function _events$2() {
        if (this._options.keyboard) {
            $$1.addEvent(this._node, 'keydown.ui.carousel', (e) => {
                const target = e.target;
                if ($$1.is(target, 'input, select')) {
                    return;
                }

                switch (e.code) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prev();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.next();
                        break;
                }
            });
        }

        if (this._options.pause) {
            $$1.addEvent(this._node, 'mouseenter.ui.carousel', (_) => {
                this._mousePaused = true;
                this.pause();
            });

            $$1.addEvent(this._node, 'mouseleave.ui.carousel', (_) => {
                this._mousePaused = false;
                this._paused = false;

                if (!$$1.getDataset(this._node, 'uiSliding')) {
                    this._setTimer();
                }
            });
        }

        if (this._options.swipe) {
            let startX;
            let index = null;
            let progress;
            let direction;

            const downEvent = (e) => {
                if (
                    e.button ||
                    $$1.getDataset(this._node, 'uiSliding') ||
                    (
                        !$$1.is(e.target, ':disabled, .disabled') &&
                        (
                            $$1.is(e.target, '[data-ui-slide-to], [data-ui-slide], a, button, input, textarea, select') ||
                            $$1.closest(e.target, '[data-ui-slide], a, button', (parent) => $$1.isSame(parent, this._node) || $$1.is(parent, ':disabled, .disabled')).length
                        )
                    )
                ) {
                    return false;
                }

                this.pause();
                $$1.setDataset(this._node, { uiSliding: true });

                const pos = getPosition(e);
                startX = pos.x;
            };

            const moveEvent = (e) => {
                const pos = getPosition(e);
                const currentX = pos.x;
                const width = $$1.width(this._node);
                const scrollX = width / 2;

                let mouseDiffX = currentX - startX;
                if (!this._options.wrap) {
                    mouseDiffX = $$1._clamp(
                        mouseDiffX,
                        -(this._items.length - 1 - this._index) * scrollX,
                        this._index * scrollX,
                    );
                }

                progress = $$1._map(Math.abs(mouseDiffX), 0, scrollX, 0, 1);

                do {
                    const lastIndex = index;

                    if (mouseDiffX < 0) {
                        index = this._index + 1;
                    } else if (mouseDiffX > 0) {
                        index = this._index - 1;
                    } else {
                        index = this._index;
                        return;
                    }

                    const offset = getDirOffset(index, this._items.length);
                    index = getIndex(index, this._items.length);
                    direction = getDirection$1(offset, this._index, index);

                    if (progress >= 1) {
                        startX = currentX;

                        const oldIndex = this._setIndex(index);
                        this._update(this._items[this._index], this._items[oldIndex], progress, { direction });
                        this._updateIndicators();

                        if (lastIndex !== this._index) {
                            this._resetStyles(lastIndex);
                        }

                        progress--;
                    } else {
                        this._update(this._items[index], this._items[this._index], progress, { direction, dragging: true });

                        if (lastIndex !== index) {
                            this._resetStyles(lastIndex);
                        }
                    }
                } while (progress > 1);
            };

            const upEvent = (_) => {
                if (index === null || index === this._index) {
                    this._paused = false;
                    $$1.removeDataset(this._node, 'uiSliding');
                    this._setTimer();
                    return;
                }

                let oldIndex;
                let progressRemaining;
                if (progress > .25) {
                    oldIndex = this._setIndex(index);
                    progressRemaining = 1 - progress;
                } else {
                    oldIndex = index;
                    progressRemaining = progress;
                    direction = direction === 'right' ? 'left' : 'right';
                }

                this._resetStyles(this._index);

                index = null;

                $$1.animate(
                    this._items[this._index],
                    (node, newProgress) => {
                        if (!this._items) {
                            return;
                        }

                        if (progress > .25) {
                            this._update(node, this._items[oldIndex], progress + (newProgress * progressRemaining), { direction });
                        } else {
                            this._update(node, this._items[oldIndex], (1 - progress) + (newProgress * progressRemaining), { direction });
                        }
                    },
                    {
                        duration: this._options.transition * progressRemaining,
                    },
                ).then((_) => {
                    this._updateIndicators();
                    $$1.removeDataset(this._node, 'uiSliding');

                    this._paused = false;
                    this._setTimer();
                }).catch((_) => {
                    $$1.removeDataset(this._node, 'uiSliding');
                });
            };

            const dragEvent = $$1.mouseDragFactory(downEvent, moveEvent, upEvent);

            $$1.addEvent(this._node, 'mousedown.ui.carousel touchstart.ui.carousel', dragEvent);
        }
    }

    /**
     * Reset styles of an item.
     * @param {number} index The item index.
     */
    function _resetStyles(index) {
        $$1.setStyle(this._items[index], {
            display: '',
            transform: '',
        });
    }
    /**
     * Set a new item index and update the items.
     * @param {number} index The new item index.
     * @return {number} The old item index.
     */
    function _setIndex(index) {
        const oldIndex = this._index;
        this._index = index;

        $$1.addClass(this._items[this._index], 'active');
        $$1.removeClass(this._items[oldIndex], 'active');

        return oldIndex;
    }
    /**
     * Set a timer for the next Carousel cycle.
     */
    function _setTimer() {
        if (this._timer || this._paused || this._mousePaused) {
            return;
        }

        const interval = $$1.getDataset(this._items[this._index], 'uiInterval');

        this._timer = setTimeout(
            (_) => this.cycle(),
            interval || this._options.interval,
        );
    }
    /**
     * Cycle to a specific Carousel item.
     * @param {number} index The item index to cycle to.
     */
    function _show$2(index) {
        if ($$1.getDataset(this._node, 'uiSliding')) {
            return;
        }

        index = parseInt(index);

        if (!this._options.wrap &&
            (
                index < 0 ||
                index > this._items.length - 1
            )
        ) {
            return;
        }

        const offset = getDirOffset(index, this._items.length);
        index = getIndex(index, this._items.length);

        if (index === this._index) {
            return;
        }

        const direction = getDirection$1(offset, this._index, index);

        const eventData = {
            direction,
            relatedTarget: this._items[index],
            from: this._index,
            to: index,
        };

        if (!$$1.triggerOne(this._node, 'slide.ui.carousel', { data: eventData })) {
            return;
        }

        $$1.setDataset(this._node, { uiSliding: true });
        this.pause();

        const oldIndex = this._setIndex(index);

        $$1.animate(
            this._items[this._index],
            (node, progress) => {
                if (!this._items) {
                    return;
                }

                this._update(node, this._items[oldIndex], progress, { direction });
            },
            {
                duration: this._options.transition,
            },
        ).then((_) => {
            this._updateIndicators();
            $$1.removeDataset(this._node, 'uiSliding');
            $$1.triggerEvent(this._node, 'slid.ui.carousel', { data: eventData });

            this._paused = false;
            this._setTimer();
        }).catch((_) => {
            $$1.removeDataset(this._node, 'uiSliding');
        });
    }
    /**
     * Update the position of the Carousel items.
     * @param {Node} nodeIn The new node.
     * @param {Node} nodeOut The old node.
     * @param {number} progress The progress of the cycle.
     * @param {object} options The options for updating the item positions.
     * @param {string} [options.direction] The direction to cycle to.
     * @param {Boolean} [options.dragging] Whether the item is being dragged.
     */
    function _update(nodeIn, nodeOut, progress, { direction, dragging = false } = {}) {
        const inStyles = {};
        const outStyles = {};

        if (progress >= 1) {
            if (dragging) {
                inStyles.display = '';
            } else {
                outStyles.display = '';
            }

            inStyles.transform = '';
            outStyles.transform = '';
        } else {
            const inverse = direction === 'right';

            if (dragging) {
                inStyles.display = 'block';
            } else {
                outStyles.display = 'block';
            }

            inStyles.transform = `translateX(${Math.round((1 - progress) * 100) * (inverse ? 1 : -1)}%)`;
            outStyles.transform = `translateX(${Math.round(progress * 100) * (inverse ? -1 : 1)}%)`;
        }

        $$1.setStyle(nodeIn, inStyles);
        $$1.setStyle(nodeOut, outStyles);
    }
    /**
     * Update the carousel indicators.
     */
    function _updateIndicators() {
        const oldIndicator = $$1.find('.active[data-ui-slide-to]', this._node);
        const newIndicator = $$1.find('[data-ui-slide-to="' + this._index + '"]', this._node);
        $$1.removeClass(oldIndicator, 'active');
        $$1.addClass(newIndicator, 'active');
    }

    // Carousel default options
    Carousel.defaults = {
        interval: 5000,
        transition: 500,
        keyboard: true,
        ride: false,
        pause: true,
        wrap: true,
        swipe: true,
    };

    // Carousel prototype
    const proto$4 = Carousel.prototype;

    proto$4._events = _events$2;
    proto$4._resetStyles = _resetStyles;
    proto$4._setIndex = _setIndex;
    proto$4._setTimer = _setTimer;
    proto$4._show = _show$2;
    proto$4._update = _update;
    proto$4._updateIndicators = _updateIndicators;

    // Carousel init
    initComponent('carousel', Carousel);

    // Carousel events
    $$1((_) => {
        const nodes = $$1.find('[data-ui-ride="carousel"]');

        for (const node of nodes) {
            Carousel.init(node);
        }
    });

    $$1.addEventDelegate(document$1, 'click.ui.carousel', '[data-ui-slide]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.carousel');
        const carousel = Carousel.init(target);
        const slide = $$1.getDataset(e.currentTarget, 'uiSlide');

        if (slide === 'prev') {
            carousel.prev();
        } else {
            carousel.next();
        }
    });

    $$1.addEventDelegate(document$1, 'click.ui.carousel', '[data-ui-slide-to]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.carousel');
        const carousel = Carousel.init(target);
        const slideTo = $$1.getDataset(e.currentTarget, 'uiSlideTo');

        carousel.show(slideTo);
    });

    /**
     * Collapse Class
     * @class
     */
    class Collapse extends BaseComponent {
        /**
         * New Collapse constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Collapse with.
         */
        constructor(node, options) {
            super(node, options);

            const id = $$1.getAttribute(this._node, 'id');
            this._triggers = $$1.find(
                `[data-ui-toggle="collapse"][data-ui-target="#${id}"]`,
            );

            if (this._options.parent) {
                this._parent = $$1.closest(this._node, this._options.parent).shift();
            }
        }

        /**
         * Dispose the Collapse.
         */
        dispose() {
            this._triggers = null;
            this._parent = null;

            super.dispose();
        }

        /**
         * Hide the element.
         */
        hide() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                !$$1.hasClass(this._node, 'show') ||
                !$$1.triggerOne(this._node, 'hide.ui.collapse')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'out' });
            $$1.addClass(this._triggers, 'collapsed');
            $$1.addClass(this._triggers, 'collapsing');

            $$1.squeezeOut(this._node, {
                direction: this._options.direction,
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeClass(this._node, 'show');
                $$1.removeClass(this._triggers, 'collapsing');
                $$1.setAttribute(this._triggers, { 'aria-expanded': false });
                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.collapse');
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }

        /**
         * Show the element.
         */
        show() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                $$1.hasClass(this._node, 'show')
            ) {
                return;
            }

            const collapses = [];
            if (this._parent) {
                const siblings = $$1.find('.collapse.show', this._parent);

                for (const sibling of siblings) {
                    const collapse = this.constructor.init(sibling);

                    if (!$$1.isSame(this._parent, collapse._parent)) {
                        continue;
                    }

                    collapses.push(collapse);
                }
            }

            if (!$$1.triggerOne(this._node, 'show.ui.collapse')) {
                return;
            }

            for (const collapse of collapses) {
                collapse.hide();
            }

            $$1.setDataset(this._node, { uiAnimating: 'in' });
            $$1.addClass(this._node, 'show');
            $$1.removeClass(this._triggers, 'collapsed');
            $$1.addClass(this._triggers, 'collapsing');

            $$1.squeezeIn(this._node, {
                direction: this._options.direction,
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeClass(this._triggers, 'collapsing');
                $$1.setAttribute(this._triggers, { 'aria-expanded': true });
                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.collapse');
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the element.
         */
        toggle() {
            if ($$1.hasClass(this._node, 'show')) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    // Collapse default options
    Collapse.defaults = {
        direction: 'bottom',
        duration: 250,
    };

    // Collapse init
    initComponent('collapse', Collapse);

    // Collapse events
    $$1.addEventDelegate(document$1, 'click.ui.collapse', '[data-ui-toggle="collapse"]', (e) => {
        e.preventDefault();

        const selector = getTargetSelector(e.currentTarget);
        const targets = $$1.find(selector);

        for (const target of targets) {
            const collapse = Collapse.init(target);
            collapse.toggle();
        }
    });

    /**
     * Popper Helpers
     */

    const poppers = new Set();

    let running$1 = false;

    /**
     * Add a Popper to the set, and attach the Popper events.
     * @param {Popper} popper The Popper.
     */
    function addPopper(popper) {
        poppers.add(popper);

        if (running$1) {
            return;
        }

        $$1.addEvent(
            window$1,
            'resize.ui.popper',
            $$1.debounce((_) => {
                for (const popper of poppers) {
                    popper.update();
                }
            }),
        );

        $$1.addEvent(
            document$1,
            'scroll.ui.popper',
            $$1.debounce((e) => {
                for (const popper of poppers) {
                    if (!$$1._isDocument(e.target) && !$$1.hasDescendent(e.target, popper.node)) {
                        continue;
                    }

                    popper.update();
                }
            }),
            { passive: true },
        );

        running$1 = true;
    }
    /**
     * Get the actual placement of the Popper.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {object} minimumBox The computed minimum bounding rectangle of the container.
     * @param {string} placement The initial placement of the Popper.
     * @param {number} spacing The amount of spacing to use.
     * @return {string} The new placement of the Popper.
     */
    function getPopperPlacement(nodeBox, referenceBox, minimumBox, placement, spacing) {
        const spaceTop = referenceBox.top - minimumBox.top;
        const spaceRight = minimumBox.right - referenceBox.right;
        const spaceBottom = minimumBox.bottom - referenceBox.bottom;
        const spaceLeft = referenceBox.left - minimumBox.left;

        if (placement === 'top') {
            // if node is bigger than space top and there is more room on bottom
            if (spaceTop < nodeBox.height + spacing &&
                spaceBottom > spaceTop) {
                return 'bottom';
            }
        } else if (placement === 'right') {
            // if node is bigger than space right and there is more room on left
            if (spaceRight < nodeBox.width + spacing &&
                spaceLeft > spaceRight) {
                return 'left';
            }
        } else if (placement === 'bottom') {
            // if node is bigger than space bottom and there is more room on top
            if (spaceBottom < nodeBox.height + spacing &&
                spaceTop > spaceBottom) {
                return 'top';
            }
        } else if (placement === 'left') {
            // if node is bigger than space left and there is more room on right
            if (spaceLeft < nodeBox.width + spacing &&
                spaceRight > spaceLeft) {
                return 'right';
            }
        } else if (placement === 'auto') {
            const maxVSpace = Math.max(spaceTop, spaceBottom);
            const maxHSpace = Math.max(spaceRight, spaceLeft);
            const minVSpace = Math.min(spaceTop, spaceBottom);

            if (
                maxHSpace > maxVSpace &&
                maxHSpace >= nodeBox.width + spacing &&
                minVSpace + referenceBox.height >= nodeBox.height + spacing - Math.max(0, nodeBox.height - referenceBox.height)
            ) {
                return spaceLeft > spaceRight ?
                    'left' :
                    'right';
            }

            const minHSpace = Math.min(spaceRight, spaceLeft);

            if (
                maxVSpace >= nodeBox.height + spacing &&
                minHSpace + referenceBox.width >= nodeBox.width + spacing - Math.max(0, nodeBox.width - referenceBox.width)
            ) {
                return spaceBottom > spaceTop ?
                    'bottom' :
                    'top';
            }

            const maxSpace = Math.max(maxVSpace, maxHSpace);

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
    }
    /**
     * Remove a Popper from the set, and detach the Popper events.
     * @param {Popper} popper The Popper.
     */
    function removePopper(popper) {
        poppers.delete(popper);

        if (poppers.size) {
            return;
        }

        $$1.removeEvent(window$1, 'resize.ui.popper');
        $$1.removeEvent(document$1, 'scroll.ui.popper');

        running$1 = false;
    }

    /**
     * Popper Class
     * @class
     */
    class Popper extends BaseComponent {
        /**
         * New Popper constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} options The options to create the Popper with.
         */
        constructor(node, options) {
            super(node, options);

            this._placement = $$1.getDataset(this._node, 'uiPlacement');

            $$1.setStyle(this._node, {
                margin: 0,
                position: 'absolute',
                top: 0,
                right: 'initial',
                bottom: 'initial',
                left: 0,
            });

            addPopper(this);

            this.update();
        }

        /**
         * Dispose the Popper.
         */
        dispose() {
            if (this._placement) {
                $$1.setDataset(this._node, { uiPlacement: this._placement });
            } else {
                $$1.removeDataset(this._node, 'uiPlacement');
            }

            if (!this._options.noAttributes) {
                $$1.removeDataset(this._options.reference, 'uiPlacement');
            }

            removePopper(this);

            super.dispose();
        }

        /**
         * Update the Popper position.
         */
        update() {
            if (!$$1.isConnected(this._node) || !$$1.isVisible(this._node)) {
                return;
            }

            // reset position
            const resetStyle = {};

            if (this._options.useGpu) {
                resetStyle.transform = '';
            } else {
                resetStyle.marginLeft = 0;
                resetStyle.marginTop = 0;
            }

            $$1.setStyle(this._node, resetStyle);

            if (this._options.beforeUpdate) {
                this._options.beforeUpdate(this._node, this._options.reference);
            }

            // calculate boxes
            const nodeBox = $$1.rect(this._node, { offset: true });
            const referenceBox = $$1.rect(this._options.reference, { offset: true });
            const windowBox = getScrollContainer(window$1, document$1);

            const scrollParent = $$1.closest(
                this._node,
                (parent) =>
                    $$1.css(parent, 'position') === 'relative' &&
                    ['overflow', 'overflowX', 'overflowY'].some((overflow) =>
                        ['auto', 'scroll'].includes(
                            $$1.css(parent, overflow),
                        ),
                    ),
                document$1.body,
            ).shift();

            const scrollBox = scrollParent ?
                getScrollContainer(scrollParent, scrollParent) :
                null;

            const containerBox = this._options.container ?
                $$1.rect(this._options.container, { offset: true }) :
                null;

            const minimumBox = {
                ...windowBox,
            };

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
            }

            // get optimal placement
            const placement = this._options.fixed && this._options.placement !== 'auto' ?
                this._options.placement :
                getPopperPlacement(
                    nodeBox,
                    referenceBox,
                    minimumBox,
                    this._options.placement,
                    this._options.spacing + 2,
                );

            if (!this._options.noAttributes) {
                $$1.setDataset(this._options.reference, { uiPlacement: placement });
            }

            $$1.setDataset(this._node, { uiPlacement: placement });

            // get auto position
            const position = this._options.position;

            // calculate actual offset
            const offset = {
                x: Math.round(referenceBox.x),
                y: Math.round(referenceBox.y),
            };

            // offset for relative parent
            const relativeParent = $$1.closest(
                this._node,
                (parent) =>
                    $$1.css(parent, 'position') === 'relative',
                document$1.body,
            ).shift();
            const relativeBox = relativeParent ?
                $$1.rect(relativeParent, { offset: true }) :
                null;

            if (relativeBox) {
                offset.x -= Math.round(relativeBox.x);
                offset.y -= Math.round(relativeBox.y);
            }

            // offset for placement
            if (placement === 'top') {
                offset.y -= Math.round(nodeBox.height) + this._options.spacing;
            } else if (placement === 'right') {
                offset.x += Math.round(referenceBox.width) + this._options.spacing;
            } else if (placement === 'bottom') {
                offset.y += Math.round(referenceBox.height) + this._options.spacing;
            } else if (placement === 'left') {
                offset.x -= Math.round(nodeBox.width) + this._options.spacing;
            }

            // offset for position
            if (['top', 'bottom'].includes(placement)) {
                const deltaX = Math.round(nodeBox.width) - Math.round(referenceBox.width);

                if (position === 'center') {
                    offset.x -= Math.round(deltaX / 2);
                } else if (position === 'end') {
                    offset.x -= deltaX;
                }
            } else {
                const deltaY = Math.round(nodeBox.height) - Math.round(referenceBox.height);

                if (position === 'center') {
                    offset.y -= Math.round(deltaY / 2);
                } else if (position === 'end') {
                    offset.y -= deltaY;
                }
            }

            // compensate for margins
            offset.x -= parseInt($$1.css(this._node, 'marginLeft'));
            offset.y -= parseInt($$1.css(this._node, 'marginTop'));

            // corrective positioning
            if (['left', 'right'].includes(placement)) {
                let offsetY = offset.y;
                let refTop = referenceBox.top;

                if (relativeBox) {
                    offsetY += relativeBox.top;
                    refTop -= relativeBox.top;
                }

                const minSize = this._options.minContact !== null ?
                    this._options.minContact :
                    Math.min(referenceBox.height, nodeBox.height);

                if (offsetY + nodeBox.height > minimumBox.bottom) {
                    // bottom of offset node is below the container
                    const diff = offsetY + nodeBox.height - minimumBox.bottom;
                    offset.y = Math.max(
                        refTop - nodeBox.height + minSize,
                        offset.y - diff,
                    );
                }

                if (offsetY < minimumBox.top) {
                    // top of offset node is above the container
                    const diff = offsetY - minimumBox.top;
                    offset.y = Math.min(
                        refTop + referenceBox.height - minSize,
                        offset.y - diff,
                    );
                }
            } else {
                let offsetX = offset.x;
                let refLeft = referenceBox.left;

                if (relativeBox) {
                    offsetX += relativeBox.left;
                    refLeft -= relativeBox.left;
                }

                const minSize = this._options.minContact !== null ?
                    this._options.minContact :
                    Math.min(referenceBox.width, nodeBox.width);

                if (offsetX + nodeBox.width > minimumBox.right) {
                    // right of offset node is to the right of the container
                    const diff = offsetX + nodeBox.width - minimumBox.right;
                    offset.x = Math.max(
                        refLeft - nodeBox.width + minSize,
                        offset.x - diff,
                    );
                }

                if (offsetX < minimumBox.left) {
                    // left of offset node is to the left of the container
                    const diff = offsetX - minimumBox.left;
                    offset.x = Math.min(
                        refLeft + referenceBox.width - minSize,
                        offset.x - diff,
                    );
                }
            }

            offset.x = Math.round(offset.x);
            offset.y = Math.round(offset.y);

            // compensate for scroll parent
            if (scrollParent) {
                offset.x += $$1.getScrollX(scrollParent);
                offset.y += $$1.getScrollY(scrollParent);
            }

            // update position
            const style = {};
            if (this._options.useGpu) {
                style.transform = `translate3d(${offset.x}px , ${offset.y}px , 0)`;
            } else {
                style.marginLeft = `${offset.x}px`;
                style.marginTop = `${offset.y}px`;
            }

            $$1.setStyle(this._node, style);

            // update arrow
            if (this._options.arrow) {
                this._updateArrow(placement, position);
            }

            if (this._options.afterUpdate) {
                this._options.afterUpdate(this._node, this._options.reference, placement, position);
            }
        }
    }

    /**
     * Dropdown Class
     * @class
     */
    class Dropdown extends BaseComponent {
        /**
         * New Dropdown constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Dropdown with.
         */
        constructor(node, options) {
            super(node, options);

            this._menuNode = $$1.next(this._node, '.dropdown-menu').shift();

            if (this._options.reference) {
                if (this._options.reference === 'parent') {
                    this._referenceNode = $$1.parent(this._node).shift();
                } else {
                    this._referenceNode = $$1.findOne(this._options.reference);
                }
            } else {
                this._referenceNode = this._node;
            }

            // Attach popper
            if (this._options.display !== 'static' && $$1.closest(this._node, '.navbar-nav').length) {
                this._options.display = 'static';
            }
        }

        /**
         * Dispose the Dropdown.
         */
        dispose() {
            if (this._popper) {
                this._popper.dispose();
                this._popper = null;
            }

            this._menuNode = null;
            this._referenceNode = null;

            super.dispose();
        }

        /**
         * Hide the Dropdown.
         */
        hide() {
            if (
                $$1.getDataset(this._menuNode, 'uiAnimating') ||
                !$$1.hasClass(this._menuNode, 'show') ||
                !$$1.triggerOne(this._node, 'hide.ui.dropdown')
            ) {
                return;
            }

            $$1.setDataset(this._menuNode, { uiAnimating: 'out' });

            $$1.fadeOut(this._menuNode, {
                duration: this._options.duration,
            }).then((_) => {
                if (this._popper) {
                    this._popper.dispose();
                    this._popper = null;
                }

                $$1.removeClass(this._menuNode, 'show');
                $$1.setAttribute(this._node, { 'aria-expanded': false });
                $$1.removeDataset(this._menuNode, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.dropdown');
            }).catch((_) => {
                if ($$1.getDataset(this._menuNode, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._menuNode, 'uiAnimating');
                }
            });
        }

        /**
         * Show the Dropdown.
         */
        show() {
            if (
                $$1.getDataset(this._menuNode, 'uiAnimating') ||
                $$1.hasClass(this._menuNode, 'show') ||
                !$$1.triggerOne(this._node, 'show.ui.dropdown')
            ) {
                return;
            }

            $$1.setDataset(this._menuNode, { uiAnimating: 'in' });
            $$1.addClass(this._menuNode, 'show');

            if (this._options.display === 'dynamic') {
                this._popper = new Popper(this._menuNode, {
                    reference: this._referenceNode,
                    placement: this._options.placement,
                    position: this._options.position,
                    fixed: this._options.fixed,
                    spacing: this._options.spacing,
                    minContact: this._options.minContact,
                });
            }

            window$1.requestAnimationFrame((_) => {
                this.update();
            });

            $$1.fadeIn(this._menuNode, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.setAttribute(this._node, { 'aria-expanded': true });
                $$1.removeDataset(this._menuNode, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.dropdown');
            }).catch((_) => {
                if ($$1.getDataset(this._menuNode, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._menuNode, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the Dropdown.
         */
        toggle() {
            if ($$1.hasClass(this._menuNode, 'show')) {
                this.hide();
            } else {
                this.show();
            }
        }

        /**
         * Update the Dropdown position.
         */
        update() {
            if (this._popper) {
                this._popper.update();
            }
        }
    }

    let clickTarget;

    // Track the target of mousedown events
    $$1.addEvent(window$1, 'mousedown.ui', (e) => {
        clickTarget = e.target;
    }, { capture: true });

    $$1.addEvent(window$1, 'mouseup.ui', (_) => {
        setTimeout((_) => {
            clickTarget = null;
        }, 0);
    }, { capture: true });

    /**
     * Get a click event target.
     * @param {Event} e The click event.
     * @return {HTMLElement} The click event target.
     */
    function getClickTarget(e) {
        return clickTarget || e.target;
    }

    // Dropdown default options
    Dropdown.defaults = {
        display: 'dynamic',
        duration: 100,
        placement: 'bottom',
        position: 'start',
        fixed: false,
        spacing: 3,
        minContact: false,
    };

    // Dropdown init
    initComponent('dropdown', Dropdown);

    // Dropdown events
    $$1.addEventDelegate(document$1, 'click.ui.dropdown keydown.ui.dropdown', '[data-ui-toggle="dropdown"]', (e) => {
        if (e.code && e.code !== 'Space') {
            return;
        }

        e.preventDefault();

        const dropdown = Dropdown.init(e.currentTarget);
        dropdown.toggle();
    });

    $$1.addEventDelegate(document$1, 'keydown.ui.dropdown', '[data-ui-toggle="dropdown"]', (e) => {
        switch (e.code) {
            case 'ArrowDown':
            case 'ArrowUp':
                e.preventDefault();

                const node = e.currentTarget;
                const dropdown = Dropdown.init(node);

                if (!$$1.hasClass(dropdown._menuNode, 'show')) {
                    dropdown.show();
                }

                const focusNode = $$1.findOne('.dropdown-item:not([tabindex="-1"])', dropdown._menuNode);
                $$1.focus(focusNode);
                break;
        }
    });

    $$1.addEventDelegate(document$1, 'keydown.ui.dropdown', '.dropdown-menu.show .dropdown-item', (e) => {
        let focusNode;

        switch (e.code) {
            case 'ArrowDown':
                focusNode = $$1.next(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').shift();
                break;
            case 'ArrowUp':
                focusNode = $$1.prev(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').pop();
                break;
            default:
                return;
        }

        e.preventDefault();

        $$1.focus(focusNode);
    });

    $$1.addEvent(document$1, 'click.ui.dropdown', (e) => {
        const target = getClickTarget(e);
        const nodes = $$1.find('.dropdown-menu.show');

        for (const node of nodes) {
            const toggle = $$1.siblings(node, '[data-ui-toggle="dropdown"]').shift();
            const dropdown = Dropdown.init(toggle);
            const hasDescendent = $$1.hasDescendent(dropdown._menuNode, target);
            const autoClose = dropdown._options.autoClose;

            if (
                $$1.isSame(dropdown._node, target) ||
                (
                    hasDescendent &&
                    (
                        $$1.is(target, 'form, input, textarea, select, option') ||
                        autoClose === 'outside' ||
                        autoClose === false
                    )
                ) ||
                (
                    !hasDescendent &&
                    !$$1.isSame(dropdown._menuNode, target) &&
                    (
                        autoClose === 'inside' ||
                        autoClose === false
                    )
                )
            ) {
                continue;
            }

            dropdown.hide();
        }
    }, { capture: true });

    $$1.addEvent(document$1, 'keydown.ui.dropdown', (e) => {
        if (e.code !== 'Escape') {
            return;
        }

        let stopped = false;
        const nodes = $$1.find('.dropdown-menu.show');

        for (const node of nodes) {
            const toggle = $$1.siblings(node, '[data-ui-toggle="dropdown"]').shift();
            const dropdown = Dropdown.init(toggle);

            if (!stopped) {
                stopped = true;
                e.stopPropagation();
            }

            dropdown.hide();
        }
    }, { capture: true });

    $$1.addEvent(document$1, 'keyup.ui.dropdown', (e) => {
        if (e.code !== 'Tab') {
            return;
        }

        let stopped = false;
        const nodes = $$1.find('.dropdown-menu.show');

        for (const node of nodes) {
            const toggle = $$1.siblings(node, '[data-ui-toggle="dropdown"]').shift();
            const dropdown = Dropdown.init(toggle);

            if ($$1.hasDescendent(dropdown._menuNode, e.target)) {
                continue;
            }

            if (!stopped) {
                stopped = true;
                e.stopPropagation();
            }

            dropdown.hide();
        }
    }, { capture: true });

    /**
     * FocusTrap Helpers
     */

    const focusTraps = new Set();

    let running = false;
    let reverse = false;

    /**
     * Add a FocusTrap to the set, and attach the FocusTrap events.
     * @param {FocusTrap} focusTrap The FocusTrap.
     */
    function addFocusTrap(focusTrap) {
        focusTraps.add(focusTrap);

        if (running) {
            return;
        }

        $$1.addEvent(document$1, 'focusin.ui.focustrap', (e) => {
            const activeTarget = [...focusTraps].pop()._node;

            if (
                $$1._isDocument(e.target) ||
                $$1.isSame(activeTarget, e.target) ||
                $$1.hasDescendent(activeTarget, e.target)
            ) {
                return;
            }

            const focusable = $$1.find('a, button, input, textarea, select, details, [tabindex], [contenteditable="true"]', activeTarget)
                .filter((node) => $$1.is(node, ':not(:disabled, .disabled)') && $$1.getAttribute(node, 'tabindex') >= 0 && $$1.isVisible(node));

            const focusTarget = reverse ?
                focusable.pop() :
                focusable.shift();

            $$1.focus(focusTarget || activeTarget);
        }, {
            capture: true,
        });

        $$1.addEvent(document$1, 'keydown.ui.focustrap', (e) => {
            if (e.key !== 'Tab') {
                return;
            }

            reverse = e.shiftKey;
        }, {
            capture: true,
        });

        running = true;
        reverse = false;
    }
    /**
     * Remove a FocusTrap from the set, and detach the FocusTrap events.
     * @param {FocusTrap} focusTrap The FocusTrap.
     */
    function removeFocusTrap(focusTrap) {
        focusTraps.delete(focusTrap);

        if (focusTraps.size) {
            return;
        }

        $$1.removeEvent(document$1, 'focusin.ui.focustrap');
        $$1.removeEvent(document$1, 'keydown.ui.focustrap');

        running = false;
    }

    /**
     * FocusTrap Class
     * @class
     */
    class FocusTrap extends BaseComponent {
        /**
         * Activate the FocusTrap.
         */
        activate() {
            if (this._active) {
                return;
            }

            addFocusTrap(this);

            if (this._options.autoFocus) {
                $.focus(this._node);
            }

            this._active = true;
        }

        /**
         * Deactivate the FocusTrap.
         */
        deactivate() {
            if (!this._active) {
                return;
            }

            removeFocusTrap(this);
            this._active = false;
        }

        /**
         * Dispose the FocusTrap.
         */
        dispose() {
            this.deactivate();

            super.dispose();
        }
    }

    // FocusTrap default options
    FocusTrap.defaults = {
        autoFocus: true,
    };

    // FocusTrap init
    initComponent('focustrap', FocusTrap);

    /**
     * Modal Class
     * @class
     */
    class Modal extends BaseComponent {
        /**
         * New Modal constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Modal with.
         */
        constructor(node, options) {
            super(node, options);

            this._dialog = $$1.child(this._node, '.modal-dialog').shift();

            if (this._options.show) {
                this.show();
            }

            if (this._options.focus) {
                this._focusTrap = FocusTrap.init(this._node);
            }
        }

        /**
         * Dispose the Modal.
         */
        dispose() {
            if (this._focusTrap) {
                this._focusTrap.dispose();
                this._focusTrap = null;
            }

            this._dialog = null;
            this._activeTarget = null;
            this._backdrop = null;
            this._scrollNodes = null;

            super.dispose();
        }

        /**
         * Hide the Modal.
         */
        hide() {
            if (
                $$1.getDataset(this._dialog, 'uiAnimating') ||
                !$$1.hasClass(this._node, 'show') ||
                !$$1.triggerOne(this._node, 'hide.ui.modal')
            ) {
                return;
            }

            $$1.stop(this._dialog);
            $$1.setDataset(this._dialog, { uiAnimating: 'out' });

            if (this._focusTrap) {
                this._focusTrap.deactivate();
            }

            const stackSize = $$1.find('.modal.show').length - 1;

            Promise.all([
                $$1.fadeOut(this._dialog, {
                    duration: this._options.duration,
                }),
                $$1.dropOut(this._dialog, {
                    duration: this._options.duration,
                    direction: 'top',
                }),
                $$1.fadeOut(this._backdrop, {
                    duration: this._options.duration,
                }),
            ]).then((_) => {
                $$1.setAttribute(this._node, {
                    'aria-hidden': true,
                    'aria-modal': false,
                });

                resetScrollPadding(this._scrollNodes);
                this._scrollNodes = [];

                if (stackSize) {
                    $$1.setStyle(this._node, { zIndex: '' });
                } else {
                    $$1.removeClass(document$1.body, 'modal-open');
                }

                $$1.removeClass(this._node, 'show');

                if (this._options.backdrop) {
                    $$1.remove(this._backdrop);
                    this._backdrop = null;
                }

                if (this._activeTarget) {
                    $$1.focus(this._activeTarget);
                    this._activeTarget = null;
                }

                $$1.removeDataset(this._dialog, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.modal');
            }).catch((_) => {
                if ($$1.getDataset(this._dialog, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._dialog, 'uiAnimating');
                }
            });
        }

        /**
         * Show the Modal.
         */
        show() {
            if (
                $$1.getDataset(this._dialog, 'uiAnimating') ||
                $$1.hasClass(this._node, 'show') ||
                !$$1.triggerOne(this._node, 'show.ui.modal', { data: { relatedTarget: this._activeTarget } })
            ) {
                return;
            }

            $$1.setDataset(this._dialog, { uiAnimating: true });

            const stackSize = $$1.find('.modal.show').length;

            $$1.removeClass(document$1.body, 'modal-open');

            this._scrollNodes = [this._dialog];

            if (stackSize) {
                let zIndex = $$1.css(this._node, 'zIndex');
                zIndex = parseInt(zIndex);
                zIndex += stackSize * 20;

                $$1.setStyle(this._node, { zIndex });
            } else if (!$$1.findOne('.offcanvas.show')) {
                this._scrollNodes.push(document$1.body);
                this._scrollNodes.push(...$$1.find('.fixed-top, .fixed-bottom, .sticky-top'));
            }

            addScrollPadding(this._scrollNodes);

            $$1.addClass(document$1.body, 'modal-open');

            $$1.addClass(this._node, 'show');

            if (this._options.backdrop) {
                this._backdrop = $$1.create('div', {
                    class: 'modal-backdrop',
                });

                $$1.append(document$1.body, this._backdrop);

                if (stackSize) {
                    let zIndex = $$1.css(this._backdrop, 'zIndex');
                    zIndex = parseInt(zIndex);
                    zIndex += stackSize * 20;

                    $$1.setStyle(this._backdrop, { zIndex });
                }
            }

            Promise.all([
                $$1.fadeIn(this._dialog, {
                    duration: this._options.duration,
                }),
                $$1.dropIn(this._dialog, {
                    duration: this._options.duration,
                    direction: 'top',
                }),
                $$1.fadeIn(this._backdrop, {
                    duration: this._options.duration,
                }),
            ]).then((_) => {
                $$1.setAttribute(this._node, {
                    'aria-hidden': false,
                    'aria-modal': true,
                });

                if (this._focusTrap) {
                    this._focusTrap.activate();
                }

                $$1.removeDataset(this._dialog, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.modal');
            }).catch((_) => {
                if ($$1.getDataset(this._dialog, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._dialog, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the Modal.
         */
        toggle() {
            if ($$1.hasClass(this._node, 'show')) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    /**
     * Modal Helpers
     */

    /**
     * Get the top modal.
     * @return {Modal} The Modal.
     */
    function getTopModal() {
        const nodes = $$1.find('.modal.show');

        if (!nodes.length) {
            return null;
        }

        // find modal with highest zIndex
        let node = nodes.shift();
        let highestZIndex = $$1.getStyle(node, 'zIndex');

        for (const otherNode of nodes) {
            const newZIndex = $$1.getStyle(otherNode, 'zIndex');

            if (newZIndex <= highestZIndex) {
                continue;
            }

            node = otherNode;
            highestZIndex = newZIndex;
        }

        return Modal.init(node);
    }

    /**
     * Start a zoom in/out animation.
     */
    function _zoom() {
        if ($$1.getDataset(this._dialog, 'uiAnimating')) {
            return;
        }

        $$1.stop(this._dialog);

        $$1.animate(
            this._dialog,
            (node, progress) => {
                if (progress >= 1) {
                    $$1.setStyle(node, { transform: '' });
                    return;
                }

                const zoomOffset = (progress < .5 ? progress : (1 - progress)) / 20;
                $$1.setStyle(node, { transform: `scale(${1 + zoomOffset})` });
            },
            {
                duration: 200,
            },
        ).catch((_) => {
            //
        });
    }

    // Modal default options
    Modal.defaults = {
        duration: 250,
        backdrop: true,
        focus: true,
        show: false,
        keyboard: true,
    };

    // Modal prototype
    const proto$3 = Modal.prototype;

    proto$3._zoom = _zoom;

    // Modal init
    initComponent('modal', Modal);

    // Modal events
    $$1.addEventDelegate(document$1, 'click.ui.modal', '[data-ui-toggle="modal"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.modal');
        const modal = Modal.init(target);
        modal._activeTarget = e.currentTarget;
        modal.show();
    });

    $$1.addEventDelegate(document$1, 'click.ui.modal', '[data-ui-dismiss="modal"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.modal');
        const modal = Modal.init(target);
        modal.hide();
    });

    // Events must be attached to the window, so offcanvas events are triggered first
    $$1.addEvent(window$1, 'click.ui.modal', (e) => {
        const target = getClickTarget(e);

        if ($$1.is(target, '[data-ui-dismiss]')) {
            return;
        }

        const modal = getTopModal();

        if (
            !modal ||
            !modal._options.backdrop ||
            (modal._node !== target && $$1.hasDescendent(modal._node, target))
        ) {
            return;
        }

        if (modal._options.backdrop === 'static') {
            modal._zoom();
            return;
        }

        modal.hide();
    });

    $$1.addEvent(window$1, 'keydown.ui.modal', (e) => {
        if (e.code !== 'Escape') {
            return;
        }

        const modal = getTopModal();

        if (!modal || !modal._options.keyboard) {
            return;
        }

        if (modal._options.backdrop === 'static') {
            modal._zoom();
            return;
        }

        modal.hide();
    });

    /**
     * Offcanvas Helpers
     */

    /**
     * Get the slide animation direction.
     * @param {HTMLElement} node The offcanvas node.
     * @return {string} The animation direction.
     */
    function getDirection(node) {
        if ($$1.hasClass(node, 'offcanvas-end')) {
            return 'right';
        }

        if ($$1.hasClass(node, 'offcanvas-bottom')) {
            return 'bottom';
        }

        if ($$1.hasClass(node, 'offcanvas-start')) {
            return 'left';
        }

        return 'top';
    }

    /**
     * Offcanvas Class
     * @class
     */
    class Offcanvas extends BaseComponent {
        /**
         * New Offcanvas constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Offcanvas with.
         */
        constructor(node, options) {
            super(node, options);

            if (!this._options.scroll || this._options.backdrop) {
                this._focusTrap = FocusTrap.init(this._node);
            }
        }

        /**
         * Dispose the Offcanvas.
         */
        dispose() {
            if (this._focusTrap) {
                this._focusTrap.dispose();
                this._focusTrap = null;
            }

            this._activeTarget = null;
            this._scrollNodes = null;

            super.dispose();
        }

        /**
         * Hide the Offcanvas.
         */
        hide() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                !$$1.hasClass(this._node, 'show') ||
                !$$1.triggerOne(this._node, 'hide.ui.offcanvas')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'out' });

            if (this._focusTrap) {
                this._focusTrap.deactivate();
            }

            Promise.all([
                $$1.fadeOut(this._node, {
                    duration: this._options.duration,
                }),
                $$1.dropOut(this._node, {
                    duration: this._options.duration,
                    direction: getDirection(this._node),
                }),
            ]).then((_) => {
                $$1.setAttribute(this._node, {
                    'aria-hidden': true,
                    'aria-modal': false,
                });

                $$1.removeClass(this._node, 'show');

                if (this._options.backdrop) {
                    $$1.removeClass(document$1.body, 'offcanvas-backdrop');
                }

                if (!this._options.scroll) {
                    resetScrollPadding(this._scrollNodes);
                    this._scrollNodes = [];

                    $$1.setStyle(document$1.body, { overflow: '' });
                }

                if (this._activeTarget) {
                    $$1.focus(this._activeTarget);
                    this._activeTarget = null;
                }

                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.offcanvas');
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }

        /**
         * Show the Offcanvas.
         */
        show() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                $$1.hasClass(this._node, 'show') ||
                $$1.findOne('.offcanvas.show') ||
                !$$1.triggerOne(this._node, 'show.ui.offcanvas')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'in' });
            $$1.addClass(this._node, 'show');

            if (this._options.backdrop) {
                $$1.addClass(document$1.body, 'offcanvas-backdrop');
            }

            this._scrollNodes = [];

            if (!this._options.scroll) {
                this._scrollNodes.push(document$1.body);
                this._scrollNodes.push(...$$1.find('.fixed-top, .fixed-bottom, .sticky-top'));

                addScrollPadding(this._scrollNodes);

                $$1.setStyle(document$1.body, { overflow: 'hidden' });
            }

            Promise.all([
                $$1.fadeIn(this._node, {
                    duration: this._options.duration,
                }),
                $$1.dropIn(this._node, {
                    duration: this._options.duration,
                    direction: getDirection(this._node),
                }),
            ]).then((_) => {
                $$1.setAttribute(this._node, {
                    'aria-hidden': false,
                    'aria-modal': true,
                });

                if (this._focusTrap) {
                    this._focusTrap.activate();
                }

                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.offcanvas');
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the Offcanvas.
         */
        toggle() {
            if ($$1.hasClass(this._node, 'show')) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    // Offcanvas default options
    Offcanvas.defaults = {
        duration: 250,
        backdrop: true,
        keyboard: true,
        scroll: false,
    };

    // Offcanvas init
    initComponent('offcanvas', Offcanvas);

    // Offcanvas events
    $$1.addEventDelegate(document$1, 'click.ui.offcanvas', '[data-ui-toggle="offcanvas"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.offcanvas');
        const offcanvas = Offcanvas.init(target);
        offcanvas._activeTarget = e.currentTarget;
        offcanvas.show();
    });

    $$1.addEventDelegate(document$1, 'click.ui.offcanvas', '[data-ui-dismiss="offcanvas"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.offcanvas');
        const offcanvas = Offcanvas.init(target);
        offcanvas.hide();
    });

    $$1.addEvent(document$1, 'click.ui.offcanvas', (e) => {
        const target = getClickTarget(e);

        if ($$1.is(target, '[data-ui-dismiss]') || $$1.findOne('.modal.show')) {
            return;
        }

        const nodes = $$1.find('.offcanvas.show');

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const offcanvas = Offcanvas.init(node);

            if (
                !offcanvas._options.backdrop ||
                offcanvas._options.backdrop === 'static' ||
                $$1.isSame(offcanvas._node, target) ||
                $$1.hasDescendent(offcanvas._node, target)
            ) {
                continue;
            }

            offcanvas.hide();
        }
    });

    $$1.addEvent(document$1, 'keydown.ui.offcanvas', (e) => {
        if (e.code !== 'Escape' || $$1.findOne('.modal.show')) {
            return;
        }

        const nodes = $$1.find('.offcanvas.show');

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const offcanvas = Offcanvas.init(node);

            if (!offcanvas._options.keyboard) {
                return;
            }

            offcanvas.hide();
        }
    });

    /**
     * Popover Class
     * @class
     */
    class Popover extends BaseComponent {
        /**
         * New Popover constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Popover with.
         */
        constructor(node, options) {
            super(node, options);

            this._modal = $$1.closest(this._node, '.modal').shift();

            this._triggers = this._options.trigger.split(' ');

            this._render();
            this._events();

            if (this._options.enable) {
                this.enable();
            }

            this.refresh();
        }

        /**
         * Dispose the Popover.
         */
        dispose() {
            if ($$1.hasDataset(this._node, 'uiOriginalTitle')) {
                const title = $$1.getDataset(this._node, 'uiOriginalTitle');
                $$1.setAttribute(this._node, { title });
                $$1.removeDataset(this._node, 'uiOriginalTitle');
            }

            if (this._popper) {
                this._popper.dispose();
                this._popper = null;
            }

            $$1.remove(this._popover);

            if (this._triggers.includes('hover')) {
                $$1.removeEvent(this._node, 'mouseover.ui.popover');
                $$1.removeEvent(this._node, 'mouseout.ui.popover');
            }

            if (this._triggers.includes('focus')) {
                $$1.removeEvent(this._node, 'focus.ui.popover');
                $$1.removeEvent(this._node, 'blur.ui.popover');
            }

            if (this._triggers.includes('click')) {
                $$1.removeEvent(this._node, 'click.ui.popover');
            }

            if (this._modal) {
                $$1.removeEvent(this._modal, 'hide.ui.modal', this._hideModalEvent);
            }

            this._modal = null;
            this._triggers = null;
            this._popover = null;
            this._popoverHeader = null;
            this._popoverBody = null;
            this._arrow = null;

            super.dispose();
        }

        /**
         * Disable the Popover.
         */
        disable() {
            this._enabled = false;
        }

        /**
         * Enable the Popover.
         */
        enable() {
            this._enabled = true;
        }

        /**
         * Hide the Popover.
         */
        hide() {
            if (
                !this._enabled ||
                $$1.getDataset(this._popover, 'uiAnimating') ||
                !$$1.isConnected(this._popover) ||
                !$$1.triggerOne(this._node, 'hide.ui.popover')
            ) {
                return;
            }

            $$1.setDataset(this._popover, { uiAnimating: 'out' });

            $$1.fadeOut(this._popover, {
                duration: this._options.duration,
            }).then((_) => {
                this._popper.dispose();
                this._popper = null;

                $$1.detach(this._popover);
                $$1.removeDataset(this._popover, 'uiAnimating');
                $$1.removeAttribute(this._node, 'aria-described-by');
                $$1.triggerEvent(this._node, 'hidden.ui.popover');
            }).catch((_) => {
                if ($$1.getDataset(this._popover, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._popover, 'uiAnimating');
                }
            });
        }

        /**
         * Refresh the Popover.
         */
        refresh() {
            if ($$1.hasAttribute(this._node, 'title')) {
                const originalTitle = $$1.getAttribute(this._node, 'title');
                $$1.setDataset(this._node, { uiOriginalTitle: originalTitle });
                $$1.removeAttribute(this._node, 'title');
            }

            let title = '';
            if ($$1.hasDataset(this._node, 'uiTitle')) {
                title = $$1.getDataset(this._node, 'uiTitle');
            } else if (this._options.title) {
                title = this._options.title;
            } else if ($$1.hasDataset(this._node, 'uiOriginalTitle')) {
                title = $$1.getDataset(this._node, 'uiOriginalTitle', title);
            }

            let content = '';
            if ($$1.hasDataset(this._node, 'uiContent')) {
                content = $$1.getDataset(this._node, 'uiContent');
            } else if (this._options.content) {
                content = this._options.content;
            }

            const method = this._options.html ? 'setHTML' : 'setText';

            $$1[method](
                this._popoverHeader,
                this._options.html && this._options.sanitize ?
                    this._options.sanitize(title) :
                    title,
            );

            if (!title) {
                $$1.hide(this._popoverHeader);
            } else {
                $$1.show(this._popoverHeader);
            }

            $$1[method](
                this._popoverBody,
                this._options.html && this._options.sanitize ?
                    this._options.sanitize(content) :
                    content,
            );
        }

        /**
         * Show the Popover.
         */
        show() {
            if (
                !this._enabled ||
                $$1.getDataset(this._popover, 'uiAnimating') ||
                $$1.isConnected(this._popover) ||
                !$$1.triggerOne(this._node, 'show.ui.popover')
            ) {
                return;
            }

            $$1.setDataset(this._popover, { uiAnimating: 'in' });
            this.refresh();
            this._show();

            $$1.fadeIn(this._popover, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeDataset(this._popover, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.popover');
            }).catch((_) => {
                if ($$1.getDataset(this._popover, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._popover, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the Popover.
         */
        toggle() {
            if ($$1.isConnected(this._popover)) {
                this.hide();
            } else {
                this.show();
            }
        }

        /**
         * Update the Popover position.
         */
        update() {
            if (this._popper) {
                this._popper.update();
            }
        }
    }

    /**
     * Attach events for the Popover.
     */
    function _events$1() {
        if (this._triggers.includes('hover')) {
            $$1.addEvent(this._node, 'mouseover.ui.popover', (_) => {
                this._stop();
                this.show();
            });

            $$1.addEvent(this._node, 'mouseout.ui.popover', (_) => {
                this._stop();
                this.hide();
            });
        }

        if (this._triggers.includes('focus')) {
            $$1.addEvent(this._node, 'focus.ui.popover', (_) => {
                this._stop();
                this.show();
            });

            $$1.addEvent(this._node, 'blur.ui.popover', (_) => {
                this._stop();
                this.hide();
            });
        }

        if (this._triggers.includes('click')) {
            $$1.addEvent(this._node, 'click.ui.popover', (e) => {
                e.preventDefault();

                this._stop();
                this.toggle();
            });
        }

        if (this._modal) {
            $$1.addEvent(this._modal, 'hide.ui.modal', (_) => {
                this._stop();
                this.hide();
            });
        }
    }

    /**
     * Update the arrow.
     * @param {string} placement The placement of the Popper.
     * @param {string} position The position of the Popper.
     */
    function _updateArrow(placement, position) {
        const nodeBox = $$1.rect(this._node, { offset: true });
        const referenceBox = $$1.rect(this._options.reference, { offset: true });

        const arrowStyles = {
            position: 'absolute',
            top: '',
            right: '',
            bottom: '',
            left: '',
        };
        $$1.setStyle(this._options.arrow, arrowStyles);

        const arrowBox = $$1.rect(this._options.arrow, { offset: true });

        if (['top', 'bottom'].includes(placement)) {
            arrowStyles[placement === 'top' ? 'bottom' : 'top'] = -Math.floor(arrowBox.height);
            const diff = (referenceBox.width - nodeBox.width) / 2;

            let offset = (nodeBox.width / 2) - (arrowBox.width / 2);
            if (position === 'start') {
                offset += diff;
            } else if (position === 'end') {
                offset -= diff;
            }

            let min = Math.max(referenceBox.left, nodeBox.left) - arrowBox.left;
            let max = Math.min(referenceBox.right, nodeBox.right) - arrowBox.left - arrowBox.width;

            if (referenceBox.width < arrowBox.width) {
                min -= arrowBox.width / 2 - referenceBox.width / 2;
                max -= arrowBox.width / 2 - referenceBox.width / 2;
            }

            offset = Math.round(offset);
            min = Math.round(min);
            max = Math.round(max);

            arrowStyles.left = $$1._clamp(offset, min, max);
        } else {
            arrowStyles[placement === 'right' ? 'left' : 'right'] = -Math.floor(arrowBox.width);

            const diff = (referenceBox.height - nodeBox.height) / 2;

            let offset = (nodeBox.height / 2) - arrowBox.height;
            if (position === 'start') {
                offset += diff;
            } else if (position === 'end') {
                offset -= diff;
            }

            let min = Math.max(referenceBox.top, nodeBox.top) - arrowBox.top;
            let max = Math.min(referenceBox.bottom, nodeBox.bottom) - arrowBox.top - arrowBox.height;

            if (referenceBox.height < arrowBox.height * 2) {
                min -= arrowBox.height - referenceBox.height / 2;
                max -= arrowBox.height - referenceBox.height / 2;
            } else {
                max -= arrowBox.height;
            }

            offset = Math.round(offset);
            min = Math.round(min);
            max = Math.round(max);

            arrowStyles.top = $$1._clamp(offset, min, max);
        }

        $$1.setStyle(this._options.arrow, arrowStyles);
    }

    // Popper default options
    Popper.defaults = {
        reference: null,
        container: null,
        arrow: null,
        afterUpdate: null,
        beforeUpdate: null,
        placement: 'bottom',
        position: 'center',
        fixed: false,
        spacing: 0,
        minContact: null,
        useGpu: true,
        noAttributes: false,
    };

    // Popper prototype
    const proto$2 = Popper.prototype;

    proto$2._updateArrow = _updateArrow;

    // Popper init
    initComponent('popper', Popper);

    /**
     * Update the Popover and append to the DOM.
     */
    function _show$1() {
        if (this._options.appendTo) {
            $$1.append(this._options.appendTo, this._popover);
        } else {
            $$1.after(this._node, this._popover);
        }

        if (!this._options.noAttributes) {
            const id = generateId(this.constructor.DATA_KEY);
            $$1.setAttribute(this._popover, { id });
            $$1.setAttribute(this._node, { 'aria-described-by': id });
        }

        this._popper = new Popper(
            this._popover,
            {
                reference: this._node,
                arrow: this._arrow,
                placement: this._options.placement,
                position: this._options.position,
                fixed: this._options.fixed,
                spacing: this._options.spacing,
                minContact: this._options.minContact,
                noAttributes: this._options.noAttributes,
            },
        );

        window.requestAnimationFrame((_) => {
            this.update();
        });
    }
    /**
     * Stop the animations.
     */
    function _stop$1() {
        if (!this._enabled) {
            return;
        }

        const animating = $$1.getDataset(this._popover, 'uiAnimating');

        if (!animating) {
            return;
        }

        $$1.stop(this._popover, { finish: false });
        $$1.removeDataset(this._popover, 'uiAnimating');

        if (animating === 'out') {
            this._popper.dispose();
            this._popper = null;

            $$1.detach(this._popover);
        }
    }

    /**
     * Render the Popover element.
     */
    function _render$1() {
        this._popover = $$1.parseHTML(this._options.template).shift();
        if (this._options.customClass) {
            $$1.addClass(this._popover, this._options.customClass);
        }
        this._arrow = $$1.findOne('.popover-arrow', this._popover);
        this._popoverHeader = $$1.findOne('.popover-header', this._popover);
        this._popoverBody = $$1.findOne('.popover-body', this._popover);
    }

    // Popover default options
    Popover.defaults = {
        template: '<div class="popover" role="tooltip">' +
            '<div class="popover-arrow"></div>' +
            '<h3 class="popover-header"></h3>' +
            '<div class="popover-body"></div>' +
            '</div>',
        customClass: null,
        duration: 100,
        enable: true,
        html: false,
        appendTo: null,
        sanitize: (input) => $$1.sanitize(input),
        trigger: 'click',
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 3,
        minContact: false,
        noAttributes: false,
    };

    // Popover prototype
    const proto$1 = Popover.prototype;

    proto$1._events = _events$1;
    proto$1._render = _render$1;
    proto$1._show = _show$1;
    proto$1._stop = _stop$1;

    // Popover init
    initComponent('popover', Popover);

    /**
     * Tab Class
     * @class
     */
    class Tab extends BaseComponent {
        /**
         * New Tab constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Tab with.
         */
        constructor(node, options) {
            super(node, options);

            const selector = getTargetSelector(this._node);
            this._target = $$1.findOne(selector);
            this._siblings = $$1.siblings(this._node);
        }

        /**
         * Dispose the Tab.
         */
        dispose() {
            this._target = null;
            this._siblings = null;

            super.dispose();
        }

        /**
         * Hide the current Tab.
         */
        hide() {
            if (
                $$1.getDataset(this._target, 'uiAnimating') ||
                !$$1.hasClass(this._target, 'active') ||
                !$$1.triggerOne(this._node, 'hide.ui.tab')
            ) {
                return;
            }

            this._hide();
        }

        /**
         * Hide any active Tabs, and show the current Tab.
         */
        show() {
            if (
                $$1.getDataset(this._target, 'uiAnimating') ||
                $$1.hasClass(this._target, 'active') ||
                !$$1.triggerOne(this._node, 'show.ui.tab')
            ) {
                return;
            }

            const active = this._siblings.find((sibling) =>
                $$1.hasClass(sibling, 'active'),
            );

            if (!active) {
                this._show();
            } else {
                const activeTab = this.constructor.init(active);

                if (activeTab.animating) {
                    return;
                }

                if (!$$1.triggerOne(active, 'hide.ui.tab')) {
                    return;
                }

                $$1.addEventOnce(active, 'hidden.ui.tab', (_) => {
                    this._show();
                });

                activeTab._hide();
            }
        }

        /**
         * Hide the current Tab (forcefully).
         */
        _hide() {
            $$1.setDataset(this._target, { uiAnimating: 'out' });

            $$1.fadeOut(this._target, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeClass(this._target, 'active');
                $$1.removeClass(this._node, 'active');
                $$1.removeDataset(this._target, 'uiAnimating');
                $$1.setAttribute(this._node, { 'aria-selected': false });
                $$1.triggerEvent(this._node, 'hidden.ui.tab');
            }).catch((_) => {
                if ($$1.getDataset(this._target, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._target, 'uiAnimating');
                }
            });
        }

        /**
         * Show the current Tab (forcefully).
         */
        _show() {
            $$1.setDataset(this._target, { uiAnimating: 'in' });

            $$1.addClass(this._target, 'active');
            $$1.addClass(this._node, 'active');

            $$1.fadeIn(this._target, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.setAttribute(this._node, { 'aria-selected': true });
                $$1.removeDataset(this._target, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.tab');
            }).catch((_) => {
                if ($$1.getDataset(this._target, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._target, 'uiAnimating');
                }
            });
        }
    }

    // Tab default options
    Tab.defaults = {
        duration: 100,
    };

    // Tab init
    initComponent('tab', Tab);

    // Tab events
    $$1.addEventDelegate(document$1, 'click.ui.tab keydown.ui.tab', '[data-ui-toggle="tab"]', (e) => {
        if (e.code && e.code !== 'Space') {
            return;
        }

        e.preventDefault();

        const tab = Tab.init(e.currentTarget);
        tab.show();
    });

    $$1.addEventDelegate(document$1, 'keydown.ui.tab', '[data-ui-toggle="tab"]', (e) => {
        let newTarget;

        switch (e.code) {
            case 'ArrowDown':
            case 'ArrowRight':
                newTarget = $$1.next(e.currentTarget, '[data-ui-toggle="tab"]:not(.disabled)').shift();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                newTarget = $$1.prev(e.currentTarget, '[data-ui-toggle="tab"]:not(.disabled)').pop();
                break;
            case 'Home':
                newTarget = $$1.prevAll(e.currentTarget, '[data-ui-toggle="tab"]:not(.disabled)').shift();
                break;
            case 'End':
                newTarget = $$1.nextAll(e.currentTarget, '[data-ui-toggle="tab"]:not(.disabled)').pop();
                break;
            default:
                return;
        }

        if (!newTarget) {
            return;
        }

        e.preventDefault();

        $$1.focus(newTarget);
    });

    /**
     * Toast Class
     * @class
     */
    class Toast extends BaseComponent {
        /**
         * Hide the Toast.
         */
        hide() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                !$$1.isVisible(this._node) ||
                !$$1.triggerOne(this._node, 'hide.ui.toast')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'out' });

            $$1.fadeOut(this._node, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.setStyle(this._node, { display: 'none' }, null, { important: true });
                $$1.removeClass(this._node, 'show');
                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.toast');
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }

        /**
         * Show the Toast.
         */
        show() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                $$1.isVisible(this._node) ||
                !$$1.triggerOne(this._node, 'show.ui.toast')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'in' });
            $$1.setStyle(this._node, { display: '' });
            $$1.addClass(this._node, 'show');

            $$1.fadeIn(this._node, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.toast');

                if (this._options.autohide) {
                    setTimeout(
                        (_) => this.hide(),
                        this._options.delay,
                    );
                }
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }
    }

    // Toast default options
    Toast.defaults = {
        autohide: true,
        delay: 5000,
        duration: 100,
    };

    // Toast init
    initComponent('toast', Toast);

    // Toast events
    $$1.addEventDelegate(document$1, 'click.ui.toast', '[data-ui-dismiss="toast"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.toast');
        const toast = Toast.init(target, { autohide: false });
        toast.hide();
    });

    /**
     * Tooltip Class
     * @class
     */
    class Tooltip extends BaseComponent {
        /**
         * New Tooltip constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Tooltip with.
         */
        constructor(node, options) {
            super(node, options);

            this._modal = $$1.closest(this._node, '.modal').shift();

            this._triggers = this._options.trigger.split(' ');

            this._render();
            this._events();

            if (this._options.enable) {
                this.enable();
            }

            this.refresh();
        }

        /**
         * Dispose the Tooltip.
         */
        dispose() {
            if ($$1.hasDataset(this._node, 'uiOriginalTitle')) {
                const title = $$1.getDataset(this._node, 'uiOriginalTitle');
                $$1.setAttribute(this._node, { title });
                $$1.removeDataset(this._node, 'uiOriginalTitle');
            }

            if (this._popper) {
                this._popper.dispose();
                this._popper = null;
            }

            $$1.remove(this._tooltip);

            if (this._triggers.includes('hover')) {
                $$1.removeEvent(this._node, 'mouseover.ui.tooltip');
                $$1.removeEvent(this._node, 'mouseout.ui.tooltip');
            }

            if (this._triggers.includes('focus')) {
                $$1.removeEvent(this._node, 'focus.ui.tooltip');
                $$1.removeEvent(this._node, 'blur.ui.tooltip');
            }

            if (this._triggers.includes('click')) {
                $$1.removeEvent(this._node, 'click.ui.tooltip');
            }

            if (this._modal) {
                $$1.removeEvent(this._modal, 'hide.ui.modal');
            }

            this._modal = null;
            this._triggers = null;
            this._tooltip = null;
            this._tooltipInner = null;
            this._arrow = null;

            super.dispose();
        }

        /**
         * Disable the Tooltip.
         */
        disable() {
            this._enabled = false;
        }

        /**
         * Enable the Tooltip.
         */
        enable() {
            this._enabled = true;
        }

        /**
         * Hide the Tooltip.
         */
        hide() {
            if (
                !this._enabled ||
                $$1.getDataset(this._tooltip, 'uiAnimating') ||
                !$$1.isConnected(this._tooltip) ||
                !$$1.triggerOne(this._node, 'hide.ui.tooltip')
            ) {
                return;
            }

            $$1.setDataset(this._tooltip, { uiAnimating: 'out' });

            $$1.fadeOut(this._tooltip, {
                duration: this._options.duration,
            }).then((_) => {
                this._popper.dispose();
                this._popper = null;

                $$1.removeClass(this._tooltip, 'show');
                $$1.detach(this._tooltip);
                $$1.removeDataset(this._tooltip, 'uiAnimating');
                $$1.removeAttribute(this._node, 'aria-described-by');
                $$1.triggerEvent(this._node, 'hidden.ui.tooltip');
            }).catch((_) => {
                if ($$1.getDataset(this._tooltip, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._tooltip, 'uiAnimating');
                }
            });
        }

        /**
         * Refresh the Tooltip.
         */
        refresh() {
            if ($$1.hasAttribute(this._node, 'title')) {
                const originalTitle = $$1.getAttribute(this._node, 'title');
                $$1.setDataset(this._node, { uiOriginalTitle: originalTitle });
                $$1.removeAttribute(this._node, 'title');
            }

            let title = '';
            if ($$1.hasDataset(this._node, 'uiTitle')) {
                title = $$1.getDataset(this._node, 'uiTitle');
            } else if (this._options.title) {
                title = this._options.title;
            } else if ($$1.hasDataset(this._node, 'uiOriginalTitle')) {
                title = $$1.getDataset(this._node, 'uiOriginalTitle', title);
            }

            const method = this._options.html ? 'setHTML' : 'setText';

            $$1[method](
                this._tooltipInner,
                this._options.html && this._options.sanitize ?
                    this._options.sanitize(title) :
                    title,
            );

            this.update();
        }

        /**
         * Show the Tooltip.
         */
        show() {
            if (
                !this._enabled ||
                $$1.getDataset(this._tooltip, 'uiAnimating') ||
                $$1.isConnected(this._tooltip) ||
                !$$1.triggerOne(this._node, 'show.ui.tooltip')
            ) {
                return;
            }

            $$1.setDataset(this._tooltip, { uiAnimating: 'in' });
            $$1.addClass(this._tooltip, 'show');
            this.refresh();
            this._show();

            $$1.fadeIn(this._tooltip, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeDataset(this._tooltip, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.tooltip');
            }).catch((_) => {
                if ($$1.getDataset(this._tooltip, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._tooltip, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the Tooltip.
         */
        toggle() {
            if ($$1.isConnected(this._tooltip)) {
                this.hide();
            } else {
                this.show();
            }
        }

        /**
         * Update the Tooltip position.
         */
        update() {
            if (this._popper) {
                this._popper.update();
            }
        }
    }

    /**
     * Attach events for the Tooltip.
     */
    function _events() {
        if (this._triggers.includes('hover')) {
            $$1.addEvent(this._node, 'mouseover.ui.tooltip', (_) => {
                this._stop();
                this.show();
            });

            $$1.addEvent(this._node, 'mouseout.ui.tooltip', (_) => {
                this._stop();
                this.hide();
            });
        }

        if (this._triggers.includes('focus')) {
            $$1.addEvent(this._node, 'focus.ui.tooltip', (_) => {
                this._stop();
                this.show();
            });

            $$1.addEvent(this._node, 'blur.ui.tooltip', (_) => {
                this._stop();
                this.hide();
            });
        }

        if (this._triggers.includes('click')) {
            $$1.addEvent(this._node, 'click.ui.tooltip', (e) => {
                e.preventDefault();

                this._stop();
                this.toggle();
            });
        }

        if (this._modal) {
            $$1.addEvent(this._modal, 'hide.ui.modal', (_) => {
                this._stop();
                this.hide();
            });
        }
    }

    /**
     * Update the Tooltip and append to the DOM.
     */
    function _show() {
        if (this._options.appendTo) {
            $$1.append(this._options.appendTo, this._tooltip);
        } else {
            $$1.after(this._node, this._tooltip);
        }

        if (!this._options.noAttributes) {
            const id = generateId(this.constructor.DATA_KEY);
            $$1.setAttribute(this._tooltip, { id });
            $$1.setAttribute(this._node, { 'aria-described-by': id });
        }

        this._popper = new Popper(
            this._tooltip,
            {
                reference: this._node,
                arrow: this._arrow,
                placement: this._options.placement,
                position: this._options.position,
                fixed: this._options.fixed,
                spacing: this._options.spacing,
                minContact: this._options.minContact,
                noAttributes: this._options.noAttributes,
            },
        );

        window.requestAnimationFrame((_) => {
            this.update();
        });
    }
    /**
     * Stop the animations.
     */
    function _stop() {
        if (!this._enabled) {
            return;
        }

        const animating = $$1.getDataset(this._tooltip, 'uiAnimating');

        if (!animating) {
            return;
        }

        $$1.stop(this._tooltip, { finish: false });
        $$1.removeDataset(this._tooltip, 'uiAnimating');

        if (animating === 'out') {
            this._popper.dispose();
            this._popper = null;

            $$1.removeClass(this._tooltip, 'show');
            $$1.detach(this._tooltip);
        }
    }

    /**
     * Render the Tooltip element.
     */
    function _render() {
        this._tooltip = $$1.parseHTML(this._options.template).shift();
        if (this._options.customClass) {
            $$1.addClass(this._tooltip, this._options.customClass);
        }
        this._arrow = $$1.findOne('.tooltip-arrow', this._tooltip);
        this._tooltipInner = $$1.findOne('.tooltip-inner', this._tooltip);
    }

    // Tooltip default options
    Tooltip.defaults = {
        template: '<div class="tooltip" role="tooltip">' +
            '<div class="tooltip-arrow"></div>' +
            '<div class="tooltip-inner"></div>' +
            '</div>',
        customClass: null,
        duration: 100,
        enable: true,
        html: false,
        trigger: 'hover focus',
        appendTo: null,
        sanitize: (input) => $$1.sanitize(input),
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 2,
        minContact: false,
        noAttributes: false,
    };

    // Tooltip prototype
    const proto = Tooltip.prototype;

    proto._events = _events;
    proto._render = _render;
    proto._show = _show;
    proto._stop = _stop;

    // Tooltip init
    initComponent('tooltip', Tooltip);

    // Clipboard events
    $$1.addEventDelegate(document$1, 'click', '[data-ui-toggle="clipboard"]', (e) => {
        e.preventDefault();

        const node = e.currentTarget;
        let { action = 'copy', text = null } = getDataset(node);

        if (!['copy', 'cut'].includes(action)) {
            throw new Error('Invalid clipboard action');
        }

        let input;
        if (!text) {
            const target = getTarget(node);
            if ($$1.is(target, 'input, textarea')) {
                input = target;
                text = $$1.getValue(input);
            } else {
                text = $$1.getText(target);
            }
        }

        const customText = !input;
        if (customText) {
            input = $$1.create(
                'textarea',
                {
                    class: 'visually-hidden position-fixed',
                    value: text,
                },
            );

            $$1.append(document$1.body, input);
        }

        $$1.select(input);

        if ($$1.exec(action)) {
            $$1.triggerEvent(node, 'copied.ui.clipboard', {
                data: {
                    action: action,
                    text,
                },
            });
        }

        if (customText) {
            $$1.detach(input);
        }
    });

    // Ripple events
    $$1.addEventDelegate(document$1, 'mousedown.ui.ripple', '.ripple', (e) => {
        const target = e.currentTarget;
        const pos = $$1.position(target, { offset: true });

        const width = $$1.width(target);
        const height = $$1.height(target);
        const scaleMultiple = Math.max(width, height) * 3;

        const isFixed = $$1.isFixed(target);
        const mouseX = isFixed ? e.clientX : e.pageX;
        const mouseY = isFixed ? e.clientY : e.pageY;

        const prevRipple = $$1.findOne(':scope > .ripple-effect', target);

        if (prevRipple) {
            $$1.remove(prevRipple);
        }

        const ripple = $$1.create('span', {
            class: 'ripple-effect',
            style: {
                left: mouseX - pos.x,
                top: mouseY - pos.y,
            },
        });
        $$1.append(target, ripple);

        const animation = $$1.animate(
            ripple,
            (node, progress) => {
                $$1.setStyle(node, {
                    transform: 'scale(' + Math.floor(progress * scaleMultiple) + ')',
                });
            },
            {
                duration: 500,
            },
        );

        $$1.addEventOnce(document$1, 'mouseup.ui.ripple', (_) => {
            animation.finally((_) => {
                $$1.animate(
                    ripple,
                    (node, progress) => {
                        $$1.setStyle(node, {
                            opacity: 1 - Math.pow(progress, 2),
                        });
                    },
                    {
                        duration: 250,
                    },
                ).finally((_) => {
                    $$1.detach(ripple);
                });
            });
        });
    });

    // Text expand events
    $$1.addEventDelegate(document$1, 'change.ui.expand input.ui.expand', '.text-expand', (e) => {
        const textArea = e.currentTarget;

        $$1.setStyle(textArea, { height: 'inherit' });

        let newHeight = $$1.height(textArea, { boxSize: $$1.SCROLL_BOX });
        newHeight += parseInt($$1.css(textArea, 'borderTop'));
        newHeight += parseInt($$1.css(textArea, 'borderBottom'));

        $$1.setStyle(textArea, { height: `${newHeight}px` });
    });

    exports.Alert = Alert;
    exports.BaseComponent = BaseComponent;
    exports.Button = Button;
    exports.Carousel = Carousel;
    exports.Collapse = Collapse;
    exports.Dropdown = Dropdown;
    exports.FocusTrap = FocusTrap;
    exports.Modal = Modal;
    exports.Offcanvas = Offcanvas;
    exports.Popover = Popover;
    exports.Popper = Popper;
    exports.Tab = Tab;
    exports.Toast = Toast;
    exports.Tooltip = Tooltip;
    exports.addScrollPadding = addScrollPadding;
    exports.generateId = generateId;
    exports.getClickTarget = getClickTarget;
    exports.getDataset = getDataset;
    exports.getPosition = getPosition;
    exports.getScrollContainer = getScrollContainer;
    exports.getScrollbarSize = getScrollbarSize;
    exports.getTarget = getTarget;
    exports.getTargetSelector = getTargetSelector;
    exports.getTouchPositions = getTouchPositions;
    exports.initComponent = initComponent;
    exports.resetScrollPadding = resetScrollPadding;

}));
//# sourceMappingURL=frost-ui-bundle.js.map
