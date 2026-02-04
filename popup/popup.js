console.log("Popup script loaded");

// Add click listener to the button
document.getElementById("save").addEventListener("click", async () => {
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

// Add click listener to the clear buffer button
document.getElementById("clear").addEventListener("click", async () => {
  console.log("Clear Buffer button clicked");

  // Get the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Send message to content script
  chrome.tabs.sendMessage(tab.id, { action: "clearBuffer" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error:", chrome.runtime.lastError.message);
    } else {
      console.log("Response:", response);
    }
  });
});

document.getElementById("save-and-clear").addEventListener("click", async () => {
  console.log("Save and Clear Buffer button clicked");
  // Get the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Send message to content script to save buffer
  chrome.tabs.sendMessage(tab.id, { action: "saveBuffer", delimiter: "|" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error:", chrome.runtime.lastError.message);
    } else {
      console.log("Response:", response);
      // After saving, send message to clear buffer
      chrome.tabs.sendMessage(tab.id, { action: "clearBuffer" }, (clearResponse) => {
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError.message);
        } else {
          console.log("Clear Response:", clearResponse);
        }
      });
    }
  });
});
