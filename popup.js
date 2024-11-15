document.addEventListener("DOMContentLoaded", function() {
  const saveButton = document.getElementById('saveProfileDataBtn');
  if (saveButton) {
    saveButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id) {
          // Məlumatları content.js-dən əldə etmək üçün mesaj göndəririk
          chrome.tabs.sendMessage(tabs[0].id, { action: "getProfileData" }, (response) => {
            if (response) {
              // Alınan məlumatları popapda göstəririk
              console.log("Profil məlumatları alındı:", response);
              
              document.getElementById("name").innerText = response.name;
              document.getElementById("experience").innerText = response.experience.join(", ");
              document.getElementById("education").innerText = response.education.join(", ");
              
              // Məlumatları yerli yaddaşa (localStorage) saxlayırıq
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
