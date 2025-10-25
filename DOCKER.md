# Mind Mirror - Docker Setup

This document explains how to run the Mind Mirror application using Docker.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### Production Environment

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build
```

### Development Environment

```bash
# Start development environment with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Run in background
docker-compose -f docker-compose.dev.yml up -d --build
```

## Services

### API Service
- **Port**: 8080
- **Health Check**: `GET http://localhost:8080/health`
- **Endpoints**:
  - `POST /api/users/register`
  - `POST /api/users/login`
  - `POST /api/users/logout`

### MongoDB Service
- **Port**: 27017
- **Database**: mind_mirror
- **Admin User**: admin/password123

## Environment Variables

### Production
- `NODE_ENV=production`
- `PORT=8080`
- `MONGO_URI=mongodb://admin:password123@mongodb:27017/mind_mirror?authSource=admin`
- `JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure`

### Development
- `NODE_ENV=development`
- `PORT=8080`
- `MONGO_URI=mongodb://mongodb:27017/mind_mirror_dev`
- `JWT_SECRET=dev_jwt_secret_key_for_development_only`

## Docker Commands

### Build and Run
```bash
# Build the image
docker build -t mind-mirror-api .

# Run the container
docker run -p 8080:8080 --env-file .env mind-mirror-api
```

### Development
```bash
# Build development image
docker build -f Dockerfile.dev -t mind-mirror-api:dev .

# Run with volume mounting for hot reload
docker run -p 8080:8080 -v $(pwd):/app -v /app/node_modules mind-mirror-api:dev
```

### Docker Compose Commands
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and start
docker-compose up --build

# Remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

## Health Checks

The API includes health checks that verify:
- Application is running
- Database connection is working
- All endpoints are accessible

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   netstat -tulpn | grep :8080
   # Kill the process or change the port in docker-compose.yml
   ```

2. **MongoDB connection issues**
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   
   # Restart MongoDB service
   docker-compose restart mongodb
   ```

3. **Build failures**
   ```bash
   # Clean build
   docker-compose down
   docker system prune -f
   docker-compose up --build
   ```

### Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs api
docker-compose logs mongodb

# Follow logs in real-time
docker-compose logs -f api
```

## Security Notes

- Change default passwords in production
- Use strong JWT secrets
- Consider using Docker secrets for sensitive data
- Regularly update base images

## Performance Optimization

- Use multi-stage builds for smaller images
- Implement proper caching strategies
- Monitor resource usage
- Use health checks for better reliability
