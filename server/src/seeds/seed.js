require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Service = require('../models/Service');
const Settings = require('../models/Settings');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://duttasanku2004_db_user:zdeFOfcN5z41WhJe@cluster0.cjy8vqs.mongodb.net/?appName=Cluster0';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Settings.deleteMany({}),
    ]);

    // Also drop stale indexes to prevent slug conflicts
    try { await mongoose.connection.db.collection('services').dropIndexes(); } catch {}
    try { await mongoose.connection.db.collection('settings').dropIndexes(); } catch {}

    // Create admin user
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@kineticorange.com',
      password: 'admin123456',
      role: 'superadmin',
      isActive: true,
      isVerified: true,
    });
    console.log('Admin created:', admin.email);

    // Create test client user
    const client = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'client',
      company: 'TechCorp',
      isActive: true,
      isVerified: true,
    });
    console.log('Client created:', client.email);

    // Seed services one by one to trigger pre('save') hooks for slug generation
    const serviceData = [
      {
        title: 'Web Applications',
        description: 'Full-stack web applications built with cutting-edge technology. Scalable, performant, and production-ready from day one.',
        shortDescription: 'Custom full-stack web applications',
        icon: 'code',
        tags: ['Next.js', 'React', 'Node.js', 'TypeScript'],
        features: [
          { title: 'Custom Architecture', description: 'Tailored solutions for your needs' },
          { title: 'API Development', description: 'RESTful and GraphQL APIs' },
          { title: 'Real-time Features', description: 'WebSocket and SSE integration' },
          { title: 'Cloud Deployment', description: 'AWS, GCP, and Vercel' },
        ],
        pricing: { startingAt: 5000, currency: 'USD' },
        order: 1,
        isActive: true,
        isFeatured: true,
      },
      {
        title: 'AI Integration',
        description: 'Integrate artificial intelligence into your workflows. From chatbots to predictive analytics.',
        shortDescription: 'AI-powered solutions and automation',
        icon: 'bot',
        tags: ['GPT', 'LangChain', 'ML', 'Automation'],
        features: [
          { title: 'LLM Integration', description: 'ChatGPT, Claude, and custom models' },
          { title: 'Custom Training', description: 'Fine-tuned models for your domain' },
        ],
        pricing: { startingAt: 10000, currency: 'USD' },
        order: 2,
        isActive: true,
        isFeatured: true,
      },
      {
        title: 'Admin Dashboards',
        description: 'Powerful admin panels with real-time analytics, user management, and custom reports.',
        shortDescription: 'Production-grade admin panels',
        icon: 'layout-dashboard',
        tags: ['Analytics', 'CMS', 'Real-time'],
        pricing: { startingAt: 8000, currency: 'USD' },
        order: 3,
        isActive: true,
        isFeatured: false,
      },
      {
        title: 'Brand Systems',
        description: 'Complete brand identity and design system creation.',
        shortDescription: 'Design systems and brand identity',
        icon: 'palette',
        tags: ['Identity', 'Design Systems', 'UI/UX'],
        pricing: { startingAt: 3000, currency: 'USD' },
        order: 4,
        isActive: true,
      },
      {
        title: 'E-Commerce',
        description: 'High-converting e-commerce platforms built to scale.',
        shortDescription: 'Custom e-commerce solutions',
        icon: 'shopping-cart',
        tags: ['Storefront', 'Payments', 'Inventory'],
        pricing: { startingAt: 7000, currency: 'USD' },
        order: 5,
        isActive: true,
        isFeatured: true,
      },
      {
        title: 'Automation',
        description: 'Automate repetitive tasks and streamline operations.',
        shortDescription: 'Workflow automation and integration',
        icon: 'zap',
        tags: ['Workflows', 'API', 'Cron', 'Webhooks'],
        pricing: { startingAt: 4000, currency: 'USD' },
        order: 6,
        isActive: true,
      },
    ];

    // Use create() one-by-one so pre('save') hooks run and generate slugs
    for (const s of serviceData) {
      await Service.create(s);
    }
    console.log(`${serviceData.length} services seeded`);

    // Seed settings one by one
    const settingsData = [
      { key: 'siteName', value: 'Kinetic Orange', category: 'general', isPublic: true },
      { key: 'siteTagline', value: 'Premium Software Agency', category: 'general', isPublic: true },
      { key: 'contactEmail', value: 'hello@kineticorange.com', category: 'general', isPublic: true },
      { key: 'contactPhone', value: '+91 98765 43210', category: 'general', isPublic: true },
      { key: 'address', value: 'Bengaluru, Karnataka, India', category: 'general', isPublic: true },
      { key: 'github', value: 'https://github.com/kineticorange', category: 'social', isPublic: true },
      { key: 'twitter', value: 'https://twitter.com/kineticorange', category: 'social', isPublic: true },
      { key: 'linkedin', value: 'https://linkedin.com/company/kineticorange', category: 'social', isPublic: true },
    ];

    for (const setting of settingsData) {
      await Settings.create(setting);
    }
    console.log('Settings seeded');

    console.log('\n══════════════════════════════════════');
    console.log('  SEED COMPLETE');
    console.log('  Admin: admin@kineticorange.com / admin123456');
    console.log('  Client: john@example.com / password123');
    console.log('══════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedData();
