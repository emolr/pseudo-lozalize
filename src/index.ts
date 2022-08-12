const vowels: string[] = [
  'a',
  'e',
  'i',
  'o',
  'u',
  'y',
  'A',
  'E',
  'I',
  'O',
  'U',
  'Y',
];

// Filters html tags, handlebars, liquid, urls and html entities
const regex = /(<.*?>|{{.*?}}|%{.*?}|https?:\/\/[^\s]+|&[^\s]+)/g;

const letters: Record<string, string> = {
  a: 'α',
  b: 'ḅ',
  c: 'ͼ',
  d: 'ḍ',
  e: 'ḛ',
  f: 'ϝ',
  g: 'ḡ',
  h: 'ḥ',
  i: 'ḭ',
  j: 'ĵ',
  k: 'ḳ',
  l: 'ḽ',
  m: 'ṃ',
  n: 'ṇ',
  o: 'ṓ',
  p: 'ṗ',
  q: 'ʠ',
  r: 'ṛ',
  s: 'ṡ',
  t: 'ṭ',
  u: 'ṵ',
  v: 'ṽ',
  w: 'ẁ',
  x: 'ẋ',
  y: 'ẏ',
  z: 'ẓ',
  A: 'Ḁ',
  B: 'Ḃ',
  C: 'Ḉ',
  D: 'Ḍ',
  E: 'Ḛ',
  F: 'Ḟ',
  G: 'Ḡ',
  H: 'Ḥ',
  I: 'Ḭ',
  J: 'Ĵ',
  K: 'Ḱ',
  L: 'Ḻ',
  M: 'Ṁ',
  N: 'Ṅ',
  O: 'Ṏ',
  P: 'Ṕ',
  Q: 'Ǫ',
  R: 'Ṛ',
  S: 'Ṣ',
  T: 'Ṫ',
  U: 'Ṳ',
  V: 'Ṿ',
  W: 'Ŵ',
  X: 'Ẋ',
  Y: 'Ŷ',
  Z: 'Ż',
};

type Content = string | string[] | Record<any, any>;
type IgnoreList = string[];

const translateString = (content: string, ignoreList?: IgnoreList) => {
  return content
    .split(regex)
    .map((part) => {
      let ignoreRegex = ignoreList?.length
        ? new RegExp(ignoreList.join('|'), 'g')
        : null;

      if (part.match(regex) || (ignoreRegex && part.match(ignoreRegex))) {
        return part;
      }

      return [...part]
        .map((char) => {
          if (letters[char]) {
            let value = letters[char];
            if (vowels.includes(char)) {
              value = value + value;
            }

            return value;
          }

          return char;
        })
        .join('');
    })
    .join('');
};

const translateObject = (
  content: Content,
  ignoreList?: IgnoreList
): Content => {
  if (typeof content === 'string') {
    return translateString(content, ignoreList ?? []);
  }

  if (typeof content === 'object' && Array.isArray(content)) {
    return content.map((item) => translateObject(item, ignoreList));
  }

  if (typeof content === 'object') {
    return Object.keys(content).reduce((acc, key) => {
      if (typeof content[key] === 'function') {
        acc[key] = content[key];
      } else {
        acc[key] = translateObject(content[key], ignoreList);
      }
      return acc;
    }, {} as Record<any, any>);
  }

  return {};
};

/**
 * Pseudo localize strings.
 *
 * eg. <a>Hello</a> -> <a>ḥḛḛḽḽṓṓ</a>
 * eg. https://hello.com you know? -> https://hello.com ẏẏṓṓṵṵ ḳṇṓṓẁ?
 * eg. {{ myLiquid }} is solid! -> {{ myLiquid }} ḭḭṡ ṡṓṓḽḭḭḍ!
 * eg. %{ myTemplates } rocks! -> %{ myTemplates } ṛṓṓͼḳṡ!
 *
 * @param {string | string[] | Object} content - The text to pseudo translate
 * @param {string[]} ignoreList - List of words to ignore
 *
 * @returns {string | string[] | Object}
 */
export const pseudoLocalize = translateObject;

export class PseudoLocalizer {
  public ignoreList: string[] = [];

  constructor() {}

  ignore(stringsToIgnore?: string[]): this {
    if (!stringsToIgnore) {
      return this;
    }

    if (Array.isArray(stringsToIgnore)) {
      this.ignoreList = [...stringsToIgnore];
    }

    if (typeof stringsToIgnore === 'string') {
      this.ignoreList = [...this.ignoreList, stringsToIgnore];
    }

    return this;
  }

  pseudoLocalize(content: Content) {
    return pseudoLocalize(content, this.ignoreList);
  }
}
