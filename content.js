chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getProfileData") {
    // Profil adını alırıq
    const profileName = document.querySelector('.text-heading-xlarge')?.innerText || 'Ad tapılmadı';

    // Təcrübə məlumatlarını alırıq (Doğru seçicini istifadə edirik)
    const experienceElements = document.querySelectorAll('.pv-profile-section--experience ul li');
    const experienceList = Array.from(experienceElements).map(el => el.innerText.trim());

    // Təhsil məlumatlarını alırıq (Doğru seçicini istifadə edirik)
    const educationElements = document.querySelectorAll('.pv-profile-section--education ul li');
    const educationList = Array.from(educationElements).map(el => el.innerText.trim());

    
    // Profil məlumatlarını toplama
    const profileData = {
      name: profileName,
      experience: experienceList,
      education: educationList
    };

    console.log("Alınan Profil Məlumatları:", profileData); // Konsola məlumatları çap edirik

    // Profil məlumatlarını cavab olaraq göndəririk
    sendResponse(profileData);

    // Asinxron cavab qaytarırıq
    return true;
  }
});
