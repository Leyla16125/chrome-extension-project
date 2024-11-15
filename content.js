chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getProfileData") {
      const profileData = {
        name: document.querySelector('.text-heading-xlarge')?.innerText || 'Ad tapılmadı',
        experience: Array.from(document.querySelectorAll('.experience-section li')).map(el => el.innerText.trim()),
        education: Array.from(document.querySelectorAll('.education-section li')).map(el => el.innerText.trim())
      };
  
// To retrieve information from the profile in the console
      console.log("Alınan Profil Məlumatları:", profileData);
  
      sendResponse(profileData);//asynchrously
  
      return true;
    }
  });
  