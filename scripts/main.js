chrome.extension.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fap")
    sendResponse({ data: window.getSelection().toString() });
  else sendResponse({});
  return true;
});
