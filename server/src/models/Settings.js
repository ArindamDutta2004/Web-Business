const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    category: {
      type: String,
      enum: ['general', 'seo', 'email', 'social', 'pricing', 'appearance'],
      default: 'general',
    },
    description: String,
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// key already has unique: true which creates an index automatically
settingsSchema.index({ category: 1 });

// Static method to get a setting by key
settingsSchema.statics.getSetting = async function (key, defaultValue = null) {
  const setting = await this.findOne({ key });
  return setting ? setting.value : defaultValue;
};

// Static method to set a setting
settingsSchema.statics.setSetting = async function (key, value, category = 'general') {
  return this.findOneAndUpdate(
    { key },
    { key, value, category },
    { upsert: true, new: true }
  );
};

module.exports = mongoose.model('Settings', settingsSchema);
