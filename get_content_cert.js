const parentContainers = document.querySelectorAll('div.display-flex.flex-column.align-self-center.flex-grow-1');
let certificatesData = [];

function collectCertData(container) {
    if (!container) return;

    const titleElement = container.querySelector('div.display-flex.align-items-center.mr1.t-bold span[aria-hidden="true"]');
    const detailElement = container.querySelector('span.t-14.t-normal span[aria-hidden="true"]');

    const title = titleElement ? titleElement.textContent.trim() : "";
    const detail = detailElement ? detailElement.textContent.trim() : "";

    if (title && detail) {
        certificatesData.push(`${title} - ${detail}`);
    }
}

parentContainers.forEach(collectCertData);

// Remove the last 5 entries if needed
certificatesData = certificatesData.slice(0, -5);

chrome.runtime.sendMessage({ type: 'certificatesData', data: certificatesData });
console.log("Certificates Extracted:", certificatesData);
