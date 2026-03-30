"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
exports.decodeToBuffer = decodeToBuffer;
exports.encodeArray = encodeArray;
exports.decodeArray = decodeArray;
const HANGUL_START = 0xac00; // U+AC00 가
const HANGUL_COUNT = 11172; // U+AC00 ~ U+D7A3 (가 ~ 힣)
const HANGUL_COUNT_BIG = BigInt(HANGUL_COUNT);
function encode(input) {
    const hex = toHex(input);
    if (hex.length === 0)
        return "";
    let num = BigInt("0x1" + hex);
    const chars = [];
    while (num > 0n) {
        chars.push(String.fromCharCode(HANGUL_START + Number(num % HANGUL_COUNT_BIG)));
        num /= HANGUL_COUNT_BIG;
    }
    return chars.reverse().join("");
}
function decode(kor) {
    if (kor.length === 0)
        return "";
    let num = 0n;
    for (let i = 0; i < kor.length; i++) {
        num = num * HANGUL_COUNT_BIG + BigInt(kor.charCodeAt(i) - HANGUL_START);
    }
    return num.toString(16).slice(1);
}
function decodeToBuffer(kor) {
    return Buffer.from(decode(kor), "hex");
}
function encodeArray(list) {
    return list.map(encode);
}
function decodeArray(list) {
    return list.map(decode);
}
function toHex(input) {
    if (Buffer.isBuffer(input))
        return input.toString("hex");
    if (typeof input === "number")
        return input.toString(16);
    return input;
}
