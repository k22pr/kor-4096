"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hexKor_1 = __importDefault(require("./hexKor"));
var text = "CF90B67643C7B1A8930ACFE64549370F207B54AABDCC2CE5E1173AFAC24458D96B37960E8FEE639C9A51C76E37744D261E332FB5B8C3F543BD72A4FABD83CE7F";
console.log(text);
var kor = hexKor_1.default.encode(text);
console.log(kor);
var hex = hexKor_1.default.decode(kor);
console.log(hex);
// console.log(hex);
// let hexList = [0, "a", 1024, "111111111111", "a0", "a000", "0", 4096, "000", "1234567890abcde0987654321", 123456789];
// console.log(hexList);
// let encList = korEncode.encodeArray(hexList);
// console.log(encList);
// let decList = korEncode.decodeArray(encList);
// console.log(decList);
// let korList = [];
// for (var i = 0; i < hexList.length; i++) {
//    korList.push(hexKor.hex2Kor(hexList[i]));
//    console.log(korList[i]);
//    console.log(hexList[i]);
//    console.log(hexKor.kor2Hex(korList[i]));
//    console.log("\n");
// }
// let dec = 1234567891234;
// let kor = korEncode.encode(dec);
// console.log(dec);
// console.log(korEncode.decode(kor));
//console.log(kor64.Buf);
