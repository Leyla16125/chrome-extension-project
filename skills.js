function writeSkills() {
    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error: ", chrome.runtime.lastError.message);
            alert("Failed to load skills. Ensure the extension has access to the required page.");
            return;
        }
        const storedData = response?.data || {};
        let skills = storedData.skills || [];

        // Exclude the last 5 lines of skills
        if (skills.length > 5) {
            skills = skills.slice(0, -5);
        }

        const skillsTextarea = document.getElementById('skillsTextarea');
        skillsTextarea.value = skills.join(', ');
    });
}


function resetSkillsData() {
    chrome.tabs.executeScript(null, { file: 'get_content_skills.js' }, () => {
        alert('Skills data has been reset and reloaded!');
        writeSkills();
    });
}

function saveSkills() {
    const skillsTextarea = document.getElementById('skillsTextarea');
    const skills = skillsTextarea.value.split(',').map(skill => skill.trim()).filter(skill => skill);

    chrome.runtime.sendMessage({ type: 'getProfileData' }, (response) => {
        const storedData = response.data || {};
        storedData.skills = skills;

        chrome.runtime.sendMessage({ type: 'profileData', data: storedData }, (saveResponse) => {
            if (saveResponse.status === 'success') {
                alert('Skills saved successfully!');
            }
        });
    });
}

window.addEventListener('load', () => {
    document.getElementById('resetSkills').addEventListener('click', resetSkillsData);
    document.getElementById('saveSkills').addEventListener('click', saveSkills);
    writeSkills();
});
