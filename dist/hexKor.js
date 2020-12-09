"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.hex2Kor = function (hex) {
        var result = "";
        for (var i = 0; i < hex.length / 3; i++) {
            var number = parseInt(hex.substr(i * 3, 3), 16);
            result += String.fromCharCode(this.StartCode + (i % 2 == 0 ? number : number + this.blockSize));
        }
        if (hex.length % 3 == 1 || hex.length % 3 == 2) {
            var padding = String.fromCharCode(this.StartCode + this.blockSize * 2 + (3 - (hex.length % 3)));
            result += padding;
        }
        return result;
    };
    Generator.kor2Hex = function (kor) {
        if (Buffer.isBuffer(kor))
            kor = kor.toString("hex");
        var padding = 0;
        // console.log(kor.charCodeAt(kor.length - 1));
        if (kor.charCodeAt(kor.length - 1) > this.blockSize * 2 + this.StartCode) {
            padding = kor.charCodeAt(kor.length - 1) - this.StartCode - this.blockSize * 2;
            kor = kor.slice(0, kor.length - 1);
        }
        var result = "";
        for (var i = 0; i < kor.length; i++) {
            var code = kor[i].charCodeAt(0);
            var number = code - this.StartCode;
            if (i % 2 == 1)
                number -= this.blockSize;
            var c = number & 0xf;
            var b = (number >>> 4) & 0xf;
            var a = (number >>> 8) & 0xf;
            if (number < this.blockSize * 2) {
                result += [a, b, c].map(function (item) { return item.toString(16); }).join("");
            }
        }
        var korArray = result.split("");
        korArray.splice(-3, padding).join("");
        result = korArray.join("");
        return result;
    };
    Generator.dec2Kor = function (dec) {
        return this.hex2Kor(dec.toString(16));
    };
    Generator.dec2KorBuf = function (dec) {
        return Buffer.from(this.hex2Kor(dec.toString(16)));
    };
    Generator.buf2Kor = function (buf) {
        return this.hex2Kor(buf.toString("hex"));
    };
    Generator.buf2KorBuf = function (buf) {
        return Buffer.from(this.hex2Kor(buf.toString("hex")));
    };
    Generator.kor2Dec = function (kor) {
        return parseInt(this.kor2Hex(kor), 16);
    };
    Generator.kor2Buf = function (kor) {
        return Buffer.from(this.kor2Hex(kor));
    };
    Generator.encode = function (plain) {
        if (Buffer.isBuffer(plain))
            plain = plain.toString("hex");
        else if (typeof plain == "number")
            plain = plain.toString(16);
        return this.hex2Kor(plain);
    };
    Generator.encodeArray = function (plainList) {
        var _this = this;
        var strList = [];
        plainList.map(function (plain) { return strList.push(_this.encode(plain)); });
        return strList;
    };
    Generator.decode = function (kor64) {
        if (Buffer.isBuffer(kor64))
            kor64 = kor64.toString("hex");
        else if (typeof kor64 == "number")
            kor64 = kor64.toString(16);
        return this.kor2Hex(kor64);
    };
    Generator.decodeArray = function (korList) {
        var _this = this;
        var hexList = [];
        korList.map(function (plain) { return hexList.push(_this.decode(plain)); });
        return hexList;
    };
    Generator.StartCode = 44032;
    Generator.blockSize = 4096;
    return Generator;
}());
exports.default = Generator;
