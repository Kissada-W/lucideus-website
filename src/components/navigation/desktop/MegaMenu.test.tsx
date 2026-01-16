import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MegaMenu } from './MegaMenu';
import { topNav } from '../data';

describe('MegaMenu', () => {
  const productItem = topNav.find(i => i.id === 'products');
  const solutionsItem = topNav.find(i => i.id === 'solutions');

  if (!productItem || !('sections' in productItem)) {
      throw new Error("Product item not found in data");
  }
  if (!solutionsItem || !('sections' in solutionsItem)) {
      throw new Error("Solutions item not found in data");
  }

  it('renders product layout correctly', () => {
    render(<MegaMenu item={productItem} prefersReducedMotion={false} />);
    // Check for some content
    expect(screen.getByText(productItem.sections[0].title)).toBeInTheDocument();
    // Check for promo
    if (productItem.promo) {
        expect(screen.getByText(productItem.promo.title)).toBeInTheDocument();
    }
  });

  it('renders solutions layout correctly', () => {
    render(<MegaMenu item={solutionsItem} prefersReducedMotion={false} />);
    expect(screen.getByText(solutionsItem.sections[0].title)).toBeInTheDocument();
  });
});
