export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string
  refresh: string
}

export interface RefreshTokenRequest {
  refresh: string
}

export interface RefreshTokenResponse {
  access: string
  refresh: string
}
