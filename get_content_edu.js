(function () {
  const extractEducationData = () => {
      const items = document.querySelectorAll('li.pvs-list__paged-list-item');
      const educationList = [];

      items.forEach((item) => {
          try {
              const role = item.querySelector('div > div > div > span[aria-hidden="true"]')?.textContent.trim();
              const institution = item.querySelector('span.t-14.t-normal span[aria-hidden="true"]')?.textContent.trim();
              const dates = item.querySelector('span.t-14.t-black--light span[aria-hidden="true"]:first-child')?.textContent.trim();

              if (role && institution && dates) {
                  educationList.push(`${institution} - ${role} - ${dates}`);
              }
          } catch (err) {
              console.error('Error processing education item:', err);
          }
      });

      return educationList;
  };

  const educationData = extractEducationData();
  chrome.runtime.sendMessage({ type: 'educationData', data: educationData });
})();
