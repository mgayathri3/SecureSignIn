import { apiRequest } from "./queryClient";
import type { User, LoginRequest, SignupRequest, UpdateProfileRequest } from "@shared/schema";

export interface AuthResponse {
  message: string;
  user: User;
}

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiRequest("POST", "/api/login", credentials);
    return response.json();
  }

  static async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await apiRequest("POST", "/api/signup", userData);
    return response.json();
  }

  static async logout(): Promise<{ message: string }> {
    const response = await apiRequest("POST", "/api/logout");
    return response.json();
  }

  static async getCurrentUser(): Promise<User> {
    const response = await apiRequest("GET", "/api/user");
    return response.json();
  }

  static async updateProfile(updates: UpdateProfileRequest): Promise<AuthResponse> {
    const response = await apiRequest("PUT", "/api/profile", updates);
    return response.json();
  }
}

export function validatePasswordStrength(password: string): {
  score: number;
  feedback: string;
} {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const feedback = [
    "Very weak",
    "Weak", 
    "Fair",
    "Good",
    "Strong"
  ][score] || "Very weak";

  return { score, feedback };
}

export function getPasswordStrengthColor(score: number): string {
  const colors = [
    "bg-gray-200",
    "bg-red-400",
    "bg-yellow-400", 
    "bg-blue-400",
    "bg-green-400"
  ];
  return colors[score] || colors[0];
}
