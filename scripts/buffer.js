function addToBuffer(words) {
  console.log("Adding words to buffer:", words);
  const existingBuffer = JSON.parse(localStorage.getItem("incorrectWordsBuffer") || "[]");
  localStorage.setItem("incorrectWordsBuffer", JSON.stringify(existingBuffer.concat(words)));
}

function saveBufferToFile(delimiter = "|") {
  const content = JSON.parse(localStorage.getItem("incorrectWordsBuffer") || "[]").join(delimiter);
  if (!content) {
    console.log("Buffer is empty, nothing to save.");
    return;
  }
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
  a.href = url;
  a.download = `incorrect_words_${date}.txt`;
  console.log("Downloading file:", a.download);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function clearBuffer() {
  console.log("Clearing buffer");
  localStorage.removeItem("incorrectWordsBuffer");
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message:", request);
  if (request.action === "saveBuffer") {
    // Request to save buffer to file
    const buffer = JSON.parse(localStorage.getItem("incorrectWordsBuffer") || "[]");
    console.log("Saving buffer with", buffer.length, "words");
    saveBufferToFile(request.delimiter || "|");
    sendResponse({ success: true, count: buffer.length });
  } else if (request.action === "clearBuffer") {
    // Request to clear buffer
    clearBuffer();
    sendResponse({ success: true });
  }
  return true;
});
