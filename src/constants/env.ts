export const ANALYTICS_ENABLED =
  process.env.NEXT_PUBLIC_ANALYTICS_DISABLED !== 'true' && process.env.NODE_ENV === 'production';
