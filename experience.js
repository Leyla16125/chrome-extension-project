function loadExperiences() {
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
      const storedData = response.data || {};
      const experiences = storedData.experiences || [];
      const experiencesTextarea = document.getElementById('experiencesTextarea');
      experiencesTextarea.value = experiences.join('\n');
    });
  } 
  
  function resetExperiencesData() {
    chrome.tabs.executeScript(null, { file: 'get_content_experience.js' }, () => {
      setTimeout(() => {
        chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
          const experiences = response.data.experiences || [];
          const experiencesTextarea = document.getElementById('experiencesTextarea');
          experiencesTextarea.value = experiences.join('\n');
          alert('Experiences data has been reset and reloaded!');
        });
      });
    });
  }
  
  
  function saveExperiences() {
    const experiencesTextarea = document.getElementById('experiencesTextarea');
    const experiences = experiencesTextarea.value.split('\n').map(exp => exp.trim()).filter(exp => exp);
  
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
      const storedData = response.data || {};
      storedData.experiences = experiences;
  
      chrome.runtime.sendMessage({ type: 'profileData', data: storedData }, (saveResponse) => {
        if (saveResponse.status === 'success') {
          alert('Experiences saved successfully!');
        }
      });
    });
  }
  
  window.addEventListener('load', () => {
    document.getElementById('refreshExperiencesBtn').addEventListener('click', resetExperiencesData);
    document.getElementById('saveExperiencesBtn').addEventListener('click', saveExperiences);
    loadExperiences();
  });
  