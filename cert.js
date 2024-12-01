function loadCertificates() {
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
        const storedData = response.data || {};
        const certificates = storedData.certificates || [];
  
        const certificatesTextarea = document.getElementById('certificatesTextarea');
        // Format the certificates before displaying them
        certificatesTextarea.value = formatCertificates(certificates);
    });
  }
    
    function resetCertificatesData() {
      chrome.tabs.executeScript(null, { file: 'get_content_cert.js' }, () => {
          alert('Certificates data has been reset and reloaded!');
          loadCertificates(); // Reload certificates after resetting
      });
    }
    
    function formatCertificates(certificates) {
      // Format each certificate with a bullet point
      return certificates.map(cert => `${cert}\n`).join('\n');
  }
  
    function saveCertificates() {
      const certificatesTextarea = document.getElementById('certificatesTextarea');
      // Remove the bullet points and split into an array
      const certificates = certificatesTextarea.value
          .split('\n')
          .map(cert => cert.replace(/^•\s*/, '').trim())
          .filter(cert => cert);
  
      chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
          const storedData = response.data || {};
          storedData.certificates = certificates;
  
          chrome.runtime.sendMessage({ type: 'profileData', data: storedData }, (saveResponse) => {
              if (saveResponse.status === 'success') {
                  alert('Certificates saved successfully!');
              }
          });
      });
    }
    
    window.addEventListener('load', () => {
      document.getElementById('refreshCertificatesBtn').addEventListener('click', resetCertificatesData);
      document.getElementById('saveCertificatesBtn').addEventListener('click', saveCertificates);
      loadCertificates();
    });
    