"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _util = require("util");

var Generator =
/*#__PURE__*/
function () {
  function Generator() {
    (0, _classCallCheck2["default"])(this, Generator);
  }

  (0, _createClass2["default"])(Generator, null, [{
    key: "hex2Kor",
    value: function hex2Kor(hex) {
      var result = "";

      for (var i = 0; i < hex.length / 3; i++) {
        var number = parseInt(hex.substr(i * 3, 3), 16);
        result += String.fromCharCode(this.StartCode + (i % 2 == 0 ? number : number + this.blockSize));
      }

      if (hex.length % 3 == 1 || hex.length % 3 == 2) {
        var padding = String.fromCharCode(this.StartCode + this.blockSize * 2 + (3 - hex.length % 3));
        result += padding;
      }

      return result;
    }
  }, {
    key: "kor2Hex",
    value: function kor2Hex(kor) {
      if (Buffer.isBuffer(kor)) kor = kor.toString("hex");
      var padding = 0; // console.log(kor.charCodeAt(kor.length - 1));

      if (kor.charCodeAt(kor.length - 1) > this.blockSize * 2 + this.StartCode) {
        padding = kor.charCodeAt(kor.length - 1) - this.StartCode - this.blockSize * 2;
        kor = kor.slice(0, kor.length - 1);
      }

      var result = "";

      for (var i = 0; i < kor.length; i++) {
        var code = kor[i].charCodeAt(0);
        var number = code - this.StartCode;
        if (i % 2 == 1) number -= this.blockSize;
        var c = number & 0xf;
        var b = number >>> 4 & 0xf;
        var a = number >>> 8 & 0xf;

        if (number < this.blockSize * 2) {
          result += [a, b, c].map(function (item) {
            return item.toString(16);
          }).join("");
        }
      }

      var korArray = result.split('');
      korArray.splice(-3, padding).join('');
      result = korArray.join('');
      return result;
    }
  }, {
    key: "dec2Kor",
    value: function dec2Kor(dec) {
      return this.hex2Kor(dec.toString(16));
    }
  }, {
    key: "dec2KorBuf",
    value: function dec2KorBuf(dec) {
      return Buffer.from(this.hex2Kor(dec.toString(16)));
    }
  }, {
    key: "buf2Kor",
    value: function buf2Kor(buf) {
      return this.hex2Kor(buf.toString('hex'));
    }
  }, {
    key: "buf2KorBuf",
    value: function buf2KorBuf(buf) {
      return Buffer.from(this.hex2Kor(buf.toString('hex')));
    }
  }, {
    key: "kor2Dec",
    value: function kor2Dec(kor) {
      return parseInt(this.kor2Hex(kor), 16);
    }
  }, {
    key: "kor2Buf",
    value: function kor2Buf(kor) {
      return Buffer.from(this.kor2Hex(kor));
    }
  }, {
    key: "encode",
    value: function encode(plain) {
      if (Buffer.isBuffer(plain)) plain = plain.toString('hex');else if ((0, _util.isNumber)(plain)) plain = plain.toString(16);
      return this.hex2Kor(plain);
    }
  }, {
    key: "encodeArray",
    value: function encodeArray(plainList) {
      var _this = this;

      var strList = [];
      plainList.map(function (plain) {
        return strList.push(_this.encode(plain));
      });
      return strList;
    }
  }, {
    key: "decode",
    value: function decode(kor64) {
      if (Buffer.isBuffer(kor64)) kor64 = kor64.toString('hex');else if ((0, _util.isNumber)(kor64)) kor64 = kor64.toString(16);
      return this.kor2Hex(kor64);
    }
  }, {
    key: "decodeArray",
    value: function decodeArray(korList) {
      var _this2 = this;

      var hexList = [];
      korList.map(function (plain) {
        return hexList.push(_this2.decode(plain));
      });
      return hexList;
    }
  }]);
  return Generator;
}();

exports["default"] = Generator;
(0, _defineProperty2["default"])(Generator, "StartCode", 44032);
(0, _defineProperty2["default"])(Generator, "blockSize", 4096);
module.exports = exports.default;