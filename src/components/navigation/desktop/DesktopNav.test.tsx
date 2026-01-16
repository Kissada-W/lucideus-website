import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DesktopNav } from './DesktopNav';
import { topNav } from '../data';

describe('DesktopNav', () => {
  it('renders all top-level items', () => {
    const mockSetOpenMegaId = vi.fn();
    render(
      <DesktopNav 
        items={topNav} 
        pathname="/" 
        openMegaId={null} 
        setOpenMegaId={mockSetOpenMegaId} 
      />
    );

    topNav.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('triggers mega menu on hover', () => {
    const mockSetOpenMegaId = vi.fn();
    render(
      <DesktopNav 
        items={topNav} 
        pathname="/" 
        openMegaId={null} 
        setOpenMegaId={mockSetOpenMegaId} 
      />
    );

    const megaItem = topNav.find(i => 'sections' in i);
    if (megaItem) {
      const trigger = screen.getByText(megaItem.label);
      fireEvent.mouseEnter(trigger);
      expect(mockSetOpenMegaId).toHaveBeenCalledWith(megaItem.id);
    }
  });
});
