// TypeScript type definitions
// Define interfaces and types used across the application

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AppPublicSettings {
  id: string;
  public_settings: Record<string, any>;
}
