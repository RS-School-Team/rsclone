export interface Payload {
  email: string;
  password: string;
  manager?: boolean;
  iat?: number;
  expiresIn?: string;
}
