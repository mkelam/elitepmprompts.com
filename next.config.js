/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_PAYFAST_MERCHANT_ID: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || '',
    NEXT_PUBLIC_PAYFAST_MERCHANT_KEY: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || '',
    NEXT_PUBLIC_PAYFAST_SANDBOX: process.env.NEXT_PUBLIC_PAYFAST_SANDBOX || 'true',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://elitepmprompts.com',
    NEXT_PUBLIC_MAILCHIMP_URL: process.env.NEXT_PUBLIC_MAILCHIMP_URL || '',
  },
};

module.exports = nextConfig;
