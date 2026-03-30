const HANGUL_START = 0xac00; // U+AC00 가
const HANGUL_END = 0xd7a3; // U+D7A3 힣
const HANGUL_COUNT = 11172; // U+AC00 ~ U+D7A3 (가 ~ 힣)
const HANGUL_COUNT_BIG = BigInt(HANGUL_COUNT);
const HEX_RE = /^[0-9a-f]*$/;

export function encode(input: string | Buffer | number): string {
  const hex = toHex(input);
  if (hex.length === 0) return "";

  let num = BigInt("0x1" + hex);
  const chars: string[] = [];

  while (num > 0n) {
    chars.push(String.fromCharCode(HANGUL_START + Number(num % HANGUL_COUNT_BIG)));
    num /= HANGUL_COUNT_BIG;
  }

  return chars.reverse().join("");
}

export function decode(kor: string): string {
  if (kor.length === 0) return "";

  let num = 0n;
  for (let i = 0; i < kor.length; i++) {
    const code = kor.charCodeAt(i);
    if (code < HANGUL_START || code > HANGUL_END) {
      throw new RangeError(
        `Invalid character at index ${i}: U+${code.toString(16).toUpperCase()} is not a Hangul syllable`,
      );
    }
    num = num * HANGUL_COUNT_BIG + BigInt(code - HANGUL_START);
  }

  return num.toString(16).slice(1);
}

export function decodeToBuffer(kor: string): Buffer {
  const hex = decode(kor);
  return Buffer.from(hex.length % 2 ? "0" + hex : hex, "hex");
}

export function encodeText(input: string | Buffer): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, "utf-8");
  return encode(buf);
}

export function decodeText(kor: string): string {
  return decodeToBuffer(kor).toString("utf-8");
}

export function encodeArray(list: (string | Buffer | number)[]): string[] {
  return list.map(encode);
}

export function decodeArray(list: string[]): string[] {
  return list.map(decode);
}

function toHex(input: string | Buffer | number): string {
  if (Buffer.isBuffer(input)) return input.toString("hex");
  if (typeof input === "number") {
    if (!Number.isSafeInteger(input) || input < 0) {
      throw new RangeError(`Invalid number: must be a non-negative safe integer, got ${input}`);
    }
    return input.toString(16);
  }
  const hex = input.toLowerCase();
  if (!HEX_RE.test(hex)) {
    throw new SyntaxError(`Invalid hex string: "${input}"`);
  }
  return hex;
}
