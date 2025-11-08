import posthog from 'posthog-js';

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    posthog.init('phc_iVZh4yLMpd3Oy1oPRZRRmkNeWlEUBjFeDMMRMXjCPiX', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      session_recording: {
        recordCrossOriginIframes: true,
      },
      capture_pageview: true,
      capture_pageleave: true,
    });
  }
};

export { posthog };
