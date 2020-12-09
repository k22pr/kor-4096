# kor4096

encoding hex, number to korean language 4096.

찁, 찂 is padding string

## example

### Using

#### default

```js
import KorEncode from "kor-4096";

let plain = "0123456789asdf";
let kor = korEncode.encode(plain);
console.log(kor); //값뽅뉸벚곟찁
let hex = korEncode.encode(kor);
console.log(hex); //0123456789asdf

plain = "7a538344c200b87ed788809520bc82c4c8a9519235323f9b2a8572e2ef489966";
kor = korEncode.encode(plain);
console.log(kor); //뎥뾃끌븀랇쫗뒈법긋좂롌쒩넙븵꼣쮛꺨셲먮쭈떖밆찂
hex = korEncode.encode(kor);
console.log(hex); //7a538344c200b87ed788809520bc82c4c8a9519235323f9b2a8572e2ef489966

plain =
  "cf90b67643c7b1a8930acfe64549370f207b54aabdcc2ce5e1173afac24458d96b37960e8fee639c9a51c76e37744d261e332fb5b8c3f543bd72a4fabd83ce7f";
kor = korEncode.encode(plain);
console.log(kor); //룹벶덤뿇뜚쒓견쯦끔씷곲뱻녊욽룂죥먑쌺뮬비농앫꽹숎듾쩣뗉왑롶쨷덄줦귣뼯띛쓃뭔뾽댪샺럘뿎걿찁
hex = korEncode.encode(kor);
console.log(hex); //cf90b67643c7b1a8930acfe64549370f207b54aabdcc2ce5e1173afac24458d96b37960e8fee639c9a51c76e37744d261e332fb5b8c3f543bd72a4fabd83ce7f
```

#### Array

```js
let plain = [1, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
let kor = korEncode.encodeArray(plain);
console.log(kor); //["각찂","간찂","갈찂","감찁","갠찁","걀찁","검찁","관","글","뀀","됀","관밀찂"]
let hex = korEncode.decodeArray(kor);
console.log(hex); //["1","4","8","10","20","40","80","100","200","400","800","1000"]

let plain = ["1", "11", "111", "1111", "11111", "1111111", "1111111"];
let kor = korEncode.encodeArray(plain);
console.log(kor); //["각찂","갑찁","광","광밁찂","광밑찁","광봑각찂","광봑각찂"]
let hex = korEncode.decodeArray(kor);
console.log(hex); //["1","11","111","1111","11111","1111111","1111111"]
```

### Chainge key Size

```js
let chain = new ChainHash(inputPassword, 224);
let chain = new ChainHash(inputPassword, 256);
let chain = new ChainHash(inputPassword, 384);
//default
let chain = new ChainHash(inputPassword, 512);
```
