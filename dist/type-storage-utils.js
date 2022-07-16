(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.typeStorage = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  var getType = function getType(v) {
    if (v == null) {
      return "".concat(v);
    }

    var type = _typeof(v);

    return !/^(object|function)$/.test(type) ? type : Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
  };

  var error = function error(v) {
    throw new Error(v);
  };

  var RANDOMS = "0.697504399278988";

  var strategies$1 = {
    string: function string(value) {
      return "".concat(RANDOMS, "|string|").concat(value);
    },
    number: function number(value) {
      return "".concat(RANDOMS, "|number|").concat(value);
    },
    "boolean": function boolean(value) {
      return "".concat(RANDOMS, "|boolean|").concat(value);
    },
    "null": function _null(value) {
      return "".concat(RANDOMS, "|null|").concat(value);
    },
    undefined: function undefined$1(value) {
      return "".concat(RANDOMS, "|undefined|").concat(value);
    },
    array: function array(value) {
      return "".concat(RANDOMS, "|array|").concat(JSON.stringify(value));
    },
    object: function object(value) {
      return "".concat(RANDOMS, "|object|").concat(JSON.stringify(value));
    }
  };

  var setItem = function setItem(key, value) {
    try {
      // get value's type
      var type = getType(value);
      value = strategies$1[type](value);
      return window.localStorage.setItem(key, value);
    } catch (e) {
      console.log(e); // error(e.message)
    }
  };

  var strategies = {
    string: function string(value) {
      return value;
    },
    number: function number(value) {
      return Number(value);
    },
    "boolean": function boolean(value) {
      return value === 'true' ? true : false;
    },
    "null": function _null() {
      return null;
    },
    undefined: function (_undefined) {
      function undefined$1() {
        return _undefined.apply(this, arguments);
      }

      undefined$1.toString = function () {
        return _undefined.toString();
      };

      return undefined$1;
    }(function () {
      return undefined;
    }),
    array: function array(value) {
      return JSON.parse(value);
    },
    object: function object(value) {
      return JSON.parse(value);
    }
  };

  var getItem = function getItem(key) {
    try {
      var value = window.localStorage.getItem(key); // nonexistent key

      if (value === null) {
        return null;
      }

      var parts = value.split('|');
      var hasType = parts[0] === RANDOMS;

      if (hasType) {
        var type = parts[1];
        return strategies[type](value.slice(RANDOMS.length + type.length + 2));
      }

      return value;
    } catch (e) {
      error(e);
    }
  };

  var removeItem = function removeItem(key) {
    try {
      return window.localStorage.removeItem(key);
    } catch (e) {
      error(e);
    }
  };

  var clear = function clear() {
    try {
      return window.localStorage.clear();
    } catch (e) {
      error(e);
    }
  };

  var used = function used() {
    var stored = Object.entries(localStorage);
    var storage = 5 * 1024 * 1024; // 5MB

    var _used = 0;

    for (var i = 0, l = stored.length; i < l; i++) {
      var item = stored[i];
      _used += item[0].length + item[1].length;
    }

    return "".concat((_used / storage).toFixed(6), "%");
  };

  var init = function init(localStorage) {
    localStorage.setItem = setItem;
    localStorage.getItem = getItem;
    localStorage.removeItem = removeItem;
    localStorage.clear = clear;
    localStorage.used = used;
  };

  var typeStorage = {
    localStorage: {},
    sessionStorage: {}
  };
  init(typeStorage.localStorage);

  return typeStorage;

}));
