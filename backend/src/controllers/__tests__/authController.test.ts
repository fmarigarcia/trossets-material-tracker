import { getUserById } from '../authController';
import { createSafeUser } from '../../utils/auth';
import { prisma } from '../../lib/prisma';
import { UserRole } from '../../types';

// Mock Prisma
jest.mock('../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

// Mock auth utils
jest.mock('../../utils/auth');

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockCreateSafeUser = createSafeUser as jest.MockedFunction<typeof createSafeUser>;

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      mockCreateSafeUser.mockReturnValue({
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
      });

      const result = await getUserById('1');

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
      });
    });

    it('should return null if user not found', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getUserById('1');

      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await getUserById('1');

      expect(result).toBeNull();
    });
  });
});
