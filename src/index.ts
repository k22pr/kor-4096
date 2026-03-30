import { encode, decode } from "./hexKor";

const testCases = [
  "0123456789abcdef",
  "7a538344c200b87ed788809520bc82c4c8a9519235323f9b2a8572e2ef489966",
  "cf90b67643c7b1a8930acfe64549370f207b54aabdcc2ce5e1173afac24458d96b37960e8fee639c9a51c76e37744d261e332fb5b8c3f543bd72a4fabd83ce7f",
];

for (const hex of testCases) {
  const kor = encode(hex);
  const restored = decode(kor);
  const ok = restored === hex ? "OK" : "FAIL";
  console.log(`[${ok}] ${hex} -> ${kor} -> ${restored}`);
}
