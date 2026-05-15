const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    subject: { type: String, trim: true },
    content: { type: String, required: true, maxlength: 5000 },
    attachments: [{ name: String, url: String, type: String }],
    isRead: { type: Boolean, default: false },
    readAt: Date,
    parentMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true }
);

messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });
messageSchema.index({ project: 1 });

module.exports = mongoose.model('Message', messageSchema);
