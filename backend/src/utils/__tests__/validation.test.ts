import { registerSchema, loginSchema, validateRequest } from '../validation';

describe('Validation Utils', () => {
  describe('registerSchema', () => {
    it('should validate valid registration data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'Password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      const { error } = registerSchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'Password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      const { error } = registerSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('email');
    });

    it('should reject weak password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'weak',
        firstName: 'John',
        lastName: 'Doe',
      };

      const { error } = registerSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('Password');
    });

    it('should reject missing required fields', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'Password123',
        // Missing firstName and lastName
      };

      const { error } = registerSchema.validate(invalidData);
      expect(error).toBeDefined();
    });
  });

  describe('loginSchema', () => {
    it('should validate valid login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const { error } = loginSchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };

      const { error } = loginSchema.validate(invalidData);
      expect(error).toBeDefined();
    });

    it('should reject missing password', () => {
      const invalidData = {
        email: 'test@example.com',
      };

      const { error } = loginSchema.validate(invalidData);
      expect(error).toBeDefined();
    });
  });

  describe('validateRequest middleware', () => {
    let mockRequest: { body: Record<string, unknown> };
    let mockResponse: { status: jest.Mock; json: jest.Mock };
    let mockNext: jest.Mock;

    beforeEach(() => {
      mockRequest = {
        body: {},
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      mockNext = jest.fn();
    });

    it('should call next() for valid data', () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      const middleware = validateRequest(loginSchema);
      middleware(mockRequest as any, mockResponse as any, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid data', () => {
      mockRequest.body = {
        email: 'invalid-email',
        password: 'password123',
      };

      const middleware = validateRequest(loginSchema);
      middleware(mockRequest as any, mockResponse as any, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Validation error',
          details: expect.any(Array),
        },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should strip unknown fields', () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
        unknownField: 'should be removed',
      };

      const middleware = validateRequest(loginSchema);
      middleware(mockRequest as any, mockResponse as any, mockNext);

      expect(mockRequest.body).toEqual({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
