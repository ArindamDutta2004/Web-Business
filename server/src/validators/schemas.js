const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required').max(50),
    lastName: z.string().min(1, 'Last name is required').max(50),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    phone: z.string().optional(),
    company: z.string().optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).max(50).optional(),
    lastName: z.string().min(1).max(50).optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
  }),
});

const contactSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().optional(),
    company: z.string().optional(),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
    service: z.string().optional(),
    budget: z.string().optional(),
  }),
});

const leadSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().optional(),
    company: z.string().optional(),
    service: z.string().optional(),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    message: z.string().max(3000).optional(),
  }),
});

const serviceSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(120),
    description: z.string().min(1).max(2000),
    shortDescription: z.string().max(300).optional(),
    icon: z.string().optional(),
    tags: z.array(z.string()).optional(),
    features: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
    pricing: z.object({ startingAt: z.number().optional(), currency: z.string().optional() }).optional(),
    order: z.number().optional(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
  }),
});

const blogSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    excerpt: z.string().max(500).optional(),
    category: z.string().min(1),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
    isFeatured: z.boolean().optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

const projectSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    client: z.string().optional(),
    clientName: z.string().optional(),
    service: z.string().optional(),
    status: z.enum(['inquiry', 'proposal', 'in-progress', 'review', 'completed', 'cancelled']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    budget: z.number().optional(),
    technologies: z.array(z.string()).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    deadline: z.string().optional(),
  }),
});

const invoiceSchema = z.object({
  body: z.object({
    client: z.string().min(1),
    project: z.string().optional(),
    items: z.array(z.object({
      description: z.string().min(1),
      quantity: z.number().min(1),
      rate: z.number().min(0),
      amount: z.number().min(0),
    })).min(1),
    subtotal: z.number(),
    tax: z.number().optional(),
    taxRate: z.number().optional(),
    discount: z.number().optional(),
    total: z.number(),
    dueDate: z.string().min(1),
    notes: z.string().optional(),
    terms: z.string().optional(),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  contactSchema,
  leadSchema,
  serviceSchema,
  blogSchema,
  projectSchema,
  invoiceSchema,
};
