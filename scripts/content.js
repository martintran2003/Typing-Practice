let buffer = [];

function saveIncorrectWords(incorrectWords) {
  incorrectWords.forEach((word) => {
    buffer.push(word.innerText);
  });
  console.log("Saved incorrect words:", buffer);
}

const incorrectWordsSelector = ".replayWord";
const completeObserver = new MutationObserver(() => {
  const target = document.querySelectorAll(incorrectWordsSelector);
  if (target.length > 0) {
    saveIncorrectWords(target);
    completeObserver.disconnect();
    isObserving = false;
    console.log("Stopped observing after saving incorrect words");
  }
});

const targetSelector = "table.inputPanel"; // game container
let isObserving = false;
function startObservingTarget() {
  const target = document.querySelector(targetSelector + ':not([aria-hidden="true"])');
  if (target && !isObserving && getComputedStyle(target).display !== "none") {
    completeObserver.observe(target, { childList: true, subtree: true });
    isObserving = true;
    console.log("Started observing game container");
  }
}

function stopObservingTarget() {
  if (isObserving) {
    completeObserver.disconnect();
    isObserving = false;
    console.log("Stopped observing game container");
  }
}

// Observer to watch for target element appearing/disappearing
const documentObserver = new MutationObserver(() => {
  const target = document.querySelector(targetSelector + ':not([aria-hidden="true"])');
  if (target && !isObserving) {
    // check if target exists and not already observing
    startObservingTarget();
  } else if (!target && isObserving) {
    // if disappeared
    stopObservingTarget();
  }
});

// Start watching the document for changes
documentObserver.observe(document.body, { childList: true, subtree: true });

// Check if target already exists on page load
startObservingTarget();
