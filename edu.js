function loadEducation() {
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
      const storedData = response.data || {};
      const education = storedData.education || [];
      const educationTextarea = document.getElementById('educationTextarea');
      educationTextarea.value = education.join('\n');
    });
  } 
  
  function resetEducationData() {
    chrome.tabs.executeScript(null, { file: 'get_content_edu.js' }, () => {
      setTimeout(() => {
        chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
          const education = response.data.education || [];
          const educationTextarea = document.getElementById('educationTextarea');
          educationTextarea.value = education.join('\n');
          alert('Education data has been reset and reloaded!');
        });
      }); // Wait for the script to execute
    });
  }
  
  
  function saveEducation() {
    const educationTextarea = document.getElementById('educationTextarea');
    const education = educationTextarea.value.split('\n').map(exp => exp.trim()).filter(exp => exp);
  
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
      const storedData = response.data || {};
      storedData.education = education;
  
      chrome.runtime.sendMessage({ type: 'profileData', data: storedData }, (saveResponse) => {
        if (saveResponse.status === 'success') {
          alert('Educations saved successfully!');
        }
      });
    });
  }
  
  window.addEventListener('load', () => {
    document.getElementById('refreshEducationBtn').addEventListener('click', resetEducationData);
    document.getElementById('saveEducationBtn').addEventListener('click', saveEducation);
    loadEducation();
  });
  