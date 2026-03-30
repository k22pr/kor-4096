const START_CODE = 44032;
const BLOCK_SIZE = 4096;
const DOUBLE_BLOCK = BLOCK_SIZE * 2;

export function hex2Kor(hex: string): string {
  const len = hex.length;
  const chunks = (len / 3) | 0;
  const remainder = len % 3;
  const result: string[] = new Array(chunks + (remainder ? 1 : 0));

  for (let i = 0; i < chunks; i++) {
    const num = parseInt(hex.slice(i * 3, i * 3 + 3), 16);
    result[i] = String.fromCharCode(START_CODE + (i & 1 ? num + BLOCK_SIZE : num));
  }

  if (remainder) {
    result[chunks] = String.fromCharCode(START_CODE + DOUBLE_BLOCK + (3 - remainder));
  }

  return result.join("");
}

export function kor2Hex(kor: string | Buffer): string {
  const str = Buffer.isBuffer(kor) ? kor.toString("hex") : kor;
  const len = str.length;

  let end = len;
  let padding = 0;
  const lastCode = str.charCodeAt(len - 1);
  if (lastCode > DOUBLE_BLOCK + START_CODE) {
    padding = lastCode - START_CODE - DOUBLE_BLOCK;
    end = len - 1;
  }

  const parts: string[] = new Array(end);
  for (let i = 0; i < end; i++) {
    const num = str.charCodeAt(i) - START_CODE - (i & 1 ? BLOCK_SIZE : 0);
    if (num < DOUBLE_BLOCK) {
      parts[i] = ((num >> 8) & 0xf).toString(16) + ((num >> 4) & 0xf).toString(16) + (num & 0xf).toString(16);
    } else {
      parts[i] = "";
    }
  }

  const raw = parts.join("");
  return padding ? raw.slice(0, -padding) : raw;
}

export function encode(plain: string | Buffer | number): string {
  if (Buffer.isBuffer(plain)) return hex2Kor(plain.toString("hex"));
  if (typeof plain === "number") return hex2Kor(plain.toString(16));
  return hex2Kor(plain);
}

export function decode(kor: string | Buffer | number): string {
  if (Buffer.isBuffer(kor)) return kor2Hex(kor.toString("hex"));
  if (typeof kor === "number") return kor2Hex(kor.toString(16));
  return kor2Hex(kor);
}

export function encodeArray(list: (string | Buffer | number)[]): string[] {
  return list.map(encode);
}

export function decodeArray(list: (string | Buffer | number)[]): string[] {
  return list.map(decode);
}

export function dec2Kor(dec: number): string {
  return hex2Kor(dec.toString(16));
}

export function buf2Kor(buf: Buffer): string {
  return hex2Kor(buf.toString("hex"));
}

export function kor2Dec(kor: string): number {
  return parseInt(kor2Hex(kor), 16);
}

export function kor2Buf(kor: string): Buffer {
  return Buffer.from(kor2Hex(kor), "hex");
}

// backward-compatible default export
const kor4096 = {
  hex2Kor,
  kor2Hex,
  encode,
  decode,
  encodeArray,
  decodeArray,
  dec2Kor,
  buf2Kor,
  kor2Dec,
  kor2Buf,
};

export default kor4096;
