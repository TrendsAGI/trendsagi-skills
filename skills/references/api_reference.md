# API Reference

This document outlines the API endpoints available in the Go API Server.

## Authentication
*   `POST /auth/register` - Register a new user.
*   `POST /auth/login` - Login (x-www-form-urlencoded).
*   `POST /auth/google-login` - Login with Google ID Token.
*   `POST /auth/logout` - Logout.
*   `POST /auth/refresh` - Refresh access token.
*   `POST /auth/confirm-email` - Confirm email address.

## User
*   `GET /api/user/profile` - Get current user profile.
*   `PUT /api/user/profile` - Update user profile.
*   `POST /api/user/onboarding-setup` - Save onboarding interests.
*   `GET /api/user/interests` - Get user topic interests.
*   `POST /api/user/interests` - Create topic interest.
*   `GET /api/user/api-keys` - Manage API keys.
*   `GET /api/user/notifications/recent` - Get recent notifications.
*   `POST /api/user/notifications/mark-read` - Mark notifications as read.
*   `GET /api/user/export/settings` - Get export configurations.
*   `POST /api/user/export/settings` - Create export configuration.
*   `GET /api/user/export/history` - Get export history.

## Trends
*   `GET /api/trends` (or `/trends`) - List trends with filtering (limit, period, fields).
*   `GET /api/trends/{id}` (or `/trends/{id}`) - Get specific trend details.
*   `POST /api/trends/{id}/analyze` - Trigger AI analysis for a trend.
*   `GET /api/trends/autocomplete` - Autocomplete for trend queries.
*   `GET /api/trends/categories` - List active trend categories.
*   `GET /api/insights/search` - Search trends by AI insight content.

## Dashboard
*   `GET /dashboard/overview` - Get aggregated stats for the dashboard.

## Intelligence & Analysis
*   `GET /api/intelligence/financial-data` - Get financial data.
*   `GET /api/intelligence/recommendations` - Get AI recommendations.
*   `GET /api/intelligence/market/x-users` - Tracked X (Twitter) users.
*   `GET /api/intelligence/crisis-events` - Crisis monitoring.

## Agents
*   `GET /api/agents` - List agents.
*   `POST /api/agents` - Create agent.
*   `POST /api/agents/{id}/chat` - Chat with an agent.

## Billing
*   `GET /billing/plans` - List available plans.
*   `POST /billing/create-subscription` - Create Stripe subscription.
*   `POST /api/billing/create-portal-session` - Create Stripe Customer Portal session.

## Organization
*   `GET /api/org/members` - List organization members.
*   `POST /api/org/invite` - Invite member.

## Public / Blog
*   `GET /blog/posts` - List blog posts.
*   `GET /blog/posts/{slug}` - Get blog post.
*   `POST /newsletter/subscribe` - Subscribe to newsletter.

## Video
*   `POST /video/generate` - Generate video content.

## Integrations
*   `GET /integrations/slack/status` - Check Slack connection.

## Admin
*   `GET /api/admin/users` - List all users.
*   `GET /api/admin/stats` - System statistics.
