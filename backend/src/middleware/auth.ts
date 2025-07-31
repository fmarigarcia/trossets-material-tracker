import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest, ApiResponse } from '../types';
import { verifyToken, extractTokenFromHeader } from '../utils/auth';
import { getUserById } from '../controllers/authController';

/**
 * Authentication middleware - verifies JWT token and attaches user to request
 */
export const authenticate = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Access token is required',
        },
      });
      return;
    }

    // Verify token
    const payload = verifyToken(token);

    // Get user from database
    const user = await getUserById(payload.userId);
    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          message: 'User not found',
        },
      });
      return;
    }

    // Attach user to request
    (req as AuthenticatedRequest).user = user;
    next();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Authentication failed';
    res.status(401).json({
      success: false,
      error: {
        message: 'Invalid or expired token',
        details: message,
      },
    });
  }
};

/**
 * Optional authentication middleware - doesn't fail if no token provided
 */
export const optionalAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      // No token provided, continue without authentication
      next();
      return;
    }

    // Verify token
    const payload = verifyToken(token);

    // Get user from database
    const user = await getUserById(payload.userId);
    if (user) {
      // Attach user to request if found
      (req as AuthenticatedRequest).user = user;
    }

    next();
  } catch {
    // Token invalid, continue without authentication
    next();
  }
};

/**
 * Authorization middleware - checks if user has required role
 */
export const authorize = (requiredRoles: string[]) => {
  return (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    const user = (req as AuthenticatedRequest).user;

    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required',
        },
      });
      return;
    }

    if (!requiredRoles.includes(user.role)) {
      res.status(403).json({
        success: false,
        error: {
          message: 'Insufficient permissions',
        },
      });
      return;
    }

    next();
  };
};
