import { encode, decode, encodeText, decodeText } from "./index";

const testCases = [
  "0123456789abcdef",
  "00000000000000ff",
  "FF",
  "0a",
  "f",
  "7a538344c200b87ed788809520bc82c4c8a9519235323f9b2a8572e2ef489966",
  "cf90b67643c7b1a8930acfe64549370f207b54aabdcc2ce5e1173afac24458d96b37960e8fee639c9a51c76e37744d261e332fb5b8c3f543bd72a4fabd83ce7f",
];

for (const hex of testCases) {
  const kor = encode(hex);
  const restored = decode(kor);
  const ok = restored === hex.toLowerCase() ? "OK" : "FAIL";
  const ratio = ((kor.length / hex.length) * 100).toFixed(1);
  console.log(`[${ok}] ${hex.length}ch -> ${kor.length}ch (${ratio}%) | ${kor}`);
}

// encodeText / decodeText tests
console.log("\n--- encodeText / decodeText ---");
const textCases = [
  "hello world",
  "안녕하세요",
  "Hello 세계! 🌍",
  "",
];

for (const text of textCases) {
  const kor = encodeText(text);
  const restored = decodeText(kor);
  const ok = restored === text ? "OK" : "FAIL";
  console.log(`[${ok}] "${text}" -> ${kor} -> "${restored}"`);
}

// Buffer encodeText test
const buf = Buffer.from([0x00, 0xff, 0x42, 0x13, 0x37]);
const korBuf = encodeText(buf);
const restoredBuf = Buffer.from(decode(korBuf), "hex");
const bufOk = buf.equals(restoredBuf) ? "OK" : "FAIL";
console.log(`[${bufOk}] Buffer<${buf.toString("hex")}> -> ${korBuf} -> Buffer<${restoredBuf.toString("hex")}>`);

// validation tests
const errorTests: [string, () => void][] = [
  ["encode(non-hex)", () => encode("xyz")],
  ["encode(-1)", () => encode(-1)],
  ["encode(1.5)", () => encode(1.5)],
  ["encode(NaN)", () => encode(NaN)],
  ["decode(non-hangul)", () => decode("ABC")],
];

for (const [name, fn] of errorTests) {
  try {
    fn();
    console.log(`[FAIL] ${name} should have thrown`);
  } catch (e) {
    console.log(`[OK] ${name} -> ${(e as Error).constructor.name}: ${(e as Error).message}`);
  }
}
