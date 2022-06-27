/* eslint-disable @typescript-eslint/no-var-requires */
const { flow } = require('@mobily/ts-belt');
const { withPlausibleProxy } = require('next-plausible');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const applyWrappers = flow(withPlausibleProxy(), withBundleAnalyzer);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NO_STRICT_MODE !== 'true',
  webpack: false,
};

module.exports = applyWrappers(nextConfig);
