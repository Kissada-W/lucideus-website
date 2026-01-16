import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './navbar';
import * as navigation from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

// Mock the atoms to avoid rendering deep trees if necessary, 
// or let them render if they are simple. Atoms are simple.
// But Navbar imports complex things like MegaPanel. We should probably mock them for this test
// if we want to isolate Navbar logic.
// However, I want to test integration.

describe('Navbar', () => {
  it('renders the branding', () => {
    (navigation.usePathname as any).mockReturnValue('/');
    render(<Navbar />);
    expect(screen.getByText('Lucideus')).toBeInTheDocument();
  });

  // Add more tests as I refactor
});
