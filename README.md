# Pseudo localize

A tiny library for generating pseudo localizations of text based on (https://github.com/Shopify/pseudolocalization)[https://github.com/Shopify/pseudolocalization]

## Examples

### Example passing string

- Input: `"Hello world!"`
- Output: `"Ḥḛḛḽḽṓṓ ẁṓṓṛḽḍ!"`

### Example passing Object

- Input: `{sentence: 'Hello world!', nested: { sentence: 'Well, hello there!'}}`
- Output: `{ "sentence": "Ḥḛḛḽḽṓṓ ẁṓṓṛḽḍ!", "nested": { "sentence": "Ŵḛḛḽḽ, ḥḛḛḽḽṓṓ ṭḥḛḛṛḛḛ!" } }`

### Example passing Array or strings

- Input: `['Hello', 'world', '!']`
- Output: `["Ḥḛḛḽḽṓṓ"],["ẁṓṓṛḽḍ"],["!"]`

## Usage

### With function

```typescript
import { pseudoLocalize } from 'pseudo-localize';

const myPseudoLocalizedString = pseudoLocalize('Hello world!')

console.log(myPseudoLocalizedString) // Ḥḛḛḽḽṓṓ ẁṓṓṛḽḍ!
```

#### Ignore strings

You can ignore words by adding it in an array as a second argument.

```typescript
import { pseudoLocalize } from 'pseudo-localize';

const myPseudoLocalizedString = pseudoLocalize('Hello world!', ['world'])

console.log(myPseudoLocalizedString) // Ḥḛḛḽḽṓṓ world!
```

### With class

```typescript
import { pseudoLocalize } from 'pseudo-localize';

const myPseudoLocalizer = new PseudoLocalizer();

console.log(myPseudoLocalizer.pseudoLocalize('Hello world!')) // Ḥḛḛḽḽṓṓ ẁṓṓṛḽḍ!
```

#### Ignore strings

You can ignore words by adding it in an array as a second argument.

```typescript
import { pseudoLocalize } from 'pseudo-localize';

const myPseudoLocalizer = new PseudoLocalizer().ignore(['world']);

console.log(myPseudoLocalizer.pseudoLocalize('Hello world!')) // Ḥḛḛḽḽṓṓ world!
```
