// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'fetchPageContent') {
        const bodyContent = document.body.innerText; // Extract plain text from the body
        sendResponse({ status: 'success', content: bodyContent });
    }
});
