console.log("🔁 Reverse Text Extension Loaded");

// Function to reverse the text content
function reverseText(text) {
  return text.split('').reverse().join('');
}

// Function to reverse all text in the DOM
function walkAndReverse(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const originalText = node.textContent;
    if (!node.parentElement?.dataset?.original) {
      node.parentElement.dataset.original = originalText;
      node.textContent = reverseText(originalText);
    }
  } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
    node.childNodes.forEach(walkAndReverse);
  }
}

// Function to restore all text to its original state
function walkAndRestore(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const parent = node.parentElement;
    if (parent?.dataset?.original) {
      node.textContent = parent.dataset.original;
      delete parent.dataset.original;
    }
  } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
    node.childNodes.forEach(walkAndRestore);
  }
}

// Check the stored state and apply the reverse or restore based on that
chrome.storage.sync.get("reverseEnabled", (data) => {
  if (data.reverseEnabled) {
    walkAndReverse(document.body);

    // Observe changes in the DOM to apply reversal on dynamically added content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          walkAndReverse(node);
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Save the observer for later disconnection if needed
    window.__reverseObserver = observer;
  } else {
    walkAndRestore(document.body);

    // Disconnect the observer when it's not needed
    if (window.__reverseObserver) {
      window.__reverseObserver.disconnect();
    }
  }
});
