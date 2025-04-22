document.addEventListener("DOMContentLoaded", () => {
    const reverseToggle = document.getElementById("reverseToggle");
  
    // Load the current toggle state from Chrome storage
    chrome.storage.sync.get("reverseEnabled", (data) => {
      reverseToggle.checked = !!data.reverseEnabled;
    });
  
    reverseToggle.addEventListener("change", async () => {
      const newState = reverseToggle.checked;
  
      // Save the new state to Chrome storage
      chrome.storage.sync.set({ reverseEnabled: newState });
  
      // Trigger the content script to apply the changes immediately on the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          // Reload content.js effect immediately without a full page reload
          chrome.runtime.sendMessage({ action: "applyTextEffect" });
        },
      });
    });
  });
  