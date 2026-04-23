import { test, expect } from '@playwright/test';

test('toggles color scheme from dark to light and back', async ({ page }) => {
  await page.goto('/');

  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-mantine-color-scheme', 'dark');

  const toggle = page.getByRole('button', { name: 'Toggle color scheme' });
  await toggle.click();
  await expect(html).toHaveAttribute('data-mantine-color-scheme', 'light');

  await toggle.click();
  await expect(html).toHaveAttribute('data-mantine-color-scheme', 'dark');
});
