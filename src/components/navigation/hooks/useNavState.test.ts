import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNavState } from './useNavState';
import * as navigation from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('useNavState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (navigation.usePathname as any).mockReturnValue('/');
  });

  it('initializes with closed states', () => {
    const { result } = renderHook(() => useNavState());
    expect(result.current.mobileOpen).toBe(false);
    expect(result.current.openMegaId).toBeNull();
  });

  it('toggles mobile menu', () => {
    const { result } = renderHook(() => useNavState());
    act(() => {
      result.current.setMobileOpen(true);
    });
    expect(result.current.mobileOpen).toBe(true);
  });

  it('sets mega menu id', () => {
    const { result } = renderHook(() => useNavState());
    act(() => {
      result.current.setOpenMegaId('products');
    });
    expect(result.current.openMegaId).toBe('products');
  });

  it('closes menus on pathname change', () => {
    const { result, rerender } = renderHook(() => useNavState());
    
    act(() => {
      result.current.setMobileOpen(true);
      result.current.setOpenMegaId('products');
    });

    expect(result.current.mobileOpen).toBe(true);

    // Change pathname
    (navigation.usePathname as any).mockReturnValue('/new-path');
    rerender();

    expect(result.current.mobileOpen).toBe(false);
    expect(result.current.openMegaId).toBeNull();
  });
});
