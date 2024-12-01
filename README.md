# Chrome Extension for Automated Form Filling and AI Integration

This project is a Chrome extension designed to automate form filling for job applications and enhance productivity with AI-powered cover letter generation. It extracts, edits, and organizes user data, ensuring a seamless application experience.

---

## 📂 Project Structure

### Key Files and Folders:

- **`dist/`**: Contains compiled assets for the Chrome extension.
- **`background.js`**: Handles background processes for the extension.
- **`content.js`**: Injected into web pages to interact with DOM elements and extract relevant information.
- **`popup.html` & `popup.js`**: Implements the user interface of the extension popup.
- **`manifest.json`**: Configuration file defining the Chrome extension's metadata and permissions.
- **`styles.css`**: Styles for the popup and other UI elements.

### Feature-Specific Files:

- **Field Management**:
  - `customFields.js`: Manages dynamic custom field creation for user profiles.
  - `skills.js`: Extracts and manages skill data.
  - `cert.js`, `edu.js`, `experience.js`: Fetches certification, education, and experience data.

- **Data Extraction**:
  - `get_content_cert.js`, `get_content_edu.js`, `get_content_experience.js`, `get_content_lang.js`, `get_content_skills.js`: Extracts specific user data sections.

- **AI Integration**:
  - `generate.js`: Implements AI-powered cover letter generation.

- **Miscellaneous**:
  - `webpack.config.js`: Webpack configuration for bundling resources.

---

## 🚀 Features

1. **Automated Data Extraction**:
   - Extracts data like certifications, education, skills, and experiences from structured websites.

2. **Custom Field Management**:
   - Allows users to add, edit, and manage custom fields for personalized form filling.

3. **AI-Powered Cover Letter Generation**:
   - Utilizes AI to generate tailored cover letters based on extracted job descriptions.

4. **Enhanced Productivity**:
   - Automates repetitive tasks and reduces errors during form filling.

---

## 🔧 Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name.git
   cd WebMobileProject



# 📚 How to Use

## Open the Extension
1. Click on the extension icon in the Chrome toolbar to access the popup.

## Fetch Data
2. Visit a relevant web page (e.g., LinkedIn or job boards).
3. The extension will automatically extract available user data.

## Customize Fields
4. Add custom fields or edit existing ones via the popup interface.

## Generate Cover Letter
5. Use the AI integration to create a personalized cover letter based on the extracted job description.

## Final Output
6. Once all the required fields are filled or edited, you can submit the form automatically or copy the data to use elsewhere.

## Valid Endpoints
- [https://www.linkedin.com/in/username/details/skills](https://www.linkedin.com/in/username/details/skills)
- [https://www.linkedin.com/in/username/details/experience](https://www.linkedin.com/in/username/details/experience)
- [https://www.linkedin.com/in/username/overlay/contact-info](https://www.linkedin.com/in/username/overlay/contact-info)
- [https://www.linkedin.com/in/username/details/education](https://www.linkedin.com/in/username/details/education)
- [https://www.linkedin.com/in/username/details/certifications](https://www.linkedin.com/in/username/details/certifications)
- [https://www.linkedin.com/in/username/details/languages](https://www.linkedin.com/in/username/details/languages)

