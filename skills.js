function getSkills() {
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
      const storedData = response.data || {};
      let skills = storedData.skills || [];

      if (skills.length > 5) {
        skills = skills.slice(0, -5);
      }
  
      const skillsTextarea = document.getElementById('skillsTextarea');
      skillsTextarea.value = skills.join(', ');
    });
  }
  
  function resetSkillsData() {
    chrome.tabs.executeScript(null, { file: 'payload_skills.js' }, () => {
      alert('Skills data has been reset and reloaded!');
      getSkills();
    });
  }
  
  function saveSkills() {
    const skillsTextarea = document.getElementById('skillsTextarea');
    const skills = skillsTextarea.value.split(',').map(skill => skill.trim()).filter(skill => skill);
  
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
      const storedData = response.data || {};
      storedData.skills = skills;
  
      chrome.runtime.sendMessage({ type: 'profileData', data: storedData }, (saveResponse) => {
        if (saveResponse.status === 'success') {
          alert('Skills saved successfully!');
        }
      });
    });
  }
  
  window.addEventListener('load', () => {
    document.getElementById('refreshSkillsBtn').addEventListener('click', resetSkillsData);
    document.getElementById('saveSkillsBtn').addEventListener('click', saveSkills);
    getSkills();
  });
  
