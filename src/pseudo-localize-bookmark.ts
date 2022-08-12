import { pseudoLocalize } from './pseudo-localize';

function replaceAllText() {
  for (
    var e = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );
    e.nextNode();

  )
    e?.currentNode?.nodeValue?.trim() &&
      (e.currentNode.nodeValue = pseudoLocalize(
        e.currentNode.nodeValue
      ) as string);
}

replaceAllText();
