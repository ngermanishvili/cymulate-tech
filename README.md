# Cymulate Phishing Simulation Platform
Overview

## Overview
A sophisticated full-stack web application designed to simulate sophisticated phishing scenarios, enhance security awareness training, and provide comprehensive threat intelligence through advanced email simulation and engineered as a monorepo to streamline development, enhance code sharing, and provide modular architecture for phishing simulation.

## Monorepo Architecture Advantages

Unified codebase management
Shared TypeScript types and utilities
Simplified dependency management
Consistent coding standards across services
Easier continuous integration and deployment

## Tech Stack
- **Frontend**: React (Vite)
- **Backend Services**: Management Server (NestJS) / Simulation Server (NestJS)
- **Shared Libraries**: TypeScript
- **Architecture**: Monorepo with shared libraries
- **Containerization**: Docker

## Project Structure
```
packages/
├── frontend/           # React frontend (Vite)
├── management-server/  # NestJS management server
├── simulation-server/  # NestJS simulation server
└── shared/             # Shared TypeScript utilities
```


### Management Server
- **User Management**
  - Secure authentication system
  - Role-based access control
  - User profile management

- **Campaign Configuration**
  - Create and manage phishing simulation scenarios
  - Define targeted email templates
  - Schedule and track campaign workflows

### Simulation Server
- **Email Generation**
  - Dynamic phishing email template creation
  - Contextual scenario modeling
  - Realistic social engineering techniques

- **Phishing Scenario Execution**
  - Automated email dispatch
  - Incident response simulation


### Frontend Application
- **Dashboard**
  - Centralized overview of simulation results
  - Interactive performance metrics
  - Comparative organizational risk analysis

- **Campaign Management**
  - Intuitive campaign creation wizard
  - Template library and customization

## Key Features
- User authentication
- Phishing campaign management
- Simulation email tracking
- Security awareness tracking

## Security
- JWT authentication
- Strong password validation
- Custom error handling

## Prerequisites
- Node.js (v18+)
- Docker
- Docker Compose


### 1. Clone the Repository
```bash
git clone <repository_url>
cd phishing-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Copy and modify environment files: (neccesary)
```bash
cp .env.example .env
cp .env.example packages/frontend/.env
cp .env.example packages/management-server/.env
cp .env.example packages/simulation-server/.env
```

### 4. Development Servers
- Frontend: `npm run dev:frontend` (http://localhost:5173)
- Management Server: `npm run dev:management` (http://localhost:3000)
- Simulation Server: `npm run dev:simulation` (http://localhost:3001)

## Docker Deployment

### Prerequisite Checks
Before running Docker Compose:
- Ensure Docker is installed and running
- Verify no conflicting services on ports 3000, 3001, 5173
- Check that all `.env` files are configured

### Build and Run
From the project root directory:
```bash
# Build and start containers with live logs
docker-compose up --build

# Alternative: Run in detached mode (background)
docker-compose up --build -d
```

### Common Docker Commands
```bash
# View running containers
docker ps

# View container logs
docker-compose logs <service_name>

# Stop and remove containers
docker-compose down

# Rebuild specific service
docker-compose build <service_name>
```

### Troubleshooting
- Verify network connectivity
- Check container logs for startup issues
- Ensure all environment variables are set at the root level
- Confirm no port conflicts

