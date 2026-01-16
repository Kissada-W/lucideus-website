import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NavContainer } from './NavContainer';
import { NavLink } from './NavLink';
import { NavTrigger } from './NavTrigger';
import { MobileToggle } from './MobileToggle';
import { Home } from 'lucide-react';

describe('Navigation Atoms', () => {
  describe('NavContainer', () => {
    it('renders children within a max-width container', () => {
      render(<NavContainer><div>Child</div></NavContainer>);
      const container = screen.getByText('Child').parentElement;
      expect(container).toHaveClass('mx-auto');
      expect(container).toHaveClass('max-w-6xl');
    });
  });

  describe('NavLink', () => {
    it('renders a link with correct styling', () => {
      render(<NavLink href="/test" label="Test Link" icon={Home} />);
      const link = screen.getByRole('link', { name: /Test Link/i });
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toBeInTheDocument();
    });

    it('applies active styles when active', () => {
      render(<NavLink href="/test" label="Test Link" icon={Home} isActive={true} />);
      const link = screen.getByRole('link');
      // Semantic tokens check
      expect(link).toHaveClass('text-nav-hover-text');
    });
  });

  describe('NavTrigger', () => {
    it('renders a button with label', () => {
      render(<NavTrigger label="Menu" isOpen={false} onClick={() => {}} />);
      expect(screen.getByRole('button', { name: /Menu/i })).toBeInTheDocument();
    });

    it('shows chevron rotation when open', () => {
       // This might be hard to test without mounting the actual SVG, but we can check for aria-expanded
       render(<NavTrigger label="Menu" isOpen={true} onClick={() => {}} />);
       expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('MobileToggle', () => {
    it('renders a button', () => {
      render(<MobileToggle isOpen={false} onToggle={() => {}} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('displays correct label for accessibility', () => {
        render(<MobileToggle isOpen={true} onToggle={() => {}} />);
        expect(screen.getByLabelText('Close navigation')).toBeInTheDocument();
    });
  });
});
