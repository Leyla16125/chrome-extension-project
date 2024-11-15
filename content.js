chrome.storage.sync.get(['name', 'email', 'certificates', 'portfolio', 'summary'], function(data) {
    if (data.name) {
      // Find the relevant form fields and fill them with saved data
      let nameField = document.querySelector('input[name="name"]');
      if (nameField) {
        nameField.value = data.name;
      }
    }
  
    if (data.email) {
      let emailField = document.querySelector('input[name="email"]');
      if (emailField) {
        emailField.value = data.email;
      }
    }
  
    if (data.certificates) {
      let certificatesField = document.querySelector('input[name="certificates"]');
      if (certificatesField) {
        certificatesField.value = data.certificates;
      }
    }
  
    if (data.portfolio) {
      let portfolioField = document.querySelector('input[name="portfolio"]');
      if (portfolioField) {
        portfolioField.value = data.portfolio;
      }
    }
  
    if (data.summary) {
      let summaryField = document.querySelector('textarea[name="summary"]');
      if (summaryField) {
        summaryField.value = data.summary;
      }
    }
  });
  