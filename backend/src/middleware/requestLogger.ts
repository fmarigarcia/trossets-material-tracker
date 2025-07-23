import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  // Store original end function
  const originalEnd = res.end;

  // Override end function to log response time
  res.end = function(chunk?: any, encoding?: any): Response {
    const duration = Date.now() - startTime;
    
    // Log request details in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
      
      // Log request body for non-GET requests (excluding sensitive data)
      if (req.method !== 'GET' && req.body) {
        const sanitizedBody = { ...req.body };
        
        // Remove sensitive fields
        if (sanitizedBody.password) sanitizedBody.password = '[REDACTED]';
        if (sanitizedBody.token) sanitizedBody.token = '[REDACTED]';
        
        console.log('Request Body:', JSON.stringify(sanitizedBody, null, 2));
      }
    }

    // Call original end function
    return originalEnd.call(this, chunk, encoding);
  };

  next();
};
