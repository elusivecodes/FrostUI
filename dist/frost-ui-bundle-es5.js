"use strict";function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return _possibleConstructorReturn(this,result);};}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest();}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr,i){if(typeof Symbol==="undefined"||!(Symbol.iterator in Object(arr)))return;var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}function _createForOfIteratorHelper(o,allowArrayLike){var it;if(typeof Symbol==="undefined"||o[Symbol.iterator]==null){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&typeof o.length==="number"){if(it)o=it;var i=0;var F=function F(){};return{s:F,n:function n(){if(i>=o.length)return{done:true};return{done:false,value:o[i++]};},e:function e(_e2){throw _e2;},f:F};}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion=true,didErr=false,err;return{s:function s(){it=o[Symbol.iterator]();},n:function n(){var step=it.next();normalCompletion=step.done;return step;},e:function e(_e3){didErr=true;err=_e3;},f:function f(){try{if(!normalCompletion&&it["return"]!=null)it["return"]();}finally{if(didErr)throw err;}}};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}/**
 * FrostUI Bundle v1.0.0
 * https://github.com/elusivecodes/FrostCore
 * https://github.com/elusivecodes/FrostDOM
 * https://github.com/elusivecodes/FrostUI
 */(function(global,factory){'use strict';if((typeof module==="undefined"?"undefined":_typeof(module))==='object'&&_typeof(module.exports)==='object'){module.exports=factory;}else{factory(global);}})(void 0,function(window){'use strict';if((typeof module==="undefined"?"undefined":_typeof(module))==='object'){module.exports=null;}/**
     * FrostCore v1.0.5
     * https://github.com/elusivecodes/FrostCore
     */(function(global,factory){'use strict';if((typeof module==="undefined"?"undefined":_typeof(module))==='object'&&_typeof(module.exports)==='object'){module.exports=factory(global);}else{global.Core=factory(global);}})(this||window,function(window){'use strict';var Core={};/**
         * Array methods
         */ /**
         * Create a new array containing the values of the first array, that do not exist in any of the additional passed arrays.
         * @param {array} array The input array.
         * @param {...array} arrays The arrays to compare against.
         * @returns {array} The output array.
         */Core.diff=function(array){for(var _len=arguments.length,arrays=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){arrays[_key-1]=arguments[_key];}arrays=arrays.map(Core.unique);return array.filter(function(value){return!arrays.some(function(other){return other.includes(value);});});};/**
         * Create a new array containing the unique values that exist in all of the passed arrays.
         * @param {...array} arrays The input arrays.
         * @returns {array} The output array.
         */Core.intersect=function(){for(var _len2=arguments.length,arrays=new Array(_len2),_key2=0;_key2<_len2;_key2++){arrays[_key2]=arguments[_key2];}return Core.unique(arrays.reduce(function(acc,array,index){array=Core.unique(array);return Core.merge(acc,array.filter(function(value){return arrays.every(function(other,otherIndex){return index==otherIndex||other.includes(value);});}));},[]));};/**
         * Merge the values from one or more arrays or array-like objects onto an array.
         * @param {array} array The input array.
         * @param {...array|...object} arrays The arrays or array-like objects to merge.
         * @returns {array} The output array.
         */Core.merge=function(){var array=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];for(var _len3=arguments.length,arrays=new Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){arrays[_key3-1]=arguments[_key3];}return arrays.reduce(function(acc,other){Array.prototype.push.apply(acc,other);return array;},array);};/**
         * Return a random value from an array.
         * @param {array} array The input array.
         * @returns {*} A random value from the array, or null if it is empty.
         */Core.randomValue=function(array){return array.length?array[Core.randomInt(array.length)]:null;};/**
         * Return an array containing a range of values.
         * @param {number} start The first value of the sequence.
         * @param {number} end The value to end the sequence on.
         * @param {number} [step=1] The increment between values in the sequence.
         * @returns {number[]} The array of values from start to end.
         */Core.range=function(start,end){var step=arguments.length>2&&arguments[2]!==undefined?arguments[2]:1;var sign=Math.sign(end-start);return new Array(Math.abs(end-start)/step+1|0).fill().map(function(_,i){return start+Core.toStep(i*step*sign,step);});};/**
         * Remove duplicate elements in an array.
         * @param {array} array The input array.
         * @returns {array} The filtered array.
         */Core.unique=function(array){return Array.from(new Set(array));};/**
         * Create an array from any value.
         * @param {*} value The input value.
         * @returns {array} The wrapped array.
         */Core.wrap=function(value){return Core.isUndefined(value)?[]:Core.isArray(value)?value:Core.isArrayLike(value)?Core.merge([],value):[value];};/**
         * Function methods
         */ /**
         * Create a wrapped version of a function that executes at most once per animation frame
         * (using the most recent arguments passed to it).
         * @param {function} callback Callback function to execute.
         * @param {Boolean} [leading] Whether to execute on the leading edge of the animation frame.
         * @returns {function} The wrapped function.
         */Core.animation=function(callback,leading){var animationReference,newArgs,running;var animation=function animation(){for(var _len4=arguments.length,args=new Array(_len4),_key4=0;_key4<_len4;_key4++){args[_key4]=arguments[_key4];}newArgs=args;if(running){return;}if(leading){callback.apply(void 0,_toConsumableArray(newArgs));}running=true;animationReference=Core._requestAnimationFrame(function(_){if(!leading){callback.apply(void 0,_toConsumableArray(newArgs));}running=false;animationReference=null;});};animation.cancel=function(_){if(!animationReference){return;}if('requestAnimationFrame'in window){window.cancelAnimationFrame(animationReference);}else{clearTimeout(animationReference);}running=false;animationReference=null;};return animation;};/**
         * Create a wrapped function that will execute each callback in reverse order,
         * passing the result from each function to the previous.
         * @param {...function} callbacks Callback functions to execute.
         * @returns {function} The wrapped function.
         */Core.compose=function(){for(var _len5=arguments.length,callbacks=new Array(_len5),_key5=0;_key5<_len5;_key5++){callbacks[_key5]=arguments[_key5];}return function(arg){return callbacks.reduceRight(function(acc,callback){return callback(acc);},arg);};};/**
         * Create a wrapped version of a function, that will return new functions
         * until the number of total arguments passed reaches the arguments length
         * of the original function (at which point the function will execute).
         * @param {function} callback Callback function to execute.
         * @returns {function} The wrapped function.
         */Core.curry=function(callback){var curried=function curried(){for(var _len6=arguments.length,args=new Array(_len6),_key6=0;_key6<_len6;_key6++){args[_key6]=arguments[_key6];}return args.length>=callback.length?callback.apply(void 0,args):function(){for(var _len7=arguments.length,newArgs=new Array(_len7),_key7=0;_key7<_len7;_key7++){newArgs[_key7]=arguments[_key7];}return curried.apply(void 0,_toConsumableArray(args.concat(newArgs)));};};return curried;};/**
         * Create a wrapped version of a function that executes once per wait period
         * (using the most recent arguments passed to it).
         * @param {function} callback Callback function to execute.
         * @param {number} wait The number of milliseconds to wait until next execution.
         * @param {Boolean} [leading] Whether to execute on the leading edge of the wait period.
         * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
         * @returns {function} The wrapped function.
         */Core.debounce=function(callback,wait,leading){var trailing=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;var debounceReference,lastRan,newArgs,running;var debounced=function debounced(){var now=Date.now();var delta=lastRan?lastRan-now:null;for(var _len8=arguments.length,args=new Array(_len8),_key8=0;_key8<_len8;_key8++){args[_key8]=arguments[_key8];}if(leading&&(delta===null||delta>=wait)){lastRan=now;callback.apply(void 0,args);return;}newArgs=args;if(running||!trailing){return;}running=true;debounceReference=setTimeout(function(_){lastRan=Date.now();callback.apply(void 0,_toConsumableArray(newArgs));running=false;debounceReference=null;},delta);};debounced.cancel=function(_){if(!debounceReference){return;}clearTimeout(debounceReference);running=false;debounceReference=null;};return debounced;};/**
         * Evaluate a value from a function or value.
         * @param {*} value The value to evaluate.
         * @returns {*} The evaluated value.
         */Core.evaluate=function(value){return Core.isFunction(value)?value():value;};/**
         * Create a wrapped version of a function that will only ever execute once.
         * Subsequent calls to the wrapped function will return the result of the initial call.
         * @param {function} callback Callback function to execute.
         * @returns {function} The wrapped function.
         */Core.once=function(callback){var ran,result;return function(){if(ran){return result;}ran=true;result=callback.apply(void 0,arguments);return result;};};/**
         * Create a wrapped version of a function with predefined arguments.
         * @param {function} callback Callback function to execute.
         * @param {...*} [defaultArgs] Default arguments to pass to the function.
         * @returns {function} The wrapped function.
         */Core.partial=function(callback){for(var _len9=arguments.length,defaultArgs=new Array(_len9>1?_len9-1:0),_key9=1;_key9<_len9;_key9++){defaultArgs[_key9-1]=arguments[_key9];}return function(){for(var _len10=arguments.length,args=new Array(_len10),_key10=0;_key10<_len10;_key10++){args[_key10]=arguments[_key10];}return callback.apply(void 0,_toConsumableArray(defaultArgs.slice().map(function(v){return Core.isUndefined(v)?args.shift():v;}).concat(args)));};};/**
         * Create a wrapped function that will execute each callback in order,
         * passing the result from each function to the next.
         * @param {...function} callbacks Callback functions to execute.
         * @returns {function} The wrapped function.
         */Core.pipe=function(){for(var _len11=arguments.length,callbacks=new Array(_len11),_key11=0;_key11<_len11;_key11++){callbacks[_key11]=arguments[_key11];}return function(arg){return callbacks.reduce(function(acc,callback){return callback(acc);},arg);};};/**
         * Create a wrapped version of a function that executes at most once per wait period.
         * (using the most recent arguments passed to it).
         * @param {function} callback Callback function to execute.
         * @param {number} wait The number of milliseconds to wait until next execution.
         * @param {Boolean} [leading=true] Whether to execute on the leading edge of the wait period.
         * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
         * @returns {function} The wrapped function.
         */Core.throttle=function(callback,wait){var leading=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;var trailing=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;return Core.debounce(callback,wait,leading,trailing);};/**
         * Execute a function a specified number of times.
         * @param {function} callback Callback function to execute.
         * @param {number} amount The amount of times to execute the callback.
         */Core.times=function(callback,amount){while(amount--){if(callback()===false){break;}}};/**
         * Execute a callback on the next animation frame
         * @param {function} callback Callback function to execute.
         */Core._requestAnimationFrame='requestAnimationFrame'in window?function(){return window.requestAnimationFrame.apply(window,arguments);}:function(callback){return setTimeout(callback,1000/60);};/**
         * Split a string into individual words.
         * @param {string} string The input string.
         * @returns {string[]} The split parts of the string.
         */Core._splitString=function(string){return"".concat(string).split(/[^a-zA-Z0-9']|(?=[A-Z])/).reduce(function(acc,word){word=word.replace(/[^\w]/,'').toLowerCase();if(word){acc.push(word);}return acc;},[]);};/**
         * Math methods
         */ /**
         * Clamp a value between a min and max.
         * @param {number} value The value to clamp.
         * @param {number} [min=0] The minimum value of the clamped range.
         * @param {number} [max=1] The maximum value of the clamped range.
         * @returns {number} The clamped value.
         */Core.clamp=function(value){var min=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var max=arguments.length>2&&arguments[2]!==undefined?arguments[2]:1;return Math.max(min,Math.min(max,value));};/**
         * Clamp a value between 0 and 100.
         * @param {number} value The value to clamp.
         * @returns {number} The clamped value.
         */Core.clampPercent=function(value){return Core.clamp(value,0,100);};/**
         * Get the distance between two vectors.
         * @param {number} x1 The first vector X co-ordinate.
         * @param {number} y1 The first vector Y co-ordinate.
         * @param {number} x2 The second vector X co-ordinate.
         * @param {number} y2 The second vector Y co-ordinate.
         * @returns {number} The distance between the vectors.
         */Core.dist=function(x1,y1,x2,y2){return Core.len(x1-x2,y1-y2);};/**
         * Inverse linear interpolation from one value to another.
         * @param {number} v1 The starting value.
         * @param {number} v2 The ending value.
         * @param {number} value The value to inverse interpolate.
         * @returns {number} The interpolated amount.
         */Core.inverseLerp=function(v1,v2,value){return(value-v1)/(v2-v1);};/**
         * Get the length of an X,Y vector.
         * @param {number} x The X co-ordinate.
         * @param {number} y The Y co-ordinate.
         * @returns {number} The length of the vector.
         */Core.len=Math.hypot;/**
         * Linear interpolation from one value to another.
         * @param {number} v1 The starting value.
         * @param {number} v2 The ending value.
         * @param {number} amount The amount to interpolate.
         * @returns {number} The interpolated value.
         */Core.lerp=function(v1,v2,amount){return v1*(1-amount)+v2*amount;};/**
         * Map a value from one range to another.
         * @param {number} value The value to map.
         * @param {number} fromMin The minimum value of the current range.
         * @param {number} fromMax The maximum value of the current range.
         * @param {number} toMin The minimum value of the target range.
         * @param {number} toMax The maximum value of the target range.
         * @returns {number} The mapped value.
         */Core.map=function(value,fromMin,fromMax,toMin,toMax){return(value-fromMin)*(toMax-toMin)/(fromMax-fromMin)+toMin;};/**
         * Return a random floating-point number.
         * @param {number} [a=1] The minimum value (inclusive).
         * @param {number} [b] The maximum value (exclusive).
         * @returns {number} A random number.
         */Core.random=function(){var a=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var b=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return Core.isNull(b)?Math.random()*a:Core.map(Math.random(),0,1,a,b);};/**
         * Return a random number.
         * @param {number} [a=1] The minimum value (inclusive).
         * @param {number} [b] The maximum value (exclusive).
         * @returns {number} A random number.
         */Core.randomInt=function(){var a=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var b=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return Core.random(a,b)|0;};/**
         * Constrain a number to a specified step-size.
         * @param {number} value The value to constrain.
         * @param {number} step The minimum step-size.
         * @returns {number} The constrained value.
         */Core.toStep=function(value){var step=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0.01;return parseFloat((Math.round(value/step)*step).toFixed("".concat(step).replace('\d*\.?/','').length));};/**
         * Object methods
         */ /**
         * Merge the values from one or more objects onto an object (recursively).
         * @param {object} object The input object.
         * @param {...object} objects The objects to merge.
         * @returns {object} The output objects.
         */Core.extend=function(object){for(var _len12=arguments.length,objects=new Array(_len12>1?_len12-1:0),_key12=1;_key12<_len12;_key12++){objects[_key12-1]=arguments[_key12];}return objects.reduce(function(acc,val){for(var k in val){if(Core.isArray(val[k])){acc[k]=Core.extend(Core.isArray(acc[k])?acc[k]:[],val[k]);}else if(Core.isPlainObject(val[k])){acc[k]=Core.extend(Core.isPlainObject(acc[k])?acc[k]:{},val[k]);}else{acc[k]=val[k];}}return acc;},object);};/**
         * Remove a specified key from an object using dot notation.
         * @param {object} object The input object.
         * @param {string} key The key to remove from the object.
         */Core.forgetDot=function(object,key){var keys=key.split('.');while(key=keys.shift()){if(!Core.isObject(object)||!(key in object)){break;}if(keys.length){object=object[key];}else{delete object[key];}}};/**
         * Retrieve the value of a specified key from an object using dot notation.
         * @param {object} object The input object.
         * @param {string} key The key to retrieve from the object.
         * @param {*} [defaultValue] The default value if key does not exist.
         * @returns {*} The value retrieved from the object.
         */Core.getDot=function(object,key,defaultValue){var keys=key.split('.');while(key=keys.shift()){if(!Core.isObject(object)||!(key in object)){return defaultValue;}object=object[key];}return object;};/**
         * Returns true if a specified key exists in an object using dot notation.
         * @param {object} object The input object.
         * @param {string} key The key to test for in the object.
         * @returns {Boolean} TRUE if the key exists, otherwise FALSE.
         */Core.hasDot=function(object,key){var keys=key.split('.');while(key=keys.shift()){if(!Core.isObject(object)||!(key in object)){return false;}object=object[key];}return true;};/**
         * Retrieve values of a specified key from an array of objects using dot notation.
         * @param {object[]} objects The input objects.
         * @param {string} key The key to retrieve from the objects.
         * @param {*} [defaultValue] The default value if key does not exist.
         * @returns {array} An array of values retrieved from the objects.
         */Core.pluckDot=function(objects,key,defaultValue){return objects.map(function(pointer){return Core.getDot(pointer,key,defaultValue);});};/**
         * Set a specified value of a key for an object using dot notation.
         * @param {object} object The input object.
         * @param {string} key The key to set in the object.
         * @param {*} value The value to set.
         * @param {Boolean} [overwrite=true] Whether to overwrite, if the key already exists.
         */Core.setDot=function(object,key,value){var overwrite=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;var keys=key.split('.');while(key=keys.shift()){if(key==='*'){for(var k in object){Core.setDot(object,[k].concat(keys).join('.'),value,overwrite);}return;}if(keys.length){if(!Core.isObject(object[key])||!(key in object)){object[key]={};}object=object[key];}else if(overwrite||!(key in object)){object[key]=value;}}};/**
         * String methods
         */ /**
         * Convert a string to camelCase.
         * @param {string} string The input string.
         * @returns {string} The camelCased string.
         */Core.camelCase=function(string){return Core._splitString(string).map(function(word,index){return index?Core.capitalize(word):word;}).join('');};/**
         * Convert the first character of string to upper case and the remaining to lower case.
         * @param {string} string The input string.
         * @returns {string} The capitalized string.
         */Core.capitalize=function(string){return string.charAt(0).toUpperCase()+string.substring(1).toLowerCase();};/**
         * Convert HTML special characters in a string to their corresponding HTML entities.
         * @param {string} string The input string.
         * @returns {string} The escaped string.
         */Core.escape=function(string){return string.replace(Core._escapeRegExp,function(match){return Core._escapeChars[match];});};/**
         * Escape RegExp special characters in a string.
         * @param {string} string The input string.
         * @returns {string} The escaped string.
         */Core.escapeRegExp=function(string){return string.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');};/**
         * Convert a string to a humanized form.
         * @param {string} string The input string.
         * @returns {string} The humanized string.
         */Core.humanize=function(string){return Core.capitalize(Core._splitString(string).join(' '));};/**
         * Convert a string to kebab-case.
         * @param {string} string The input string.
         * @returns {string} The kebab-cased string.
         */Core.kebabCase=function(string){return Core._splitString(string).join('-').toLowerCase();};/**
         * Convert a string to PascalCase.
         * @param {string} string The input string.
         * @returns {string} The camelCased string.
         */Core.pascalCase=function(string){return Core._splitString(string).map(function(word){return word.charAt(0).toUpperCase()+word.substring(1);}).join('');};/**
         * Return a random string.
         * @param {number} [length=16] The length of the output string.
         * @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789] The characters to generate the string from.
         * @returns {string} The random string.
         */Core.randomString=function(){var length=arguments.length>0&&arguments[0]!==undefined?arguments[0]:16;var chars=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789';return new Array(length).fill().map(function(_){return chars[Core.random(chars.length)|0];}).join('');};/**
         * Convert a string to snake_case.
         * @param {string} string The input string.
         * @returns {string} The snake_cased string.
         */Core.snakeCase=function(string){return Core._splitString(string).join('_').toLowerCase();};/**
         * Convert HTML entities in a string to their corresponding characters.
         * @param {string} string The input string.
         * @returns {string} The unescaped string.
         */Core.unescape=function(string){return string.replace(Core._unescapeRegExp,function(_,code){return Core._unescapeChars[code];});};/**
         * Testing methods
         */ /**
         * Returns true if the value is an array.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is an array, otherwise FALSE.
         */Core.isArray=Array.isArray;/**
         * Returns true if the value is array-like.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is array-like, otherwise FALSE.
         */Core.isArrayLike=function(value){return Core.isArray(value)||Core.isObject(value)&&!Core.isFunction(value)&&!Core.isWindow(value)&&!Core.isElement(value)&&(Symbol.iterator in value&&Core.isFunction(value[Symbol.iterator])||'length'in value&&Core.isNumeric(value.length)&&(!value.length||value.length-1 in value));};/**
         * Returns true if the value is a Boolean.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is boolean, otherwise FALSE.
         */Core.isBoolean=function(value){return value===!!value;};/**
         * Returns true if the value is a Document.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a Document, otherwise FALSE.
         */Core.isDocument=function(value){return!!value&&value.nodeType===Core.DOCUMENT_NODE;};/**
         * Returns true if the value is a HTMLElement.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
         */Core.isElement=function(value){return!!value&&value.nodeType===Core.ELEMENT_NODE;};/**
         * Returns true if the value is a DocumentFragment.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a DocumentFragment, otherwise FALSE.
         */Core.isFragment=function(value){return!!value&&value.nodeType===Core.DOCUMENT_FRAGMENT_NODE&&!value.host;};/**
         * Returns true if the value is a function.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a function, otherwise FALSE.
         */Core.isFunction=function(value){return typeof value==='function';};/**
         * Returns true if the value is NaN.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is NaN, otherwise FALSE.
         */Core.isNaN=Number.isNaN;/**
         * Returns true if the value is a Node.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a Node, otherwise FALSE.
         */Core.isNode=function(value){return!!value&&(value.nodeType===Core.ELEMENT_NODE||value.nodeType===Core.TEXT_NODE||value.nodeType===Core.COMMENT_NODE);};/**
         * Returns true if the value is null.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is null, otherwise FALSE.
         */Core.isNull=function(value){return value===null;};/**
         * Returns true if the value is numeric.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is numeric, otherwise FALSE.
         */Core.isNumeric=function(value){return!isNaN(parseFloat(value))&&isFinite(value);};/**
         * Returns true if the value is a plain object.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a plain object, otherwise FALSE.
         */Core.isPlainObject=function(value){return!!value&&value.constructor===Object;};/**
         * Returns true if the value is an object.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is an object, otherwise FALSE.
         */Core.isObject=function(value){return!!value&&value===Object(value);};/**
         * Returns true if the value is a ShadowRoot.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a ShadowRoot, otherwise FALSE.
         */Core.isShadow=function(value){return!!value&&value.nodeType===Core.DOCUMENT_FRAGMENT_NODE&&!!value.host;};/**
         * Returns true if the value is a string.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE is the value is a string, otherwise FALSE.
         */Core.isString=function(value){return value==="".concat(value);};/**
         * Returns true if the value is undefined.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is undefined, otherwise FALSE.
         */Core.isUndefined=function(value){return value===undefined;};/**
         * Returns true if the value is a Window.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE is the value is a Window, otherwise FALSE.
         */Core.isWindow=function(value){return!!value&&!!value.document&&value.document.defaultView===value;};/**
         * Core Properties
         */ // Node type constants
Core.ELEMENT_NODE=1;Core.TEXT_NODE=3;Core.COMMENT_NODE=8;Core.DOCUMENT_NODE=9;Core.DOCUMENT_FRAGMENT_NODE=11;// HTML escape regex
Core._escapeRegExp=/[&<>"']/g;Core._unescapeRegExp=/\&(amp|lt|gt|quot|apos);/g;// HTML escape characters
Core._escapeChars={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&apos;'};Core._unescapeChars={'amp':'&','lt':'<','gt':'>','quot':'"','apos':'\''};return Core;});/**
     * FrostDOM v1.1.2
     * https://github.com/elusivecodes/FrostDOM
     */(function(global,factory){'use strict';if((typeof module==="undefined"?"undefined":_typeof(module))==='object'&&_typeof(module.exports)==='object'){module.exports=factory;}else{Object.assign(global,factory(global));}})(this||window,function(window){'use strict';if(!window){throw new Error('FrostDOM requires a Window.');}if(!('Core'in window)){throw new Error('FrostDOM requires FrostCore.');}var Core=window.Core;var document=window.document;var dom;/**
         * AjaxRequest Class
         * @class
         */var AjaxRequest=/*#__PURE__*/function(){/**
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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */function AjaxRequest(options){var _this=this;_classCallCheck(this,AjaxRequest);this._options=Core.extend({},this.constructor.defaults,options);if(!this._options.url){this._options.url=window.location.href;}if(!this._options.cache){this._options.url=this.constructor.appendQueryString(this._options.url,'_',Date.now());}if(!('Content-Type'in this._options.headers)&&this._options.contentType){this._options.headers['Content-Type']=this._options.contentType;}if(this._options.isLocal===null){this._options.isLocal=this.constructor._localRegExp.test(location.protocol);}if(!this._options.isLocal&&!('X-Requested-With'in this._options.headers)){this._options.headers['X-Requested-With']='XMLHttpRequest';}this._isResolved=false;this._isRejected=false;this._isCancelled=false;this.promise=new Promise(function(resolve,reject){_this._resolve=function(value){_this._isResolved=true;resolve(value);};_this._reject=function(error){_this._isRejected=true;reject(error);};});this._build();this._events();this._send();}/**
             * Cancel a pending request.
             * @param {string} [reason=Request was cancelled] The reason for cancelling the request.
             */_createClass(AjaxRequest,[{key:"cancel",value:function cancel(){var reason=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'Request was cancelled';if(this._isResolved||this._isRejected||this._isCancelled){return;}this._xhr.abort();this._isCancelled=true;if(this._options.rejectOnCancel){this._reject({status:this._xhr.status,xhr:this._xhr,reason:reason});}}/**
             * Execute a callback if the request is rejected.
             * @param {function} [onRejected] The callback to execute if the request is rejected.
             * @returns {Promise} The promise.
             */},{key:"catch",value:function _catch(onRejected){return this.promise["catch"](onRejected);}/**
             * Execute a callback once the request is settled (resolved or rejected).
             * @param {function} [onRejected] The callback to execute once the request is settled.
             * @returns {Promise} The promise.
             */},{key:"finally",value:function _finally(onFinally){return this.promise["finally"](onFinally);}/**
             * Execute a callback once the request is resolved (or optionally rejected).
             * @param {function} onFulfilled The callback to execute if the request is resolved.
             * @param {function} [onRejected] The callback to execute if the request is rejected.
             * @returns {Promise} The promise.
             */},{key:"then",value:function then(onFulfilled,onRejected){return this.promise.then(onFulfilled,onRejected);}}]);return AjaxRequest;}();/**
         * MockXMLHttpRequest Class
         * @class
         */var MockXMLHttpRequest=/*#__PURE__*/function(){/**
             * New MockXMLHttpRequest constructor.
             * @returns {MockXMLHttpRequest} A new MockXMLHttpRequest.
             */function MockXMLHttpRequest(){_classCallCheck(this,MockXMLHttpRequest);this.data={headers:{}};this.status=200;this.timeout=0;this.upload={};this._response='Test';}/**
             * Abort the request if it has already been sent.
             */_createClass(MockXMLHttpRequest,[{key:"abort",value:function abort(){clearTimeout(this._uploadTimer);clearTimeout(this._progressTimer);clearTimeout(this._completeTimer);}/**
             * Initialize a request.
             * @param {string} method The request method.
             * @param {string} url The URL to send the request to.
             * @param {Boolean} [async=true] Whether to perform the request asynchronously.
             * @param {string} [username] The username to authenticate with.
             * @param {string} [password] The password to authenticate with.
             */},{key:"open",value:function open(method,url){var async=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;var username=arguments.length>3&&arguments[3]!==undefined?arguments[3]:undefined;var password=arguments.length>4&&arguments[4]!==undefined?arguments[4]:undefined;this.data.method=method;this.data.url=url;this.data.async=async;this.data.username=username;this.data.password=password;}/**
             * Override the MIME type sent by the server.
             * @param {string} mimeType The MIME type to use.
             */},{key:"overrideMimeType",value:function overrideMimeType(mimeType){this.data.mimeType=mimeType;}/**
             * Send the request.
             * @param {*} [data=null] Data to send with the request.
             */},{key:"send",value:function send(){var _this2=this;var data=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;this.data.body=data;if(this.responseType){this.data.responseType=this.responseType;}if(this.timeout){this.data.timeout=this.timeout;}if(this.upload&&this.upload.onprogress){this._uploadTimer=setTimeout(function(_){_this2._uploadTimer=null;var progressEvent=new Event('progress');progressEvent.loaded=5000;progressEvent.total=10000;_this2.upload.onprogress(progressEvent);},10);}if(this.onprogress){this._progressTimer=setTimeout(function(_){_this2._progressTimer=null;var progressEvent=new Event('progress');progressEvent.loaded=500;progressEvent.total=1000;_this2.onprogress(progressEvent);},10);}this._completeTimer=setTimeout(function(_){_this2._completeTimer=null;if(_this2.forceError){if(_this2.onerror){var errorEvent=new Event('error');_this2.onerror(errorEvent);}return;}_this2.data.status=_this2.status;_this2.response=_this2._response;if(_this2.onload){var loadEvent=new Event('load');_this2.onload(loadEvent);}},20);}/**
             * Set a value of a HTTP request header.
             * @param {string} header The header to set.
             * @param {string} value The value to set.
             */},{key:"setRequestHeader",value:function setRequestHeader(header,value){this.data.headers[header]=value;}}]);return MockXMLHttpRequest;}();/**
         * AjaxRequest Helpers
         */Object.assign(AjaxRequest.prototype,{/**
             * Build the XHR request object.
             */_build:function _build(){this._xhr=this.constructor.useMock?new MockXMLHttpRequest():new XMLHttpRequest();this._xhr.open(this._options.method,this._options.url,true,this._options.username,this._options.password);for(var key in this._options.headers){this._xhr.setRequestHeader(key,this._options.headers[key]);}if(this._options.responseType){this._xhr.responseType=this._options.responseType;}if(this._options.mimeType){this._xhr.overrideMimeType(this._options.mimeType);}if(this._options.timeout){this._xhr.timeout=this._options.timeout;}},/**
             * Attach events to the XHR request object.
             */_events:function _events(){var _this3=this;this._xhr.onload=function(e){if(_this3._xhr.status>400){_this3._reject({status:_this3._xhr.status,xhr:_this3._xhr,event:e});}else{_this3._resolve({response:_this3._xhr.response,xhr:_this3._xhr,event:e});}};if(!this._isLocal){this._xhr.onerror=function(e){return _this3._reject({status:_this3._xhr.status,xhr:_this3._xhr,event:e});};}if(this._options.onProgress){this._xhr.onprogress=function(e){return _this3._options.onProgress(e.loaded/e.total,_this3._xhr,e);};}if(this._options.onUploadProgress){this._xhr.upload.onprogress=function(e){return _this3._options.onUploadProgress(e.loaded/e.total,_this3._xhr,e);};}},/**
             * Process the data and send the XHR request.
             */_send:function _send(){if(this._options.beforeSend){this._options.beforeSend(this._xhr);}if(this._options.data&&this._options.processData&&Core.isObject(this._options.data)){if(this._options.contentType==='application/json'){this._options.data=JSON.stringify(this._options.data);}else if(this._options.contentType==='application/x-www-form-urlencoded'){this._options.data=this.constructor._parseParams(this._options.data);}else{this._options.data=this.constructor._parseFormData(this._options.data);}}this._xhr.send(this._options.data);if(this._options.afterSend){this._options.afterSend(this._xhr);}}});/**
         * AjaxRequest (Static) Helpers
         */Object.assign(AjaxRequest,{/**
             * Append a query string to a URL.
             * @param {string} url The input URL.
             * @param {string} key The query string key.
             * @param {string} value The query string value.
             * @returns {string} The new URL.
             */appendQueryString:function appendQueryString(url,key,value){var baseHref=(window.location.origin+window.location.pathname).replace(/\/$/,'');var urlData=new URL(url,baseHref);urlData.searchParams.append(key,value);var newUrl=urlData.toString();if(newUrl.substring(0,url.length)===url){return newUrl;}var pos=newUrl.indexOf(url);return newUrl.substring(pos);},/**
             * Return a FormData object from an array or object.
             * @param {array|object} data The input data.
             * @returns {FormData} The FormData object.
             */_parseFormData:function _parseFormData(data){var values=this._parseValues(data);var formData=new FormData();var _iterator=_createForOfIteratorHelper(values),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var _step$value=_slicedToArray(_step.value,2),key=_step$value[0],value=_step$value[1];if(key.substring(key.length-2)==='[]'){formData.append(key,value);}else{formData.set(key,value);}}}catch(err){_iterator.e(err);}finally{_iterator.f();}return formData;},/**
             * Return a URI-encoded attribute string from an array or object.
             * @param {array|object} data The input data.
             * @returns {string} The URI-encoded attribute string.
             */_parseParams:function _parseParams(data){var values=this._parseValues(data);var paramString=values.map(function(_ref){var _ref2=_slicedToArray(_ref,2),key=_ref2[0],value=_ref2[1];return"".concat(key,"=").concat(value);}).join('&');return encodeURI(paramString);},/**
             * Return an attributes array, or a flat array of attributes from a key and value.
             * @param {string} key The input key.
             * @param {array|object|string} value The input value.
             * @returns {array} The parsed attributes.
             */_parseValue:function _parseValue(key,value){if(Core.isArray(value)){if(key.substring(key.length-2)!=='[]'){key+='[]';}var values=[];var _iterator2=_createForOfIteratorHelper(value),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var val=_step2.value;values.push.apply(values,_toConsumableArray(this._parseValue(key,val)));}}catch(err){_iterator2.e(err);}finally{_iterator2.f();}return values;}if(Core.isObject(value)){var _values=[];for(var subKey in value){_values.push.apply(_values,_toConsumableArray(this._parseValue("".concat(key,"[").concat(subKey,"]"),value[subKey])));}return _values;}return[[key,value]];},/**
             * Return an attributes array from a data array or data object.
             * @param {array|object} data The input data.
             * @returns {array} The parsed attributes.
             */_parseValues:function _parseValues(data){if(Core.isArray(data)){var values=[];var _iterator3=_createForOfIteratorHelper(data),_step3;try{for(_iterator3.s();!(_step3=_iterator3.n()).done;){var value=_step3.value;values.push.apply(values,_toConsumableArray(this._parseValue(value.name,value.value)));}}catch(err){_iterator3.e(err);}finally{_iterator3.f();}return values;}if(Core.isObject(data)){var _values2=[];for(var key in data){_values2.push.apply(_values2,_toConsumableArray(this._parseValue(key,data[key])));}return _values2;}return data;}});/**
         * AjaxRequest (Static) Properties
         */Object.assign(AjaxRequest,{// AjaxRequest defaults
defaults:{afterSend:null,beforeSend:null,cache:true,contentType:'application/x-www-form-urlencoded',data:null,headers:{},isLocal:null,method:'GET',onProgress:null,onUploadProgress:null,processData:true,rejectOnCancel:true,responseType:null,url:null},// Use mock
useMock:false,// Local protocol test
_localRegExp:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/});// Set the AjaxRequest prototype
Object.setPrototypeOf(AjaxRequest.prototype,Promise.prototype);/**
         * Animation Class
         * @class
         */var Animation=/*#__PURE__*/function(){/**
             * New Animation constructor.
             * @param {HTMLElement} node The input node.
             * @param {DOM~animationCallback} callback The animation callback.
             * @param {object} [options] The options to use for the animation.
             * @param {string} [options.type=ease-in-out] The type of animation
             * @param {number} [options.duration=1000] The duration the animation should last.
             * @param {Boolean} [options.infinite] Whether to repeat the animation.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             */function Animation(node,callback,options){var _this4=this;_classCallCheck(this,Animation);this._node=node;this._callback=callback;this._options=_objectSpread(_objectSpread({},this.constructor.defaults),options);if(!('start'in this._options)){this._options.start=performance.now();}if(this._options.debug){this._node.dataset.animationStart=this._options.start;}this.promise=new Promise(function(resolve,reject){_this4._resolve=resolve;_this4._reject=reject;});if(this.constructor._animations.has(node)){this.constructor._animations.get(node).push(this);}else{this.constructor._animations.set(node,[this]);}}/**
             * Execute a callback if the animation is rejected.
             * @param {function} [onRejected] The callback to execute if the animation is rejected.
             * @returns {Promise} The promise.
             */_createClass(Animation,[{key:"catch",value:function _catch(onRejected){return this.promise["catch"](onRejected);}/**
             * Execute a callback once the animation is settled (resolved or rejected).
             * @param {function} [onRejected] The callback to execute once the animation is settled.
             * @returns {Promise} The promise.
             */},{key:"finally",value:function _finally(onFinally){return this.promise["finally"](onFinally);}/**
             * Stop the animation.
             * @param {Boolean} [finish=true] Whether to finish the animation.
            */},{key:"stop",value:function stop(){var _this5=this;var finish=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;var animations=this.constructor._animations.get(this._node).filter(function(animation){return animation!==_this5;});if(!animations.length){this.constructor._animations["delete"](this._node);}else{this.constructor._animations.set(this._node,animations);}this.update(true,finish);}/**
             * Execute a callback once the animation is resolved (or optionally rejected).
             * @param {function} onFulfilled The callback to execute if the animation is resolved.
             * @param {function} [onRejected] The callback to execute if the animation is rejected.
             * @returns {Promise} The promise.
             */},{key:"then",value:function then(onFulfilled,onRejected){return this.promise.then(onFulfilled,onRejected);}/**
             * Run a single frame of the animation.
             * @param {Boolean} [stop] Whether to stop the animation.
             * @param {Booelan} [finish] Whether to finish the animation.
             */},{key:"update",value:function update(){var stop=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;var finish=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(stop&&!finish){this._reject(this._node);return true;}var now=performance.now();var progress;if(finish){progress=1;}else{progress=(now-this._options.start)/this._options.duration;if(this._options.infinite){progress%=1;}else{progress=Core.clamp(progress);}if(this._options.type==='ease-in'){progress=Math.pow(progress,2);}else if(this._options.type==='ease-out'){progress=Math.sqrt(progress);}else if(this._options.type==='ease-in-out'){if(progress<=0.5){progress=Math.pow(progress,2)*2;}else{progress=1-Math.pow(1-progress,2)*2;}}}if(this._options.debug){this._node.dataset.animationNow=now;this._node.dataset.animationProgress=progress;}this._callback(this._node,progress,this._options);if(progress<1){return;}if(this._options.debug){delete this._node.dataset.animationStart;delete this._node.dataset.animationNow;delete this._node.dataset.animationProgress;}this._resolve(this._node);return true;}}]);return Animation;}();/**
        * AnimationSet Class
        * @class
        */var AnimationSet=/*#__PURE__*/function(){/**
             * New AnimationSet constructor.
             * @param {array} animations The animations.
             */function AnimationSet(animations){_classCallCheck(this,AnimationSet);this._animations=animations;this.promise=Promise.all(animations);}/**
             * Execute a callback if any of the animations is rejected.
             * @param {function} [onRejected] The callback to execute if an animation is rejected.
             * @returns {Promise} The promise.
             */_createClass(AnimationSet,[{key:"catch",value:function _catch(onRejected){return this.promise["catch"](onRejected);}/**
             * Execute a callback once the animation is settled (resolved or rejected).
             * @param {function} [onRejected] The callback to execute once the animation is settled.
             * @returns {Promise} The promise.
             */},{key:"finally",value:function _finally(onFinally){return this.promise["finally"](onFinally);}/**
             * Stop the animations.
             * @param {Boolean} [finish=true] Whether to finish the animations.
            */},{key:"stop",value:function stop(){var finish=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;var _iterator4=_createForOfIteratorHelper(this._animations),_step4;try{for(_iterator4.s();!(_step4=_iterator4.n()).done;){var animation=_step4.value;animation.stop(finish);}}catch(err){_iterator4.e(err);}finally{_iterator4.f();}}/**
             * Execute a callback once the animation is resolved (or optionally rejected).
             * @param {function} onFulfilled The callback to execute if the animation is resolved.
             * @param {function} [onRejected] The callback to execute if the animation is rejected.
             * @returns {Promise} The promise.
             */},{key:"then",value:function then(onFulfilled,onRejected){return this.promise.then(onFulfilled,onRejected);}}]);return AnimationSet;}();/**
         * Animation (Static) Helpers
         */Object.assign(Animation,{/**
             * Clone animations for a single node.
             * @param {Node|HTMLElement|DocumentFragment} node The input node.
             * @param {Node|HTMLElement|DocumentFragment} clone The cloned node.
             */clone:function clone(node,_clone){if(!this._animations.has(node)){return;}var animations=this._animations.get(node).map(function(animation){return new Animation(_clone,animation._callback,animation._options);});this._animations.set(_clone,animations);},/**
             * Start the animation loop (if not already started).
             */start:function start(){if(this._animating){return;}this._animating=true;this.update();},/**
             * Stop all animations for a single element.
             * @param {HTMLElement} node The input node.
             * @param {Boolean} [finish=true] Whether to complete all current animations.
             */stop:function stop(node){var finish=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;if(!this._animations.has(node)){return;}var animations=this._animations.get(node);var _iterator5=_createForOfIteratorHelper(animations),_step5;try{for(_iterator5.s();!(_step5=_iterator5.n()).done;){var animation=_step5.value;animation.update(true,finish);}}catch(err){_iterator5.e(err);}finally{_iterator5.f();}this._animations["delete"](node);},/**
             * Run a single frame of all animations, and then queue up the next frame.
             */update:function update(){var _this6=this;var _iterator6=_createForOfIteratorHelper(this._animations),_step6;try{for(_iterator6.s();!(_step6=_iterator6.n()).done;){var _step6$value=_slicedToArray(_step6.value,2),node=_step6$value[0],animations=_step6$value[1];animations=animations.filter(function(animation){return!animation.update();});if(!animations.length){this._animations["delete"](node);}else{this._animations.set(node,animations);}}}catch(err){_iterator6.e(err);}finally{_iterator6.f();}if(!this._animations.size){this._animating=false;return;}if(this.useTimeout){setTimeout(function(_){return _this6.update();},1000/60);}else{window.requestAnimationFrame(function(_){return _this6.update();});}}});/**
         * Animation (Static) Properties
         */Object.assign(Animation,{// Animation defaults
defaults:{duration:1000,type:'ease-in-out',infinite:false,debug:false},// Use timeout
useTimeout:false,// Animating flag
_animating:false,// Current animations
_animations:new Map()});// Set the Animation prototype
Object.setPrototypeOf(Animation.prototype,Promise.prototype);// Set the AnimationSet prototype
Object.setPrototypeOf(AnimationSet.prototype,Promise.prototype);/**
         * DOM Class
         * @class
         */var DOM=/**
             * New DOM constructor.
             * @param {Document} [context=document] The document context.
             * @returns {DOM} A new DOM object.
             */function DOM(){var context=arguments.length>0&&arguments[0]!==undefined?arguments[0]:document;_classCallCheck(this,DOM);if(!Core.isDocument(context)){throw new Error('Invalid document');}this._context=context;};/**
         * DOM Animate
         */Object.assign(DOM.prototype,{/**
             * Add an animation to each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {DOM~animationCallback} callback The animation callback.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */animate:function animate(nodes,callback,options){nodes=this.parseNodes(nodes);var animations=nodes.map(function(node){return new Animation(node,callback,options);});Animation.start();return new AnimationSet(animations);},/**
             * Stop all animations for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {Boolean} [finish=true] Whether to complete all current animations.
             */stop:function stop(nodes){var finish=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;nodes=this.parseNodes(nodes);var _iterator7=_createForOfIteratorHelper(nodes),_step7;try{for(_iterator7.s();!(_step7=_iterator7.n()).done;){var node=_step7.value;Animation.stop(node,finish);}}catch(err){_iterator7.e(err);}finally{_iterator7.f();}}});/**
         * DOM Animations
         */Object.assign(DOM.prototype,{/**
             * Drop each node into place.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=top] The direction to drop the node from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */dropIn:function dropIn(nodes,options){return this.slideIn(nodes,_objectSpread({direction:'top'},options));},/**
             * Drop each node out of place.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=top] The direction to drop the node to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */dropOut:function dropOut(nodes,options){return this.slideOut(nodes,_objectSpread({direction:'top'},options));},/**
             * Fade the opacity of each node in.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */fadeIn:function fadeIn(nodes,options){return this.animate(nodes,function(node,progress){return node.style.setProperty('opacity',progress<1?progress.toFixed(2):'');},options);},/**
             * Fade the opacity of each node out.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */fadeOut:function fadeOut(nodes,options){return this.animate(nodes,function(node,progress){return node.style.setProperty('opacity',progress<1?(1-progress).toFixed(2):'');},options);},/**
             * Rotate each node in on an X, Y or Z.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.x=0] The amount to rotate on the X-axis.
             * @param {number} [options.y=1] The amount to rotate on the Y-axis.
             * @param {number} [options.z=1] The amount to rotate on the Z-axis.
             * @param {Boolean} [options.inverse] Whether to invert the rotation.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */rotateIn:function rotateIn(nodes,options){return this.animate(nodes,function(node,progress,options){var amount=((90-progress*90)*(options.inverse?-1:1)).toFixed(2);node.style.setProperty('transform',progress<1?"rotate3d(".concat(options.x,", ").concat(options.y,", ").concat(options.z,", ").concat(amount,"deg)"):'');},_objectSpread({x:0,y:1,z:0},options));},/**
             * Rotate each node out on an X, Y or Z.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.x=0] The amount to rotate on the X-axis.
             * @param {number} [options.y=1] The amount to rotate on the Y-axis.
             * @param {number} [options.z=1] The amount to rotate on the Z-axis.
             * @param {Boolean} [options.inverse] Whether to invert the rotation.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */rotateOut:function rotateOut(nodes,options){return this.animate(nodes,function(node,progress,options){var amount=(progress*90*(options.inverse?-1:1)).toFixed(2);node.style.setProperty('transform',progress<1?"rotate3d(".concat(options.x,", ").concat(options.y,", ").concat(options.z,", ").concat(amount,"deg)"):'');},_objectSpread({x:0,y:1,z:0},options));},/**
             * Slide each node in from a direction.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to slide from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */slideIn:function slideIn(nodes,options){var _this7=this;return this.animate(nodes,function(node,progress,options){if(progress===1){node.style.setProperty('overflow','');if(options.useGpu){node.style.setProperty('transform','');}else{node.style.setProperty('margin-left','');node.style.setProperty('margin-top','');}return;}var dir=Core.evaluate(options.direction);var translateStyle,size,inverse;if(['top','bottom'].includes(dir)){translateStyle=options.useGpu?'Y':'margin-top';size=_this7.constructor._height(node);inverse=dir==='top';}else{translateStyle=options.useGpu?'X':'margin-left';size=_this7.constructor._width(node);inverse=dir==='left';}var translateAmount=((size-size*progress)*(inverse?-1:1)).toFixed(2);if(options.useGpu){node.style.setProperty('transform',"translate".concat(translateStyle,"(").concat(translateAmount,"px)"));}else{node.style.setProperty(translateStyle,"".concat(translateAmount,"px"));}},_objectSpread({direction:'bottom',useGpu:true},options));},/**
             * Slide each node out from a direction.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to slide to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */slideOut:function slideOut(nodes,options){var _this8=this;return this.animate(nodes,function(node,progress,options){if(progress===1){node.style.setProperty('overflow','');if(options.useGpu){node.style.setProperty('transform','');}else{node.style.setProperty('margin-left','');node.style.setProperty('margin-top','');}return;}var dir=Core.evaluate(options.direction);var translateStyle,size,inverse;if(['top','bottom'].includes(dir)){translateStyle=options.useGpu?'Y':'margin-top';size=_this8.constructor._height(node);inverse=dir==='top';}else{translateStyle=options.useGpu?'X':'margin-left';size=_this8.constructor._width(node);inverse=dir==='left';}var translateAmount=(size*progress*(inverse?-1:1)).toFixed(2);if(options.useGpu){node.style.setProperty('transform',"translate".concat(translateStyle,"(").concat(translateAmount,"px)"));}else{node.style.setProperty(translateStyle,"".concat(translateAmount,"px"));}},_objectSpread({direction:'bottom',useGpu:true},options));},/**
             * Squeeze each node in from a direction.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to squeeze from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */squeezeIn:function squeezeIn(nodes,options){nodes=this.parseNodes(nodes);options=_objectSpread({direction:'bottom',useGpu:true},options);var animations=nodes.map(function(node){var initialHeight=node.style.height;var initialWidth=node.style.width;node.style.setProperty('overflow','hidden');return new Animation(node,function(node,progress,options){node.style.setProperty('height',initialHeight);node.style.setProperty('width',initialWidth);if(progress===1){node.style.setProperty('overflow','');if(options.useGpu){node.style.setProperty('transform','');}else{node.style.setProperty('margin-left','');node.style.setProperty('margin-top','');}return;}var dir=Core.evaluate(options.direction);var sizeStyle,translateStyle;if(['top','bottom'].includes(dir)){sizeStyle='height';if(dir==='top'){translateStyle=options.useGpu?'Y':'margin-top';}}else{sizeStyle='width';if(dir==='left'){translateStyle=options.useGpu?'X':'margin-left';}}var size=DOM["_".concat(sizeStyle)](node),amount=(size*progress).toFixed(2);node.style.setProperty(sizeStyle,"".concat(amount,"px"));if(translateStyle){var translateAmount=(size-amount).toFixed(2);if(options.useGpu){node.style.setProperty('transform',"translate".concat(translateStyle,"(").concat(translateAmount,"px)"));}else{node.style.setProperty(translateStyle,"".concat(translateAmount,"px"));}}},options);});Animation.start();return new AnimationSet(animations);},/**
             * Squeeze each node out from a direction.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to squeeze to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */squeezeOut:function squeezeOut(nodes,options){nodes=this.parseNodes(nodes);options=_objectSpread({direction:'bottom',useGpu:true},options);var animations=nodes.map(function(node){var initialHeight=node.style.height;var initialWidth=node.style.width;node.style.setProperty('overflow','hidden');return new Animation(node,function(node,progress,options){node.style.setProperty('height',initialHeight);node.style.setProperty('width',initialWidth);if(progress===1){node.style.setProperty('overflow','');if(options.useGpu){node.style.setProperty('transform','');}else{node.style.setProperty('margin-left','');node.style.setProperty('margin-top','');}return;}var dir=Core.evaluate(options.direction);var sizeStyle,translateStyle;if(['top','bottom'].includes(dir)){sizeStyle='height';if(dir==='top'){translateStyle=options.useGpu?'Y':'margin-top';}}else{sizeStyle='width';if(dir==='left'){translateStyle=options.useGpu?'X':'margin-left';}}var size=DOM["_".concat(sizeStyle)](node),amount=(size-size*progress).toFixed(2);node.style.setProperty(sizeStyle,"".concat(amount,"px"));if(translateStyle){var translateAmount=(size-amount).toFixed(2);if(options.useGpu){node.style.setProperty('transform',"translate".concat(translateStyle,"(").concat(translateAmount,"px)"));}else{node.style.setProperty(translateStyle,"".concat(translateAmount,"px"));}}},options);});Animation.start();return new AnimationSet(animations);}});/**
         * DOM Queue
         */Object.assign(DOM.prototype,{/**
             * Clear the queue of each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */clearQueue:function clearQueue(nodes){nodes=this.parseNodes(nodes);var _iterator8=_createForOfIteratorHelper(nodes),_step8;try{for(_iterator8.s();!(_step8=_iterator8.n()).done;){var node=_step8.value;this.constructor._clearQueue(node);}}catch(err){_iterator8.e(err);}finally{_iterator8.f();}},/**
             * Queue a callback on each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {DOM~queueCallback} callback The callback to queue.
             */queue:function queue(nodes,callback){nodes=this.parseNodes(nodes);var _iterator9=_createForOfIteratorHelper(nodes),_step9;try{for(_iterator9.s();!(_step9=_iterator9.n()).done;){var node=_step9.value;this.constructor._queue(node,callback);}}catch(err){_iterator9.e(err);}finally{_iterator9.f();}}});/**
         * DOM Attributes
         */Object.assign(DOM.prototype,{/**
             * Get attribute value(s) for the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [attribute] The attribute name.
             * @returns {string|object} The attribute value, or an object containing attributes.
             */getAttribute:function getAttribute(nodes,attribute){var node=this.parseNode(nodes);if(!node){return;}if(attribute){return node.getAttribute(attribute);}return this.constructor._getAttributes(node,attribute);},/**
             * Get dataset value(s) for the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [key] The dataset key.
             * @returns {*} The dataset value, or an object containing the dataset.
             */getDataset:function getDataset(nodes,key){var node=this.parseNode(nodes);if(!node){return;}if(key){key=Core.camelCase(key);return this.constructor._parseDataset(node.dataset[key]);}var dataset={};for(var k in node.dataset){dataset[k]=this.constructor._parseDataset(node.dataset[k]);}return dataset;},/**
             * Get the HTML contents of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {string} The HTML contents.
             */getHTML:function getHTML(nodes){return this.getProperty(nodes,'innerHTML');},/**
             * Get a property value for the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} property The property name.
             * @returns {string} The property value.
             */getProperty:function getProperty(nodes,property){var node=this.parseNode(nodes);if(!node){return;}return node[property];},/**
             * Get the text contents of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {string} The text contents.
             */getText:function getText(nodes){return this.getProperty(nodes,'innerText');},/**
             * Get the value property of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {string} The value.
             */getValue:function getValue(nodes){return this.getProperty(nodes,'value');},/**
             * Remove an attribute from each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} attribute The attribute name.
             */removeAttribute:function removeAttribute(nodes,attribute){nodes=this.parseNodes(nodes);var _iterator10=_createForOfIteratorHelper(nodes),_step10;try{for(_iterator10.s();!(_step10=_iterator10.n()).done;){var node=_step10.value;node.removeAttribute(attribute);}}catch(err){_iterator10.e(err);}finally{_iterator10.f();}},/**
             * Remove a dataset value from each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} key The dataset key.
             */removeDataset:function removeDataset(nodes,key){nodes=this.parseNodes(nodes);var _iterator11=_createForOfIteratorHelper(nodes),_step11;try{for(_iterator11.s();!(_step11=_iterator11.n()).done;){var node=_step11.value;key=Core.camelCase(key);delete node.dataset[key];}}catch(err){_iterator11.e(err);}finally{_iterator11.f();}},/**
             * Remove a property from each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} property The property name.
             */removeProperty:function removeProperty(nodes,property){nodes=this.parseNodes(nodes);var _iterator12=_createForOfIteratorHelper(nodes),_step12;try{for(_iterator12.s();!(_step12=_iterator12.n()).done;){var node=_step12.value;delete node[property];}}catch(err){_iterator12.e(err);}finally{_iterator12.f();}},/**
             * Set an attribute value for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|object} attribute The attribute name, or an object containing attributes.
             * @param {string} [value] The attribute value.
             */setAttribute:function setAttribute(nodes,attribute,value){nodes=this.parseNodes(nodes);var attributes=this.constructor._parseData(attribute,value);var _iterator13=_createForOfIteratorHelper(nodes),_step13;try{for(_iterator13.s();!(_step13=_iterator13.n()).done;){var node=_step13.value;this.constructor._setAttributes(node,attributes);}}catch(err){_iterator13.e(err);}finally{_iterator13.f();}},/**
             * Set a dataset value for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|object} key The dataset key, or an object containing dataset values.
             * @param {*} [value] The dataset value.
             */setDataset:function setDataset(nodes,key,value){nodes=this.parseNodes(nodes);var dataset=this.constructor._parseData(key,value,true);var _iterator14=_createForOfIteratorHelper(nodes),_step14;try{for(_iterator14.s();!(_step14=_iterator14.n()).done;){var node=_step14.value;this.constructor._setDataset(node,dataset);}}catch(err){_iterator14.e(err);}finally{_iterator14.f();}},/**
             * Set the HTML contents of each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} html The HTML contents.
             */setHTML:function setHTML(nodes,html){this.empty(nodes);this.setProperty(nodes,'innerHTML',html);},/**
             * Set a property value for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|object} property The property name, or an object containing properties.
             * @param {string} [value] The property value.
             */setProperty:function setProperty(nodes,property,value){nodes=this.parseNodes(nodes);var properties=this.constructor._parseData(property,value);var _iterator15=_createForOfIteratorHelper(nodes),_step15;try{for(_iterator15.s();!(_step15=_iterator15.n()).done;){var node=_step15.value;for(var _property in properties){node[_property]=properties[_property];}}}catch(err){_iterator15.e(err);}finally{_iterator15.f();}},/**
             * Set the text contents of each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} text The text contents.
             */setText:function setText(nodes,text){this.empty(nodes);this.setProperty(nodes,'innerText',text);},/**
             * Set the value property of each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} value The value.
             */setValue:function setValue(nodes,value){this.setProperty(nodes,'value',value);}});/**
         * DOM Data
         */Object.assign(DOM.prototype,{/**
             * Clone custom data from each node to each other node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */cloneData:function cloneData(nodes,others){nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true,window:true});others=this.parseNodes(others,{fragment:true,shadow:true,document:true,window:true});var _iterator16=_createForOfIteratorHelper(nodes),_step16;try{for(_iterator16.s();!(_step16=_iterator16.n()).done;){var node=_step16.value;var _iterator17=_createForOfIteratorHelper(others),_step17;try{for(_iterator17.s();!(_step17=_iterator17.n()).done;){var other=_step17.value;this.constructor._cloneData(node,other);}}catch(err){_iterator17.e(err);}finally{_iterator17.f();}}}catch(err){_iterator16.e(err);}finally{_iterator16.f();}},/**
             * Get custom data for the first node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [key] The data key.
             * @returns {*} The data value.
             */getData:function getData(nodes,key){var node=this.parseNode(nodes,{fragment:true,shadow:true,document:true,window:true});if(!node){return;}return this.constructor._getData(node,key);},/**
             * Remove custom data from each node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [key] The data key.
             */removeData:function removeData(nodes,key){nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true,window:true});var _iterator18=_createForOfIteratorHelper(nodes),_step18;try{for(_iterator18.s();!(_step18=_iterator18.n()).done;){var node=_step18.value;this.constructor._removeData(node,key);}}catch(err){_iterator18.e(err);}finally{_iterator18.f();}},/**
             * Set custom data for each node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|object} key The data key, or an object containing data.
             * @param {*} [value] The data value.
             */setData:function setData(nodes,key,value){nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true,window:true});var data=this.constructor._parseData(key,value);var _iterator19=_createForOfIteratorHelper(nodes),_step19;try{for(_iterator19.s();!(_step19=_iterator19.n()).done;){var node=_step19.value;this.constructor._setData(node,data);}}catch(err){_iterator19.e(err);}finally{_iterator19.f();}}});/**
         * DOM Position
         */Object.assign(DOM.prototype,{/**
             * Get the X,Y co-ordinates for the center of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {object} An object with the x and y co-ordinates.
             */center:function center(nodes,offset){var nodeBox=this.rect(nodes,offset);if(!nodeBox){return;}return{x:nodeBox.left+nodeBox.width/2,y:nodeBox.top+nodeBox.height/2};},/**
             * Contrain each node to a container node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} container The container node, or a query selector string.
             */constrain:function constrain(nodes,container){var containerBox=this.rect(container);if(!containerBox){return;}nodes=this.parseNodes(nodes);var _iterator20=_createForOfIteratorHelper(nodes),_step20;try{for(_iterator20.s();!(_step20=_iterator20.n()).done;){var node=_step20.value;var nodeBox=this.constructor._rect(node);var style={};if(nodeBox.height>containerBox.height){style.height=containerBox.height;}if(nodeBox.width>containerBox.width){style.width=containerBox.width;}var leftOffset=void 0;if(nodeBox.left-containerBox.left<0){leftOffset=nodeBox.left-containerBox.left;}else if(nodeBox.right-containerBox.right>0){leftOffset=nodeBox.right-containerBox.right;}if(leftOffset){var oldLeft=this.constructor._css(node,'left');var trueLeft=oldLeft&&oldLeft!=='auto'?parseFloat(oldLeft):0;style.left="".concat(trueLeft-leftOffset,"px");}var topOffset=void 0;if(nodeBox.top-containerBox.top<0){topOffset=nodeBox.top-containerBox.top;}else if(nodeBox.bottom-containerBox.bottom>0){topOffset=nodeBox.bottom-containerBox.bottom;}if(topOffset){var oldTop=this.constructor._css(node,'top');var trueTop=oldTop&&oldTop!=='auto'?parseFloat(oldTop):0;style.top="".concat(trueTop-topOffset,"px");}if(this.constructor._css(node,'position')==='static'){style.position='relative';}this.constructor._setStyles(node,style);}}catch(err){_iterator20.e(err);}finally{_iterator20.f();}},/**
             * Get the distance of a node to an X,Y position in the Window.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} x The X co-ordinate.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {number} The distance to the element.
             */distTo:function distTo(nodes,x,y,offset){var nodeCenter=this.center(nodes,offset);if(!nodeCenter){return;}return Core.dist(nodeCenter.x,nodeCenter.y,x,y);},/**
             * Get the distance between two nodes.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
             * @returns {number} The distance between the nodes.
             */distToNode:function distToNode(nodes,others){var otherCenter=this.center(others);if(!otherCenter){return;}return this.distTo(nodes,otherCenter.x,otherCenter.y);},/**
             * Get the nearest node to an X,Y position in the Window.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} x The X co-ordinate.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {HTMLElement} The nearest node.
             */nearestTo:function nearestTo(nodes,x,y,offset){var closest,closestDistance=Number.MAX_VALUE;nodes=this.parseNodes(nodes);var _iterator21=_createForOfIteratorHelper(nodes),_step21;try{for(_iterator21.s();!(_step21=_iterator21.n()).done;){var node=_step21.value;var dist=this.distTo(node,x,y,offset);if(dist&&dist<closestDistance){closestDistance=dist;closest=node;}}}catch(err){_iterator21.e(err);}finally{_iterator21.f();}return closest;},/**
             * Get the nearest node to another node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
             * @returns {HTMLElement} The nearest node.
             */nearestToNode:function nearestToNode(nodes,others){var otherCenter=this.center(others);if(!otherCenter){return;}return this.nearestTo(nodes,otherCenter.x,otherCenter.y);},/**
             * Get the percentage of an X co-ordinate relative to a node's width.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} x The X co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
             * @returns {number} The percent.
             */percentX:function percentX(nodes,x,offset){var clamp=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;var nodeBox=this.rect(nodes,offset);if(!nodeBox){return;}var percent=(x-nodeBox.left)/nodeBox.width*100;return clamp?Core.clampPercent(percent):percent;},/**
             * Get the percentage of a Y co-ordinate relative to a node's height.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
             * @returns {number} The percent.
             */percentY:function percentY(nodes,y,offset){var clamp=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;var nodeBox=this.rect(nodes,offset);if(!nodeBox){return;}var percent=(y-nodeBox.top)/nodeBox.height*100;return clamp?Core.clampPercent(percent):percent;},/**
             * Get the position of the first node relative to the Window or Document.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {object} An object with the X and Y co-ordinates.
             */position:function position(nodes,offset){var node=this.parseNode(nodes);if(!node){return;}return this.constructor._forceShow(node,function(node){var result={x:node.offsetLeft,y:node.offsetTop};if(offset){var offsetParent=node;while(offsetParent=offsetParent.offsetParent){result.x+=offsetParent.offsetLeft;result.y+=offsetParent.offsetTop;}}return result;});},/**
             * Get the computed bounding rectangle of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {DOMRect} The computed bounding rectangle.
             */rect:function rect(nodes,offset){var node=this.parseNode(nodes);if(!node){return;}return this.constructor._rect(node,offset);}});/**
         * DOM Scroll
         */Object.assign(DOM.prototype,{/**
             * Get the scroll X position of the first node.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {number} The scroll X position.
             */getScrollX:function getScrollX(nodes){var node=this.parseNode(nodes,{document:true,window:true});if(!node){return;}if(Core.isWindow(node)){return node.scrollX;}if(Core.isDocument(node)){return node.scrollingElement.scrollLeft;}return node.scrollLeft;},/**
             * Get the scroll Y position of the first node.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {number} The scroll Y position.
             */getScrollY:function getScrollY(nodes){var node=this.parseNode(nodes,{document:true,window:true});if(!node){return;}if(Core.isWindow(node)){return node.scrollY;}if(Core.isDocument(node)){return node.scrollingElement.scrollTop;}return node.scrollTop;},/**
             * Scroll each node to an X,Y position.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} x The scroll X position.
             * @param {number} y The scroll Y position.
             */setScroll:function setScroll(nodes,x,y){nodes=this.parseNodes(nodes,{document:true,window:true});var _iterator22=_createForOfIteratorHelper(nodes),_step22;try{for(_iterator22.s();!(_step22=_iterator22.n()).done;){var node=_step22.value;if(Core.isWindow(node)){node.scroll(x,y);}else if(Core.isDocument(node)){node.scrollingElement.scrollLeft=x;node.scrollingElement.scrollTop=y;}else{node.scrollLeft=x;node.scrollTop=y;}}}catch(err){_iterator22.e(err);}finally{_iterator22.f();}},/**
             * Scroll each node to an X position.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} x The scroll X position.
             */setScrollX:function setScrollX(nodes,x){nodes=this.parseNodes(nodes,{document:true,window:true});var _iterator23=_createForOfIteratorHelper(nodes),_step23;try{for(_iterator23.s();!(_step23=_iterator23.n()).done;){var node=_step23.value;if(Core.isWindow(node)){node.scroll(x,node.scrollY);}else if(Core.isDocument(node)){node.scrollingElement.scrollLeft=x;}else{node.scrollLeft=x;}}}catch(err){_iterator23.e(err);}finally{_iterator23.f();}},/**
             * Scroll each node to a Y position.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} y The scroll Y position.
             */setScrollY:function setScrollY(nodes,y){nodes=this.parseNodes(nodes,{document:true,window:true});var _iterator24=_createForOfIteratorHelper(nodes),_step24;try{for(_iterator24.s();!(_step24=_iterator24.n()).done;){var node=_step24.value;if(Core.isWindow(node)){node.scroll(node.scrollX,y);}else if(Core.isDocument(node)){node.scrollingElement.scrollTop=y;}else{node.scrollTop=y;}}}catch(err){_iterator24.e(err);}finally{_iterator24.f();}}});/**
         * DOM Size
         */Object.assign(DOM.prototype,{/**
             * Get the computed height of the first node.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} [innerOuter] Whether to include padding, border and margin heights.
             * @returns {number} The height.
             */height:function height(nodes,innerOuter){var node=this.parseNode(nodes,{document:true,window:true});if(!node){return;}if(Core.isWindow(node)){return innerOuter?node.outerHeight:node.innerHeight;}if(Core.isUndefined(innerOuter)){innerOuter=1;}return this.constructor._height(node,innerOuter);},/**
             * Get the scroll height of the first node.
             * @param {string|array|HTMLElement|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {number} The scroll height.
             */scrollHeight:function scrollHeight(nodes){var node=this.parseNode(nodes,{document:true});if(!node){return;}return this.constructor._forceShow(node,function(node){if(Core.isDocument(node)){node=node.documentElement;}return node.scrollHeight;});},/**
             * Get the scroll width of the first node.
             * @param {string|array|HTMLElement|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {number} The scroll width.
             */scrollWidth:function scrollWidth(nodes){var node=this.parseNode(nodes,{document:true});if(!node){return;}return this.constructor._forceShow(node,function(node){if(Core.isDocument(node)){node=node.documentElement;}return node.scrollWidth;});},/**
             * Get the computed width of the first node.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} [innerOuter] Whether to include padding, border and margin widths.
             * @returns {number} The width.
             */width:function width(nodes,innerOuter){var node=this.parseNode(nodes,{document:true,window:true});if(!node){return;}if(Core.isWindow(node)){return innerOuter?node.outerWidth:node.innerWidth;}if(Core.isUndefined(innerOuter)){innerOuter=1;}return this.constructor._width(node,innerOuter);}});/**
         * DOM Styles
         */Object.assign(DOM.prototype,{/**
             * Add classes to each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {...string|string[]} classes The classes.
             */addClass:function addClass(nodes){for(var _len13=arguments.length,classes=new Array(_len13>1?_len13-1:0),_key13=1;_key13<_len13;_key13++){classes[_key13-1]=arguments[_key13];}nodes=this.parseNodes(nodes);classes=this.constructor._parseClasses(classes);if(!classes.length){return;}var _iterator25=_createForOfIteratorHelper(nodes),_step25;try{for(_iterator25.s();!(_step25=_iterator25.n()).done;){var _node$classList;var node=_step25.value;(_node$classList=node.classList).add.apply(_node$classList,_toConsumableArray(classes));}}catch(err){_iterator25.e(err);}finally{_iterator25.f();}},/**
             * Get computed CSS style value(s) for the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [style] The CSS style name.
             * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
             */css:function css(nodes,style){var node=this.parseNode(nodes);if(!node){return;}return this.constructor._css(node,style);},/**
             * Get style properties for the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [style] The style name.
             * @returns {string|object} The style value, or an object containing the style properties.
             */getStyle:function getStyle(nodes,style){var node=this.parseNode(nodes);if(!node){return;}if(style){style=Core.kebabCase(style);return node.style[style];}var styles={};var _iterator26=_createForOfIteratorHelper(node.style),_step26;try{for(_iterator26.s();!(_step26=_iterator26.n()).done;){var _style=_step26.value;styles[_style]=node.style[_style];}}catch(err){_iterator26.e(err);}finally{_iterator26.f();}return styles;},/**
             * Hide each node from display.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */hide:function hide(nodes){this.setStyle(nodes,'display','none');},/**
             * Remove classes from each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {...string|string[]} classes The classes.
             */removeClass:function removeClass(nodes){for(var _len14=arguments.length,classes=new Array(_len14>1?_len14-1:0),_key14=1;_key14<_len14;_key14++){classes[_key14-1]=arguments[_key14];}nodes=this.parseNodes(nodes);classes=this.constructor._parseClasses(classes);if(!classes.length){return;}var _iterator27=_createForOfIteratorHelper(nodes),_step27;try{for(_iterator27.s();!(_step27=_iterator27.n()).done;){var _node$classList2;var node=_step27.value;(_node$classList2=node.classList).remove.apply(_node$classList2,_toConsumableArray(classes));}}catch(err){_iterator27.e(err);}finally{_iterator27.f();}},/**
             * Set style properties for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|object} style The style name, or an object containing styles.
             * @param {string} [value] The style value.
             * @param {Boolean} [important] Whether the style should be !important.
             */setStyle:function setStyle(nodes,style,value,important){nodes=this.parseNodes(nodes);var styles=this.constructor._parseData(style,value);var _iterator28=_createForOfIteratorHelper(nodes),_step28;try{for(_iterator28.s();!(_step28=_iterator28.n()).done;){var node=_step28.value;this.constructor._setStyles(node,styles,important);}}catch(err){_iterator28.e(err);}finally{_iterator28.f();}},/**
             * Display each hidden node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */show:function show(nodes){this.setStyle(nodes,'display','');},/**
             * Toggle the visibility of each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */toggle:function toggle(nodes){nodes=this.parseNodes(nodes);var _iterator29=_createForOfIteratorHelper(nodes),_step29;try{for(_iterator29.s();!(_step29=_iterator29.n()).done;){var node=_step29.value;node.style.setProperty('display',node.style.display==='none'?'':'none');}}catch(err){_iterator29.e(err);}finally{_iterator29.f();}},/**
             * Toggle classes for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {...string|string[]} classes The classes.
             */toggleClass:function toggleClass(nodes){for(var _len15=arguments.length,classes=new Array(_len15>1?_len15-1:0),_key15=1;_key15<_len15;_key15++){classes[_key15-1]=arguments[_key15];}nodes=this.parseNodes(nodes);classes=this.constructor._parseClasses(classes);if(!classes.length){return;}var _iterator30=_createForOfIteratorHelper(nodes),_step30;try{for(_iterator30.s();!(_step30=_iterator30.n()).done;){var node=_step30.value;var _iterator31=_createForOfIteratorHelper(classes),_step31;try{for(_iterator31.s();!(_step31=_iterator31.n()).done;){var className=_step31.value;node.classList.toggle(className);}}catch(err){_iterator31.e(err);}finally{_iterator31.f();}}}catch(err){_iterator30.e(err);}finally{_iterator30.f();}}});/**
         * DOM Cookie
         */Object.assign(DOM.prototype,{/**
             * Get a cookie value.
             * @param {string} name The cookie name.
             * @returns {*} The cookie value.
             */getCookie:function getCookie(name){var cookie=this._context.cookie.split(';').find(function(cookie){return cookie.trimStart().substring(0,name.length)===name;}).trimStart();if(!cookie){return null;}return decodeURIComponent(cookie.substring(name.length+1));},/**
             * Remove a cookie.
             * @param {string} name The cookie name.
             * @param {object} [options] The options to use for the cookie.
             * @param {string} [options.path] The cookie path.
             * @param {Boolean} [options.secure] Whether the cookie is secure.
             */removeCookie:function removeCookie(name,options){if(!name){return;}var cookie="".concat(name,"=;expires=Thu, 01 Jan 1970 00:00:00 UTC");if(options){if(options.path){cookie+=";path=".concat(options.path);}if(options.secure){cookie+=';secure';}}this._context.cookie=cookie;},/**
             * Set a cookie value.
             * @param {string} name The cookie name.
             * @param {*} value The cookie value.
             * @param {object} [options] The options to use for the cookie.
             * @param {number} [options.expires] The number of seconds until the cookie will expire.
             * @param {string} [options.path] The path to use for the cookie.
             * @param {Boolean} [options.secure] Whether the cookie is secure.
             */setCookie:function setCookie(name,value,options){if(!name){return;}var cookie="".concat(name,"=").concat(value);if(options){if(options.expires){var date=new Date();date.setTime(date.getTime()+options.expires*1000);cookie+=";expires=".concat(date.toUTCString());}if(options.path){cookie+=";path=".concat(options.path);}if(options.secure){cookie+=';secure';}}this._context.cookie=cookie;}});/**
         * DOM Event Factory
         */Object.assign(DOM.prototype,{/** 
             * Return a wrapped mouse drag event (optionally limited by animation frame).
             * @param {DOM~eventCallback} down The callback to execute on mousedown.
             * @param {DOM~eventCallback} move The callback to execute on mousemove.
             * @param {DOM~eventCallback} up The callback to execute on mouseup.
             * @param {Boolean} [animated=true] Whether to limit the move event by animation frame.
             * @returns {DOM~eventCallback} The mouse drag event callback.
             */mouseDragFactory:function mouseDragFactory(down,move,up){var _this9=this;var animated=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;if(move&&animated){move=Core.animation(move);// needed to make sure up callback executes after final move callback
if(up){up=Core.animation(up);}}return function(e){if(down&&down(e)===false){return false;}if(move){_this9.addEvent(window,'mousemove',move);}if(move||up){_this9.addEventOnce(window,'mouseup',function(e){if(move){_this9.removeEvent(window,'mousemove',move);}if(up){up(e);}});}};}});/**
         * DOM Events
         */Object.assign(DOM.prototype,{/**
             * Trigger a blur event on the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */blur:function blur(nodes){var node=this.parseNode(nodes);if(!node){return;}node.blur();},/**
             * Trigger a click event on the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */click:function click(nodes){var node=this.parseNode(nodes);if(!node){return;}node.click();},/**
             * Trigger a focus event on the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */focus:function focus(nodes){var node=this.parseNode(nodes);if(!node){return;}node.focus();},/**
             * Add a function to the ready queue.
             * @param {DOM~eventCallback} callback The callback to execute.
             */ready:function ready(callback){if(this._context.readyState==='complete'){callback();return;}window.addEventListener('DOMContentLoaded',callback,{once:true});}});/**
         * DOM Event Handlers
         */Object.assign(DOM.prototype,{/**
             * Add events to each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} events The event names.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @param {string} [delegate] The delegate selector.
             * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
             */addEvent:function addEvent(nodes,events,callback,delegate,selfDestruct){nodes=this.parseNodes(nodes,{shadow:true,document:true,window:!delegate});var _iterator32=_createForOfIteratorHelper(nodes),_step32;try{for(_iterator32.s();!(_step32=_iterator32.n()).done;){var node=_step32.value;var _iterator33=_createForOfIteratorHelper(this.constructor._parseEvents(events)),_step33;try{for(_iterator33.s();!(_step33=_iterator33.n()).done;){var event=_step33.value;this.constructor._addEvent(node,event,callback,delegate,selfDestruct);}}catch(err){_iterator33.e(err);}finally{_iterator33.f();}}}catch(err){_iterator32.e(err);}finally{_iterator32.f();}},/**
             * Add delegated events to each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} events The event names.
             * @param {string} delegate The delegate selector.
             * @param {DOM~eventCallback} callback The callback to execute.
             */addEventDelegate:function addEventDelegate(nodes,events,delegate,callback){this.addEvent(nodes,events,callback,delegate);},/**
             * Add self-destructing delegated events to each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} events The event names.
             * @param {string} delegate The delegate selector.
             * @param {DOM~eventCallback} callback The callback to execute.
             */addEventDelegateOnce:function addEventDelegateOnce(nodes,events,delegate,callback){this.addEvent(nodes,events,callback,delegate,true);},/**
             * Add self-destructing events to each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} events The event names.
             * @param {DOM~eventCallback} callback The callback to execute.
             */addEventOnce:function addEventOnce(nodes,events,callback){this.addEvent(nodes,events,callback,null,true);},/**
             * Clone all events from each node to other nodes.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */cloneEvents:function cloneEvents(nodes,others){nodes=this.parseNodes(nodes,{shadow:true,document:true,window:true});others=this.parseNodes(others,{shadow:true,document:true,window:true});var _iterator34=_createForOfIteratorHelper(nodes),_step34;try{for(_iterator34.s();!(_step34=_iterator34.n()).done;){var node=_step34.value;var _iterator35=_createForOfIteratorHelper(others),_step35;try{for(_iterator35.s();!(_step35=_iterator35.n()).done;){var other=_step35.value;this.constructor._cloneEvents(node,other);}}catch(err){_iterator35.e(err);}finally{_iterator35.f();}}}catch(err){_iterator34.e(err);}finally{_iterator34.f();}},/**
             * Remove events from each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [events] The event names.
             * @param {DOM~eventCallback} [callback] The callback to remove.
             * @param {string} [delegate] The delegate selector.
             */removeEvent:function removeEvent(nodes,events,callback,delegate){nodes=this.parseNodes(nodes,{shadow:true,document:true,window:!delegate});events=events?this.constructor._parseEvents(events):false;var _iterator36=_createForOfIteratorHelper(nodes),_step36;try{for(_iterator36.s();!(_step36=_iterator36.n()).done;){var node=_step36.value;if(!this.constructor._events.has(node)){continue;}if(!events){this.constructor._removeEvent(node,events,callback,delegate);continue;}var _iterator37=_createForOfIteratorHelper(events),_step37;try{for(_iterator37.s();!(_step37=_iterator37.n()).done;){var event=_step37.value;this.constructor._removeEvent(node,event,callback,delegate);}}catch(err){_iterator37.e(err);}finally{_iterator37.f();}}}catch(err){_iterator36.e(err);}finally{_iterator36.f();}},/**
             * Remove delegated events from each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [events] The event names.
             * @param {string} [delegate] The delegate selector.
             * @param {DOM~eventCallback} [callback] The callback to remove.
             */removeEventDelegate:function removeEventDelegate(nodes,events,delegate,callback){this.removeEvent(nodes,events,callback,delegate);},/**
             * Trigger events on each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} events The event names.
             * @param {object} [options] The options to use for the Event.
             * @param {*} [options.detail] Additional data to attach to the event.
             * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
             * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
             */triggerEvent:function triggerEvent(nodes,events,options){nodes=this.parseNodes(nodes,{shadow:true,document:true,window:true});events=this.constructor._parseEvents(events);var _iterator38=_createForOfIteratorHelper(nodes),_step38;try{for(_iterator38.s();!(_step38=_iterator38.n()).done;){var node=_step38.value;var _iterator39=_createForOfIteratorHelper(events),_step39;try{for(_iterator39.s();!(_step39=_iterator39.n()).done;){var event=_step39.value;this.constructor._triggerEvent(node,event,options);}}catch(err){_iterator39.e(err);}finally{_iterator39.f();}}}catch(err){_iterator38.e(err);}finally{_iterator38.f();}},/**
             * Trigger an event for the first node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} event The event name.
             * @param {object} [options] The options to use for the Event.
             * @param {*} [options.detail] Additional data to attach to the event.
             * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
             * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
             */triggerOne:function triggerOne(nodes,event,options){var node=this.parseNode(nodes,{shadow:true,document:true,window:true});return this.constructor._triggerEvent(node,event,options);}});/**
         * DOM Create
         */Object.assign(DOM.prototype,{/**
             * Attach a shadow DOM tree to the first node.
             * @param {string|array|HTMLElement|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
             * @returns {ShadowRoot} The new ShadowRoot.
             */attachShadow:function attachShadow(nodes){var open=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var node=this.parseNode(nodes);if(!node){return;}return node.attachShadow({mode:open?'open':'closed'});},/**
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
             * @returns {HTMLElement} The new HTMLElement.
             */create:function create(){var tagName=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'div';var options=arguments.length>1?arguments[1]:undefined;var node=this._context.createElement(tagName);if(!options){return node;}if('html'in options){node.innerHTML=options.html;}else if('text'in options){node.innerText=options.text;}if('class'in options){var _node$classList3;(_node$classList3=node.classList).add.apply(_node$classList3,_toConsumableArray(this.constructor._parseClasses(Core.wrap(options["class"]))));}if('style'in options){this.constructor._setStyles(node,options.style);}if('value'in options){node.value=options.value;}if('attributes'in options){this.constructor._setAttributes(node,options.attributes);}if('properties'in options){for(var key in options.properties){node[key]=options.properties[key];}}if('dataset'in options){var dataset=this.constructor._parseData(options.dataset,null,true);this.constructor._setDataset(node,dataset);}return node;},/**
             * Create a new comment node.
             * @param {string} comment The comment contents.
             * @returns {Node} The new comment node.
             */createComment:function createComment(comment){return this._context.createComment(comment);},/**
             * Create a new document fragment.
             * @returns {DocumentFragment} The new DocumentFragment.
             */createFragment:function createFragment(){return this._context.createDocumentFragment();},/**
             * Create a new range object.
             * @returns {Range} The new Range.
             */createRange:function createRange(){return this._context.createRange();},/**
             * Create a new text node.
             * @param {string} text The text contents.
             * @returns {Node} The new text node.
             */createText:function createText(text){return this._context.createTextNode(text);},/**
             * Create an Array containing nodes parsed from a HTML string.
             * @param {string} html The HTML input string.
             * @returns {array} An array of nodes.
             */parseHTML:function parseHTML(html){return Core.wrap(this.createRange().createContextualFragment(html).children);}});/**
         * DOM Manipulation
         */Object.assign(DOM.prototype,{/**
             * Clone each node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} options Options for cloning the node.
             * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
             * @param {Boolean} [options.events] Whether to also clone events.
             * @param {Boolean} [options.data] Whether to also clone custom data.
             * @param {Boolean} [options.animations] Whether to also clone animations.
             * @returns {array} The cloned nodes.
             */clone:function clone(nodes,options){var _this10=this;options=_objectSpread({deep:true},options);// ShadowRoot nodes can not be cloned
nodes=this.parseNodes(nodes,{node:true,fragment:true});return nodes.map(function(node){return _this10.constructor._clone(node,options);});},/**
             * Detach each node from the DOM.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @return {array} The detached nodes.
             */detach:function detach(nodes){// DocumentFragment and ShadowRoot nodes can not be detached
nodes=this.parseNodes(nodes,{node:true});var _iterator40=_createForOfIteratorHelper(nodes),_step40;try{for(_iterator40.s();!(_step40=_iterator40.n()).done;){var node=_step40.value;var parent=node.parentNode;if(!parent){continue;}parent.removeChild(node);}}catch(err){_iterator40.e(err);}finally{_iterator40.f();}return nodes;},/**
             * Remove all children of each node from the DOM.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */empty:function empty(nodes){nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});var _iterator41=_createForOfIteratorHelper(nodes),_step41;try{for(_iterator41.s();!(_step41=_iterator41.n()).done;){var node=_step41.value;this.constructor._empty(node);}}catch(err){_iterator41.e(err);}finally{_iterator41.f();}},/**
             * Remove each node from the DOM.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */remove:function remove(nodes){// DocumentFragment and ShadowRoot nodes can not be removed
nodes=this.parseNodes(nodes,{node:true});var _iterator42=_createForOfIteratorHelper(nodes),_step42;try{for(_iterator42.s();!(_step42=_iterator42.n()).done;){var node=_step42.value;var parent=node.parentNode;if(!parent){continue;}this.constructor._remove(node);parent.removeChild(node);}}catch(err){_iterator42.e(err);}finally{_iterator42.f();}},/**
             * Replace each other node with nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector string.
             */replaceAll:function replaceAll(nodes,others){this.replaceWith(others,nodes);},/**
             * Replace each node with other nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector or HTML string.
             */replaceWith:function replaceWith(nodes,others){// DocumentFragment and ShadowRoot nodes can not be removed
nodes=this.parseNodes(nodes,{node:true});// ShadowRoot nodes can not be cloned
others=this.parseNodes(others,{node:true,fragment:true,html:true});// Move nodes to a fragment so they don't get removed
var fragment=this.createFragment();var _iterator43=_createForOfIteratorHelper(others),_step43;try{for(_iterator43.s();!(_step43=_iterator43.n()).done;){var other=_step43.value;fragment.insertBefore(other,null);}}catch(err){_iterator43.e(err);}finally{_iterator43.f();}others=Core.wrap(fragment.childNodes);nodes=nodes.filter(function(node){return!others.includes(node)&&!nodes.some(function(other){return!other.isSameNode(node)&&other.contains(node);});});var lastNode=nodes[nodes.length-1];var _iterator44=_createForOfIteratorHelper(nodes),_step44;try{for(_iterator44.s();!(_step44=_iterator44.n()).done;){var node=_step44.value;var parent=node.parentNode;if(!parent){continue;}var _iterator46=_createForOfIteratorHelper(others),_step46;try{for(_iterator46.s();!(_step46=_iterator46.n()).done;){var _other=_step46.value;parent.insertBefore(node.isSameNode(lastNode)?_other:this.constructor._clone(_other,{deep:true,events:true,data:true,animations:true}),node);}}catch(err){_iterator46.e(err);}finally{_iterator46.f();}}}catch(err){_iterator44.e(err);}finally{_iterator44.f();}var _iterator45=_createForOfIteratorHelper(nodes),_step45;try{for(_iterator45.s();!(_step45=_iterator45.n()).done;){var _node=_step45.value;var _parent=_node.parentNode;if(!_parent){continue;}this.constructor._remove(_node);_parent.removeChild(_node);}}catch(err){_iterator45.e(err);}finally{_iterator45.f();}}});/**
         * DOM Move
         */Object.assign(DOM.prototype,{/**
             * Insert each other node after each node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */after:function after(nodes,others){// DocumentFragment and ShadowRoot nodes can not have siblings
nodes=this.parseNodes(nodes,{node:true});// ShadowRoot nodes can not be moved
others=this.parseNodes(others,{node:true,fragment:true,html:true}).reverse();var lastNode=nodes[nodes.length-1];var _iterator47=_createForOfIteratorHelper(nodes),_step47;try{for(_iterator47.s();!(_step47=_iterator47.n()).done;){var node=_step47.value;var parent=node.parentNode;if(!parent){continue;}var _iterator48=_createForOfIteratorHelper(others),_step48;try{for(_iterator48.s();!(_step48=_iterator48.n()).done;){var other=_step48.value;parent.insertBefore(node.isSameNode(lastNode)?other:this.constructor._clone(other,{deep:true,events:true,data:true,animations:true}),node.nextSibling);}}catch(err){_iterator48.e(err);}finally{_iterator48.f();}}}catch(err){_iterator47.e(err);}finally{_iterator47.f();}},/**
             * Append each other node to each node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */append:function append(nodes,others){nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});// ShadowRoot nodes can not be moved
others=this.parseNodes(others,{node:true,fragment:true,html:true});var lastNode=nodes[nodes.length-1];var _iterator49=_createForOfIteratorHelper(nodes),_step49;try{for(_iterator49.s();!(_step49=_iterator49.n()).done;){var node=_step49.value;var _iterator50=_createForOfIteratorHelper(others),_step50;try{for(_iterator50.s();!(_step50=_iterator50.n()).done;){var other=_step50.value;node.insertBefore(node.isSameNode(lastNode)?other:this.constructor._clone(other,{deep:true,events:true,data:true,animations:true}),null);}}catch(err){_iterator50.e(err);}finally{_iterator50.f();}}}catch(err){_iterator49.e(err);}finally{_iterator49.f();}},/**
             * Append each node to each other node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */appendTo:function appendTo(nodes,others){this.append(others,nodes);},/**
             * Insert each other node before each node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */before:function before(nodes,others){// DocumentFragment and ShadowRoot nodes can not have siblings
nodes=this.parseNodes(nodes,{node:true});// ShadowRoot nodes can not be moved
others=this.parseNodes(others,{node:true,fragment:true,html:true});var lastNode=nodes[nodes.length-1];var _iterator51=_createForOfIteratorHelper(nodes),_step51;try{for(_iterator51.s();!(_step51=_iterator51.n()).done;){var node=_step51.value;var parent=node.parentNode;if(!parent){continue;}var _iterator52=_createForOfIteratorHelper(others),_step52;try{for(_iterator52.s();!(_step52=_iterator52.n()).done;){var other=_step52.value;parent.insertBefore(node.isSameNode(lastNode)?other:this.constructor._clone(other,{deep:true,events:true,data:true,animations:true}),node);}}catch(err){_iterator52.e(err);}finally{_iterator52.f();}}}catch(err){_iterator51.e(err);}finally{_iterator51.f();}},/**
             * Insert each node after each other node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */insertAfter:function insertAfter(nodes,others){this.after(others,nodes);},/**
             * Insert each node before each other node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */insertBefore:function insertBefore(nodes,others){this.before(others,nodes);},/**
             * Prepend each other node to each node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
             */prepend:function prepend(nodes,others){nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});// ShadowRoot nodes can not be moved
others=this.parseNodes(others,{node:true,fragment:true,html:true});var lastNode=nodes[nodes.length-1];var _iterator53=_createForOfIteratorHelper(nodes),_step53;try{for(_iterator53.s();!(_step53=_iterator53.n()).done;){var node=_step53.value;var firstChild=node.firstChild;var _iterator54=_createForOfIteratorHelper(others),_step54;try{for(_iterator54.s();!(_step54=_iterator54.n()).done;){var other=_step54.value;node.insertBefore(node.isSameNode(lastNode)?other:this.constructor._clone(other,{deep:true,events:true,data:true,animations:true}),firstChild);}}catch(err){_iterator54.e(err);}finally{_iterator54.f();}}}catch(err){_iterator53.e(err);}finally{_iterator53.f();}},/**
             * Prepend each node to each other node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */prependTo:function prependTo(nodes,others){this.prepend(others,nodes);}});/**
         * DOM Wrap
         */Object.assign(DOM.prototype,{/**
             * Unwrap each node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             */unwrap:function unwrap(nodes,filter){// DocumentFragment and ShadowRoot nodes can not be unwrapped
nodes=this.parseNodes(nodes,{node:true});filter=this.parseFilter(filter);var parents=[];var _iterator55=_createForOfIteratorHelper(nodes),_step55;try{for(_iterator55.s();!(_step55=_iterator55.n()).done;){var node=_step55.value;var _parent2=node.parentNode;if(!_parent2){continue;}if(parents.includes(_parent2)){continue;}if(filter&&!filter(_parent2)){continue;}parents.push(_parent2);}}catch(err){_iterator55.e(err);}finally{_iterator55.f();}for(var _i2=0,_parents=parents;_i2<_parents.length;_i2++){var parent=_parents[_i2];var outerParent=parent.parentNode;if(!outerParent){continue;}var children=Core.wrap(parent.childNodes);var _iterator56=_createForOfIteratorHelper(children),_step56;try{for(_iterator56.s();!(_step56=_iterator56.n()).done;){var child=_step56.value;outerParent.insertBefore(child,parent);}}catch(err){_iterator56.e(err);}finally{_iterator56.f();}this.constructor._remove(parent);outerParent.removeChild(parent);}},/**
             * Wrap each nodes with other nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */wrap:function wrap(nodes,others){var _this11=this;// DocumentFragment and ShadowRoot nodes can not be wrapped
nodes=this.parseNodes(nodes,{node:true});// ShadowRoot nodes can not be cloned
others=this.parseNodes(others,{fragment:true,html:true});var _iterator57=_createForOfIteratorHelper(nodes),_step57;try{for(_iterator57.s();!(_step57=_iterator57.n()).done;){var node=_step57.value;var parent=node.parentNode;if(!parent){continue;}var clones=others.map(function(other){return _this11.constructor._clone(other,{deep:true,events:true,data:true,animations:true});});var firstClone=clones.slice().shift();var deepest=this.constructor._deepest(Core.isFragment(firstClone)?firstClone.firstChild:firstClone);var _iterator58=_createForOfIteratorHelper(clones),_step58;try{for(_iterator58.s();!(_step58=_iterator58.n()).done;){var clone=_step58.value;parent.insertBefore(clone,node);}}catch(err){_iterator58.e(err);}finally{_iterator58.f();}deepest.insertBefore(node,null);}}catch(err){_iterator57.e(err);}finally{_iterator57.f();}},/**
             * Wrap all nodes with other nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */wrapAll:function wrapAll(nodes,others){// DocumentFragment and ShadowRoot nodes can not be wrapped
nodes=this.parseNodes(nodes,{node:true});// ShadowRoot nodes can not be cloned
others=this.parseNodes(others,{fragment:true,html:true});var clones=this.clone(others,{events:true,data:true,animations:true});var firstNode=nodes[0];if(!firstNode){return;}var parent=firstNode.parentNode;if(!parent){return;}var firstClone=clones[0];var deepest=this.constructor._deepest(Core.isFragment(firstClone)?firstClone.firstChild:firstClone);var _iterator59=_createForOfIteratorHelper(clones),_step59;try{for(_iterator59.s();!(_step59=_iterator59.n()).done;){var clone=_step59.value;parent.insertBefore(clone,firstNode);}}catch(err){_iterator59.e(err);}finally{_iterator59.f();}var _iterator60=_createForOfIteratorHelper(nodes),_step60;try{for(_iterator60.s();!(_step60=_iterator60.n()).done;){var node=_step60.value;deepest.insertBefore(node,null);}}catch(err){_iterator60.e(err);}finally{_iterator60.f();}},/**
             * Wrap the contents of each node with other nodes.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */wrapInner:function wrapInner(nodes,others){var _this12=this;nodes=this.parseNodes(nodes,{node:true,fragment:true,shadow:true});// ShadowRoot nodes can not be cloned
others=this.parseNodes(others,{fragment:true,html:true});var _iterator61=_createForOfIteratorHelper(nodes),_step61;try{for(_iterator61.s();!(_step61=_iterator61.n()).done;){var node=_step61.value;var children=Core.wrap(node.childNodes);var clones=others.map(function(other){return _this12.constructor._clone(other,{deep:true,events:true,data:true,animatinos:true});});var firstClone=clones.slice().shift();var deepest=this.constructor._deepest(Core.isFragment(firstClone)?firstClone.firstChild:firstClone);var _iterator62=_createForOfIteratorHelper(clones),_step62;try{for(_iterator62.s();!(_step62=_iterator62.n()).done;){var clone=_step62.value;node.insertBefore(clone,null);}}catch(err){_iterator62.e(err);}finally{_iterator62.f();}var _iterator63=_createForOfIteratorHelper(children),_step63;try{for(_iterator63.s();!(_step63=_iterator63.n()).done;){var child=_step63.value;deepest.insertBefore(child,null);}}catch(err){_iterator63.e(err);}finally{_iterator63.f();}}}catch(err){_iterator61.e(err);}finally{_iterator61.f();}}});/**
         * DOM Query
         */Object.assign(DOM.prototype,{/**
             * Add a function to the ready queue or return a QuerySetImmutable.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet|function} query The input query.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
             * @param {Boolean} [mutable=false] Whether to create a mutable QuerySet.
             * @returns {QuerySet} The new QuerySet object.
             */query:function query(_query){var context=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var mutable=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(Core.isFunction(_query)){return this.ready(_query);}var nodes=this.parseNodes(_query,{node:true,fragment:true,shadow:true,document:true,window:true,html:true,context:context?context:this._context});return mutable?new QuerySet(nodes,this):new QuerySetImmutable(nodes,this);},/**
             * Add a function to the ready queue or return a QuerySet.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet|function} query The input query.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
             * @returns {QuerySet} The new QuerySet object.
             */queryMutable:function queryMutable(query){var context=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return this.query(query,context,true);},/**
             * Return a QuerySetImmutable for the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} query The input query.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
             * @param {Boolean} [mutable=false] Whether to create a mutable QuerySet.
             * @returns {QuerySet} The new QuerySet object.
             */queryOne:function queryOne(query){var context=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var mutable=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var node=this.parseNode(query,{node:true,fragment:true,shadow:true,document:true,window:true,html:true,context:context?context:this._context});var nodes=[node].filter(function(v){return v;});return mutable?new QuerySet(nodes,this):new QuerySetImmutable(nodes,this);},/**
             * Return a QuerySet for the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} query The input query.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
             * @returns {QuerySet} The new QuerySet object.
             */queryOneMutable:function queryOneMutable(query){var context=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return this.queryOne(query,context,true);}});/**
         * DOM AJAX Scripts
         */Object.assign(DOM.prototype,{/**
             * Load and execute a JavaScript file.
             * @param {string} url The URL of the script.
             * @param {object} [attributes] Additional attributes to set on the script tag.
             * @param {Boolean} [cache=true] Whether to cache the request.
             * @returns {Promise} A new Promise that resolves when the script is loaded, or rejects on failure.
             */loadScript:function loadScript(url,attributes){var _this13=this;var cache=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;attributes=_objectSpread({src:url,type:'text/javascript'},attributes);if(!cache){attributes.src=AjaxRequest.appendQueryString(attributes.src,'_',Date.now());}return new Promise(function(resolve,reject){var script=_this13.create('script',{attributes:attributes});script.onload=function(_){return resolve();};script.onerror=function(_){return reject();};_this13._context.head.appendChild(script);});},/**
             * Load and executes multiple JavaScript files (in order).
             * @param {array} urls An array of script URLs or attribute objects.
             * @param {Boolean} [cache=true] Whether to cache the requests.
             * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
             */loadScripts:function loadScripts(urls){var _this14=this;var cache=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;return Promise.all(urls.map(function(url){return Core.isString(url)?_this14.loadScript(url,null,cache):_this14.loadScript(null,url,cache);}));}});/**
         * DOM AJAX Styles
         */Object.assign(DOM.prototype,{/**
             * Import a CSS Stylesheet file.
             * @param {string} url The URL of the stylesheet.
             * @param {object} [attributes] Additional attributes to set on the style tag.
             * @param {Boolean} [cache=true] Whether to cache the request.
             * @returns {Promise} A new Promise that resolves when the stylesheet is loaded, or rejects on failure.
             */loadStyle:function loadStyle(url,attributes){var _this15=this;var cache=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;attributes=_objectSpread({href:url,rel:'stylesheet'},attributes);if(!cache){attributes.href=AjaxRequest.appendQueryString(attributes.href,'_',Date.now());}return new Promise(function(resolve,reject){var link=_this15.create('link',{attributes:attributes});link.onload=function(_){return resolve();};link.onerror=function(_){return reject();};_this15._context.head.appendChild(link);});},/**
             * Import multiple CSS Stylesheet files.
             * @param {array} urls An array of stylesheet URLs or attribute objects.
             * @param {Boolean} [cache=true] Whether to cache the requests.
             * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
             */loadStyles:function loadStyles(urls){var _this16=this;var cache=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;return Promise.all(urls.map(function(url){return Core.isString(url)?_this16.loadStyle(url,null,cache):_this16.loadStyle(null,url,cache);}));}});/**
         * DOM Filter
         */Object.assign(DOM.prototype,{/**
             * Return all nodes connected to the DOM.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */connected:function connected(nodes){return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).filter(function(node){return node.isConnected;});},/**
             * Return all nodes considered equal to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */equal:function equal(nodes,others){others=this.parseNodes(others,{node:true,fragment:true,shadow:true});return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).filter(function(node){return others.some(function(other){return node.isEqualNode(other);});});},/**
             * Return all nodes matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The filtered nodes.
             */filter:function filter(nodes,_filter){_filter=this.parseFilter(_filter);return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).filter(function(node,index){return!_filter||_filter(node,index);});},/**
             * Return the first node matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
             */filterOne:function filterOne(nodes,filter){filter=this.parseFilter(filter);return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).find(function(node,index){return!filter||filter(node,index);})||null;},/**
             * Return all "fixed" nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */fixed:function fixed(nodes){var _this17=this;return this.parseNodes(nodes,{node:true}).filter(function(node){return Core.isElement(node)&&_this17.constructor._css(node,'position')==='fixed'||_this17.constructor._parents(node,function(parent){return Core.isElement(parent)&&_this17.constructor._css(parent,'position')==='fixed';},false,true).length;});},/**
             * Return all hidden nodes.
             * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */hidden:function hidden(nodes){var _this18=this;return this.parseNodes(nodes,{node:true,document:true,window:true}).filter(function(node){return!_this18.constructor._isVisible(node);});},/**
             * Return all nodes not matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The filtered nodes.
             */not:function not(nodes,filter){filter=this.parseFilter(filter);return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).filter(function(node,index){return filter&&!filter(node,index);});},/**
             * Return the first node not matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
             */notOne:function notOne(nodes,filter){filter=this.parseFilter(filter);return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).find(function(node,index){return filter&&!filter(node,index);})||null;},/**
             * Return all nodes considered identical to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */same:function same(nodes,others){others=this.parseNodes(others,{node:true,fragment:true,shadow:true});return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).filter(function(node){return others.some(function(other){return node.isSameNode(other);});});},/**
             * Return all visible nodes.
             * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */visible:function visible(nodes){var _this19=this;return this.parseNodes(nodes,{node:true,document:true,window:true}).filter(function(node){return _this19.constructor._isVisible(node);});},/**
             * Return all nodes with an animation.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */withAnimation:function withAnimation(nodes){return this.parseNodes(nodes).filter(function(node){return Animation._animations.has(node);});},/**
             * Return all nodes with a specified attribute.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} attribute The attribute name.
             * @returns {array} The filtered nodes.
             */withAttribute:function withAttribute(nodes,attribute){return this.parseNodes(nodes).filter(function(node){return node.hasAttribute(attribute);});},/**
             * Return all nodes with child elements.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */withChildren:function withChildren(nodes){return this.parseNodes(nodes,{fragment:true,shadow:true,document:true}).filter(function(node){return!!node.childElementCount;});},/**
             * Return all nodes with any of the specified classes.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {...string|string[]} classes The classes.
             * @returns {array} The filtered nodes.
             */withClass:function withClass(nodes){for(var _len16=arguments.length,classes=new Array(_len16>1?_len16-1:0),_key16=1;_key16<_len16;_key16++){classes[_key16-1]=arguments[_key16];}classes=this.constructor._parseClasses(classes);return this.parseNodes(nodes).filter(function(node){return classes.some(function(className){return node.classList.contains(className);});});},/**
             * Return all nodes with a CSS animation.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */withCSSAnimation:function withCSSAnimation(nodes){var _this20=this;return this.parseNodes(nodes).filter(function(node){return _this20.constructor._hasCSSAnimation(node);});},/**
             * Return all nodes with a CSS transition.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */withCSSTransition:function withCSSTransition(nodes){var _this21=this;return this.parseNodes(nodes).filter(function(node){return _this21.constructor._hasCSSTransition(node);});},/**
             * Return all nodes with custom data.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [key] The data key.
             * @returns {array} The filtered nodes.
             */withData:function withData(nodes,key){var _this22=this;return this.parseNodes(nodes,{node:true,fragment:true,shadow:true,document:true,window:true}).filter(function(node){return _this22.constructor._hasData(node,key);});},/**
             * Return all nodes with a descendent matching a filter.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The filtered nodes.
             */withDescendent:function withDescendent(nodes,filter){filter=this.parseFilterContains(filter);return this.parseNodes(nodes,{fragment:true,shadow:true,document:true}).filter(function(node,index){return!filter||filter(node,index);});},/**
             * Return all nodes with a specified property.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} property The property name.
             * @returns {array} The filtered nodes.
             */withProperty:function withProperty(nodes,property){return this.parseNodes(nodes).filter(function(node){return node.hasOwnProperty(property);});}});/**
         * DOM Find
         */Object.assign(DOM.prototype,{/**
             * Return all nodes matching a selector.
             * @param {string} selector The query selector.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {array} The matching nodes.
             */find:function find(selector){var nodes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this._context;// fast selector
var match=selector.match(this.constructor._fastRegExp);if(match){if(match[1]==='#'){return this.findById(match[2],nodes);}if(match[1]==='.'){return this.findByClass(match[2],nodes);}return this.findByTag(match[2],nodes);}// custom selector
if(selector.match(this.constructor._complexRegExp)){selector=this.constructor._prefixSelectors(selector,':scope ');}// standard selector
if(Core.isDocument(nodes)||Core.isElement(nodes)||Core.isFragment(nodes)||Core.isShadow(nodes)){return Core.wrap(nodes.querySelectorAll(selector));}nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});return this.constructor._findBySelector(selector,nodes);},/**
             * Return all nodes with a specific class.
             * @param {string} className The class name.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {array} The matching nodes.
             */findByClass:function findByClass(className){var nodes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this._context;if(Core.isDocument(nodes)||Core.isElement(nodes)){return Core.wrap(nodes.getElementsByClassName(className));}if(Core.isFragment(nodes)||Core.isShadow(nodes)){return Core.wrap(nodes.querySelectorAll(".".concat(className)));}nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});var results=[];var _iterator64=_createForOfIteratorHelper(nodes),_step64;try{for(_iterator64.s();!(_step64=_iterator64.n()).done;){var node=_step64.value;Core.merge(results,Core.isFragment(node)||Core.isShadow(node)?node.querySelectorAll(".".concat(className)):node.getElementsByClassName(className));}}catch(err){_iterator64.e(err);}finally{_iterator64.f();}return nodes.length>1&&results.length>1?Core.unique(results):results;},/**
             * Return all nodes with a specific ID.
             * @param {string} id The id.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {array} The matching nodes.
             */findById:function findById(id){var nodes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this._context;if(Core.isDocument(nodes)||Core.isElement(nodes)||Core.isFragment(nodes)||Core.isShadow(nodes)){return Core.wrap(nodes.querySelectorAll("#".concat(id)));}nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});return this.constructor._findBySelector("#".concat(id),nodes);},/**
             * Return all nodes with a specific tag.
             * @param {string} tagName The tag name.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {array} The matching nodes.
             */findByTag:function findByTag(tagName){var nodes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this._context;if(Core.isDocument(nodes)||Core.isElement(nodes)){return Core.wrap(nodes.getElementsByTagName(tagName));}if(Core.isFragment(nodes)||Core.isShadow(nodes)){return Core.wrap(nodes.querySelectorAll(tagName));}nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});var results=[];var _iterator65=_createForOfIteratorHelper(nodes),_step65;try{for(_iterator65.s();!(_step65=_iterator65.n()).done;){var node=_step65.value;Core.merge(results,Core.isFragment(node)||Core.isShadow(node)?node.querySelectorAll(tagName):node.getElementsByTagName(tagName));}}catch(err){_iterator65.e(err);}finally{_iterator65.f();}return nodes.length>1&&results.length>1?Core.unique(results):results;},/**
             * Return a single node matching a selector.
             * @param {string} selector The query selector.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {HTMLElement} The matching node.
             */findOne:function findOne(selector){var nodes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this._context;// fast selector
var match=selector.match(this.constructor._fastRegExp);if(match){if(match[1]==='#'){return this.findOneById(match[2],nodes);}if(match[1]==='.'){return this.findOneByClass(match[2],nodes);}return this.findOneByTag(match[2],nodes);}// custom selector
if(selector.match(this.constructor._complexRegExp)){selector=this.constructor._prefixSelectors(selector,':scope ');}// standard selector
if(Core.isDocument(nodes)||Core.isElement(nodes)||Core.isFragment(nodes)||Core.isShadow(nodes)){return nodes.querySelector(selector);}nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});if(!nodes.length){return;}return this.constructor._findOneBySelector(selector,nodes);},/**
             * Return a single node with a specific class.
             * @param {string} className The class name.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {HTMLElement} The matching node.
             */findOneByClass:function findOneByClass(className){var nodes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this._context;if(Core.isDocument(nodes)||Core.isElement(nodes)){return nodes.getElementsByClassName(className).item(0);}if(Core.isFragment(nodes)||Core.isShadow(nodes)){return nodes.querySelector(".".concat(className));}nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});if(!nodes.length){return;}var _iterator66=_createForOfIteratorHelper(nodes),_step66;try{for(_iterator66.s();!(_step66=_iterator66.n()).done;){var node=_step66.value;var result=Core.isFragment(node)||Core.isShadow(node)?node.querySelector(".".concat(className)):node.getElementsByClassName(className).item(0);if(result){return result;}}}catch(err){_iterator66.e(err);}finally{_iterator66.f();}return null;},/**
             * Return a single node with a specific ID.
             * @param {string} id The id.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {HTMLElement} The matching element.
             */findOneById:function findOneById(id){var nodes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this._context;if(Core.isDocument(nodes)){return nodes.getElementById(id);}if(Core.isElement(nodes)||Core.isFragment(nodes)||Core.isShadow(nodes)){return nodes.querySelector("#".concat(id));}nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});if(!nodes.length){return;}return this.constructor._findOneBySelector("#".concat(id),nodes);},/**
             * Return a single node with a specific tag.
             * @param {string} tagName The tag name.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {HTMLElement} The matching node.
             */findOneByTag:function findOneByTag(tagName){var nodes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this._context;if(Core.isDocument(nodes)||Core.isElement(nodes)){return nodes.getElementsByTagName(tagName).item(0);}if(Core.isFragment(nodes)||Core.isShadow(nodes)){return nodes.querySelector(tagName);}nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});if(!nodes.length){return;}var _iterator67=_createForOfIteratorHelper(nodes),_step67;try{for(_iterator67.s();!(_step67=_iterator67.n()).done;){var node=_step67.value;var result=Core.isFragment(node)||Core.isShadow(node)?node.querySelector(tagName):node.getElementsByTagName(tagName).item(0);if(result){return result;}}}catch(err){_iterator67.e(err);}finally{_iterator67.f();}return null;}});/**
         * DOM Traversal
         */Object.assign(DOM.prototype,{/**
             * Return the first child of each node (optionally matching a filter).
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The matching nodes.
             */child:function child(nodes,filter){return this.children(nodes,filter,true);},/**
             * Return all children of each node (optionally matching a filter).
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
             * @returns {array} The matching nodes.
             */children:function children(nodes,filter){var first=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var elementsOnly=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;filter=this.parseFilter(filter);if(Core.isElement(nodes)||Core.isDocument(nodes)||Core.isFragment(nodes)||Core.isShadow(nodes)){return this.constructor._children(nodes,filter,first,elementsOnly);}nodes=this.parseNodes(nodes,{fragment:true,shadow:true,document:true});var results=[];var _iterator68=_createForOfIteratorHelper(nodes),_step68;try{for(_iterator68.s();!(_step68=_iterator68.n()).done;){var node=_step68.value;Core.merge(results,this.constructor._children(node,filter,first,elementsOnly));}}catch(err){_iterator68.e(err);}finally{_iterator68.f();}return nodes.length>1&&results.length>1?Core.unique(results):results;},/**
             * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @returns {array} The matching nodes.
             */closest:function closest(nodes,filter,limit){return this.parents(nodes,filter,limit,true);},/**
             * Return the common ancestor of all nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {HTMLElement} The common ancestor.
             */commonAncestor:function commonAncestor(nodes){nodes=this.sort(nodes);if(!nodes.length){return;}// Make sure all nodes have a parent
if(nodes.some(function(node){return!node.parentNode;})){return;}var range=this.createRange();if(nodes.length===1){range.selectNode(nodes.shift());}else{range.setStartBefore(nodes.shift());range.setEndAfter(nodes.pop());}return range.commonAncestorContainer;},/**
             * Return all children of each node (including text and comment nodes).
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The matching nodes.
             */contents:function contents(nodes){return this.children(nodes,false,false,false);},/**
             * Return the DocumentFragment of the first node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {DocumentFragment} The DocumentFragment.
             */fragment:function fragment(nodes){var node=this.parseNode(nodes);if(!node){return;}return node.content;},/**
             * Return the next sibling for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The matching nodes.
             */next:function next(nodes,filter){filter=this.parseFilter(filter);if(Core.isNode(nodes)){return this.constructor._next(nodes,filter);}// DocumentFragment and ShadowRoot nodes can not have siblings
nodes=this.parseNodes(nodes,{node:true});var results=[];var _iterator69=_createForOfIteratorHelper(nodes),_step69;try{for(_iterator69.s();!(_step69=_iterator69.n()).done;){var node=_step69.value;Core.merge(results,this.constructor._nextAll(node,filter,null,true));}}catch(err){_iterator69.e(err);}finally{_iterator69.f();}return nodes.length>1&&results.length>1?Core.unique(results):results;},/**
             * Return all next siblings for each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */nextAll:function nextAll(nodes,filter,limit){var first=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;filter=this.parseFilter(filter);limit=this.parseFilter(limit);if(Core.isNode(nodes)){return this.constructor._nextAll(nodes,filter,limit,first);}// DocumentFragment and ShadowRoot nodes can not have siblings
nodes=this.parseNodes(nodes,{node:true});var results=[];var _iterator70=_createForOfIteratorHelper(nodes),_step70;try{for(_iterator70.s();!(_step70=_iterator70.n()).done;){var node=_step70.value;Core.merge(results,this.constructor._nextAll(node,filter,limit,first));}}catch(err){_iterator70.e(err);}finally{_iterator70.f();}return nodes.length>1&&results.length>1?Core.unique(results):results;},/**
             * Return the offset parent (relatively positioned) of the first node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {HTMLElement} The offset parent.
             */offsetParent:function offsetParent(nodes){return this.forceShow(nodes,function(node){return node.offsetParent;});},/**
             * Return the parent of each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The matching nodes.
             */parent:function parent(nodes,filter){filter=this.parseFilter(filter);if(Core.isNode(nodes)){return this.constructor._parent(nodes,filter);}// DocumentFragment and ShadowRoot nodes have no parent
nodes=this.parseNodes(nodes,{node:true});var results=[];var _iterator71=_createForOfIteratorHelper(nodes),_step71;try{for(_iterator71.s();!(_step71=_iterator71.n()).done;){var node=_step71.value;Core.merge(results,this.constructor._parent(node,filter));}}catch(err){_iterator71.e(err);}finally{_iterator71.f();}return nodes.length>1&&results.length>1?Core.unique(results):results;},/**
             * Return all parents of each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */parents:function parents(nodes,filter,limit){var first=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;filter=this.parseFilter(filter);limit=this.parseFilter(limit);if(Core.isNode(nodes)){return this.constructor._parents(nodes,filter,limit,first);}// DocumentFragment and ShadowRoot nodes have no parent
nodes=this.parseNodes(nodes,{node:true});var results=[];var _iterator72=_createForOfIteratorHelper(nodes),_step72;try{for(_iterator72.s();!(_step72=_iterator72.n()).done;){var node=_step72.value;Core.merge(results,this.constructor._parents(node,filter,limit,first));}}catch(err){_iterator72.e(err);}finally{_iterator72.f();}return nodes.length>1&&results.length>1?Core.unique(results):results;},/**
             * Return the previous sibling for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The matching nodes.
             */prev:function prev(nodes,filter){filter=this.parseFilter(filter);if(Core.isNode(nodes)){return this.constructor._prev(nodes,filter);}// DocumentFragment and ShadowRoot nodes can not have siblings
nodes=this.parseNodes(nodes,{node:true});var results=[];var _iterator73=_createForOfIteratorHelper(nodes),_step73;try{for(_iterator73.s();!(_step73=_iterator73.n()).done;){var node=_step73.value;Core.merge(results,this.constructor._prev(node,filter));}}catch(err){_iterator73.e(err);}finally{_iterator73.f();}return nodes.length>1&&results.length>1?Core.unique(results):results;},/**
             * Return all previous siblings for each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */prevAll:function prevAll(nodes,filter,limit){var first=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;filter=this.parseFilter(filter);limit=this.parseFilter(limit);if(Core.isNode(nodes)){return this.constructor._prevAll(nodes,filter,limit,first);}// DocumentFragment and ShadowRoot nodes can not have siblings
nodes=this.parseNodes(nodes,{node:true});var results=[];var _iterator74=_createForOfIteratorHelper(nodes),_step74;try{for(_iterator74.s();!(_step74=_iterator74.n()).done;){var node=_step74.value;Core.merge(results,this.constructor._prevAll(node,filter,limit,first));}}catch(err){_iterator74.e(err);}finally{_iterator74.f();}return nodes.length>1&&results.length>1?Core.unique(results):results;},/**
             * Return the ShadowRoot of the first node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {ShadowRoot} The ShadowRoot.
             */shadow:function shadow(nodes){var node=this.parseNode(nodes);if(!node){return;}return node.shadowRoot;},/**
             * Return all siblings for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
             * @returns {array} The matching nodes.
             */siblings:function siblings(nodes,filter){var elementsOnly=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;filter=this.parseFilter(filter);if(Core.isNode(nodes)){return this.constructor._siblings(nodes,filter,elementsOnly);}// DocumentFragment and ShadowRoot nodes can not have siblings
nodes=this.parseNodes(nodes,{node:true});var results=[];var _iterator75=_createForOfIteratorHelper(nodes),_step75;try{for(_iterator75.s();!(_step75=_iterator75.n()).done;){var node=_step75.value;Core.merge(results,this.constructor._siblings(node,filter,elementsOnly));}}catch(err){_iterator75.e(err);}finally{_iterator75.f();}return nodes.length>1&&results.length>1?Core.unique(results):results;}});/**
         * DOM Filters
         */Object.assign(DOM.prototype,{/**
             * Return a node filter callback.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
             * @returns {DOM~filterCallback} The node filter callback.
             */parseFilter:function parseFilter(filter){if(!filter){return false;}if(Core.isFunction(filter)){return filter;}if(Core.isString(filter)){return function(node){return Core.isElement(node)&&node.matches(filter);};}if(Core.isNode(filter)||Core.isFragment(filter)||Core.isShadow(filter)){return function(node){return node.isSameNode(filter);};}filter=this.parseNodes(filter,{node:true,fragment:true,shadow:true});if(filter.length){return function(node){return filter.includes(node);};}return false;},/**
             * Return a node contains filter callback.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
             * @returns {DOM~filterCallback} The node contains filter callback.
             */parseFilterContains:function parseFilterContains(filter){var _this23=this;if(!filter){return false;}if(Core.isFunction(filter)){return function(node){return Core.wrap(node.querySelectorAll('*')).some(filter);};}if(Core.isString(filter)){return function(node){return!!_this23.findOne(filter,node);};}if(Core.isNode(filter)||Core.isFragment(filter)||Core.isShadow(filter)){return function(node){return node.contains(filter);};}filter=this.parseNodes(filter,{node:true,fragment:true,shadow:true});if(filter.length){return function(node){return filter.some(function(other){return node.contains(other);});};}return false;},/**
             * Return the first node matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {object} [options] The options for filtering.
             * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
             * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
             * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
             * @param {Boolean} [options.document=false] Whether to allow Document.
             * @param {Boolean} [options.window=false] Whether to allow Window.
             * @param {Boolean} [options.html=false] Whether to allow HTML strings.
             * @param {HTMLElement|Document} [options.context=this._context] The Document context.
             * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} The matching node.
             */parseNode:function parseNode(nodes){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var filter=this.constructor.parseNodesFactory(options);return this._parseNodesDeep(nodes,options.context||this._context,filter,options.html,true);},/**
             * Return a filtered array of nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {object} [options] The options for filtering.
             * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
             * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
             * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
             * @param {Boolean} [options.document=false] Whether to allow Document.
             * @param {Boolean} [options.window=false] Whether to allow Window.
             * @param {Boolean} [options.html=false] Whether to allow HTML strings.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} [options.context=this._context] The Document context.
             * @returns {array} The filtered array of nodes.
             */parseNodes:function parseNodes(nodes){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var filter=this.constructor.parseNodesFactory(options);return this._parseNodesDeep(nodes,options.context||this._context,filter,options.html);},/**
             * Recursively parse nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} context The context node(s), or a query selector string.
             * @param {DOM~nodeCallback} [filter] The callback to use for filtering nodes.
             * @param {Boolean} [first=false] Whether to only return the first result.
             * @returns {array|Node|DocumentFragment|ShadowRoot|Document|Window} The parsed node(s).
             */_parseNodesDeep:function _parseNodesDeep(nodes,context,filter){var _this24=this;var html=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;var first=arguments.length>4&&arguments[4]!==undefined?arguments[4]:false;// check nodes
if(!nodes){return first?null:[];}// String
if(Core.isString(nodes)){// HTML string
if(html&&nodes.trim().charAt(0)==='<'){return this.parseHTML(nodes);}// query selector
if(!first){return this.find(nodes,context);}var _node2=this.findOne(nodes,context);return _node2?_node2:null;}// Node/HTMLElement/Window/Document
if(filter(nodes)){return first?nodes:[nodes];}// QuerySet
if(nodes instanceof QuerySet){if(!first){return nodes.get().filter(filter);}var _node3=nodes.get(0);return _node3&&filter(_node3)?_node3:null;}// HTMLCollection
if(nodes instanceof HTMLCollection){if(!first){return Core.wrap(nodes);}return nodes.length?nodes.item(0):null;}// Array
if(Core.isArray(nodes)){var subFilter=this.constructor.parseNodesFactory({node:true,fragment:true,shadow:true,document:true,window:true});nodes=nodes.flatMap(function(node){return _this24._parseNodesDeep(node,context,subFilter,html);});}else{nodes=Core.wrap(nodes);}if(nodes.length){nodes=Core.unique(nodes);}if(!first){return nodes.filter(filter);}var node=nodes.shift();return node&&filter(node)?node:null;}});/**
         * DOM Selection
         */Object.assign(DOM.prototype,{/**
             * Insert each node after the selection.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             */afterSelection:function afterSelection(nodes){// ShadowRoot nodes can not be moved
nodes=this.parseNodes(nodes,{node:true,fragment:true,html:true}).reverse();var selection=window.getSelection();if(!selection.rangeCount){return;}var range=selection.getRangeAt(0);selection.removeAllRanges();range.collapse();var _iterator76=_createForOfIteratorHelper(nodes),_step76;try{for(_iterator76.s();!(_step76=_iterator76.n()).done;){var node=_step76.value;range.insertNode(node);}}catch(err){_iterator76.e(err);}finally{_iterator76.f();}},/**
             * Insert each node before the selection.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             */beforeSelection:function beforeSelection(nodes){// ShadowRoot nodes can not be moved
nodes=this.parseNodes(nodes,{node:true,fragment:true,html:true}).reverse();var selection=window.getSelection();if(!selection.rangeCount){return;}var range=selection.getRangeAt(0);selection.removeAllRanges();var _iterator77=_createForOfIteratorHelper(nodes),_step77;try{for(_iterator77.s();!(_step77=_iterator77.n()).done;){var node=_step77.value;range.insertNode(node);}}catch(err){_iterator77.e(err);}finally{_iterator77.f();}},/**
             * Extract selected nodes from the DOM.
             * @returns {array} The selected nodes.
             */extractSelection:function extractSelection(){var selection=window.getSelection();if(!selection.rangeCount){return[];}var range=selection.getRangeAt(0);selection.removeAllRanges();var fragment=range.extractContents();return Core.wrap(fragment.childNodes);},/**
             * Return all selected nodes.
             * @returns {array} The selected nodes.
             */getSelection:function getSelection(){var selection=window.getSelection();if(!selection.rangeCount){return[];}var range=selection.getRangeAt(0),nodes=Core.wrap(range.commonAncestorContainer.querySelectorAll('*'));if(!nodes.length){return[range.commonAncestorContainer];}if(nodes.length===1){return nodes;}var startContainer=range.startContainer,endContainer=range.endContainer,start=Core.isElement(startContainer)?startContainer:startContainer.parentNode,end=Core.isElement(endContainer)?endContainer:endContainer.parentNode;var selectedNodes=nodes.slice(nodes.indexOf(start),nodes.indexOf(end)+1);var results=[];var lastNode;var _iterator78=_createForOfIteratorHelper(selectedNodes),_step78;try{for(_iterator78.s();!(_step78=_iterator78.n()).done;){var node=_step78.value;if(lastNode&&lastNode.contains(node)){continue;}lastNode=node;results.push(node);}}catch(err){_iterator78.e(err);}finally{_iterator78.f();}return results;},/**
             * Create a selection on the first node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */select:function select(nodes){var node=this.parseNode(nodes,{node:true});if(node&&'select'in node){return node.select();}var selection=window.getSelection();if(selection.rangeCount>0){selection.removeAllRanges();}if(!node){return;}var range=this.createRange();range.selectNode(node);selection.addRange(range);},/**
             * Create a selection containing all of the nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */selectAll:function selectAll(nodes){nodes=this.sort(nodes);var selection=window.getSelection();if(selection.rangeCount){selection.removeAllRanges();}if(!nodes.length){return;}var range=this.createRange();if(nodes.length==1){range.selectNode(nodes.shift());}else{range.setStartBefore(nodes.shift());range.setEndAfter(nodes.pop());}selection.addRange(range);},/**
             * Wrap selected nodes with other nodes.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             */wrapSelection:function wrapSelection(nodes){// ShadowRoot nodes can not be cloned
nodes=this.parseNodes(nodes,{fragment:true,html:true});var selection=window.getSelection();if(!selection.rangeCount){return;}var range=selection.getRangeAt(0);selection.removeAllRanges();var fragment=range.extractContents(),deepest=this.constructor._deepest(nodes.slice().shift()),children=Core.wrap(fragment.childNodes);var _iterator79=_createForOfIteratorHelper(children),_step79;try{for(_iterator79.s();!(_step79=_iterator79.n()).done;){var child=_step79.value;deepest.insertBefore(child,null);}}catch(err){_iterator79.e(err);}finally{_iterator79.f();}var _iterator80=_createForOfIteratorHelper(nodes),_step80;try{for(_iterator80.s();!(_step80=_iterator80.n()).done;){var node=_step80.value;range.insertNode(node);}}catch(err){_iterator80.e(err);}finally{_iterator80.f();}}});/**
         * DOM Tests
         */Object.assign(DOM.prototype,{/**
             * Returns true if any of the nodes has an animation.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
             */hasAnimation:function hasAnimation(nodes){return this.parseNodes(nodes).some(function(node){return Animation._animations.has(node);});},/**
             * Returns true if any of the nodes has a specified attribute.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} attribute The attribute name.
             * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
             */hasAttribute:function hasAttribute(nodes,attribute){return this.parseNodes(nodes).some(function(node){return node.hasAttribute(attribute);});},/**
             * Returns true if any of the nodes has child nodes.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
             */hasChildren:function hasChildren(nodes){return this.parseNodes(nodes,{fragment:true,shadow:true,document:true}).some(function(node){return!!node.childElementCount;});},/**
             * Returns true if any of the nodes has any of the specified classes.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {...string|string[]} classes The classes.
             * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
             */hasClass:function hasClass(nodes){for(var _len17=arguments.length,classes=new Array(_len17>1?_len17-1:0),_key17=1;_key17<_len17;_key17++){classes[_key17-1]=arguments[_key17];}classes=this.constructor._parseClasses(classes);return this.parseNodes(nodes).some(function(node){return classes.some(function(className){return node.classList.contains(className);});});},/**
             * Returns true if any of the nodes has a CSS animation.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
             */hasCSSAnimation:function hasCSSAnimation(nodes){var _this25=this;return this.parseNodes(nodes).some(function(node){return _this25.constructor._hasCSSAnimation(node);});},/**
             * Returns true if any of the nodes has a CSS transition.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
             */hasCSSTransition:function hasCSSTransition(nodes){var _this26=this;return this.parseNodes(nodes).some(function(node){return _this26.constructor._hasCSSTransition(node);});},/**
             * Returns true if any of the nodes has custom data.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [key] The data key.
             * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
             */hasData:function hasData(nodes,key){var _this27=this;return this.parseNodes(nodes,{fragment:true,shadow:true,document:true,window:true}).some(function(node){return _this27.constructor._hasData(node,key);});},/**
             * Returns true if any of the nodes contains a descendent matching a filter.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
             */hasDescendent:function hasDescendent(nodes,filter){filter=this.parseFilterContains(filter);return this.parseNodes(nodes,{fragment:true,shadow:true,document:true}).some(function(node){return!filter||filter(node);});},/**
             * Returns true if any of the nodes has a DocumentFragment.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
             */hasFragment:function hasFragment(nodes){return this.parseNodes(nodes).some(function(node){return!!node.content;});},/**
             * Returns true if any of the nodes has a specified property.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} property The property name.
             * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
             */hasProperty:function hasProperty(nodes,property){return this.parseNodes(nodes).some(function(node){return node.hasOwnProperty(property);});},/**
             * Returns true if any of the nodes has a ShadowRoot.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
             */hasShadow:function hasShadow(nodes){return this.parseNodes(nodes).some(function(node){return!!node.shadowRoot;});},/**
             * Returns true if any of the nodes matches a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
             */is:function is(nodes,filter){filter=this.parseFilter(filter);return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).some(function(node){return!filter||filter(node);});},/**
             * Returns true if any of the nodes is connected to the DOM.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
             */isConnected:function isConnected(nodes){return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).some(function(node){return node.isConnected;});},/**
             * Returns true if any of the nodes is considered equal to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
             */isEqual:function isEqual(nodes,others){others=this.parseNodes(others,{node:true,fragment:true,shadow:true});return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).some(function(node){return others.some(function(other){return node.isEqualNode(other);});});},/**
             * Returns true if any of the nodes or a parent of any of the nodes is "fixed".
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
             */isFixed:function isFixed(nodes){var _this28=this;return this.parseNodes(nodes,{node:true}).some(function(node){return Core.isElement(node)&&_this28.constructor._css(node,'position')==='fixed'||_this28.constructor._parents(node,function(parent){return Core.isElement(parent)&&_this28.constructor._css(parent,'position')==='fixed';},false,true).length;});},/**
             * Returns true if any of the nodes is hidden.
             * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
             */isHidden:function isHidden(nodes){var _this29=this;return this.parseNodes(nodes,{node:true,document:true,window:true}).some(function(node){return!_this29.constructor._isVisible(node);});},/**
             * Returns true if any of the nodes is considered identical to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
             */isSame:function isSame(nodes,others){others=this.parseNodes(others,{node:true,fragment:true,shadow:true});return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).some(function(node){return others.some(function(other){return node.isSameNode(other);});});},/**
             * Returns true if any of the nodes is visible.
             * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
             */isVisible:function isVisible(nodes){var _this30=this;return this.parseNodes(nodes,{node:true,document:true,window:true}).some(function(node){return _this30.constructor._isVisible(node);});}});/**
         * DOM Utility
         */Object.assign(DOM.prototype,{/**
             * Execute a command in the document context.
             * @param {string} command The command to execute.
             * @param {string} [value] The value to give the command.
             * @returns {Boolean} TRUE if the command was executed, otherwise FALSE.
             */exec:function exec(command){var value=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return this._context.execCommand(command,false,value);},/**
             * Force a node to be shown, and then execute a callback.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {DOM~nodeCallback} callback The callback to execute.
             * @returns {*} The result of the callback.
             */forceShow:function forceShow(nodes,callback){// DocumentFragment and ShadowRoot nodes have no parent
var node=this.parseNode(nodes,{node:true});if(!node){return;}return this.constructor._forceShow(node,callback);},/**
             * Get the index of the first node relative to it's parent.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {number} The index.
             */index:function index(nodes){var node=this.parseNode(nodes,{node:true});if(!node){return;}return Core.wrap(node.parentNode.children).indexOf(node);},/**
             * Get the index of the first node matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {number} The index.
             */indexOf:function indexOf(nodes,filter){filter=this.parseFilter(filter);return this.parseNodes(nodes,{node:true,fragment:true,shadow:true}).findIndex(function(node){return!filter||filter(node);});},/**
             * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */normalize:function normalize(nodes){nodes=this.parseNodes(nodes,{node:true,fragment:true,shadow:true,document:true});var _iterator81=_createForOfIteratorHelper(nodes),_step81;try{for(_iterator81.s();!(_step81=_iterator81.n()).done;){var node=_step81.value;node.normalize();}}catch(err){_iterator81.e(err);}finally{_iterator81.f();}},/**
             * Sanitize a HTML string.
             * @param {string} html The input HTML string.
             * @param {object} [allowedTags] An object containing allowed tags and attributes.
             * @returns {string} The sanitized HTML string.
             */sanitize:function sanitize(html){var allowedTags=arguments.length>1&&arguments[1]!==undefined?arguments[1]:DOM.allowedTags;var template=this.create('template',{html:html}),fragment=template.content,children=this.constructor._children(fragment,null,false,true);var _iterator82=_createForOfIteratorHelper(children),_step82;try{for(_iterator82.s();!(_step82=_iterator82.n()).done;){var child=_step82.value;this.constructor._sanitize(child,fragment,allowedTags);}}catch(err){_iterator82.e(err);}finally{_iterator82.f();}return this.getHTML(template);},/**
             * Return a serialized string containing names and values of all form nodes.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {string} The serialized string.
             */serialize:function serialize(nodes){return AjaxRequest._parseParams(this.serializeArray(nodes));},/**
             * Return a serialized array containing names and values of all form nodes.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The serialized array.
             */serializeArray:function serializeArray(nodes){var _this31=this;return this.parseNodes(nodes,{fragment:true,shadow:true}).reduce(function(values,node){if(Core.isElement(node)&&node.matches('form')||Core.isFragment(node)||Core.isShadow(node)){return values.concat(_this31.serializeArray(node.querySelectorAll('input, select, textarea')));}if(Core.isElement(node)&&node.matches('[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')){return values;}var name=node.getAttribute('name');if(!name){return values;}if(Core.isElement(node)&&node.matches('select[multiple]')){var _iterator83=_createForOfIteratorHelper(node.selectedOptions),_step83;try{for(_iterator83.s();!(_step83=_iterator83.n()).done;){var option=_step83.value;values.push({name:name,value:option.value||''});}}catch(err){_iterator83.e(err);}finally{_iterator83.f();}}else{values.push({name:name,value:node.value||''});}return values;},[]);},/**
             * Sort nodes by their position in the document.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The sorted array of nodes.
             */sort:function sort(nodes){nodes=this.parseNodes(nodes,{node:true,fragment:true,shadow:true,document:true,window:true});return nodes.sort(function(node,other){if(Core.isWindow(node)){return 1;}if(Core.isWindow(other)){return-1;}if(Core.isDocument(node)){return 1;}if(Core.isDocument(other)){return-1;}if(Core.isFragment(other)){return 1;}if(Core.isFragment(node)){return-1;}if(Core.isShadow(node)){node=node.host;}if(Core.isShadow(other)){other=other.host;}if(node.isSameNode(other)){return 0;}var pos=node.compareDocumentPosition(other);if(pos&Node.DOCUMENT_POSITION_FOLLOWING||pos&Node.DOCUMENT_POSITION_CONTAINED_BY){return-1;}if(pos&Node.DOCUMENT_POSITION_PRECEDING||pos&Node.DOCUMENT_POSITION_CONTAINS){return 1;}return 0;});},/**
             * Return the tag name (lowercase) of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {string} The nodes tag name (lowercase).
             */tagName:function tagName(nodes){var node=this.parseNode(nodes);if(!node){return;}return node.tagName.toLowerCase();}});/**
         * DOM (Static) AJAX
         */Object.assign(DOM,{/**
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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */ajax:function ajax(options){return new AjaxRequest(options);},/**
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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */"delete":function _delete(url,options){return new AjaxRequest(_objectSpread({url:url,method:'DELETE'},options));},/**
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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */get:function get(url,data,options){return new AjaxRequest(_objectSpread({url:url,data:data},options));},/**
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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */patch:function patch(url,data,options){return new AjaxRequest(_objectSpread({url:url,data:data,method:'PATCH'},options));},/**
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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */post:function post(url,data,options){return new AjaxRequest(_objectSpread({url:url,data:data,method:'POST'},options));},/**
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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */put:function put(url,data,options){return new AjaxRequest(_objectSpread({url:url,data:data,method:'PUT'},options));}});/**
         * DOM (Static) Queue
         */Object.assign(DOM,{/**
             * Clear the queue of a single node.
             * @param {HTMLElement} node The input node.
             */_clearQueue:function _clearQueue(node){if(!this._queues.has(node)){return;}this._queues["delete"](node);},/**
             * Run the next callback for a single node.
             * @param {HTMLElement} node The input node.
             */_dequeueNode:function _dequeueNode(node){var _this32=this;if(!this._queues.has(node)){return;}var next=this._queues.get(node).shift();if(!next){this._queues["delete"](node);return;}Promise.resolve(next(node)).then(function(_){return _this32._dequeueNode(node);})["catch"](function(_){return _this32._clearQueue(node);});},/**
             * Queue a callback on a single node.
             * @param {HTMLElement} node The input node.
             * @param {DOM~queueCallback} callback The callback to queue.
             */_queue:function _queue(node,callback){var newQueue=!this._queues.has(node);if(newQueue){this._queues.set(node,[function(_){return new Promise(function(resolve){return setTimeout(resolve,0);});}]);}this._queues.get(node).push(callback);if(newQueue){this._dequeueNode(node);}}});/**
         * DOM (Static) Attributes
         */Object.assign(DOM,{/**
             * Get attribute value(s) for a single node.
             * @param {HTMLElement} node The input node.
             * @returns {object} An object containing attributes.
             */_getAttributes:function _getAttributes(node){var attributes={};var _iterator84=_createForOfIteratorHelper(node.attributes),_step84;try{for(_iterator84.s();!(_step84=_iterator84.n()).done;){var attr=_step84.value;attributes[attr.nodeName]=attr.nodeValue;}}catch(err){_iterator84.e(err);}finally{_iterator84.f();}return attributes;},/**
             * Set an attribute value for a single node.
             * @param {HTMLElement} node The input node.
             * @param {object} attributes An object containing attributes.
             */_setAttributes:function _setAttributes(node,attributes){for(var key in attributes){node.setAttribute(key,attributes[key]);}},/**
             * Set dataset values for a single node.
             * @param {HTMLElement} node The input node.
             * @param {object} dataset An object containing dataset values.
             */_setDataset:function _setDataset(node,dataset){for(var key in dataset){var realKey=Core.camelCase(key);node.dataset[realKey]=dataset[key];}}});/**
         * DOM (Static) Data
         */Object.assign(DOM,{/**
             * Clone custom data from a single node to each other node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} other The other node.
             */_cloneData:function _cloneData(node,other){if(!this._data.has(node)){return;}this._setData(other,_objectSpread({},this._data.get(node)));},/**
             * Get custom data for a single node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {string} [key] The data key.
             * @returns {*} The data value.
             */_getData:function _getData(node,key){if(!this._data.has(node)){return;}if(!key){return this._data.get(node);}return this._data.get(node)[key];},/**
             * Remove custom data from a single node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {string} [key] The data key.
             */_removeData:function _removeData(node,key){if(!this._data.has(node)){return;}if(key){var data=this._data.get(node);delete data[key];if(Object.keys(data).length){return;}}this._data["delete"](node);},/**
             * Set custom data for a single node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {object} data An object containing data.
             */_setData:function _setData(node,data){if(!this._data.has(node)){this._data.set(node,{});}Object.assign(this._data.get(node),data);}});/**
         * DOM (Static) Position
         */Object.assign(DOM,{/**
             * Get the computed bounding rectangle of a single node.
             * @param {HTMLElement} node The input node.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {DOMRect} The computed bounding rectangle.
             */_rect:function _rect(node,offset){return this._forceShow(node,function(node){var result=node.getBoundingClientRect();if(offset){result.x+=window.scrollX;result.y+=window.scrollY;}return result;});}});/**
         * DOM (Static) Size
         */Object.assign(DOM,{/**
             * Get the computed height of a single node.
             * @param {HTMLElement} node The input node.
             * @param {number} [innerOuter=1] Whether to include padding, border and margin heights.
             * @returns {number} The height.
             */_height:function _height(node){var _this33=this;var innerOuter=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;return this._forceShow(node,function(node){if(Core.isDocument(node)){node=node.documentElement;}var result=node.clientHeight;if(innerOuter===_this33.INNER){result-=parseInt(_this33._css(node,'padding-top'))+parseInt(_this33._css(node,'padding-bottom'));}if(innerOuter>=_this33.OUTER){result+=parseInt(_this33._css(node,'border-top-width'))+parseInt(_this33._css(node,'border-bottom-width'));}if(innerOuter===_this33.OUTER_MARGIN){result+=parseInt(_this33._css(node,'margin-top'))+parseInt(_this33._css(node,'margin-bottom'));}return result;});},/**
             * Get the computed width of a single node.
             * @param {HTMLElement} node The input node.
             * @param {number} [innerOuter] Whether to include padding, border and margin widths.
             * @returns {number} The width.
             */_width:function _width(node){var _this34=this;var innerOuter=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;return this._forceShow(node,function(node){if(Core.isDocument(node)){node=node.documentElement;}var result=node.clientWidth;if(innerOuter===_this34.INNER){result-=parseInt(_this34._css(node,'padding-left'))+parseInt(_this34._css(node,'padding-right'));}if(innerOuter>=_this34.OUTER){result+=parseInt(_this34._css(node,'border-left-width'))+parseInt(_this34._css(node,'border-right-width'));}if(innerOuter===_this34.OUTER_MARGIN){result+=parseInt(_this34._css(node,'margin-left'))+parseInt(_this34._css(node,'margin-right'));}return result;});}});/**
         * DOM (Static) Styles
         */Object.assign(DOM,{/**
             * Get computed CSS style value(s) for a single node.
             * @param {HTMLElement} node The input node.
             * @param {string} [style] The CSS style name.
             * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
             */_css:function _css(node,style){if(!this._styles.has(node)){this._styles.set(node,window.getComputedStyle(node));}if(!style){return _objectSpread({},this._styles.get(node));}style=Core.kebabCase(style);return this._styles.get(node).getPropertyValue(style);},/**
             * Set style properties for a single node.
             * @param {HTMLElement} node The input node.
             * @param {object} styles An object containing styles.
             * @param {Boolean} [important] Whether the style should be !important.
             */_setStyles:function _setStyles(node,styles,important){for(var style in styles){var value=styles[style];style=Core.kebabCase(style);// if value is numeric and not a number property, add px
if(value&&Core.isNumeric(value)&&!this.cssNumberProperties.includes(style)){value+='px';}node.style.setProperty(style,value,important?'important':'');}}});/**
         * DOM (Static) Event Factory
         */Object.assign(DOM,{/**
             * Return a wrapped event callback that executes on a delegate selector.
             * @param {HTMLElement|ShadowRoot|Document} node The input node.
             * @param {string} selector The delegate query selector.
             * @param {function} callback The event callback.
             * @returns {DOM~eventCallback} The delegated event callback.
             */_delegateFactory:function _delegateFactory(node,selector,callback){var getDelegate=selector.match(this._complexRegExp)?this._getDelegateContainsFactory(node,selector):this._getDelegateMatchFactory(node,selector);return function(e){if(node.isSameNode(e.target)){return;}var delegate=getDelegate(e.target);if(!delegate){return;}var event={};var _loop=function _loop(key){event[key]=Core.isFunction(e[key])?function(){return e[key].apply(e,arguments);}:e[key];};for(var key in e){_loop(key);}event.currentTarget=delegate;event.delegateTarget=node;event.originalEvent=e;Object.freeze(event);return callback(event);};},/**
             * Return a function for matching a delegate target to a custom selector.
             * @param {HTMLElement|ShadowRoot|Document} node The input node.
             * @param {string} selector The delegate query selector.
             * @returns {DOM~delegateCallback} The callback for finding the matching delegate.
             */_getDelegateContainsFactory:function _getDelegateContainsFactory(node,selector){var _this35=this;selector=this._prefixSelectors(selector,':scope ');return function(target){var matches=Core.wrap(node.querySelectorAll(selector));if(!matches.length){return false;}if(matches.includes(target)){return target;}return _this35._parents(target,function(parent){return matches.includes(parent);},function(parent){return parent.isSameNode(node);},true).shift();};},/**
             * Return a function for matching a delegate target to a standard selector.
             * @param {HTMLElement|ShadowRoot|Document} node The input node.
             * @param {string} selector The delegate query selector.
             * @returns {DOM~delegateCallback} The callback for finding the matching delegate.
             */_getDelegateMatchFactory:function _getDelegateMatchFactory(node,selector){var _this36=this;return function(target){return target.matches(selector)?target:_this36._parents(target,function(parent){return parent.matches(selector);},function(parent){return parent.isSameNode(node);},true).shift();};},/**
             * Return a wrapped event callback that checks for a namespace match.
             * @param {string} event The namespaced event name.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {DOM~eventCallback} The wrapped event callback.
             */_namespaceFactory:function _namespaceFactory(event,callback){return function(e){if('namespaceRegExp'in e&&!e.namespaceRegExp.test(event)){return;}return callback(e);};},/**
             * Return a wrapped event callback that checks for a return false for preventing default.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {DOM~eventCallback} The wrapped event callback.
             */_preventFactory:function _preventFactory(callback){return function(e){if(callback(e)===false){e.preventDefault();}};},/**
             * Return a wrapped event callback that removes itself after execution.
             * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
             * @param {string} events The event names.
             * @param {string} delegate The delegate selector.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {DOM~eventCallback} The wrapped event callback.
             */_selfDestructFactory:function _selfDestructFactory(node,events,delegate,callback){var _this37=this;return function(e){_this37._removeEvent(node,events,callback,delegate);return callback(e);};}});/**
         * DOM (Static) Event Handlers
         */Object.assign(DOM,{/**
             * Add an event to a single node.
             * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
             * @param {string} event The event name.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @param {string} [delegate] The delegate selector.
             * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
             */_addEvent:function _addEvent(node,event,callback,delegate,selfDestruct){if(!this._events.has(node)){this._events.set(node,{});}var nodeEvents=this._events.get(node),eventData={delegate:delegate,callback:callback,selfDestruct:selfDestruct},realEvent=this._parseEvent(event);var realCallback=callback;if(selfDestruct){realCallback=this._selfDestructFactory(node,event,delegate,realCallback);}realCallback=this._preventFactory(realCallback);if(delegate){realCallback=this._delegateFactory(node,delegate,realCallback);}realCallback=this._namespaceFactory(event,realCallback);eventData.realCallback=realCallback;eventData.event=event;eventData.realEvent=realEvent;if(!nodeEvents[realEvent]){nodeEvents[realEvent]=[];}nodeEvents[realEvent].push(eventData);node.addEventListener(realEvent,realCallback);},/**
             * Clone all events from a single node to other nodes.
             * @param {HTMLElement|ShadowRoot|Document|Window} nodes The input node.
             * @param {HTMLElement|ShadowRoot|Document|Window} other The other node.
             */_cloneEvents:function _cloneEvents(node,other){if(!this._events.has(node)){return;}var nodeEvents=this._events.get(node);for(var event in nodeEvents){var _iterator85=_createForOfIteratorHelper(nodeEvents[event]),_step85;try{for(_iterator85.s();!(_step85=_iterator85.n()).done;){var eventData=_step85.value;this._addEvent(other,eventData.event,eventData.callback,eventData.delegate,eventData.selfDestruct);}}catch(err){_iterator85.e(err);}finally{_iterator85.f();}}},/**
             * Remove an event from a single node.
             * @param {HTMLElement|ShadowRoot|Document|Window} nodes The input node.
             * @param {string} [event] The event name.
             * @param {DOM~eventCallback} [callback] The callback to remove.
             * @param {string} [delegate] The delegate selector.
             */_removeEvent:function _removeEvent(node,event,callback,delegate){var _this38=this;if(!this._events.has(node)){return;}var nodeEvents=this._events.get(node);if(!event){var realEvents=Object.keys(nodeEvents);for(var _i3=0,_realEvents=realEvents;_i3<_realEvents.length;_i3++){var _realEvent=_realEvents[_i3];this._removeEvent(node,_realEvent,callback,delegate);}return;}var realEvent=this._parseEvent(event);if(!nodeEvents[realEvent]){return;}nodeEvents[realEvent]=nodeEvents[realEvent].filter(function(eventData){if(delegate&&delegate!==eventData.delegate||callback&&callback!==eventData.callback){return true;}if(realEvent!==event){var regExp=_this38._eventNamespacedRegExp(event);if(!eventData.event.match(regExp)){return true;}}node.removeEventListener(eventData.realEvent,eventData.realCallback);return false;});if(!nodeEvents[realEvent].length){delete nodeEvents[realEvent];}if(Object.keys(nodeEvents).length){return;}this._events["delete"](node);},/**
             * Trigger an event on a single node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {string} event The event name.
             * @param {object} [options] The options to use for the Event.
             * @param {*} [options.detail] Additional data to attach to the event.
             * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
             * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
             * @returns {Boolean} FALSE if the event was cancelled, otherwise TRUE.
             */_triggerEvent:function _triggerEvent(node,event,options){var realEvent=this._parseEvent(event);var eventData=new CustomEvent(realEvent,_objectSpread({bubbles:true,cancelable:true},options));if(realEvent!==event){eventData.namespace=event.substring(realEvent.length+1);eventData.namespaceRegExp=this._eventNamespacedRegExp(event);}return node.dispatchEvent(eventData);}});/**
         * DOM (Static) Helpers
         */Object.assign(DOM,{/**
             * Return a RegExp for testing a namespaced event.
             * @param {string} event The namespaced event.
             * @returns {RegExp} The namespaced event RegExp.
             */_eventNamespacedRegExp:function _eventNamespacedRegExp(event){return new RegExp("^".concat(Core.escapeRegExp(event),"(?:\\.|$)"),'i');},/**
             * Return a single dimensional array of classes (from a multi-dimensional array or space-separated strings).
             * @param {array} classList The classes to parse.
             * @returns {string[]} The parsed classes.
             */_parseClasses:function _parseClasses(classList){return classList.flat().flatMap(function(val){return val.split(' ');});},/**
             * Return a data object from a key and value, or a data object.
             * @param {string|object} key The data key, or an object containing data.
             * @param {*} [value] The data value.
             * @param {Boolean} [json=false] Whether to JSON encode the values.
             * @returns {object} The data object.
             */_parseData:function _parseData(key,value){var json=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var obj=Core.isObject(key)?key:_defineProperty({},key,value);var result={};for(var k in obj){var v=obj[k];result[k]=json&&(Core.isObject(v)||Core.isArray(v))?JSON.stringify(v):v;}return result;},/**
             * Return a JS primitive from a dataset string.
             * @param {string} value The input value.
             * @return {*} The parsed value.
             */_parseDataset:function _parseDataset(value){if(Core.isUndefined(value)){return value;}var lower=value.toLowerCase().trim();if(['true','on'].includes(lower)){return true;}if(['false','off'].includes(lower)){return false;}if(lower==='null'){return null;}if(Core.isNumeric(lower)){return parseFloat(lower);}if(['{','['].includes(lower.charAt(0))){try{var result=JSON.parse(value);return result;}catch(e){}}return value;},/**
             * Return a "real" event from a namespaced event.
             * @param {string} event The namespaced event.
             * @returns {string} The real event.
             */_parseEvent:function _parseEvent(event){return event.split('.').shift();},/**
             * Return an array of events from a space-separated string.
             * @param {string} events The events.
             * @returns {array} The parsed events.
             */_parseEvents:function _parseEvents(events){return events.split(' ');},/**
             * Return a prefixed selector string.
             * @param {string} selectors The input selectors.
             * @param {string} prefix The input prefix.
             * @returns {string} The prefixed selector.
             */_prefixSelectors:function _prefixSelectors(selectors,prefix){var _this39=this;return selectors.split(this._splitRegExp).filter(function(selector){return!!selector;}).map(function(selector){return _this39._customSelectors.includes(selector.trim().charAt(0))?"".concat(prefix," ").concat(selector):selector;}).join(', ');}});/**
         * DOM (Static) Manipulation
         */Object.assign(DOM,{/**
             * Clone a single node.
             * @param {Node|HTMLElement|DocumentFragment} node The input node.
             * @param {object} options Options for cloning the node.
             * @param {Boolean} [options.deep] Whether to also clone all descendent nodes.
             * @param {Boolean} [options.events] Whether to also clone events.
             * @param {Boolean} [options.data] Whether to also clone custom data.
             * @param {Boolean} [options.animations] Whether to also clone animations.
             * @returns {Node|HTMLElement|DocumentFragment} The cloned node.
             */_clone:function _clone(node,options){var clone=node.cloneNode(options.deep);if(options.events){this._cloneEvents(node,clone);}if(options.data){this._cloneData(node,clone);}if(options.animations){Animation.clone(node,clone);}if(options.deep){this._deepClone(node,clone,options);}return clone;},/**
             * Deep clone a node.
             * @param {Node|HTMLElement|DocumentFragment} node The input node.
             * @param {Node|HTMLElement|DocumentFragment} clone The cloned node.
             * @param {object} options Options for cloning the node.
             * @param {Boolean} [options.events] Whether to also clone events.
             * @param {Boolean} [options.data] Whether to also clone custom data.
             * @param {Boolean} [options.animations] Whether to also clone animations.
             */_deepClone:function _deepClone(node,clone,options){for(var i=0;i<node.childNodes.length;i++){var child=node.childNodes.item(i);var childClone=clone.childNodes.item(i);if(options.events){this._cloneEvents(child,childClone);}if(options.data){this._cloneData(child,childClone);}if(options.animations){Animation.clone(child,childClone);}this._deepClone(child,childClone,options);}},/**
             * Remove all children of a single node from the DOM.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
             */_empty:function _empty(node){// Remove descendent elements
var children=Core.wrap(node.childNodes);var _iterator86=_createForOfIteratorHelper(children),_step86;try{for(_iterator86.s();!(_step86=_iterator86.n()).done;){var child=_step86.value;this._remove(child);node.removeChild(child);}// Remove ShadowRoot
}catch(err){_iterator86.e(err);}finally{_iterator86.f();}if(node.shadowRoot){this._remove(node.shadowRoot);}// Remove DocumentFragment
if(node.content){this._remove(node.content);}},/**
             * Remove a single node from the DOM.
             * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
             */_remove:function _remove(node){var eventData=new Event('remove');node.dispatchEvent(eventData);this._empty(node);if(Core.isElement(node)){this._clearQueue(node);Animation.stop(node);if(this._styles.has(node)){this._styles["delete"](node);}}this._removeEvent(node);this._removeData(node);}});/**
         * DOM (Static) Parsing
         */Object.assign(DOM,{/**
             * Create a Document object from a HTML string.
             * @param {string} html The HTML input string.
             * @returns {Document} A new Document object.
             */parseHTML:function parseHTML(html){return new DOMParser().parseFromString(html,'text/html');},/**
             * Create a Document object from an XML string.
             * @param {string} xml The XML input string.
             * @returns {Document} A new Document object.
             */parseXML:function parseXML(xml){return new DOMParser().parseFromString(xml,'application/xml');}});/**
         * DOM (Static) Find
         */Object.assign(DOM,{/**
             * Return all nodes matching a standard CSS selector.
             * @param {string} selector The query selector.
             * @param {array} nodes The input nodes.
             * @returns {array} The matching nodes.
             */_findBySelector:function _findBySelector(selector,nodes){var results=[];var _iterator87=_createForOfIteratorHelper(nodes),_step87;try{for(_iterator87.s();!(_step87=_iterator87.n()).done;){var node=_step87.value;Core.merge(results,node.querySelectorAll(selector));}}catch(err){_iterator87.e(err);}finally{_iterator87.f();}return nodes.length>1&&results.length>1?Core.unique(results):results;},/**
             * Return a single node matching a standard CSS selector.
             * @param {string} selector The query selector.
             * @param {array} nodes The input nodes.
             * @returns {HTMLElement} The matching node.
             */_findOneBySelector:function _findOneBySelector(selector,nodes){var _iterator88=_createForOfIteratorHelper(nodes),_step88;try{for(_iterator88.s();!(_step88=_iterator88.n()).done;){var node=_step88.value;var result=node.querySelector(selector);if(result){return result;}}}catch(err){_iterator88.e(err);}finally{_iterator88.f();}return null;}});/**
         * DOM (Static) Traversal
         */Object.assign(DOM,{/**
             * Return all children of a single node (optionally matching a filter).
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
             * @returns {array} The matching nodes.
             */_children:function _children(node,filter){var first=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var elementsOnly=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;var children=elementsOnly?node.children:node.childNodes;var results=[];var child;var _iterator89=_createForOfIteratorHelper(children),_step89;try{for(_iterator89.s();!(_step89=_iterator89.n()).done;){child=_step89.value;if(filter&&!filter(child)){continue;}results.push(child);if(first){break;}}}catch(err){_iterator89.e(err);}finally{_iterator89.f();}return results;},/**
             * Return the deepest child node for a single node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
             * @returns {HTMLElement} The deepest node.
             */_deepest:function _deepest(node){return Core.wrap(node.querySelectorAll('*')).find(function(node){return!node.childElementCount;})||node;},/**
             * Return the next sibling for a single node (optionally matching a filter).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @returns {array} The matching nodes.
             */_next:function _next(node,filter){var results=[];while(node=node.nextSibling){if(!Core.isElement(node)){continue;}if(!filter||filter(node)){results.push(node);}break;}return results;},/**
             * Return all next siblings for a single node (optionally matching a filter, and before a limit).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @param {DOM~filterCallback} [limit] The limit function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */_nextAll:function _nextAll(node,filter,limit){var first=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;var results=[];while(node=node.nextSibling){if(!Core.isElement(node)){continue;}if(limit&&limit(node)){break;}if(filter&&!filter(node)){continue;}results.push(node);if(first){break;}}return results;},/**
             * Return the parent of a single node (optionally matching a filter).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @returns {array} The matching nodes.
             */_parent:function _parent(node,filter){var results=[];var parent=node.parentNode;if(!parent){return results;}if(filter&&!filter(parent)){return results;}results.push(parent);return results;},/**
             * Return all parents of a single node (optionally matching a filter, and before a limit).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @param {DOM~filterCallback} [limit] The limit function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */_parents:function _parents(node,filter,limit){var first=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;var results=[];while(node=node.parentNode){if(Core.isDocument(node)){break;}if(limit&&limit(node)){break;}if(filter&&!filter(node)){continue;}results.unshift(node);if(first){break;}}return results;},/**
             * Return the previous sibling for a single node (optionally matching a filter).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @returns {array} The matching nodes.
             */_prev:function _prev(node,filter){var results=[];while(node=node.previousSibling){if(!Core.isElement(node)){continue;}if(!filter||filter(node)){results.push(node);}break;}return results;},/**
             * Return all previous siblings for a single node (optionally matching a filter, and before a limit).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @param {DOM~filterCallback} [limit] The limit function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */_prevAll:function _prevAll(node,filter,limit){var first=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;var results=[];while(node=node.previousSibling){if(!Core.isElement(node)){continue;}if(limit&&limit(node)){break;}if(filter&&!filter(node)){continue;}results.unshift(node);if(first){break;}}return results;},/**
             * Return all siblings for a single node (optionally matching a filter).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
             * @returns {array} The matching nodes.
             */_siblings:function _siblings(node,filter){var elementsOnly=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;var results=[];var parent=node.parentNode;if(!parent){return results;}var siblings=elementsOnly?parent.children:parent.childNodes;var sibling;var _iterator90=_createForOfIteratorHelper(siblings),_step90;try{for(_iterator90.s();!(_step90=_iterator90.n()).done;){sibling=_step90.value;if(node.isSameNode(sibling)){continue;}if(filter&&!filter(sibling)){continue;}results.push(sibling);}}catch(err){_iterator90.e(err);}finally{_iterator90.f();}return results;}});/**
         * DOM (Static) Filters
         */Object.assign(DOM,{/**
             * Return a function for filtering nodes.
             * @param {object} [options] The options for filtering.
             * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
             * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
             * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
             * @param {Boolean} [options.document=false] Whether to allow Document.
             * @param {Boolean} [options.window=false] Whether to allow Window.
             * @returns {DOM~nodeCallback} The node filter function.
             */parseNodesFactory:function parseNodesFactory(options){return options?function(node){return(options.node?Core.isNode(node):Core.isElement(node))||options.fragment&&Core.isFragment(node)||options.shadow&&Core.isShadow(node)||options.document&&Core.isDocument(node)||options.window&&Core.isWindow(node);}:Core.isElement;}});/**
         * DOM (Static) Tests
         */Object.assign(DOM,{/**
             * Returns true if a single node has a CSS animation.
             * @param {HTMLElement} node The input node.
             * @returns {Boolean} TRUE if the node has a CSS animation, otherwise FALSE.
             */_hasCSSAnimation:function _hasCSSAnimation(node){return!!parseFloat(this._css(node,'animation-duration'));},/**
             * Returns true if a single node has a CSS transition.
             * @param {HTMLElement} node The input node.
             * @returns {Boolean} TRUE if the node has a CSS transition, otherwise FALSE.
             */_hasCSSTransition:function _hasCSSTransition(node){return!!parseFloat(this._css(node,'transition-duration'));},/**
             * Returns true if a single node has custom data.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {string} [key] The data key.
             * @returns {Boolean} TRUE if the node has custom data, otherwise FALSE.
             */_hasData:function _hasData(node,key){return this._data.has(node)&&(!key||this._data.get(node).hasOwnProperty(key));},/**
             * Returns true if a single node is visible.
             * @param {HTMLElement|Document|Window} node The input node.
             * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
             */_isVisible:function _isVisible(node){if(Core.isWindow(node)){return node.document.visibilityState==='visible';}if(Core.isDocument(node)){return node.visibilityState==='visible';}return!!node.offsetParent;}});/**
         * DOM (Static) Utility
         */Object.assign(DOM,{/**
             * Force a single node to be shown, and then execute a callback.
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~nodeCallback} callback The callback to execute.
             * @returns {*} The result of the callback.
             */_forceShow:function _forceShow(node,callback){var _this40=this;if(this._isVisible(node)){return callback(node);}var elements=[];if(Core.isElement(node)&&this._css(node,'display')==='none'){elements.push(node);}Core.merge(elements,this._parents(node,function(parent){return Core.isElement(parent)&&_this40._css(parent,'display')==='none';}));var hidden=new Map();for(var _i4=0,_elements=elements;_i4<_elements.length;_i4++){var element=_elements[_i4];hidden.set(element,element.getAttribute('style'));element.style.setProperty('display','initial','important');}var result=callback(node);var _iterator91=_createForOfIteratorHelper(hidden),_step91;try{for(_iterator91.s();!(_step91=_iterator91.n()).done;){var _step91$value=_slicedToArray(_step91.value,2),_element=_step91$value[0],style=_step91$value[1];if(style){_element.setAttribute('style',style);}else{// force DOM to update
_element.getAttribute('style');_element.removeAttribute('style');}}}catch(err){_iterator91.e(err);}finally{_iterator91.f();}return result;},/**
             * Sanitize a single node.
             * @param {HTMLElement} node The input node.
             * @param {HTMLElement} parent The parent node.
             * @param {object} [allowedTags] An object containing allowed tags and attributes.
             */_sanitize:function _sanitize(node,parent){var allowedTags=arguments.length>2&&arguments[2]!==undefined?arguments[2]:this.allowedTags;// check node
var name=node.tagName.toLowerCase();if(!(name in allowedTags)){parent.removeChild(node);return;}// check node attributes
var allowedAttributes=[];if('*'in allowedTags&&allowedTags['*'].length){allowedAttributes.push.apply(allowedAttributes,_toConsumableArray(allowedTags['*']));}if(allowedTags[name].length){allowedAttributes.push.apply(allowedAttributes,_toConsumableArray(allowedTags[name]));}var attributes=this._getAttributes(node);var _loop2=function _loop2(attribute){var valid=!!allowedAttributes.find(function(test){return attribute.match(test);});if(!valid){node.removeAttribute(attribute);}};for(var attribute in attributes){_loop2(attribute);}// check children
var children=this._children(node,null,false,true);var _iterator92=_createForOfIteratorHelper(children),_step92;try{for(_iterator92.s();!(_step92=_iterator92.n()).done;){var child=_step92.value;this._sanitize(child,node,allowedTags);}}catch(err){_iterator92.e(err);}finally{_iterator92.f();}}});/**
         * DOM (Static) Properties
         */ /**
         * @callback DOM~animationCallback
         * @param {HTMLElement} node The input node.
         * @param {number} progress The animation progress.
         * @param {object} options The options to use for animating.
         */ /**
         * @callback DOM~delegateCallback
         * @param {HTMLElement} node The input node.
         */ /**
         * @callback DOM~eventCallback
         * @param {Event} event The event object.
         */ /**
         * @callback DOM~nodeCallback
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         */ /**
         * @callback DOM~queueCallback
         * @param {HTMLElement} node The input node.
         */Object.assign(DOM,{_queues:new WeakMap(),_data:new WeakMap(),_events:new WeakMap(),_styles:new WeakMap(),// Default allowed tags/attributes for sanitizer
allowedTags:{'*':['class','dir','id','lang','role',/^aria-[\w-]*$/i],a:['target','href','title','rel'],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:['src','alt','title','width','height'],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},// CSS properties that can have number-only values
cssNumberProperties:['font-weight','line-height','opacity','orphans','scale','widows','z-index'],INNER:0,OUTER:2,OUTER_MARGIN:3,// Complex selector RegExp
_complexRegExp:/(?:^\s*[\>\+\~]|\,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*[\>\+\~])/,// Custom selectors
_customSelectors:['>','+','~'],// Fast selector RegExp
_fastRegExp:/^([\#\.]?)([\w\-]+)$/,// Comma seperated selector RegExp
_splitRegExp:/\,(?=(?:(?:[^"]*"){2})*[^"]*$)\s*/});/**
         * QuerySet Class
         * @class
         */var QuerySet=/*#__PURE__*/function(){/**
             * New DOM constructor.
             * @param {array} nodes The input nodes.
             * @param {DOM} [context=dom] The DOM context.
             * @returns {QuerySet} A new QuerySet object.
             */function QuerySet(nodes){var context=arguments.length>1&&arguments[1]!==undefined?arguments[1]:dom;_classCallCheck(this,QuerySet);this._dom=context;this._nodes=nodes;}_createClass(QuerySet,[{key:"pushNode",/**
             * Push a single node to the stack.
             * @param {Node|DocumentFragment|ShadowRoot|Document|Window} [node] The node to push.
             * @returns {QuerySet} The QuerySet object.
             */value:function pushNode(node){return this.pushStack([node].filter(function(v){return v;}));}/**
             * Push a new set of nodes to the stack.
             * @param {array} nodes The nodes to push.
             * @returns {QuerySet} The QuerySet object.
             */},{key:"pushStack",value:function pushStack(nodes){this._nodes=nodes;return this;}},{key:"length",get:function get(){return this._nodes.length;}}]);return QuerySet;}();/**
         * QuerySetImmutable Class
         * @class
         */var QuerySetImmutable=/*#__PURE__*/function(_QuerySet){_inherits(QuerySetImmutable,_QuerySet);var _super=_createSuper(QuerySetImmutable);function QuerySetImmutable(){_classCallCheck(this,QuerySetImmutable);return _super.apply(this,arguments);}_createClass(QuerySetImmutable,[{key:"pushStack",/**
             * Push a new set of nodes to the stack.
             * @param {array} nodes The nodes to push.
             * @returns {QuerySet} The QuerySet object.
             */value:function pushStack(nodes){return new QuerySetImmutable(nodes);}}]);return QuerySetImmutable;}(QuerySet);/**
         * QuerySet Animate
         */Object.assign(QuerySet.prototype,{/**
             * Add an animation to the queue for each node.
             * @param {DOM~animationCallback} callback The animation callback.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */animate:function animate(callback,options){var _this41=this;return this.queue(function(node){return _this41._dom.animate(node,callback,options);});},/**
             * Stop all animations and clear the queue of each node.
             * @param {Boolean} [finish=true] Whether to complete all current animations.
             * @returns {QuerySet} The QuerySet object.
             */stop:function stop(){var finish=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;this.clearQueue();this._dom.stop(this,finish);return this;}});/**
         * QuerySet Animations
         */Object.assign(QuerySet.prototype,{/**
             * Add a drop in animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=top] The direction to drop the node from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */dropIn:function dropIn(options){var _this42=this;return this.queue(function(node){return _this42._dom.dropIn(node,options);});},/**
             * Add a drop out animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=top] The direction to drop the node to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */dropOut:function dropOut(options){var _this43=this;return this.queue(function(node){return _this43._dom.dropOut(node,options);});},/**
             * Add a fade in animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */fadeIn:function fadeIn(options){var _this44=this;return this.queue(function(node){return _this44._dom.fadeIn(node,options);});},/**
             * Add a fade out animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */fadeOut:function fadeOut(options){var _this45=this;return this.queue(function(node){return _this45._dom.fadeOut(node,options);});},/**
             * Add a rotate in animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.x=0] The amount to rotate on the X-axis.
             * @param {number} [options.y=1] The amount to rotate on the Y-axis.
             * @param {number} [options.z=0] The amount to rotate on the Z-axis.
             * @param {Boolean} [options.inverse] Whether to invert the rotation.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */rotateIn:function rotateIn(options){var _this46=this;return this.queue(function(node){return _this46._dom.rotateIn(node,options);});},/**
             * Add a rotate out animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.x=0] The amount to rotate on the X-axis.
             * @param {number} [options.y=1] The amount to rotate on the Y-axis.
             * @param {number} [options.z=0] The amount to rotate on the Z-axis.
             * @param {Boolean} [options.inverse] Whether to invert the rotation.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */rotateOut:function rotateOut(options){var _this47=this;return this.queue(function(node){return _this47._dom.rotateOut(node,options);});},/**
             * Add a slide in animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to slide from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */slideIn:function slideIn(options){var _this48=this;return this.queue(function(node){return _this48._dom.slideIn(node,options);});},/**
             * Add a slide out animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to slide to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */slideOut:function slideOut(options){var _this49=this;return this.queue(function(node){return _this49._dom.slideOut(node,options);});},/**
             * Add a squeeze in animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to squeeze from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */squeezeIn:function squeezeIn(options){var _this50=this;return this.queue(function(node){return _this50._dom.squeezeIn(node,options);});},/**
             * Add a squeeze out animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to squeeze to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */squeezeOut:function squeezeOut(options){var _this51=this;return this.queue(function(node){return _this51._dom.squeezeOut(node,options);});}});/**
         * QuerySet Queue
         */Object.assign(QuerySet.prototype,{/**
             * Clear the queue of each node.
             * @returns {QuerySet} The QuerySet object.
             */clearQueue:function clearQueue(){this._dom.clearQueue(this);return this;},/**
             * Delay execution of subsequent items in the queue for each node.
             * @param {number} duration The number of milliseconds to delay execution by.
             * @returns {QuerySet} The QuerySet object.
             */delay:function delay(duration){return this.queue(function(_){return new Promise(function(resolve){return setTimeout(resolve,duration);});});},/**
             * Queue a callback on each node.
             * @param {DOM~queueCallback} callback The callback to queue.
             * @returns {QuerySet} The QuerySet object.
             */queue:function queue(callback){this._dom.queue(this,callback);return this;}});/**
         * QuerySet Attributes
         */Object.assign(QuerySet.prototype,{/**
             * Get attribute value(s) for the first node.
             * @param {string} [attribute] The attribute name.
             * @returns {string} The attribute value.
             */getAttribute:function getAttribute(attribute){return this._dom.getAttribute(this,attribute);},/**
             * Get dataset value(s) for the first node.
             * @param {string} [key] The dataset key.
             * @returns {*} The dataset value, or an object containing the dataset.
             */getDataset:function getDataset(key){return this._dom.getDataset(this,key);},/**
             * Get the HTML contents of the first node.
             * @returns {string} The HTML contents.
             */getHTML:function getHTML(){return this._dom.getHTML(this);},/**
             * Get a property value for the first node.
             * @param {string} property The property name.
             * @returns {string} The property value.
             */getProperty:function getProperty(property){return this._dom.getProperty(this,property);},/**
             * Get the text contents of the first node.
             * @returns {string} The text contents.
             */getText:function getText(){return this._dom.getText(this);},/**
             * Get the value property of the first node.
             * @returns {string} The value.
             */getValue:function getValue(){return this._dom.getValue(this);},/**
             * Remove an attribute from each node.
             * @param {string} attribute The attribute name.
             * @returns {QuerySet} The QuerySet object.
             */removeAttribute:function removeAttribute(attribute){this._dom.removeAttribute(this,attribute);return this;},/**
             * Remove a dataset value from each node.
             * @param {string} key The dataset key.
             * @returns {QuerySet} The QuerySet object.
             */removeDataset:function removeDataset(key){this._dom.removeDataset(this,key);return this;},/**
             * Remove a property from each node.
             * @param {string} property The property name.
             * @returns {QuerySet} The QuerySet object.
             */removeProperty:function removeProperty(property){this._dom.removeProperty(this,property);return this;},/**
             * Set an attribute value for each node.
             * @param {string|object} attribute The attribute name, or an object containing attributes.
             * @param {string} [value] The attribute value.
             * @returns {QuerySet} The QuerySet object.
             */setAttribute:function setAttribute(attribute,value){this._dom.setAttribute(this,attribute,value);return this;},/**
             * Set a dataset value for each node.
             * @param {string|object} key The dataset key, or an object containing dataset values.
             * @param {*} [value] The dataset value.
             * @returns {QuerySet} The QuerySet object.
             */setDataset:function setDataset(key,value){this._dom.setDataset(this,key,value);return this;},/**
             * Set the HTML contents of each node.
             * @param {string} html The HTML contents.
             * @returns {QuerySet} The QuerySet object.
             */setHTML:function setHTML(html){this._dom.setHTML(this,html);return this;},/**
             * Set a property value for each node.
             * @param {string|object} property The property name, or an object containing properties.
             * @param {string} [value] The property value.
             * @returns {QuerySet} The QuerySet object.
             */setProperty:function setProperty(property,value){this._dom.setProperty(this,property,value);return this;},/**
             * Set the text contents of each node.
             * @param {string} text The text contents.
             * @returns {QuerySet} The QuerySet object.
             */setText:function setText(text){this._dom.setText(this,text);return this;},/**
             * Set the value property of each node.
             * @param {string} value The value.
             * @returns {QuerySet} The QuerySet object.
             */setValue:function setValue(value){this._dom.setValue(this,value);return this;}});/**
         * QuerySet Data
         */Object.assign(QuerySet.prototype,{/**
             * Clone custom data from each node to each other node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */cloneData:function cloneData(others){this._dom.cloneData(this,others);return this;},/**
             * Get custom data for the first node.
             * @param {string} [key] The data key.
             * @returns {*} The data value.
             */getData:function getData(key){return this._dom.getData(this,key);},/**
             * Remove custom data from each node.
             * @param {string} [key] The data key.
             * @returns {QuerySet} The QuerySet object.
             */removeData:function removeData(key){this._dom.removeData(this,key);return this;},/**
             * Set custom data for each node.
             * @param {string|object} key The data key, or an object containing data.
             * @param {*} [value] The data value.
             * @returns {QuerySet} The QuerySet object.
             */setData:function setData(key,value){this._dom.setData(this,key,value);return this;}});/**
         * QuerySet Position
         */Object.assign(QuerySet.prototype,{/**
             * Get the X,Y co-ordinates for the center of the first node.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {object} An object with the x and y co-ordinates.
             */center:function center(offset){return this._dom.center(this,offset);},/**
             * Contrain each node to a container node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} container The container node, or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */constrain:function constrain(container){this._dom.constrain(this,container);return this;},/**
             * Get the distance of a node to an X,Y position in the Window.
             * @param {number} x The X co-ordinate.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {number} The distance to the node.
             */distTo:function distTo(x,y,offset){return this._dom.distTo(this,x,y,offset);},/**
             * Get the distance between two nodes.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
             * @returns {number} The distance between the nodes.
             */distToNode:function distToNode(others){return this._dom.distToNode(this,others);},/**
             * Get the nearest node to an X,Y position in the Window.
             * @param {number} x The X co-ordinate.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {QuerySet} A new QuerySet object.
             */nearestTo:function nearestTo(x,y,offset){var node=this._dom.nearestTo(this,x,y,offset);return new this.constructor([node].filter(function(v){return v;}));},/**
             * Get the nearest node to another node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
             * @returns {QuerySet} A new QuerySet object.
             */nearestToNode:function nearestToNode(others){var node=this._dom.nearestToNode(this,others);return new this.constructor([node].filter(function(v){return v;}));},/**
             * Get the percentage of an X co-ordinate relative to a node's width.
             * @param {number} x The X co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
             * @returns {number} The percent.
             */percentX:function percentX(x,offset){var clamp=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;return this._dom.percentX(this,x,offset,clamp);},/**
             * Get the percentage of a Y co-ordinate relative to a node's height.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
             * @returns {number} The percent.
             */percentY:function percentY(y,offset){var clamp=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;return this._dom.percentY(this,y,offset,clamp);},/**
             * Get the position of the first node relative to the Window or Document.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {object} An object with the x and y co-ordinates.
             */position:function position(offset){return this._dom.position(this,offset);},/**
             * Get the computed bounding rectangle of the first node.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {DOMRect} The computed bounding rectangle.
             */rect:function rect(offset){return this._dom.rect(this,offset);}});/**
         * QuerySet Scroll
         */Object.assign(QuerySet.prototype,{/**
             * Get the scroll X position of the first node.
             * @returns {number} The scroll X position.
             */getScrollX:function getScrollX(){return this._dom.getScrollX(this);},/**
             * Get the scroll Y position of the first node.
             * @returns {number} The scroll Y position.
             */getScrollY:function getScrollY(){return this._dom.getScrollY(this);},/**
             * Scroll each node to an X,Y position.
             * @param {number} x The scroll X position.
             * @param {number} y The scroll Y position.
             * @returns {QuerySet} The QuerySet object.
             */setScroll:function setScroll(x,y){this._dom.setScroll(this,x,y);return this;},/**
             * Scroll each node to an X position.
             * @param {number} x The scroll X position.
             * @returns {QuerySet} The QuerySet object.
             */setScrollX:function setScrollX(x){this._dom.setScrollX(this,x);return this;},/**
             * Scroll each node to a Y position.
             * @param {number} y The scroll Y position.
             * @returns {QuerySet} The QuerySet object.
             */setScrollY:function setScrollY(y){this._dom.setScrollY(this,y);return this;}});/**
         * QuerySet Size
         */Object.assign(QuerySet.prototype,{/**
             * Get the computed height of the first node.
             * @param {number} [innerOuter] Whether to include padding, border and margin heights.
             * @returns {number} The height.
             */height:function height(innerOuter){return this._dom.height(this,innerOuter);},/**
             * Get the scroll height of the first node.
             * @returns {number} The scroll height.
             */scrollHeight:function scrollHeight(){return this._dom.scrollHeight(this);},/**
             * Get the scroll width of the first node.
             * @returns {number} The scroll width.
             */scrollWidth:function scrollWidth(){return this._dom.scrollWidth(this);},/**
             * Get the computed width of the first node.
             * @param {number} [innerOuter] Whether to include padding, border and margin heights.
             * @returns {number} The width.
             */width:function width(innerOuter){return this._dom.width(this,innerOuter);}});/**
         * QuerySet Styles
         */Object.assign(QuerySet.prototype,{/**
             * Add classes to each node.
             * @param {...string|string[]} classes The classes.
             * @returns {QuerySet} The QuerySet object.
             */addClass:function addClass(){var _this$_dom;for(var _len18=arguments.length,classes=new Array(_len18),_key18=0;_key18<_len18;_key18++){classes[_key18]=arguments[_key18];}(_this$_dom=this._dom).addClass.apply(_this$_dom,[this].concat(classes));return this;},/**
             * Get computed CSS style values for the first node.
             * @param {string} [style] The CSS style name.
             * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
             */css:function css(style){return this._dom.css(this,style);},/**
             * Get style properties for the first node.
             * @param {string} [style] The style name.
             * @returns {string|object} The style value, or an object containing the style properties.
             */getStyle:function getStyle(style){return this._dom.getStyle(this,style);},/**
             * Hide each node from display.
             * @returns {QuerySet} The QuerySet object.
             */hide:function hide(){this._dom.hide(this);return this;},/**
             * Remove classes from each node.
             * @param {...string|string[]} classes The classes.
             * @returns {QuerySet} The QuerySet object.
             */removeClass:function removeClass(){var _this$_dom2;for(var _len19=arguments.length,classes=new Array(_len19),_key19=0;_key19<_len19;_key19++){classes[_key19]=arguments[_key19];}(_this$_dom2=this._dom).removeClass.apply(_this$_dom2,[this].concat(classes));return this;},/**
             * Set style properties for each node.
             * @param {string|object} style The style name, or an object containing styles.
             * @param {string} [value] The style value.
             * @param {Boolean} [important] Whether the style should be !important.
             * @returns {QuerySet} The QuerySet object.
             */setStyle:function setStyle(style,value,important){this._dom.setStyle(this,style,value,important);return this;},/**
             * Display each hidden node.
             * @returns {QuerySet} The QuerySet object.
             */show:function show(){this._dom.show(this);return this;},/**
             * Toggle the visibility of each node.
             * @returns {QuerySet} The QuerySet object.
             */toggle:function toggle(){this._dom.toggle(this);return this;},/**
             * Toggle classes for each node.
             * @param {...string|string[]} classes The classes.
             * @returns {QuerySet} The QuerySet object.
             */toggleClass:function toggleClass(){var _this$_dom3;for(var _len20=arguments.length,classes=new Array(_len20),_key20=0;_key20<_len20;_key20++){classes[_key20]=arguments[_key20];}(_this$_dom3=this._dom).toggleClass.apply(_this$_dom3,[this].concat(classes));return this;}});/**
         * QuerySet Events
         */Object.assign(QuerySet.prototype,{/**
             * Trigger a blur event on the first node.
             * @returns {QuerySet} The QuerySet object.
             */blur:function blur(){this._dom.blur(this);return this;},/**
             * Trigger a click event on the first node.
             * @returns {QuerySet} The QuerySet object.
             */click:function click(){this._dom.click(this);return this;},/**
             * Trigger a focus event on the first node.
             * @returns {QuerySet} The QuerySet object.
             */focus:function focus(){this._dom.focus(this);return this;}});/**
         * QuerySet Event Handlers
         */Object.assign(QuerySet.prototype,{/**
             * Add an event to each node.
             * @param {string} events The event names.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {QuerySet} The QuerySet object.
             */addEvent:function addEvent(events,callback){this._dom.addEvent(this,events,callback);return this;},/**
             * Add a delegated event to each node.
             * @param {string} events The event names.
             * @param {string} delegate The delegate selector.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {QuerySet} The QuerySet object.
             */addEventDelegate:function addEventDelegate(events,delegate,callback){this._dom.addEventDelegate(this,events,delegate,callback);return this;},/**
             * Add a self-destructing delegated event to each node.
             * @param {string} events The event names.
             * @param {string} delegate The delegate selector.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {QuerySet} The QuerySet object.
             */addEventDelegateOnce:function addEventDelegateOnce(events,delegate,callback){this._dom.addEventDelegateOnce(this,events,delegate,callback);return this;},/**
             * Add a self-destructing event to each node.
             * @param {string} events The event names.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {QuerySet} The QuerySet object.
             */addEventOnce:function addEventOnce(events,callback){this._dom.addEventOnce(this,events,callback);return this;},/**
             * Clone all events from each node to other nodes.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */cloneEvents:function cloneEvents(others){this._dom.cloneEvents(this,others);return this;},/**
             * Remove events from each node.
             * @param {string} [events] The event names.
             * @param {DOM~eventCallback} [callback] The callback to remove.
             * @returns {QuerySet} The QuerySet object.
             */removeEvent:function removeEvent(events,callback){this._dom.removeEvent(this,events,callback);return this;},/**
             * Remove delegated events from each node.
             * @param {string} [events] The event names.
             * @param {string} [delegate] The delegate selector.
             * @param {DOM~eventCallback} [callback] The callback to remove.
             * @returns {QuerySet} The QuerySet object.
             */removeEventDelegate:function removeEventDelegate(events,delegate,callback){this._dom.removeEventDelegate(this,events,delegate,callback);return this;},/**
             * Trigger events on each node.
             * @param {string} events The event names.
             * @param {object} [options] The options to use for the Event.
             * @param {*} [options.detail] Additional data to attach to the event.
             * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
             * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
             * @returns {QuerySet} The QuerySet object.
             */triggerEvent:function triggerEvent(events,options){this._dom.triggerEvent(this,events,options);return this;},/**
             * Trigger an event for the first node.
             * @param {string} event The event name.
             * @param {object} [options] The options to use for the Event.
             * @param {*} [options.detail] Additional data to attach to the event.
             * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
             * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
             */triggerOne:function triggerOne(event,options){return this._dom.triggerOne(this,event,options);}});/**
         * QuerySet Create
         */Object.assign(QuerySet.prototype,{/**
             * Attach a shadow DOM tree to the first node.
             * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
             * @returns {QuerySet} A new QuerySet object.
             */attachShadow:function attachShadow(){var open=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;var nodes=[],shadow=this._dom.attachShadow(this,open);if(shadow){nodes.push(shadow);}return new this.constructor(nodes,this._dom);}});/**
         * QuerySet Manipulation
         */Object.assign(QuerySet.prototype,{/**
             * Clone each node.
             * @param {object} options Options for cloning the node.
             * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
             * @param {Boolean} [options.events] Whether to also clone events.
             * @param {Boolean} [options.data] Whether to also clone custom data.
             * @param {Boolean} [options.animations] Whether to also clone animations.
             * @returns {QuerySet} A new QuerySet object.
             */clone:function clone(options){return new this.constructor(this._dom.clone(this,options));},/**
             * Detach each node from the DOM.
             * @returns {QuerySet} The QuerySet object.
             */detach:function detach(){this._dom.detach(this);return this;},/**
             * Remove all children of each node from the DOM.
             * @returns {QuerySet} The QuerySet object.
             */empty:function empty(){this._dom.empty(this);return this;},/**
             * Remove each node from the DOM.
             * @returns {QuerySet} The QuerySet object.
             */remove:function remove(){this._dom.remove(this);return this.pushStack([]);},/**
             * Replace each other node with nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */replaceAll:function replaceAll(others){this._dom.replaceAll(this,others);return this;},/**
             * Replace each node with other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */replaceWith:function replaceWith(others){this._dom.replaceWith(this,others);return this;}});/**
         * QuerySet Move
         */Object.assign(QuerySet.prototype,{/**
             * Insert each other node after the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */after:function after(others){this._dom.after(this,others);return this;},/**
             * Append each other node to the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */append:function append(others){this._dom.append(this,others);return this;},/**
             * Append each node to the first other node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */appendTo:function appendTo(others){this._dom.appendTo(this,others);return this;},/**
             * Insert each other node before the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */before:function before(others){this._dom.before(this,others);return this;},/**
             * Insert each node after the first other node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */insertAfter:function insertAfter(others){this._dom.insertAfter(this,others);return this;},/**
             * Insert each node before the first other node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */insertBefore:function insertBefore(others){this._dom.insertBefore(this,others);return this;},/**
             * Prepend each other node to the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */prepend:function prepend(others){this._dom.prepend(this,others);return this;},/**
             * Prepend each node to the first other node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */prependTo:function prependTo(others){this._dom.prependTo(this,others);return this;}});/**
         * QuerySet Wrap
         */Object.assign(QuerySet.prototype,{/**
             * Unwrap each node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */unwrap:function unwrap(filter){this._dom.unwrap(this,filter);return this;},/**
             * Wrap each nodes with other nodes.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */wrap:function wrap(others){this._dom.wrap(this,others);return this;},/**
             * Wrap all nodes with other nodes.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */wrapAll:function wrapAll(others){this._dom.wrapAll(this,others);return this;},/**
             * Wrap the contents of each node with other nodes.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */wrapInner:function wrapInner(others){this._dom.wrapInner(this,others);return this;}});/**
         * QuerySet Filter
         */Object.assign(QuerySet.prototype,{/**
             * Return all nodes connected to the DOM.
             * @returns {QuerySet} The QuerySet object.
             */connected:function connected(){return this.pushStack(this._dom.connected(this));},/**
             * Return all nodes considered equal to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */equal:function equal(others){return this.pushStack(this._dom.equal(this,others));},/**
             * Return all nodes matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */filter:function filter(_filter2){return this.pushStack(this._dom.filter(this,_filter2));},/**
             * Return the first node matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */filterOne:function filterOne(filter){return this.pushNode(this._dom.filterOne(this,filter));},/**
             * Return all "fixed" nodes.
             * @returns {QuerySet} The QuerySet object.
             */fixed:function fixed(){return this.pushStack(this._dom.fixed(this));},/**
             * Return all hidden nodes.
             * @returns {QuerySet} The QuerySet object.
             */hidden:function hidden(){return this.pushStack(this._dom.hidden(this));},/**
             * Return all nodes not matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */not:function not(filter){return this.pushStack(this._dom.not(this,filter));},/**
             * Return the first node not matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */notOne:function notOne(filter){return this.pushNode(this._dom.notOne(this,filter));},/**
             * Return all nodes considered identical to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */same:function same(others){return this.pushStack(this._dom.same(this,others));},/**
             * Return all visible nodes.
             * @returns {QuerySet} The QuerySet object.
             */visible:function visible(){return this.pushStack(this._dom.visible(this));},/**
             * Return all nodes with an animation.
             * @returns {QuerySet} The QuerySet object.
            */withAnimation:function withAnimation(){return this.pushStack(this._dom.withAnimation(this));},/**
             * Return all nodes with a specified attribute.
             * @param {string} attribute The attribute name.
             * @returns {QuerySet} The QuerySet object.
             */withAttribute:function withAttribute(attribute){return this.pushStack(this._dom.withAttribute(this,attribute));},/**
             * Return all nodes with child elements.
             * @returns {QuerySet} The QuerySet object.
             */withChildren:function withChildren(){return this.pushStack(this._dom.withChildren(this));},/**
             * Return all nodes with any of the specified classes.
             * @param {...string|string[]} classes The classes.
             * @returns {QuerySet} The QuerySet object.
             */withClass:function withClass(classes){return this.pushStack(this._dom.withClass(this,classes));},/**
             * Return all nodes with a CSS animation.
             * @returns {QuerySet} The QuerySet object.
            */withCSSAnimation:function withCSSAnimation(){return this.pushStack(this._dom.withCSSAnimation(this));},/**
             * Return all nodes with a CSS transition.
             * @returns {QuerySet} The QuerySet object.
             */withCSSTransition:function withCSSTransition(){return this.pushStack(this._dom.withCSSTransition(this));},/**
             * Return all nodes with custom data.
             * @param {string} [key] The data key.
             * @returns {QuerySet} The QuerySet object.
             */withData:function withData(key){return this.pushStack(this._dom.withData(this,key));},/**
             * Return all elements with a descendent matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */withDescendent:function withDescendent(filter){return this.pushStack(this._dom.withDescendent(this,filter));},/**
             * Return all nodes with a specified property.
             * @param {string} property The property name.
             * @returns {QuerySet} The QuerySet object.
             */withProperty:function withProperty(property){return this.pushStack(this._dom.withProperty(this,property));}});/**
         * QuerySet Find
         */Object.assign(QuerySet.prototype,{/**
             * Return all descendent nodes matching a selector.
             * @param {string} selector The query selector.
             * @returns {QuerySet} The QuerySet object.
             */find:function find(selector){return this.pushStack(this._dom.find(selector,this));},/**
             * Return all descendent nodes with a specific class.
             * @param {string} className The class name.
             * @returns {QuerySet} The QuerySet object.
             */findByClass:function findByClass(className){return this.pushStack(this._dom.findByClass(className,this));},/**
             * Return all descendent nodes with a specific ID.
             * @param {string} id The id.
             * @returns {QuerySet} The QuerySet object.
             */findById:function findById(id){return this.pushStack(this._dom.findById(id,this));},/**
             * Return all descendent nodes with a specific tag.
             * @param {string} tagName The tag name.
             * @returns {QuerySet} The QuerySet object.
             */findByTag:function findByTag(tagName){return this.pushStack(this._dom.findByTag(tagName,this));},/**
             * Return a single descendent node matching a selector.
             * @param {string} selector The query selector.
             * @returns {QuerySet} The QuerySet object.
             */findOne:function findOne(selector){return this.pushNode(this._dom.findOne(selector,this));},/**
             * Return a single descendent node with a specific class.
             * @param {string} className The class name.
             * @returns {QuerySet} The QuerySet object.
             */findOneByClass:function findOneByClass(className){return this.pushNode(this._dom.findOneByClass(className,this));},/**
             * Return a single descendent node with a specific ID.
             * @param {string} id The id.
             * @returns {QuerySet} The QuerySet object.
             */findOneById:function findOneById(id){return this.pushNode(this._dom.findOneById(id,this));},/**
             * Return a single descendent node with a specific tag.
             * @param {string} tagName The tag name.
             * @returns {QuerySet} The QuerySet object.
             */findOneByTag:function findOneByTag(tagName){return this.pushNode(this._dom.findOneByTag(tagName,this));}});/**
         * QuerySet Traversal
         */Object.assign(QuerySet.prototype,{/**
             * Return the first child of each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */child:function child(filter){return this.pushStack(this._dom.child(this,filter));},/**
             * Return all children of each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */children:function children(filter){return this.pushStack(this._dom.children(this,filter));},/**
             * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */closest:function closest(filter,limit){return this.pushStack(this._dom.closest(this,filter,limit));},/**
             * Return the common ancestor of all nodes.
             * @returns {QuerySet} The QuerySet object.
             */commonAncestor:function commonAncestor(){return this.pushNode(this._dom.commonAncestor(this));},/**
             * Return all children of each node (including text and comment nodes).
             * @returns {QuerySet} The QuerySet object.
             */contents:function contents(){return this.pushStack(this._dom.contents(this));},/**
             * Return the DocumentFragment of the first node.
             * @returns {QuerySet} The QuerySet object.
             */fragment:function fragment(){return this.pushNode(this._dom.fragment(this));},/**
             * Return the next sibling for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */next:function next(filter){return this.pushStack(this._dom.next(this,filter));},/**
             * Return all next siblings for each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */nextAll:function nextAll(filter,limit){return this.pushStack(this._dom.nextAll(this,filter,limit));},/**
             * Return the offset parent (relatively positioned) of the first node.
             * @returns {QuerySet} The QuerySet object.
             */offsetParent:function offsetParent(){return this.pushNode(this._dom.offsetParent(this));},/**
             * Return the parent of each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */parent:function parent(filter){return this.pushStack(this._dom.parent(this,filter));},/**
             * Return all parents of each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */parents:function parents(filter,limit){return this.pushStack(this._dom.parents(this,filter,limit));},/**
             * Return the previous sibling for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */prev:function prev(filter){return this.pushStack(this._dom.prev(this,filter));},/**
             * Return all previous siblings for each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */prevAll:function prevAll(filter,limit){return this.pushStack(this._dom.prevAll(this,filter,limit));},/**
             * Return the ShadowRoot of the first node.
             * @returns {QuerySet} The QuerySet object.
             */shadow:function shadow(){return this.pushNode(this._dom.shadow(this));},/**
             * Return all siblings for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
             * @returns {QuerySet} The QuerySet object.
             */siblings:function siblings(filter){return this.pushStack(this._dom.siblings(this,filter));}});/**
         * QuerySet Selection
         */Object.assign(QuerySet.prototype,{/**
             * Insert each node after the selection.
             * @returns {QuerySet} The QuerySet object.
             */afterSelection:function afterSelection(){this._dom.afterSelection(this);return this;},/**
             * Insert each node before the selection.
             * @returns {QuerySet} The QuerySet object.
             */beforeSelection:function beforeSelection(){this._dom.beforeSelection(this);return this;},/**
             * Create a selection on the first node.
             * @returns {QuerySet} The QuerySet object.
             */select:function select(){this._dom.select(this);return this;},/**
             * Create a selection containing all of the nodes.
             * @returns {QuerySet} The QuerySet object.
             */selectAll:function selectAll(){this._dom.selectAll(this);return this;},/**
             * Wrap selected nodes with other nodes.
             * @returns {QuerySet} The QuerySet object.
             */wrapSelection:function wrapSelection(){this._dom.wrapSelection(this);return this;}});/**
         * QuerySet Tests
         */Object.assign(QuerySet.prototype,{/**
             * Returns true if any of the nodes has an animation.
             * @returns {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
             */hasAnimation:function hasAnimation(){return this._dom.hasAnimation(this);},/**
             * Returns true if any of the nodes has a specified attribute.
             * @param {string} attribute The attribute name.
             * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
             */hasAttribute:function hasAttribute(attribute){return this._dom.hasAttribute(this,attribute);},/**
             * Returns true if any of the nodes has child nodes.
             * @returns {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
             */hasChildren:function hasChildren(){return this._dom.hasChildren(this);},/**
             * Returns true if any of the nodes has any of the specified classes.
             * @param {...string|string[]} classes The classes.
             * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
             */hasClass:function hasClass(){var _this$_dom4;for(var _len21=arguments.length,classes=new Array(_len21),_key21=0;_key21<_len21;_key21++){classes[_key21]=arguments[_key21];}return(_this$_dom4=this._dom).hasClass.apply(_this$_dom4,[this].concat(classes));},/**
             * Returns true if any of the nodes has a CSS animation.
             * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
             */hasCSSAnimation:function hasCSSAnimation(){return this._dom.hasCSSAnimation(this);},/**
             * Returns true if any of the nodes has a CSS transition.
             * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
             */hasCSSTransition:function hasCSSTransition(){return this._dom.hasCSSTransition(this);},/**
             * Returns true if any of the nodes has custom data.
             * @param {string} [key] The data key.
             * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
             */hasData:function hasData(key){return this._dom.hasData(this,key);},/**
             * Returns true if any of the nodes contains a descendent matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
             */hasDescendent:function hasDescendent(filter){return this._dom.hasDescendent(this,filter);},/**
             * Returns true if any of the nodes has a DocumentFragment.
             * @returns {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
             */hasFragment:function hasFragment(){return this._dom.hasFragment(this);},/**
             * Returns true if any of the nodes has a specified property.
             * @param {string} property The property name.
             * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
             */hasProperty:function hasProperty(property){return this._dom.hasProperty(this,property);},/**
             * Returns true if any of the nodes has a ShadowRoot.
             * @returns {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
             */hasShadow:function hasShadow(){return this._dom.hasShadow(this);},/**
             * Returns true if any of the nodes matches a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
             */is:function is(filter){return this._dom.is(this,filter);},/**
             * Returns true if any of the nodes is connected to the DOM.
             * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
             */isConnected:function isConnected(){return this._dom.isConnected(this);},/**
             * Returns true if any of the nodes is considered equal to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
             */isEqual:function isEqual(others){return this._dom.isEqual(this,others);},/**
             * Returns true if any of the elements or a parent of any of the elements is "fixed".
             * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
             */isFixed:function isFixed(){return this._dom.isFixed(this);},/**
             * Returns true if any of the nodes is hidden.
             * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
             */isHidden:function isHidden(){return this._dom.isHidden(this);},/**
             * Returns true if any of the nodes is considered identical to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
             */isSame:function isSame(others){return this._dom.isSame(this,others);},/**
             * Returns true if any of the nodes is visible.
             * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
             */isVisible:function isVisible(){return this._dom.isVisible(this);}});/**
         * QuerySet Utility
         */Object.assign(QuerySet.prototype,_defineProperty({/**
             * Push new nodes to the stack and sort the results.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} query The input query.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
             * @returns {QuerySet} The QuerySet object.
             */add:function add(query){var context=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return this.pushStack(Core.unique(Core.merge([],this._nodes,this._dom.query(query,context).get()))).sort();},/**
             * Execute a function for each node in the set.
             * @param {function} callback The callback to execute
             * @returns {QuerySet} The QuerySet object.
             */each:function each(callback){this._nodes.forEach(function(v,i){return callback(v,i);});return this;},/**
             * Reduce the set of nodes to the one at the specified index.
             * @param {number} index The index of the node.
             * @returns {QuerySet} The QuerySet object.
             */eq:function eq(index){return this.pushNode(this.get(index));},/**
             * Reduce the set of nodes to the first.
             * @returns {QuerySet} The QuerySet object.
             */first:function first(){return this.eq(0);},/**
             * Force a node to be shown, and then execute a callback.
             * @param {DOM~nodeCallback} callback The callback to execute.
             * @returns {*} The result of the callback.
             */forceShow:function forceShow(callback){return this._dom.forceShow(this,callback);},/**
             * Retrieve the DOM node(s) contained in the QuerySet.
             * @param {number} [index=null] The index of the node.
             * @returns {array|Node|Document|Window} The node(s).
             */get:function get(){var index=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(index===null){return this._nodes;}return index<0?this._nodes[index+this._nodes.length]:this._nodes[index];},/**
             * Get the index of the first node relative to it's parent node.
             * @returns {number} The index.
             */index:function index(){return this._dom.index(this);},/**
             * Get the index of the first node matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {number} The index.
             */indexOf:function indexOf(filter){return this._dom.indexOf(this,filter);},/**
             * Reduce the set of nodes to the last.
             * @returns {QuerySet} The QuerySet object.
             */last:function last(){return this.eq(-1);},/**
             * Execute a function for each node in the set.
             * @param {function} callback The callback to execute
             * @returns {QuerySet} A new QuerySet object.
             */map:function map(callback){return new this.constructor(this._nodes.map(function(v,i){return callback(v,i);}));},/**
             * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
             * @returns {QuerySet} The QuerySet object.
             */normalize:function normalize(){this._dom.normalize(this);return this;},/**
             * Return a serialized string containing names and values of all form nodes.
             * @returns {string} The serialized string.
             */serialize:function serialize(){return this._dom.serialize(this);},/**
             * Return a serialized array containing names and values of all form nodes.
             * @returns {array} The serialized array.
             */serializeArray:function serializeArray(){return this._dom.serializeArray(this);},/**
             * Reduce the set of matched nodes to a subset specified by a range of indices.
             * @param {number} [begin] The index to slice from.
             * @param {number} [end]  The index to slice to.
             * @returns {QuerySet} A new QuerySet object.
             */slice:function slice(begin,end){return new this.constructor(this._nodes.slice(begin,end));},/**
             * Sort nodes by their position in the document.
             * @returns {QuerySet} The QuerySet object.
             */sort:function sort(){return this.pushStack(this._dom.sort(this));},/**
             * Return the tag name (lowercase) of the first node.
             * @returns {string} The nodes tag name (lowercase).
             */tagName:function tagName(){return this._dom.tagName(this);}},Symbol.iterator,function(){return this._nodes.values();}));/**
         * QuerySet (Static) Properties
         */ /**
         * @callback DOM~animationCallback
         * @param {HTMLElement} node The input node.
         * @param {number} progress The animation progress.
         * @param {object} options The options to use for animating.
         */ /**
         * @callback DOM~eventCallback
         * @param {Event} event The event object.
         */ /**
         * @callback DOM~nodeCallback
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         */ /**
         * @callback DOM~queueCallback
         * @param {HTMLElement} node The input node.
         */dom=new DOM();return{AjaxRequest:AjaxRequest,Animation:Animation,AnimationSet:AnimationSet,DOM:DOM,dom:dom,QuerySet:QuerySet,QuerySetImmutable:QuerySetImmutable};});/**
     * FrostUI v1.0
     * https://github.com/elusivecodes/FrostUI
     */(function(global,factory){'use strict';if((typeof module==="undefined"?"undefined":_typeof(module))==='object'&&_typeof(module.exports)==='object'){module.exports=factory;}else{Object.assign(global,factory(global));}})(window,function(window){'use strict';if(!window){throw new Error('FrostUI requires a Window.');}if(!('DOM'in window)){throw new Error('FrostUI requires FrostDOM.');}var Core=window.Core;var DOM=window.DOM;var dom=window.dom;var QuerySet=window.QuerySet;var document=window.document;var UI={};/**
         * Alert Class
         * @class
         */var Alert=/*#__PURE__*/function(){/**
             * New Alert constructor.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Alert with.
             * @param {number} [settings.duration=250] The duration of the animation.
             * @returns {Alert} A new Alert object.
             */function Alert(node,settings){_classCallCheck(this,Alert);this._node=node;this._settings=Core.extend({},this.constructor.defaults,dom.getDataset(this._node),settings);dom.setData(this._node,'alert',this);}/**
             * Destroy the Alert.
             */_createClass(Alert,[{key:"destroy",value:function destroy(){dom.removeData(this._node,'alert');}/**
             * Close the Alert.
             */},{key:"close",value:function close(){var _this52=this;if(this._animating||!dom.triggerOne(this._node,'close.frost.alert')){return;}this._animating=true;dom.fadeOut(this._node,{duration:this._settings.duration}).then(function(_){dom.triggerEvent(_this52._node,'closed.frost.alert');dom.remove(_this52._node);})["catch"](function(_){})["finally"](function(_){_this52._animating=false;});}/**
             * Initialize an Alert.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Alert with.
             * @param {number} [settings.duration=250] The duration of the animation.
             * @returns {Alert} A new Alert object.
             */}],[{key:"init",value:function init(node,settings){return dom.hasData(node,'alert')?dom.getData(node,'alert'):new this(node,settings);}}]);return Alert;}();// Alert events
dom.addEventDelegate(document,'click.frost.alert','[data-dismiss="alert"]',function(e){e.preventDefault();var target=UI.getTarget(e.currentTarget,'.alert');var alert=Alert.init(target);alert.close();});// Alert default options
Alert.defaults={duration:250};// Alert QuerySet method
if(QuerySet){QuerySet.prototype.alert=function(a){var settings,method;if(Core.isObject(a)){settings=a;}else if(Core.isString(a)){method=a;}for(var _len22=arguments.length,args=new Array(_len22>1?_len22-1:0),_key22=1;_key22<_len22;_key22++){args[_key22-1]=arguments[_key22];}var _iterator93=_createForOfIteratorHelper(this),_step93;try{for(_iterator93.s();!(_step93=_iterator93.n()).done;){var node=_step93.value;if(!Core.isElement(node)){continue;}var alert=Alert.init(node,settings);if(method){alert[method].apply(alert,args);}}}catch(err){_iterator93.e(err);}finally{_iterator93.f();}return this;};}UI.Alert=Alert;/**
         * Button Class
         * @class
         */var Button=/*#__PURE__*/function(){/**
             * New Button constructor.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Button with.
             * @returns {Button} A new Button object.
             */function Button(node,settings){_classCallCheck(this,Button);this._node=node;this._settings=Core.extend({},this.constructor.defaults,dom.getDataset(this._node),settings);this._input=dom.findOne('input',this._node);this._isRadio=this._input&&dom.is(this._input,'[type="radio"]');if(this._isRadio){this._siblings=dom.siblings(this._node);}dom.setData(this._node,'button',this);}/**
             * Destroy the Button.
             */_createClass(Button,[{key:"destroy",value:function destroy(){dom.removeData(this._node,'button');}/**
             * Toggle the Button.
             */},{key:"toggle",value:function toggle(){this._isRadio?this._toggleRadio():this._toggleCheckbox();}/**
             * Toggle a checkbox-type Button.
             */},{key:"_toggleCheckbox",value:function _toggleCheckbox(){dom.toggleClass(this._node,'active');if(this._input){var isChecked=dom.getProperty(this._input,'checked');dom.setProperty(this._input,'checked',!isChecked);dom.triggerEvent(this._input,'change');}}/**
             * Toggle a radio-type Button.
             */},{key:"_toggleRadio",value:function _toggleRadio(){dom.addClass(this._node,'active');dom.removeClass(this._siblings,'active');dom.setProperty(this._input,'checked',true);dom.triggerEvent(this._input,'change');}/**
             * Initialize a Button.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Button with.
             * @returns {Button} A new Button object.
             */}],[{key:"init",value:function init(node,settings){return dom.hasData(node,'button')?dom.getData(node,'button'):new this(node,settings);}}]);return Button;}();// Button events
dom.addEventDelegate(document,'click.frost.button','[data-toggle="buttons"] > *, [data-toggle="button"]',function(e){e.preventDefault();var button=Button.init(e.currentTarget);button.toggle();});// Button default settings
Button.defaults={};// Button QuerySet method
if(QuerySet){QuerySet.prototype.button=function(a){var settings,method;if(Core.isObject(a)){settings=a;}else if(Core.isString(a)){method=a;}for(var _len23=arguments.length,args=new Array(_len23>1?_len23-1:0),_key23=1;_key23<_len23;_key23++){args[_key23-1]=arguments[_key23];}var _iterator94=_createForOfIteratorHelper(this),_step94;try{for(_iterator94.s();!(_step94=_iterator94.n()).done;){var node=_step94.value;if(!Core.isElement(node)){continue;}var button=Button.init(node,settings);if(method){button[method].apply(button,args);}}}catch(err){_iterator94.e(err);}finally{_iterator94.f();}return this;};}UI.Button=Button;/**
         * Carousel Class
         * @class
         */var Carousel=/*#__PURE__*/function(){/**
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
             */function Carousel(node,settings){_classCallCheck(this,Carousel);this._node=node;this._settings=Core.extend({},this.constructor.defaults,dom.getDataset(this._node),settings);this._items=dom.find('.carousel-item',this._node);this._index=this._items.findIndex(function(item){return dom.hasClass(item,'active');});this._queue=[];this._events();dom.setData(this._node,'carousel',this);if(this._settings.ride==='carousel'){this._setTimer();}}/**
             * Cycle to the next carousel item.
             */_createClass(Carousel,[{key:"cycle",value:function cycle(){dom.isHidden(document)?this._setTimer():this.slide(1);}/**
             * Destroy the Carousel.
             */},{key:"destroy",value:function destroy(){this._queue=[];if(this._timer){clearTimeout(this._timer);}if(this._settings.keyboard){dom.removeEvent(this._node,'keydown.frost.carousel');}if(this._settings.pause){dom.removeEvent(this._node,'mouseenter.frost.carousel');dom.removeEvent(this._node,'mouseleave.frost.carousel');}dom.removeEvent(this._node,'remove.frost.carousel');dom.removeData(this._node,'carousel');}/**
             * Cycle to the next Carousel item.
             */},{key:"next",value:function next(){this.slide();}/**
             * Stop the carousel from cycling through items.
             */},{key:"pause",value:function pause(){if(this._timer){clearTimeout(this._timer);}}/**
             * Cycle to the previous Carousel item.
             */},{key:"prev",value:function prev(){this.slide(-1);}/**
             * Cycle to a specific Carousel item.
             * @param {number} index The item index to cycle to.
             */},{key:"show",value:function show(index){this._show(index);}/**
             * Slide the Carousel in a specific direction.
             * @param {number} [direction=1] The direction to slide to.
             */},{key:"slide",value:function slide(){var direction=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var index=this._queue.length?this._queue[this._queue.length-1]:this._index;this.show(index+direction);}/**
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
             */}],[{key:"init",value:function init(node,settings){return dom.hasData(node,'carousel')?dom.getData(node,'carousel'):new this(node,settings);}}]);return Carousel;}();// Carousel events
dom.addEventDelegate(document,'click.frost.carousel','.carousel-next, .carousel-prev, [data-slide], [data-slide-to]',function(e){e.preventDefault();var target=UI.getTarget(e.currentTarget,'.carousel');var carousel=Carousel.init(target);var slideTo=dom.getDataset(e.currentTarget,'slideTo');if(!Core.isUndefined(slideTo)){carousel.show(slideTo);}else if(dom.hasClass(e.currentTarget,'carousel-prev')){carousel.prev();}else{carousel.next();}});/**
         * Carousel Helpers
         */Object.assign(Carousel.prototype,{/**
             * Attach events for the Carousel.
             */_events:function _events(){var _this53=this;if(this._settings.keyboard){dom.addEvent(this._node,'keydown.frost.carousel',function(e){switch(e.key){case'ArrowLeft':e.preventDefault();_this53.prev()["catch"](function(_){});break;case'ArrowRight':e.preventDefault();_this53.next()["catch"](function(_){});break;}});}if(this._settings.pause){dom.addEvent(this._node,'mouseenter.frost.carousel',function(_){_this53.pause();});dom.addEvent(this._node,'mouseleave.frost.carousel',function(_){_this53._setTimer();});}dom.addEvent(this._node,'remove.frost.carousel',function(_){_this53.destroy();});},/**
             * Set a timer for the next Carousel cycle.
             */_setTimer:function _setTimer(){var _this54=this;var interval=dom.getDataset(this._items[this._index],'interval');this._timer=setTimeout(function(_){return _this54.cycle();},interval||this._settings.interval);},/**
             * Cycle to a specific Carousel item.
             * @param {number} index The item index to cycle to.
             */_show:function _show(index){var _this55=this;if(this._sliding){this._queue.push(index);return;}index=parseInt(index);if(!this._settings.wrap&&(index<0||index>this._items.length-1)){return;}var dir=0;if(index<0){dir=-1;}else if(index>this._items.length-1){dir=1;}index%=this._items.length;if(index<0){index=this._items.length+index;}if(index===this._index){return;}var direction=dir==-1||dir==0&&index<this._index?'left':'right';var eventData={direction:direction,relatedTarget:this._items[index],from:this._index,to:index};if(!dom.triggerOne(this._node,'slide.frost.carousel',eventData)){return;}var oldIndex=this._index;this._index=index;this._sliding=true;this.pause();dom.addClass(this._items[this._index],'active');dom.removeClass(this._items[oldIndex],'active');dom.animate(this._items[this._index],function(node,progress,options){return _this55._update(node,_this55._items[oldIndex],progress,options.direction);},{direction:direction,duration:this._settings.transition}).then(function(_){var oldIndicator=dom.find('.active[data-slide-to]',_this55._node);var newIndicator=dom.find('[data-slide-to="'+_this55._index+'"]',_this55._node);dom.removeClass(oldIndicator,'active');dom.addClass(newIndicator,'active');dom.triggerEvent(_this55._node,'slid.frost.carousel',eventData);_this55._sliding=false;if(!_this55._queue.length){_this55._setTimer();}else{var next=_this55._queue.shift();_this55._show(next);}})["catch"](function(_){_this55._sliding=false;});},/**
             * Update the position of the Carousel items.
             * @param {Node} nodeIn The new node.
             * @param {Node} nodeOut The old node.
             * @param {number} progress The progress of the cycle.
             * @param {string} direction The direction to cycle to.
             */_update:function _update(nodeIn,nodeOut,progress,direction){if(progress>=1){nodeOut.style.setProperty('display','');nodeOut.style.setProperty('transform','');nodeIn.style.setProperty('transform','');return;}var inverse=direction==='right';nodeOut.style.setProperty('display','block');nodeOut.style.setProperty('transform',"translateX(".concat(Math.round(progress*100)*(inverse?-1:1),"%)"));nodeIn.style.setProperty('transform',"translateX(".concat(Math.round((1-progress)*100)*(inverse?1:-1),"%)"));}});// Carousel default options
Carousel.defaults={interval:5000,transition:500,keyboard:true,ride:false,pause:true,wrap:true};// Carousel init
dom.addEventOnce(window,'load',function(_){var nodes=dom.find('[data-ride="carousel"]');var _iterator95=_createForOfIteratorHelper(nodes),_step95;try{for(_iterator95.s();!(_step95=_iterator95.n()).done;){var node=_step95.value;Carousel.init(node);}}catch(err){_iterator95.e(err);}finally{_iterator95.f();}});// Carousel QuerySet method
if(QuerySet){QuerySet.prototype.carousel=function(a){var settings,method;if(Core.isObject(a)){settings=a;}else if(Core.isString(a)){method=a;}for(var _len24=arguments.length,args=new Array(_len24>1?_len24-1:0),_key24=1;_key24<_len24;_key24++){args[_key24-1]=arguments[_key24];}var _iterator96=_createForOfIteratorHelper(this),_step96;try{for(_iterator96.s();!(_step96=_iterator96.n()).done;){var node=_step96.value;if(!Core.isElement(node)){continue;}var carousel=Carousel.init(node,settings);if(method){carousel[method].apply(carousel,args);}}}catch(err){_iterator96.e(err);}finally{_iterator96.f();}return this;};}UI.Carousel=Carousel;/**
         * Collapse Class
         * @class
         */var Collapse=/*#__PURE__*/function(){/**
             * New Collapse constructor.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Collapse with.
             * @param {string} [settings.direction=bottom] The direction to collapse the targets from/to.
             * @param {number} [settings.duration=300] The duration of the animation.
             * @returns {Collapse} A new Collapse object.
             */function Collapse(node,settings){_classCallCheck(this,Collapse);this._node=node;var id=this._node.getAttribute('id');this._triggers=dom.find("[data-toggle=\"collapse\"][data-target=\"#".concat(id,"\"]"));console.log(this._triggers);this._settings=Core.extend({},this.constructor.defaults,dom.getDataset(this._node),settings);if(this._settings.parent){this._parent=dom.findOne(this._settings.parent);}dom.setData(this._node,'collapse',this);}/**
             * Destroy the Collapse.
             */_createClass(Collapse,[{key:"destroy",value:function destroy(){dom.removeData(this._node,'collapse');}/**
             * Hide the element.
             */},{key:"hide",value:function hide(){var _this56=this;if(this._animating||!dom.hasClass(this._node,'show')||!dom.triggerOne(this._node,'hide.frost.collapse')){return;}this._animating=true;dom.squeezeOut(this._node,{direction:this._settings.direction,duration:this._settings.duration}).then(function(_){dom.removeClass(_this56._node,'show');dom.setAttribute(_this56._triggers,'aria-expanded',false);dom.triggerEvent(_this56._node,'hidden.frost.collapse');})["catch"](function(_){})["finally"](function(_){_this56._animating=false;});}/**
             * Show the element.
             */},{key:"show",value:function show(){var _this57=this;if(this._animating||dom.hasClass(this._node,'show')){return;}var collapses=[];if(this._parent){var siblings=dom.find('.collapse.show',this._parent);var _iterator97=_createForOfIteratorHelper(siblings),_step97;try{for(_iterator97.s();!(_step97=_iterator97.n()).done;){var sibling=_step97.value;var collapse=this.constructor.init(sibling);if(this._parent!==collapse._parent){continue;}if(collapse._animating){return;}collapses.push(collapse);}}catch(err){_iterator97.e(err);}finally{_iterator97.f();}}if(!dom.triggerOne(this._node,'show.frost.collapse')){return;}for(var _i5=0,_collapses=collapses;_i5<_collapses.length;_i5++){var _collapse=_collapses[_i5];_collapse.hide();}this._animating=true;dom.addClass(this._node,'show');dom.squeezeIn(this._node,{direction:this._settings.direction,duration:this._settings.duration}).then(function(_){dom.setAttribute(_this57._triggers,'aria-expanded',true);dom.triggerEvent(_this57._node,'shown.frost.collapse');})["catch"](function(_){})["finally"](function(_){_this57._animating=false;});}/**
             * Toggle the element.
             */},{key:"toggle",value:function toggle(){dom.hasClass(this._node,'show')?this.hide():this.show();}/**
             * Initialize a Collapse.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Collapse with.
             * @param {string} [settings.direction=bottom] The direction to collapse the targets from/to.
             * @param {number} [settings.duration=300] The duration of the animation.
             * @returns {Collapse} A new Collapse object.
             */}],[{key:"init",value:function init(node,settings){return dom.hasData(node,'collapse')?dom.getData(node,'collapse'):new this(node,settings);}}]);return Collapse;}();// Collapse events
dom.addEventDelegate(document,'click.frost.collapse','[data-toggle="collapse"]',function(e){e.preventDefault();var selector=UI.getTargetSelector(e.currentTarget);var targets=dom.find(selector);var _iterator98=_createForOfIteratorHelper(targets),_step98;try{for(_iterator98.s();!(_step98=_iterator98.n()).done;){var target=_step98.value;var collapse=Collapse.init(target);collapse.toggle();}}catch(err){_iterator98.e(err);}finally{_iterator98.f();}});// Collapse default options
Collapse.defaults={direction:'bottom',duration:250};// Collapse QuerySet method
if(QuerySet){QuerySet.prototype.collapse=function(a){var options,method;if(Core.isObject(a)){options=a;}else if(Core.isString(a)){method=a;}for(var _len25=arguments.length,args=new Array(_len25>1?_len25-1:0),_key25=1;_key25<_len25;_key25++){args[_key25-1]=arguments[_key25];}var _iterator99=_createForOfIteratorHelper(this),_step99;try{for(_iterator99.s();!(_step99=_iterator99.n()).done;){var node=_step99.value;if(!Core.isElement(node)){continue;}var collapse=Collapse.init(node,options);if(method){collapse[method].apply(collapse,args);}}}catch(err){_iterator99.e(err);}finally{_iterator99.f();}return this;};}UI.Collapse=Collapse;/**
         * Dropdown Class
         * @class
         */var Dropdown=/*#__PURE__*/function(){/**
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
             */function Dropdown(node,settings){var _this58=this;_classCallCheck(this,Dropdown);this._node=node;this._settings=Core.extend({},this.constructor.defaults,dom.getDataset(this._node),settings);this._containerNode=dom.parent(this._node).shift();this._menuNode=dom.next(this._node,'.dropdown-menu').shift();if(this._settings.reference){if(this._settings.reference==='parent'){this._referenceNode=this._containerNode;}else{this._referenceNode=dom.findOne(this._settings.reference);}}else{this._referenceNode=this._node;}// Attach popper
if(!dom.closest(this._node,'.navbar-nav').length){this._popper=new Popper(this._menuNode,{reference:this._referenceNode,placement:this._settings.placement,position:this._settings.position,fixed:this._settings.fixed,spacing:this._settings.spacing,minContact:this._settings.minContact});}dom.addEvent(this._node,'remove.frost.dropdown',function(_){_this58.destroy();});dom.setData(this._node,'dropdown',this);}/**
             * Destroy the Dropdown.
             */_createClass(Dropdown,[{key:"destroy",value:function destroy(){if(this._popper){this._popper.destroy();}dom.removeEvent(this._node,'keyup.frost.dropdown');dom.removeEvent(this._node,'remove.frost.dropdown');dom.removeData(this._node,'dropdown');}/**
             * Hide the Dropdown.
             */},{key:"hide",value:function hide(){var _this59=this;if(this._animating||!dom.hasClass(this._containerNode,'open')||!dom.triggerOne(this._node,'hide.frost.dropdown')){return;}this._animating=true;dom.fadeOut(this._menuNode,{duration:this._settings.duration}).then(function(_){dom.removeClass(_this59._containerNode,'open');dom.setAttribute(_this59._node,'aria-expanded',false);dom.triggerEvent(_this59._node,'hidden.frost.dropdown');})["catch"](function(_){})["finally"](function(_){_this59._animating=false;});}/**
             * Show the Dropdown.
             */},{key:"show",value:function show(){var _this60=this;if(this._animating||dom.hasClass(this._containerNode,'open')||!dom.triggerOne(this._node,'show.frost.dropdown')){return;}this._animating=true;dom.addClass(this._containerNode,'open');dom.fadeIn(this._menuNode,{duration:this._settings.duration}).then(function(_){dom.setAttribute(_this60._node,'aria-expanded',true);dom.triggerEvent(_this60._node,'shown.frost.dropdown');})["catch"](function(_){})["finally"](function(_){_this60._animating=false;});}/**
             * Toggle the Dropdown.
             */},{key:"toggle",value:function toggle(){dom.hasClass(this._containerNode,'open')?this.hide():this.show();}/**
             * Auto-hide all visible dropdowns.
             * @param {HTMLElement} [target] The target node.
             * @param {Boolean} [noHideSelf=false] Whether to force prevent hiding self.
             */}],[{key:"autoHide",value:function autoHide(target){var noHideSelf=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(!noHideSelf){noHideSelf=dom.is(target,'form');}var menus=dom.find('.open > .dropdown-menu');var _iterator100=_createForOfIteratorHelper(menus),_step100;try{for(_iterator100.s();!(_step100=_iterator100.n()).done;){var menu=_step100.value;if(target&&dom.hasDescendent(menu,target)&&(noHideSelf||dom.closest(target,'form',menu).length)){continue;}var trigger=dom.prev(menu).shift();if(trigger===target){continue;}var dropdown=this.init(trigger);dropdown.hide();}}catch(err){_iterator100.e(err);}finally{_iterator100.f();}}/**
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
             */},{key:"init",value:function init(node,settings){return dom.hasData(node,'dropdown')?dom.getData(node,'dropdown'):new this(node,settings);}}]);return Dropdown;}();// Dropdown events
dom.addEventDelegate(document,'click.frost.dropdown keyup.frost.dropdown','[data-toggle="dropdown"]',function(e){if(e.key&&e.key!==' '){return;}e.preventDefault();var dropdown=Dropdown.init(e.currentTarget);dropdown.toggle();});dom.addEventDelegate(document,'keydown.frost.dropdown','[data-toggle="dropdown"]',function(e){switch(e.key){case'ArrowDown':case'ArrowUp':e.preventDefault();var node=e.currentTarget;var dropdown=Dropdown.init(node);if(!dom.hasClass(dropdown._containerNode,'open')){dropdown.show();}var focusNode=dom.findOne('.dropdown-item:not([tabindex="-1"])',dropdown._menuNode);dom.focus(focusNode);break;}});dom.addEventDelegate(document,'keydown.frost.dropdown','.open > .dropdown-menu .dropdown-item',function(e){var focusNode;switch(e.key){case'ArrowDown':focusNode=dom.nextAll(e.currentTarget,'.dropdown-item:not([tabindex="-1"])').shift();break;case'ArrowUp':focusNode=dom.prevAll(e.currentTarget,'.dropdown-item:not([tabindex="-1"])').pop();break;default:return;}e.preventDefault();dom.focus(focusNode);});dom.addEvent(document,'click.frost.dropdown',function(e){Dropdown.autoHide(e.target);});dom.addEvent(document,'keyup.frost.dropdown',function(e){switch(e.key){case'Tab':Dropdown.autoHide(e.target,true);case'Escape':Dropdown.autoHide();}});// Dropdown default options
Dropdown.defaults={duration:100,placement:'bottom',position:'start',fixed:false,spacing:2,minContact:false};// Dropdown QuerySet method
if(QuerySet){QuerySet.prototype.dropdown=function(a){var settings,method;if(Core.isObject(a)){settings=a;}else if(Core.isString(a)){method=a;}for(var _len26=arguments.length,args=new Array(_len26>1?_len26-1:0),_key26=1;_key26<_len26;_key26++){args[_key26-1]=arguments[_key26];}var _iterator101=_createForOfIteratorHelper(this),_step101;try{for(_iterator101.s();!(_step101=_iterator101.n()).done;){var node=_step101.value;if(!Core.isElement(node)){continue;}var dropdown=Dropdown.init(node,settings);if(method){dropdown[method].apply(dropdown,args);}}}catch(err){_iterator101.e(err);}finally{_iterator101.f();}return this;};}UI.Dropdown=Dropdown;/**
         * Get a target from a node.
         * @param {HTMLElement} node The input node.
         * @param {string} [closestSelector] The default closest selector.
         * @return {HTMLElement} The target node.
         */UI.getTarget=function(node,closestSelector){var selector=UI.getTargetSelector(node);var target;if(selector&&selector!=='#'){target=dom.findOne(selector);}else if(closestSelector){target=dom.closest(node,closestSelector).shift();}if(!target){throw new Error('Target not found');}return target;};/**
         * Get the target selector from a node.
         * @param {HTMLElement} node The input node.
         * @return {string} The target selector.
         */UI.getTargetSelector=function(node){return dom.getDataset(node,'target')||dom.getAttribute(node,'href');};/**
         * Modal Class
         * @class
         */var Modal=/*#__PURE__*/function(){/**
             * New Modal constructor.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Modal with.
             * @param {number} [settings.duration=250] The duration of the animation.
             * @param {Boolean} [settings.backdrop=true] Whether to display a backdrop for the modal.
             * @param {Boolean} [settings.focus=true] Whether to set focus on the modal when shown.
             * @param {Boolean} [settings.show=true] Whether to show the modal on initialization.
             * @param {Boolean} [settings.keyboard=true] Whether to close the modal when the escape key is pressed.
             * @returns {Modal} A new Modal object.
             */function Modal(node,settings){_classCallCheck(this,Modal);this._node=node;this._settings=Core.extend({},this.constructor.defaults,dom.getDataset(node),settings);this._dialog=dom.child(this._node,'.modal-dialog').shift();if(this._settings.show){this.show();}dom.setData(this._node,'modal',this);}/**
             * Destroy the Modal.
             */_createClass(Modal,[{key:"destroy",value:function destroy(){dom.removeData(this._node,'modal');}/**
             * Hide the Modal.
             */},{key:"hide",value:function hide(){var _this61=this;if(this._animating||!dom.hasClass(this._node,'show')||!dom.triggerOne(this._node,'hide.frost.modal')){return;}this._animating=true;Promise.all([dom.fadeOut(this._dialog,{duration:this._settings.duration}),dom.dropOut(this._dialog,{duration:this._settings.duration}),dom.fadeOut(this._backdrop,{duration:this._settings.duration})]).then(function(_){if(_this61._settings.backdrop){dom.remove(_this61._backdrop);_this61._backdrop=null;}dom.removeAttribute(_this61._node,'aria-modal');dom.setAttribute(_this61._node,'aria-hidden',true);dom.removeClass(_this61._node,'show');dom.removeClass(document.body,'modal-open');if(_this61._activeTarget){dom.focus(_this61._activeTarget);}dom.triggerEvent(_this61._node,'hidden.frost.modal');})["catch"](function(_){})["finally"](function(_){_this61._animating=false;});}/**
             * Show the Modal.
             * @param {HTMLElement} [activeTarget] The active target.
             */},{key:"show",value:function show(activeTarget){var _this62=this;if(this._animating||dom.hasClass(this._node,'show')||!dom.triggerOne(this._node,'show.frost.modal')){return;}if(this._settings.backdrop){this._backdrop=dom.create('div',{"class":'modal-backdrop'});dom.append(document.body,this._backdrop);}this._activeTarget=activeTarget;this._animating=true;dom.addClass(this._node,'show');dom.addClass(document.body,'modal-open');Promise.all([dom.fadeIn(this._dialog,{duration:this._settings.duration}),dom.dropIn(this._dialog,{duration:this._settings.duration}),dom.fadeIn(this._backdrop,{duration:this._settings.duration})]).then(function(_){dom.removeAttribute(_this62._node,'aria-hidden');dom.setAttribute(_this62._node,'aria-modal',true);if(_this62._settings.focus){dom.focus(_this62._node);}dom.triggerEvent(_this62._node,'shown.frost.modal');})["catch"](function(_){})["finally"](function(_){_this62._animating=false;});}/**
             * Toggle the Modal.
             */},{key:"toggle",value:function toggle(){dom.hasClass(this._node,'show')?this.hide():this.show();}/**
             * Initialize a Modal.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Modal with.
             * @param {number} [settings.duration=250] The duration of the animation.
             * @param {Boolean} [settings.backdrop=true] Whether to display a backdrop for the modal.
             * @param {Boolean} [settings.focus=true] Whether to set focus on the modal when shown.
             * @param {Boolean} [settings.show=true] Whether to show the modal on initialization.
             * @param {Boolean} [settings.keyboard=true] Whether to close the modal when the escape key is pressed.
             * @returns {Modal} A new Modal object.
             */}],[{key:"init",value:function init(node,settings){return dom.hasData(node,'modal')?dom.getData(node,'modal'):new this(node,settings);}}]);return Modal;}();// Modal events
dom.addEventDelegate(document,'click.frost.modal','[data-toggle="modal"]',function(e){e.preventDefault();var target=UI.getTarget(e.currentTarget,'.modal');var modal=Modal.init(target);modal.show(e.currentTarget);});dom.addEventDelegate(document,'click.frost.modal','[data-dismiss="modal"]',function(e){e.preventDefault();var target=UI.getTarget(e.currentTarget,'.modal');var modal=Modal.init(target);modal.hide();});dom.addEvent(document,'click.frost.modal',function(e){var backdrop=dom.findOne('.modal-backdrop');if(!backdrop){return;}var targets=dom.find('.modal.show');var _iterator102=_createForOfIteratorHelper(targets),_step102;try{for(_iterator102.s();!(_step102=_iterator102.n()).done;){var target=_step102.value;if(target!==e.target&&dom.hasDescendent(target,e.target)){continue;}var modal=Modal.init(target);if(modal._settings.backdrop==='static'){continue;}modal.hide();}}catch(err){_iterator102.e(err);}finally{_iterator102.f();}});dom.addEvent(document,'keyup.frost.modal',function(e){if(e.key!=='Escape'){return;}var targets=dom.find('.modal.show');var _iterator103=_createForOfIteratorHelper(targets),_step103;try{for(_iterator103.s();!(_step103=_iterator103.n()).done;){var target=_step103.value;var modal=Modal.init(target);if(!modal._settings.keyboard){continue;}modal.hide();}}catch(err){_iterator103.e(err);}finally{_iterator103.f();}});// Modal default options
Modal.defaults={duration:250,backdrop:true,focus:true,show:false,keyboard:true};// Modal QuerySet method
if(QuerySet){QuerySet.prototype.modal=function(a){var settings,method;if(Core.isObject(a)){settings=a;}else if(Core.isString(a)){method=a;}for(var _len27=arguments.length,args=new Array(_len27>1?_len27-1:0),_key27=1;_key27<_len27;_key27++){args[_key27-1]=arguments[_key27];}var _iterator104=_createForOfIteratorHelper(this),_step104;try{for(_iterator104.s();!(_step104=_iterator104.n()).done;){var node=_step104.value;if(!Core.isElement(node)){continue;}var modal=Modal.init(node,settings);if(method){modal[method].apply(modal,args);}}}catch(err){_iterator104.e(err);}finally{_iterator104.f();}return this;};}UI.Modal=Modal;/**
         * Popover Class
         * @class
         */var Popover=/*#__PURE__*/function(){/**
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
             */function Popover(node,settings){_classCallCheck(this,Popover);this._node=node;this._settings=Core.extend({},this.constructor.defaults,dom.getDataset(this._node),settings);this._triggers=this._settings.trigger.split(' ');this._render();this._events();if(this._settings.enable){this.enable();}dom.setData(this._node,'popover',this);}/**
             * Destroy the Popover.
             */_createClass(Popover,[{key:"destroy",value:function destroy(){if(this._popper){this._popper.destroy();}dom.remove(this._popover);if(this._triggers.includes('hover')){dom.removeEvent(this._node,'mouseover.frost.popover');dom.removeEvent(this._node,'mouseout.frost.popover');}if(this._triggers.includes('focus')){dom.removeEvent(this._node,'focus.frost.popover');dom.removeEvent(this._node,'blur.frost.popover');}if(this._triggers.includes('click')){dom.removeEvent(this._node,'click.frost.popover');}dom.removeData(this._node,'popover',this);}/**
             * Disable the Popover.
             */},{key:"disable",value:function disable(){this._enabled=false;}/**
             * Enable the Popover.
             */},{key:"enable",value:function enable(){this._enabled=true;}/**
             * Hide the Popover.
             */},{key:"hide",value:function hide(){var _this63=this;if(this._animating){dom.stop(this._popover);}if(!dom.isConnected(this._popover)||!dom.triggerOne(this._node,'hide.frost.popover')){return;}this._animating=true;dom.fadeOut(this._popover,{duration:this._settings.duration}).then(function(_){_this63._popper.destroy();dom.removeClass(_this63._popover,'show');dom.detach(_this63._popover);dom.triggerEvent(_this63._node,'hidden.frost.popover');})["catch"](function(_){})["finally"](function(_){_this63._animating=false;});}/**
             * Show the Popover.
             */},{key:"show",value:function show(){var _this64=this;if(this._animating){dom.stop(this._popover);}if(dom.isConnected(this._popover)||!dom.triggerOne(this._node,'show.frost.popover')){return;}this._show();this._animating=true;dom.addClass(this._popover,'show');dom.fadeIn(this._popover,{duration:this._settings.duration}).then(function(_){dom.triggerEvent(_this64._node,'shown.frost.popover');})["catch"](function(_){})["finally"](function(_){_this64._animating=false;});}/**
             * Toggle the Popover.
             */},{key:"toggle",value:function toggle(){dom.isConnected(this._popover)?this.hide():this.show();}/**
             * Update the Popover position.
             */},{key:"update",value:function update(){if(this._popper){this._popper.update();}}/**
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
             */}],[{key:"init",value:function init(node,settings){return dom.hasData(node,'popover')?dom.getData(node,'popover'):new this(node,settings);}}]);return Popover;}();/**
         * Popover Helpers
         */Object.assign(Popover.prototype,{/**
             * Attach events for the Popover.
             */_events:function _events(){var _this65=this;if(this._triggers.includes('hover')){dom.addEvent(this._node,'mouseover.frost.popover',function(_){if(!_this65._enabled){return;}_this65.show();});dom.addEvent(this._node,'mouseout.frost.popover',function(_){if(!_this65._enabled){return;}_this65.hide();});}if(this._triggers.includes('focus')){dom.addEvent(this._node,'focus.frost.popover',function(_){if(!_this65._enabled){return;}_this65.show();});dom.addEvent(this._node,'blur.frost.popover',function(_){if(!_this65._enabled){return;}_this65.hide();});}if(this._triggers.includes('click')){dom.addEvent(this._node,'click.frost.popover',function(e){e.preventDefault();if(!_this65._enabled){return;}_this65.toggle();});}},/**
             * Render the Popover element.
             */_render:function _render(){this._popover=dom.parseHTML(this._settings.template).shift();this._arrow=dom.find('.popover-arrow',this._popover);this._popoverHeader=dom.find('.popover-header',this._popover);this._popoverBody=dom.find('.popover-body',this._popover);},/**
             * Update the Popover and append to the DOM.
             */_show:function _show(){var method=this._settings.html?'setHTML':'setText';var title=dom.getAttribute(this._node,'title')||this._settings.title;var content=this._settings.content;dom[method](this._popoverHeader,this._settings.html&&this._settings.sanitize?this._settings.sanitize(title):title);if(!title){dom.hide(this._popoverHeader);}else{dom.show(this._popoverHeader);}dom[method](this._popoverBody,this._settings.html&&this._settings.sanitize?this._settings.sanitize(content):content);if(this._container){dom.append(this._container,this._popover);}else{dom.before(this._node,this._popover);}this._popper=new Popper(this._popover,{reference:this._node,arrow:this._arrow,placement:this._settings.placement,position:this._settings.position,fixed:this._settings.fixed,spacing:this._settings.spacing,minContact:this._settings.minContact});}});// Popover default options
Popover.defaults={template:'<div class="popover" role="tooltip">'+'<div class="popover-arrow"></div>'+'<h3 class="popover-header"></h3>'+'<div class="popover-body"></div>'+'</div>',duration:100,enable:true,html:false,sanitize:function sanitize(input){return dom.sanitize(input);},trigger:'click',placement:'auto',position:'center',fixed:false,spacing:3,minContact:false};// Add Popover QuerySet method
if(QuerySet){QuerySet.prototype.popover=function(a){var settings,method;if(Core.isObject(a)){settings=a;}else if(Core.isString(a)){method=a;}for(var _len28=arguments.length,args=new Array(_len28>1?_len28-1:0),_key28=1;_key28<_len28;_key28++){args[_key28-1]=arguments[_key28];}var _iterator105=_createForOfIteratorHelper(this),_step105;try{for(_iterator105.s();!(_step105=_iterator105.n()).done;){var node=_step105.value;if(!Core.isElement(node)){continue;}var popover=Popover.init(node,settings);if(method){popover[method].apply(popover,args);}}}catch(err){_iterator105.e(err);}finally{_iterator105.f();}return this;};}UI.Popover=Popover;/**
         * Popper Class
         * @class
         */var Popper=/*#__PURE__*/function(){/**
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
             */function Popper(node,settings){var _this66=this;_classCallCheck(this,Popper);this._node=node;this._settings=Core.extend({},this.constructor.defaults,dom.getDataset(this._node),settings);this._fixed=dom.isFixed(this._settings.reference);this._scrollParent=this.constructor.getScrollParent(this._node);this._relativeParent=this.constructor.getRelativeParent(this._node);dom.setStyle(this._node,{position:this._fixed?'fixed':'absolute',top:0,left:0});PopperSet.add(this);if(this._scrollParent){PopperSet.addOverflow(this._scrollParent,this);}dom.addEvent(this._node,'remove.frost.popper',function(_){_this66.destroy();});this.update();dom.setData(this._node,'popper',this);}/**
             * Destroy the Popper.
             */_createClass(Popper,[{key:"destroy",value:function destroy(){PopperSet.remove(this);if(this._scrollParent){PopperSet.removeOverflow(this._scrollParent,this);}dom.removeData(this._node,'popper');}/**
             * Update the Popper position.
             */},{key:"update",value:function update(){if(!dom.isConnected(this._node)){return;}// calculate boxes
var nodeBox=dom.rect(this._node,!this._fixed);var referenceBox=dom.rect(this._settings.reference,!this._fixed);var windowBox=this.constructor.windowContainer(this._fixed);// check object could be seen
if(this.constructor.isNodeHidden(nodeBox,referenceBox,windowBox,this._settings.spacing)){return;}var scrollBox=this._scrollParent?dom.rect(this._scrollParent,!this._fixed):null;var containerBox=this._settings.container?dom.rect(this._settings.container,!this._fixed):null;var minimumBox=_objectSpread({},windowBox);if(scrollBox){minimumBox.top=Math.max(minimumBox.top,scrollBox.top);minimumBox.right=Math.min(minimumBox.right,scrollBox.right);minimumBox.bottom=Math.min(minimumBox.bottom,scrollBox.bottom);minimumBox.left=Math.max(minimumBox.left,scrollBox.left);}if(containerBox){minimumBox.top=Math.max(minimumBox.top,containerBox.top);minimumBox.right=Math.min(minimumBox.right,containerBox.right);minimumBox.bottom=Math.min(minimumBox.bottom,containerBox.bottom);minimumBox.left=Math.max(minimumBox.left,containerBox.left);}if(scrollBox||containerBox){minimumBox.x=minimumBox.left;minimumBox.y=minimumBox.top;minimumBox.width=minimumBox.right-minimumBox.left;minimumBox.height=minimumBox.bottom-minimumBox.top;}// get optimal placement
var placement=this._settings.fixed?this._settings.placement:this.constructor.getPopperPlacement(nodeBox,referenceBox,minimumBox,this._settings.placement,this._settings.spacing+2);dom.setDataset(this._settings.reference,'placement',placement);dom.setDataset(this._node,'placement',placement);// get auto position
var position=this._settings.position!=='auto'?this._settings.position:this.constructor.getPopperPosition(nodeBox,referenceBox,minimumBox,placement,this._settings.position);// calculate actual offset
var offset={x:Math.round(referenceBox.x),y:Math.round(referenceBox.y)};// offset for relative parent
var relativeBox=this._relativeParent&&!this._fixed?dom.rect(this._relativeParent,!this._fixed):null;if(relativeBox){offset.x-=Math.round(relativeBox.x);offset.y-=Math.round(relativeBox.y);}// offset for placement
this.constructor.adjustPlacement(offset,nodeBox,referenceBox,placement,this._settings.spacing);// offset for position
this.constructor.adjustPosition(offset,nodeBox,referenceBox,placement,position);// compensate for margins
offset.x-=parseInt(dom.css(this._node,'margin-left'));offset.y-=parseInt(dom.css(this._node,'margin-top'));// corrective positioning
this.constructor.adjustConstrain(offset,nodeBox,referenceBox,minimumBox,relativeBox,placement,this._settings.minContact);// compensate for scroll parent
if(this._scrollParent){offset.x+=dom.getScrollX(this._scrollParent);offset.y+=dom.getScrollY(this._scrollParent);}// update position
var style={};if(this._settings.useGpu){style.transform='translate3d('+offset.x+'px , '+offset.y+'px , 0)';}else{style.marginLeft=offset.x;style.marginTop=offset.y;}dom.setStyle(this._node,style);// update arrow
if(this._settings.arrow){var newNodeBox=dom.rect(this._node,!this._fixed);this._updateArrow(newNodeBox,referenceBox,placement,position);}}/**
             * Update the position of the arrow for the actual placement and position.
             * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
             * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
             * @param {string} placement The actual placement of the Popper.
             * @param {string} position The actual position of the Popper.
             */},{key:"_updateArrow",value:function _updateArrow(nodeBox,referenceBox,placement,position){var arrowStyles={position:'absolute',top:'',right:'',bottom:'',left:''};dom.setStyle(this._settings.arrow,arrowStyles);var arrowBox=dom.rect(this._settings.arrow,!this._fixed);if(['top','bottom'].includes(placement)){arrowStyles[placement==='top'?'bottom':'top']=-arrowBox.height;var diff=(referenceBox.width-nodeBox.width)/2;var offset=nodeBox.width/2-arrowBox.width/2;if(position==='start'){offset+=diff;}else if(position==='end'){offset-=diff;}arrowStyles.left=Core.clamp(offset,Math.max(referenceBox.left,nodeBox.left)-arrowBox.left,Math.min(referenceBox.right,nodeBox.right)-arrowBox.left-arrowBox.width);}else{arrowStyles[placement==='right'?'left':'right']=-arrowBox.width;var _diff=(referenceBox.height-nodeBox.height)/2;var _offset=nodeBox.height/2-arrowBox.height;if(position==='start'){_offset+=_diff;}else if(position==='end'){_offset-=_diff;}arrowStyles.top=Core.clamp(_offset,Math.max(referenceBox.top,nodeBox.top)-arrowBox.top,Math.min(referenceBox.bottom,nodeBox.bottom)-arrowBox.top-arrowBox.height);}dom.setStyle(this._settings.arrow,arrowStyles);}}]);return Popper;}();/**
         * PopperSet Class
         * @class
         */var PopperSet=/*#__PURE__*/function(){function PopperSet(){_classCallCheck(this,PopperSet);}_createClass(PopperSet,null,[{key:"add",/**
             * Add a Popper to the set.
             * @param {Popper} popper The popper to add.
             */value:function add(popper){var _this67=this;this._poppers.push(popper);if(this._running){return;}dom.addEvent(window,'resize.frost.popper scroll.frost.popper',Core.animation(function(_){var _iterator106=_createForOfIteratorHelper(_this67._poppers),_step106;try{for(_iterator106.s();!(_step106=_iterator106.n()).done;){var _popper=_step106.value;_popper.update();}}catch(err){_iterator106.e(err);}finally{_iterator106.f();}}));this._running=true;}/**
             * Add a Popper to a scrolling parent set.
             * @param {HTMLElement} scrollParent The scrolling container element.
             * @param {Popper} popper The popper to add.
             */},{key:"addOverflow",value:function addOverflow(scrollParent,popper){var _this68=this;if(!this._popperOverflows.has(scrollParent)){this._popperOverflows.set(scrollParent,[]);dom.addEvent(scrollParent,'scroll.frost.popper',Core.animation(function(_){var _iterator107=_createForOfIteratorHelper(_this68._popperOverflows.get(scrollParent)),_step107;try{for(_iterator107.s();!(_step107=_iterator107.n()).done;){var _popper2=_step107.value;_popper2.update();}}catch(err){_iterator107.e(err);}finally{_iterator107.f();}}));}this._popperOverflows.get(scrollParent).push(popper);}/**
             * Remove a Popper from the set.
             * @param {Popper} popper The popper to remove.
             */},{key:"remove",value:function remove(popper){this._poppers=this._poppers.filter(function(oldPopper){return oldPopper!==popper;});if(this._poppers.length){return;}dom.removeEvent(window,'resize.frost.popper scroll.frost.popper');this._running=false;}/**
             * Remove a Popper from a scrolling parent set.
             * @param {HTMLElement} scrollParent The scrolling container element.
             * @param {Popper} popper The popper to remove.
             */},{key:"removeOverflow",value:function removeOverflow(scrollParent,popper){if(!this._popperOverflows.has(scrollParent)){return;}var poppers=this._popperOverflows.get(scrollParent).filter(function(oldPopper){return oldPopper!==popper;});if(poppers.length){this._popperOverflows.set(scrollParent,poppers);return;}this._popperOverflows["delete"](scrollParent);dom.removeEvent(scrollParent,'scroll.frost.popper');}}]);return PopperSet;}();/**
         * Popper Static
         */Object.assign(Popper,{/**
             * Constrain the offset within the minimumBox.
             * @param {object} offset The offset object.
             * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
             * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
             * @param {object} minimumBox The computed minimum bounding rectangle of the container.
             * @param {DOMRect} [relativeBox] The computed bounding rectangle of the relative parent.
             * @param {string} placement The actual placement of the Popper.
             * @param {number} [minContact] The minimum amount of contact to make with the reference node.
             */adjustConstrain:function adjustConstrain(offset,nodeBox,referenceBox,minimumBox,relativeBox,placement,minContact){if(['left','right'].includes(placement)){var offsetY=offset.y;var refTop=referenceBox.top;if(relativeBox){offsetY+=relativeBox.top;refTop-=relativeBox.top;}var minSize=minContact!==false?minContact:referenceBox.height;if(offsetY+nodeBox.height>minimumBox.bottom){// bottom of offset node is below the container
var diff=offsetY+nodeBox.height-minimumBox.bottom;offset.y=Math.max(refTop-nodeBox.height+minSize,offset.y-diff);}else if(offsetY<minimumBox.top){// top of offset node is above the container
var _diff2=offsetY-minimumBox.top;offset.y=Math.min(refTop+referenceBox.height-minSize,offset.y-_diff2);}}else{var offsetX=offset.x;var refLeft=referenceBox.left;if(relativeBox){offsetX+=relativeBox.left;refLeft-=relativeBox.left;}var _minSize=minContact!==false?minContact:referenceBox.width;if(offsetX+nodeBox.width>minimumBox.right){// right of offset node is to the right of the container
var _diff3=offsetX+nodeBox.width-minimumBox.right;offset.x=Math.max(refLeft-nodeBox.width+_minSize,offset.x-_diff3);}else if(offsetX<minimumBox.left){// left of offset node is to the left of the container
var _diff4=offsetX-minimumBox.left;offset.x=Math.min(refLeft+referenceBox.width-_minSize,offset.x-_diff4);}}},/**
             * Adjust the offset for the placement.
             * @param {object} offset The offset object.
             * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
             * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
             * @param {string} placement The actual placement of the Popper.
             * @param {number} spacing The amount of spacing to use.
             */adjustPlacement:function adjustPlacement(offset,nodeBox,referenceBox,placement,spacing){if(placement==='top'){offset.y-=Math.round(nodeBox.height)+spacing;}else if(placement==='right'){offset.x+=Math.round(referenceBox.width)+spacing;}else if(placement==='bottom'){offset.y+=Math.round(referenceBox.height)+spacing;}else if(placement==='left'){offset.x-=Math.round(nodeBox.width)+spacing;}},/**
             * Adjust the offset for the position.
             * @param {object} offset The offset object.
             * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
             * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
             * @param {string} placement The actual placement of the Popper.
             * @param {string} position The actual position of the Popper.
             */adjustPosition:function adjustPosition(offset,nodeBox,referenceBox,placement,position){if(position==='start'){return;}if(['top','bottom'].includes(placement)){var deltaX=Math.round(nodeBox.width)-Math.round(referenceBox.width);if(position==='center'){offset.x-=Math.round(deltaX/2);}else if(position==='end'){offset.x-=deltaX;}}else{var deltaY=Math.round(nodeBox.height)-Math.round(referenceBox.height);if(position==='center'){offset.y-=Math.round(deltaY/2);}else if(position==='end'){offset.y-=deltaY;}}},/**
             * Get the actual placement of the Popper.
             * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
             * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
             * @param {object} minimumBox The computed minimum bounding rectangle of the container.
             * @param {string} placement The initial placement of the Popper.
             * @param {number} spacing The amount of spacing to use.
             * @returns {string} The new placement of the Popper.
             */getPopperPlacement:function getPopperPlacement(nodeBox,referenceBox,minimumBox,placement,spacing){var spaceTop=referenceBox.top-minimumBox.top;var spaceRight=minimumBox.right-referenceBox.right;var spaceBottom=minimumBox.bottom-referenceBox.bottom;var spaceLeft=referenceBox.left-minimumBox.left;if(placement==='top'){// if node is bigger than space top and there is more room on bottom
if(spaceTop<nodeBox.height+spacing&&spaceBottom>spaceTop){return'bottom';}}else if(placement==='right'){// if node is bigger than space right and there is more room on left
if(spaceRight<nodeBox.width+spacing&&spaceLeft>spaceRight){return'left';}}else if(placement==='bottom'){// if node is bigger than space bottom and there is more room on top
if(spaceBottom<nodeBox.height+spacing&&spaceTop>spaceBottom){return'top';}}else if(placement==='left'){// if node is bigger than space left and there is more room on right
if(spaceLeft<nodeBox.width+spacing&&spaceRight>spaceLeft){return'right';}}else if(placement==='auto'){var maxVSpace=Math.max(spaceTop,spaceBottom);var maxHSpace=Math.max(spaceRight,spaceLeft);var minVSpace=Math.min(spaceTop,spaceBottom);if(maxHSpace>maxVSpace&&maxHSpace>=nodeBox.width+spacing&&minVSpace+referenceBox.height>=nodeBox.height+spacing-Math.max(0,nodeBox.height-referenceBox.height)){return spaceLeft>spaceRight?'left':'right';}var minHSpace=Math.min(spaceRight,spaceLeft);if(maxVSpace>=nodeBox.height+spacing&&minHSpace+referenceBox.width>=nodeBox.width+spacing-Math.max(0,nodeBox.width-referenceBox.width)){return spaceBottom>spaceTop?'bottom':'top';}var maxSpace=Math.max(maxVSpace,maxHSpace);if(spaceBottom===maxSpace&&spaceBottom>=nodeBox.height+spacing){return'bottom';}if(spaceTop===maxSpace&&spaceTop>=nodeBox.height+spacing){return'top';}if(spaceRight===maxSpace&&spaceRight>=nodeBox.width+spacing){return'right';}if(spaceLeft===maxSpace&&spaceLeft>=nodeBox.width+spacing){return'left';}return'bottom';}return placement;},/**
             * Get the actual position of the Popper.
             * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
             * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
             * @param {object} minimumBox The computed minimum bounding rectangle of the container.
             * @param {string} placement The actual placement of the Popper.
             * @param {string} position The initial position of the Popper.
             * @returns {string} The new position of the Popper.
             */getPopperPosition:function getPopperPosition(nodeBox,referenceBox,minimumBox,placement,position){var deltaX=nodeBox.width-referenceBox.width;var deltaY=nodeBox.height-referenceBox.height;if(['bottom','top'].includes(placement)){var spaceLeft=referenceBox.left-minimumBox.left;var spaceRight=minimumBox.right-referenceBox.right;if(position==='start'){if(spaceRight<deltaX){if(spaceLeft>=deltaX/2&&spaceRight>=deltaX/2){return'center';}if(spaceLeft>=deltaX){return'end';}}}else if(position==='center'){if(spaceLeft<deltaX/2||spaceRight<deltaX/2){if(spaceRight>=deltaX){return'start';}if(spaceLeft>=deltaX){return'end';}}}else if(position==='end'){if(spaceLeft<deltaX){if(spaceLeft>=deltaX/2&&spaceRight>=deltaX/2){return'center';}if(spaceRight>=deltaX){return'start';}}}}else{var spaceTop=referenceBox.top-minimumBox.top;var spaceBottom=minimumBox.bottom-referenceBox.bottom;if(position==='start'){if(spaceBottom<deltaY){if(spaceBottom>=deltaY/2&&spaceTop>=deltaY/2){return'center';}if(spaceTop>=deltaY){return'end';}}}else if(position==='center'){if(spaceTop<deltaY/2||spaceBottom<deltaY/2){if(spaceBottom>=deltaY){return'start';}if(spaceTop>=deltaY){return'end';}}}else if(position==='end'){if(spaceTop<deltaY){if(spaceTop>=deltaY/2&&spaceBottom>=deltaY/2){return'center';}if(spaceBottom>=deltaY){return'start';}}}}return position;},/**
             * Get the relative parent of the node.
             * @param {HTMLElement} node The input node.
             * @return {HTMLElement} The relative parent.
             */getRelativeParent:function getRelativeParent(node){return dom.closest(node,function(parent){return dom.css(parent,'position')==='relative';},document.body).shift();},/**
             * Get the scroll parent of the node.
             * @param {HTMLElement} node The input node.
             * @return {HTMLElement} The scroll parent.
             */getScrollParent:function getScrollParent(node){return dom.closest(node,function(parent){return!!['overflow','overflowX','overflowY'].find(function(overflow){return!!['auto','scroll'].find(function(value){return new RegExp(value).test(dom.css(parent,overflow));});});},document.body).shift();},/**
             * Returns true if the node can not be visible inside the window.
             * @param {object} offset The offset object.
             * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
             * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
             * @param {object} windowContainer The computed bounding rectangle of the window.
             * @param {number} spacing The amount of spacing to use.
             * @returns {Boolean} TRUE if the node can not be visible inside the window, otherwise FALSE.
             */isNodeHidden:function isNodeHidden(nodeBox,referenceBox,windowContainer,spacing){return windowContainer.top>referenceBox.bottom+nodeBox.height+spacing||windowContainer.left>referenceBox.right+nodeBox.width+spacing||windowContainer.bottom<referenceBox.top-nodeBox.height-spacing||windowContainer.right<referenceBox.left-nodeBox.width-spacing;},/**
             * Calculate the computed bounding rectangle of the window.
             * @param {Boolean} fixed Whether the Popper is fixed.
             * @returns {object} The computed bounding rectangle of the window.
             */windowContainer:function windowContainer(fixed){var scrollX=fixed?0:dom.getScrollX(window);var scrollY=fixed?0:dom.getScrollY(window);var windowWidth=dom.width(document);var windowHeight=dom.height(document);return{x:scrollX,y:scrollY,width:windowWidth,height:windowHeight,top:scrollY,right:scrollX+windowWidth,bottom:scrollY+windowHeight,left:scrollX};}});// Popper default options
Popper.defaults={reference:null,container:null,arrow:null,placement:'bottom',position:'center',fixed:false,spacing:0,minContact:false,useGpu:true};PopperSet._poppers=[];PopperSet._popperOverflows=new Map();UI.Popper=Popper;UI.PopperSet=PopperSet;// Ripple events
dom.addEventDelegate(document,'mousedown.frost.ripple','.ripple',function(e){var pos=dom.position(e.currentTarget,true);UI.ripple(e.currentTarget,e.pageX-pos.x,e.pageY-pos.y);});/**
         * Create a ripple effect on a node.
         * @param {HTMLElement} node The input node.
         * @param {number} x The x position to start the ripple from.
         * @param {number} y The y position to start the ripple from.
         * @param {number} [duration=500] The duration of the ripple.
         */UI.ripple=function(node,x,y){var duration=arguments.length>3&&arguments[3]!==undefined?arguments[3]:500;var width=dom.width(node);var height=dom.height(node);var scaleMultiple=Math.max(width,height);var ripple=dom.create('span',{"class":'ripple-effect',style:{left:x,top:y}});dom.append(node,ripple);dom.animate(ripple,function(node,progress){dom.setStyle(node,{scale:Math.floor(progress*scaleMultiple),opacity:1-progress});},{duration:duration})["finally"](function(_){dom.remove(ripple);});};/**
         * Tab Class
         * @class
         */var Tab=/*#__PURE__*/function(){/**
             * New Tab constructor.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Tab with.
             * @param {number} [settings.duration=100] The duration of the animation.
             * @returns {Tab} A new Tab object.
             */function Tab(node,settings){_classCallCheck(this,Tab);this._node=node;this._settings=Core.extend({},this.constructor.defaults,dom.getDataset(this._node),settings);var selector=UI.getTargetSelector(this._node);this._target=dom.findOne(selector);this._siblings=dom.siblings(this._node);dom.setData(this._node,'tab',this);}/**
             * Destroy the Tab.
             */_createClass(Tab,[{key:"destroy",value:function destroy(){dom.removeData(this._node,'tab');}/**
             * Hide the current Tab.
             */},{key:"hide",value:function hide(){var _this69=this;if(this._animating||!dom.hasClass(this._target,'active')||!dom.triggerOne(this._node,'hide.frost.tab')){return;}this._animating=true;dom.fadeOut(this._target,{duration:this._settings.duration}).then(function(_){dom.removeClass(_this69._target,'active');dom.removeClass(_this69._node,'active');dom.setAttribute(_this69._node,'aria-selected',false);dom.triggerEvent(_this69._node,'hidden.frost.tab');})["catch"](function(_){})["finally"](function(_){_this69._animating=false;});}/**
             * Hide any active Tabs, and show the current Tab.
             */},{key:"show",value:function show(){var _this70=this;if(this._animating||dom.hasClass(this._target,'active')||!dom.triggerOne(this._node,'show.frost.tab')){return;}var active=this._siblings.find(function(sibling){return dom.hasClass(sibling,'active');});var activeTab;if(active){activeTab=this.constructor.init(active);if(activeTab._animating){return;}}if(!dom.triggerOne(this._node,'show.frost.tab')){return;}var show=function show(_){_this70._animating=true;dom.addClass(_this70._target,'active');dom.addClass(_this70._node,'active');dom.fadeIn(_this70._target,{duration:_this70._settings.duration}).then(function(_){dom.setAttribute(_this70._node,'aria-selected',true);dom.triggerEvent(_this70._node,'shown.frost.tab');})["catch"](function(_){})["finally"](function(_){_this70._animating=false;});};if(!activeTab){return show();}if(!dom.triggerOne(active,'hide.frost.tab')){return;}dom.addEventOnce(active,'hidden.frost.tab',function(_){show();});activeTab.hide();}/**
             * Initialize a Tab.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Tab with.
             * @param {number} [settings.duration=100] The duration of the animation.
             * @returns {Tab} A new Tab object.
             */}],[{key:"init",value:function init(node,settings){return dom.hasData(node,'tab')?dom.getData(node,'tab'):new this(node,settings);}}]);return Tab;}();// Tab default options
Tab.defaults={duration:100};// Tab events
dom.addEventDelegate(document,'click.frost.tab','[data-toggle="tab"]',function(e){e.preventDefault();var tab=Tab.init(e.currentTarget);tab.show();});// Tab QuerySet method
if(QuerySet){QuerySet.prototype.tab=function(a){var settings,method;if(Core.isObject(a)){settings=a;}else if(Core.isString(a)){method=a;}for(var _len29=arguments.length,args=new Array(_len29>1?_len29-1:0),_key29=1;_key29<_len29;_key29++){args[_key29-1]=arguments[_key29];}var _iterator108=_createForOfIteratorHelper(this),_step108;try{for(_iterator108.s();!(_step108=_iterator108.n()).done;){var node=_step108.value;if(!Core.isElement(node)){continue;}var tab=Tab.init(node,settings);if(method){tab[method].apply(tab,args);}}}catch(err){_iterator108.e(err);}finally{_iterator108.f();}return this;};}UI.Tab=Tab;/**
         * Toast Class
         * @class
         */var Toast=/*#__PURE__*/function(){/**
             * New Toast constructor.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Toast with.
             * @param {Boolean} [autohide=true] Whether to hide the toast after initialization.
             * @param {number} [settings.delay=5000] The duration to wait before hiding the toast.
             * @param {number} [settings.duration=100] The duration of the animation.
             * @returns {Toast} A new Toast object.
             */function Toast(node,settings){var _this71=this;_classCallCheck(this,Toast);this._node=node;this._settings=Core.extend({},this.constructor.defaults,dom.getDataset(this._node),settings);if(this._settings.autohide){setTimeout(function(_){return _this71.hide();},this._settings.delay);}dom.setData(this._node,'toast',this);}/**
             * Destroy the Toast.
             */_createClass(Toast,[{key:"destroy",value:function destroy(){dom.removeData(this._node,'toast');}/**
             * Hide the Toast.
             */},{key:"hide",value:function hide(){var _this72=this;if(this._animating||!dom.isVisible(this._node)||!dom.triggerOne(this._node,'hide.frost.toast')){return;}this._animating=true;dom.fadeOut(this._node,{duration:this._settings.duration}).then(function(_){dom.hide(_this72._node);dom.triggerEvent(_this72._node,'hidden.frost.toast');})["catch"](function(_){})["finally"](function(_){_this72._animating=false;});}/**
             * Show the Toast.
             */},{key:"show",value:function show(){var _this73=this;if(this._animating||dom.isVisible(this._node)||!dom.triggerOne(this._node,'show.frost.toast')){return;}this._animating=true;dom.show(this._node);dom.fadeIn(this._node,{duration:this._settings.duration}).then(function(_){dom.triggerEvent(_this73._node,'shown.frost.toast');})["catch"](function(_){})["finally"](function(_){_this73._animating=false;});}/**
             * Initialize a Toast.
             * @param {HTMLElement} node The input node.
             * @param {object} [settings] The options to create the Toast with.
             * @param {Boolean} [autohide=true] Whether to hide the toast after initialization.
             * @param {number} [settings.delay=5000] The duration to wait before hiding the toast.
             * @param {number} [settings.duration=100] The duration of the animation.
             * @returns {Toast} A new Toast object.
             */}],[{key:"init",value:function init(node,settings){return dom.hasData(node,'toast')?dom.getData(node,'toast'):new this(node,settings);}}]);return Toast;}();// Toast default options
Toast.defaults={autohide:true,delay:5000,duration:100};// Auto-initialize Toast from data-toggle
dom.addEventDelegate(document,'click.frost.toast','[data-dismiss="toast"]',function(e){e.preventDefault();var target=UI.getTarget(e.currentTarget,'.toast');var toast=Toast.init(target,{autohide:false});toast.hide();});// Toast QuerySet method
if(QuerySet){QuerySet.prototype.toast=function(a){var settings,method;if(Core.isObject(a)){settings=a;}else if(Core.isString(a)){method=a;}for(var _len30=arguments.length,args=new Array(_len30>1?_len30-1:0),_key30=1;_key30<_len30;_key30++){args[_key30-1]=arguments[_key30];}var _iterator109=_createForOfIteratorHelper(this),_step109;try{for(_iterator109.s();!(_step109=_iterator109.n()).done;){var node=_step109.value;if(!Core.isElement(node)){continue;}var toast=Toast.init(node,settings);if(method){toast[method].apply(toast,args);}}}catch(err){_iterator109.e(err);}finally{_iterator109.f();}return this;};}UI.Toast=Toast;/**
         * Tooltip Class
         * @class
         */var Tooltip=/*#__PURE__*/function(){/**
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
             */function Tooltip(node,settings){_classCallCheck(this,Tooltip);this._node=node;this._settings=Core.extend({},this.constructor.defaults,dom.getDataset(this._node),settings);this._triggers=this._settings.trigger.split(' ');this._render();this._events();if(this._settings.enable){this.enable();}dom.setData(this._node,'tooltip',this);}/**
             * Destroy the Tooltip.
             */_createClass(Tooltip,[{key:"destroy",value:function destroy(){if(this._popper){this._popper.destroy();}dom.remove(this._tooltip);if(this._triggers.includes('hover')){dom.removeEvent(this._node,'mouseover.frost.tooltip');dom.removeEvent(this._node,'mouseout.frost.tooltip');}if(this._triggers.includes('focus')){dom.removeEvent(this._node,'focus.frost.tooltip');dom.removeEvent(this._node,'blur.frost.tooltip');}if(this._triggers.includes('click')){dom.removeEvent(this._node,'click.frost.tooltip');}dom.removeData(this._node,'tooltip',this);}/**
             * Disable the Tooltip.
             */},{key:"disable",value:function disable(){this._enabled=false;}/**
             * Enable the Tooltip.
             */},{key:"enable",value:function enable(){this._enabled=true;}/**
             * Hide the Tooltip.
             */},{key:"hide",value:function hide(){var _this74=this;if(this._animating){dom.stop(this._tooltip);}if(!dom.isConnected(this._tooltip)||!dom.triggerOne(this._node,'hide.frost.tooltip')){return;}this._animating=true;dom.fadeOut(this._tooltip,{duration:this._settings.duration}).then(function(_){_this74._popper.destroy();dom.removeClass(_this74._tooltip,'show');dom.detach(_this74._tooltip);dom.triggerEvent(_this74._node,'hidden.frost.tooltip');})["catch"](function(_){})["finally"](function(_){_this74._animating=false;});}/**
             * Show the Tooltip.
             */},{key:"show",value:function show(){var _this75=this;if(this._animating){dom.stop(this._tooltip);}if(dom.isConnected(this._tooltip)||!dom.triggerOne(this._node,'show.frost.tooltip')){return;}this._show();this._animating=true;dom.addClass(this._tooltip,'show');dom.fadeIn(this._tooltip,{duration:this._settings.duration}).then(function(_){dom.triggerEvent(_this75._node,'shown.frost.tooltip');})["catch"](function(_){})["finally"](function(_){_this75._animating=false;});}/**
             * Toggle the Tooltip.
             */},{key:"toggle",value:function toggle(){dom.isConnected(this._tooltip)?this.hide():this.show();}/**
             * Update the Tooltip position.
             */},{key:"update",value:function update(){if(this._popper){this._popper.update();}}/**
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
             */}],[{key:"init",value:function init(node,settings){return dom.hasData(node,'tooltip')?dom.getData(node,'tooltip'):new this(node,settings);}}]);return Tooltip;}();/**
         * Tooltip Helpers
         */Object.assign(Tooltip.prototype,{/**
             * Attach events for the Tooltip.
             */_events:function _events(){var _this76=this;if(this._triggers.includes('hover')){dom.addEvent(this._node,'mouseover.frost.popover',function(_){if(!_this76._enabled){return;}_this76.show();});dom.addEvent(this._node,'mouseout.frost.popover',function(_){if(!_this76._enabled){return;}_this76.hide();});}if(this._triggers.includes('focus')){dom.addEvent(this._node,'focus.frost.popover',function(_){if(!_this76._enabled){return;}_this76.show();});dom.addEvent(this._node,'blur.frost.popover',function(_){if(!_this76._enabled){return;}_this76.hide();});}if(this._triggers.includes('click')){dom.addEvent(this._node,'click.frost.popover',function(e){e.preventDefault();if(!_this76._enabled){return;}_this76.toggle();});}},/**
             * Render the Tooltip element.
             */_render:function _render(){this._tooltip=dom.parseHTML(this._settings.template).shift();this._arrow=dom.find('.tooltip-arrow',this._tooltip);this._tooltipInner=dom.find('.tooltip-inner',this._tooltip);},/**
             * Update the Tooltip and append to the DOM.
             */_show:function _show(){var title=dom.getAttribute(this._node,'title')||this._settings.title;var method=this._settings.html?'setHTML':'setText';dom[method](this._tooltipInner,this._settings.html&&this._settings.sanitize?this._settings.sanitize(title):title);if(this._container){dom.append(this._container,this._tooltip);}else{dom.before(this._node,this._tooltip);}this._popper=new Popper(this._tooltip,{reference:this._node,arrow:this._arrow,placement:this._settings.placement,position:this._settings.position,fixed:this._settings.fixed,spacing:this._settings.spacing,minContact:this._settings.minContact});}});// Tooltip default options
Tooltip.defaults={template:'<div class="tooltip" role="tooltip">'+'<div class="tooltip-arrow"></div>'+'<div class="tooltip-inner"></div>'+'</div>',duration:100,enable:true,html:false,trigger:'hover focus',sanitize:function sanitize(input){return dom.sanitize(input);},placement:'auto',position:'center',fixed:false,spacing:2,minContact:false};// Tooltip QuerySet method
if(QuerySet){QuerySet.prototype.tooltip=function(a){var settings,method;if(Core.isObject(a)){settings=a;}else if(Core.isString(a)){method=a;}for(var _len31=arguments.length,args=new Array(_len31>1?_len31-1:0),_key31=1;_key31<_len31;_key31++){args[_key31-1]=arguments[_key31];}var _iterator110=_createForOfIteratorHelper(this),_step110;try{for(_iterator110.s();!(_step110=_iterator110.n()).done;){var node=_step110.value;if(!Core.isElement(node)){continue;}var tooltip=Tooltip.init(node,settings);if(method){tooltip[method].apply(tooltip,args);}}}catch(err){_iterator110.e(err);}finally{_iterator110.f();}return this;};}UI.Tooltip=Tooltip;return{UI:UI};});return{AjaxRequest:window.AjaxRequest,Animation:window.Animation,AnimationSet:window.AnimationSet,Core:window.Core,DOM:window.DOM,dom:window.dom,QuerySet:QuerySet,QuerySetImmutable:QuerySetImmutable,UI:UI};});