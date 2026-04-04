/**
 * App Mode Detection Utilities
 * 
 * Detects if the page is being viewed in a WebView (iOS/Android app)
 * and provides utilities for conditional rendering of UI elements.
 */

/**
 * Check if the current request is from an app (WebView)
 * Checks for URL parameter: ?app=true
 */
export function isAppMode(searchParams?: URLSearchParams | null): boolean {
  if (typeof window === 'undefined') {
    // Server-side: check if searchParams provided
    return searchParams?.get('app') === 'true';
  }
  
  // Client-side: check URL
  const params = new URLSearchParams(window.location.search);
  return params.get('app') === 'true';
}

/**
 * Get theme preference from URL
 * Supports: ?theme=dark, ?theme=light, ?theme=auto
 */
export function getThemeParam(searchParams?: URLSearchParams | null): 'light' | 'dark' | 'auto' {
  if (typeof window === 'undefined') {
    const theme = searchParams?.get('theme');
    return (theme === 'light' || theme === 'dark' || theme === 'auto') ? theme : 'auto';
  }
  
  const params = new URLSearchParams(window.location.search);
  const theme = params.get('theme');
  return (theme === 'light' || theme === 'dark' || theme === 'auto') ? theme : 'auto';
}

/**
 * Check if popups should be disabled
 * Checks for: ?no_popups=true or ?app=true (app mode auto-disables popups)
 */
export function shouldDisablePopups(searchParams?: URLSearchParams | null): boolean {
  if (typeof window === 'undefined') {
    return searchParams?.get('no_popups') === 'true' || searchParams?.get('app') === 'true';
  }
  
  const params = new URLSearchParams(window.location.search);
  return params.get('no_popups') === 'true' || params.get('app') === 'true';
}

/**
 * Check if related articles should be hidden
 * Checks for: ?hide_related=true
 */
export function shouldHideRelated(searchParams?: URLSearchParams | null): boolean {
  if (typeof window === 'undefined') {
    return searchParams?.get('hide_related') === 'true';
  }
  
  const params = new URLSearchParams(window.location.search);
  return params.get('hide_related') === 'true';
}

/**
 * Check if back button should be hidden
 * Checks for: ?hide_back_btn=true
 */
export function shouldHideBackButton(searchParams?: URLSearchParams | null): boolean {
  if (typeof window === 'undefined') {
    return searchParams?.get('hide_back_btn') === 'true';
  }
  
  const params = new URLSearchParams(window.location.search);
  return params.get('hide_back_btn') === 'true';
}

/**
 * Get all app mode settings from URL
 */
export interface AppModeSettings {
  isAppMode: boolean;
  theme: 'light' | 'dark' | 'auto';
  disablePopups: boolean;
  hideRelated: boolean;
  hideBackButton: boolean;
}

export function getAppModeSettings(searchParams?: URLSearchParams | null): AppModeSettings {
  return {
    isAppMode: isAppMode(searchParams),
    theme: getThemeParam(searchParams),
    disablePopups: shouldDisablePopups(searchParams),
    hideRelated: shouldHideRelated(searchParams),
    hideBackButton: shouldHideBackButton(searchParams),
  };
}
