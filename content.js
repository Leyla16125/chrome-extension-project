(function () {
    // Utility functions for content extraction
    const extractText = selector => {
        const element = document.querySelector(selector);
        return element?.textContent.trim() || 'N/A';
    };

    const extractAttribute = (selector, attribute) => {
        const element = document.querySelector(selector);
        return element?.getAttribute(attribute) || 'N/A';
    };

    // Function to locate and extract birthday
    const findBirthday = () => {
        const birthdaySection = [...document.querySelectorAll('section.pv-contact-info__contact-type')].find(section => 
            section.querySelector('h3')?.textContent.trim() === 'Birthday'
        );
        return birthdaySection?.querySelector('span.t-black.t-normal')?.textContent.trim() || 'N/A';
    };

    // Gather profile data
    const profileData = {
        name: extractText('#pv-contact-info'),
        title: extractText('div.text-body-medium.break-words[data-generated-suggestion-target]'),
        location: extractText('span.text-body-small.inline.t-black--light.break-words'),
        email: extractAttribute('a[href^="mailto:"]', 'href').replace('mailto:', ''),
        website: extractAttribute('a[href^="https://github.com/"]', 'href'),
        phone: extractText('section.pv-contact-info__contact-type ul li span.t-black'),
        bio: extractText(
            'div.inline-show-more-text--is-collapsed.inline-show-more-text--is-collapsed-with-line-clamp.full-width span[aria-hidden="true"]'
        ),
        birthday: findBirthday()
    };

    console.log('Profile Data:', profileData);

    // Send profile data to popup.js
    chrome.runtime.sendMessage({ type: 'profileData', data: profileData });
})();
