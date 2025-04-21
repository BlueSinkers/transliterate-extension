console.log("🌍 Extension loaded with real translation!");

async function translateText(text) {
  if (!text.trim()) return text;

  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "es",
        format: "text"
      })
    });

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

function walkAndTranslate(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const originalText = node.textContent.trim();
    translateText(originalText).then(translated => {
      if (translated !== originalText) {
        node.textContent = translated;
      }
    });
  } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
    node.childNodes.forEach(walkAndTranslate);
  }
}

walkAndTranslate(document.body);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      walkAndTranslate(node);
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
