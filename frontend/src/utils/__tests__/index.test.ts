import { cn, formatCurrency, formatWeight, formatDate, formatDateTime } from '../index';

describe('Utility Functions', () => {
  describe('cn (className merger)', () => {
    it('merges classes correctly', () => {
      const result = cn('btn', 'btn-primary');
      expect(result).toBe('btn btn-primary');
    });

    it('handles conditional classes', () => {
      const result = cn('btn', { 'btn-primary': true, 'btn-secondary': false });
      expect(result).toBe('btn btn-primary');
    });

    it('merges Tailwind classes properly', () => {
      const result = cn('px-2 py-1', 'px-4');
      expect(result).toBe('py-1 px-4');
    });

    it('handles empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });
  });

  describe('formatCurrency', () => {
    it('formats currency with default symbol', () => {
      expect(formatCurrency(25.99)).toBe('$25.99');
    });

    it('formats currency with custom symbol', () => {
      expect(formatCurrency(25.99, '€')).toBe('€25.99');
    });

    it('rounds to two decimal places', () => {
      expect(formatCurrency(25.995)).toBe('$26.00');
      expect(formatCurrency(25.994)).toBe('$25.99');
    });

    it('handles zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('handles negative numbers', () => {
      expect(formatCurrency(-15.5)).toBe('$-15.50');
    });
  });

  describe('formatWeight', () => {
    it('formats grams for values under 1000', () => {
      expect(formatWeight(500)).toBe('500 g');
      expect(formatWeight(999)).toBe('999 g');
    });

    it('formats kilograms for values 1000 and above', () => {
      expect(formatWeight(1000)).toBe('1.00 kg');
      expect(formatWeight(1500)).toBe('1.50 kg');
      expect(formatWeight(2750)).toBe('2.75 kg');
    });

    it('rounds grams to whole numbers', () => {
      expect(formatWeight(123.7)).toBe('124 g');
    });

    it('rounds kilograms to 2 decimal places', () => {
      expect(formatWeight(1234.567)).toBe('1.23 kg');
    });

    it('handles zero', () => {
      expect(formatWeight(0)).toBe('0 g');
    });
  });

  describe('formatDate', () => {
    it('formats Date object', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toBe('Jan 15, 2024');
    });

    it('formats date string', () => {
      const result = formatDate('2024-01-15');
      expect(result).toBe('Jan 15, 2024');
    });

    it('accepts custom options', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      });
      expect(result).toBe('January 15, 2024');
    });
  });

  describe('formatDateTime', () => {
    it('formats Date object with time', () => {
      const date = new Date('2024-01-15T14:30:00');
      const result = formatDateTime(date);
      // Note: This will vary by timezone, so we just check format structure
      expect(result).toMatch(/Jan 15, 2024/);
      expect(result).toMatch(/PM|AM/);
    });

    it('formats date string with time', () => {
      const result = formatDateTime('2024-01-15T14:30:00');
      expect(result).toMatch(/Jan 15, 2024/);
      expect(result).toMatch(/PM|AM/);
    });
  });
});
