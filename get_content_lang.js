(function () {
  const extractLanguageData = () => {
      const items = document.querySelectorAll('li.pvs-list__paged-list-item');
      const languages = [];

      items.forEach((item) => {
          try {
              const language = item.querySelector('div.mr1.t-bold span[aria-hidden="true"]')?.textContent.trim();
              const proficiency = item.querySelector('span.t-14.t-normal span[aria-hidden="true"]')?.textContent.trim();

              if (language && proficiency) {
                  languages.push(`${language}: ${proficiency}`);
              }
          } catch (err) {
              console.error('Error processing language item:', err);
          }
      });

      return languages;
  };

  const languageData = extractLanguageData();

  chrome.runtime.sendMessage(
      { type: 'profileData', data: { languages: languageData } },
      (response) => {
          if (response?.status === 'success') {
              console.log('Languages updated successfully!');
          } else {
              console.error('Failed to update languages:', response?.error);
          }
      }
  );
})();
