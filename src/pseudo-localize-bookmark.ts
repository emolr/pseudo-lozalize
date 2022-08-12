import { pseudoLocalize } from './pseudo-localize';

function replaceAllText(element?: any) {
  const _element = element ?? document.body;
  for (
    var e = document.createTreeWalker(_element, NodeFilter.SHOW_TEXT, null);
    e.nextNode();

  )
    e?.currentNode?.nodeValue?.trim() &&
      (e.currentNode.nodeValue = pseudoLocalize(
        e.currentNode.nodeValue
      ) as string);
}

let observer: any = null;

const observerConfig = {
  characterData: true,
  childList: true,
  subtree: true,
};

const isNonEmptyString = (str: string) => str && typeof str === 'string';

const domMutationCallback = (mutationsList: any) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Turn the observer off while performing dom manipulation to prevent
      // infinite dom mutation callback loops
      observer.disconnect();
      // For every node added, recurse down it's subtree and convert
      // all children as well
      mutation.addedNodes.forEach((node: any) => {
        const el = node.nodeType === 1 ? node : node.parentElement;
        replaceAllText(el);
      });
      observer.observe(document.body, observerConfig);
    } else if (mutation.type === 'characterData') {
      const nodeValue = mutation.target.nodeValue;
      if (isNonEmptyString(nodeValue)) {
        // Turn the observer off while performing dom manipulation to prevent
        // infinite dom mutation callback loops
        observer.disconnect();
        // The target will always be a text node so it can be converted
        // directly
        mutation.target.nodeValue = pseudoLocalize(nodeValue);
        observer.observe(document.body, observerConfig);
      }
    }
  }
};

const start = () => {
  replaceAllText(document.body);
  // Start observing the DOM for changes and run
  // pseudo localization on any added text nodes
  observer = new MutationObserver(domMutationCallback);
  observer.observe(document.body, observerConfig);
};

start();
