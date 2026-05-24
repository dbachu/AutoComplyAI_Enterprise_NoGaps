// ============================================
// AUTOCOMPLYAI DESIGN SYSTEM
// ============================================

export const THEME = {
  // Primary Colors
  primary: {
    main: '#0066CC',
    light: '#3385D6',
    dark: '#004C99',
    contrast: '#FFFFFF'
  },
  
  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  },
  
  // Neutral Colors
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    500: '#6B7280',
    700: '#374151',
    900: '#111827'
  },
  
  // Chart Colors (Accessible & Distinct)
  charts: [
    '#0066CC', // Primary Blue
    '#10B981', // Green
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#EF4444', // Red
    '#06B6D4'  // Cyan
  ]
};

export const SPACING = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1.2,
    color: THEME.neutral[900],
    marginBottom: 16
  },
  h2: {
    fontSize: 28,
    fontWeight: 600,
    lineHeight: 1.3,
    color: THEME.neutral[900],
    marginBottom: 12
  },
  h3: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.4,
    color: THEME.neutral[700],
    marginBottom: 8
  },
  body: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.6,
    color: THEME.neutral[500]
  },
  caption: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.5,
    color: THEME.neutral[500]
  }
};

export const SHADOWS = {
  sm: '0 2px 8px rgba(0,0,0,0.06)',
  md: '0 4px 12px rgba(0,0,0,0.08)',
  lg: '0 8px 20px rgba(0,0,0,0.12)',
  xl: '0 12px 24px rgba(0,0,0,0.15)'
};

export const BORDERS = {
  light: `1px solid ${THEME.neutral[200]}`,
  medium: `1px solid ${THEME.neutral[300]}`,
  radius: {
    sm: 8,
    md: 10,
    lg: 12
  }
};

// Made with Bob
