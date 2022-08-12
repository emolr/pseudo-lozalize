import { pseudoLocalize } from '../src';

(() => {
  const app = document.getElementById('app');

  if (!app) return;

  app.innerHTML = `
    <h1>Pseudo localize</h1>
    <p>A tiny library for generating pseudo localizations of text</p>

    <h2>Examples</h2>
    <h3>Example passing string</h3>
    <div>Input: "Hello world!"</div> 
    <div>Output: "${pseudoLocalize('Hello world!')}"</div> 

    <h3>Example passing Object</h3>
    <div>Input: {sentence: 'Hello world!', nested: { sentence: 'Well, hello there!'}}</div> 
    <div>Output: ${JSON.stringify(
      pseudoLocalize({
        sentence: 'Hello world!',
        nested: { sentence: 'Well, hello there!' },
      }),
      null,
      4
    )}</div> 

    <h3>Example passing Array or strings</h3>
    <div>Input: ['Hello', 'world', '!']</div> 
    <div>Output: "${JSON.stringify(
      pseudoLocalize(['Hello', 'world', '!'])
    )}"</div> 

    <h2>Usage</h2>

    <h3>With function</h3>
    <textarea>
import { pseudoLocalize } from 'pseudo-localize';
    
      const myPseudoLocalizedString = pseudoLocalize('Hello world!')

      console.log(myPseudoLocalizedString) // Ḥḛḛḽḽṓṓ ẁṓṓṛḽḍ!
    </textarea>

    <h4>Ignore strings</h4>
    <p>You can ignore words by adding it in an array as a second argument.</p>

    <textarea>
import { pseudoLocalize } from 'pseudo-localize';
    
      const myPseudoLocalizedString = pseudoLocalize('Hello world!', ['world'])

      console.log(myPseudoLocalizedString) // Ḥḛḛḽḽṓṓ world!
    </textarea>

    <h3>With class</h3>

    <textarea>
import { pseudoLocalize } from 'pseudo-localize';
    
      const myPseudoLocalizer = new PseudoLocalizer();

      console.log(myPseudoLocalizer.pseudoLocalize('Hello world!')) // Ḥḛḛḽḽṓṓ ẁṓṓṛḽḍ!
    </textarea>

    <h4>Ignore strings</h4>
    <p>You can ignore words by adding it in an array as a second argument.</p>

    <textarea>
import { pseudoLocalize } from 'pseudo-localize';
    
      const myPseudoLocalizer = new PseudoLocalizer().ignore(['world']);

      console.log(myPseudoLocalizer.pseudoLocalize('Hello world!')) // Ḥḛḛḽḽṓṓ world!
    </textarea>
  `;
})();
