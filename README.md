# base11172

Encode any data into Korean Hangul syllables using base-11172.

11,172 Unicode Hangul syllables (가 ~ 힣, U+AC00 ~ U+D7A3) to represent arbitrary binary data. Each character carries ~13.45 bits of information, producing output ~30% the length of the original hex string.

## Install

```bash
npm install base11172
# or
bun add base11172
```

## Usage

### Hex string

```ts
import { encode, decode } from "base11172";

const kor = encode("7a538344c200b87ed788809520bc82c4");
// "갂꾦댎핦쫋쮉릴콰쇁셿"

const hex = decode(kor);
// "7a538344c200b87ed788809520bc82c4"
```

### Text (UTF-8)

```ts
import { encodeText, decodeText } from "base11172";

const kor = encodeText("Hello World!");
// "걲뱗솦홥쳤닿쉧"

const text = decodeText(kor);
// "Hello World!"
```

### Buffer

```ts
import { encode, decodeToBuffer, encodeText } from "base11172";

// Buffer -> Hangul
const kor = encode(Buffer.from([0x00, 0xff, 0x42]));

// Hangul -> Buffer
const buf = decodeToBuffer(kor);

// Buffer via encodeText
const kor2 = encodeText(Buffer.from("hello"));
```

### Number

```ts
import { encode, decode } from "base11172";

const kor = encode(255);    // encode(0xff)
const hex = decode(kor);    // "ff"
```

### Array

```ts
import { encodeArray, decodeArray } from "base11172";

const encoded = encodeArray(["ff", "00", 256]);
const decoded = decodeArray(encoded);
```

## API

| Function | Input | Output | Description |
|---|---|---|---|
| `encode` | `string \| Buffer \| number` | `string` | Hex/Buffer/number to Hangul |
| `decode` | `string` | `string` | Hangul to hex string |
| `encodeText` | `string \| Buffer` | `string` | UTF-8 text/Buffer to Hangul |
| `decodeText` | `string` | `string` | Hangul to UTF-8 text |
| `decodeToBuffer` | `string` | `Buffer` | Hangul to Buffer |
| `encodeArray` | `(string \| Buffer \| number)[]` | `string[]` | Batch encode |
| `decodeArray` | `string[]` | `string[]` | Batch decode |

## Compression ratio

| Input | Hex length | Hangul length | Ratio |
|---|---|---|---|
| 8 bytes | 16 chars | 5 chars | 31.3% |
| 32 bytes (SHA-256) | 64 chars | 20 chars | 31.3% |
| 64 bytes | 128 chars | 39 chars | 30.5% |

## How it works

1. Input is converted to a hex string
2. A `"1"` prefix is prepended to preserve leading zeros
3. The resulting number is converted to base-11172 using BigInt
4. Each digit is mapped to a Hangul syllable (U+AC00 + digit)
5. Decoding reverses the process

## License

MIT
