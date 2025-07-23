# CI/CD Setup Guide

This guide explains how to configure the CI/CD pipelines for the Trossets Material Tracker project.

## 🚀 Overview

The project includes comprehensive GitHub Actions workflows for:

- **Continuous Integration**: Automated testing, linting, and building
- **Continuous Deployment**: Automated deployments to staging and production
- **Pull Request Validation**: Code quality checks and preview deployments
- **Release Management**: Automated releases with Docker image builds
- **Database Migrations**: Safe database schema updates

## 📋 Required Secrets

### GitHub Repository Secrets

Navigate to `Settings > Secrets and variables > Actions` in your GitHub repository and add these secrets:

#### Frontend Deployment (Vercel)
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

#### Backend Deployment
```
DATABASE_URL=postgresql://user:password@host:port/database
```

**Railway Deployment:**
```
RAILWAY_TOKEN=your_railway_token
```

**Render Deployment:**
```
RENDER_SERVICE_ID=your_render_service_id
RENDER_API_KEY=your_render_api_key
```

**Custom Docker Registry:**
```
DOCKER_REGISTRY=your.registry.com/namespace
```

#### Notifications (Optional)
```
SLACK_WEBHOOK_URL=your_slack_webhook_url
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

## 🔧 Setup Instructions

### 1. Vercel Setup (Frontend)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login and get tokens:**
   ```bash
   vercel login
   vercel link
   ```

3. **Get your tokens:**
   ```bash
   # Get your user/org ID
   vercel teams ls
   
   # Get project ID
   vercel project ls
   ```

4. **Generate API token:**
   - Go to [Vercel Dashboard > Settings > Tokens](https://vercel.com/account/tokens)
   - Create a new token with appropriate scope

### 2. Railway Setup (Backend)

1. **Create Railway account and project:**
   - Go to [Railway](https://railway.app)
   - Create a new project
   - Connect your GitHub repository

2. **Get Railway token:**
   - Go to Railway Dashboard > Account > Tokens
   - Generate a new token

### 3. Database Setup

1. **Choose your database provider:**
   - **Supabase** (Recommended for PostgreSQL)
   - **PlanetScale** (For MySQL)
   - **Railway PostgreSQL**
   - **Neon** (Serverless PostgreSQL)

2. **Get connection string:**
   ```
   postgresql://username:password@host:port/database
   ```

### 4. Environment Configuration

Create environment files for different stages:

#### Development (`.env.local`)
```env
# Database
DATABASE_URL="postgresql://localhost:5432/trossets_dev"

# Authentication
JWT_SECRET="your-development-jwt-secret"
JWT_EXPIRES_IN="7d"

# API Configuration
API_PORT=3001
CORS_ORIGIN="http://localhost:3000"

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
```

#### Production Environment Variables
```env
# Database
DATABASE_URL="postgresql://prod-host:5432/trossets_prod"

# Authentication
JWT_SECRET="your-production-jwt-secret"
JWT_EXPIRES_IN="7d"

# API Configuration
API_PORT=3001
CORS_ORIGIN="https://your-frontend-domain.com"

# Frontend
NEXT_PUBLIC_API_URL="https://your-backend-domain.com/api"
```

## 🚀 Workflow Triggers

### Continuous Integration (`ci.yml`)
- **Triggers**: Push to `master`, `main`, `develop` branches and pull requests
- **Actions**: 
  - Run tests for frontend and backend
  - Lint code and check types
  - Security scanning
  - Build Docker images
  - Deploy to staging/production

### Pull Request Validation (`pr.yml`)
- **Triggers**: Pull request events
- **Actions**:
  - Validate PR title format
  - Add size labels
  - Run tests and builds
  - Deploy preview environments
  - Check for breaking changes

### Frontend Deployment (`deploy-frontend.yml`)
- **Triggers**: Push to `master`/`main` or manual dispatch
- **Actions**: Deploy to Vercel with environment selection

### Backend Deployment (`deploy-backend.yml`)
- **Triggers**: Push to `master`/`main` or manual dispatch
- **Actions**: Deploy to Railway/Render/Custom platform

### Database Migration (`migrate.yml`)
- **Triggers**: Manual dispatch only
- **Actions**: Run Prisma migrations safely

### Release Management (`release.yml`)
- **Triggers**: Git tags (`v*`)
- **Actions**:
  - Create GitHub releases
  - Build and publish Docker images
  - Deploy to production
  - Update documentation

## 🔄 Branch Strategy

### Recommended Git Flow

1. **`master`/`main`**: Production-ready code
2. **`develop`**: Integration branch for features
3. **`feature/*`**: Feature development branches
4. **`hotfix/*`**: Critical production fixes
5. **`release/*`**: Release preparation branches

### Deployment Flow

```
feature/branch → develop → staging
                     ↓
                   master → production
```

## 🛡️ Security Best Practices

1. **Secrets Management:**
   - Never commit secrets to the repository
   - Use GitHub Secrets for sensitive data
   - Rotate secrets regularly

2. **Branch Protection:**
   - Require PR reviews for `master`/`main`
   - Require status checks to pass
   - Restrict who can push to protected branches

3. **Environment Isolation:**
   - Use separate databases for each environment
   - Different API keys and tokens per environment
   - Isolated deployment targets

## 📊 Monitoring and Notifications

### Health Checks
The workflows include health checks for:
- Frontend build success
- Backend API availability
- Database connectivity
- Docker container health

### Notifications
Configure notifications for:
- Deployment success/failure
- Security vulnerabilities
- Breaking changes detected
- Release completions

## 🐛 Troubleshooting

### Common Issues

1. **Vercel deployment fails:**
   - Check `VERCEL_TOKEN` is valid
   - Ensure project is linked correctly
   - Verify build commands in `package.json`

2. **Database migration fails:**
   - Check `DATABASE_URL` format
   - Ensure database is accessible
   - Verify Prisma schema is valid

3. **Docker build fails:**
   - Check Dockerfile syntax
   - Ensure all dependencies are listed
   - Verify build context includes necessary files

4. **Tests fail in CI:**
   - Check environment variables are set
   - Ensure test database is available
   - Verify test scripts in `package.json`

### Debug Steps

1. **Check workflow logs:**
   - Go to Actions tab in GitHub
   - Click on failed workflow
   - Expand failed step logs

2. **Validate secrets:**
   - Ensure all required secrets are set
   - Check secret names match workflow references
   - Verify secret values are correct

3. **Test locally:**
   - Run the same commands locally
   - Check environment setup
   - Verify dependencies are installed

## 📝 Customization

### Adding New Deployment Targets

1. **Create new workflow file:**
   ```yaml
   # .github/workflows/deploy-custom.yml
   name: Deploy to Custom Platform
   # ... workflow configuration
   ```

2. **Add platform-specific steps:**
   - Authentication
   - Build process
   - Deployment commands
   - Health checks

### Custom Notifications

1. **Slack integration:**
   ```yaml
   - name: Notify Slack
     uses: 8398a7/action-slack@v3
     with:
       status: ${{ job.status }}
       webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
   ```

2. **Discord integration:**
   ```yaml
   - name: Notify Discord
     uses: sarisia/actions-status-discord@v1
     with:
       webhook: ${{ secrets.DISCORD_WEBHOOK_URL }}
   ```

## 📋 Checklist

Before enabling CI/CD:

- [ ] All required secrets are configured
- [ ] Database is set up and accessible
- [ ] Deployment platforms are configured
- [ ] Branch protection rules are enabled
- [ ] Team has access to deployment environments
- [ ] Monitoring and notifications are configured
- [ ] Documentation is updated
- [ ] Team is trained on the workflow

## 🆘 Support

For issues with the CI/CD setup:

1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Consult platform-specific documentation
4. Create an issue in the repository

---

**Note**: This CI/CD setup is designed to be flexible and can be customized based on your specific deployment needs and infrastructure preferences.
