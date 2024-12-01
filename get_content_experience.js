(function () {
  const extractExperienceData = () => {
      const items = document.querySelectorAll('li.pvs-list__paged-list-item');
      const experienceList = [];

      items.forEach((item) => {
          try {
              const position = item.querySelector('div > div > div > span[aria-hidden="true"]')?.textContent.trim();
              const company = item.querySelector('span.t-14.t-normal span[aria-hidden="true"]')?.textContent.trim();
              const duration = item.querySelector('span.t-14.t-black--light span[aria-hidden="true"]:first-child')?.textContent.trim();

              if (position && company && duration) {
                  experienceList.push(`${company} - ${position} - ${duration}`);
              }
          } catch (err) {
              console.error('Error processing experience item:', err);
          }
      });

      return experienceList;
  };

  const experienceData = extractExperienceData();
  chrome.runtime.sendMessage({ type: 'experiencesData', data: experienceData });
})();
