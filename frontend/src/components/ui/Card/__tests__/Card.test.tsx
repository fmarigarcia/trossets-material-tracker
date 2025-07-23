import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardContent, CardFooter } from '../Card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <div data-testid="card-child">Card Content</div>
        </Card>
      );

      expect(screen.getByTestId('card-child')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Card data-testid="card">Content</Card>);

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card');
    });

    it('applies custom className', () => {
      render(
        <Card className="custom-card" data-testid="card">
          Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card', 'custom-card');
    });
  });

  describe('CardHeader', () => {
    it('renders children correctly', () => {
      render(<CardHeader>Header Content</CardHeader>);

      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<CardHeader>Header</CardHeader>);

      const header = screen.getByText('Header');
      expect(header).toHaveClass('card-header');
    });

    it('applies custom className', () => {
      render(<CardHeader className="custom-header">Header</CardHeader>);

      const header = screen.getByText('Header');
      expect(header).toHaveClass('card-header', 'custom-header');
    });
  });

  describe('CardContent', () => {
    it('renders children correctly', () => {
      render(<CardContent>Main Content</CardContent>);

      expect(screen.getByText('Main Content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<CardContent>Content</CardContent>);

      const content = screen.getByText('Content');
      expect(content).toHaveClass('card-content');
    });

    it('applies custom className', () => {
      render(<CardContent className="custom-content">Content</CardContent>);

      const content = screen.getByText('Content');
      expect(content).toHaveClass('card-content', 'custom-content');
    });
  });

  describe('CardFooter', () => {
    it('renders children correctly', () => {
      render(<CardFooter>Footer Content</CardFooter>);

      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<CardFooter>Footer</CardFooter>);

      const footer = screen.getByText('Footer');
      expect(footer).toHaveClass('card-footer');
    });

    it('applies custom className', () => {
      render(<CardFooter className="custom-footer">Footer</CardFooter>);

      const footer = screen.getByText('Footer');
      expect(footer).toHaveClass('card-footer', 'custom-footer');
    });
  });

  describe('Complete Card Structure', () => {
    it('renders all card components together', () => {
      render(
        <Card>
          <CardHeader>Card Title</CardHeader>
          <CardContent>Card body content goes here</CardContent>
          <CardFooter>Card actions</CardFooter>
        </Card>
      );

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card body content goes here')).toBeInTheDocument();
      expect(screen.getByText('Card actions')).toBeInTheDocument();
    });
  });
});
