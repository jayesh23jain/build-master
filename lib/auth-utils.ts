import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-to-your-secret-key-minimum-32-characters';
const BCRYPT_ROUNDS = 10;

// ============== PASSWORD HASHING ==============

export async function hashPassword(password: string): Promise<string> {
  return await bcryptjs.hash(password, BCRYPT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcryptjs.compare(password, hash);
}

// ============== JWT TOKEN MANAGEMENT ==============

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'customer' | 'vendor';
}

export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '24h',
    algorithm: 'HS256',
  });
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

// ============== REMEMBER ME TOKEN ==============

export function generateRememberMeToken(): { token: string; expiry: Date } {
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 30); // 30 days from now
  return { token, expiry };
}

// ============== SESSION UTILITIES ==============

export function createSessionCookie(token: string): string {
  return `authToken=${token}; Path=/; HttpOnly; SameSite=Strict${
    process.env.NODE_ENV === 'production' ? '; Secure' : ''
  }`;
}

export function createRememberMeCookie(token: string, expiry: Date): string {
  return `rememberMe=${token}; Path=/; HttpOnly; SameSite=Strict; Expires=${expiry.toUTCString()}${
    process.env.NODE_ENV === 'production' ? '; Secure' : ''
  }`;
}

// ============== VALIDATION UTILITIES ==============

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============== ERROR HANDLING ==============

export class AuthError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 401
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

// ============== SANITIZATION ==============

export function sanitizeUser(user: any) {
  const { passwordHash, rememberMeToken, rememberMeExpiry, ...safe } = user;
  return safe;
}
