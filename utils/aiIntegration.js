const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Example: Summarize meeting transcript
const summarizeMeeting = async (transcript) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Summarize the following meeting transcript with key action items.",
        },
        { role: "user", content: transcript },
      ],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return "AI summary failed";
  }
};

module.exports = { summarizeMeeting };
