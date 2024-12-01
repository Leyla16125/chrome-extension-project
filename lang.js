function loadLanguages() {
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
      const storedData = response.data || {};
      const languages = storedData.languages || [];
      const languagesTextarea = document.getElementById('languagesTextarea');
      languagesTextarea.value = languages.join('\n');   
    });
  }
  
  function resetLanguagesData() {
    chrome.tabs.executeScript(null, { file: 'get_content_lang.js' }, () => {
      setTimeout(() => {
        chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
          const languages = response.data.languages || [];
          const languagesTextarea = document.getElementById('languagesTextarea');
          languagesTextarea.value = languages.join('\n');
          alert('Language data has been reset and reloaded!');
        });
      }); // Add a delay to ensure payload script execution
    });
  }
  
  
  function saveLanguages() {
    const languagesTextarea = document.getElementById('languagesTextarea');
    const languages = languagesTextarea.value.split('\n').map(lang => lang.trim()).filter(lang => lang);
  
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
      const storedData = response.data || {};
      storedData.languages = languages;
  
      chrome.runtime.sendMessage({ type: 'profileData', data: storedData }, (saveResponse) => {
        if (saveResponse.status === 'success') {
          alert('Languages saved successfully!');
        }
      });
    });
  }
  
  window.addEventListener('load', () => {
    document.getElementById('refreshLanguagesBtn').addEventListener('click', resetLanguagesData);
    document.getElementById('saveLanguagesBtn').addEventListener('click', saveLanguages);
    loadLanguages();
  });
  