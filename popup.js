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

}


document.getElementById('generateBtn').addEventListener('click', () => {
    const htmlInput = document.getElementById('htmlInput').value;
  
    if (!htmlInput.trim()) {
      document.getElementById('coverLetterOutput').value = 'Please provide the HTML content to generate the cover letter.';
      return;
    }
  
    chrome.runtime.sendMessage(
      { type: 'generateCoverLetter', htmlStructure: htmlInput },
      (response) => {
        const outputField = document.getElementById('coverLetterOutput');
        if (response.status === 'success') {
          // Display the generated cover letter
          outputField.value = response.coverLetter;
        } else {
          // Display error messages
          outputField.value = `Error: ${response.message}`;
        }
      }
    );
  });

  
  
document.addEventListener('DOMContentLoaded', () => {
    const htmlInput = document.getElementById('htmlInput');
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
  
        chrome.tabs.sendMessage(activeTab.id, { type: 'fetchPageContent' }, (response) => {
            if (response && response.status === 'success') {
                // Set the content in the textarea
                htmlInput.value = response.content;
            } else {
                htmlInput.value = 'Failed to fetch page content.';
            }
        });
    });
  });


function saveData() {
    const storedData = {};

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        storedData[input.dataset.fieldKey] = input.value.trim();
    });

    localStorage.setItem('profileData', JSON.stringify(storedData));
    alert('Profile data saved successfully!');
}

function resetData() {
    localStorage.removeItem('profileData');

    const profileFieldsDiv = document.getElementById('profileFields');
    profileFieldsDiv.innerHTML = '';

    chrome.tabs.executeScript(null, { file: 'content.js' });
    alert('Profile data has been reset! Please wait for new data to load.');
}

chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === 'profileData') {
        localStorage.setItem('profileData', JSON.stringify(message.data));
        loadFields();
    }
});



function exportData() {
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
      const data = response.data || {};
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'profile_data.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
  
  function importData() {
    const fileInput = document.getElementById('importDataFile');
    fileInput.click();
  
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        try {
          const importedData = JSON.parse(reader.result);
          chrome.runtime.sendMessage({ type: 'profileData', data: importedData }, (response) => {
            if (response && response.status === 'success') {
              alert('Data imported successfully!');
              loadFields();
            } else {
              alert('Failed to save imported data.');
            }
          });
        } catch (e) {
          alert('Invalid file format.');
        }
      };
  
      reader.readAsText(file);
    });
  }
  
  
  function sendDataViaEmail() {
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
      const data = response.data || {};
  
      const emailBody = encodeURIComponent("Here is the exported profile data:\n" + JSON.stringify(data, null, 2));
  
      const mailtoLink = `mailto:?subject=Exported Profile Data&body=${emailBody}`;
  
      const mailtoWindow = window.open(mailtoLink, '_blank');
  
      if (!mailtoWindow) {
        alert("Unable to open email client. Please check your browser settings.");
      }
    });
  }
  



// Set up event listeners for buttons when the popup loads
window.addEventListener('load', function () {
    document.getElementById('saveDataBtn').addEventListener('click', saveData);
    document.getElementById('resetDataBtn').addEventListener('click', resetData);

    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    document.getElementById('importDataBtn').addEventListener('click', importData);
    document.getElementById('sendEmailButton').addEventListener('click', sendDataViaEmail);

    loadFields();
});
