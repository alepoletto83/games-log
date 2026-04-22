import { beforeEach, describe, expect, it } from 'vitest';
import { useThemeStore } from './useThemeStore';

describe('useThemeStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useThemeStore.setState({ colorScheme: 'dark' });
  });

  it('starts with dark color scheme', () => {
    expect(useThemeStore.getState().colorScheme).toBe('dark');
  });

  it('toggles from dark to light', () => {
    useThemeStore.getState().toggleColorScheme();
    expect(useThemeStore.getState().colorScheme).toBe('light');
  });

  it('toggles back to dark after two calls', () => {
    useThemeStore.getState().toggleColorScheme();
    useThemeStore.getState().toggleColorScheme();
    expect(useThemeStore.getState().colorScheme).toBe('dark');
  });
});
