(function () {
    function getSkills() {
        const skills = [];
        document.querySelectorAll('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold').forEach(skill => {
            const skillText = skill.querySelector('span[aria-hidden="true"]');
            if (skillText) {
                skills.push(skillText.textContent.trim());
            }
        });
        return skills;
    }

    const skillsData = {
        skills: getSkills()
    };

    chrome.runtime.sendMessage({ type: 'profileData', data: skillsData });
})();
