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

    // Detect job title and company name fields
    let jobTitleField = document.querySelector('input[name="job_title"]') || document.querySelector('input[placeholder="Job Title"]');
    let companyNameField = document.querySelector('input[name="company_name"]') || document.querySelector('input[placeholder="Company Name"]');

    let jobTitle = jobTitleField ? jobTitleField.value : "";
    let companyName = companyNameField ? companyNameField.value : "";

    // Send the data to popup for generating cover letter
    chrome.runtime.sendMessage({ action: "generateCoverLetter", jobTitle, companyName });
});
