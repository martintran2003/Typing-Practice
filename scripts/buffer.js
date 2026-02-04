let buffer = [];

function addToBuffer(words) {
  console.log("Adding words to buffer:", words);
  buffer.push(...words);
}

function saveBufferToFile(delimiter = "|") {
  const content = buffer.join(delimiter);
  console.log("Saving buffer to file with content:", content);
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
  buffer = [];
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message:", request);
  if (request.action === "saveBuffer") {
    // Request to save buffer to file
    console.log("Saving buffer with", buffer.length, "words");
    saveBufferToFile(request.delimiter || "|");
    sendResponse({ success: true, count: buffer.length });
  }
  return true;
});
