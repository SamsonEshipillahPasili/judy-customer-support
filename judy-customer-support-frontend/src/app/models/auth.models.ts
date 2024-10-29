interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string
  refresh: string
}

interface RefreshTokenRequest {
  refresh: string
}

interface RefreshTokenResponse {
  access: string
  refresh: string
}
