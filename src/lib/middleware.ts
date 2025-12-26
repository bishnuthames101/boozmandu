import { NextRequest, NextResponse } from 'next/server';
import { extractTokenFromHeader, verifyToken, JWTPayload } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

// Verify user authentication
export function requireAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Attach user info to request
    (req as AuthenticatedRequest).user = payload;
    return handler(req as AuthenticatedRequest);
  };
}

// Verify admin authentication
export function requireAdmin(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    if (payload.type !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Attach user info to request
    (req as AuthenticatedRequest).user = payload;
    return handler(req as AuthenticatedRequest);
  };
}
