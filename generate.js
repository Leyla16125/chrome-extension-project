const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateCoverLetter(htmlStructure) {
  try {
    if (!htmlStructure) {
      throw new Error("No HTML content.");
    }

    const genAI = new GoogleGenerativeAI("AIzaSyCLz7IeZR-Kjr9djpZ9coYgMbF5Xu_t-n8");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
     Here is the full html body of a company CV apply page:

      ${htmlStructure}

      Please extract the job title and company name from the HTML code snippet above and provide a Cover Letter for this position in text format.
    `;

    const result = await model.generateContent(prompt);

    if (!result || !result.response || !result.response.text()) {
      throw new Error("AI response is missing or invalid.");
    }

    return result.response.text();
  } catch (error) {
    console.error("Error generating cover letter:", error.message);
    throw error;
  }
}

module.exports = generateCoverLett
