(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.typeStorage = factory());
})(this, (function () { 'use strict';

  var RANDOMS = '0.697504399278988';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var getType = function getType(v) {
    if (v == null) {
      return "".concat(v);
    }

    var type = _typeof(v);

    return !/^(object|function)$/.test(type) ? type : Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
  };

  var error = function error(v) {
    console.error(v);
  };

  var getStorageType = function getStorageType() {
    return this === typeStorage.localStorage ? 'localStorage' : 'sessionStorage';
  };

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
    },
    date: function date(value) {
      return "".concat(RANDOMS, "|date|").concat(value);
    }
  };

  var setItem = function setItem(key, value) {
    var storageType = getStorageType.call(this);

    try {
      // get value's type
      var type = getType(value);
      value = strategies$1[type](value);
      return window[storageType].setItem(key, value);
    } catch (e) {
      error(e);
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
    },
    date: function date(value) {
      return new Date(value);
    }
  };

  var getItem = function getItem(key) {
    var storageType = getStorageType.call(this);

    try {
      var value = window[storageType].getItem(key); // nonexistent key

      if (value === null) {
        return value;
      }

      var parts = value.split('|');
      var hasType = parts[0] == RANDOMS;

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
    var storageType = getStorageType.call(this);

    try {
      return window[storageType].removeItem(key);
    } catch (e) {
      error(e);
    }
  };

  var clear = function clear() {
    var storageType = getStorageType.call(this);

    try {
      return window[storageType].clear();
    } catch (e) {
      error(e);
    }
  };

  var used = function used() {
    var storageType = getStorageType.call(this);
    var maxLength = 5 * 1024 * 1024; // 5MB

    var _used = 0;

    for (var _i = 0, _Object$entries = Object.entries(window[storageType]); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      _used += key.length + value.length;
    }

    return "".concat((_used / maxLength).toFixed(6), "%");
  };

  var init = function init(storage) {
    storage.setItem = setItem;
    storage.getItem = getItem;
    storage.removeItem = removeItem;
    storage.clear = clear;
    storage.used = used;
  };

  var typeStorage$1 = {
    localStorage: {},
    sessionStorage: {}
  }; // mount methods

  var keys = Object.keys(typeStorage$1);

  for (var i = 0, key; key = keys[i++];) {
    init(typeStorage$1[key]);
  }

  return typeStorage$1;

}));
