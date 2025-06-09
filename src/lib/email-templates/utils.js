// Email template utilities and shared components
export const EMAIL_STYLES = {
  // Color palette matching the design system
  colors: {
    primary: '#000000',
    secondary: '#64748b',
    accent: '#3b82f6',
    text: '#334155',
    textLight: '#64748b',
    textMuted: '#9ca3af',
    border: '#e2e8f0',
    borderLight: '#d1d5db',
    background: '#ffffff',
    gridBg: 'rgba(0,0,0,0.02)'
  },
  
  // Typography matching Inter font system
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    monoFamily: "'Courier New', monospace",
    trackingTight: '-0.025em',
    trackingWide: '0.1em',
    trackingWider: '0.2em'
  },
  
  // Spacing system
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '48px'
  }
};

/**
 * Generate responsive CSS for email templates
 */
export const generateEmailCSS = () => `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    /* Reset styles */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    
    /* Grid background pattern */
    .grid-bg {
      background-image: 
        linear-gradient(to right, ${EMAIL_STYLES.colors.gridBg} 1px, transparent 1px),
        linear-gradient(to bottom, ${EMAIL_STYLES.colors.gridBg} 1px, transparent 1px);
      background-size: 40px 40px;
    }
    
    /* Typography classes */
    .tracking-tight { letter-spacing: ${EMAIL_STYLES.typography.trackingTight}; }
    .tracking-wide { letter-spacing: ${EMAIL_STYLES.typography.trackingWide}; }
    .tracking-wider { letter-spacing: ${EMAIL_STYLES.typography.trackingWider}; }
    
    /* Responsive design */
    @media only screen and (max-width: 600px) {
      .mobile-padding { padding: 20px 16px !important; }
      .mobile-title { font-size: 32px !important; line-height: 1.1 !important; }
      .mobile-article-title { font-size: 20px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-article-img { height: 200px !important; }
      .mobile-hide { display: none !important; }
    }
  </style>
`;

/**
 * Generate header section with Odyssey branding
 */
export const generateEmailHeader = (title = 'ODYSSEY', subtitle = 'A Journal of Ideas') => `
  <div style="text-align: center; padding: ${EMAIL_STYLES.spacing['3xl']} 0 60px 0;">
    <!-- Issue/Vol line -->
    <div style="margin-bottom: ${EMAIL_STYLES.spacing.xl};">
      <div style="display: inline-flex; align-items: center; gap: ${EMAIL_STYLES.spacing.md}; font-size: 12px; color: ${EMAIL_STYLES.colors.secondary}; font-family: ${EMAIL_STYLES.typography.monoFamily}; text-transform: uppercase; letter-spacing: ${EMAIL_STYLES.typography.trackingWide};">
        <div style="height: 1px; width: 32px; background: ${EMAIL_STYLES.colors.secondary};"></div>
        <span>VOL. I — ${new Date().getFullYear()}</span>
        <div style="height: 1px; width: 32px; background: ${EMAIL_STYLES.colors.secondary};"></div>
      </div>
    </div>
    
    <!-- Main Title -->
    <h1 style="margin: 0 0 ${EMAIL_STYLES.spacing.xl} 0; font-size: 48px; font-weight: 300; color: ${EMAIL_STYLES.colors.primary}; letter-spacing: ${EMAIL_STYLES.typography.trackingTight}; line-height: 1;" class="mobile-title tracking-tight">
      ${title}
    </h1>
    
    <!-- Subtitle with lines -->
    <div style="display: flex; align-items: center; justify-content: center; gap: ${EMAIL_STYLES.spacing.xl}; margin-bottom: ${EMAIL_STYLES.spacing['2xl']};">
      <div style="height: 1px; width: 48px; background: ${EMAIL_STYLES.colors.borderLight};"></div>
      <span style="font-size: 14px; font-weight: 500; color: ${EMAIL_STYLES.colors.textLight}; text-transform: uppercase; letter-spacing: ${EMAIL_STYLES.typography.trackingWider};" class="tracking-wider">
        ${subtitle}
      </span>
      <div style="height: 1px; width: 48px; background: ${EMAIL_STYLES.colors.borderLight};"></div>
    </div>
  </div>
`;

/**
 * Generate footer section
 */
export const generateEmailFooter = (baseUrl = 'https://ayushman.dev') => `
  <div style="text-align: center; color: ${EMAIL_STYLES.colors.secondary}; font-size: 14px; padding: 0 ${EMAIL_STYLES.spacing.lg} ${EMAIL_STYLES.spacing['3xl']} ${EMAIL_STYLES.spacing.lg};">
    <!-- Decorative line -->
    <div style="width: 80px; height: 1px; background: ${EMAIL_STYLES.colors.borderLight}; margin: 0 auto ${EMAIL_STYLES.spacing.xl} auto;"></div>
    
    <p style="margin: 0 0 ${EMAIL_STYLES.spacing.md} 0;">
      Follow the journey at <a href="${baseUrl}/blog" style="color: ${EMAIL_STYLES.colors.accent}; text-decoration: none; font-weight: 500;">ayushman.dev/blog</a>
    </p>
    <p style="margin: 0; font-size: 12px; color: ${EMAIL_STYLES.colors.textMuted};">
      You're receiving this because you subscribed to Odyssey Newsletter.<br>
      If you no longer wish to receive these emails, you can <a href="#" style="color: ${EMAIL_STYLES.colors.textMuted}; text-decoration: underline;">unsubscribe here</a>.
    </p>
  </div>
`;

/**
 * Generate corner decorations
 */
export const generateCornerDecorations = () => `
  <div style="position: relative;">
    <div style="position: absolute; top: -100px; left: ${EMAIL_STYLES.spacing.lg}; width: ${EMAIL_STYLES.spacing.xl}; height: ${EMAIL_STYLES.spacing.xl}; border-left: 2px solid ${EMAIL_STYLES.colors.border}; border-top: 2px solid ${EMAIL_STYLES.colors.border};"></div>
    <div style="position: absolute; top: -100px; right: ${EMAIL_STYLES.spacing.lg}; width: ${EMAIL_STYLES.spacing.xl}; height: ${EMAIL_STYLES.spacing.xl}; border-right: 2px solid ${EMAIL_STYLES.colors.border}; border-top: 2px solid ${EMAIL_STYLES.colors.border};"></div>
  </div>
`;

/**
 * Utility function to truncate text
 */
export const truncateText = (text, maxLength = 120) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Utility function to format dates (matching FeaturedArticle component)
 */
export const formatEmailDate = (dateString) => {
  const [day, month, year] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric'
  });
};
