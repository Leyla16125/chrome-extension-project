chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'fetchPageContent') {
    }
  
    if (message.type === 'getProfileData') {
      chrome.storage.local.get('profileData', (result) => {
        sendResponse({ status: 'success', data: result.profileData || {} });
      });
      return true;
    }
  
    if (message.type === 'sendProfileDataViaEmail') {
      chrome.storage.local.get('profileData', (result) => {
        const profileData = result.profileData || {};
  
        const emailBody = Object.keys(profileData)
          .map(field => `${field}: ${profileData[field]}`)
          .join('\n');
  
        const mailtoUrl = `mailto:?subject=Profile Data&body=${encodeURIComponent(emailBody)}`;
        
        window.open(mailtoUrl);
  
        sendResponse({ status: 'success', message: 'Email sent successfully.' });
      });
      return true;
    }
  
    const handleProfileData = (field, data) => {
      chrome.storage.local.get('profileData', (result) => {
        const currentData = result.profileData || {};
        if (field) {
          currentData[field] = data;
        } else {
          Object.assign(currentData, data);
        }
        chrome.storage.local.set({ profileData: currentData }, () => {
          sendResponse({ status: 'success', message: `${field || 'Profile'} data saved.` });
        });
      });
    };
  
    switch (message.type) {
      case 'profileData':
        handleProfileData(null, message.data);
        return true;
  
      case 'certificatesData':
        handleProfileData('certificates', message.data);
        return true;
  
      case 'experiencesData':
        handleProfileData('experiences', message.data);
        return true;
  
      case 'educationData':
        handleProfileData('education', message.data);
        return true;
  
      case 'languagesData':
        handleProfileData('languages', message.data);
        return true;
  
      default:
        console.warn('Unknown message type:', message.type);
        sendResponse({ status: 'error', message: 'Unknown message type.' });
        return false;
    }
  });
  