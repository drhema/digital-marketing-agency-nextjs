# Environment Variables Documentation

This document describes all environment variables used in the Mu3lnen Digital Marketing Agency website.

## Required Variables

### `NEXT_PUBLIC_API_URL`
- Description: Base URL for API endpoints
- Format: URL string
- Example: http://localhost:3000/api

### `NEXT_PUBLIC_SITE_URL`
- Description: Base URL for the website
- Format: URL string
- Example: http://localhost:3000

## Development vs Production

Different values are used for development and production environments:
- Development values are in `.env.development`
- Production values are in `.env.production`

## Adding New Variables

When adding new environment variables:
1. Add them to both `.env.development` and `.env.production`
2. Update the validation schema in `lib/env.ts`
3. Document them in this file
4. Update the deployment configuration if necessary
