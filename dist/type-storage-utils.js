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

  var isExpired = function isExpired(expiredTime) {
    return Date.now() >= expiredTime;
  };

  var strategies$1 = {
    string: function string(value, expiredTime) {
      return expiredTime ? "".concat(RANDOMS, "|string|").concat(RANDOMS, "-").concat(expiredTime, "-").concat(value) : "".concat(RANDOMS, "|string|").concat(value);
    },
    number: function number(value, expiredTime) {
      return expiredTime ? "".concat(RANDOMS, "|number|").concat(RANDOMS, "-").concat(expiredTime, "-").concat(value) : "".concat(RANDOMS, "|number|").concat(value);
    },
    "boolean": function boolean(value, expiredTime) {
      return expiredTime ? "".concat(RANDOMS, "|boolean|").concat(RANDOMS, "-").concat(expiredTime, "-").concat(value) : "".concat(RANDOMS, "|boolean|").concat(value);
    },
    "null": function _null(value, expiredTime) {
      return expiredTime ? "".concat(RANDOMS, "|null|").concat(RANDOMS, "-").concat(expiredTime, "-").concat(value) : "".concat(RANDOMS, "|null|").concat(value);
    },
    undefined: function undefined$1(value, expiredTime) {
      return expiredTime ? "".concat(RANDOMS, "|undefined|").concat(RANDOMS, "-").concat(expiredTime, "-").concat(value) : "".concat(RANDOMS, "|undefined|").concat(value);
    },
    array: function array(value, expiredTime) {
      return expiredTime ? "".concat(RANDOMS, "|array|").concat(RANDOMS, "-").concat(expiredTime, "-").concat(JSON.stringify(value)) : "".concat(RANDOMS, "|array|").concat(JSON.stringify(value));
    },
    object: function object(value, expiredTime) {
      return expiredTime ? "".concat(RANDOMS, "|object|").concat(RANDOMS, "-").concat(expiredTime, "-").concat(JSON.stringify(value)) : "".concat(RANDOMS, "|object|").concat(JSON.stringify(value));
    },
    date: function date(value, expiredTime) {
      return expiredTime ? "".concat(RANDOMS, "|date|").concat(RANDOMS, "-").concat(expiredTime, "-").concat(value) : "".concat(RANDOMS, "|date|").concat(value);
    }
  };

  var setItem = function setItem(key, value, expiredTime) {
    try {
      var storageType = getStorageType.call(this);
      var type = getType(value);
      expiredTime = getType(expiredTime) === 'number' ? Date.now() + expiredTime * 1000 : expiredTime.getTime();
      var formattedValue = strategies$1[type](value, expiredTime);
      return window[storageType].setItem(key, formattedValue);
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
    try {
      var storageType = getStorageType.call(this);
      var value = window[storageType].getItem(key); // nonexistent key

      if (value === null) {
        return value;
      }

      var parts = value.split('|');
      var hasType = parts[0] === RANDOMS;
      var segments = parts[2].split('-');
      var hasExpiredTime = segments[0] === RANDOMS;

      if (hasType) {
        var expiredTime = segments[1];

        if (hasExpiredTime && isExpired(expiredTime)) {
          return null;
        }

        var type = parts[1];

        var _value = hasExpiredTime ? parts[2].slice(RANDOMS.length + expiredTime.length + 2) : value.slice(RANDOMS.length + type.length + 2);

        return strategies[type](_value);
      }

      return value;
    } catch (e) {
      error(e);
    }
  };

  var removeItem = function removeItem(key) {
    try {
      var storageType = getStorageType.call(this);
      return window[storageType].removeItem(key);
    } catch (e) {
      error(e);
    }
  };

  var clear = function clear() {
    try {
      var storageType = getStorageType.call(this);
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
