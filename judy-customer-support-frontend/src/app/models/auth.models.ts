interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string
  refresh: string
}
