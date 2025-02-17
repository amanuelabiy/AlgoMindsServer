export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userAgent?: string;
}

export interface LoginDto {
  name: string;
  password: string;
  userAgent?: string;
}
