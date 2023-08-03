const { Configuration, OpenAIApi } = require('openai');

const templateModel = require('../models/templates.model');
const { logger } = require('../../config/logger');

const Options = {
  'Loan Information': 2, 'Raise and Track Complaints': 3, 'Release Gold(Close Loan)': 4, 'Renew Loan': 5,
};

exports.chatGPtResponse = async (userInput, templateName) => {
  const templateData = await templateModel.findOne({ name: templateName });
  const content = await templateData.render({ userInput });
  // Use the Accountant prompt of ChatGPT
  try {
    const configuration = new Configuration({
      apiKey: process.env.CHATGPT_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content }],
    });

    if (Options[res.data.choices[0].message.content]) {
      return Options[res.data.choices[0].message.content];
    }
  } catch (err) {
    logger.error('hey, incurred an error', err);
  }
  return null;
};
