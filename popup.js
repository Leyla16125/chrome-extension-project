window.addEventListener('load', () => {
    chrome.tabs.executeScript({ file: 'content.js' });
});

// Handle response of content.js
chrome.runtime.onMessage.addListener(message => {
    if (message.type === 'profileData') {
        const updateField = (id, value) => {
            document.getElementById(id).textContent = value || 'N/A';
        };

        updateField('profileName', message.data.name);
        updateField('profileTitle', message.data.title);
        updateField('profileLocation', message.data.location);
        updateField('profileEmail', message.data.email);
        updateField('profileWebsite', message.data.website);
        updateField('profilePhone', message.data.phone);
        updateField('profileBio', message.data.bio);
        updateField('profileBirthday', message.data.birthday);
    }

    if (message.type === 'spanTexts') {
        const list = document.getElementById('spanList');
        list.innerHTML = '';

        message.data.forEach(text => {
            const listItem = document.createElement('li');
            listItem.textContent = text;
            list.appendChild(listItem);
        });
    }
});
