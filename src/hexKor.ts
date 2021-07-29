import { isBuffer } from "./util";

export default class Generator {
  private static StartCode: number = 44032;
  private static blockSize: number = 4096;
  public static hex2Kor(hex: string): string {
    let result = "";
    for (var i = 0; i < hex.length / 3; i++) {
      let number = parseInt(hex.substr(i * 3, 3), 16);
      result += String.fromCharCode(this.StartCode + (i % 2 == 0 ? number : number + this.blockSize));
    }

    if (hex.length % 3 == 1 || hex.length % 3 == 2) {
      let padding = String.fromCharCode(this.StartCode + this.blockSize * 2 + (3 - (hex.length % 3)));
      result += padding;
    }
    return result;
  }

  public static kor2Hex(kor: string | Buffer): string {
    let stringData = kor as string;
    if (isBuffer(kor)) stringData = (kor as Buffer).toString("hex");

    let padding: number = 0;
    // console.log(kor.charCodeAt(kor.length - 1));
    if (stringData.charCodeAt(stringData.length - 1) > this.blockSize * 2 + this.StartCode) {
      padding = stringData.charCodeAt(stringData.length - 1) - this.StartCode - this.blockSize * 2;
      stringData = stringData.slice(0, stringData.length - 1);
    }

    let result = "";
    for (var i = 0; i < stringData.length; i++) {
      let code: number = stringData[i].charCodeAt(0);
      let number = code - this.StartCode;
      if (i % 2 == 1) number -= this.blockSize;

      const c = number & 0xf;
      const b = (number >>> 4) & 0xf;
      const a = (number >>> 8) & 0xf;

      if (number < this.blockSize * 2) {
        result += [a, b, c].map((item) => item.toString(16)).join("");
      }
    }

    let korArray = result.split("");
    korArray.splice(-3, padding).join("");
    result = korArray.join("");
    return result;
  }

  public static dec2Kor(dec: number): string {
    return this.hex2Kor(dec.toString(16));
  }
  public static dec2KorBuf(dec: number): Buffer {
    return Buffer.from(this.hex2Kor(dec.toString(16)));
  }

  public static buf2Kor(buf: Buffer): string {
    return this.hex2Kor(buf.toString("hex"));
  }
  public static buf2KorBuf(buf: Buffer): Buffer {
    return Buffer.from(this.hex2Kor(buf.toString("hex")));
  }

  public static kor2Dec(kor: string): number {
    return parseInt(this.kor2Hex(kor), 16);
  }
  public static kor2Buf(kor: string): Buffer {
    return Buffer.from(this.kor2Hex(kor));
  }

  public static encode(plain: string | Buffer | number) {
    let plainString = plain as string;
    if (isBuffer(plain)) plainString = (plain as Buffer).toString("hex");
    else if (typeof plain == "number") plainString = plain.toString(16);

    return this.hex2Kor(plainString);
  }
  public static encodeArray(plainList: any[]): string[] {
    let strList: string[] = [];
    plainList.map((plain) => strList.push(this.encode(plain)));
    return strList;
  }

  public static decode(kor64: string | Buffer | number) {
    if (isBuffer(kor64)) kor64 = (kor64 as Buffer).toString("hex");
    else if (typeof kor64 == "number") kor64 = kor64.toString(16);
    return this.kor2Hex(kor64);
  }

  public static decodeArray(korList: any[]): string[] {
    let hexList: string[] = [];
    korList.map((plain) => hexList.push(this.decode(plain)));
    return hexList;
  }
}
