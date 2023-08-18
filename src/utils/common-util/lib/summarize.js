const axios = require("axios");
const config = require("config");
const edenAI = config.get("edenAi");
module.exports = {
  getSummarizeText: async (params) => {
    const { text } = params;
    try {
      const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/text/summarize",
        headers: {
          authorization: `Bearer ${edenAI.aiToken}`,
        },
        data: {
          output_sentences: 5,
          providers: "openai",
          text: text,
          language: "en",
        },
      };
      const response = await axios.request(options);
      return response;
    } catch (e) {
      console.log("er", e);
      return false;
    }
  },
  getTopic: async (params) => {
    const { text } = params;
    try {
      const options2 = {
        method: "POST",
        url: "https://api.edenai.run/v2/text/topic_extraction",
        headers: {
          authorization: `Bearer ${edenAI.aiToken}`,
        },
        data: {
          providers: "openai",
          text: text,
          language: "en",
        },
      };
      const topic = await axios.request(options2);
      return topic;
    } catch (e) {
      console.log("er", e);
      return false;
    }
  },
};
