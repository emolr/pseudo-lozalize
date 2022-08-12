# Pseudo localize

A tiny library for generating pseudo localizations of text based on [https://github.com/Shopify/pseudolocalization](https://github.com/Shopify/pseudolocalization).

Here's a couple of article on how this is useful:

- [https://www.shopify.com/partners/blog/pseudo-localization](https://www.shopify.com/partners/blog/pseudo-localization)
- [https://slack.engineering/localizing-slack/](https://slack.engineering/localizing-slack/)

## Bookmark

This lib also exports a bookmark script that pseudo translates all text on a website when clicking the bookmark.

### Create bookmark

In order to create a bookmark copy all the content from `dist/psuedo-localize-bookmark.iife.js` and add it as a bookmark url:

```
javascript:PASTE_THE_CODE_HERE
```

A functioning bookmark (can be outdated):

```
javascript:(function(){"use strict";const i=["a","e","i","o","u","y","A","E","I","O","U","Y"],a=/(<.*?>|{{.*?}}|%{.*?}|https?:\/\/[^\s]+|&[^\s]+)/g,s={a:"\u03B1",b:"\u1E05",c:"\u037C",d:"\u1E0D",e:"\u1E1B",f:"\u03DD",g:"\u1E21",h:"\u1E25",i:"\u1E2D",j:"\u0135",k:"\u1E33",l:"\u1E3D",m:"\u1E43",n:"\u1E47",o:"\u1E53",p:"\u1E57",q:"\u02A0",r:"\u1E5B",s:"\u1E61",t:"\u1E6D",u:"\u1E75",v:"\u1E7D",w:"\u1E81",x:"\u1E8B",y:"\u1E8F",z:"\u1E93",A:"\u1E00",B:"\u1E02",C:"\u1E08",D:"\u1E0C",E:"\u1E1A",F:"\u1E1E",G:"\u1E20",H:"\u1E24",I:"\u1E2C",J:"\u0134",K:"\u1E30",L:"\u1E3A",M:"\u1E40",N:"\u1E44",O:"\u1E4E",P:"\u1E54",Q:"\u01EA",R:"\u1E5A",S:"\u1E62",T:"\u1E6A",U:"\u1E72",V:"\u1E7E",W:"\u0174",X:"\u1E8A",Y:"\u0176",Z:"\u017B"},b=(e,t)=>e.split(a).map(u=>{let o=t!=null&&t.length?new RegExp(t.join("|"),"g"):null;return u.match(a)||o&&u.match(o)?u:[...u].map(r=>{if(s[r]){let n=s[r];return i.includes(r)&&(n=n+n),n}return r}).join("")}).join(""),l=(e,t)=>typeof e=="string"?b(e,t!=null?t:[]):typeof e=="object"&&Array.isArray(e)?e.map(u=>l(u,t)):typeof e=="object"?Object.keys(e).reduce((u,o)=>(typeof e[o]=="function"?u[o]=e[o]:u[o]=l(e[o],t),u),{}):{},c=l;function f(e){var o,r;const t=e!=null?e:document.body;for(var u=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,null);u.nextNode();)(r=(o=u==null?void 0:u.currentNode)==null?void 0:o.nodeValue)!=null&&r.trim()&&(u.currentNode.nodeValue=c(u.currentNode.nodeValue))}let E=null;const d={characterData:!0,childList:!0,subtree:!0},p=e=>e&&typeof e=="string",y=e=>{for(let t of e)if(t.type==="childList"&&console.log("hello"),t.type==="childList"&&t.addedNodes.length>0)E.disconnect(),t.addedNodes.forEach(u=>{const o=u.nodeType===1?u:u.parentElement;f(o)}),E.observe(document.body,d);else if(t.type==="characterData"){const u=t.target.nodeValue;p(u)&&(E.disconnect(),t.target.nodeValue=c(u),E.observe(document.body,d))}};(()=>{f(document.body),E=new MutationObserver(y),E.observe(document.body,d)})()})();
;
```

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
