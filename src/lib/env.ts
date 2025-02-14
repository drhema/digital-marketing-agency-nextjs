// src/lib/env.ts
function validateEnv() {
  const requiredEnvs = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  };

  const missingEnvs = Object.entries(requiredEnvs)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingEnvs.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvs.join(', ')}`
    );
  }

  // Validate URLs
  try {
    new URL(process.env.NEXT_PUBLIC_API_URL as string);
    new URL(process.env.NEXT_PUBLIC_SITE_URL as string);
  } catch (error) {
    throw new Error('Invalid URL in environment variables');
  }

  return {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  } as const;
}

export const env = validateEnv();