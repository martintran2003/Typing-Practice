console.log("Popup script loaded");

// Add click listener to the button
document.getElementById("save-incorrect-words").addEventListener("click", async () => {
  console.log("Save Incorrect Words button clicked");

  // Get the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Send message to content script
  chrome.tabs.sendMessage(tab.id, { action: "saveBuffer", delimiter: "|" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error:", chrome.runtime.lastError.message);
    } else {
      console.log("Response:", response);
    }
  });
});
