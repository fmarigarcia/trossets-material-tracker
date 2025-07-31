import { Request, Response } from 'express';
import { 
  ApiResponse, 
  RegisterRequest, 
  LoginRequest, 
  AuthResponse, 
  AuthUser,
  AuthenticatedRequest
} from '../types';
import { 
  hashPassword, 
  comparePassword, 
  generateTokens, 
  createSafeUser 
} from '../utils/auth';
import { prisma } from '../lib/prisma';

/**
 * Register a new user
 */
export const register = async (
  req: Request<unknown, ApiResponse<AuthResponse>, RegisterRequest>,
  res: Response<ApiResponse<AuthResponse>>
): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        error: {
          message: 'User with this email already exists',
        },
      });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
    });

    // Create safe user object and generate tokens
    const safeUser = createSafeUser(newUser);
    const tokens = generateTokens(safeUser);

    res.status(201).json({
      success: true,
      data: {
        user: safeUser,
        tokens,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
        details: message,
      },
    });
  }
};

/**
 * Login user
 */
export const login = async (
  req: Request<unknown, ApiResponse<AuthResponse>, LoginRequest>,
  res: Response<ApiResponse<AuthResponse>>
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Invalid email or password',
        },
      });
      return;
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Invalid email or password',
        },
      });
      return;
    }

    // Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { updatedAt: new Date() },
    });

    // Create safe user object and generate tokens
    const safeUser = createSafeUser(user);
    const tokens = generateTokens(safeUser);

    res.status(200).json({
      success: true,
      data: {
        user: safeUser,
        tokens,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Login failed';
    res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
        details: message,
      },
    });
  }
};

/**
 * Logout user
 */
export const logout = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<{ message: string }>>
): Promise<void> => {
  try {
    // In a real implementation, you might want to:
    // - Add token to a blacklist
    // - Clear HTTP-only cookies
    // - Invalidate refresh tokens
    
    res.status(200).json({
      success: true,
      data: {
        message: 'Logged out successfully',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Logout failed';
    res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
        details: message,
      },
    });
  }
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<AuthUser>>
): Promise<void> => {
  try {
    // The user is already attached to the request by authentication middleware
    const user = req.user;

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to get user profile';
    res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
        details: message,
      },
    });
  }
};

/**
 * Helper function to get user by ID (for middleware use)
 */
export const getUserById = async (userId: string): Promise<AuthUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    return createSafeUser(user);
  } catch {
    return null;
  }
};
