// Function to load saved profile data from localStorage and render editable fields
function loadFields() {
    const profileFieldsDiv = document.getElementById('profileFields');
    profileFieldsDiv.innerHTML = '';

    const storedData = JSON.parse(localStorage.getItem('profileData')) || {};

    const defaultFields = [
        { key: 'name', label: 'Name' },
        { key: 'title', label: 'Title' },
        { key: 'location', label: 'Location' },
        { key: 'email', label: 'Email' },
        { key: 'website', label: 'Website' },
        { key: 'phone', label: 'Phone' },
        { key: 'bio', label: 'Bio' },
        { key: 'birthday', label: 'Birthday' },
    ];

    // Dynamically create input fields for default attributes
    defaultFields.forEach(field => {
        const fieldDiv = document.createElement('div');
        fieldDiv.classList.add('editable');

        const label = document.createElement('label');
        label.textContent = `${field.label}:`;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = storedData[field.key] || ''; 
        input.dataset.fieldKey = field.key;

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        profileFieldsDiv.appendChild(fieldDiv);
    });

    // Render any custom fields saved in localStorage
    const customFields = storedData.customFields || [];
    customFields.forEach(field => {
        const fieldDiv = document.createElement('div');
        fieldDiv.classList.add('editable');

        const label = document.createElement('label');
        label.textContent = `${field.label}:`;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = field.value || '';
        input.dataset.fieldKey = field.key;

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        profileFieldsDiv.appendChild(fieldDiv);
    });
}

// Function to save profile data into localStorage
function saveData() {
    const storedData = {};

    // Iterate over all input fields and collect their data
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        storedData[input.dataset.fieldKey] = input.value.trim();
    });

    localStorage.setItem('profileData', JSON.stringify(storedData));
    alert('Profile data saved successfully!');
}

// Function to add a custom field to the profile
function addCustomField() {
    const labelInput = document.getElementById('customFieldLabel');
    const valueInput = document.getElementById('customFieldValue');

    const fieldLabel = labelInput.value.trim();
    const fieldValue = valueInput.value.trim();

    if (fieldLabel && fieldValue) {
        const storedData = JSON.parse(localStorage.getItem('profileData')) || {};
        const customFields = storedData.customFields || [];

        customFields.push({ label: fieldLabel, value: fieldValue });

        storedData.customFields = customFields;
        localStorage.setItem('profileData', JSON.stringify(storedData));

        loadFields();

        labelInput.value = '';
        valueInput.value = '';
    } else {
        alert('Please provide both a label and a value for the custom field.');
    }
}

// Function to reset all profile data and trigger re-fetching
function resetData() {
    localStorage.removeItem('profileData');

    const profileFieldsDiv = document.getElementById('profileFields');
    profileFieldsDiv.innerHTML = '';

    const customFieldsDiv = document.getElementById('addCustomFields');
    customFieldsDiv.querySelector('#customFieldLabel').value = '';
    customFieldsDiv.querySelector('#customFieldValue').value = '';

    chrome.tabs.executeScript(null, { file: 'content.js' });
    alert('Profile data has been reset! Please wait for new data to load.');
}

// Listen for messages from the content script to update localStorage
chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === 'profileData') {
        localStorage.setItem('profileData', JSON.stringify(message.data));
        loadFields();
    }
});

// Set up event listeners for buttons when the popup loads
window.addEventListener('load', function () {
    document.getElementById('saveDataBtn').addEventListener('click', saveData);
    document.getElementById('addFieldBtn').addEventListener('click', addCustomField);
    document.getElementById('resetDataBtn').addEventListener('click', resetData);

    loadFields();
});
