const languageStage = require('./predisbursalflow/language.stage');
const mainStage = require('./predisbursalflow/main.stage');
const uploadStage = require('./predisbursalflow/upload.stage');
const aadharFrontStage = require('./predisbursalflow/aadharfront.stage');
const aadharBackStage = require('./predisbursalflow/aadharback.stage');
const panStage = require('./predisbursalflow/pan.stage');
const locationStage = require('./predisbursalflow/location.stage');
const postdisbLanguageStage = require('./postdisbursalflow/language.stage');
const postdisbMainStage = require('./postdisbursalflow/main.stage');
const postdisbChatgptStage = require('./postdisbursalflow/chatgpt.stage');

module.exports = {
  languageStage,
  mainStage,
  uploadStage,
  aadharFrontStage,
  aadharBackStage,
  panStage,
  locationStage,
  postdisbLanguageStage,
  postdisbMainStage,
  postdisbChatgptStage,
};
