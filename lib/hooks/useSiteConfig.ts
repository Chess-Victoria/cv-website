'use client'

import { useState, useEffect } from 'react';
import { SiteConfiguration } from '../site-config';

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfiguration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/site-config');
        if (!res.ok) throw new Error('Failed to fetch site config');
        const siteConfig: SiteConfiguration = await res.json();
        setConfig(siteConfig);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load site configuration');
        console.error('Error loading site configuration:', err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  return {
    config,
    loading,
    error,
    // Convenience getters
    facebookUrl: config?.facebookUrl,
    siteName: config?.siteName,
    siteDescription: config?.siteDescription,
    logo: config?.logo,
    contactEmail: config?.contactEmail,
    contactPhone: config?.contactPhone,
    address: config?.address,
    socialMedia: config?.socialMedia,
    footerText: config?.footerText,
    headerLinks: config?.headerLinks || [],
    footerLinks: config?.footerLinks || [],
  };
}
