# Deployment Guide — Kinetic Orange

## Architecture Overview

The application consists of three independently deployable services:

| Service | Port | Technology | Purpose |
|---------|------|-----------|---------|
| Server | 5000 | Express.js | REST API |
| Client | 3000 | Next.js | Public website + Dashboard |
| Admin | 3001 | Next.js | Administration panel |

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- MongoDB 7+ (or MongoDB Atlas)
- PM2 (for process management)
- Nginx (reverse proxy)
- SSL Certificate (Let's Encrypt)

---

## Server Deployment

```bash
cd server
npm install --production
cp .env.example .env
# Configure .env with production values

# Using PM2
pm2 start src/index.js --name "ko-api" -i max
pm2 save
```

### Environment Variables (Production)

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/kinetic-orange
JWT_SECRET=<strong-random-string-64-chars>
JWT_REFRESH_SECRET=<strong-random-string-64-chars>
CLIENT_URL=https://kineticorange.com
ADMIN_URL=https://admin.kineticorange.com
```

---

## Client Deployment

```bash
cd client
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to production API

npm run build
npm start
# Or with PM2:
pm2 start npm --name "ko-client" -- start
```

---

## Admin Deployment

```bash
cd admin
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to production API

npm run build
PORT=3001 npm start
# Or with PM2:
pm2 start npm --name "ko-admin" -- start -- --port 3001
```

---

## Nginx Configuration

```nginx
# Client
server {
    listen 443 ssl http2;
    server_name kineticorange.com;

    ssl_certificate /etc/letsencrypt/live/kineticorange.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kineticorange.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Admin
server {
    listen 443 ssl http2;
    server_name admin.kineticorange.com;

    ssl_certificate /etc/letsencrypt/live/admin.kineticorange.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin.kineticorange.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# API
server {
    listen 443 ssl http2;
    server_name api.kineticorange.com;

    ssl_certificate /etc/letsencrypt/live/api.kineticorange.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.kineticorange.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## MongoDB Atlas Setup

1. Create cluster at mongodb.com/cloud/atlas
2. Create database user with readWrite permissions
3. Whitelist server IP (or 0.0.0.0/0 for testing)
4. Copy connection string to `MONGODB_URI`

---

## Docker (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  api:
    build: ./server
    ports: ["5000:5000"]
    env_file: ./server/.env
    depends_on: [mongo]

  client:
    build: ./client
    ports: ["3000:3000"]

  admin:
    build: ./admin
    ports: ["3001:3001"]

  mongo:
    image: mongo:7
    ports: ["27017:27017"]
    volumes: [mongo-data:/data/db]

volumes:
  mongo-data:
```

---

## Security Checklist

- [ ] Change default JWT secrets
- [ ] Enable HTTPS everywhere
- [ ] Set proper CORS origins
- [ ] Configure rate limiting
- [ ] Enable MongoDB auth
- [ ] Use environment variables (never hardcode)
- [ ] Set `NODE_ENV=production`
- [ ] Enable Helmet security headers
- [ ] Regular dependency updates
