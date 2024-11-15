const profileSelector = document.getElementById('profile-selector');
const createProfileButton = document.getElementById('create-profile-button');
const saveButton = document.getElementById('save-button');

// load existing profiles into the selector
function loadProfiles() {
  // gt all profile names from localStorage
  const profiles = Object.keys(localStorage).filter(key => key.endsWith('-name'));
  profiles.forEach(profileKey => {
    const profileName = profileKey.split('-')[0];
    const option = document.createElement('option');
    option.value = profileName;
    option.textContent = profileName;
    profileSelector.appendChild(option);
  });
}

// create new profile
createProfileButton.addEventListener('click', function() {
  const profileName = prompt("Enter the name for the new profile:");
  if (profileName) {
    // store an empty profile in localStorage
    localStorage.setItem(profileName + '-name', '');
    localStorage.setItem(profileName + '-email', '');
    localStorage.setItem(profileName + '-certificates', '');
    localStorage.setItem(profileName + '-portfolio', '');
    localStorage.setItem(profileName + '-summary', '');

    // add the new profile to the profile selector
    const option = document.createElement('option');
    option.value = profileName;
    option.textContent = profileName;
    profileSelector.appendChild(option);
  }
});
//W3Schools. (2024). JavaScript localStorage. https://www.w3schools.com/jsref/prop_win_localstorage.asp
// save data to localStorage
saveButton.addEventListener('click', function() {
  const selectedProfile = profileSelector.value;
  if (!selectedProfile) {
    alert("Please select a profile first.");
    return;
  }

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const certificates = document.getElementById('certificates').value;
  const portfolio = document.getElementById('portfolio').value;
  const summary = document.getElementById('summary').value;

  localStorage.setItem(selectedProfile + '-name', name);
  localStorage.setItem(selectedProfile + '-email', email);
  localStorage.setItem(selectedProfile + '-certificates', certificates);
  localStorage.setItem(selectedProfile + '-portfolio', portfolio);
  localStorage.setItem(selectedProfile + '-summary', summary);

  alert("Data for profile '" + selectedProfile + "' saved!");
});

// load data for the selected profile when the page loads or profile changes
function loadDataForProfile(profileName) {
  document.getElementById('name').value = localStorage.getItem(profileName + '-name') || '';
  document.getElementById('email').value = localStorage.getItem(profileName + '-email') || '';
  document.getElementById('certificates').value = localStorage.getItem(profileName + '-certificates') || '';
  document.getElementById('portfolio').value = localStorage.getItem(profileName + '-portfolio') || '';
  document.getElementById('summary').value = localStorage.getItem(profileName + '-summary') || '';
}

// listen to profile selection changes
profileSelector.addEventListener('change', function() {
  const selectedProfile = profileSelector.value;
  if (selectedProfile) {
    loadDataForProfile(selectedProfile);
  }
});

// initial profile load on page load
window.onload = function() {
  loadProfiles();
  if (profileSelector.value) {
    loadDataForProfile(profileSelector.value);
  }
};
//Mozilla Developer Network (MDN). (2024). Web APIs - Document Object Model (DOM). https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
//OpenAI. (2024, November 15). ChatGPT (Nov 2024 version) [Large language model]. https://chat.openai.com/chat

const mappingContainer = document.getElementById('mapping-list');
const addMappingButton = document.getElementById('add-mapping');

addMappingButton.addEventListener('click', function() {
  const formField = document.getElementById('form-field').value;
  const linkedinField = document.getElementById('linkedin-field').value;

  if (formField && linkedinField) {

    const mappingEntry = document.createElement('div');
    mappingEntry.textContent = `Form Field: ${formField} -> LinkedIn Field: ${linkedinField}`;
    
    mappingContainer.appendChild(mappingEntry);

    let mappings = JSON.parse(localStorage.getItem('field-mappings')) || [];
    mappings.push({ formField, linkedinField });
    localStorage.setItem('field-mappings', JSON.stringify(mappings));
  } else {
    alert("Please enter both form field and select a LinkedIn field.");
  }
});
