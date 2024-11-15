document.addEventListener("DOMContentLoaded", function() {
    const saveButton = document.getElementById('saveProfileDataBtn');
    if (saveButton) {
      saveButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0] && tabs[0].id) {
            // We send a message to get the data from content.js
            chrome.tabs.sendMessage(tabs[0].id, { action: "getProfileData" }, (response) => {
              if (response) {
                // We show the received information in a popup
                console.log("Profil məlumatları alındı:", response);
                
                document.getElementById("name").innerText = response.name;
                document.getElementById("experience").innerText = response.experience.join(", ");
                document.getElementById("education").innerText = response.education.join(", ");
                
                //We save data to local storage (localStorage). 
                localStorage.setItem('profileData', JSON.stringify(response));
              } else {
                console.log("Content script-dən heç bir məlumat alınmadı.");
              }
            });
          }
        });
      });
    } else {
      console.log("Save Profile Data düyməsi tapılmadı.");
    }
  });
  
