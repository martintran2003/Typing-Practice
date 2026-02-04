// Check for the list of incorrect words in the game container
const incorrectWordsSelector = ".replayWord";
const completeObserver = new MutationObserver(() => {
  const target = document.querySelectorAll(incorrectWordsSelector); // select incorrect words
  if (target.length > 0) {
    // save incorrect words to buffer
    addToBuffer(Array.from(target).map((el) => el.innerText));

    // reset the observer to look for a new game to start
    completeObserver.disconnect();
    isInGame = false;
  }
});

// Observer to watch for text input panel to show up which indicates a game start
const targetSelector = "table.inputPanel"; // game container
let isInGame = false;
const documentObserver = new MutationObserver(() => {
  const target = document.querySelector(targetSelector + ':not([aria-hidden="true"])');
  if (target && !isInGame) {
    // check if target exists and not already observing
    startObservingTarget();
  } else if (!target && isInGame) {
    // if disappeared
    stopObservingGame();
  }
});

function startObservingTarget() {
  const target = document.querySelector(targetSelector + ':not([aria-hidden="true"])');
  if (target && !isInGame && getComputedStyle(target).display !== "none") {
    completeObserver.observe(target, { childList: true, subtree: true });
    isInGame = true;
  }
}

function stopObservingGame() {
  if (isInGame) {
    completeObserver.disconnect();
    isInGame = false;
  }
}

// Start watching the document for changes
documentObserver.observe(document.body, { childList: true, subtree: true });

// Check if target already exists on page load
startObservingTarget();
