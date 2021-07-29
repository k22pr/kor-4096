import KorEncode from "./srtc/index";

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

plain = "cf90b67643c7b1a8930acfe64549370f207b54aabdcc2ce5e1173afac24458d96b37960e8fee639c9a51c76e37744d261e332fb5b8c3f543bd72a4fabd83ce7f";
kor = korEncode.encode(plain);
console.log(kor); //룹벶덤뿇뜚쒓견쯦끔씷곲뱻녊욽룂죥먑쌺뮬비농앫꽹숎듾쩣뗉왑롶쨷덄줦귣뼯띛쓃뭔뾽댪샺럘뿎걿찁
hex = korEncode.encode(kor);
console.log(hex); //cf90b67643c7b1a8930acfe64549370f207b54aabdcc2ce5e1173afac24458d96b37960e8fee639c9a51c76e37744d261e332fb5b8c3f543bd72a4fabd83ce7f
