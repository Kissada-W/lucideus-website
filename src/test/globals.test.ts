import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';

describe('Global CSS Variables', () => {
  it('should define semantic navigation color tokens', () => {
    const cssPath = path.resolve(__dirname, '../app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Check for :root definitions
    expect(cssContent).toContain('--nav-bg:');
    expect(cssContent).toContain('--nav-text:');
    expect(cssContent).toContain('--nav-border:');
    expect(cssContent).toContain('--nav-hover-bg:');
    expect(cssContent).toContain('--nav-hover-text:');
    
    // Check for theme configuration mapping
    expect(cssContent).toContain('--color-nav-bg: var(--nav-bg)');
    expect(cssContent).toContain('--color-nav-text: var(--nav-text)');
    expect(cssContent).toContain('--color-nav-border: var(--nav-border)');
    expect(cssContent).toContain('--color-nav-hover-bg: var(--nav-hover-bg)');
    expect(cssContent).toContain('--color-nav-hover-text: var(--nav-hover-text)');
  });
});
