const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clientName: { type: String },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    status: {
      type: String,
      enum: ['inquiry', 'proposal', 'in-progress', 'review', 'completed', 'cancelled'],
      default: 'inquiry',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    budget: { type: Number },
    currency: { type: String, default: 'USD' },
    startDate: Date,
    endDate: Date,
    deadline: Date,
    progress: { type: Number, default: 0, min: 0, max: 100 },
    technologies: [String],
    images: [{ url: String, alt: String }],
    thumbnail: { type: String },
    liveUrl: String,
    repositoryUrl: String,
    milestones: [
      {
        title: String,
        description: String,
        dueDate: Date,
        isCompleted: { type: Boolean, default: false },
        completedAt: Date,
      },
    ],
    notes: [
      {
        content: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isFeatured: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    seo: {
      metaTitle: String,
      metaDescription: String,
    },
  },
  { timestamps: true }
);

projectSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

projectSchema.index({ status: 1, client: 1 });
projectSchema.index({ slug: 1 });

module.exports = mongoose.model('Project', projectSchema);
