/// <reference types="node" />
export default class Generator {
    private static StartCode;
    private static blockSize;
    static hex2Kor(hex: string): string;
    static kor2Hex(kor: string | Buffer): string;
    static dec2Kor(dec: number): string;
    static dec2KorBuf(dec: number): Buffer;
    static buf2Kor(buf: Buffer): string;
    static buf2KorBuf(buf: Buffer): Buffer;
    static kor2Dec(kor: string): number;
    static kor2Buf(kor: string): Buffer;
    static encode(plain: string | Buffer | number): string;
    static encodeArray(plainList: any[]): string[];
    static decode(kor64: string | Buffer | number): string;
    static decodeArray(korList: any[]): string[];
}
