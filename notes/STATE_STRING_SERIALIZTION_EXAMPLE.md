Working example of serializing app state into a string that can be stored as a url parameter:

```ts
import { parse, stringify } from "telejson";
import { utils, ModeOfOperation } from "aes-js";

const KEY = Array(32)
  .fill(1)
  .map((_, index) => index);
const createCtr = () => new ModeOfOperation.ctr(KEY);

const sampleState = {
  spacing: {
    selectedScale: {
      id: "grid4",
      name: "Grid",
      values: [
        {
          key: "0",
          value: "0"
        },
        {
          key: "1",
          value: "4"
        },
        {
          key: "2",
          value: "8"
        },
        {
          key: "3",
          value: "12"
        },
        {
          key: "4",
          value: "16"
        },
        {
          key: "5",
          value: "20"
        },
        {
          key: "6",
          value: "24"
        },
        {
          key: "7",
          value: "28"
        },
        {
          key: "8",
          value: "32"
        },
        {
          key: "9",
          value: "36"
        },
        {
          key: "10",
          value: "40"
        },
        {
          key: "11",
          value: "44"
        },
        {
          key: "12",
          value: "48"
        },
        {
          key: "13",
          value: "52"
        },
        {
          key: "14",
          value: "56"
        },
        {
          key: "15",
          value: "60"
        },
        {
          key: "16",
          value: "64"
        },
        {
          key: "17",
          value: "68"
        },
        {
          key: "18",
          value: "72"
        },
        {
          key: "19",
          value: "76"
        },
        {
          key: "20",
          value: "80"
        },
        {
          key: "21",
          value: "84"
        },
        {
          key: "22",
          value: "88"
        },
        {
          key: "23",
          value: "92"
        },
        {
          key: "24",
          value: "96"
        }
      ]
    }
  },
  codeGeneration: {
    codeSystemRules: {
      useIndentation: true,
      useLineBreaks: true,
      postfix: "",
      prefix: "",
      keyValueSeparator: " ",
      labelKeySeparator: " ",
      linePostfix: "",
      linePrefix: "",
      showKey: true,
      showLabel: true,
      lineBreakAfterPrefix: true,
      lineBreakBeforePostfix: true
    },
    codeGenerationModalIsOpen: false
  },
  general: {
    selectedScaleType: "color",
    selectedUnitIds: {
      spacing: "px",
      color: "hex"
    }
  },
  color: {
    colorPaletteId: "mantine-blue",
    customColor: "#339af0",
    usingCustomColor: false,
    customColorPaletteQuery: {}
  }
};

const encrypt = (data: any): string => {
  const ctr = createCtr();
  const stringified = stringify(data);
  const bytes = utils.utf8.toBytes(stringified);
  const encryptedBytes = ctr.encrypt(bytes);
  const encryptedString = utils.hex.fromBytes(encryptedBytes);

  return encryptedString;
};

const decrypt = (encryptedString: string): any => {
  const ctr = createCtr();
  const encryptedBytes = utils.hex.toBytes(encryptedString);
  const rawBytes = ctr.decrypt(encryptedBytes);
  const stringifiedValue = utils.utf8.fromBytes(rawBytes);
  const parsed = parse(stringifiedValue);

  return parsed;
};

const rawData = sampleState;
const encryptedData = encrypt(rawData);
const decryptedData = decrypt(encryptedData);

console.log({
  rawData,
  encryptedData,
  decryptedData
});
```