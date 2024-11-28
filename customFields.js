// Function to add a custom field and render it on the page
function addCustomField() {
    const labelInput = document.getElementById('customFieldLabel');
    const valueInput = document.getElementById('customFieldValue');

    const fieldLabel = labelInput.value.trim();
    const fieldValue = valueInput.value.trim();

    if (fieldLabel && fieldValue) {
        // Save to localStorage
        const storedData = JSON.parse(localStorage.getItem('profileData')) || {};
        const customFields = storedData.customFields || [];
        const newField = { label: fieldLabel, value: fieldValue };

        customFields.push(newField);
        storedData.customFields = customFields;
        localStorage.setItem('profileData', JSON.stringify(storedData));

        // Render the new field on the page
        renderCustomField(newField, customFields.length - 1);

        // Clear input fields
        labelInput.value = '';
        valueInput.value = '';
    } else {
        alert('Please provide both a label and a value for the custom field.');
    }
}

// Function to render a single custom field as editable inputs
function renderCustomField(field, index) {
    const container = document.getElementById('customFieldsContainer');

    const fieldDiv = document.createElement('div');
    fieldDiv.classList.add('custom-field');
    fieldDiv.dataset.index = index;

    // Editable title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = field.label;
    titleInput.classList.add('field-title');
    titleInput.dataset.index = index;

    // Editable value input
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.value = field.value;
    valueInput.classList.add('field-value');
    valueInput.dataset.index = index;

    // Save changes button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => saveCustomField(index, titleInput.value, valueInput.value));

    // Remove field button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeCustomField(index));

    fieldDiv.appendChild(titleInput);
    fieldDiv.appendChild(valueInput);
    fieldDiv.appendChild(saveButton);
    fieldDiv.appendChild(removeButton);
    container.appendChild(fieldDiv);
}

// Function to save changes to a custom field
function saveCustomField(index, newTitle, newValue) {
    const storedData = JSON.parse(localStorage.getItem('profileData')) || {};
    const customFields = storedData.customFields || [];

    if (customFields[index]) {
        customFields[index].label = newTitle.trim();
        customFields[index].value = newValue.trim();
        storedData.customFields = customFields;
        localStorage.setItem('profileData', JSON.stringify(storedData));
        alert('Field updated successfully!');
    } else {
        alert('Error updating field.');
    }
}

// Function to remove a custom field
function removeCustomField(index) {
    const storedData = JSON.parse(localStorage.getItem('profileData')) || {};
    const customFields = storedData.customFields || [];

    if (customFields[index]) {
        customFields.splice(index, 1); // Remove the field
        storedData.customFields = customFields;
        localStorage.setItem('profileData', JSON.stringify(storedData));

        loadCustomFields(); // Re-render the fields
    } else {
        alert('Error removing field.');
    }
}

// Function to load and render all custom fields from localStorage
function loadCustomFields() {
    const storedData = JSON.parse(localStorage.getItem('profileData')) || {};
    const customFields = storedData.customFields || [];

    const container = document.getElementById('customFieldsContainer');
    container.innerHTML = ''; // Clear existing fields

    customFields.forEach((field, index) => renderCustomField(field, index));
}

// Set up event listener for the add field button
window.addEventListener('load', function () {
    document.getElementById('addFieldBtn').addEventListener('click', addCustomField);
    loadCustomFields(); // Load existing fields on page load
});
