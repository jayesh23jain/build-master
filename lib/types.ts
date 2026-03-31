// Authentication and Database Types

// ============== USER TYPES ==============

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  role: 'customer' | 'vendor';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'vendor';
  trade?: string; // Vendor only
  license?: string; // Vendor only
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

// ============== CUSTOMER TYPES ==============

export interface CustomerProfile {
  id: string;
  userId: string;
  phone?: string;
  location?: string;
  company?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerProject {
  id: string;
  customerId: string;
  title: string;
  description?: string;
  address?: string;
  phase: string;
  budget?: string;
  timeline?: string;
  status: 'planning' | 'active' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorRequest {
  id: string;
  projectId: string;
  phase: string;
  title: string;
  description?: string;
  budget?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============== VENDOR TYPES ==============

export interface VendorProfile {
  id: string;
  userId: string;
  trade: string;
  license: string;
  phone?: string;
  location?: string;
  bio?: string;
  experience?: string;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioProject {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  budget: string;
  timeline: string;
  status: 'completed' | 'in-progress' | 'planned';
  client?: string;
  location?: string;
  tags: string[];
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============== QUOTE TYPES ==============

export interface Quote {
  id: string;
  requestId: string;
  vendorId: string;
  amount: string;
  description?: string;
  timeline?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
