chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'fetchPageContent') {
        const bodyContent = document.body.innerText;
        sendResponse({ status: 'success', content: bodyContent });
    }
});
