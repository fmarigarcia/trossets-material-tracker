import { hashPassword, comparePassword, generateTokens, createSafeUser } from '../auth';
import { UserRole } from '../../types';

// Mock dependencies
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

// Import mocked modules
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockJwt = jwt as jest.Mocked<typeof jwt>;

describe('Auth Utils', () => {
  describe('hashPassword', () => {
    it('should hash password correctly', async () => {
      const mockHash = 'hashedPassword';
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHash);

      const result = await hashPassword('password123');

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
      expect(result).toBe(mockHash);
    });
  });

  describe('comparePassword', () => {
    it('should return true for valid password', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await comparePassword('password123', 'hashedPassword');

      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(result).toBe(true);
    });

    it('should return false for invalid password', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await comparePassword('wrongPassword', 'hashedPassword');

      expect(result).toBe(false);
    });
  });

  describe('generateTokens', () => {
    it('should generate access token', () => {
      const mockToken = 'mockAccessToken';
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const user = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
      };

      const tokens = generateTokens(user);

      expect(jwt.sign).toHaveBeenCalledWith(
        {
          userId: '1',
          email: 'test@example.com',
          role: UserRole.USER,
        },
        expect.any(String),
        { expiresIn: expect.any(String) }
      );
      expect(tokens).toEqual({
        accessToken: mockToken,
      });
    });
  });

  describe('createSafeUser', () => {
    it('should create safe user object', () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'USER',
      };

      const safeUser = createSafeUser(user);

      expect(safeUser).toEqual({
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'USER',
      });
    });
  });
});
