(function () {
    const extractSkills = () => {
        return Array.from(document.querySelectorAll('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold'))
            .map((skillContainer) => skillContainer.querySelector('span[aria-hidden="true"]')?.textContent.trim())
            .filter(Boolean);
    };

    const skills = extractSkills();

    chrome.runtime.sendMessage({ type: 'profileData', data: { skills } });
})();
