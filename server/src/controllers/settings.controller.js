const Settings = require('../models/Settings');

exports.getPublicSettings = async (req, res, next) => {
  try {
    const settings = await Settings.find({ isPublic: true });
    const data = {};
    settings.forEach(s => { data[s.key] = s.value; });
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

exports.getAllSettings = async (req, res, next) => {
  try {
    const settings = await Settings.find().sort({ category: 1, key: 1 });
    res.json({ success: true, data: settings });
  } catch (error) { next(error); }
};

exports.updateSetting = async (req, res, next) => {
  try {
    const { key, value, category, description, isPublic } = req.body;
    const setting = await Settings.findOneAndUpdate(
      { key },
      { key, value, category, description, isPublic },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: setting });
  } catch (error) { next(error); }
};

exports.deleteSetting = async (req, res, next) => {
  try {
    await Settings.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Setting deleted' });
  } catch (error) { next(error); }
};
