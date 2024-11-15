chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getProfileData") {
      console.log("Received request for profile data");
  
      // Simulate profile data or fetch real data
      const profileData = {
        name: 'John Doe',
        experience: ['Software Engineer at Company A', 'Developer at Company B'],
        education: ['BSc in Computer Science']
      };
  
      sendResponse(profileData);
    }
  });
  