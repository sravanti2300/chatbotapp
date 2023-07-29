const languageStage = require('./predisbursalflow/language.service');
const mainStage = require('./predisbursalflow/main.service');
const uploadStage = require('./predisbursalflow/upload.service');
const aadharFrontStage = require('./predisbursalflow/aadharfront.service');
const aadharBackStage = require('./predisbursalflow/aadharback.service');
const panStage = require('./predisbursalflow/pan.service');
const locationStage = require('./predisbursalflow/location.service');

module.exports = {
  languageStage,
  mainStage,
  uploadStage,
  aadharFrontStage,
  aadharBackStage,
  panStage,
  locationStage,
};
